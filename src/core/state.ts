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

import type { Address } from "viem";
// import type { DealEvent } from "./preprocess";
import type { ReferralConfig, ReferralCustom } from "types/Vault";
import type { DealEvent } from "./preprocess";

export class State {
  private totalSupply = 0n;
  private totalAssets = 0n;
  private decimals: bigint;
  private feeReceiver: Address;

  private prePendingDeposits: Record<Address, bigint | undefined> = {};
  private prePendingRedeems: Record<Address, bigint | undefined> = {};

  private pendingDeposits: Record<Address, bigint | undefined> = {};
  private pendingRedeems: Record<Address, bigint | undefined> = {};

  private preReferrals: Record<Address, ReferralConfig | undefined> = {}; // first address is referee, second is referrer
  private referrals: Record<Address, ReferralConfig | undefined> = {};

  private lastFees = 0n;

  private result: Record<
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
    this.result[feeReceiver] = {
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
    this.totalSupply += this.lastFees;
    this.totalAssets = event.totalAssets;
  }

  public handleNewTotalAssetsUpdated() {
    for (const [address, deposited] of Object.entries(
      this.prePendingDeposits
    )) {
      if (this.pendingDeposits[address as Address]) {
        this.pendingDeposits[address as Address]! += deposited!;
      } else {
        this.pendingDeposits[address as Address] = deposited;
      }
    }

    for (const [address, deposited] of Object.entries(this.prePendingRedeems)) {
      if (this.pendingRedeems[address as Address]) {
        this.pendingRedeems[address as Address]! += deposited!;
      } else {
        this.pendingRedeems[address as Address] = deposited;
      }
    }

    this.prePendingDeposits = {};
    this.prePendingRedeems = {};
  }

  public handleDeposit(event: Deposit) {
    const { sender, owner, shares } = event;
    const receiver = owner;
    const controller = sender;
    if (controller !== receiver) {
      this.result[receiver].balance -= shares;

      if (this.result[controller]) {
        this.result[controller].balance += shares;
      } else {
        this.result[controller] = {
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

    for (const [address, deposited] of Object.entries(this.pendingDeposits)) {
      if (!this.result[address as Address]) {
        this.result[address as Address] = {
          balance: 0n,
          fees: 0n,
          cashback: 0n,
        };
      }

      this.result[address as Address].balance +=
        (deposited! * sharesMinted) / assetsDeposited;
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
      if (this.result[address as Address]) {
        this.result[address as Address].balance -= redeemed!;
      }
    }
    this.pendingRedeems = {};
  }

  public handleFeeTransfer(event: Transfer) {
    const totalFees = BigInt(event.value) * PRECISION_SCALE;
    let feePerUser: Record<Address, bigint> = {};
    console.log("he");
    this.lastFees = BigInt(event.value);

    for (const [address, { balance }] of Object.entries(this.result)) {
      console.log("ehco");
      feePerUser[address as Address] = (balance * totalFees) / this.totalSupply;
    }

    this.result[this.feeReceiver].balance += BigInt(event.value);

    for (const [address, fees] of Object.entries(feePerUser)) {
      console.log("let 's go");
      this.result[address as Address].fees += fees / PRECISION_SCALE;
    }
  }

  public handleTransfer(event: Transfer) {
    if (!this.result[event.from]) {
      return;
    }
    this.result[event.from].balance -= BigInt(event.value);
    if (this.result[event.to]) {
      this.result[event.to].balance += BigInt(event.value);
    } else {
      this.result[event.to] = {
        balance: BigInt(event.value),
        fees: 0n,
        cashback: 0n,
      };
    }
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

  public getResult() {
    return this.result;
  }
}
