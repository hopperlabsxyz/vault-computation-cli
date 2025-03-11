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
  console.debug(updatedTotalAssets.length);

  const firstBlock =
    updatedTotalAssets[updatedTotalAssets.length - 1].blockNumber;
  if (fromBlock != firstBlock)
    throw new Error(`invalid fromBlock, found: ${firstBlock}`);
  const lastBlock = updatedTotalAssets[0].blockNumber;
  if (lastBlock != toBlock)
    throw new Error(`invalid toBlock, found: ${lastBlock}`);
}
