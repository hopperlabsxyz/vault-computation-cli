import { PRECISION_SCALE } from "../constants";
import type {
  Deposit,
  DepositRequest,
  DepositRequestCanceled,
  RedeemRequest,
  SettleDeposit,
  SettleRedeem,
  TotalAssetsUpdated,
  Transfer,
} from "gql/graphql";

import { erc20Abi, type Address } from "viem";
// import type { DealEvent } from "./preprocess";
import type { ReferralConfig, ReferralCustom } from "types/Vault";
import type { DealEvent } from "./preprocess";
import { publicClient } from "lib/publicClient";

export class State {
  public totalSupply = 0n;
  public totalAssets = 0n;
  public decimals: bigint;
  public feeReceiver: Address;

  public prePendingDeposits: Record<Address, bigint | undefined> = {};
  public prePendingRedeems: Record<Address, bigint | undefined> = {};

  public pendingDeposits: Record<Address, bigint | undefined> = {};
  public pendingRedeems: Record<Address, bigint | undefined> = {};

  public preReferrals: Record<Address, ReferralConfig | undefined> = {}; // first address is referee, second is referrer
  public referrals: Record<Address, ReferralConfig | undefined> = {};

  public lastFees = 0n;

  public state: Record<
    Address,
    { balance: bigint; cashback: bigint; fees: bigint }
  > = {};

  constructor({
    feeReceiver,
    decimals,
  }: {
    feeReceiver: Address;
    decimals: bigint;
  }) {
    this.feeReceiver = feeReceiver;
    this.decimals = decimals;
    this.state[feeReceiver] = {
      balance: 0n,
      fees: 0n,
      cashback: 0n,
    };
  }

  public depositRequest(event: DepositRequest) {
    const depositRequest = event as DepositRequest;
    const depositUser = depositRequest.controller;

    if (this.prePendingDeposits[depositUser] === undefined)
      this.prePendingDeposits[depositUser] = 0n;
    // we put those assets in prePendingDeposit because users can still cancel
    this.prePendingDeposits[depositUser] += depositRequest.assets;
  }

  public redeemRequest(event: RedeemRequest) {
    const redeemRequest = event as RedeemRequest;
    const redeemUser = redeemRequest.owner;
    if (this.prePendingRedeems[redeemUser] === undefined)
      this.prePendingRedeems[redeemUser] = 0n;

    this.prePendingRedeems[redeemUser] += redeemRequest.shares;
  }

  public handleTotalAssetsUpdated(event: TotalAssetsUpdated) {
    this.totalAssets = event.totalAssets;
  }

  public handleNewTotalAssetsUpdated() {
    // all the prePendingDeposits are ready to be settle, we can promute them
    // to the pendingDeposits mapping
    for (const [address, deposited] of Object.entries(
      this.prePendingDeposits
    )) {
      if (!this.pendingDeposits[address as Address])
        this.pendingDeposits[address as Address] = 0n;

      this.pendingDeposits[address as Address]! += deposited!;
    }

    // same logic for the redeem
    for (const [address, deposited] of Object.entries(this.prePendingRedeems)) {
      if (this.pendingRedeems[address as Address]) {
        this.pendingRedeems[address as Address]! += deposited!;
      } else {
        this.pendingRedeems[address as Address] = deposited;
      }
    }

    // we reinitialized both
    this.prePendingDeposits = {};
    this.prePendingRedeems = {};
  }

  public handleDeposit(event: Deposit) {
    const { sender, owner, shares } = event;
    const receiver = owner;
    const controller = sender;
    if (controller !== receiver) {
      this.state[receiver].balance -= shares;

      if (this.state[controller]) {
        this.state[controller].balance += shares;
      } else {
        this.state[controller] = {
          balance: shares,
          cashback: 0n,
          fees: 0n,
        };
      }
    }
  }

  public handleDepositRequestCanceled(event: DepositRequestCanceled) {
    this.prePendingDeposits[event.controller] = 0n;
    this.preReferrals[event.controller] = undefined;
  }

