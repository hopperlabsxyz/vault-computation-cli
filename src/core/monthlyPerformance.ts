import { SharesMath } from "@morpho-org/blue-sdk";
import { type PeriodSummary } from "../../gql/graphql";
import { formatUnits, parseUnits } from "viem";
import { YEAR_IN_SECONDS } from "utils/constants";

/**
 * Monthly performance data structure
 */
export interface MonthlyPerformanceData {
  month: string; // Format: "MM/YY"
  ppsEndOfTheMonth: bigint;
  duration: number; // Duration in seconds
  timestamp: number; // Timestamp of the monthly summary
  blockNumber: number;
  apr: number;
}

/**
 * Tracks monthly performance data by processing PeriodSummary events.
 * Detects new months and computes interpolated pricePerShare using ERC4626 formula.
 */
export class MonthlyPerformanceTracker {
  private monthlyData: MonthlyPerformanceData[] = [];
  private decimals: number;
  private inceptionTimestamp: number | null = null;


  constructor({
    decimals,
  }: {
    decimals: number;
  }) {
    this.decimals = decimals;
  }

  /**
   * Process a PeriodSummary event.
   * If it's a new month, compute and store the monthly performance data.
   */
  public processPeriodSummary(
    periodSummary: PeriodSummary,
  ): void {
        
        const startDate = new Date(periodSummary.blockTimestamp * 1000);
        const endOfPeriodDate = new Date((Number(periodSummary.blockTimestamp) + Number(periodSummary.duration)) * 1000);
        if (startDate.getUTCMonth() !== endOfPeriodDate.getUTCMonth()) { // it means the periodSummary happens over a month change


            // first we need to compute the pricePerShare at the end of the period by doing
            // a linear interpolation between the pricePerShare at the start and the end of the period

            const pricePerShareAtPeriodStart = SharesMath.toAssets(
              BigInt(10 ** this.decimals),
              periodSummary.totalAssetsAtStart,
              periodSummary.totalSupplyAtStart,
              "Up"
            );
            const pricePerShareAtPeriodEnd = SharesMath.toAssets(
              BigInt(10 ** this.decimals),
              periodSummary.totalAssetsAtEnd,
              periodSummary.netTotalSupplyAtEnd,
              "Up"
            );
            // this is the timestamp of the end of the month
            const monthEndTimestamp = this.getMonthEndTimestamp({year: startDate.getUTCFullYear(), month: startDate.getUTCMonth()});
  
            // we do the interpolation
            const timeToEndOfMonth = monthEndTimestamp - Number(periodSummary.blockTimestamp);
            const interpolationFactor = timeToEndOfMonth / periodSummary.duration;
            const totalEvolution = pricePerShareAtPeriodEnd - pricePerShareAtPeriodStart;
            const adjustedEvolution = Number(formatUnits(totalEvolution, this.decimals)) * interpolationFactor;
            const ppsEndOfTheMonth = pricePerShareAtPeriodStart + (parseUnits(adjustedEvolution.toString(), this.decimals));


            // now we want to compute the performance of the month
            let startTimestamp = this.getMonthStartTimestamp({year: startDate.getUTCFullYear(), month: startDate.getUTCMonth()});
            // if the inceptionTimestamp is not set, set it to the blockTimestamp of the first periodSummary
            // it means the period started after the beginning of the month
            if (this.inceptionTimestamp === null) {
              startTimestamp = periodSummary.blockTimestamp;
              this.inceptionTimestamp = periodSummary.blockTimestamp;
            }
            // if it is not the first month we can use the ppsEndOfTheMonth of the previous month
            // otherwise we use 1 share = 1 asset
            let pricePerShareAtBeginningOfMonth = BigInt(10 ** this.decimals);
            if (this.monthlyData.length > 0) {
              pricePerShareAtBeginningOfMonth = BigInt(this.monthlyData[this.monthlyData.length - 1].ppsEndOfTheMonth);
            }

            const performance =  Number(formatUnits(ppsEndOfTheMonth - pricePerShareAtBeginningOfMonth, this.decimals)) / Number(formatUnits(pricePerShareAtBeginningOfMonth, this.decimals));
            const periodDurationOverTheMonth = monthEndTimestamp - startTimestamp;
            
            // we annualize the performance
            const apr = performance * YEAR_IN_SECONDS / periodDurationOverTheMonth;

            this.monthlyData.push({
              month: `${startDate.getUTCMonth() + 1}/${startDate.getUTCFullYear()}`,
              ppsEndOfTheMonth,
              timestamp: Number(startTimestamp),
              duration: periodDurationOverTheMonth,
              apr,
              blockNumber: Number(periodSummary.blockNumber),
            });
        }
    

    }

  /**
   * Get all monthly performance data
   */
  public getMonthlyData(): MonthlyPerformanceData[] {
    return this.monthlyData;
  }

  /**
   * Get Unix timestamp for the start of a month (00:00:00 UTC)
   */
  private getMonthStartTimestamp({year, month}: {year: number, month: number}): number {
    const date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
    return Math.floor(date.getTime() / 1000);
  }

  private getMonthEndTimestamp({year, month}: {year: number, month: number}): number {
    // Day 0 of next month is the last day of current month, at 23:59:59 UTC
    const date = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 0));
    return Math.floor(date.getTime() / 1000);
  }


}
