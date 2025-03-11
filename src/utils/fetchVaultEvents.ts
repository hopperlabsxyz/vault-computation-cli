import { SUBGRAPHS } from "environnement";
import type { VaultEventsQuery } from "gql/graphql";
import request from "graphql-request";
import { graphql } from "gql";

import type { Address } from "viem";

export async function fetchVaultEvents({
  chainId,
  vaultAddress,
  fromBlock,
  toBlock,
  skip,
  first,
}: {
  chainId: number;
  vaultAddress: Address;
  fromBlock: bigint;
  toBlock: bigint;
  skip: number;
  first: number;
}): Promise<VaultEventsQuery> {
  return request(SUBGRAPHS[chainId], query, {
    first,
    vaultAddress,
    fromBlock: fromBlock.toString(),
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
      assets
      blockNumber
      blockTimestamp
      owner
      referral
      requestId
    }
  }
`);
