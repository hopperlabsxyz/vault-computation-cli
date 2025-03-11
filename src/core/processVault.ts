import { fetchVault } from "utils/fetchVault";
import { formatUnits, zeroAddress, type Address } from "viem";
import type { ReferralCustom, Vault } from "types/Vault";
import { preprocessEvents, type DealEvent } from "./preprocess";
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
  feeBonus,
  feeRebate,
}: {
  vault: Vault;
  readable: boolean;
  deals: Record<Address, number>;
  fromBlock: number;
  toBlock: number;
  feeRebate: number;
  feeBonus: number;
}): Promise<ProcessVaultReturn> {
  console.log(`Loading vault ${vault.address} on chain ${vault.chainId}`);
  const vaultData = await fetchVault({ ...vault, toBlock });
  const ignoredAddresses = [vault.address, vaultData.silo, zeroAddress];

  sanityChecks({ events: vaultData.events, fromBlock, toBlock });

  let events = preprocessEvents({
    events: vaultData.events,
    feeReceiver: vaultData.feesReceiver,
    ignoredAddresses,
    referral: {
      feeBonus,
      feeRebate,
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
    eventBranching({
      state,
      event: events[i] as { __typename: string; blockNumber: bigint },
      fromBlock,
    });
  }

  // console.log(state.referrals);
  // now we can compute the rebate users can get
  state.rebate();

  const result = state.getState();
  const decimals = readable ? vaultData.decimals : 0;
  // console.log(
  //   formatUnits(state.accumulatedFeesSinceFromBlock(), 18 + decimals)
  // );
  return {
    chainId: vault.chainId,
    address: vault.address,
    pricePerShare: Number(state.pricePerShare()) / 10 ** decimals,
    data: Object.fromEntries(
      Object.entries(result).map(([address, values]) => [
        address,
        {
          balance: Number(formatUnits(values.balance, decimals)),
          fees: Number(formatUnits(values.fees, decimals)),
          cashback: Number(formatUnits(values.cashback, decimals)),
        },
      ])
    ),
  };
}

function eventBranching({
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
