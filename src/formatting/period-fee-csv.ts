import type {
  PeriodFeeEntryResponse,
  AirdropResponse,
} from "../api/types";
import { getEndOfMonthTimestamps } from "../utils/time";

const csvHeader =
  "chainId,vault,period,blockNumber,managementFees,performanceFees,protocolFees,timestamp,managementRate,performanceRate,pricePerShare,totalAssets,totalSupply,vpps";

/**
 * Compute cumulative airdrop PPS increase up to a given timestamp.
 */
function computeAirdropSum(
  airdrops: AirdropResponse[],
  timestamp: number
): number {
  return airdrops
    .filter((a) => a.distributionTimestamp <= timestamp)
    .reduce((sum, a) => sum + a.ppsIncrease, 0);
}

/**
 * Convert period fee entries to CSV format with VPPS and end-of-month interpolation.
 * Matches the original CLI's convertToCSVPeriodFees output exactly.
 */
export function convertToCSVPeriodFees(
  vault: {
    chainId: number;
    address: string;
    decimals: number;
    assetDecimals: number;
  },
  entries: PeriodFeeEntryResponse[],
  readable: boolean,
  airdrops: AirdropResponse[] = []
): string {
  const csvRows: string[] = [];

  for (let i = 0; i < entries.length; i++) {
    const fee = entries[i];

    let managementFees = fee.managementFees;
    let performanceFees = fee.performanceFees;
    let protocolFees = fee.protocolFees;
    let totalAssets = fee.totalAssets;
    let totalSupply = fee.totalSupply;

    if (readable) {
      // Values from the API are already in readable format (String type preserves precision)
      // No additional formatting needed — they come as full-precision strings
    }

    const airdropSum = computeAirdropSum(airdrops, fee.timestamp);
    const vpps = (Number(fee.pricePerShare) + airdropSum).toFixed(10);

    csvRows.push(
      `${vault.chainId},${vault.address},${fee.period},${fee.blockNumber},${managementFees},${performanceFees},${protocolFees},${fee.timestamp},${fee.managementRate},${fee.performanceRate},${fee.pricePerShare},${totalAssets},${totalSupply},${vpps}`
    );

    // Insert interpolated end-of-month rows between this row and the next
    if (i < entries.length - 1) {
      const nextFee = entries[i + 1];
      const t1 = fee.timestamp;
      const t2 = nextFee.timestamp;
      const pps1 = Number(fee.pricePerShare);
      const pps2 = Number(nextFee.pricePerShare);

      for (const eomTs of getEndOfMonthTimestamps(t1, t2)) {
        const ratio = (eomTs - t1) / (t2 - t1);
        const interpPps = (pps1 + (pps2 - pps1) * ratio).toFixed(10);
        const eomAirdropSum = computeAirdropSum(airdrops, eomTs);
        const interpVpps = (
          pps1 +
          (pps2 - pps1) * ratio +
          eomAirdropSum
        ).toFixed(10);
        csvRows.push(
          `${vault.chainId},${vault.address},${fee.period},,,,,${eomTs},,,${interpPps},,,${interpVpps}`
        );
      }
    }
  }

  return [csvHeader, ...csvRows].join("\n");
}
