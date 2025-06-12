import { processVault } from "core/processVault";
import { parseArguments } from "utils/parseArguments";
import type { Command } from "@commander-js/extra-typings";
import type { PeriodFees } from "core/types";
import { formatUnits } from "viem";

export function setPeriodFeeCommand(command: Command) {
  command
    .command("period-fee")
    .description(
      "Calculate and generate fee reports for a specific period between 2 updates of totalAssets (period)."
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
    .option(
      "-r, --readable",
      "Format the output in a human-readable format",
      false
    )
    .option(
      "-o, --output",
      "Will save the result in output/period-fee in a file with following format: <chainId>-<vaultAddress>-<from-block>-<to-block>.csv"
    )
    .option(
      "--silent",
      "This will prevent the printing of the output in stdout",
      false
    )
    .addHelpText(
      "after",
      `
Example:
  $ bun period-fee 1:0x07ed467acd4ffd13023046968b0859781cb90d9b -f 1000000 -l 2000000 -r 
    `
    )
    .action(async (args, options) => {
      const vault = parseArguments(args);

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
      });

      const csv = convertToCSVPeriodFees(
        {
          address: vault.address,
          chainId: vault.chainId,
          decimals: result.decimals,
          periodFees: result.periodFees,
        },
        options.readable
      );

      if (options.output) {
        try {
          const file = Bun.file(
            `./output/period-fee/${vault.chainId}-${vault.address}-${options.fromBlock}-${options.toBlock}.csv`
          );
          await file.write(csv);
          console.log(`CSV report written to: ${file.name}`);
        } catch (error: any) {
          console.error("Error writing CSV file:", error.message);
          console.log("CSV content:");
          console.log(csv);
        }
      }
      if (!options.silent) {
        console.log(csv);
      }
    });
}

export function convertToCSVPeriodFees(
  vault: {
    chainId: number;
    address: string;
    decimals: number;
    periodFees: PeriodFees;
  },
  readable: boolean
) {
  const header = `chainId,vault,period,blockNumber,managementFees,performanceFees,timestamp,managementRate,performanceRate,pricePerShare`; // CSV header
  const csvRows = vault.periodFees.map(
    ({
      managementFees,
      performanceFees,
      period,
      blockNumber,
      timestamp,
      managementRate,
      performanceRate,
      pricePerShare,
    }) => {
      if (readable) {
        managementFees = formatUnits(BigInt(managementFees), vault.decimals);
        performanceFees = formatUnits(BigInt(performanceFees), vault.decimals);
      }
      return `${vault.chainId},${vault.address},${period},${blockNumber},${managementFees},${performanceFees},${timestamp},${managementRate},${performanceRate},${pricePerShare}`;
    }
  );

  return [header, ...csvRows].join("\n");
}
