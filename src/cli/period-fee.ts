import { processEvents } from "core/processEvents";
import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import type { PeriodFees } from "core/types";
import { formatUnits } from "viem";
import { getTotalAssetsUpdatedBlockRange } from "utils/getTotalAssetsUpdatedBlockRange";
import { fetchAirdrops, type Airdrop } from "utils/fetchAirdrops";
import { getEndOfMonthTimestamps } from "utils/time";

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
      // Get default block range from totalAssetsUpdated events if not provided
      let fromBlock: bigint;
      let toBlock: bigint;
      
      if (!options.fromBlock || !options.toBlock) {
        const blockRange = await getTotalAssetsUpdatedBlockRange(vault);
        if (!blockRange) {
          throw new Error("No totalAssetsUpdated events found for this vault. Cannot determine default block range.");
        }
        fromBlock = options.fromBlock ? BigInt(options.fromBlock) : blockRange.oldestBlock;
        toBlock = options.toBlock ? BigInt(options.toBlock) : blockRange.newestBlock;
      } else {
        fromBlock = BigInt(options.fromBlock);
        toBlock = BigInt(options.toBlock);
      }

      const result = await processEvents({
        fromBlock,
        toBlock,
        rebateDeals: [],
        readable: options.readable,
        vault,
      });
      

      const airdrops = await fetchAirdrops(vault.chainId, vault.address);

      const csv = convertToCSVPeriodFees(
        {
          address: vault.address,
          chainId: vault.chainId,
          decimals: result.decimals,
          periodFees: result.periodFees,
          asset: {
            decimals: result.asset.decimals,
          },
        },
        options.readable,
        airdrops
      );
      if (!options.silent) {
        console.log(csv);
      }
      if (options.output) {
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

const csvHeader = "chainId,vault,period,blockNumber,managementFees,performanceFees,protocolFees,timestamp,managementRate,performanceRate,pricePerShare,totalAssets,totalSupply,vpps";

export function convertToCSVPeriodFees(
  vault: {
    chainId: number;
    address: string;
    decimals: number;
    periodFees: PeriodFees;
    asset: {
      decimals: number;
    };
  },
  readable: boolean,
  airdrops: Airdrop[] = []
) {
  const fees = vault.periodFees;
  const csvRows: string[] = [];

  for (let i = 0; i < fees.length; i++) {
    let {
      managementFees,
      performanceFees,
      period,
      blockNumber,
      timestamp,
      managementRate,
      performanceRate,
      pricePerShare,
      totalAssets,
      totalSupply,
      protocolFees
    } = fees[i];

    if (readable) {
      managementFees = formatUnits(BigInt(managementFees), vault.decimals);
      performanceFees = formatUnits(BigInt(performanceFees), vault.decimals);
      protocolFees = formatUnits(BigInt(protocolFees), vault.decimals);
      totalAssets = formatUnits(BigInt(totalAssets), vault.asset.decimals);
      totalSupply = formatUnits(BigInt(totalSupply), vault.decimals);
    }

    const airdropSum = computeAirdropSum(airdrops, timestamp);
    const vpps = (Number(pricePerShare) + airdropSum).toFixed(10);
    csvRows.push(`${vault.chainId},${vault.address},${period},${blockNumber},${managementFees},${performanceFees},${protocolFees},${timestamp},${managementRate},${performanceRate},${pricePerShare},${totalAssets},${totalSupply},${vpps}`);

    // Insert interpolated end-of-month rows between this row and the next
    if (i < fees.length - 1) {
      const nextFee = fees[i + 1];
      const t1 = timestamp;
      const t2 = nextFee.timestamp;
      const pps1 = Number(pricePerShare);
      const pps2 = Number(nextFee.pricePerShare);

      for (const eomTs of getEndOfMonthTimestamps(t1, t2)) {
        const ratio = (eomTs - t1) / (t2 - t1);
        const interpPps = (pps1 + (pps2 - pps1) * ratio).toFixed(10);
        const eomAirdropSum = computeAirdropSum(airdrops, eomTs);
        const interpVpps = (pps1 + (pps2 - pps1) * ratio + eomAirdropSum).toFixed(10);
        csvRows.push(`${vault.chainId},${vault.address},${period},,,,,${eomTs},,,${interpPps},,,${interpVpps}`);
      }
    }
  }

  return [csvHeader, ...csvRows].join("\n");
}

/**
 * Computes the sum of airdrop increases up to a given timestamp.
 *
 * @param airdrops - Array of airdrop objects.
 * @param timestamp - Timestamp in seconds (Unix epoch, UTC).
 * @returns Sum of airdrop increases up to the timestamp.
 */
function computeAirdropSum(airdrops: Airdrop[], timestamp: number): number {
  return airdrops
    .filter((a) => a.distributionTimestamp <= timestamp)
    .reduce((sum, a) => sum + a.ppsIncrease, 0);
}
