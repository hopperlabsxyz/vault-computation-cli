import { processVault } from "core/processVault";
import { parseArguments } from "utils/parseArguments";
import type { Command } from "@commander-js/extra-typings";
import type { Point } from "core/types";
import { parsePoints } from "parsing/parsePoints";

export function setUserPointsCommand(command: Command) {
  command
    .command("user-points")
    .description(
      "Calculate and generate fee reports for a specified vault, including referral rewards and rebates for all users"
    )
    .argument("chainId:VaultAddress")
    .option("-r, --readable", "Format the output in a human-readable format")
    .option(
      "-o, --output",
      "Will save the result in output/user-points in a file with following format: <chainId>-<vaultAddress>-<inputFileName>.csv"
    )
    .option(
      "--silent",
      "This will prevent the printing of the output on stdout",
      false
    )
    .requiredOption(
      "--points <string>",
      "A path to a file containing the evolutions of points through time with the following format: timestamp,amount,name. For each line \
       the program will distribute the new points proportionnaly to shareholders."
    )
    //     .addHelpText(
    //       "after",
    //       `
    // Example:
    //     `
    //     )
    .action(async (args, options) => {
      const vault = parseArguments(args);

      let points: Point[] = [];

      if (options.points.slice(-4) != ".csv") throw new Error("");
      const fileName = options.points.split("/").slice(-1);
      points = await parsePoints(options.points);

      const result = await processVault({
        readable: options!.readable!,
        strictBlockNumberMatching: false,
        vault,
        points,
      });

      const csv = convertToCSV(result);
      if (options.silent == false) {
        console.log(csv);
      }
      if (options.output) {
        try {
          const file = Bun.file(
            `./output/user-points/${vault.chainId}-${vault.address}-${fileName}`
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

function convertToCSV(vault: {
  chainId: number;
  address: string;
  pricePerShare: number;
  pointNames: string[];
  data: Record<
    string,
    {
      balance: number;
      fees: number;
      cashback: number;
      points: Record<string, number>;
    }
  >;
}) {
  const pointNamesString = vault.pointNames.reduce(
    (prev, cur) => `${prev},${cur}`,
    ""
  );
  const csvRows = [
    `chainId,vault,wallet,${pointNamesString}`, // CSV header
    ...Object.entries(vault.data).map(([address, { points }]) => {
      let str = `${vault.chainId},${vault.address},${address}`;
      str += pointsToCsv(points, vault.pointNames);
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
