import { isAddress, type Address } from "viem";

// A per-wallet personal high-water-mark override, for LPs migrating with a
// pre-existing drawdown from outside the vault. `pricePerShare` is a decimal in
// asset units (e.g. "2.2"), applied once on the wallet's first acquisition.
export type HwmOverride = { wallet: Address; pricePerShare: string };

// Positive decimal in asset units.
const DECIMAL = /^\d+(\.\d+)?$/;

export async function parseHwmOverrides(
  filePath: string
): Promise<HwmOverride[]> {
  if (!filePath.endsWith(".csv")) {
    throw new Error("File must have .csv extension");
  }
  const rows = (await Bun.file(filePath).text()).split("\n");
  const seen = new Set<Address>();
  const overrides: HwmOverride[] = [];

  for (const entry of rows.slice(1)) {
    const line = entry.trim();
    if (line === "") continue;
    const [walletRaw, pricePerShare] = line.replace(" ", "").split(",") as [
      Address,
      string,
    ];
    if (!isAddress(walletRaw)) {
      throw new Error(`Invalid wallet address in HWM overrides file: ${walletRaw}`);
    }
    if (!DECIMAL.test(pricePerShare ?? "")) {
      throw new Error(
        `Invalid pricePerShare "${pricePerShare}" for ${walletRaw} (decimal in asset units, e.g. 2.2)`
      );
    }
    const wallet = walletRaw.toLowerCase() as Address;
    // It's a payment file: a duplicated wallet is an error, not a silent merge.
    if (seen.has(wallet)) {
      throw new Error(`Duplicate wallet in HWM overrides file: ${wallet}`);
    }
    seen.add(wallet);
    overrides.push({ wallet, pricePerShare });
  }
  return overrides;
}
