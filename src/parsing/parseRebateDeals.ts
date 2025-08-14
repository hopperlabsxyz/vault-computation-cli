import { isAddress, type Address } from "viem";

// deals are done for a specific chain on a specific vault for a specific owner and a specific amount
export type AllDeals = Record<number, Deals>;
export type Deals = Record<Address, Record<Address, number>>;

export async function parseRebateDeals(filePath: string): Promise<AllDeals> {
  const dealsRaw = (await Bun.file(filePath).text()).split("\n");
  const deals: Record<number, Record<Address, Record<Address, number>>> = {};
  for (const entry of dealsRaw.slice(1)) {
    const line = parseLine(entry);
    if (!line) continue;
    const { chainId, vault, owner, feeRebateRate } = line;
    deals[chainId] = {
      ...deals?.[chainId],
      [vault]: {
        ...deals?.[chainId]?.[vault],
        [owner]: feeRebateRate,
      },
    };
  }
  return deals;
}

function parseLine(line: string):
  | {
      chainId: number;
      vault: Address;
      owner: Address;
      feeRebateRate: number;
    }
  | undefined {
  if (line === "")
    return {
      chainId: 0,
      vault: "0x0",
      owner: "0x0",
      feeRebateRate: 0,
    };
  const [chainId, vault, owner, feeRebateRate] = line
    .replace(" ", "")
    .split(",") as [string, Address, Address, string];
  if (isAddress(vault) == false && vault !== "0x0") {
    throw new Error(`Invalid vault address in OTC deals file: ${vault}`);
  }
  if (!isAddress(owner)) {
    throw new Error(`Invalid owner address in OTC deals file: ${owner}`);
  }

  if (Number(feeRebateRate) > 10000) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot exceed 10000`
    );
  }
  if (Number(feeRebateRate) < 0) {
    throw new Error(
      `Invalid deal value in OTC deals file. Deal cannot be negative`
    );
  }

  return {
    chainId: Number(chainId),
    vault: vault.toLowerCase() as Address,
    owner: owner.toLowerCase() as Address,
    feeRebateRate: Number(feeRebateRate),
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
