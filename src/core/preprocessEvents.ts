import type { Transfer } from "../../gql/graphql";
import { type Address } from "viem";
import type {
  RebateEvent,
  RebateDeals,
  PointEvent,
  PreProcessingParams,
  ReferralEvent,
  VaultAddrresses,
} from "./types";
import type { OffChainReferral } from "parsing/parseOffchainReferrals";

export function preprocessEvents({
  events,
  addresses,
  rebateDeals = {},
  offChainReferrals,
  points,
  defaultReferralRate = 0,
}: PreProcessingParams) {
  // Process all event types
  preprocessDeposits(events);
  preprocessDepositRequestCanceleds(events);
  preprocessDepositRequests(events);
  preprocessRedeemRequests(events);
  preprocessSettleRedeems(events);
  preprocessSettleDeposits(events);
  preprocessTotalAssetsUpdateds(events);
  preprocessNewTotalAssetsUpdateds(events);
  preprocessRatesUpdateds(events);
  preprocessFeeReceiverUpdateds(events);
  const transfers = preprocessTransfers(events.transfers, addresses);

  // Add offchain points events
  const pointsEvents = preprocessPoints(points, addresses.vault);

  const rebates: RebateEvent[] = preprocessRebateDeals(rebateDeals);
  const referrals: ReferralEvent[] = preprocessReferrals({
    referrals: events.referrals,
    offChainReferrals,
    defaultReferralRate,
  });

  // Combine all events and sort chronologically
  const sorted = [
    ...events.newTotalAssetsUpdateds,
    ...events.depositRequests,
    ...events.depositRequestCanceleds,
    ...events.redeemRequests,
    ...events.deposits,
    ...events.totalAssetsUpdateds,
    ...events.settleDeposits,
    ...events.settleRedeems,
    ...events.ratesUpdateds,
    ...events.feeReceiverUpdateds,
    ...rebates,
    ...pointsEvents,
    ...referrals,
    ...transfers,
  ].sort((a, b) => {
    // in this case it means it is not a real on chain event, we need to use the timestamp to order it.
    if (a.blockNumber == -1 || b.blockNumber == -1)
      if (a.blockTimestamp < b.blockTimestamp) return -1;
      else return 1;
    if (a.blockNumber < b.blockNumber) return -1;
    if (a.blockNumber > b.blockNumber) return 1;
    if (a.logIndex < b.logIndex) return -1;
    if (a.logIndex > b.logIndex) return 1;
    return 0;
  });
  return sorted;
}

function preprocessDeposits(events: any) {
  events.deposits = events.deposits.map((e: any) => ({
    ...e,
    assets: BigInt(e.assets),
    shares: BigInt(e.shares),
    __typename: "Deposit",
  }));
}

function preprocessDepositRequestCanceleds(events: any) {
  events.depositRequestCanceleds = events.depositRequestCanceleds.map(
    (e: any) => ({
      ...e,
      __typename: "DepositRequestCanceled",
    })
  );
}

function preprocessDepositRequests(events: any) {
  events.depositRequests = events.depositRequests.map((e: any) => ({
    ...e,
    assets: BigInt(e.assets),
    __typename: "DepositRequest",
  }));
}

function preprocessRedeemRequests(events: any) {
  events.redeemRequests = events.redeemRequests.map((e: any) => ({
    ...e,
    shares: BigInt(e.shares),
    __typename: "RedeemRequest",
  }));
}

function preprocessSettleRedeems(events: any) {
  events.settleRedeems = events.settleRedeems.map((e: any) => ({
    ...e,
    assetsWithdrawed: BigInt(e.assetsWithdrawed),
    sharesBurned: BigInt(e.sharesBurned),
    totalAssets: BigInt(e.totalAssets),
    totalSupply: BigInt(e.totalSupply),
    __typename: "SettleRedeem",
  }));
}

function preprocessSettleDeposits(events: any) {
  events.settleDeposits = events.settleDeposits.map((e: any) => ({
    ...e,
    assetsDeposited: BigInt(e.assetsDeposited),
    sharesMinted: BigInt(e.sharesMinted),
    totalSupply: BigInt(e.totalSupply),
    totalAssets: BigInt(e.totalAssets),
    __typename: "SettleDeposit",
  }));
}

function preprocessTotalAssetsUpdateds(events: any) {
  events.totalAssetsUpdateds = events.totalAssetsUpdateds.map((e: any) => ({
    ...e,
    totalAssets: BigInt(e.totalAssets),
    __typename: "TotalAssetsUpdated",
  }));
}

