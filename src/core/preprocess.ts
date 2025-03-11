import type { VaultEventsQuery } from "gql/graphql";
import type { Address } from "viem";

export function preprocessEvents({
  events,
  feeReceiver,
  ignoredAddresses,
}: {
  events: VaultEventsQuery;
  feeReceiver: Address;
  ignoredAddresses: Address[];
}) {
  console.log(Object.keys(events));

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

  events.referrals = events.referrals.map((e) => ({
    ...e,
    __typename: "Referral",
  }));

  // Add __typename to transfers, filter ignored addresses, and convert relevant fields to BigInt
  events.transfers = events.transfers
    .filter(
      (x) =>
        ![...ignoredAddresses, feeReceiver].includes(x.to) &&
        ![...ignoredAddresses, feeReceiver].includes(x.from)
    )
    .map((e) => ({
      ...e,
      value: BigInt(e.value),
      __typename: "Transfer",
    }));

  // Add __typename to feeTransfers and convert relevant fields to BigInt
  const feeTransfers = events.transfers
    .filter((t) => t.to === feeReceiver)
    .map((e) => ({
      ...e,
      value: BigInt(e.value),
      __typename: "FeeTransfer",
    }));

  // Combine all events and sort by blockNumber
  return [
    ...events.newTotalAssetsUpdateds,
    ...events.depositRequests,
    ...events.depositRequestCanceleds,
    ...events.redeemRequests,
    ...events.deposits,
    ...events.transfers,
    ...feeTransfers,
    ...events.totalAssetsUpdateds,
    ...events.settleDeposits,
    ...events.settleRedeems,
    ...events.referrals,
  ].sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber));
}
