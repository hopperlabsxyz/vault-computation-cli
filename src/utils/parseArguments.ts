import { type Vault } from "../types/Vault";
import { isAddress } from "viem";

export const parseArguments = (args: string[]): Vault[] => {
  const vaults = [];

  for (let arg of args) {
    let vaultData = arg.split(":");

    if (vaultData.length !== 2) {
      throw new Error(`Invalid vault input (<ChainId:VaultAddress>) : ${arg}`);
    }

    if (
      !isAddress(vaultData[1], {
        strict: false,
      })
    ) {
      throw new Error(`Invalid vault address input (${vaultData[1]}) : ${arg}`);
    }

    vaults.push({
      chainId: Number(vaultData[0]),
      address: vaultData[1],
    });
  }

  return vaults;
};
