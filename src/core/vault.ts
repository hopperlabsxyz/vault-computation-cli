import type { Address } from "viem";
import { Vault } from "@hopperlabsxyz/internal-computation";
import { fetchVault } from "utils/fetchVault";
import { fetchVaultStateUpdateds } from "utils/fetchVaultStateUpdateds";

export async function generateVault({
  vault,
}: {
  vault: { address: Address; chainId: number };
}): Promise<Vault> {
  const stateUpdateds = await fetchVaultStateUpdateds({
    chainId: vault.chainId,
    vaultAddress: vault.address,
  });
  if (!stateUpdateds || stateUpdateds.stateUpdateds.length == 0)
    throw new Error(`Vault ${vault.address} doesn't exist`);
  const vaultData = await fetchVault({
    ...vault,
    block: BigInt(stateUpdateds.stateUpdateds[0].blockNumber),
  });

  return new Vault({
    feeReceiver: vaultData.feesReceiver,
    decimals: vaultData.decimals,
    asset: vaultData.asset,
    rates: vaultData.rates.rates,
    cooldown: vaultData.cooldown,
    silo: vaultData.silo,
    address: vault.address,
  });
}
