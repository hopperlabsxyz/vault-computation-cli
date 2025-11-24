import { publicClient } from "lib/publicClient";
import type { Command } from "@commander-js/extra-typings";
import { preprocessEvents } from "core/preprocessEvents";
import type { DepositRequest, DepositRequestCanceled } from "../../gql/graphql";
import { getAddress, type Address } from "viem";
import { fetchAllVaultEvents } from "utils/fetchVaultEvents";
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
      "Finds all controllers that made a deposit request. Use this command if you want to get the args for claimSharesOnBehalf().\n"
    )
    .option(
      "--from-block <number>",
      "Starting at block number. Default to the vault inception block\n"
    )
    .addHelpText(
      "after",
      `
Examples:
  $ fees-computation-cli find-claimable-controllers 1:0x123...                    # Find all claimable controllers
    `
    )
    .action(async (vault, options) => {
      const client = publicClient[vault.chainId];
      const toBlock = (
        await client.getBlock({ blockTag: "latest" })
      ).number.toString();

      const vaultEvents = await fetchAllVaultEvents({
        chainId: vault.chainId,
        vaultAddress: vault.address,
        toBlock: BigInt(toBlock),
      });

      const vaultState = await generateVault({
        vault,
      });

      let events = preprocessEvents({
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
      ) as (DepositRequest | DepositRequestCanceled)[];

      if (options.fromBlock) {
        const fromBlock = Number(options.fromBlock);
        events = events.filter((e) => Number(e.blockNumber) >= fromBlock);
      }

      const controllersIntention = events.reduce((map, event) => {
        const controller = (event as DepositRequest | DepositRequestCanceled)
          .controller;
        if (controller) {
          map[controller] = event.__typename === "DepositRequest";
        }
        return map;
      }, {} as Record<Address, boolean>);

      const controllers = Object.entries(controllersIntention)
        .filter(([, value]) => value)
        .map(([address]) => address);
      
      const controllersToClaim = (await Promise.all(controllers.map(async (c) => {
        const claimableDepositRequest = await client.readContract({
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
