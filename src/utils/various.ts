import type { Address } from "viem";

export function filterWildCard<T extends { vault: Address; chainId: number }>(
  array: T[] | undefined,
  vault: { address: Address; chainId: number }
): T[] {
  if (!array) return [];
  return array.filter(
    (elem) =>
      isWildCard(elem.chainId, elem.vault) ||
      (elem.chainId === vault.chainId &&
        elem.vault.toLowerCase() == vault.address.toLowerCase())
  );
}

export function isWildCard(chainId: number, address: Address) {
  return chainId === 0 && address === "0x0";
}

export function isLast<T>(index: number, array: T[]): boolean {
  return index == array.length - 1;
}
