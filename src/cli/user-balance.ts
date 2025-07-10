import { processVault } from "core/processVault";
import { parseArguments } from "utils/parseArguments";
import type { Command } from "@commander-js/extra-typings";

export function setUserBalanceCommand(command: Command) {
  command
    .command("user-balance")
    .description(
      "Calculate and generate a balance report for a specified vault, including all users balance."
    )
    .argument("chainId:VaultAddress")
    .option("-r, --readable", "Format the output in a human-readable format")
    .option(
      "-t, --to-block <number>",
      "Ending block number for fee computation (inclusive). Use 'find-blocks' command to find the appropriate block number"
    )
    .option(
      "-o, --output",
      "Will save the result in output/user-balance in a csv file with following name: <chainId>-<vaultAddress>-<to-block>.csv"
    )
    .option(
      "--silent",
      "This will prevent the printing of the output on stdout",
      false
    )
    .addHelpText(
      "after",
      `
Example:
  $ bun user-balance 1:0x07ed467acd4ffd13023046968b0859781cb90d9b -r -o --to-block 1000000
    `
    )
    .action(async (args, options) => {
      const vault = parseArguments(args);

      const result = await processVault({
        deals: {},
        readable: options!.readable!,
        vault,
        toBlock: options.toBlock ? BigInt(options.toBlock) : undefined,
        strictBlockNumberMatching: false,
      });

      const csv = convertToCSV(result);
      if (options.silent == false) {
        console.log(csv);
      }
      if (options.output) {
        try {
          const file = Bun.file(
            `./output/user-balance/${vault.chainId}-${vault.address}-${options.toBlock}.csv`
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
  data: Record<
    string,
    {
      balance: number;
      fees: number;
      cashback: number;
    }
  >;
}) {
  const csvRows = [
    `chainId,vault,wallet,balance`, // CSV header
    ...Object.entries(vault.data).map(([address, { balance }]) => {
      let str = `${vault.chainId},${vault.address},${address},${balance}`;
      return str;
    }),
  ];
  return csvRows.join("\n");
}
