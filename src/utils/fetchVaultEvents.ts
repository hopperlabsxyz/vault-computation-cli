import { SUBGRAPHS } from "environnement";
import type { VaultEventsQuery } from "gql/graphql";
import request from "graphql-request";
import { graphql } from "gql";

import type { Address } from "viem";

async function _fetchVaultEvents({
  chainId,
  vaultAddress,
  toBlock,
  skip,
  first,
}: {
  chainId: number;
  vaultAddress: Address;
  toBlock: bigint;
  skip: number;
  first: number;
}): Promise<VaultEventsQuery> {
  return request(SUBGRAPHS[chainId]!, query, {
    first,
    vaultAddress,
    toBlock: toBlock.toString(),
    skip,
  });
}
export async function fetchVaultEvents({
  chainId,
  vaultAddress,
  toBlock,
  skip = 0,
  first = 1000,
}: {
  chainId: number;
  vaultAddress: Address;
  toBlock: bigint;
  skip?: number;
  first?: number;
}): Promise<VaultEventsQuery> {
  const events: VaultEventsQuery = {
    depositRequestCanceleds: [],
    deposits: [],
    newTotalAssetsUpdateds: [],
    referrals: [],
    settleDeposits: [],
    settleRedeems: [],
    totalAssetsUpdateds: [],
    transfers: [],
    depositRequests: [],
    redeemRequests: [],
    feeReceiverUpdateds: [],
    ratesUpdateds: [],
  };
  let hasMore = true;
  while (hasMore) {
    const newEvents = await _fetchVaultEvents({
      chainId,
      vaultAddress,
      toBlock,
      skip,
      first,
    });

    events.depositRequests.push(...newEvents.depositRequests);
    events.deposits.push(...newEvents.deposits);
    events.depositRequestCanceleds.push(...newEvents.depositRequestCanceleds);
    events.settleDeposits.push(...newEvents.settleDeposits);

    events.redeemRequests.push(...newEvents.redeemRequests);
    events.settleRedeems.push(...newEvents.settleRedeems);

    events.newTotalAssetsUpdateds.push(...newEvents.newTotalAssetsUpdateds);
    events.totalAssetsUpdateds.push(...newEvents.totalAssetsUpdateds);

    events.transfers.push(...newEvents.transfers);
    events.referrals.push(...newEvents.referrals);

    events.feeReceiverUpdateds.push(...newEvents.feeReceiverUpdateds);

    events.ratesUpdateds.push(...newEvents.ratesUpdateds);

    if (vaultEventsQueryLength(newEvents) < first) {
      hasMore = false;
    }
    skip += first;
  }
  return events;
}

function vaultEventsQueryLength(query: VaultEventsQuery): number {
  return (
    query.depositRequestCanceleds.length +
    query.deposits.length +
    query.newTotalAssetsUpdateds.length +
    query.referrals.length +
    query.settleDeposits.length +
    query.settleRedeems.length +
    query.totalAssetsUpdateds.length +
    query.transfers.length +
    query.ratesUpdateds.length +
    query.feeReceiverUpdateds.length
  );
}

export const query = graphql(`
  query VaultEvents(
    $first: Int!
    $vaultAddress: Bytes!
    $toBlock: BigInt!
    $skip: Int!
  ) {
    depositRequests(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      assets
      blockNumber
      blockTimestamp
      id
      owner
      sender
      transactionHash
      logIndex
      controller
      requestId
      vault
    }
    redeemRequests(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      blockNumber
      blockTimestamp
      id
      owner
      sender
      shares
      transactionHash
      logIndex
      controller
      requestId
      vault
    }
    settleRedeems(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      assetsWithdrawed
      blockNumber
      blockTimestamp
      epochId
      id
      settledId
      sharesBurned
      totalAssets
      totalSupply
      transactionHash
      logIndex
      vault
    }
    settleDeposits(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      assetsDeposited
      blockNumber
      blockTimestamp
      epochId
      id
      settledId
      sharesMinted
      totalSupply
      totalAssets
      transactionHash
      logIndex
      vault
    }
    totalAssetsUpdateds(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      transactionHash
      logIndex
      totalAssets
      id
      blockNumber
      blockTimestamp
      vault
    }
    newTotalAssetsUpdateds(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      transactionHash
      logIndex
      totalAssets
      id
      blockNumber
      blockTimestamp
      vault
    }
    transfers(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      blockNumber
      blockTimestamp
      from
      id
      to
      transactionHash
      logIndex
      value
      vault
    }
    depositRequestCanceleds(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      blockNumber
      blockTimestamp
      controller
      id
      requestId
      transactionHash
      logIndex
      vault
    }
    deposits(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      id
      sender
      owner
      assets
      vault
      transactionHash
      logIndex
      shares
      blockTimestamp
      blockNumber
    }
    referrals(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      id
      transactionHash
      logIndex
      assets
      blockNumber
      blockTimestamp
      owner
      referral
      requestId
    }
    feeReceiverUpdateds(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      id
      transactionHash
      logIndex
      blockNumber
      blockTimestamp
      oldReceiver
      newReceiver
    }
    ratesUpdateds(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress, blockNumber_lte: $toBlock }
    ) {
      id
      transactionHash
      logIndex
      blockNumber
      blockTimestamp
      newRate_managementRate
      newRate_performanceRate
      timestamp
    }
  }
`);
