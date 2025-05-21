import { LagoonVaultAbi } from "abis/VaultABI";
import { publicClient } from "../lib/publicClient";
import { erc20Abi, type Address } from "viem";
import type { VaultEventsQuery } from "gql/graphql";
import { fetchVaultEvents } from "utils/fetchVaultEvents";

const siloStorageSlot =
  "0x5c74d456014b1c0eb4368d944667a568313858a3029a650ff0cb7b56f8b57a08" as `0x${string}`;

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
    await client.getStorageAt({
      address: address,
      slot: siloStorageSlot,
    }),
    fetchVaultEvents({
      chainId,
      vaultAddress: address,
      toBlock: BigInt(toBlock),
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