function preprocessNewTotalAssetsUpdateds(events: any) {
  events.newTotalAssetsUpdateds = events.newTotalAssetsUpdateds.map(
    (e: any) => ({
      ...e,
      totalAssets: BigInt(e.totalAssets),
      __typename: "NewTotalAssetsUpdated",
    })
  );
}

function preprocessRatesUpdateds(events: any) {
  events.ratesUpdateds = events.ratesUpdateds.map((e: any) => ({
    ...e,
    __typename: "RatesUpdated",
  }));
}

function preprocessFeeReceiverUpdateds(events: any) {
  events.feeReceiverUpdateds = events.feeReceiverUpdateds.map((e: any) => ({
    ...e,
    __typename: "FeeReceiverUpdated",
  }));
}

function filterTransfers(
  transfers: Transfer[],
  addresses: VaultAddrresses
): Transfer[] {
  return transfers.filter(
    (t) =>
      // we ignore all transfers from and to the silo because those will be handled when we settleDeposit
      t.to.toLowerCase() != addresses.silo.toLowerCase() &&
      t.from.toLowerCase() != addresses.silo.toLowerCase() &&
      // we ignore all transfers from and to the vault because those will be handled when we settleDeposit
      t.to.toLowerCase() != addresses.vault.toLowerCase() &&
      t.from.toLowerCase() != addresses.vault.toLowerCase()
  );
}

function preprocessRebateDeals(deals: RebateDeals): RebateEvent[] {
  if (!deals) {
    return [];
  }

  // Add __typename to deals and we inject the parameters of the deals
  // An otc deal is a deal on the fee rebate exclusively
  // thus referral is the user and the feeRewardRate is 0

  const dealsArray = Object.entries(deals).map((deal) => {
    return {
      owner: deal[0] as Address,
      feeRebateRate: deal[1],
    };
  });
  // We create fake events for the deals to be able to process them like the other events
  // we give them a block number 0 and a timestamp 0 so that they are processed first
  return dealsArray.map((e) => ({
    ...e,
    blockNumber: 0,
    blockTimestamp: 0,
    feeRebateRate: e.feeRebateRate,
    logIndex: 0,
    id: "0x",
    transactionHash: "0x",
    vault: "0x",
    __typename: "RebateDeal",
  }));
}

function preprocessPoints(points: any, vaultAddress: string): PointEvent[] {
  return (
    points?.map((p: any) => ({
      __typename: "Point",
      amount: p.amount,
      blockNumber: -1,
      blockTimestamp: p.timestamp,
      logIndex: -1,
      vault: vaultAddress,
      name: p.name,
    })) || []
  );
}

function preprocessReferrals({
  referrals,
  offChainReferrals,
  defaultReferralRate,
}: {
  referrals: ReferralEvent[];
  offChainReferrals?: OffChainReferral[];
  defaultReferralRate: number;
}): ReferralEvent[] {
  // Add offchain referrals to the referrals array
  offChainReferrals?.forEach((referral) => {
    referrals.push({
      owner: referral.referred,
      referral: referral.referrer,
      feeRewardRate: referral.reward,
      assets: BigInt(referral.assets),
      blockNumber: 0,
      blockTimestamp: 0,
      logIndex: 0,
      requestId: 0n,
      id: "0x",
      transactionHash: "0x",
      __typename: "Referral",
    });
  });

  // Add __typename to referrals and we inject the parameters of the referral
  return referrals
    .map((e) => {
      return {
        owner: e.owner,
        referral: e.referral,
        feeRewardRate: Number(e.feeRewardRate || defaultReferralRate),
        assets: BigInt(e.assets),
        blockNumber: Number(e.blockNumber),
        blockTimestamp: Number(e.blockTimestamp),
        requestId: BigInt(e.requestId),
        __typename: "Referral" as const,
        id: e.id,
        transactionHash: e.transactionHash,
        logIndex: e.logIndex,
      };
    })
    .filter((r) => r.owner !== r.referral);
}

function preprocessTransfers(
  transfers: Transfer[],
  addresses: VaultAddrresses
): Transfer[] {
  // Add __typename to transfers, filter ignored addresses, and convert relevant fields to BigInt
  return filterTransfers(transfers, addresses).map((e) => ({
    ...e,
    value: BigInt(e.value),
    __typename: "Transfer",
  }));
}
