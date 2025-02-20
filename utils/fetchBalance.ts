import {VAULT_ABI} from "../VaultABI";
import {publicClient} from "../lib/publicClient";
import {Address} from "viem";

export const fetchBalance = async ({vaultAddress, chainId,  userAddress, blockNumber}: {
    vaultAddress: Address,
    chainId: number,
    userAddress: Address,
    blockNumber: BigInt
}) => {
    const client = publicClient[chainId];

    if (!client) {
        throw new Error(`Missing client for chaindId : ${chainId}`)
    }

    const data = await client.readContract({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: 'balanceOf',
        args: [userAddress],
        blockNumber,
    })

    return data
}