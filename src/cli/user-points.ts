import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { apiClient } from "api/client";
import { USER_POINTS_QUERY } from "api/queries";
import type { UserPointsResultResponse } from "api/types";

export function setUserPointsCommand(command: Command) {
  command
    .command("user-points")
    .alias("up")
    .description("Distribute points proportionally to vault shareholders.\n")
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address\n",
      parseVaultArgument
    )
    .action(async (vault) => {
      const data = await apiClient.request<UserPointsResultResponse>(
        USER_POINTS_QUERY,
        {
          address: vault.address,
          chainId: vault.chainId,
        }
      );

      const result = data.userPoints;
      const pointNamesString = result.pointNames.reduce(
        (prev, cur) => `${prev},${cur}`,
        ""
      );

      const csvRows = [
        `chainId,vault,wallet${pointNamesString}`,
        ...result.entries
          .sort((a, b) => a.account.localeCompare(b.account))
          .map(({ points, account }) => {
            let str = `${result.chainId},${result.address},${account}`;
            for (const name of result.pointNames) {
              str += `,${points[name] ?? 0}`;
            }
            return str;
          }),
      ];

      console.log(csvRows.join("\n"));
    });
}
