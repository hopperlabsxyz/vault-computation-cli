import { type Vault } from "../types/Vault";

function isAddress(value: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(value);
}

export const parseVaultArgument = (arg: string): Vault => {
  let vaultData = arg.split(":");

  if (vaultData.length !== 2) {
    throw new Error(`Invalid vault input (<ChainId:VaultAddress>) : ${arg}`);
  }

  if (!isAddress(vaultData[1])) {
    throw new Error(`Invalid vault address input (${vaultData[1]}) : ${arg}`);
  }

  return {
    chainId: Number(vaultData[0]),
    address: vaultData[1],
  };
};
