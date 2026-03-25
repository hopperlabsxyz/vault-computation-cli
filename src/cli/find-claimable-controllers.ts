import type { Command } from "@commander-js/extra-typings";
import { parseVaultArgument } from "parsing/parseVault";
import { apiClient } from "api/client";
import { CLAIMABLE_CONTROLLERS_QUERY } from "api/queries";
import type { ClaimableControllersResponse } from "api/types";
import { withErrorHandler } from "utils/error-handler";

export function setFindClaimableControllersCommand(command: Command) {
  command
    .command("find-claimable-controllers")
    .alias("fcc")
    .description("Find controllers with claimable deposit requests.\n")
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address\n",
      parseVaultArgument
    )
    .action(withErrorHandler(async (vault) => {
      const data = await apiClient.request<ClaimableControllersResponse>(
        CLAIMABLE_CONTROLLERS_QUERY,
        {
          address: vault.address,
          chainId: vault.chainId,
        }
      );

      console.log(JSON.stringify(data.claimableControllers));
    }));
}
