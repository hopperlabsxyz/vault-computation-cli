import { RPC_URLS } from "environnement";
import { createPublicClient, fallback, http, type PublicClient } from "viem";
import { mainnet } from "viem/chains";

export const publicClient: Record<number, PublicClient> = {
  [mainnet.id]: createPublicClient({
    chain: mainnet,
    transport: fallback([http(RPC_URLS[mainnet.id])]),
  }),
};

export type CHAIN_IDS = keyof typeof publicClient;
