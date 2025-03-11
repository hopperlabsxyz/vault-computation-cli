import type { VaultEventsQuery } from "gql/graphql";

export function sanityChecks({
  events,
  fromBlock,
  toBlock,
}: {
  events: VaultEventsQuery;
  fromBlock: number;
  toBlock: number;
}) {
  const updatedTotalAssets = events.totalAssetsUpdateds;
  if (updatedTotalAssets.length == 0) throw new Error("0 totalAssetsUpdateds");

  const found = updatedTotalAssets.find(
    (event) => event.blockNumber === fromBlock
  );
  if (!found) {
    throw new Error(`invalid fromBlock, run bun `);
  }
  const lastBlock = updatedTotalAssets[0].blockNumber;
  if (lastBlock != toBlock)
    throw new Error(`invalid toBlock, found: ${lastBlock}`);
}
