import { LagoonVaultAbi } from "abis/VaultABI";
import { publicClient } from "../lib/publicClient";
import type { Address } from "viem";

// Returns the on-chain version string of the vault at the given block.
// Vaults that predate the version() function (pre-v0.5.1) revert; we treat
// those as "v0.2.0".
export async function fetchVaultVersion({
  chainId,
  address,
  block,
}: {
  chainId: number;
  address: Address;
  block?: bigint;
}): Promise<string> {
  const client = publicClient[chainId];
  if (!client) {
    throw new Error(`Missing client for chaindId : ${chainId}`);
  }

  try {
    return await client.readContract({
      address,
      abi: LagoonVaultAbi,
      functionName: "version",
      blockNumber: block,
    });
  } catch {
    return "v0.2.0";
  }
}
