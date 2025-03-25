import { RPC_URLS } from "environnement";
import { createPublicClient, fallback, http, type PublicClient } from "viem";
import { mainnet, base, arbitrum, avalanche } from "viem/chains";

export const publicClient: Record<number, PublicClient> = {
  [mainnet.id]: createPublicClient({
    chain: mainnet,
    transport: fallback([http(RPC_URLS[mainnet.id])]),
    batch: {
      multicall: true,
    },
  }) as unknown as PublicClient,
  [base.id]: createPublicClient({
    chain: base,
    transport: fallback([http(RPC_URLS[base.id])]),
    batch: {
      multicall: true,
    },
  }) as unknown as PublicClient,
  [arbitrum.id]: createPublicClient({
    chain: arbitrum,
    transport: fallback([http(RPC_URLS[arbitrum.id])]),
    batch: {
      multicall: true,
    },
  }) as unknown as PublicClient,
  [avalanche.id]: createPublicClient({
    chain: avalanche,
    transport: fallback([http(RPC_URLS[avalanche.id])]),
    batch: {
      multicall: true,
    },
  }) as unknown as PublicClient,
};

export type CHAIN_IDS = keyof typeof publicClient;
