import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { formatUnits } from "viem";
import { computationApi, type UserBalancesResult } from "lib/computationApi";

export function setUserBalanceCommand(command: Command) {
  command
    .command("user-balance")
    .alias("ub")
    .description(
      "Generate a share-balance report for a specified vault, including all users' balances. \
The output is a csv with the following columns: chainId, vault, wallet, balance. \
Balances are a snapshot at --block, or the latest available state if no block is given.\n"
    )
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address to find blocks for\n",
      parseVaultArgument
    )
    .option(
      "-r, --readable",
      "Format the output in a human-readable format\n",
      false
    )
    .option(
      "-b, --block <number>",
      "Block number at which the snapshot is taken. If not provided, the latest is used\n"
    )
    .option(
      "-o, --output",
      "Will save the result in output/user-balance in a csv file with following name: <chainId>-<vaultAddress>-<block>.csv\n"
    )
    .option(
      "--silent",
      "This will prevent the printing of the output on stdout\n",
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
      const result = await computationApi.userBalances(
        vault.chainId,
        vault.address,
        { toBlock: options.block }
      );

      const csv = convertToCSV(result, options.readable);
      if (!options.silent) {
        console.log(csv);
      }
      if (options.output) {
        try {
          const file = Bun.file(
            `./output/user-balance/${vault.chainId}-${vault.address}-${options.block ?? "latest"}.csv`
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

function convertToCSV(result: UserBalancesResult, readable: boolean) {
  // Balances come back as raw wei; format with the vault decimals only when -r.
  const balance = (v: string) =>
    readable ? formatUnits(BigInt(v), result.decimals) : v;

  const csvRows = [
    `chainId,vault,wallet,balance`,
    ...result.rows.map(
      (d) => `${result.chainId},${result.vault},${d.account},${balance(d.balance)}`
    ),
  ];
  return csvRows.join("\n");
}
