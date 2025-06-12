import { parseArguments } from "utils/parseArguments";
import { publicClient } from "lib/publicClient";
import type { Command } from "@commander-js/extra-typings";
import { preprocessEvents } from "core/preprocessEvents";
import type { DepositRequest, DepositRequestCanceled } from "../../gql/graphql";
import type { Address } from "viem";
import { fetchVaultEvents } from "utils/fetchVaultEvents";
import { generateVault } from "core/vault";

export function setControllersCommand(command: Command) {
  command
    .command("find-claimable-controllers")
    .argument("chainId:VaultAddress")
    .description(
      "Finds all controllers that made a deposit request. Use this command if you want to get the args for claimSharesOnBehalf()"
    )
    .option(
      "--from-block <number>",
      "Starting at block number. Default to the vault inception block "
    )
    .addHelpText(
      "after",
      `
Examples:
  $ fees-computation-cli find-claimable-controllers 1:0x123...                    # Find all claimable controllers 
    `
    )
    .action(async (args, options) => {
      const vault = parseArguments(args);
      const client = publicClient[vault.chainId];
      const toBlock = (
        await client.getBlock({ blockTag: "latest" })
      ).number.toString();

      const vaultEvents = await fetchVaultEvents({
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
        events = events.filter((e) => e.blockNumber >= fromBlock);
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

      console.log("[" + controllers.map((c) => '"' + c + '"').join(", ") + "]");
    });
}
