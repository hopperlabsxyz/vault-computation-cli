import { parseRebateDeals } from "parsing/parseRebateDeals";
import { parseHwmOverrides } from "parsing/parseHwmOverrides";
import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { filterWildCard } from "utils/various";
import { formatUnits } from "viem";
import { computationApi, type RefundHwmResult } from "lib/computationApi";

export function setRefundHwmCommand(command: Command) {
  command
    .command("refund-hwm")
    .alias("rhwm")
    .description(
      "Compute, per wallet, the performance fees to refund after the vault high-water mark is reset (v0.6.0 resetHighWaterMark). \
A personal high-water mark is tracked per deposit lot: the highest price per share the lot has already paid performance fees on. \
Fees charged on a price recovery below that mark were already paid before the drawdown, so they must be refunded by the fee receiver. \
The output is a csv with the following columns: chainId, vault, wallet, perfFees, refund, refundGross, highWaterMark, pricePerShare. \
Amounts are raw vault shares (the fee receiver sends shares back); use -r for human units. \
This command requires precise block input. The fromBlock and the toBlock must correspond to totalAssets updates blockNumber. \
The nominal workflow is to run it at each settlement with fromBlock = the last settlement already refunded.\n"
    )
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address to compute refunds for\n",
      parseVaultArgument
    )
    .option(
      "-f, --from-block <number>",
      "Starting block number for refund computation (exclusive). If not provided, uses the oldest totalAssetsUpdated block. Use 'find-blocks' command to find the appropriate block number\n"
    )
    .option(
      "-t, --to-block <number>",
      "Ending block number for refund computation (inclusive). If not provided, uses the newest totalAssetsUpdated block. Use 'find-blocks' command to find the appropriate block number\n"
    )
    .option(
      "-r, --readable",
      "Format the output in a human-readable format\n",
      false
    )
    .option(
      "-o, --output",
      "Will save the result in output/refund-hwm in a file with following format: <chainId>-<vaultAddress>-<from-block>-<to-block>.csv"
    )
    .option(
      "--silent",
      "This will prevent the printing of the output on stdout\n",
      false
    )
    .option(
      "-d, --deals <string>",
      `Path to the csv file containing OTC (Over-The-Counter) deals on the fee rebate. \
A deal reduces the refund to the perf fees the wallet still bears after its rebate (no double refund). \
The amount of % is express in 10^2. For example, 8% is express 800 in the csv file. \
0, 0x0 is a wildcard for all vaults on any chain. \
Format: chainId,vault,address,rebateRateBps \
Example:  1,0x07ed4...cb90D9B,0x123456...67890,1000\n`,
      parseRebateDeals
    )
    .option(
      "--hwm <string>",
      `Path to a csv file of personal high-water-mark overrides, for LPs migrating \
with a historical drawdown from outside the vault (e.g. a segregated account). \
The value is the price per share (asset units, decimal) the LP must recover before \
paying performance fees again, translated relative to its entry price: an LP entering \
when the price per share is 1.1 with a 50% historical drawdown gets 2.2. \
Applied once, on the wallet's first acquisition. \
The first line is a header and is ignored. A duplicated wallet is an error. \
Format: wallet,hwmPricePerShare \
Example: 0x123456...67890,2.2\n`,
      parseHwmOverrides
    )
    .addHelpText(
      "after",
      `
Example:
  $ bun rhwm 1:0x07ed467acd4ffd13023046968b0859781cb90d9b -f 1000000 -t 2000000 -r -o
    `
    )
    .action(async (vault, options) => {
      // The backend filters deals to this vault itself, but its wildcard sentinel
      // is the zero-address — not the CLI's "0x0". Resolve wildcards here and send
      // concrete (chainId, vault) entries so nothing is rejected.
      const scope = { chainId: vault.chainId, vault: vault.address };
      const rebateDeals = filterWildCard(await options.deals, vault).map((d) => ({
        ...d,
        ...scope,
      }));

      const result = await computationApi.refundHwm(vault.chainId, vault.address, {
        fromBlock: options.fromBlock,
        toBlock: options.toBlock,
        hwmOverrides: await options.hwm,
        rebateDeals,
      });

      const csv = convertToCSV(result, options.readable);
      if (!options.silent) {
        console.log(csv);
      }
      if (options.output) {
        try {
          const file = Bun.file(
            `./output/refund-hwm/${vault.chainId}-${vault.address}-${options.fromBlock}-${options.toBlock}.csv`
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

function convertToCSV(result: RefundHwmResult, readable: boolean) {
  // Amounts come back as raw wei; format with the vault decimals only when -r.
  const amount = (v: string) =>
    readable ? formatUnits(BigInt(v), result.decimals) : v;
  const price = (v: string) =>
    readable ? formatUnits(BigInt(v), result.assetDecimals) : v;

  const pricePerShare = price(result.pricePerShare);
  const highWaterMark = price(result.highWaterMark);

  const csvRows = [
    `chainId,vault,wallet,perfFees,refund,refundGross,highWaterMark,pricePerShare`,
    ...result.rows.map(
      (d) =>
        `${result.chainId},${result.vault},${d.account},${amount(
          d.perfFees
        )},${amount(d.refund)},${amount(d.refundGross)},${highWaterMark},${pricePerShare}`
    ),
  ];
  return csvRows.join("\n");
}
