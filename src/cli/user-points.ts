import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { parsePoints } from "parsing/parsePoints";
import { computationApi, type UserPointsResult } from "lib/computationApi";

export function setUserPointsCommand(command: Command) {
  command
    .command("user-points")
    .alias("up")
    .description(
      "Calculate and generate points repartitions for a specified vault. \
The output is a csv with the following columns: chainId, vault, wallet, points. \
For more accuracy, data timestamp should be right before totalAssets updates.\n"
    )
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address to find blocks for\n",
      parseVaultArgument
    )
    .option(
      "-o, --output",
      "Will save the result in output/user-points in a file with following format: <chainId>-<vaultAddress>-<inputFileName>.csv\n"
    )
    .option(
      "--silent",
      "This will prevent the printing of the output on stdout\n",
      false
    )
    .requiredOption(
      "--points <string>",
      "A path to a file containing the evolutions of points through time with the following format: timestamp,amount,name. \
For each line the program will distribute the new points proportionnaly to shareholders.",
      parsePoints
    )

    .action(async (vault, options) => {
      const { points, filename } = await options.points;

      const result = await computationApi.userPoints(
        vault.chainId,
        vault.address,
        { points }
      );

      const csv = convertToCSV(result);
      if (!options.silent) {
        console.log(csv);
      }
      if (options.output) {
        try {
          const file = Bun.file(
            `./output/user-points/${vault.chainId}-${vault.address}-${filename}`
          );
          await file.write(csv);
          console.log(`CSV report written to: ${file.name}`);
        } catch (error: any) {
          console.error("Error writing CSV file:", error.message);
          console.log("CSV content:");
          console.log(csv);
        }
      }
    });
}

function convertToCSV(result: UserPointsResult) {
  const pointNamesString = result.pointNames.reduce(
    (prev, cur) => `${prev},${cur}`,
    ""
  );
  const csvRows = [
    `chainId,vault,wallet${pointNamesString}`,
    ...result.rows.map((d) => {
      const pts = result.pointNames.reduce(
        (prev, cur) => `${prev},${d.points[cur] || 0}`,
        ""
      );
      return `${result.chainId},${result.vault},${d.account}${pts}`;
    }),
  ];
  return csvRows.join("\n");
}
