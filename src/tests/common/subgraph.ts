import { createSubgraphClient, fetchAllVaultEvents, type VaultEventsResponse } from "@lagoon-protocol/internal-subgraph";
import { SUBGRAPHS } from "environnement";
import type { Address } from "viem";

export async function fetchTestVaultEvents({
  chainId,
  vaultAddress,
  toBlock,
}: {
  chainId: number;
  vaultAddress: Address;
  toBlock?: bigint;
}): Promise<VaultEventsResponse> {
  const subgraphUrl = SUBGRAPHS[chainId];
  if (!subgraphUrl) throw new Error(`No subgraph URL for chainId ${chainId}`);

  const client = createSubgraphClient({ urls: { [chainId]: subgraphUrl } });
  return fetchAllVaultEvents({
    client,
    chainId,
    vaultAddress,
    toBlock: toBlock ? toBlock.toString() : undefined,
  });
}
