import { BPS_DIVIDER, YEAR_IN_SECONDS } from "../utils/constants";
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
} from "../../gql/graphql";

import { erc20Abi, maxUint256, zeroAddress, type Address } from "viem";
import { publicClient } from "lib/publicClient";
import { convertBigIntToNumber } from "utils/convertTo";
import type {
  RebateEvent,
  PeriodFees,
  PointEvent,
  ProcessEventParams,
  ProcessEventsParams,
  Rates,
  ReferralConfig,
  ReferralEvent,
} from "./types";
// import { SolidityMath } from "utils/math";
import { PointTracker } from "./pointTracker";
import { UserAccount } from "./userAccount";
import { RatesManager } from "./rates";
import { fetchVault } from "utils/fetchVault";
import { fetchVaultStateUpdateds } from "utils/fetchVaultStateUpdateds";
import { MathLib } from "@morpho-org/blue-sdk";

export async function generateVault({
  vault,
}: {
  vault: { address: Address; chainId: number };
}): Promise<Vault> {
  const stateUpdateds = await fetchVaultStateUpdateds({
    chainId: vault.chainId,
    vaultAddress: vault.address,
  });
  if (!stateUpdateds || stateUpdateds.stateUpdateds.length == 0)
    throw new Error(`Vault ${vault.address} doesn't exist`);
  const vaultData = await fetchVault({
    ...vault,
    block: BigInt(stateUpdateds.stateUpdateds[0].blockNumber),
  });

  return new Vault({
    feeReceiver: vaultData.feesReceiver,
    decimals: vaultData.decimals,
    asset: vaultData.asset,
    rates: vaultData.rates.rates,
    cooldown: vaultData.cooldown,
    silo: vaultData.silo,
  });
}

class Vault {
  public totalSupply = 0n;
  public totalAssets = 0n;
  public lastTotalAssetsUpdateTimestamp = 0;
  public nextManagementFees = 0n;
  public decimals: number;
  public decimalsOffset: bigint;
  public feeReceiver: Address;
  public silo: Address;
  private pointTracker = new PointTracker();

  private ratesManager: RatesManager;

  public asset: { address: Address; decimals: number };

  public periodFees: PeriodFees = [];

  public prePendingDeposits: Record<Address, bigint | undefined> = {};
  public prePendingRedeems: Record<Address, bigint | undefined> = {};

  public pendingDeposits: Record<Address, bigint | undefined> = {};
  public pendingRedeems: Record<Address, bigint | undefined> = {};

  // We need a 2 step referral system here in case a user cancel his deposits.
  // In this case the referral is voided.
  public preReferrals: Record<Address, ReferralConfig | undefined> = {}; // first address is referee, second is referrer
  public preRebate: Record<Address, number | undefined> = {};
  // public referrals: Record<Address, ReferralConfig | undefined> = {};

  private accounts: Record<Address, UserAccount> = {};
  private alternateZeroOne = this.createAlternateFunction();

  // DEBUG //
  public accumulatedFees = 0n;

  constructor({
    feeReceiver,
    decimals,
    cooldown,
    rates,
    asset,
    silo,
  }: {
    feeReceiver: Address;
    silo: Address;
    decimals: number;
    cooldown: number;
    rates: Rates;
    asset: { address: Address; decimals: number };
  }) {
    this.feeReceiver = feeReceiver;
    this.decimals = decimals;

    this.accounts[feeReceiver] = new UserAccount(feeReceiver);

    this.ratesManager = new RatesManager(rates, cooldown);
    this.asset = asset;
    this.silo = silo;
    this.decimalsOffset = BigInt(decimals - asset.decimals);
  }

  private depositRequest(event: DepositRequest) {
    const depositRequest = event as DepositRequest;
    const depositUser = depositRequest.controller;

    if (this.prePendingDeposits[depositUser] === undefined)
      this.prePendingDeposits[depositUser] = 0n;
    // we put those assets in prePendingDeposit because users can still cancel
    this.prePendingDeposits[depositUser] += depositRequest.assets;
  }

  private redeemRequest(event: RedeemRequest) {
    const redeemRequest = event as RedeemRequest;
    const redeemUser = redeemRequest.owner;
    if (this.prePendingRedeems[redeemUser] === undefined)
      this.prePendingRedeems[redeemUser] = 0n;

    this.prePendingRedeems[redeemUser] += redeemRequest.shares;
  }

