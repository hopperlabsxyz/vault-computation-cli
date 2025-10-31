import { SUBGRAPHS } from "environnement";
import type { VaultTotalAssetsUpdatedQuery } from "../../gql/graphql";
import request from "graphql-request";
import { graphql } from "../../gql";
import type { Address } from "viem";
import { fetchAll } from "./fetchAll";

export async function fetchVaultTotalAssetsUpdated({
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
}): Promise<VaultTotalAssetsUpdatedQuery> {
  return fetchAll<VaultTotalAssetsUpdatedQuery>({
    chainId,
    vaultAddress,
    toBlock,
    skip,
    first,
    fetchEvents: _fetchVaultTotalAssetsUpdated,
  });
  
}

async function _fetchVaultTotalAssetsUpdated({
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
}): Promise<VaultTotalAssetsUpdatedQuery> {
  return request(SUBGRAPHS[chainId]!, query, {
    first,
    vaultAddress,
    toBlock: toBlock.toString(),
    skip,
  });
}




export const query = graphql(`
  query VaultTotalAssetsUpdated(
    $first: Int!
    $vaultAddress: Bytes!
    $toBlock: BigInt!
    $skip: Int!
  ) {
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
  }
`);
