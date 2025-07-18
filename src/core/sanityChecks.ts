import type { VaultEventsQuery } from "../../gql/graphql";

// This function checks some element to make sure the data are sain
export function sanityChecks({
  events,
  fromBlock,
  toBlock,
}: {
  events: VaultEventsQuery;
  fromBlock: bigint;
  toBlock: bigint;
}) {
  const updatedTotalAssets = events.totalAssetsUpdateds;
  if (updatedTotalAssets.length == 0) throw new Error("0 totalAssetsUpdateds");

  const found = updatedTotalAssets.find((event) => {
    return BigInt(event.blockNumber) === fromBlock;
  });
  if (!found) {
    throw new Error(`invalid fromBlock, run bun find-blocks `);
  }
  const lastBlock = BigInt(updatedTotalAssets[0].blockNumber);
  if (lastBlock != toBlock)
    throw new Error(`invalid toBlock, found: ${lastBlock}`);
}
