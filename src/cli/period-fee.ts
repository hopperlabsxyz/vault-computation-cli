import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { apiClient } from "api/client";
import { PERIOD_FEES_QUERY } from "api/queries";
import type { PeriodFeeResultResponse } from "api/types";
import { convertToCSVPeriodFees } from "formatting/period-fee-csv";
import { withErrorHandler } from "utils/error-handler";

export function setPeriodFeeCommand(command: Command) {
  command
    .command("period-fee")
    .alias("pf")
    .description(
      `Calculate and generate fee reports for specific periods between 2 updates of totalAssets (period). \
The output is a csv with period fees, rates, PPS, and VPPS. \
If fromBlock and toBlock are not provided, uses the full range.\n`
    )
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address\n",
      parseVaultArgument
    )
    .option(
      "-f, --from-block <number>",
      "Starting block number for fee computation\n"
    )
    .option(
      "-t, --to-block <number>",
      "Ending block number for fee computation\n"
    )
    .option(
      "-r, --readable",
      "Format the output in a human-readable format\n",
      false
    )
    .option(
      "-o, --output",
      "Save the result to output/period-fee directory\n"
    )
    .option("--silent", "Suppress stdout output\n", false)
    .action(withErrorHandler(async (vault, options) => {
      const data = await apiClient.request<PeriodFeeResultResponse>(
        PERIOD_FEES_QUERY,
        {
          address: vault.address,
          chainId: vault.chainId,
          fromBlock: options.fromBlock || undefined,
          toBlock: options.toBlock || undefined,
        }
      );

      const result = data.periodFees;

      const csv = convertToCSVPeriodFees(
        {
          chainId: result.chainId,
          address: result.address,
          decimals: result.decimals,
          assetDecimals: result.assetDecimals,
        },
        result.entries,
        options.readable,
        result.airdrops
      );

      if (!options.silent) {
        console.log(csv);
      }

      if (options.output) {
        const fromBlock = options.fromBlock || "0";
        const toBlock = options.toBlock || "latest";
        const filePath = `./output/period-fee/${vault.chainId}-${vault.address}-${fromBlock}-${toBlock}.csv`;
        try {
          const file = Bun.file(filePath);
          await file.write(csv);
          console.log(`CSV report written to: ${file.name}`);
        } catch (error: unknown) {
          const msg =
            error instanceof Error ? error.message : "unknown error";
          console.error("Error writing CSV file:", msg);
          console.log("CSV content:");
          console.log(csv);
        }
      }
    }));
}
