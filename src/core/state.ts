import { BPS_DIVIDER, YEAR_IN_SECONDS } from "../constants";
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
import type { ReferralConfig, ReferralCustom } from "types/Vault";
import type { DealEvent } from "./preProcess";
import { publicClient } from "lib/publicClient";
import { convertToShares } from "utils/convertTo";

export class State {
  public totalSupply = 0n;
  public totalAssets = 0n;
  public lastTotalAssetsUpdateTimestamp = 0;
  public maxSharesForFees = 0n;
  public decimals: bigint;
  public feeReceiver: Address;

  public prePendingDeposits: Record<Address, bigint | undefined> = {};
  public prePendingRedeems: Record<Address, bigint | undefined> = {};

  public pendingDeposits: Record<Address, bigint | undefined> = {};
  public pendingRedeems: Record<Address, bigint | undefined> = {};

  public preReferrals: Record<Address, ReferralConfig | undefined> = {}; // first address is referee, second is referrer
  public referrals: Record<Address, ReferralConfig | undefined> = {};

  private accounts: Record<
    Address,
    { balance: bigint; cashback: bigint; fees: bigint }
  > = {};
  private alternateZeroOne = this.createAlternateFunction();

  // DEBUG //
  public accumulatedFees = 0n;

  constructor({
    feeReceiver,
    decimals,
  }: {
    feeReceiver: Address;
    decimals: bigint;
  }) {
    this.feeReceiver = feeReceiver;
    this.decimals = decimals;
    this.accounts[feeReceiver] = {
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
    //
    this.totalAssets = event.totalAssets;
    // compute 4% of annual fees value in shares
    // handle this.lastTotalAssetsUpdateTimestamp == 0
    const timepast =
      this.lastTotalAssetsUpdateTimestamp - Number(event.blockTimestamp);
    const ratioOverAYear = Number(timepast) / YEAR_IN_SECONDS;
    const percentToDeposit = 0.04 / ratioOverAYear;

    const assetsToDeposits = percentToDeposit * Number(this.totalAssets);
    const sharesToMint = convertToShares({
      assets: BigInt(assetsToDeposits),
      totalAssets: this.totalAssets - BigInt(assetsToDeposits),
      totalSupply: this.totalSupply,
    });
    this.maxSharesForFees = sharesToMint;

    this.lastTotalAssetsUpdateTimestamp = event.blockTimestamp;
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
      if (!this.pendingRedeems[address as Address])
        this.pendingRedeems[address as Address] = 0n;

      this.pendingRedeems[address as Address]! += deposited!;
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
      this.accounts[receiver].balance -= shares;

      if (this.accounts[controller]) {
        this.accounts[controller].balance += shares;
      } else {
        this.accounts[controller] = {
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
    // for each users who has pending deposit:
    for (const [address, userRequest] of Object.entries(this.pendingDeposits)) {
      // we initiate his accounts
      if (!this.accounts[address as Address]) {
        this.accounts[address as Address] = {
          balance: 0n,
          fees: 0n,
          cashback: 0n,
        };
      }

      // we increase it's balance (like if he claimed his shares)
      this.accounts[address as Address].balance +=
        (userRequest! * sharesMinted) / assetsDeposited;
      // we don't update total supply because it will naturally be updated via the transfer
    }
    this.pendingDeposits = {};

    for (const [referee, config] of Object.entries(this.preReferrals)) {
      if (!this.referrals[referee as Address]) {
        this.referrals[referee as Address] = config;
      }
    }
    this.preReferrals = {};
  }

  public handleSettleRedeem(event: SettleRedeem) {
    this.totalSupply = event.totalSupply;
    this.totalAssets = event.totalAssets;

    for (const [address, redeemed] of Object.entries(this.pendingRedeems)) {
      if (this.accounts[address as Address]) {
        this.accounts[address as Address].balance -= redeemed!;
      }
    }
    this.pendingRedeems = {};
  }

  private createAlternateFunction() {
    let lastValue = 1n; // Commence à 1 pour que le premier appel retourne 0

    return function alternateZeroOne(): bigint {
      lastValue = lastValue === 0n ? 1n : 0n; // Alterne entre 0 et 1
      return lastValue;
    };
  }

  public handleFeeTransfer(event: Transfer, distributeFees: boolean) {
    const totalFees = BigInt(event.value);

    const baseFees = Math.min(Number(totalFees), Number(this.maxSharesForFees));
    const extraFees = event.value - baseFees;

    console.debug({ baseFees, extraFees });
    this.accumulatedFees += totalFees;
    let feePerUser: Record<Address, bigint> = {};

    // we compute how much fees they paid for this epoch
    // we emulated the rounding system of openzeppelin by adding 0 or 1
    if (distributeFees) {
      for (const [address, { balance }] of Object.entries(this.accounts)) {
        feePerUser[address as Address] =
          (balance * totalFees) / this.totalSupply + this.alternateZeroOne();
      }
      // then we increment the total of fees they paid
      for (const [address, fees] of Object.entries(feePerUser)) {
        this.accounts[address as Address].fees += fees;
      }
    }

    // we can also update the feeReceiver balance
    // we must do this after everything
    this.accounts[this.feeReceiver].balance += BigInt(event.value);
    this.totalSupply += BigInt(event.value);
  }

  public handleTransfer(event: Transfer) {
    // we initiate the accounts if it is not
    if (!this.accounts[event.from])
      this.accounts[event.from] = {
        balance: 0n,
        fees: 0n,
        cashback: 0n,
      };

    if (!this.accounts[event.to])
      this.accounts[event.to] = {
        balance: 0n,
        fees: 0n,
        cashback: 0n,
      };

    // we decrement the balance of the sender
    this.accounts[event.from].balance -= BigInt(event.value);
    // we initiate the accounts if it is not

    // we increment the balance of the receiver
    this.accounts[event.to].balance += BigInt(event.value);
  }

  public handleReferral(event: ReferralCustom) {
    if (event.owner === event.referral) return;
    if (this.preReferrals[event.owner]) return;
    else {
      this.preReferrals[event.owner] = {
        feeRewardRate: event.feeRewardRate,
        feeRebateRate: event.feeRebateRate,
        referrer: event.referral,
      };
    }
  }

  public pricePerShare(): bigint {
    return (this.totalAssets * 10n ** this.decimals) / this.totalSupply;
  }

  public handleDeal(deal: DealEvent) {
    this.preReferrals[deal.owner] = {
      feeRewardRate: deal.feeRewardRate,
      feeRebateRate: deal.feeRebateRate,
      referrer: deal.referral,
    };
  }

  public rebate() {
    const accountsArray = Object.entries(this.accounts);
    accountsArray.forEach((user) => {
      const address = user[0] as Address;
      const referrer = this.referrals[address]?.referrer;
      const fees = this.accounts[address].fees;
      const rebate = this.referrals[address]?.feeRebateRate;
      const reward = this.referrals[address]?.feeRewardRate;

      if (rebate) {
        this.accounts[address].cashback +=
          (fees * BigInt(rebate)) / BPS_DIVIDER;
      }
      if (reward && referrer) {
        if (!this.accounts[referrer]) {
          this.accounts[referrer] = {
            balance: 0n,
            cashback: 0n,
            fees: 0n,
          };
        }
        this.accounts[referrer].cashback +=
          (fees * BigInt(reward)) / BPS_DIVIDER;
      }
    });
  }

  // public allAccounts(): Address[] {}

  public accumulatedSupply(): bigint {
    const accountss = Object.entries(this.accounts);
    const acc = accountss.reduce((acc, curr) => acc + curr[1].balance, 0n);
    return acc;
  }

  public accumulatedFeesSinceFromBlock(): bigint {
    const accountss = Object.entries(this.accounts);
    const acc = accountss.reduce((acc, curr) => acc + curr[1].fees, 0n);
    return acc;
  }

  public balance(user: Address): bigint {
    return this.accounts[user].balance;
  }

  public users(): Address[] {
    const _users: Address[] = [];
    for (const [address, _] of Object.entries(this.accounts)) {
      _users.push(address as Address);
    }
    return _users;
  }

  public async balanceOf(
    blockNumber: number,
    address: Address
  ): Promise<bigint> {
    const client = publicClient[1];
    const totalSupp = await client.readContract({
      abi: erc20Abi,
      functionName: "balanceOf",
      address,
      args: [address],
      blockNumber: BigInt(blockNumber),
    });
    return totalSupp;
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

  // DEBUG //
  public async testSupply(
    blockNumber: number,
    address: Address
  ): Promise<bigint> {
    const acc = this.accumulatedSupply();
    if (this.totalSupply + 100n < acc || this.totalSupply - 100n > acc) {
      console.error(this.totalSupply, acc);
      console.error("this.totalSupply   ", "acc");

      console.error(
        "Good value",
        await this.rightTotalSupply(blockNumber, address)
      );
      throw "mismatch in totalsupply";
    }
    console.error(" ");
    return acc;
  }

  public getAccountsDeepCopy(): Record<
    Address,
    { balance: bigint; cashback: bigint; fees: bigint }
  > {
    const copiedAccounts: Record<
      Address,
      { balance: bigint; cashback: bigint; fees: bigint }
    > = {};

    // Iterate through each account and copy its properties
    for (const [address, account] of Object.entries(this.accounts)) {
      copiedAccounts[address as Address] = {
        balance: account.balance,
        cashback: account.cashback,
        fees: account.fees,
      };
    }

    return copiedAccounts;
  }
}
