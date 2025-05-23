import { LagoonVaultAbi } from "abis/VaultABI";
import { publicClient } from "../lib/publicClient";
import { erc20Abi, type Address } from "viem";
import type { VaultEventsQuery } from "gql/graphql";
import { fetchVaultEvents } from "utils/fetchVaultEvents";
import { fetchFeeCooldown } from "./fetchFeeCooldown";
import { fetchFeeRates } from "./fetchFeeRates";
import type { Rates } from "core/types";

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
  cooldown: number;
  rates: {
    rates: Rates;
    oldRates: Rates;
  };
}

export async function fetchVault({
  chainId,
  address,
  toBlock,
  fromBlock,
}: {
  chainId: number;
  address: Address;
  toBlock: number;
  fromBlock: number;
}): Promise<FetchVaultReturn> {
  const client = publicClient[chainId];

  if (!client) {
    throw new Error(`Missing client for chaindId : ${chainId}`);
  }

  const [fees, decimals, roles, silo, events, asset, cooldown, feeRates] =
    await Promise.all([
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
        blockNumber: BigInt(fromBlock),
      }),
      client.getStorageAt({
        address: address,
        slot: siloStorageSlot,
      }) as Promise<Address>,
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
      fetchFeeCooldown({
        client,
        blockNumber: BigInt(fromBlock),
        vaultAddress: address,
      }),
      fetchFeeRates({
        client,
        blockNumber: BigInt(fromBlock),
        vaultAddress: address,
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
    silo: ("0x" + BigInt(silo).toString(16)) as Address,
    events,
    asset: {
      address: asset,
      decimals: assetDecimals,
    },
    rates: feeRates,
    cooldown: Number(cooldown),
  };
}
