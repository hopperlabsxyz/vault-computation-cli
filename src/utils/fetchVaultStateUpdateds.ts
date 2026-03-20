import {
  fetchStateUpdateds,
  type StateUpdatedsResponse,
} from "@hopperlabsxyz/internal-subgraph";
import { getSubgraphClientForChain } from "lib/subgraphClient";
import type { Address } from "viem";

export async function fetchVaultStateUpdateds({
  chainId,
  vaultAddress,
}: {
  chainId: number;
  vaultAddress: Address;
}): Promise<StateUpdatedsResponse> {
  const client = getSubgraphClientForChain(chainId);
  return fetchStateUpdateds({
    client,
    chainId,
    vaultAddress,
  });
}
