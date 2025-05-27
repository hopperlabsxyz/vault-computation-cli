import { fetchVault } from "utils/fetchVault";
import { formatUnits } from "viem";
import { State } from "./state";
import { sanityChecks } from "./sanityChecks";
import type { ProcessVaultParams, ProcessVaultReturn } from "./types";
import { preprocessEvents } from "./preprocess";
import { fetchFeeRates } from "utils/fetchFeeRates";
import { fetchVaultEvents } from "utils/fetchVaultEvents";

export async function processVault({
  vault,
  readable,
  deals,
  toBlock,
  fromBlock,
  feeRewardRate,
  feeRebateRate,
}: ProcessVaultParams): Promise<ProcessVaultReturn> {
  console.log(`Loading vault ${vault.address} on chain ${vault.chainId}`);

  const vaultData = await fetchVault({ ...vault, block: BigInt(toBlock) });

  const vaultEvents = await fetchVaultEvents({ chainId: vault.chainId, vaultAddress: vault.address, toBlock: BigInt(toBlock) })

  sanityChecks({ events: vaultEvents, fromBlock, toBlock });

  let events = await preprocessEvents({
    chainId: vault.chainId,
    events: vaultEvents,
    addresses: {
      silo: vaultData.silo,
      vault: vault.address,
    },
    referral: {
      feeRewardRate,
      feeRebateRate,
    },
    deals: deals,
  });
  const state = new State({
    feeReceiver: vaultData.feesReceiver,
    decimals: BigInt(vaultData.decimals),
    asset: vaultData.asset,
    rates: vaultData.rates.rates,
    cooldown: vaultData.cooldown,
  });
  for (let i = 0; i < events.length; i++) {
    state.processEvent({
      event: events[i] as { __typename: string; blockNumber: bigint },
      fromBlock,
    });
  }

  // now we can compute the rebate users can get
  state.rebate();

  const result = state.getAccountsDeepCopy();
  const sharesDecimals = readable ? vaultData.decimals : 0;
  const assetDecimals = readable ? vaultData.asset.decimals : 0;

  return {
    chainId: vault.chainId,
    address: vault.address,
    decimals: Number(state.decimals),
    pricePerShare: Number(formatUnits(state.pricePerShare(), assetDecimals)),
    data: Object.fromEntries(
      Object.entries(result).map(([address, values]) => [
        address,
        {
          balance: Number(formatUnits(values.balance, sharesDecimals)),
          fees: Number(formatUnits(values.fees, sharesDecimals)),
          cashback: Number(formatUnits(values.cashback, sharesDecimals)),
        },
      ])
    ),
    periodFees: state.periodFees,
  };
}
