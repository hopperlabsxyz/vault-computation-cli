import { fetchVault } from "utils/fetchVault";
import { zeroAddress, type Address } from "viem";
import type { Vault } from "types/Vault";
import { preprocessEvents } from "./preprocess";
import type {
  Deposit,
  DepositRequest,
  DepositRequestCanceled,
  RedeemRequest,
  Referral,
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
  otcDeals,
  toBlock,
  fromBlock,
}: {
  vault: Vault;
  readable: boolean;
  otcDeals: any;
  fromBlock: number;
  toBlock: number;
}): Promise<ProcessVaultReturn> {
  console.log(`Loading vault ${vault.address} on chain ${vault.chainId}`);
  const vaultData = await fetchVault({ ...vault, fromBlock, toBlock });
  const ignoredAddresses = [vault.address, vaultData.silo, zeroAddress];

  sanityChecks({ events: vaultData.events, fromBlock, toBlock });

  let events = preprocessEvents({
    events: vaultData.events,
    feeReceiver: vaultData.feesReceiver,
    ignoredAddresses,
  });
  const state = new State({
    feeReceiver: vaultData.feesReceiver,
    decimals: BigInt(vaultData.decimals),
  });
  if (events.length == 1000)
    throw new Error("you need to handle more than 1000 events");

  for (const event of events) {
    switch (event.__typename) {
      case "TotalAssetsUpdated":
        state.handleTotalAssetsUpdated(event as TotalAssetsUpdated);
        break;
      case "NewTotalAssetsUpdated":
        state.handleNewTotalAssetsUpdated();
        break;
      case "Deposit":
        state.handleDeposit(event as Deposit);
        break;
      case "DepositRequest":
        state.depositRequest(event as DepositRequest);
        break;
      case "DepositRequestCanceled":
        state.handleDepositRequestCanceled(event as DepositRequestCanceled);
        break;
      case "RedeemRequest":
        state.redeemRequest(event as RedeemRequest);
        break;
      case "SettleDeposit":
        state.handleSettleDeposit(event as SettleDeposit);
        break;
      case "SettleRedeem":
        state.handleSettleRedeem(event as SettleRedeem);
        break;
      case "FeeTransfer":
        state.handleFeeTransfer(event as Transfer);
        break;
      case "Transfer":
        state.handleTransfer(event as Transfer);
        break;
      case "Referral":
        state.handleReferral(event as Referral);
        break;
      default:
        throw new Error(`Unknown event ${event.__typename} : ${event}`);
    }
  }

  const pricePerShare = state.pricePerShare();

  // if (otcDeals[vault.chainId] && otcDeals[vault.chainId][vault.address]) {
  //   for (const [address, deal] of Object.entries(
  //     otcDeals[vault.chainId][vault.address]
  //   )) {
  //     let cashbackRate = BigInt(vaultData.fees.performanceRate) - (deal as any); // TODO: fix
  //     sharesHolding[address as Address].cashback =
  //       (sharesHolding[address as Address].fees * cashbackRate) /
  //       BigInt(vaultData.fees.performanceRate);
  //   }
  // }
  const result = state.getResult();
  const decimals = readable ? vaultData.decimals : 0;
  return {
    chainId: vault.chainId,
    address: vault.address,
    pricePerShare: Number(pricePerShare) / 10 ** decimals,
    data: Object.fromEntries(
      Object.entries(result).map(([address, values]) => [
        address,
        {
          balance: Number(values.balance) / 10 ** decimals,
          fees: Number(values.fees) / 10 ** decimals,
          cashback: Number(values.cashback) / 10 ** decimals,
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
