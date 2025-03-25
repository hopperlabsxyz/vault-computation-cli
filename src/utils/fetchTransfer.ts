import { SUBGRAPHS } from "environnement";
import type { VaultTransfersQuery } from "gql/graphql";
import request from "graphql-request";
import { graphql } from "gql";

import type { Address } from "viem";

export async function fetchVaultTransfers({
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
}): Promise<VaultTransfersQuery> {
  const subgraph = SUBGRAPHS[chainId];
  if (!subgraph)
    throw new Error(
      `Subgraph not found for chainId: ${chainId} Please fill the .env file`
    );
  return request(subgraph, query, {
    first,
    vaultAddress: address,
    toBlock: toBlock.toString(),
    skip,
  });
}

export const query = graphql(`
  query VaultTransfers(
    $first: Int!
    $vaultAddress: Bytes!
    $toBlock: BigInt!
    $skip: Int!
  ) {
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
  }
`);
