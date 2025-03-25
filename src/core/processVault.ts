import { fetchVault } from "utils/fetchVault";
import { formatUnits, type Address } from "viem";
import type { ReferralCustom, Vault } from "types/Vault";
import { preprocessEvents, type DealEvent } from "./preProcess";
import type {
  Deposit,
  DepositRequest,
  DepositRequestCanceled,
  RedeemRequest,
  SettleDeposit,
  SettleRedeem,
  TotalAssetsUpdated,
  Transfer,
} from "gql/graphql";
import { State } from "./state";
import { sanityChecks } from "./sanityChecks";

export async function processVault({
  vault,
  readable,
  deals,
  toBlock,
  fromBlock,
  feeRewardRate,
  feeRebateRate,
}: {
  vault: Vault;
  readable: boolean;
  deals: Record<Address, number>;
  fromBlock: number;
  toBlock: number;
  feeRebateRate: number;
  feeRewardRate: number;
}): Promise<ProcessVaultReturn> {
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
    processEvent({
      state,
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
  };
}

export function processEvent({
  state,
  event,
  fromBlock,
}: {
  state: State;
  event: { __typename: string; blockNumber: bigint };
  fromBlock: number;
}) {
  if (event.__typename === "TotalAssetsUpdated") {
    state.handleTotalAssetsUpdated(event as TotalAssetsUpdated);
  } else if (event.__typename === "NewTotalAssetsUpdated") {
    state.handleNewTotalAssetsUpdated();
  } else if (event.__typename === "Deposit") {
    state.handleDeposit(event as Deposit);
  } else if (event.__typename === "DepositRequest") {
    state.depositRequest(event as DepositRequest);
  } else if (event.__typename === "DepositRequestCanceled") {
    state.handleDepositRequestCanceled(event as DepositRequestCanceled);
  } else if (event.__typename === "RedeemRequest") {
    state.redeemRequest(event as RedeemRequest);
  } else if (event.__typename === "SettleDeposit") {
    state.handleSettleDeposit(event as SettleDeposit);
  } else if (event.__typename === "SettleRedeem") {
    state.handleSettleRedeem(event as SettleRedeem);
  } else if (event.__typename === "FeeTransfer") {
    state.handleFeeTransfer(
      event as Transfer,
      BigInt(fromBlock) <= event.blockNumber
    );
  } else if (event.__typename === "Transfer") {
    state.handleTransfer(event as Transfer);
  } else if (event.__typename === "Referral") {
    state.handleReferral(event as ReferralCustom);
  } else if (event.__typename === "Deal") {
    state.handleDeal(event as any as DealEvent); // TODO: fix any
  } else {
    throw new Error(`Unknown event ${event.__typename} : ${event}`);
  }
}

export interface ProcessVaultReturn {
  chainId: number;
  address: Address;
  pricePerShare: number;
  data: Record<
    Address,
    {
      balance: number;
      fees: number;
      cashback: number;
    }
  >;
}
