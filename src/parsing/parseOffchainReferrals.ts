import { isWildCard } from "utils/various";
import { isAddress, type Address } from "viem";

export type OffChainReferral = {
  chainId: number;
  vault: Address;
  referrer: Address;
  referred: Address;
  rewardRateBps: number;
  rebateRateBps: number;
  assets: number;
};

export async function parseOffchainReferrals(
  filePath: string
): Promise<OffChainReferral[]> {
  console.log("filePath", filePath);
  if (!filePath.endsWith(".csv")) {
    throw new Error(`File ${filePath} must have .csv extension`);
  }
  const csv = (await Bun.file(filePath).text()).split("\n");
  const referrals: Record<Address, OffChainReferral> = {};
  for (const entry of csv.slice(1)) {
    const line = parseLine(entry);
    if (!line) continue;

    if (
      referrals[line.referrer] &&
      !isWildCard(
        referrals[line.referrer].chainId,
        referrals[line.referrer].vault
      )
    )
      continue;

    referrals[line.referrer] = {
      chainId: Number(line.chainId),
      vault: line.vault,
      referrer: line.referrer,
      referred: line.referred,
      rewardRateBps: line.rewardRateBps,
      rebateRateBps: line.rebateRateBps,
      assets: line.assets,
    };
  }

  return Object.values(referrals);
}

function parseLine(line: string): OffChainReferral | undefined {
  if (line === "") return undefined;
  const [chainId, vault, referrer, referred, rewardRateBps, rebateRateBps] =
    line.replace(" ", "").split(",") as [
      string,
      Address,
      Address,
      Address,
      string,
      string
    ];
  if (isAddress(vault) == false && vault !== "0x0") {
    throw new Error(`Invalid vault address in OTC deals file: ${vault}`);
  }
  if (!isAddress(referrer)) {
    throw new Error(`Invalid referrer address in OTC deals file: ${referrer}`);
  }
  if (!isAddress(referred)) {
    throw new Error(`Invalid referred address in OTC deals file: ${referred}`);
  }
  if (Number(rewardRateBps) < 0) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot be negative`
    );
  }
  if (Number(rewardRateBps) > 10000) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot exceed 10000`
    );
  }
  if (Number(rebateRateBps) > 10000) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot exceed 10000`
    );
  }
  if (Number(rebateRateBps) < 0) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot be negative`
    );
  }

  return {
    chainId: Number(chainId),
    vault: vault.toLowerCase() as Address,
    referrer: referrer.toLowerCase() as Address,
    referred: referred.toLowerCase() as Address,
    rewardRateBps: Number(rewardRateBps),
    rebateRateBps: Number(rebateRateBps),
    assets: 0,
  };
}
