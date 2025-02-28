import {createPublicClient, fallback, http} from 'viem'
import {mainnet} from 'viem/chains'
import {config} from 'dotenv';

config()

export const publicClient = {
    [mainnet.id]: createPublicClient({
        chain: mainnet,
        transport: fallback([
            http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
        ]),
    })
}