import type { Address } from "viem";

export function isWildCard(chainId: number, address: Address) {
  return chainId === 0 && address === "0x0";
}
