import request, { gql } from "graphql-request";

const LAGOON_API = "https://api.lagoon.finance/query";

export type Airdrop = {
  name: string;
  ppsIncrease: number;
  distributionTimestamp: number;
};

type AirdropResponse = {
  vaultByAddress: {
    airdrops: {
      name: string;
      ppsIncrease: number;
      distributionTimestamp: string;
    }[];
  };
};

const query = gql`
  query GetAirdrops($chainId: Int!, $address: Address!) {
    vaultByAddress(chainId: $chainId, address: $address) {
      airdrops {
        name
        ppsIncrease
        distributionTimestamp
      }
    }
  }
`;

export async function fetchAirdrops(
  chainId: number,
  address: string
): Promise<Airdrop[]> {
  const data = await request<AirdropResponse>(LAGOON_API, query, {
    chainId,
    address,
  }, { "apollo-require-preflight": "true" });

  return data.vaultByAddress.airdrops.map((a) => ({
    name: a.name,
    ppsIncrease: a.ppsIncrease,
    distributionTimestamp: Number(a.distributionTimestamp),
  }));
}
