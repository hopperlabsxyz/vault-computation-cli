import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { formatUnits } from "viem";
import { computationApi, type PeriodFeesResult } from "lib/computationApi";

export function setPeriodFeeCommand(command: Command) {
  command
    .command("period-fee")
    .alias("pf")
    .description(
      `Calculate and generate fee reports for specific periods between 2 updates of totalAssets (period). \
The output is a csv with the following columns: ${csvHeader}. \
If fromBlock and toBlock are not provided, uses the oldest and newest totalAssetsUpdated blocks. \
The fromBlock and the toBlock must correspond to totalAssets updates blockNumber.\n`
    )
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address to find blocks for\n",
      parseVaultArgument
    )
    .option(
      "-f, --from-block <number>",
      "Starting block number for fee computation (exclusive). If not provided, uses the oldest totalAssetsUpdated block. Use 'find-blocks' command to find the appropriate block number\n"
    )
    .option(
      "-t, --to-block <number>",
      "Ending block number for fee computation (inclusive). If not provided, uses the newest totalAssetsUpdated block. Use 'find-blocks' command to find the appropriate block number\n"
    )
    .option(
      "-r, --readable",
      "Format the output in a human-readable format\n",
      false
    )
    .option(
      "-o, --output",
      "Will save the result in output/period-fee in a file with following format: <chainId>-<vaultAddress>-<from-block>-<to-block>.csv\n"
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
  $ bun period-fee 1:0x07ed467acd4ffd13023046968b0859781cb90d9b -f 1000000 -l 2000000 -r
    `
    )
    .action(async (vault, options) => {
      const result = await computationApi.periodFees(
        vault.chainId,
        vault.address,
        { fromBlock: options.fromBlock, toBlock: options.toBlock }
      );

      const csv = convertToCSVPeriodFees(result, options.readable);
      if (!options.silent) {
        console.log(csv);
      }
      if (options.output) {
        const blocks = result.rows
          .map((r) => r.blockNumber)
          .filter((b): b is number => b != null);
        const fromBlock = options.fromBlock ?? Math.min(...blocks);
        const toBlock = options.toBlock ?? Math.max(...blocks);
        try {
          const file = Bun.file(
            `./output/period-fee/${vault.chainId}-${vault.address}-${fromBlock}-${toBlock}.csv`
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

const csvHeader =
  "chainId,vault,period,blockNumber,managementFees,performanceFees,protocolFees,timestamp,managementRate,performanceRate,pricePerShare,totalAssets,totalSupply,vpps";

export function convertToCSVPeriodFees(
  result: PeriodFeesResult,
  readable: boolean
) {
  // Amounts come back as raw wei; format with the vault decimals only when -r.
  const amount = (v: string | null, decimals: number) =>
    v == null ? "" : readable ? formatUnits(BigInt(v), decimals) : v;
  const cell = (v: number | null) => (v == null ? "" : v);

  const csvRows = result.rows.map((r) =>
    [
      r.chainId,
      r.vault,
      r.period,
      cell(r.blockNumber),
      amount(r.managementFees, result.decimals),
      amount(r.performanceFees, result.decimals),
      amount(r.protocolFees, result.decimals),
      r.timestamp,
      cell(r.managementRate),
      cell(r.performanceRate),
      r.pricePerShare,
      amount(r.totalAssets, result.assetDecimals),
      amount(r.totalSupply, result.decimals),
      r.vpps,
    ].join(",")
  );

  return [csvHeader, ...csvRows].join("\n");
}
