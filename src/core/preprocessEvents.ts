import type { Transfer, VaultEventsQuery } from "../../gql/graphql";
import type {
  RebateEvent,
  PointEvent,
  PreProcessingParams,
  ReferralEvent,
  VaultAddrresses,
} from "./types";
import type { OffChainReferral } from "parsing/parseOffchainReferrals";
import type { RebateDeal } from "parsing/parseRebateDeals";

// The preprocess of the events consist in filling them with the data we need to process them
// and sorting them chronologically.
// The last deal provided will override the previous ones.
export function preprocessEvents({
  events,
  addresses,
  rebateDeals = [],
  offChainReferrals,
  points,
  defaultReferralRateBps,
  defaultRebateRateBps,
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
    defaultReferralRateBps: defaultReferralRateBps || 0,
    defaultRebateRateBps: defaultRebateRateBps || 0,
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
    // if blocktimestamp is the same we use the lgoIndex
    if (a.blockTimestamp == b.blockTimestamp) return a.logIndex - b.logIndex;

    return a.blockTimestamp - b.blockTimestamp;
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

function preprocessRebateDeals(deals: RebateDeal[]): RebateEvent[] {
  // Add __typename to deals and we inject the parameters of the deals
  // An otc deal is a deal on the fee rebate exclusively

  // We create fake events for the deals to be able to process them like the other events
  // we give them a block number 0 and a timestamp 0 so that they are processed first

  return deals.map((e) => ({
    owner: e.owner,
    blockNumber: 0, // ordering doesn't matter for offchain rebate deals
    blockTimestamp: 0, // ordering doesn't matter for offchain rebate deals
    feeRebateRate: e.feeRebateRate,
    logIndex: 0, // ordering doesn't matter for offchain rebate deals
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
      blockNumber: 0,
      blockTimestamp: p.timestamp,
      logIndex: 0,
      vault: vaultAddress,
      name: p.name,
    })) || []
  );
}

function preprocessReferrals({
  referrals,
  offChainReferrals,
  defaultReferralRateBps,
  defaultRebateRateBps,
}: {
  referrals: VaultEventsQuery["referrals"];
  offChainReferrals: OffChainReferral[] | undefined;
  defaultReferralRateBps: number;
  defaultRebateRateBps: number;
}): ReferralEvent[] {
  const referralsArray: ReferralEvent[] = [];
  // Add offchain referrals to the referrals array
  offChainReferrals?.forEach((referral) => {
    referralsArray.push({
      owner: referral.referred,
      referral: referral.referrer,
      rewardRateBps: referral.rewardRateBps,
      rebateRateBps: referral.rebateRateBps,
      assets: BigInt(referral.assets),
      offchain: true,
      blockNumber: 0, // ordering doesn't matter for offchain referrals
      blockTimestamp: 0, // ordering doesn't matter for offchain referrals
      logIndex: 0, // ordering doesn't matter for offchain referrals
      requestId: 0n,
      id: "0x",
      transactionHash: "0x",
      __typename: "Referral",
    });
  });

  // Add onchain referrals to the referrals array
  referrals?.forEach((referral) => {
    referralsArray.push({
      owner: referral.owner,
      referral: referral.referral,
      rewardRateBps: defaultReferralRateBps,
      rebateRateBps: defaultRebateRateBps,
      assets: BigInt(referral.assets),
      offchain: false,
      blockNumber: Number(referral.blockNumber),
      blockTimestamp: Number(referral.blockTimestamp),
      logIndex: Number(referral.logIndex),
      requestId: BigInt(referral.requestId),
      id: referral.id,
      transactionHash: referral.transactionHash,
      __typename: "Referral",
    });
  });

  // Add __typename to referrals and we inject the parameters of the referral
  return referralsArray;
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
