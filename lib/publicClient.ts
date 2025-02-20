import {createPublicClient, fallback, http} from 'viem'
import {mainnet} from 'viem/chains'

export const publicClient = {
    [mainnet.id]: createPublicClient({
        chain: mainnet,
        transport: fallback([
            http("https://rpc.ankr.com/eth"),
            http("https://eth.drpc.org"),
            http("https://rpc.mevblocker.io"),
            http("https://eth.llamarpc.com"),
        ]),
    })
}