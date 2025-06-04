import type { ReferralRate } from "core/types";
import { isAddress, type Address } from "viem";

// deals are done for a specific chain on a specific vault for a specific owner and a specific montant
export type AllDeals = Record<number, Deals>;
export type Deals = Record<Address, Record<Address, ReferralRate>>;

// merge deals
// in case of conflict, the deal from deals2 will be used
export function mergeDeals(
  deals1: Record<Address, ReferralRate>,
  deals2: Record<Address, ReferralRate>
): Record<Address, ReferralRate> {
  const merged: Record<Address, ReferralRate> = { ...deals1 };

  for (const [ownerAddress, deal] of Object.entries(deals2)) {
    const ownerAddressLower = ownerAddress.toLowerCase() as Address;
    merged[ownerAddressLower] = deal;
  }

  return merged;
}

export async function parseDeals(filePath: string): Promise<AllDeals> {
  const dealsRaw = (await Bun.file(filePath).text()).split("\n");
  const deals: Record<
    number,
    Record<Address, Record<Address, ReferralRate>>
  > = {};
  for (const entry of dealsRaw.slice(1)) {
    const line = parseLine(entry);
    if (!line) continue;
    const { chainId, vault, owner, feeRebateRate, feeRewardRate } = line;
    deals[chainId] = {
      ...deals?.[chainId],
      [vault]: {
        ...deals?.[chainId]?.[vault],
        [owner]: {
          feeRebateRate,
          feeRewardRate,
        },
      },
    };
  }
  return deals;
}

function parseLine(line: string):
  | ({
      chainId: number;
      vault: Address;
      owner: Address;
    } & ReferralRate)
  | undefined {
  if (line === "")
    return {
      chainId: 0,
      vault: "0x0",
      owner: "0x0",
      feeRebateRate: 0,
      feeRewardRate: 0,
    };
  const [chainId, vault, owner, feeRebateRate, feeRewardRate] = line
    .replace(" ", "")
    .split(",") as [number, Address, Address, number, number];
  if (isAddress(vault) == false && vault !== "0x0") {
    throw new Error(`Invalid vault address in OTC deals file: ${vault}`);
  }
  if (!isAddress(owner)) {
    throw new Error(`Invalid owner address in OTC deals file: ${owner}`);
  }
  if (feeRebateRate < 0 || feeRewardRate < 0) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot be negative`
    );
  }
  if (feeRebateRate > 10000 || feeRewardRate > 10000) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot exceed 10000`
    );
  }

  return {
    chainId,
    vault: vault.toLowerCase() as Address,
    owner: owner.toLowerCase() as Address,
    feeRebateRate,
    feeRewardRate,
  };
}
