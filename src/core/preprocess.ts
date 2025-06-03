import type { Transfer } from "gql/graphql";
import { type Address } from "viem";
import type {
  DealEvent,
  Deals,
  PointEvent,
  PreProcessingParams,
  ReferralEvent,
  VaultAddrresses,
} from "./types";

export function preprocessEvents({
  events,
  referral,
  addresses,
  deals,
  points,
}: PreProcessingParams) {
  // Add __typename to deposits and convert relevant fields to BigInt
  events.deposits = events.deposits.map((e) => ({
    ...e,
    assets: BigInt(e.assets),
    shares: BigInt(e.shares),
    __typename: "Deposit",
  }));
  // Add __typename to depositRequestCanceleds
  events.depositRequestCanceleds = events.depositRequestCanceleds.map((e) => ({
    ...e,
    __typename: "DepositRequestCanceled",
  }));

  // Add __typename to depositRequests and convert relevant fields to BigInt
  events.depositRequests = events.depositRequests.map((e) => ({
    ...e,
    assets: BigInt(e.assets),
    __typename: "DepositRequest",
  }));

  // Add __typename to redeemRequests and convert relevant fields to BigInt
  events.redeemRequests = events.redeemRequests.map((e) => ({
    ...e,
    shares: BigInt(e.shares),
    __typename: "RedeemRequest",
  }));

  // Add __typename to settleRedeems and convert relevant fields to BigInt
  events.settleRedeems = events.settleRedeems.map((e) => ({
    ...e,
    assetsWithdrawed: BigInt(e.assetsWithdrawed),
    sharesBurned: BigInt(e.sharesBurned),
    totalAssets: BigInt(e.totalAssets),
    totalSupply: BigInt(e.totalSupply),
    __typename: "SettleRedeem",
  }));

  // Add __typename to settleDeposits and convert relevant fields to BigInt
  events.settleDeposits = events.settleDeposits.map((e) => ({
    ...e,
    assetsDeposited: BigInt(e.assetsDeposited),
    sharesMinted: BigInt(e.sharesMinted),
    totalSupply: BigInt(e.totalSupply),
    totalAssets: BigInt(e.totalAssets),
    __typename: "SettleDeposit",
  }));

  // Add __typename to totalAssetsUpdateds and convert relevant fields to BigInt
  events.totalAssetsUpdateds = events.totalAssetsUpdateds.map((e) => ({
    ...e,
    totalAssets: BigInt(e.totalAssets),
    __typename: "TotalAssetsUpdated",
  }));

  // Add __typename to newTotalAssetsUpdateds and convert relevant fields to BigInt
  events.newTotalAssetsUpdateds = events.newTotalAssetsUpdateds.map((e) => ({
    ...e,
    totalAssets: BigInt(e.totalAssets),
    __typename: "NewTotalAssetsUpdated",
  }));

  // Add __typename to RatesUpdates
  events.ratesUpdateds = events.ratesUpdateds.map((e) => ({
    ...e,
    __typename: "RatesUpdated",
  }));

  // Add __typename to RatesUpdates
  events.feeReceiverUpdateds = events.feeReceiverUpdateds.map((e) => ({
    ...e,
    __typename: "FeeReceiverUpdated",
  }));

  // Add offchain points events
  const pointsEvents: PointEvent[] =
    points?.map((p) => ({
      __typename: "Point",
      amount: p.amount,
      blockNumber: -1,
      blockTimestamp: p.timestamp,
      logIndex: -1,
      vault: addresses.vault,
      name: p.name,
    })) || [];

  let referrals: ReferralEvent[] = [];
  if (referral) {
    // Add __typename to referrals and we inject the parameters of the referral
    referrals = events.referrals
      .map(
        (e) =>
          ({
            ...e,
            feeRewardRate: referral.feeRewardRate,
            feeRebateRate: referral.feeRebateRate,
            assets: BigInt(e.assets),
            blockNumber: Number(e.blockNumber),
            blockTimestamp: Number(e.blockTimestamp),
            requestId: BigInt(e.requestId),
            __typename: "Referral",
          } satisfies ReferralEvent)
      )
      .filter((r) => r.owner !== r.referral);
  }

  let dealsParsed: DealEvent[] = [];
  if (deals) {
    dealsParsed = parseDeals(deals);
  }

  // Add __typename to transfers, filter ignored addresses, and convert relevant fields to BigInt
  events.transfers = filterTransfers(events.transfers, addresses).map((e) => ({
    ...e,
    value: BigInt(e.value),
    __typename: "Transfer",
  }));

  // Combine all events and sort by chronogically
  const sorted = [
    ...events.newTotalAssetsUpdateds,
    ...events.depositRequests,
    ...events.depositRequestCanceleds,
    ...events.redeemRequests,
    ...events.deposits,
    ...events.totalAssetsUpdateds,
    ...events.settleDeposits,
    ...events.settleRedeems,
    ...events.transfers,
    ...events.ratesUpdateds,
    ...events.feeReceiverUpdateds,
    ...referrals,
    ...dealsParsed,
    ...pointsEvents,
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
  console.log(sorted.filter((e) => events.__typename == ("Point" as any)));
  return sorted;
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

function parseDeals(deals: Deals): DealEvent[] {
  // Add __typename to deals and we inject the parameters of the deals
  // An otc deal is a deal on the fee rebate exclusively
  // thus referral is the user and the feeRewardRate is 0
  const dealsArray = Object.entries(deals).map((deal) => {
    return {
      owner: deal[0] as Address,
      referral: deal[0] as Address,
      feeRebateRate: deal[1],
      feeRewardRate: 0,
    };
  });

  // We create fake events for the deals to be able to process them like the other events
  // we give them a block number 0 and a timestamp 0 so that they are processed first
  return dealsArray.map((e) => ({
    ...e,
    blockNumber: 0,
    blockTimestamp: 0,
    feeRebateRate: e.feeRebateRate,
    feeRewardRate: 0,
    assets: 0n,
    logIndex: 0,
    id: "0x",
    requestId: 0,
    transactionHash: "0x",
    vault: "0x",
    __typename: "Deal",
  }));
}

// function parsePoints(points: Point[]): PointsEvent {}
