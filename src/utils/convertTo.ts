import { formatUnits, parseUnits } from "viem";

export function convertBigIntToNumber(
  value: bigint,
  decimals: number = 18,
  precision?: number
): number {
  if (precision === undefined) precision = decimals;
  const valueWithMoreDecimals = parseUnits(value.toString(), precision);
  const valueDivided = valueWithMoreDecimals / BigInt(10 ** decimals);
  return Number(formatUnits(valueDivided, precision));
}
