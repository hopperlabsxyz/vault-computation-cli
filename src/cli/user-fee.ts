import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { apiClient } from "api/client";
import { USER_FEES_QUERY } from "api/queries";
import type { UserFeeResultResponse } from "api/types";
import { formatUnits } from "utils/format";
import { withErrorHandler } from "utils/error-handler";

export function setUserFeeCommand(command: Command) {
  command
    .command("user-fee")
    .alias("uf")
    .description(
      "Calculate and generate fee reports for all users in a vault.\n"
    )
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address\n",
      parseVaultArgument
    )
    .option("-f, --from-block <number>", "Starting block number\n")
    .option("-t, --to-block <number>", "Ending block number\n")
    .option(
      "-r, --readable",
      "Format the output in a human-readable format\n",
      false
    )
    .action(withErrorHandler(async (vault, options) => {
      const data = await apiClient.request<UserFeeResultResponse>(
        USER_FEES_QUERY,
        {
          address: vault.address,
          chainId: vault.chainId,
          fromBlock: options.fromBlock || undefined,
          toBlock: options.toBlock || undefined,
        }
      );

      const result = data.userFees;
      const { decimals, assetDecimals } = result;

      const csvRows = [
        `chainId,vault,wallet,referrer,balance,fees,pricePerShare,cashback`,
        ...result.entries
          .sort((a, b) => a.account.localeCompare(b.account))
          .map(({ balance, fees, cashback, account, referrer }) => {
            if (balance === "0" && cashback === "0" && fees === "0") return "";
            const bal = options.readable
              ? formatUnits(balance, decimals)
              : balance;
            const fee = options.readable
              ? formatUnits(fees, decimals)
              : fees;
            const cb = options.readable
              ? formatUnits(cashback, decimals)
              : cashback;
            const pps = options.readable
              ? formatUnits(result.pricePerShare, assetDecimals)
              : result.pricePerShare;
            return `${result.chainId},${result.address},${account},${referrer},${bal},${fee},${pps},${cb}`;
          })
          .filter(Boolean),
      ];

      console.log(csvRows.join("\n"));
    }));
}
