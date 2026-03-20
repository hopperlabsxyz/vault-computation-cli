import { publicClient } from "lib/publicClient";
import type { Command } from "@commander-js/extra-typings";
import { preprocessEvents } from "core/preprocessEvents";
import { getAddress, type Address } from "viem";
import { fetchAllVaultEvents } from "@hopperlabsxyz/internal-subgraph";
import { getSubgraphClientForChain } from "lib/subgraphClient";
import { generateVault } from "core/vault";
import { parseVaultArgument } from "parsing/parseVault";
import { LagoonVaultAbi } from "abis/VaultABI";

export function setControllersCommand(command: Command) {
  command
    .command("find-claimable-controllers")
    .alias("fcc")
    .argument(
      "chainId:VaultAddress",
      "The chain ID and vault address to find controllers for\n",
      parseVaultArgument
    )
    .description(
      "Finds all controllers that have a claimable deposit request. Use this command if you want to get the args for claimSharesOnBehalf().\n"
    )
    .option(
      "-b, --block <number>",
      "Block number at which the snapshot is taken. If not provided, the latest is used\n"
    )
    .addHelpText(
      "after",
      `
Examples:
  $ fees-computation-cli find-claimable-controllers 1:0x123...                    # Find all claimable controllers
    `
    )
    .action(async (vault, options) => {
      const rpcClient = publicClient[vault.chainId];
      const toBlock = options.block ? BigInt(options.block) : (
        await rpcClient.getBlock({ blockTag: "latest" })
      ).number;

      const sgClient = getSubgraphClientForChain(vault.chainId);
      const vaultEvents = await fetchAllVaultEvents({
        client: sgClient,
        chainId: vault.chainId,
        vaultAddress: vault.address,
        toBlock: toBlock.toString(),
      });

      const vaultState = await generateVault({
        vault,
      });

      const events = preprocessEvents({
        events: vaultEvents,
        addresses: {
          silo: vaultState.silo,
          vault: vault.address,
        },
      }).filter(
        (e) =>
          e.__typename === "DepositRequest" ||
          e.__typename === "DepositRequestCanceled" ||
          e.__typename === "TotalAssetsUpdated"
      );

      const controllersIntention = events.reduce((map, event) => {
        if (event.__typename === "DepositRequest" || event.__typename === "DepositRequestCanceled") {
          const controller = event.controller;
          if (controller) {
            map[controller] = event.__typename === "DepositRequest";
          }
        }
        return map;
      }, {} as Record<Address, boolean>);

      const controllers = Object.entries(controllersIntention)
        .filter(([, value]) => value)
        .map(([address]) => address);

      const controllersToClaim = (await Promise.all(controllers.map(async (c) => {
        const claimableDepositRequest = await rpcClient.readContract({
          address: vault.address,
          abi: LagoonVaultAbi,
          functionName: "claimableDepositRequest",
          args: [0n, getAddress(c)],
          blockTag: "latest",
        });
        return { address: c, claimableDepositRequest };
      }))).filter((c) => c.claimableDepositRequest > 0n).map((c) => c.address);


      console.log("[" + controllersToClaim.map((c) => '"' + c + '"').join(", ") + "]");
    });
}
