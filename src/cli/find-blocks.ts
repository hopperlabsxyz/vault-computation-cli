import { parseArguments } from "utils/parseArguments";
import { publicClient } from "lib/publicClient";
import { LagoonVaultAbi } from "abis/VaultABI";
import { maxUint256, type Address } from "viem";
import { fetchVaultTransfers } from "utils/fetchTransfer";
import { fetchVaultTotalAssetsUpdated } from "utils/fetchVaultTotalAssetsUpdated";
import type { Command } from "@commander-js/extra-typings";
import type { Transfer } from "../../gql/graphql";

export function setBlocksCommand(command: Command) {
  command
    .command("find-blocks")
    .argument("chainId:VaultAddress")
    .description(
      "Find all blocks where fee distributions occurred for a specific vault. Use this command to determine the block range for fee computation."
    )
    .option(
      "--fromBlock <number>",
      "Start searching from this block number (inclusive). Defaults to 0",
      "0"
    )
    .option(
      "--toBlock <number>",
      "Search up to this block number (inclusive). Defaults to the latest block"
    )
    .option(
      "-d, --since-last-transfer",
      "Start searching from the block of the most recent share transfer from the fee receiver. Useful for finding the last fee distribution period"
    )
    .addHelpText(
      "after",
      `
Examples:
  $ fees-computation-cli find-blocks 1:0x123...                    # Find all fee distribution blocks
  $ fees-computation-cli find-blocks 1:0x123... --fromBlock 1000000 # Find blocks from block 1000000
  $ fees-computation-cli find-blocks 1:0x123... --toBlock 1001000   # Find blocks up to block 1001000
  $ fees-computation-cli find-blocks 1:0x123... -d                 # Find blocks since last fee receiver transfer
    `
    )
    .action(async (args, options) => {
      const vault = parseArguments(args);
      const client = publicClient[vault.chainId];
      if (!options.toBlock) {
        options.toBlock = (
          await client.getBlock({ blockTag: "latest" })
        ).number.toString();
      }

      const roles = await client.readContract({
        address: vault.address,
        abi: LagoonVaultAbi,
        functionName: "getRolesStorage",
      });

      if (options?.sinceLastTransfer) {
        const { transfers } = await fetchVaultTransfers({
          address: vault.address,
          chainId: vault.chainId,
          toBlock: maxUint256,
          skip: 0,
          first: 1000,
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

      // Fetch fee receiver transfers
      const { transfers } = await fetchVaultTransfers({
        address: vault.address,
        chainId: vault.chainId,
        toBlock: BigInt(options.toBlock),
        skip: 0,
        first: 1000,
      });

      const feeReceiverTransfers = transfers
        .filter(
          (t) =>
            t.from.toLowerCase() === roles.feeReceiver.toLowerCase() &&
            t.blockNumber >= options.fromBlock! &&
            t.blockNumber <= options.toBlock!
        )
        .map((t) => ({
          blockNumber: t.blockNumber,
          timestamp: t.blockTimestamp,
          type: "Fee receiver transfer",
        }))
        .sort((a, b) => a.blockNumber - b.blockNumber);

      let vaultData = (
        await fetchVaultTotalAssetsUpdated({
          address: vault.address,
          chainId: vault.chainId,
          toBlock: BigInt(options.toBlock),
          skip: 0,
          first: 1000,
        })
      ).totalAssetsUpdateds;

      const events = vaultData
        .filter(
          (ev) =>
            ev.blockNumber >= options.fromBlock! &&
            ev.blockNumber <= options.toBlock!
        )
        .map((e) => ({
          blockNumber: e.blockNumber,
          type: "Fee minting",
          timestamp: e.blockTimestamp,
        }));

      // Combine and sort all events chronologically
      const allEvents = [...events, ...feeReceiverTransfers].sort(
        (a, b) => a.blockNumber - b.blockNumber
      );

      console.log(`From ${options.fromBlock}`);
      console.log("\nEvents in chronological order:");
      allEvents.forEach((event) =>
        console.log(
          `${new Date(event.timestamp * 1000).toDateString()} - ${
            event.blockNumber
          } - ${event.type}`
        )
      );
      console.log(`\nTo ${options.toBlock}`);
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
