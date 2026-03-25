import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { apiClient } from "api/client";
import { USER_POINTS_QUERY } from "api/queries";
import type { UserPointsResultResponse } from "api/types";
import { withErrorHandler } from "utils/error-handler";

interface PointEntry {
  amount: number;
  name: string;
  timestamp: number;
}

async function parsePointsFile(path: string): Promise<PointEntry[]> {
  const raw = await Bun.file(path).text();
  const lines = raw.trim().split("\n").slice(1); // skip header
  return lines
    .filter((l) => l.trim())
    .map((line) => {
      const [timestamp, amount, name] = line.split(",");
      return {
        timestamp: Number(timestamp),
        amount: Number(amount),
        name: name.trim(),
      };
    });
}

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
    .requiredOption(
      "-p, --points <file>",
      "CSV file with point distribution data (timestamp,amount,name)\n"
    )
    .action(withErrorHandler(async (vault, options) => {
      const points = await parsePointsFile(options.points);

      const data = await apiClient.request<UserPointsResultResponse>(
        USER_POINTS_QUERY,
        {
          address: vault.address,
          chainId: vault.chainId,
          points,
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
    }));
}
