import { isWildCard } from "utils/various";
import { isAddress, type Address } from "viem";

// deals are done for a specific chain on a specific vault for a specific owner and a specific amount
export type RebateDeal = {
  chainId: number;
  vault: Address;
  owner: Address;
  feeRebateRate: number;
};

export async function parseRebateDeals(
  filePath: string
): Promise<RebateDeal[]> {
  const dealsRaw = (await Bun.file(filePath).text()).split("\n");
  const deals: Record<Address, RebateDeal> = {};

  for (const entry of dealsRaw.slice(1)) {
    const line = parseLine(entry);
    if (!line) continue;
    const { chainId, vault, owner, feeRebateRate } = line;

    if (deals[owner] != undefined) {
      if (!isWildCard(deals[owner].chainId, deals[owner].vault)) continue;
    } // if the owner already has a deal, and it is not a wildcard, we skip the current deal

    // if no deal or wildcard deal, we add the deal
    deals[owner] = {
      chainId,
      vault,
      owner,
      feeRebateRate,
    };
  }
  return Object.values(deals);
}

function parseLine(line: string):
  | {
      chainId: number;
      vault: Address;
      owner: Address;
      feeRebateRate: number;
    }
  | undefined {
  if (line === "") return undefined;
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
