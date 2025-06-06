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
    .requiredOption(
      "-f, --from-block <number>",
      "Starting block number for fee computation (exclusive). Use 'find-blocks' command to find the appropriate block number"
    )
    .requiredOption(
      "-t, --to-block <number>",
      "Ending block number for fee computation (inclusive). Use 'find-blocks' command to find the appropriate block number"
    )
    .option("-r, --readable", "Format the output in a human-readable format")
    .option(
      "-o, --output",
      "Will save the result in output/user-fee in a file with following format: <chainId>-<vaultAddress>-<from-block>-<to-block>.csv"
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

      points = await parsePoints(options.points);

      const result = await processVault({
        fromBlock: BigInt(options!.fromBlock!),
        toBlock: BigInt(options!.toBlock!),
        deals: {},
        readable: options!.readable!,
        rates: {
          feeRebateRate: 0,
          feeRewardRate: 0,
        },
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
            `./output/user-points/${vault.chainId}-${vault.address}-${options.fromBlock}-${options.toBlock}.csv`
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
    `chainId,vault,wallet,balance,fees,pricePerShare,cashback${pointNamesString}`, // CSV header
    ...Object.entries(vault.data).map(
      ([address, { balance, fees, cashback, points }]) => {
        let str = `${vault.chainId},${vault.address},${address},${balance},${fees}`;
        str += `,${vault.pricePerShare},${cashback}`;
        str += pointsToCsv(points, vault.pointNames);
        return str;
      }
    ),
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
