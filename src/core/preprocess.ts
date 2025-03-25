import type { Transfer, VaultEventsQuery } from "gql/graphql";
import { type Address } from "viem";

export interface DealEvent {
  feeRebateRate: number;
  feeRewardRate: number;
  vault: "0x";
  __typename: "Deal";
  owner: Address;
  referral: Address;
  blockNumber: number;
  blockTimestamp: number;
}

export type EventsArray = ReturnType<typeof preprocessEvents>;

export function preprocessEvents({
  events,
  referral,
  addresses,
  deals,
}: {
  events: VaultEventsQuery;
  addresses: {
    feeReceiver: Address;
    silo: Address;
    vault: Address;
  };
  referral: {
    feeRebateRate: number;
    feeRewardRate: number;
  };
  deals: Record<Address, number>;
}) {
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

  const referrals = events.referrals
    .map((e) => ({
      ...e,
      feeRewardRate: referral.feeRewardRate,
      feeRebateRate: referral.feeRebateRate,
      __typename: "Referral",
    }))
    .filter((r) => r.owner !== r.referral);
  console.log(deals);
  const dealsArray = Object.entries(deals).map((deal) => {
    return {
      owner: deal[0] as Address,
      referral: deal[0] as Address,
      feeRebateRate: deal[1],
      feeRewardRate: 0,
    };
  });
  const dealsParsed: DealEvent[] = dealsArray.map((e) => ({
    ...e,
    blockNumber: 0,
    blockTimestamp: 0,
    feeRebateRate: e.feeRebateRate,
    feeRewardRate: 0,
    assets: 0n,
    id: "0x",
    requestId: 0,
    transactionHash: "0x",
    vault: "0x",
    __typename: "Deal",
  }));

  // Add __typename to feeTransfers and convert relevant fields to BigInt
  const feeTransfers = events.transfers
    .filter((t) => t.to.toLowerCase() === addresses.feeReceiver.toLowerCase())
    .map((e) => ({
      ...e,
      value: BigInt(e.value),
      __typename: "FeeTransfer",
    }));

  // Add __typename to transfers, filter ignored addresses, and convert relevant fields to BigInt
  events.transfers = filterTransfers(events.transfers, addresses).map((e) => ({
    ...e,
    value: BigInt(e.value),
    __typename: "Transfer",
  }));

  // Combine all events and sort by blockNumber
  const a = [
    ...events.newTotalAssetsUpdateds,
    ...events.depositRequests,
    ...events.depositRequestCanceleds,
    ...events.redeemRequests,
    ...events.deposits,
    ...events.totalAssetsUpdateds,
    ...feeTransfers,
    ...events.settleDeposits,
    ...events.settleRedeems,
    ...events.transfers,
    ...referrals,
    ...dealsParsed,
  ].sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber));
  return a;
}

function filterTransfers(
  transfers: Transfer[],
  addresses: {
    feeReceiver: Address;
    silo: Address;
    vault: Address;
  }
): Transfer[] {
  return transfers.filter(
    (t) =>
      t.to.toLowerCase() !== addresses.feeReceiver.toLowerCase() &&
      // we ignore all transfers from and to the vault because those we be handled when we settleDeposit
      t.to.toLowerCase() !== addresses.silo.toLowerCase() &&
      t.from.toLowerCase() !== addresses.silo.toLowerCase() &&
      // we ignore all transfers from and to the vault because those we be handled when we settleDeposit
      t.to.toLowerCase() !== addresses.vault.toLowerCase() &&
      t.from.toLowerCase() !== addresses.vault.toLowerCase()
  );
}
