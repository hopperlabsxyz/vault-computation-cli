import { get } from "env-var";
import { type CHAIN_IDS } from "lib/publicClient";
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  linea,
  mainnet,
  mantle,
  optimism,
  polygon,
  berachain,
  sonic,
  tac,
  unichain,
  worldchain,
  katana
} from "viem/chains";

export const SUBGRAPHS: Record<CHAIN_IDS, string | undefined> = {
  [mainnet.id]: get("MAINNET_SUBGRAPH_URL").required().asString(),
  [base.id]: get("BASE_SUBGRAPH_URL").asString(),
  [arbitrum.id]: get("ARBITRUM_SUBGRAPH_URL").asString(),
  [avalanche.id]: get("AVALANCHE_SUBGRAPH_URL").asString(),
  [linea.id]: get("LINEA_SUBGRAPH_URL").asString(),
  [bsc.id]: get("BSC_SUBGRAPH_URL").asString(),
  [mantle.id]: get("MANTLE_SUBGRAPH_URL").asString(),
  [optimism.id]: get("OPTIMISM_SUBGRAPH_URL").asString(),
  [polygon.id]: get("POLYGON_SUBGRAPH_URL").asString(),
  [berachain.id]: get("BERACHAIN_SUBGRAPH_URL").asString(),
  [sonic.id]: get("SONIC_SUBGRAPH_URL").asString(),
  [tac.id]: get("TAC_SUBGRAPH_URL").asString(),
  [unichain.id]: get("UNICHAIN_SUBGRAPH_URL").asString(),
  [worldchain.id]: get("WORLDCHAIN_SUBGRAPH_URL").asString(),
  [999]: get("HYPEREVM_SUBGRAPH_URL").asString(),
  [katana.id]: get("KATANA_SUBGRAPH_URL").asString(),
  [143]: get("MONAD_SUBGRAPH_URL").asString(),
};

export const RPC_URLS: Record<CHAIN_IDS, string | undefined> = {
  [mainnet.id]: get("MAINNET_RPC_URL").required().asString(),
  [base.id]: get("BASE_RPC_URL").asString(),
  [arbitrum.id]: get("ARBITRUM_RPC_URL").asString(),
  [avalanche.id]: get("AVALANCHE_RPC_URL").asString(),
  [linea.id]: get("LINEA_RPC_URL").asString(),
  [bsc.id]: get("BSC_RPC_URL").asString(),
  [mantle.id]: get("MANTLE_RPC_URL").asString(),
  [optimism.id]: get("OPTIMISM_RPC_URL").asString(),
  [polygon.id]: get("POLYGON_RPC_URL").asString(),
  [berachain.id]: get("BERACHAIN_RPC_URL").asString(),
  [sonic.id]: get("SONIC_RPC_URL").asString(),
  [tac.id]: get("TAC_RPC_URL").asString(),
  [unichain.id]: get("UNICHAIN_RPC_URL").asString(),
  [worldchain.id]: get("WORLDCHAIN_RPC_URL").asString(),
  [999]: get("HYPEREVM_RPC_URL").asString(),
  [katana.id]: get("KATANA_RPC_URL").asString(),
  [143]: get("MONAD_RPC_URL").asString(),
};
