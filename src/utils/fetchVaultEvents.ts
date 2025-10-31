import { SUBGRAPHS } from "environnement";
import type { VaultEventsQuery } from "../../gql/graphql";
import request from "graphql-request";
import { graphql } from "../../gql";

import { maxUint256, type Address } from "viem";

export async function fetchVaultEvents({
  chainId,
  vaultAddress,
  toBlock = BigInt(maxUint256),
  skip = 0,
}: {
  chainId: number;
  vaultAddress: Address;
  toBlock?: bigint;
  skip?: number;
  first?: number;
}): Promise<VaultEventsQuery> {
  return fetchAllEvents({
    chainId,
    vaultAddress,
    toBlock,
    skip,
    fetchEvents: _fetchVaultEvents,
  });
}

export async function fetchAllEvents<T extends Query>({
  chainId,
  vaultAddress,
  toBlock = BigInt(maxUint256),
  skip = 0,
  fetchEvents,
  first = 1000,
}: {
  chainId: number;
  vaultAddress: Address;
  toBlock?: bigint;
  skip?: number;
  first?: number;
  fetchEvents: (args: {chainId: number, vaultAddress: Address, toBlock: bigint, skip: number, first: number}) => Promise<T>;
}): Promise<T> {
  let events: T | undefined;
  let hasMore = true;
  while (hasMore) {
    const newEvents: T = await fetchEvents({ chainId, vaultAddress, toBlock, skip, first });
    if (events == undefined) {
      events = newEvents;
    } else {
      const keys = Object.keys(newEvents) as (keyof T)[];
      for (const key of keys) {
        if (key != "__typename") {
          (events[key] as any[]).push(...(newEvents[key] as any[]));
        }
      }
    }

    hasMore = vaultEventsHasMore(newEvents as Query, first);
    const total = countEvents(events as Query);
    if (hasMore) {
      console.log("Fetching more events. Total: ", total);
    }
    skip += first;
  }
  return events!;
}


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



type Query = Record<string, any[] | string>;
function vaultEventsHasMore(query: Query, first: number): boolean {
  
  const keys = Object.keys(query);
  for (const key of keys) {
    if (key != "__typename") {
      const length = query[key as keyof Query]!.length;
      if (length == first) return true;
    }
  }
  return false;
}

function countEvents(query: Query): number {
  
  const keys = Object.keys(query);
  let count = 0;
  for (const key of keys) {
    if (key != "__typename") {
      count += query[key as keyof Query]!.length;
    }
  }
  return count;
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
