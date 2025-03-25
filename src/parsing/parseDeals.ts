import { isAddress, type Address } from "viem";

// deals are done for a specific chain on a specific vault for a specific owner and a specific montant
export type AllDeals = Record<number, Deals>;
export type Deals = Record<Address, Record<Address, number>>;

export async function parseDeals(filePath: string): Promise<AllDeals> {
  const otcData = (await Bun.file(filePath).text()).split("\n");
  const deals: Record<number, Record<Address, Record<Address, number>>> = {};
  for (const entry of otcData.slice(1)) {
    const [chainId, vault, owner, otcDeal] = parseLine(entry);
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

function parseLine(line: string): [number, Address, Address, number] {
  const [chainId, vault, owner, deal] = line.replace(" ", "").split(",") as [
    number,
    Address,
    Address,
    number
  ];

  if (!isAddress(vault)) {
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

  return [chainId, vault, owner, deal];
}
