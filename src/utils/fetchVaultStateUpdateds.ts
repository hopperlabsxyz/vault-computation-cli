import { SUBGRAPHS } from "environnement";
import type { VaultStateUpdatedEventsQuery } from "../../gql/graphql";
import request from "graphql-request";
import { graphql } from "../../gql";

import type { Address } from "viem";

export async function fetchVaultStateUpdateds({
  chainId,
  vaultAddress,
}: {
  chainId: number;
  vaultAddress: Address;
}): Promise<VaultStateUpdatedEventsQuery> {
  const newEvents = await _fetchVaultEvents({
    chainId,
    vaultAddress,
  });

  return newEvents;
}

async function _fetchVaultEvents({
  chainId,
  vaultAddress,
}: {
  chainId: number;
  vaultAddress: Address;
}): Promise<VaultStateUpdatedEventsQuery> {
  return request(SUBGRAPHS[chainId]!, query, {
    vaultAddress,
  });
}

const query = graphql(`
  query VaultStateUpdatedEvents($vaultAddress: Bytes!) {
    stateUpdateds(
      orderBy: blockTimestamp
      orderDirection: asc
      where: { vault: $vaultAddress }
    ) {
      blockNumber
      blockTimestamp
      id
      transactionHash
      logIndex
      vault
      state
    }
  }
`);
