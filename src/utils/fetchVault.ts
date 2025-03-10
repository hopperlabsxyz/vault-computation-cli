import { LagoonVaultAbi } from "abis/VaultABI";
import { publicClient } from "../lib/publicClient";
import { type Address } from "viem";
import type { VaultEventsQuery } from "gql/graphql";
import { fetchVaultEvents } from "events-fetching";

interface FetchVaultReturn {
  fees: {
    managementRate: number;
    performanceRate: number;
  };
  decimals: number;
  feesReceiver: Address;
  silo: Address;
  events: VaultEventsQuery;
}

export async function fetchVault({
  chainId,
  address,
}: {
  chainId: number;
  address: Address;
}): Promise<FetchVaultReturn> {
  const client = publicClient[chainId];

  if (!client) {
    throw new Error(`Missing client for chaindId : ${chainId}`);
  }

  const [fees, decimals, roles, silo, events] = await Promise.all([
    client.readContract({
      address,
      abi: LagoonVaultAbi,
      functionName: "feeRates",
    }),
    client.readContract({
      address,
      abi: LagoonVaultAbi,
      functionName: "decimals",
    }),
    client.readContract({
      address,
      abi: LagoonVaultAbi,
      functionName: "getRolesStorage",
    }),
    client.readContract({
      address,
      abi: LagoonVaultAbi,
      functionName: "pendingSilo",
    }),
    fetchVaultEvents(chainId, address),
  ]);

  return {
    fees,
    decimals,
    feesReceiver: roles.feeReceiver,
    silo,
    events,
  };
}
