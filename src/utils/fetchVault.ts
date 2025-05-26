import { LagoonVaultAbi } from "abis/VaultABI";
import { publicClient } from "../lib/publicClient";
import { erc20Abi, type Address } from "viem";
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
  asset: {
    address: Address;
    decimals: number;
  };
  cooldown: number;
  rates: {
    rates: Rates;
    oldRates: Rates;
  };
  totalSupply: bigint
  totalAssets: bigint
}

// @dev: fetch onchain data for a vault at a certain block number
// We can easily fetch vault state for a given event thanks to this function
export async function fetchVault({
  chainId,
  address,
  block
}: {
  chainId: number;
  address: Address;
  block: bigint;
}): Promise<FetchVaultReturn> {
  const client = publicClient[chainId];

  if (!client) {
    throw new Error(`Missing client for chaindId : ${chainId}`);
  }

  const [fees, decimals, roles, silo, asset, cooldown, feeRates, totalSupply, totalAssets] =
    await Promise.all([
      client.readContract({
        address,
        abi: LagoonVaultAbi,
        functionName: "feeRates",
        blockNumber: block
      }),
      client.readContract({
        address,
        abi: LagoonVaultAbi,
        functionName: "decimals",
        blockNumber: block
      }),
      client.readContract({
        address,
        abi: LagoonVaultAbi,
        functionName: "getRolesStorage",
        blockNumber: block,
      }),
      client.getStorageAt({
        address: address,
        slot: siloStorageSlot,
        blockNumber: block
      }) as Promise<Address>,
      client.readContract({
        address,
        abi: LagoonVaultAbi,
        functionName: "asset",
        blockNumber: block
      }),
      fetchFeeCooldown({
        client,
        blockNumber: block,
        vaultAddress: address,
      }),
      fetchFeeRates({
        client,
        blockNumber: block,
        vaultAddress: address,
      }),
      client.readContract({
        address,
        abi: LagoonVaultAbi,
        functionName: "totalSupply",
        blockNumber: block
      }),
      client.readContract({
        address,
        abi: LagoonVaultAbi,
        functionName: "totalAssets",
        blockNumber: block
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
    asset: {
      address: asset,
      decimals: assetDecimals,
    },
    rates: feeRates,
    cooldown: Number(cooldown),
    totalSupply,
    totalAssets
  };
}
