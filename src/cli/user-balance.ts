import { processVault } from "core/processVault";
import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { publicClient } from "lib/publicClient";

export function setUserBalanceCommand(command: Command) {
  command
    .command("user-balance")
    .description(
      "Calculate and generate a balance report for a specified vault, including all users balance. \
      If no block is provided, the latest is used."
    )
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address to find blocks for",
      parseVaultArgument
    )
    .option("-r, --readable", "Format the output in a human-readable format")
    .option(
      "-b, --block <number>",
      "Block number at which the snapshot is taken. If not provided, the latest is used"
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
  $ bun user-balance 1:0x07ed467acd4ffd13023046968b0859781cb90d9b -r -o --block 1000000
    `
    )
    .action(async (vault, options) => {
      const client = publicClient[vault.chainId];
      if (!options.block)
        options.block = (await client.getBlockNumber()).toString();

      const result = await processVault({
        readable: options.readable ?? false,
        vault,
        toBlock: BigInt(options.block),
        strictBlockNumberMatching: false,
      });

      const csv = convertToCSV(result);
      if (options.silent == false) {
        console.log(csv);
      }
      if (options.output) {
        try {
          const file = Bun.file(
            `./output/user-balance/${vault.chainId}-${vault.address}-${options.block}.csv`
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

function convertToCSV(
  vault: {
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
  }
  // readable: boolean
) {
  const csvRows = [
    `chainId,vault,wallet,balance`, // CSV header
    ...Object.entries(vault.data).map(([address, { balance }]) => {
      if (balance === 0) return "";
      let balanceStr = balance.toString();
      // if (readable || true) {
      // balanceStr = balance.toLocaleString("fullwide", {
      // useGrouping: false,
      // });
      // } else {
      balanceStr = balance.toLocaleString("fullwide", {
        useGrouping: false,
      });
      // }
      let str = `${vault.chainId},${vault.address},${address},${balanceStr}`;
      return str;
    }),
  ];
  return csvRows.filter((row) => row !== "").join("\n");
}
