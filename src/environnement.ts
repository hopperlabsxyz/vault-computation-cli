import { get } from "env-var";
import { type CHAIN_IDS } from "lib/publicClient";

export const SUBGRAPHS: Record<CHAIN_IDS, string> = {
  1: get("MAINNET_SUBGRAPH_URL").required().asString(),
};

export const RPC_URLS = {
  1: get("MAINNET_RPC_URL").required().asString(),
};
