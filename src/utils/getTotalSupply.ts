import { LagoonVaultAbi } from "abis/VaultABI";
import { publicClient } from "../lib/publicClient";
import type { Address } from "viem";

export async function getTotalSupply({
  chainId,
  address,
  blockNumber,
}: {
  chainId: number;
  address: Address;
  blockNumber: bigint;
}): Promise<bigint | undefined> {
  const client = publicClient[chainId];

  if (!client) {
    throw new Error(`Missing client for chaindId : ${chainId}`);
  }
  try {
    return client.readContract({
      address,
      blockNumber,
      abi: LagoonVaultAbi,
      functionName: "totalSupply",
    });
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