  private handleTotalAssetsUpdated(event: TotalAssetsUpdated) {
    this.totalAssets = event.totalAssets;

    // compute the next management fees
    if (this.lastTotalAssetsUpdateTimestamp != 0) {
      const timepast =
        Number(event.blockTimestamp) - this.lastTotalAssetsUpdateTimestamp;
      const ratioOverAYear = YEAR_IN_SECONDS / Number(timepast);
      const percentToDeposit =
        this.feeRates(Number(event.blockTimestamp)).management / ratioOverAYear;

      const feesInAsset = Math.trunc(
        percentToDeposit * Number(this.totalAssets)
      );

      this.nextManagementFees = MathLib.mulDivUp(
        BigInt(feesInAsset),
        this.totalSupply + 10n ** BigInt(this.decimalsOffset),
        this.totalAssets - BigInt(feesInAsset) + 1n
      );
    }

    const rates = this.feeRates(Number(event.blockTimestamp));
    this.periodFees.push({
      managementFees: this.nextManagementFees.toString(),
      blockNumber: Number(event.blockNumber),
      performanceFees: "0", // we will update this in handleFeeTransfer, because we don't know the performance fees yet
      period: this.periodFees.length,
      timestamp: Number(event.blockTimestamp),
      managementRate: rates.management,
      performanceRate: rates.performance,
      pricePerShare: convertBigIntToNumber(
        this.pricePerShare(),
        this.asset.decimals
      ),
    });
    this.lastTotalAssetsUpdateTimestamp = event.blockTimestamp;
  }

