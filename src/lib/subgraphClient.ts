import { createSubgraphClient, type SubgraphClient } from "@lagoon-protocol/internal-subgraph";
import { SUBGRAPHS } from "environnement";

let cachedClient: SubgraphClient | null = null;

export function getSubgraphClient(): SubgraphClient {
  if (!cachedClient) {
    cachedClient = createSubgraphClient({ urls: SUBGRAPHS });
  }
  return cachedClient;
}

export function getSubgraphClientForChain(chainId: number): SubgraphClient {
  const url = SUBGRAPHS[chainId];
  if (!url) {
    throw new Error(
      `No subgraph URL configured for chainId ${chainId}. Check your .env file.`
    );
  }
  return getSubgraphClient();
}
