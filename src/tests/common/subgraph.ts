import { fetchAllVaultEvents, type VaultEventsResponse } from "@lagoon-protocol/internal-subgraph";
import { getSubgraphClientForChain } from "lib/subgraphClient";
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
  const client = getSubgraphClientForChain(chainId);
  return fetchAllVaultEvents({
    client,
    chainId,
    vaultAddress,
    toBlock: toBlock ? toBlock.toString() : undefined,
  });
}
