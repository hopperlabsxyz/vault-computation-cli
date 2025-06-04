import { fetchVault } from "utils/fetchVault";
import { formatUnits } from "viem";
import { Vault } from "./vault";
import { sanityChecks } from "./sanityChecks";
import type { ProcessVaultParams, ProcessVaultReturn } from "./types";
import { preprocessEvents } from "./preprocess";

export async function processVault({
  vault,
  readable,
  deals,
  toBlock,
  fromBlock,
  feeRewardRate,
  feeRebateRate,
  points,
}: ProcessVaultParams): Promise<ProcessVaultReturn> {
  console.log(`Loading vault ${vault.address} on chain ${vault.chainId}`);

  const vaultData = await fetchVault({ ...vault, toBlock, fromBlock });
  sanityChecks({ events: vaultData.events, fromBlock, toBlock });

  let events = preprocessEvents({
    events: vaultData.events,
    addresses: {
      silo: vaultData.silo,
      vault: vault.address,
    },
    referral: {
      feeRewardRate,
      feeRebateRate,
    },
    points,
    deals,
  });

  const vaultState = new Vault({
    feeReceiver: vaultData.feesReceiver,
    decimals: BigInt(vaultData.decimals),
    rates: vaultData.rates.rates,
    cooldown: vaultData.cooldown,
  });
  for (let i = 0; i < events.length; i++) {
    vaultState.processEvent({
      event: events[i] as { __typename: string; blockNumber: bigint },
      fromBlock,
    });
  }

  // now we can compute the rebate users can get
  vaultState.rebate();

  const result = vaultState.getAccountsDeepCopy();
  const sharesDecimals = readable ? vaultData.decimals : 0;
  const assetDecimals = readable ? vaultData.asset.decimals : 0;

  return {
    chainId: vault.chainId,
    address: vault.address,
    decimals: Number(vaultState.decimals),
    pointNames: vaultState.pointNames(),
    pricePerShare: Number(
      formatUnits(vaultState.pricePerShare(), assetDecimals)
    ),
    periodFees: vaultState.periodFees,
    data: Object.fromEntries(
      Object.entries(result).map(([address, values]) => [
        address,
        {
          balance: Number(formatUnits(values.balance, sharesDecimals)),
          fees: Number(formatUnits(values.fees, sharesDecimals)),
          cashback: Number(formatUnits(values.cashback, sharesDecimals)),
          points: values.points,
        },
      ])
    ),
  };
}
