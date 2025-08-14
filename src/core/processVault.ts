import { formatUnits, maxUint256 } from "viem";
import { generateVault } from "./vault";
import { sanityChecks } from "./sanityChecks";
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
  defaultReferralRate = 0,
  defaultRebateRate = 0,
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
    sanityChecks({
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
    defaultReferralRate,
    defaultRebateRate,
    points,
    rebateDeals,
    offChainReferrals,
  });
  console.log({
    events: events
      .filter((e) => e.__typename === "Referral")
      .forEach((e) => console.log(typeof e.feeRewardRate)),
  });
  vaultState.processEvents({
    events: events as { __typename: string; blockNumber: bigint }[],
    distributeFeesFromBlock: fromBlock || 0n,
  });

  // now we can compute the rebate users can get
  vaultState.distributeRebatesAndRewards();

  const result = vaultState.getAccounts();
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
    periodFees: vaultState.periodFees,
    data: Object.fromEntries(
      Object.entries(result).map(([address, values]) => [
        address,
        {
          balance: Number(formatUnits(values.getBalance(), sharesDecimals)),
          fees: Number(formatUnits(values.getFees(), sharesDecimals)),
          cashback: Number(formatUnits(values.getCashback(), sharesDecimals)),
          points: values.getAllPoints(),
        },
      ])
    ),
  };
}
