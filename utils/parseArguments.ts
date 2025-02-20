import {Vault} from "../types/Vault";
import {CHAIN_IDS} from "../constants";
import {isAddress} from "viem";

export const parseArguments = (args: string[]): Vault[] => {
    const vaults = [];

    for (let arg of args) {
        let vaultData = arg.split(":");

        if (vaultData.length !== 2) {
            throw new Error(`Invalid vault input (<ChainId:VaultAddress>) : ${arg}`)
        }

        if (!CHAIN_IDS.includes(vaultData[0])) {
            throw new Error(`Invalid / Unsupported ChainId input (${vaultData[0]}) : ${arg}`)
        }

        if (!isAddress(vaultData[1], {
            strict: false
        })) {
            throw new Error(`Invalid vault address input (${vaultData[1]}) : ${arg}`)
        }

        vaults.push({
            chainId: Number(vaultData[0]),
            address: vaultData[1]
        })
    }

    return vaults;
}