  public handleSettleDeposit(event: SettleDeposit) {
    const {
      sharesMinted,
      assetsDeposited,
      totalSupply: newTotalSupply,
      totalAssets: newTotalAssets,
    } = event;

    this.totalSupply = newTotalSupply;
    this.totalAssets = newTotalAssets;
    for (const [address, userRequest] of Object.entries(this.pendingDeposits)) {
      if (!this.state[address as Address]) {
        this.state[address as Address] = {
          balance: 0n,
          fees: 0n,
          cashback: 0n,
        };
      }

      this.state[address as Address].balance +=
        (userRequest! * sharesMinted) / assetsDeposited;
      // we don't update total supply because it will naturally be updated via the transfer
    }
    this.pendingDeposits = {};

    for (const [referee, config] of Object.entries(this.preReferrals)) {
      if (!this.referrals[referee as Address])
        this.referrals[referee as Address] = config;
    }
    this.preReferrals = {};
  }

  public handleSettleRedeem(event: SettleRedeem) {
    this.totalSupply = event.totalSupply;
    this.totalAssets = event.totalAssets;

    for (const [address, redeemed] of Object.entries(this.pendingRedeems)) {
      if (this.state[address as Address]) {
        this.state[address as Address].balance -= redeemed!;
      }
    }
    this.pendingRedeems = {};
  }

  public handleFeeTransfer(event: Transfer) {
    const totalFees = BigInt(event.value) * PRECISION_SCALE;
    let feePerUser: Record<Address, bigint> = {};
    // this.lastFees = BigInt(event.value);

    // we compute how much fees they paid for this epoch
    // TODO: only if we are >= fromBlock
    for (const [address, { balance }] of Object.entries(this.state)) {
      feePerUser[address as Address] = (balance * totalFees) / this.totalSupply;
    }

    // then we increment the total of fees they paid
    // TODO: only if we are >= fromBlock
    for (const [address, fees] of Object.entries(feePerUser)) {
      this.state[address as Address].fees += fees;
    }

    // we can also update the feeReceiver balance
    // we must do this after everything
    this.state[this.feeReceiver].balance += BigInt(event.value);
    this.totalSupply += BigInt(event.value);
  }

  public handleTransfer(event: Transfer) {
    if (!this.state[event.from]) {
      return;
    }

    // we decrement the balance of the sender
    this.state[event.from].balance -= BigInt(event.value);
    // we initiate the state if it is not
    if (!this.state[event.to])
      this.state[event.to] = {
        balance: 0n,
        fees: 0n,
        cashback: 0n,
      };

    // we increment the balance of the receiver
    this.state[event.to].balance += BigInt(event.value);
  }

  public handleReferral(event: ReferralCustom) {
    if (event.owner === event.referral) return;
    if (this.preReferrals[event.owner]) return;
    else {
      this.preReferrals[event.owner] = this.preReferrals[event.referral];
    }
  }

  public pricePerShare(): bigint {
    return (10n ** this.decimals * this.totalAssets) / this.totalSupply;
  }

  public handleDeal(deal: DealEvent) {
    this.preReferrals[deal.owner] = {
      feeBonus: deal.feeBonus,
      feeRebate: deal.feeRebate,
      referrer: deal.referral,
    };
  }

  public getState() {
    return this.state;
  }

  public async testSupply(
    blockNumber: number,
    address: Address
  ): Promise<bigint> {
    const acc = this.accumulatedSupply();
    if (this.totalSupply + 100n < acc || this.totalSupply - 100n > acc) {
      console.log(this.totalSupply, acc);
      console.log("this.totalSupply   ", "acc");

      console.log(
        "Good value",
        await this.rightTotalSupply(blockNumber, address)
      );
      throw "lala";
    }
    console.log(" ");
    return acc;
  }

  public accumulatedSupply(): bigint {
    const states = Object.entries(this.state);
    const acc = states.reduce((acc, curr) => acc + curr[1].balance, 0n);
    return acc;
  }

  public async rightTotalSupply(
    blockNumber: number,
    address: Address
  ): Promise<bigint> {
    const client = publicClient[1];
    const totalSupp = await client.readContract({
      abi: erc20Abi,
      functionName: "totalSupply",
      address,
      blockNumber: BigInt(blockNumber),
    });
    return totalSupp;
  }
}
