import { formatUnits, maxUint256 } from "viem";
import type { ProcessVaultParams, ProcessVaultReturn } from "./types";
import { preprocessEvents } from "./preprocessEvents";
import { generateVault } from "./vault";
import { checkStrictBlockNumberMatching } from "./strictBlockNumberMatching";
import { fetchAllVaultEvents } from "@lagoon-protocol/internal-subgraph";
import { getSubgraphClientForChain } from "lib/subgraphClient";

export async function processEvents({
  vault,
  readable,
  rebateDeals,
  offChainReferrals,
  toBlock,
  fromBlock,
  defaultReferralRateBps,
  defaultRebateRateBps,
  points,
  strictBlockNumberMatching = true,
}: ProcessVaultParams): Promise<ProcessVaultReturn> {
  console.log(`Loading vault ${vault.address} on chain ${vault.chainId}`);

  const client = getSubgraphClientForChain(vault.chainId);
  const vaultEvents = await fetchAllVaultEvents({
    client,
    chainId: vault.chainId,
    vaultAddress: vault.address,
    toBlock: toBlock ? toBlock.toString() : undefined,
  });

  if (strictBlockNumberMatching) {
    checkStrictBlockNumberMatching({
      events: vaultEvents,
      fromBlock: fromBlock || 0n,
      toBlock: toBlock || BigInt(maxUint256),
    });
  }

  const vaultState = await generateVault({ vault });

  const events = preprocessEvents({
    events: vaultEvents,
    addresses: {
      silo: vaultState.silo,
      vault: vault.address,
    },
    defaultReferralRateBps,
    defaultRebateRateBps,
    points,
    rebateDeals,
    offChainReferrals,
  });

  await vaultState.processEvents({
    events,
    distributeFeesFromBlock: fromBlock || 0n,
  });

  vaultState.distributeRebatesAndRewards();

  const accounts = vaultState.getAccounts();
  const sharesDecimals = readable ? vaultState.decimals : 0;
  const assetDecimals = readable ? vaultState.asset.decimals : 0;

  return {
    asset: {
      decimals: vaultState.asset.decimals,
      address: vaultState.asset.address,
    },
    chainId: vault.chainId,
    address: vault.address,
    decimals: Number(vaultState.decimals),
    pointNames: vaultState.pointNames(),
    events: vaultEvents,
    feeReceiverTransfersFrom: vaultState.feeReceiverTransfersFrom,
    pricePerShare: Number(
      formatUnits(vaultState.pricePerShare(), assetDecimals)
    ),
    periodFees: vaultState.periodFees.filter(
      (period) => period.blockNumber >= Number(fromBlock) || 0
    ),
    data: accounts.map((account) => ({
      balance: Number(formatUnits(account.getBalance(), sharesDecimals)),
      fees: Number(formatUnits(account.getFees(), sharesDecimals)),
      cashback: Number(formatUnits(account.getCashback(), sharesDecimals)),
      points: account.getAllPoints(),
      account: account.address,
      referrer: account.getReferral()?.referral || "0x",
    })),
  };
}
