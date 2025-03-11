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
import { PRECISION_SCALE } from "../constants";

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
  const vaultData = await fetchVault({ ...vault, fromBlock, toBlock });
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
  // if (deals[vault.chainId] && otcDeals[vault.chainId][vault.address])
  if (events.length == 1000)
    throw new Error("you need to handle more than 1000 events");
  let prev = "0";
  for (let i = 0; i < events.length; i++) {
    // if there is a change of block we must find the same balance

    console.log(`NextEvent: ${events[i].__typename}`);
    if (prev !== events[i].blockNumber) {
      console.log(" ");
      console.log("blockNumber", events[i].blockNumber);
    }
    console.log(events[i].__typename);
    if (events[i].__typename === "TotalAssetsUpdated") {
      state.handleTotalAssetsUpdated(events[i] as TotalAssetsUpdated);
    } else if (events[i].__typename === "NewTotalAssetsUpdated") {
      state.handleNewTotalAssetsUpdated();
    } else if (events[i].__typename === "Deposit") {
      state.handleDeposit(events[i] as Deposit);
    } else if (events[i].__typename === "DepositRequest") {
      state.depositRequest(events[i] as DepositRequest);
    } else if (events[i].__typename === "DepositRequestCanceled") {
      state.handleDepositRequestCanceled(events[i] as DepositRequestCanceled);
    } else if (events[i].__typename === "RedeemRequest") {
      state.redeemRequest(events[i] as RedeemRequest);
    } else if (events[i].__typename === "SettleDeposit") {
      state.handleSettleDeposit(events[i] as SettleDeposit);
    } else if (events[i].__typename === "SettleRedeem") {
      state.handleSettleRedeem(events[i] as SettleRedeem);
    } else if (events[i].__typename === "FeeTransfer") {
      state.handleFeeTransfer(events[i] as Transfer);
    } else if (events[i].__typename === "Transfer") {
      state.handleTransfer(events[i] as Transfer);
    } else if (events[i].__typename === "Referral") {
      state.handleReferral(events[i] as ReferralCustom);
    } else if (events[i].__typename === "Deal") {
      state.handleDeal(events[i] as DealEvent);
    } else {
      throw new Error(
        `Unknown events[i] ${events[i].__typename} : ${events[i]}`
      );
    }
    if (events[i + 1] && events[i].blockNumber !== events[i + 1].blockNumber) {
      console.log("we are at the end of a block");
      await state.testSupply(events[i].blockNumber, vault.address);
      prev = events[i].blockNumber;
    }
  }

  const pricePerShare = state.pricePerShare();

  const result = state.getState();
  const decimals = readable ? vaultData.decimals : 0;
  return {
    chainId: vault.chainId,
    address: vault.address,
    pricePerShare: Number(pricePerShare) / 10 ** decimals,
    data: Object.fromEntries(
      Object.entries(result).map(([address, values]) => [
        address,
        {
          balance: Number(formatUnits(values.balance, decimals + 18)),
          fees: Number(formatUnits(values.fees, decimals + 18)),
          cashback: Number(formatUnits(values.cashback, decimals + 18)),
        },
      ])
    ),
  };
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
