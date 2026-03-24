import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { apiClient } from "api/client";
import { USER_BALANCES_QUERY } from "api/queries";
import type { UserBalanceResultResponse } from "api/types";

export function setUserBalanceCommand(command: Command) {
  command
    .command("user-balance")
    .alias("ub")
    .description("Snapshot user balances at a specific block.\n")
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address\n",
      parseVaultArgument
    )
    .option(
      "-b, --block <number>",
      "Block number to snapshot (defaults to latest)\n"
    )
    .option(
      "-r, --readable",
      "Format the output in a human-readable format\n",
      false
    )
    .action(async (vault, options) => {
      const data = await apiClient.request<UserBalanceResultResponse>(
        USER_BALANCES_QUERY,
        {
          address: vault.address,
          chainId: vault.chainId,
          block: options.block || undefined,
        }
      );

      const result = data.userBalances;
      const csvRows = [
        `chainId,vault,wallet,balance`,
        ...result.entries
          .sort((a, b) => a.account.localeCompare(b.account))
          .filter(({ balance }) => balance !== 0)
          .map(
            ({ balance, account }) =>
              `${result.chainId},${result.address},${account},${balance}`
          ),
      ];

      console.log(csvRows.join("\n"));
    });
}
