import { SUBGRAPHS } from "environnement";
import type { VaultEventsQuery } from "../../gql/graphql";
import request from "graphql-request";
import { graphql } from "../../gql";

import { maxUint256, type Address } from "viem";
import { fetchAll } from "./fetchAll";

export async function fetchAllVaultEvents({
  chainId,
  vaultAddress,
  toBlock = BigInt(maxUint256),
}: {
  chainId: number;
  vaultAddress: Address;
  toBlock?: bigint;
}): Promise<VaultEventsQuery> {
  return fetchAll<VaultEventsQuery>({
    chainId,
    vaultAddress,
    toBlock,
    fetchEvents: _fetchAllVaultEvents,
  });
}


async function _fetchAllVaultEvents({
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
