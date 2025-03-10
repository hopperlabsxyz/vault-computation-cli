import { SUBGRAPHS } from "environnement";
import type { VaultEventsQuery } from "gql/graphql";
import request from "graphql-request";
import { graphql } from "gql";

import type { Address } from "viem";

export async function fetchVaultEvents(
  chainId: number,
  vaultAddress: Address
): Promise<VaultEventsQuery> {
  return request(SUBGRAPHS[chainId], query, {
    first: 1000,
    vaultAddress,
  });
}

export const query = graphql(`
  query VaultEvents($first: Int!, $vaultAddress: Bytes!) {
    depositRequests(
      first: $first
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
      orderBy: blockTimestamp
      orderDirection: desc
      where: { vault: $vaultAddress }
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
  }
`);
