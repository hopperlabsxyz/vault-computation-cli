import { SUBGRAPHS } from "environnement";
import type { VaultTotalAssetsUpdatedQuery } from "../../gql/graphql";
import request from "graphql-request";
import { graphql } from "../../gql";

import type { Address } from "viem";

export async function fetchVaultTotalAssetsUpdated({
  chainId,
  address,
  toBlock,
  skip,
  first,
}: {
  chainId: number;
  address: Address;
  toBlock: bigint;
  skip: number;
  first: number;
}): Promise<VaultTotalAssetsUpdatedQuery> {
  const url = SUBGRAPHS[chainId];
  if (!url) throw new Error("Vault undefined");
  return request(url, query, {
    first,
    vaultAddress: address,
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
