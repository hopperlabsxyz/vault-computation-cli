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
  // Add __typename to deposits
  events.deposits = events.deposits.map((e) => ({
    ...e,
    __typename: "Deposit",
  }));

  // Add __typename to depositRequestCanceleds
  events.depositRequestCanceleds = events.depositRequestCanceleds.map((e) => ({
    ...e,
    __typename: "DepositRequestCanceled",
  }));

  // Add __typename to depositRequests
  events.depositRequests = events.depositRequests.map((e) => ({
    ...e,
    __typename: "DepositRequest",
  }));

  // Add __typename to redeemRequests
  events.redeemRequests = events.redeemRequests.map((e) => ({
    ...e,
    __typename: "RedeemRequest",
  }));

  // Add __typename to settleRedeems
  events.settleRedeems = events.settleRedeems.map((e) => ({
    ...e,
    __typename: "SettleRedeem",
  }));

  // Add __typename to settleDeposits
  events.settleDeposits = events.settleDeposits.map((e) => ({
    ...e,
    sharesMinted: BigInt(e.sharesMinted),
    totalSupply: BigInt(e.totalSupply),

    __typename: "SettleDeposit",
  }));

  // Add __typename to totalAssetsUpdateds
  events.totalAssetsUpdateds = events.totalAssetsUpdateds.map((e) => ({
    ...e,
    totalAssets: BigInt(e.totalAssets),
    __typename: "TotalAssetsUpdated",
  }));

  // Add __typename to newTotalAssetsUpdateds
  events.newTotalAssetsUpdateds = events.newTotalAssetsUpdateds.map((e) => ({
    ...e,
    totalAssets: BigInt(e.totalAssets),
    __typename: "NewTotalAssetsUpdated",
  }));

  // Add __typename to transfers
  events.transfers = events.transfers
    .filter(
      (x) =>
        ![...ignoredAddresses, feeReceiver].includes(x.to) &&
        ![...ignoredAddresses, feeReceiver].includes(x.from)
    )
    .map((e) => ({
      ...e,
      __typename: "Transfer",
    }));

  const feeTransfers = events.transfers
    .filter((t) => t.to === feeReceiver)
    .map((e) => ({
      ...e,
      __typename: "FeeTransfer",
    }));

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
  ].sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber));
}
