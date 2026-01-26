import { fetchAllVaultEvents } from "./fetchVaultEvents";
import type { Vault } from "types/Vault";

/**
 * Gets the oldest and newest block numbers from totalAssetsUpdated events for a vault.
 * @param vault The vault to query
 * @param toBlock Optional maximum block number to search up to (defaults to latest)
 * @returns An object with oldestBlock and newestBlock, or null if no events found
 */
export async function getTotalAssetsUpdatedBlockRange(
  vault: Vault,
  toBlock?: bigint
): Promise<{ oldestBlock: bigint; newestBlock: bigint } | null> {
  const events = await fetchAllVaultEvents({
    chainId: vault.chainId,
    vaultAddress: vault.address,
    toBlock,
  });

  const totalAssetsUpdateds = events.totalAssetsUpdateds;
  if (totalAssetsUpdateds.length === 0) {
    return null;
  }

  // Events are ordered by blockTimestamp descending (newest first)
  // So index 0 is the newest, and the last index is the oldest
  const newestBlock = BigInt(totalAssetsUpdateds[0].blockNumber);
  const oldestBlock = BigInt(
    totalAssetsUpdateds[totalAssetsUpdateds.length - 1].blockNumber
  );

  return { oldestBlock, newestBlock };
}
