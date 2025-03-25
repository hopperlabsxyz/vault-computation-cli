import { get } from "env-var";
import { type CHAIN_IDS } from "lib/publicClient";

export const SUBGRAPHS: Record<CHAIN_IDS, string | undefined> = {
  1: get("MAINNET_SUBGRAPH_URL").required().asString(),
  8453: get("BASE_SUBGRAPH_URL").asString(),
  42161: get("ARBITRUM_SUBGRAPH_URL").asString(),
  43114: get("AVALANCHE_SUBGRAPH_URL").asString(),
};

export const RPC_URLS: Record<CHAIN_IDS, string | undefined> = {
  1: get("MAINNET_RPC_URL").required().asString(),
  8453: get("BASE_RPC_URL").asString(),
  42161: get("ARBITRUM_RPC_URL").asString(),
  43114: get("AVALANCHE_RPC_URL").asString(),
};
