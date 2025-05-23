import type { Address, PublicClient } from "viem";

const FeeManagerStorageSlot =
  "0xa5292f7ccd85acc1b3080c01f5da9af7799f2c26826bd4d79081d6511780bd00";

const coolDownOffset = 4n;

export async function fetchFeeCooldown({
  vaultAddress,
  client,
  blockNumber,
}: {
  vaultAddress: Address;
  client: PublicClient;
  blockNumber: bigint | undefined;
}): Promise<BigInt> {
  const cooldown = await client.getStorageAt({
    address: vaultAddress,
    slot: (
      BigInt(FeeManagerStorageSlot) + coolDownOffset
    ).toString() as `0x${string}`,
    blockNumber,
  });
  if (cooldown == undefined)
    throw new Error(`cooldown undefined for contract ${vaultAddress}`);
  return BigInt(cooldown);
}
