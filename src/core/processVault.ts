import { fetchVault } from "utils/fetchVault";
import { formatUnits } from "viem";
import { State } from "./state";
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
}: ProcessVaultParams): Promise<ProcessVaultReturn> {
  console.log(`Loading vault ${vault.address} on chain ${vault.chainId}`);

  const vaultData = await fetchVault({ ...vault, toBlock });
  sanityChecks({ events: vaultData.events, fromBlock, toBlock });

  let events = preprocessEvents({
    events: vaultData.events,
    addresses: {
      feeReceiver: vaultData.feesReceiver,
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
  });
  if (events.length == 1000)
    throw new Error("you need to handle more than 1000 events");
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
  console.log(state.accumulatedFees);
  return {
    chainId: vault.chainId,
    address: vault.address,
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

10352450794100633568434n;
9774130392289756446194n;
