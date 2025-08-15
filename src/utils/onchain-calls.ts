import { LagoonVaultAbi } from "abis/VaultABI";
import type { Address, PublicClient } from "viem";

export async function totalBalanceOf({
  user,
  blockNumber,
  address,
  client,
}: {
  user: Address;
  blockNumber: bigint;
  address: Address;
  client: PublicClient;
}): Promise<bigint> {
  const [
    balanceOf,
    claimableDepositRequest,
    lastDepositRequestId,
    pendingRedeem,
  ] = await Promise.all([
    client.readContract({
      abi: LagoonVaultAbi,
      functionName: "balanceOf",
      args: [user],
      address,
      blockNumber,
    }),
    client.readContract({
      abi: LagoonVaultAbi,
      functionName: "claimableDepositRequest",
      args: [0n, user],
      address,
      blockNumber,
    }),
    client.readContract({
      abi: LagoonVaultAbi,
      functionName: "lastDepositRequestId",
      args: [user],
      address,
      blockNumber,
    }),
    client.readContract({
      abi: LagoonVaultAbi,
      functionName: "pendingRedeemRequest",
      args: [0n, user],
      address,
      blockNumber,
    }),
  ]);

  const [maxMint] = await Promise.all([
    client.readContract({
      abi: LagoonVaultAbi,
      functionName: "convertToShares",
      args: [claimableDepositRequest, BigInt(lastDepositRequestId)],
      address,
      blockNumber,
    }),
  ]);

  return balanceOf + maxMint + pendingRedeem;
}
