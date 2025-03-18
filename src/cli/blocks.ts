import { parseArguments } from "utils/parseArguments";
import { publicClient } from "lib/publicClient";
import { LagoonVaultAbi } from "abis/VaultABI";
import { maxUint256, type Address } from "viem";
import { fetchVaultTransfers } from "utils/fetchTransfer";
import { fetchVaultTotalAssetsUpdated } from "utils/fetchVaultTotalAssetsUpdated";
import type { Command } from "@commander-js/extra-typings";
import type { Transfer } from "gql/graphql";

export function setBlocksCommand(command: Command) {
  command
    .command("blocks")
    .argument("chainId:VaultAddress")
    .description(
      "Display all blocks that can be used to compute fees for a specific vault"
    )
    .option(
      "--fromBlock <number>",
      "Display valid blocks higher or equal to this one. Default 0",
      "0"
    )
    .option(
      "--toBlock <number>",
      "Display valid blocks lower or equal to this one; default is latests"
    )
    .option(
      "-d, --since-last-transfer",
      "Use the first totalAssetsUpdate before the last transfer of shares from feeReceiver"
    )
    .action(async (args, options) => {
      const vault = parseArguments(args);
      const client = publicClient[vault.chainId];
      if (!options.toBlock) {
        options.toBlock = (
          await client.getBlock({ blockTag: "latest" })
        ).number.toString();
      }

      if (options?.sinceLastTransfer) {
        const { transfers } = await fetchVaultTransfers({
          address: vault.address,
          chainId: vault.chainId,
          toBlock: maxUint256,
          skip: 0,
          first: 1000,
        });
        const roles = await client.readContract({
          address: vault.address,
          abi: LagoonVaultAbi,
          functionName: "getRolesStorage",
        });

        const mostRecent = getMostRecentTransfer({
          transfers,
          from: roles.feeReceiver,
        });
        if (mostRecent) options.fromBlock = mostRecent.blockNumber;
        else {
          console.log("No transfer found from feeReceiver");
          options.fromBlock = "0";
        }
      }

      let vaultData = (
        await fetchVaultTotalAssetsUpdated({
          address: vault.address,
          chainId: vault.chainId,
          toBlock: BigInt(options.toBlock),
          skip: 0,
          first: 1000,
        })
      ).totalAssetsUpdateds;
      if (vaultData.length >= 1000) throw new Error("only fetched first 1000");

      const events = vaultData
        .filter(
          (ev) =>
            ev.blockNumber >= options.fromBlock! &&
            ev.blockNumber <= options.toBlock!
        )
        .map((e) => e.blockNumber)
        .reverse();
      console.log(`From ${options.fromBlock}`);
      events.forEach((block) => console.log("Fee distribution", block));
      console.log(`To ${options.toBlock}`);
    });
}

function getMostRecentTransfer({
  from,
  to,
  transfers,
}: {
  transfers: Transfer[];
  from?: Address;
  to?: Address;
}): Transfer | undefined {
  if (from) from = from.toLowerCase() as Address;
  if (to) to = to.toLowerCase() as Address;

  const filtered = transfers.filter(
    (t) =>
      (t.from.toLowerCase() == from || from == undefined) &&
      (t.to.toLowerCase() == to || to == undefined)
  );
  if (filtered.length == 0) return undefined;
  return filtered[filtered.length - 1];
}
