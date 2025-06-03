import { isAddress, type Address } from "viem";

// deals are done for a specific chain on a specific vault for a specific owner and a specific montant
export type AllDeals = Record<number, Deals>;
export type Deals = Record<Address, Record<Address, number>>;

// merge deals
// in case of conflict, the deal from deals2 will be used
export function mergeDeals(
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

export async function parseDeals(filePath: string): Promise<AllDeals> {
  const dealsRaw = (await Bun.file(filePath).text()).split("\n");
  const deals: Record<number, Record<Address, Record<Address, number>>> = {};
  for (const entry of dealsRaw.slice(1)) {
    const line = parseLine(entry);
    if (!line) continue;
    const [chainId, vault, owner, otcDeal] = line;
    deals[chainId] = {
      ...deals?.[chainId],
      [vault]: {
        ...deals?.[chainId]?.[vault],
        [owner]: otcDeal,
      },
    };
  }
  return deals;
}

function parseLine(
  line: string
): [number, Address, Address, number] | undefined {
  if (line === "") return [0, "0x0", "0x0", 0];
  const [chainId, vault, owner, deal] = line.replace(" ", "").split(",") as [
    number,
    Address,
    Address,
    number
  ];
  if (!isAddress(vault) && vault !== "0x0") {
    throw new Error(`Invalid vault address in OTC deals file: ${vault}`);
  }
  if (!isAddress(owner)) {
    throw new Error(`Invalid owner address in OTC deals file: ${owner}`);
  }
  if (deal < 0) {
    throw new Error(
      `Invalid deal value in OTC deals file: ${deal}. Deal cannot be negative`
    );
  }
  if (deal > 10000) {
    throw new Error(
      `Invalid deal value in OTC deals file: ${deal}. Deal cannot exceed 10000`
    );
  }

  return [
    chainId,
    vault.toLowerCase() as Address,
    owner.toLowerCase() as Address,
    deal,
  ];
}
