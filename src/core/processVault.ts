import { formatUnits, maxUint256 } from "viem";
import { generateVault } from "./vault";
import { checkStrictBlockNumberMatching } from "./strictBlockNumberMatching";
import type { ProcessVaultParams, ProcessVaultReturn } from "./types";
import { preprocessEvents } from "./preprocessEvents";
import { fetchVaultEvents } from "utils/fetchVaultEvents";

export async function processVault({
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

  const vaultEvents = await fetchVaultEvents({
    chainId: vault.chainId,
    vaultAddress: vault.address,
    toBlock: toBlock ? BigInt(toBlock) : undefined,
  });
  if (strictBlockNumberMatching) {
    checkStrictBlockNumberMatching({
      events: vaultEvents,
      fromBlock: fromBlock || 0n,
      toBlock: toBlock || BigInt(maxUint256),
    });
  }

  const vaultState = await generateVault({
    vault,
  });
  let events = preprocessEvents({
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
  vaultState.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock || 0n,
  });

  // now we can compute the rebate users can get
  vaultState.distributeRebatesAndRewards();

  const accounts = vaultState.getAccounts();
  const sharesDecimals = readable ? vaultState.decimals : 0;
  const assetDecimals = readable ? vaultState.asset.decimals : 0;

  return {
    chainId: vault.chainId,
    address: vault.address,
    decimals: Number(vaultState.decimals),
    pointNames: vaultState.pointNames(),
    pricePerShare: Number(
      formatUnits(vaultState.pricePerShare(), assetDecimals)
    ),
    periodFees: vaultState.periodFees.filter((period) => period.blockNumber >= Number(fromBlock) || 0),
    data: accounts.map((account) => ({
      balance: Number(formatUnits(account.getBalance(), sharesDecimals)),
      fees: Number(formatUnits(account.getFees(), sharesDecimals)),
      cashback: Number(formatUnits(account.getCashback(), sharesDecimals)),
      points: account.getAllPoints(),
      account: account.address,
    })),
    // ),
  };
}
