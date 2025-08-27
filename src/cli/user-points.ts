import { processVault } from "core/processVault";
import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import type { ProcessVaultReturn } from "core/types";
import { parsePoints } from "parsing/parsePoints";
import type { Vault } from "types/Vault";

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

      const result = await processVault({
        readable: false,
        strictBlockNumberMatching: false,
        vault,
        points,
      });

      const csv = convertToCSV({
        vault,
        data: result.data,
        pointNames: result.pointNames,
      });
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

function convertToCSV({
  vault,
  data,
  pointNames,
}: {
  vault: Vault;
  pointNames: string[];
  data: ProcessVaultReturn["data"];
}) {
  const pointNamesString = pointNames.reduce(
    (prev, cur) => `${prev},${cur}`,
    ""
  );
  const csvRows = [
    `chainId,vault,wallet${pointNamesString}`, // CSV header
    ...data.map(({ points, account }) => {
      let str = `${vault.chainId},${vault.address},${account}`;
      str += pointsToCsv(points, pointNames);
      return str;
    }),
  ];
  return csvRows.join("\n");
}

function pointsToCsv(
  points: Record<string, number>,
  pointsName: string[]
): string {
  const a = pointsName.reduce((prev, cur) => {
    const value = points[cur] || 0n;
    return `${prev},${value}`;
  }, "");
  return a;
}
