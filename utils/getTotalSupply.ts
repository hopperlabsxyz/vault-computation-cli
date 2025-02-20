import {publicClient} from "../lib/publicClient";
import {VAULT_ABI} from "../VaultABI";

export const getTotalSupply = async (chainId, address, blockNumber) => {
    const client = publicClient[chainId];

    if (!client) {
        throw new Error(`Missing client for chaindId : ${chainId}`)
    }

    return await client.readContract({
        address,
        blockNumber,
        abi: VAULT_ABI,
        functionName: 'totalSupply',
    })
}