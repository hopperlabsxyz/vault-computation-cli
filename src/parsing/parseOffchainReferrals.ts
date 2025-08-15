import { isWildCard } from "utils/various";
import { isAddress, type Address } from "viem";

export type OffChainReferral = {
  chainId: number;
  vault: Address;
  referrer: Address;
  referred: Address;
  reward: number;
  assets: number;
};

export async function parseOffchainReferrals(
  filePath: string
): Promise<OffChainReferral[]> {
  const csv = (await Bun.file(filePath).text()).split("\n");
  const referrals: OffChainReferral[] = [];
  for (const entry of csv.slice(1)) {
    const line = parseLine(entry);
    if (!line) continue;

    referrals.push({
      chainId: Number(line.chainId),
      vault: line.vault,
      referrer: line.referrer,
      referred: line.referred,
      reward: line.reward,
      assets: line.assets,
    });
  }

  return referrals;
}

function parseLine(line: string): OffChainReferral | undefined {
  if (line === "") return undefined;
  const [chainId, vault, referrer, referred, reward] = line
    .replace(" ", "")
    .split(",") as [string, Address, Address, Address, string];
  if (isAddress(vault) == false && vault !== "0x0") {
    throw new Error(`Invalid vault address in OTC deals file: ${vault}`);
  }
  if (!isAddress(referrer)) {
    throw new Error(`Invalid referrer address in OTC deals file: ${referrer}`);
  }
  if (!isAddress(referred)) {
    throw new Error(`Invalid referred address in OTC deals file: ${referred}`);
  }
  if (Number(reward) < 0) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot be negative`
    );
  }
  if (Number(reward) > 10000) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot exceed 10000`
    );
  }

  return {
    chainId: Number(chainId),
    vault: vault.toLowerCase() as Address,
    referrer: referrer.toLowerCase() as Address,
    referred: referred.toLowerCase() as Address,
    reward: Number(reward),
    assets: 0,
  };
}

// merge rebate deals
// in case of conflict, the deal from deals2 will be used
export function mergeRebateDeals(
  deals1: Record<Address, number>,
  deals2: Record<Address, number>
): Record<Address, number> {
  const merged: Record<Address, number> = { ...deals1 };

  for (const [ownerAddress, deal] of Object.entries(deals2)) {
    const ownerAddressLower = ownerAddress.toLowerCase() as Address;
    merged[ownerAddressLower] = deal;
  }

  return merged;
}
