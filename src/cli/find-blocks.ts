import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { lagoonQuery } from "lib/computationApi";
import type { Vault } from "types/Vault";

type Tx = { blockNumber: number; timestamp: number };

// Fetch every transaction of the given types for a vault, paging through the API.
async function fetchTxs(
  vault: Vault,
  types: string[],
  extraFilter = ""
): Promise<Tx[]> {
  const out: Tx[] = [];
  const PAGE = 1000;
  for (let skip = 0; ; skip += PAGE) {
    const data = await lagoonQuery<{ transactions: { items: Tx[] } }>(
      `{ transactions(where:{ chainId_eq:${vault.chainId}, vault_in:["${
        vault.address
      }"], type_in:[${types.join(",")}]${extraFilter} },
         orderBy:blockNumber, orderDirection:asc, first:${PAGE}, skip:${skip}){
        items{ blockNumber timestamp } } }`
    );
    const items = data.transactions.items;
    out.push(...items);
    if (items.length < PAGE) break;
  }
  return out;
}

export function setBlocksCommand(command: Command) {
  command
    .command("find-blocks")
    .alias("fb")
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address to find blocks for\n",
      parseVaultArgument
    )
    .description(
      "Find all blocks where a total assets update happened for a vault. Use this command to determine the block range for fee computation.\n"
    )
    .option(
      "--fromBlock <number>",
      "Start searching from this block number (inclusive). Defaults to 0\n",
      "0"
    )
    .option(
      "--toBlock <number>",
      "Search up to this block number (inclusive). Defaults to the latest indexed block\n"
    )
    .action(async (vault, options) => {
      // The fee receiver can be read from current vault state; transfers from it
      // mark fee distributions. ponytail: uses the current fee receiver only — a
      // vault that changed receivers would miss transfers from the old one.
      const vaultData = await lagoonQuery<{
        vaults: { items: { state: { roles: { feeReceiver: string } } }[] };
      }>(
        `{ vaults(where:{ chainId_eq:${vault.chainId}, address_in:["${vault.address}"] }){
          items{ state{ roles{ feeReceiver } } } } }`
      );
      const feeReceiver = vaultData.vaults.items[0]?.state.roles.feeReceiver;

      const [totalAssetsUpdateds, feeReceiverTransfers] = await Promise.all([
        fetchTxs(vault, ["TotalAssetsUpdated"]),
        feeReceiver
          ? fetchTxs(vault, ["Transfer"], `, transfer_from_in:["${feeReceiver}"]`)
          : Promise.resolve([]),
      ]);

      const fromBlock = Number(options.fromBlock);
      const allBlocks = [...totalAssetsUpdateds, ...feeReceiverTransfers].map(
        (t) => t.blockNumber
      );
      const toBlock = options.toBlock
        ? Number(options.toBlock)
        : Math.max(fromBlock, ...allBlocks);

      const allEvents = [
        ...totalAssetsUpdateds.map((t) => ({ ...t, type: "Total assets updated" })),
        ...feeReceiverTransfers.map((t) => ({
          ...t,
          type: "Fee receiver sent shares",
        })),
      ]
        .filter((e) => e.blockNumber >= fromBlock && e.blockNumber <= toBlock)
        .sort((a, b) => a.blockNumber - b.blockNumber);

      console.log(`From ${fromBlock}`);
      console.log("\nEvents in chronological order:");
      allEvents.forEach((event) =>
        console.log(
          `${new Date(event.timestamp * 1000).toDateString()} - ${
            event.blockNumber
          } - ${event.type}`
        )
      );
      console.log(`\nTo ${toBlock}`);
    });
}
