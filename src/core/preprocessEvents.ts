import type {
  SubgraphTransfer,
  SubgraphReferral,
} from "@hopperlabsxyz/internal-subgraph";
import type {
  VaultEvent,
  RebateEvent,
  PointEvent,
  ReferralEvent,
  TransferEvent,
  VaultAddresses,
} from "@hopperlabsxyz/internal-computation";
import type { OffChainReferral } from "parsing/parseOffchainReferrals";
import type { RebateDeal } from "parsing/parseRebateDeals";
import type { PreProcessingParams } from "./types";

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
}: PreProcessingParams): VaultEvent[] {
  // Process all event types
  const deposits = events.deposits.map((e) => ({
    ...e,
    assets: BigInt(e.assets),
    shares: BigInt(e.shares),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "Deposit" as const,
  }));

  const depositRequestCanceleds = events.depositRequestCanceleds.map((e) => ({
    ...e,
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "DepositRequestCanceled" as const,
  }));

  const depositRequests = events.depositRequests.map((e) => ({
    ...e,
    assets: BigInt(e.assets),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "DepositRequest" as const,
  }));

  const redeemRequests = events.redeemRequests.map((e) => ({
    ...e,
    shares: BigInt(e.shares),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "RedeemRequest" as const,
  }));

  const settleRedeems = events.settleRedeems.map((e) => ({
    ...e,
    assetsWithdrawed: BigInt(e.assetsWithdrawed),
    sharesBurned: BigInt(e.sharesBurned),
    totalAssets: BigInt(e.totalAssets),
    totalSupply: BigInt(e.totalSupply),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "SettleRedeem" as const,
  }));

  const settleDeposits = events.settleDeposits.map((e) => ({
    ...e,
    assetsDeposited: BigInt(e.assetsDeposited),
    sharesMinted: BigInt(e.sharesMinted),
    totalSupply: BigInt(e.totalSupply),
    totalAssets: BigInt(e.totalAssets),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "SettleDeposit" as const,
  }));

  const totalAssetsUpdateds = events.totalAssetsUpdateds.map((e) => ({
    ...e,
    totalAssets: BigInt(e.totalAssets),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "TotalAssetsUpdated" as const,
  }));

  const newTotalAssetsUpdateds = events.newTotalAssetsUpdateds.map((e) => ({
    ...e,
    totalAssets: BigInt(e.totalAssets),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "NewTotalAssetsUpdated" as const,
  }));

  const ratesUpdateds = events.ratesUpdateds.map((e) => ({
    ...e,
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "RatesUpdated" as const,
  }));

  const feeReceiverUpdateds = events.feeReceiverUpdateds.map((e) => ({
    ...e,
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "FeeReceiverUpdated" as const,
  }));

  const defaultRateUpdateds = events.defaultRateUpdateds.map((e) => ({
    ...e,
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "DefaultRateUpdated" as const,
  }));

  const customRateUpdateds = events.customRateUpdateds.map((e) => ({
    ...e,
    rate: Number(e.rate),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    __typename: "CustomRateUpdated" as const,
  }));

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
  const sorted: VaultEvent[] = [
    ...newTotalAssetsUpdateds,
    ...depositRequests,
    ...depositRequestCanceleds,
    ...redeemRequests,
    ...deposits,
    ...totalAssetsUpdateds,
    ...settleDeposits,
    ...settleRedeems,
    ...ratesUpdateds,
    ...feeReceiverUpdateds,
    ...rebates,
    ...pointsEvents,
    ...referrals,
    ...transfers,
    ...defaultRateUpdateds,
    ...customRateUpdateds,
  ].sort((a, b) => {
    // if blocktimestamp is the same we use the logIndex
    if (a.blockTimestamp == b.blockTimestamp) return a.logIndex - b.logIndex;

    return Number(a.blockTimestamp) - Number(b.blockTimestamp);
  });

  return sorted;
}

function filterTransfers(
  transfers: SubgraphTransfer[],
  addresses: VaultAddresses
): SubgraphTransfer[] {
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
  return deals.map((e) => ({
    owner: e.owner,
    blockNumber: 0, // ordering doesn't matter for offchain rebate deals
    blockTimestamp: 0, // ordering doesn't matter for offchain rebate deals
    feeRebateRate: e.feeRebateRate,
    logIndex: 0, // ordering doesn't matter for offchain rebate deals
    __typename: "RebateDeal" as const,
  }));
}

function preprocessPoints(
  points: Array<{ name: string; amount: number; timestamp: number }> | undefined,
  vaultAddress: string
): PointEvent[] {
  return (
    points?.map((p) => ({
      __typename: "Point" as const,
      amount: p.amount,
      blockNumber: 0,
      blockTimestamp: p.timestamp,
      logIndex: 0,
      vault: vaultAddress as `0x${string}`,
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
  referrals: SubgraphReferral[];
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
      blockNumber: 1, // we put 1 so that referrals get handled after rebate deals
      blockTimestamp: 0, // ordering doesn't matter for offchain referrals
      logIndex: 0, // ordering doesn't matter for offchain referrals
      requestId: 0n,
      __typename: "Referral" as const,
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
      __typename: "Referral" as const,
    });
  });

  return referralsArray;
}

function preprocessTransfers(
  transfers: SubgraphTransfer[],
  addresses: VaultAddresses
): TransferEvent[] {
  return filterTransfers(transfers, addresses).map((e) => ({
    from: e.from,
    to: e.to,
    value: BigInt(e.value),
    blockNumber: Number(e.blockNumber),
    blockTimestamp: Number(e.blockTimestamp),
    logIndex: e.logIndex,
    __typename: "Transfer" as const,
  }));
}
