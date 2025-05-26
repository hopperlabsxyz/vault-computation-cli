import type { Rates } from "core/types";
import type { Address, PublicClient } from "viem";

const FeeManagerStorageSlot =
  "0xa5292f7ccd85acc1b3080c01f5da9af7799f2c26826bd4d79081d6511780bd00";

const feeRateOffset = 5n;

export async function fetchFeeRates({
  vaultAddress,
  client,
  blockNumber,
}: {
  vaultAddress: Address;
  client: PublicClient;
  blockNumber: bigint | undefined;
}): Promise<{ rates: Rates; oldRates: Rates }> {
  const slotData = await client.getStorageAt({
    address: vaultAddress,
    slot: (
      BigInt(FeeManagerStorageSlot) + feeRateOffset
    ).toString() as `0x${string}`,
    blockNumber,
  });
  if (slotData == undefined)
    throw new Error(
      `feeRates undefined for contract ${vaultAddress}  at ${blockNumber}`
    );
  const hexData = slotData.slice(2); // Remove '0x'
  const rates: Rates = {
    performance: 0,
    management: 0,
  };

  const oldRates: Rates = {
    performance: 0,
    management: 0,
  };
  // Extract managementRate (first 2 bytes, offset 0)
  const currentManagementRateHex = hexData.substring(60, 64); // 2 bytes = 4 hex chars
  rates.management = parseInt(currentManagementRateHex, 16);

  // Extract performanceRate (next 2 bytes, offset 2)
  const currentPerformanceRateHex = hexData.substring(56, 60);
  rates.performance = parseInt(currentPerformanceRateHex, 16);

  const oldManagementRateHex = hexData.substring(52, 56);
  oldRates.management = parseInt(oldManagementRateHex, 16);

  // Extract performanceRate (next 2 bytes, offset 2)
  const performanceRateHex = hexData.substring(48, 52);
  oldRates.performance = parseInt(performanceRateHex, 16);
  return {
    rates,
    oldRates,
  };
}
