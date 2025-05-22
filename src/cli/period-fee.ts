import { processVault } from "core/processVault";
import { parseArguments } from "utils/parseArguments";
import type { Command } from "@commander-js/extra-typings";
import type { PeriodFees } from "core/types";
import { formatUnits } from "viem";

export function setPeriodFeeCommand(command: Command) {
  command
    .command("period-fee")
    .description(
      "Calculate and generate fee reports for a specified vault, including referral rewards and rebates"
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
      "Will save the result in a file with following format: <chainId>-<vaultAddress>-<from-block>-<to-block>.csv"
    )
    .option(
      "--noprint",
      "This will prevent the printing of the output on standoutput",
      false
    )
    .addHelpText(
      "after",
      `
Examples:
  $ bun period-fees 1:0x07ed467acd4ffd13023046968b0859781cb90d9b -f 1000000 -l 2000000 -r  ## All parameters
    `
    )
    .action(async (args, options) => {
      const vault = parseArguments(args);

      const result = await processVault({
        fromBlock: Number(options!.fromBlock!),
        toBlock: Number(options!.toBlock!),
        deals: {},
        readable: options!.readable!,
        feeRebateRate: 0,
        feeRewardRate: 0,
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
            `period-fees-${vault.chainId}-${vault.address}-${options.fromBlock}-${options.toBlock}.csv`
          );
          await file.write(csv);
          console.log(`CSV report written to: ${file.name}`);
        } catch (error: any) {
          console.error("Error writing CSV file:", error.message);
          console.log("CSV content:");
          console.log(csv);
        }
      }
      if (!options.noprint) {
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
  const header = `chainId,vault,period, blockNumber, managementFees,performanceFees`; // CSV header
  const csvRows = vault.periodFees.map(
    ({ managementFees, performanceFees, period, blockNumber }) => {
      if (readable) {
        managementFees = formatUnits(BigInt(managementFees), vault.decimals);
        performanceFees = formatUnits(BigInt(performanceFees), vault.decimals);
      }
      return `${vault.chainId},${vault.address},${period},${blockNumber},${managementFees},${performanceFees}`;
    }
  );

  return [header, ...csvRows].join("\n");
}
