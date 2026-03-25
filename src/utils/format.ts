/**
 * Convert a raw BigInt string to human-readable decimal format.
 * Equivalent to viem's formatUnits.
 */
export function formatUnits(value: string | bigint, decimals: number): string {
  const str = typeof value === "string" ? value : String(value);

  if (!/^-?\d+$/.test(str)) {
    throw new Error(`formatUnits: invalid integer string "${str}"`);
  }

  if (decimals === 0) return str;

  const negative = str.startsWith("-");
  const abs = negative ? str.slice(1) : str;
  const padded = abs.padStart(decimals + 1, "0");
  const intPart = padded.slice(0, padded.length - decimals);
  const fracPart = padded.slice(padded.length - decimals);

  // Remove trailing zeros from fractional part
  const trimmedFrac = fracPart.replace(/0+$/, "");

  const result = trimmedFrac ? `${intPart}.${trimmedFrac}` : intPart;
  return negative ? `-${result}` : result;
}
