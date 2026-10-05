import { parseVaultArgument } from "parsing/parseVault";
import type { Command } from "@commander-js/extra-typings";
import { lagoonQuery } from "lib/computationApi";
import type { Vault } from "types/Vault";

type UserItem = {
  address: string;
  vaultPositions: {
    vault: { address: string };
    state: { claimableDeposit: { assets: string } | null };
  }[];
};

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
      "Finds all controllers that have a claimable deposit request (settled but not yet claimed). Use this command to get the args for claimSharesOnBehalf().\n"
    )
    .addHelpText(
      "after",
      `
Examples:
  $ fees-computation-cli find-claimable-controllers 1:0x123...
    `
    )
    .action(async (vault: Vault) => {
      const claimable: string[] = [];
      const PAGE = 1000;
      for (let skip = 0; ; skip += PAGE) {
        const data = await lagoonQuery<{ users: { items: UserItem[] } }>(
          `{ users(where:{ chainId_eq:${vault.chainId}, vault_in:["${vault.address}"] }, first:${PAGE}, skip:${skip}){
            items{ address vaultPositions{ vault{ address } state{ claimableDeposit{ assets } } } } } }`
        );
        const items = data.users.items;
        for (const u of items) {
          const pos = u.vaultPositions.find(
            (p) => p.vault.address.toLowerCase() === vault.address.toLowerCase()
          );
          if (pos?.state.claimableDeposit && BigInt(pos.state.claimableDeposit.assets) > 0n)
            claimable.push(u.address);
        }
        if (items.length < PAGE) break;
      }

      console.log("[" + claimable.map((c) => `"${c}"`).join(", ") + "]");
    });
}
