import { LagoonVaultAbi } from "abis/VaultABI";
import { publicClient } from "lib/publicClient";
import { type Address } from "viem";

export async function fetchBalance({
  vaultAddress,
  chainId,
  userAddress,
  blockNumber,
}: {
  vaultAddress: Address;
  chainId: number;
  userAddress: Address;
  blockNumber: bigint;
}): Promise<bigint | undefined> {
  const client = publicClient[chainId];

  if (!client) {
    throw new Error(`Missing client for chaindId : ${chainId}`);
  }

  try {
    return client.readContract({
      address: vaultAddress,
      abi: LagoonVaultAbi,
      functionName: "balanceOf",
      args: [userAddress],
      blockNumber,
    });
  } catch (e) {
    console.error(e);
    return;
  }
}
