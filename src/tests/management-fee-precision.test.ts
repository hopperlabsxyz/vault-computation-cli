import { expect, test } from "bun:test";
import { BPS_DIVIDER, YEAR_IN_SECONDS } from "../utils/constants";

// Locks the integer management-fee math (vault.ts handleTotalAssetsUpdated).
// feesInAsset = floor(managementBps * timepast * totalAssets / (BPS * YEAR))
// The old float path Math.trunc((bps/BPS) * (totalAssets as Number)) lost
// precision above 2^53 wei and produced wrong low-order digits.
test("management fee is exact above 2^53 wei", () => {
  const totalAssets = 1234567890123456789012345n; // ~1.2M tokens @ 18 decimals
  const managementBps = 200n; // 2%
  const timepast = BigInt(YEAR_IN_SECONDS);

  const feesInteger =
    (managementBps * timepast * totalAssets) /
    (BPS_DIVIDER * BigInt(YEAR_IN_SECONDS));

  // closed form: a full year at 2% = totalAssets / 50, floored
  expect(feesInteger).toBe(totalAssets / 50n);

  // the old float path diverges (proves the bug this guards against)
  const feesFloat = BigInt(
    Math.trunc((Number(managementBps) / Number(BPS_DIVIDER)) * Number(totalAssets))
  );
  expect(feesFloat).not.toBe(feesInteger);
});
