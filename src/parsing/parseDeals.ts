import { isAddress, type Address } from "viem";

// deals are done for a specific chain on a specific vault for a specific owner and a specific montant
export type AllDeals = Record<number, Deals>;
export type Deals = Record<Address, Record<Address, number>>;

export async function parseDeals(filePath: string): Promise<AllDeals> {
  const otcData = (await Bun.file(filePath).text()).split("\n");
  console.log(otcData);
  const deals: Record<number, Record<Address, Record<Address, number>>> = {};
  for (const entry of otcData.slice(1)) {
    const [chainId, vaultAddress, owner, otcDeal] = parseLine(entry);
    deals[chainId] = {
      ...deals?.[chainId],
      [vaultAddress]: {
        ...deals?.[chainId]?.[vaultAddress],
        [owner]: otcDeal,
      },
    };
  }
  return deals;
}

function parseLine(line: string): [number, Address, Address, number] {
  const [chainId, vaultAddress, owner, deal] = line
    .replace(" ", "")
    .split(",") as [number, Address, Address, number];
  if (!isAddress(vaultAddress) || !isAddress(owner))
    throw new Error("there is an error with addresses in otc deals file");
  if (deal > 10000 || deal < 0)
    throw new Error("there is an error with deal value in otc deals file");
  return [chainId, vaultAddress, owner, deal];
}
