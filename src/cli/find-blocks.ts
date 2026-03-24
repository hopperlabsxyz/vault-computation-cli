import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { apiClient } from "api/client";
import { VAULT_EVENTS_SUMMARY_QUERY } from "api/queries";
import type { VaultEventsSummaryResponse } from "api/types";

export function setFindBlocksCommand(command: Command) {
  command
    .command("find-blocks")
    .alias("fb")
    .description("Find totalAssetsUpdated events for a vault.\n")
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address\n",
      parseVaultArgument
    )
    .option(
      "-f, --from-block <number>",
      "Starting block number\n"
    )
    .option(
      "-t, --to-block <number>",
      "Ending block number\n"
    )
    .action(async (vault, options) => {
      const data = await apiClient.request<VaultEventsSummaryResponse>(
        VAULT_EVENTS_SUMMARY_QUERY,
        {
          address: vault.address,
          chainId: vault.chainId,
          fromBlock: options.fromBlock || undefined,
          toBlock: options.toBlock || undefined,
        }
      );

      const events = data.vaultEventsSummary.events;
      const fromBlock = options.fromBlock || events[0]?.blockNumber || "0";
      const toBlock =
        options.toBlock ||
        events[events.length - 1]?.blockNumber ||
        "latest";

      console.log(`From ${fromBlock}\n`);
      console.log("Events in chronological order:");

      for (const event of events) {
        const date = new Date(event.blockTimestamp * 1000);
        const typeLabel =
          event.type === "TotalAssetsUpdated"
            ? "Total assets updated"
            : "Fee receiver sent shares";
        console.log(`${date} - ${event.blockNumber} - ${typeLabel}`);
      }

      console.log(`\nTo ${toBlock}`);
    });
}
