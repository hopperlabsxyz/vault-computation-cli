import { type Vault } from "../types/Vault";
import { isAddress } from "viem";

export const parseVaultArgument = (arg: string): Vault => {
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

  return {
    chainId: Number(vaultData[0]),
    address: vaultData[1],
  };
};
