import { LagoonVaultAbi } from "abis/VaultABI";
import { publicClient } from "../lib/publicClient";
import { erc20Abi, type Address } from "viem";
import type { VaultEventsQuery } from "gql/graphql";
import { fetchVaultEvents } from "utils/fetchVaultEvents";

export interface FetchVaultReturn {
  fees: {
    managementRate: number;
    performanceRate: number;
  };
  decimals: number;
  feesReceiver: Address;
  silo: Address;
  events: VaultEventsQuery;
  asset: {
    address: Address;
    decimals: number;
  };
}

export async function fetchVault({
  chainId,
  address,
  toBlock,
}: {
  chainId: number;
  address: Address;
  toBlock: number;
}): Promise<FetchVaultReturn> {
  const client = publicClient[chainId];

  if (!client) {
    throw new Error(`Missing client for chaindId : ${chainId}`);
  }

  const [fees, decimals, roles, silo, events, asset] = await Promise.all([
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
    fetchVaultEvents({
      chainId,
      vaultAddress: address,
      toBlock: BigInt(toBlock),
      first: 1000,
      skip: 0,
    }),
    client.readContract({
      address,
      abi: LagoonVaultAbi,
      functionName: "asset",
    }),
  ]);

  const assetDecimals = await client.readContract({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
  });

  return {
    fees,
    decimals,
    feesReceiver: roles.feeReceiver,
    silo,
    events,
    asset: {
      address: asset,
      decimals: assetDecimals,
    },
  };
}
