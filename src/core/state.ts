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
  RatesUpdated,
  FeeReceiverUpdated,
} from "gql/graphql";

import { erc20Abi, zeroAddress, type Address } from "viem";
import type { ReferralConfig, ReferralCustom } from "types/Vault";
import { publicClient } from "lib/publicClient";
import { convertBigIntToNumber, convertToAssets, convertToShares } from "utils/convertTo";
import type { DealEvent, PeriodFees, ProcessEventParams, Rates } from "./types";

export class State {
  public totalSupply = 0n;
  public totalAssets = 0n;
  public lastTotalAssetsUpdateTimestamp = 0;
  public nextManagementFees = 0n;
  public decimals: bigint;
  public feeReceiver: Address;
  // public address: Address;

  // Do not use those value directly, rely on the feeRates function
  private rates: Rates;
  private asset: { address: Address, decimals: number };
  private oldRates: Rates = {
    management: 0,
    performance: 0,
  };

  public newRatesTimestamp = 0;
  public cooldown = 0;

  public periodFees: PeriodFees = [];

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
    cooldown,
    rates,
    asset
  }: {
    feeReceiver: Address;
    decimals: bigint;
    asset: { address: Address, decimals: number };
    cooldown: number;
    rates: Rates;
  }) {
    this.feeReceiver = feeReceiver;
    this.decimals = decimals;
    this.accounts[feeReceiver] = {
      balance: 0n,
      fees: 0n,
      cashback: 0n,
    };

    this.cooldown = cooldown;
    this.rates = {
      management: rates.management / Number(BPS_DIVIDER),
      performance: rates.performance / Number(BPS_DIVIDER),
    };
    this.asset = asset;
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

    // this is for usual computation
    // compute 4% of annual fees value in shares
    if (this.lastTotalAssetsUpdateTimestamp != 0) {
      const timepast =
        Number(event.blockTimestamp) - this.lastTotalAssetsUpdateTimestamp;
      const ratioOverAYear = YEAR_IN_SECONDS / Number(timepast);
      const percentToDeposit =
        this.feeRates(event.blockNumber).management / ratioOverAYear;

      const assetsToDeposits = Math.trunc(
        percentToDeposit * Number(this.totalAssets)
      );

      // this is to compute the repartition between management and performance fees
      this.nextManagementFees = convertToShares({
        assets: BigInt(assetsToDeposits),
        totalAssets: this.totalAssets - BigInt(assetsToDeposits),
        totalSupply: this.totalSupply,
      });
    }

    this.periodFees.push({
      managementFees: "0",
      blockNumber: Number(event.blockNumber),
      performanceFees: "0",
      period: this.periodFees.length,
      timestamp: Number(event.blockTimestamp),
      managementRate: this.rates.management,
      performanceRate: this.rates.performance,
      pricePerShare: convertBigIntToNumber(this.pricePerShare(), Number(this.asset.decimals))
    });
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
    const periodLength = this.periodFees.length;
    const lastPeriod = this.periodFees[periodLength - 1];
    lastPeriod.pricePerShare = convertBigIntToNumber(this.pricePerShare(), Number(this.asset.decimals))
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
    const periodLength = this.periodFees.length;
    const lastPeriod = this.periodFees[periodLength - 1];
    lastPeriod.pricePerShare = convertBigIntToNumber(this.pricePerShare(), Number(this.asset.decimals))
  }

  private createAlternateFunction(): () => bigint {
    let lastValue = 1n; // Commence à 1 pour que le premier appel retourne 0

    return function alternateZeroOne(): bigint {
      lastValue = lastValue === 0n ? 1n : 0n; // Alterne entre 0 et 1
      return lastValue;
    };
  }

  public handleFeeReceiverUpdateds(event: FeeReceiverUpdated) {
    this.feeReceiver = event.newReceiver;
  }

  public handleRatesUpdateds(event: RatesUpdated) {
    this.newRatesTimestamp = event.blockTimestamp + this.cooldown;

    const currentRates = this.rates;
    this.rates = {
      management: event.newRate_managementRate / Number(BPS_DIVIDER),
      performance: event.newRate_performanceRate / Number(BPS_DIVIDER),
    };

    this.oldRates = currentRates;
  }

  public feeRates(blockTimestamp: number) {
    if (this.newRatesTimestamp <= blockTimestamp) return this.rates;
    return this.oldRates;
  }

  public handleTransfer(event: Transfer, distributeFees: boolean) {
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

    // this is a fee transfer
    if (
      this.feeReceiver.toLowerCase() == event.to.toLowerCase() &&
      event.from == zeroAddress
    ) {
      this.handleFeeTransfer(event, distributeFees);
    }
    // console.log({ feeReceiver: this.feeReceiver });
    // we decrement the balance of the sender
    if (event.from == zeroAddress)
      this.totalSupply += BigInt(event.value); // mint
    else this.accounts[event.from].balance -= BigInt(event.value); // transfer
    // we initiate the accounts if it is not

    if (event.to == zeroAddress)
      this.totalSupply -= BigInt(event.value); // burn
    // we increment the balance of the receiver
    else this.accounts[event.to].balance += BigInt(event.value); //transfer
  }

  private handleFeeTransfer(event: Transfer, distributeFees: boolean) {
    const totalFees = BigInt(event.value);

    // we compute how much fees they paid for this epoch
    // we emulated the rounding system of openzeppelin by adding 0 or 1
    if (distributeFees) {
      // let checkTotal = 0n;
      this.accumulatedFees += totalFees;
      for (const [address, { balance }] of Object.entries(this.accounts)) {
        this.accounts[address as Address].fees +=
          (balance * totalFees) / this.totalSupply + this.alternateZeroOne();
      }
      const periodLength = this.periodFees.length;
      const lastPeriod = this.periodFees[periodLength - 1];
      lastPeriod.managementFees = this.nextManagementFees.toString();
      lastPeriod.performanceFees = (
        totalFees - this.nextManagementFees
      ).toString();
    }

    // we must increase the totalSupply after computation
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
    const decimalsOffset = this.decimals - BigInt(this.asset.decimals)
    return ((this.totalAssets + 1n) * 10n ** this.decimals) / (this.totalSupply + 10n ** decimalsOffset);
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

  public accumulatedBalances(): bigint {
    let tt = 0n;
    for (const [_, { balance }] of Object.entries(this.accounts)) {
      tt += balance;
    }
    return tt;
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
    blockNumber: bigint,
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
    blockNumber: bigint,
    address: Address
  ): Promise<bigint> {
    const acc = this.accumulatedSupply();
    if (this.totalSupply + 100n < acc || this.totalSupply - 100n > acc) {
      console.error({ error: "Error", totalSupply: this.totalSupply, acc });

      console.error(
        "Good value",
        await this.rightTotalSupply(blockNumber, address)
      );
      throw "mismatch in totalsupply";
    } else console.log("Supply is good");
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

  public processEvent({ event, fromBlock }: ProcessEventParams) {
    if (event.__typename === "TotalAssetsUpdated") {
      this.handleTotalAssetsUpdated(event as TotalAssetsUpdated);
    } else if (event.__typename === "NewTotalAssetsUpdated") {
      this.handleNewTotalAssetsUpdated();
    } else if (event.__typename === "Deposit") {
      this.handleDeposit(event as Deposit);
    } else if (event.__typename === "DepositRequest") {
      this.depositRequest(event as DepositRequest);
    } else if (event.__typename === "DepositRequestCanceled") {
      this.handleDepositRequestCanceled(event as DepositRequestCanceled);
    } else if (event.__typename === "RedeemRequest") {
      this.redeemRequest(event as RedeemRequest);
    } else if (event.__typename === "SettleDeposit") {
      this.handleSettleDeposit(event as SettleDeposit);
    } else if (event.__typename === "SettleRedeem") {
      this.handleSettleRedeem(event as SettleRedeem);
    } else if (event.__typename === "Transfer") {
      this.handleTransfer(
        event as Transfer,
        BigInt(fromBlock) < event.blockNumber
      );
    } else if (event.__typename === "Referral") {
      this.handleReferral(event as ReferralCustom);
    } else if (event.__typename === "Deal") {
      this.handleDeal(event as any as DealEvent); // TODO: fix any
    } else if (event.__typename === "FeeReceiverUpdated") {
      this.handleFeeReceiverUpdateds(event as FeeReceiverUpdated);
    } else if (event.__typename === "RatesUpdated") {
      this.handleRatesUpdateds(event as RatesUpdated);
    } else {
      throw new Error(`Unknown event ${event.__typename} : ${event}`);
    }
  }
}