  private handleNewTotalAssetsUpdated() {
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

  private handleDeposit(event: Deposit) {
    const { sender, owner, shares } = event;
    const receiver = owner;
    const controller = sender;

    if (controller.toLowerCase() === receiver.toLowerCase()) return; // in this case the balance are already updated in the transfer event

    this.getOrCreateAccount(receiver).increaseBalance(shares);
    this.getOrCreateAccount(controller).decreaseBalance(shares);
  }

  private handleDepositRequestCanceled(event: DepositRequestCanceled) {
    this.prePendingDeposits[event.controller] = 0n;
    this.preReferrals[event.controller] = undefined;
    this.preRebate[event.controller] = undefined;
  }

  private handleSettleDeposit(event: SettleDeposit) {
    const { totalSupply, totalAssets } = event;

    this.totalSupply = totalSupply;
    this.totalAssets = totalAssets;

    // for each users who has pending deposit:
    for (const [address, userRequest] of Object.entries(this.pendingDeposits)) {
      // we initiate his accounts
      const acc = this.getOrCreateAccount(address as Address);

      const shares = MathLib.mulDivDown(
        userRequest!,
        totalSupply + 10n ** this.decimalsOffset,
        totalAssets + 1n
      );

      // we increase it's balance (like if he claimed his shares)
      acc.increaseBalance(shares);
      // we don't update total supply because it will naturally be updated via the transfer
    }
    this.pendingDeposits = {};

    for (const [referee, config] of Object.entries(this.preReferrals)) {
      const refereeAcc = this.getOrCreateAccount(referee as Address);
      if (refereeAcc.getReferral() == undefined && config) {
        refereeAcc.setReferral(config.referral, config.rewardRateBps!);
      }
    }
    for (const [referee, rebate] of Object.entries(this.preRebate)) {
      const refereeAcc = this.getOrCreateAccount(referee as Address);
      if (refereeAcc.getRebateRateBps() == undefined && rebate) {
        refereeAcc.setRebateRateBps(rebate);
      }
    }
    this.preReferrals = {};
    this.preRebate = {};
    const periodLength = this.periodFees.length;
    const lastPeriod = this.periodFees[periodLength - 1];
    lastPeriod.pricePerShare = convertBigIntToNumber(
      this.pricePerShare(),
      this.asset.decimals
    );
  }

  private handleSettleRedeem(event: SettleRedeem) {
    this.totalSupply = event.totalSupply;
    this.totalAssets = event.totalAssets;

    for (const [address, redeemed] of Object.entries(this.pendingRedeems)) {
      if (this.accounts[address as Address]) {
        // why this check ?\
        this.accounts[address as Address].decreaseBalance(redeemed || 0n);
      }
    }
    this.pendingRedeems = {};
    const periodLength = this.periodFees.length;
    const lastPeriod = this.periodFees[periodLength - 1];
    lastPeriod.pricePerShare = convertBigIntToNumber(
      this.pricePerShare(),
      Number(this.asset.decimals)
    );
  }

  private createAlternateFunction(): () => bigint {
    let lastValue = 1n; // Commence à 1 pour que le premier appel retourne 0

    return function alternateZeroOne(): bigint {
      lastValue = lastValue === 0n ? 1n : 0n; // Alterne entre 0 et 1
      return lastValue;
    };
  }

  private handleFeeReceiverUpdateds(event: FeeReceiverUpdated) {
    this.feeReceiver = event.newReceiver;
  }

  private handleRatesUpdateds(event: RatesUpdated) {
    this.ratesManager.handleRatesUpdated({
      blockTimestamp: event.blockTimestamp,
      rates: {
        management: event.newRate_managementRate,
        performance: event.newRate_performanceRate,
      },
    });
  }

  public feeRates(blockTimestamp: number) {
    return this.ratesManager.feeRates(blockTimestamp);
  }

  private handleTransfer(event: Transfer, distributeFees: boolean) {
    // we initiate the accounts if it is not
    const to: UserAccount = this.getOrCreateAccount(event.to);
    const from: UserAccount = this.getOrCreateAccount(event.from);

    // this is a fee transfer
    if (
      this.feeReceiver.toLowerCase() == event.to.toLowerCase() &&
      event.from == zeroAddress
    ) {
      this.handleFeeTransfer(event, distributeFees);
    }

    // we decrement the balance of the sender
    if (event.from == zeroAddress)
      this.totalSupply += BigInt(event.value); // mint
    else {
      from.decreaseBalance(BigInt(event.value)); // transfer
    }
    // we initiate the accounts if it is not

    if (event.to == zeroAddress)
      this.totalSupply -= BigInt(event.value); // burn
    // we increment the balance of the receiver
    else to.increaseBalance(BigInt(event.value)); //transfer
  }

  private getOrCreateAccount(address: Address): UserAccount {
    if (!this.accounts[address.toLowerCase() as Address])
      this.accounts[address.toLowerCase() as Address] = new UserAccount(
        address
      );
    return this.accounts[address.toLowerCase() as Address];
  }

  private handleFeeTransfer(event: Transfer, distributeFees: boolean) {
    if (!distributeFees) return;
    const totalFees = BigInt(event.value);
    // we compute how much fees they paid for this epoch
    // we emulated the rounding system of openzeppelin by adding 0 or 1
    this.accumulatedFees += totalFees;

    // let distributedFees = 0n;
    const _accounts = Object.values(this.accounts).filter(
      (acc) => acc.address != zeroAddress
    );

    for (const [_, acc] of _accounts.entries()) {
      const fees =
        (acc.getBalance() * totalFees) / this.totalSupply +
        this.alternateZeroOne();

      acc.increaseFees(fees);
    }
    const periodLength = this.periodFees.length;
    const lastPeriod = this.periodFees[periodLength - 1];
    lastPeriod.performanceFees = (
      totalFees - this.nextManagementFees
    ).toString();
  }

  private handleReferral(event: ReferralEvent) {
    const owner = this.getOrCreateAccount(event.owner);

    if (event.offchain) {
      // if the referral is offchain, it is immediatly enforced
      // it means also that 2 referrals with colliding config with overide each other
      owner.setReferral(event.referral, event.rewardRateBps);
      owner.setRebateRateBps(event.rebateRateBps);
      return;
    }
    // in a referral, the referrer (event.referral) get X% of the fees of the referee (event.owner) as a reward
    // the referee gets a rebate of Y% on his fees
    //
    this.preRebate[event.owner] = event.rebateRateBps;
    // we don't overwrite the referral if it is already set
    if (this.preReferrals[event.owner] == undefined) {
      this.preReferrals[event.owner] = {
        rewardRateBps: event.rewardRateBps,
        referral: event.referral,
      };
    }
  }

  public pricePerShare(): bigint {
    const decimalsOffset = this.decimals - this.asset.decimals;
    return (
      ((this.totalAssets + 1n) * 10n ** BigInt(this.decimals)) /
      (this.totalSupply + 10n ** BigInt(decimalsOffset))
    );
  }

  private handleRebateDeal(deal: RebateEvent) {
    // a rebate deal is automatically enforced
    const account = this.getOrCreateAccount(deal.owner);
    account.setRebateRateBps(deal.feeRebateRate);
  }

  protected handlePoint(point: PointEvent) {
    const diff = this.pointTracker.registerPoint({
      amount: point.amount,
      name: point.name,
      timestamp: point.blockTimestamp,
    });
    const accountsArray = Object.entries(this.accounts);
    accountsArray.forEach((user) => {
      const account = user[1];
      if (this.totalSupply == 0n || !this.totalSupply) {
        throw new Error(
          `Totalsupply is 0, ${point.name} point distribution is not possible at ${point.blockTimestamp}`
        );
      }

      const userPart =
        (Number(account.getBalance()) * diff) / Number(this.totalSupply);
      account.increasePoints(point.name, userPart);
    });
  }

  public pointNames(): string[] {
    return this.pointTracker.pointNames();
  }

  public distributeRebatesAndRewards() {
    const accountsArray = Object.values(this.accounts);
    accountsArray.forEach((account) => {
      const fees = account.getFees();
      const rebate = account.getRebateRateBps() || 0;
      const reward = account.getReferral()?.rewardRateBps || 0;
      const referral = account.getReferral()?.referral;

      // we make sure that the rebate deals and referral rewards do not lead to an excessive distribution of cashback
      if (rebate + reward > Number(BPS_DIVIDER)) {
        throw new Error(
          `Fee rebate (${rebate / 100}%) + referral reward (${
            reward / 100
          }%) is greater than 100% for ${account.address}`
        );
      }
      account.increaseCashback((fees * BigInt(rebate)) / BPS_DIVIDER);
      if (referral) {
        const referrerAcc = this.getOrCreateAccount(referral);
        referrerAcc.increaseCashback((fees * BigInt(reward)) / BPS_DIVIDER);
      }
    });
  }

  public accumulatedSupply(): bigint {
    const accountss = Object.entries(this.accounts);
    const acc = accountss.reduce((acc, curr) => acc + curr[1].getBalance(), 0n);
    return acc;
  }

  public accumulatedFeesSinceFromBlock(): bigint {
    const accountss = Object.entries(this.accounts);
    const acc = accountss.reduce((acc, curr) => acc + curr[1].getFees(), 0n);
    return acc;
  }

  public balance(user: Address): bigint {
    return this.accounts[user].getBalance();
  }

  public totalPointsAmongUsers(name: string): number {
    let accumulated = 0;
    for (const acc of Object.values(this.accounts)) {
      accumulated += acc.getPoints(name);
    }
    return accumulated;
  }

  public lastPointEventValue(name: string): number {
    const dot = this.pointTracker.lastPoint(name);
    if (!dot) return 0;
    return dot.amount;
  }

  public accumulatedBalances(): bigint {
    let tt = 0n;
    for (const [_, acc] of Object.entries(this.accounts)) {
      tt += acc.getBalance();
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

  /**
   * Process a list of events
   * @param events - The list of events to process, must be sorted by block number
   *   @field RebateDeal Deals will override the previous ones
   * @param distributeFeesFromBlock - The block number from which to distribute fees
   * @param blockEndHook - A hook to call when the block is done, perfect for testing
   * @param blockStartHook - A hook to call when the block is started, perfect for testing
   */
  public async processEvents({
    events,
    distributeFeesFromBlock,
    blockEndHook,
  }: ProcessEventsParams) {
    for (let i = 0; i < events.length; i++) {
      const currentBlock: bigint = events[i].blockNumber;
      const nextBlock = events[i + 1] ? events[i + 1].blockNumber : maxUint256;
      this.processEvent({
        event: events[i] as { __typename: string; blockNumber: bigint },
        distributeFeesFromBlock,
      });

      // if we are done with the block, we can call the hook
      if (currentBlock != nextBlock && blockEndHook)
        await blockEndHook(currentBlock);
    }
  }

  public processEvent({ event, distributeFeesFromBlock }: ProcessEventParams) {
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
        BigInt(distributeFeesFromBlock) < event.blockNumber
      );
    } else if (event.__typename === "Referral") {
      this.handleReferral(event as unknown as ReferralEvent);
    } else if (event.__typename === "RebateDeal") {
      this.handleRebateDeal(event as unknown as RebateEvent); // TODO: fix any
    } else if (event.__typename === "FeeReceiverUpdated") {
      this.handleFeeReceiverUpdateds(event as FeeReceiverUpdated);
    } else if (event.__typename === "RatesUpdated") {
      this.handleRatesUpdateds(event as RatesUpdated);
    } else if (event.__typename === "Point") {
      this.handlePoint(event as any as PointEvent); // TODO: fix any
    } else {
      throw new Error(`Unknown event ${event.__typename} : ${event}`);
    }
  }

  // DEBUG AND TESTING PURPOSE
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

  public getAccountsAddresses(): Address[] {
    return Object.keys(this.accounts) as Address[];
  }

  public getAccount(address: Address): UserAccount {
    return this.accounts[address.toLowerCase() as Address];
  }

  public getAccounts(): UserAccount[] {
    return Object.values(this.accounts);
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
}
