import { SharesMath } from "@morpho-org/blue-sdk";
import { PeriodCount_OrderBy, type PeriodSummary } from "../../gql/graphql";
import { formatUnits, parseUnits } from "viem";
import { YEAR_IN_SECONDS } from "utils/constants";

/**
 * Monthly performance data structure
 */
export interface MonthlyPerformanceData {
  month: string; // Format: "MM/YY"
  pricePerShareAtMonthEnd: bigint;
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
        
    
        const startMonth = this.getTimestampMonth(Number(periodSummary.blockTimestamp));
        const startDate = this.getTimestampDate(Number(periodSummary.blockTimestamp));
        const currentTimestampMonth = this.getTimestampMonth(Number(periodSummary.blockTimestamp + periodSummary.duration));
        if (startMonth !== currentTimestampMonth) {
            const pricePerShareAtStart = SharesMath.toAssets(
              BigInt(10 ** this.decimals),
              periodSummary.totalAssetsAtStart,
              periodSummary.totalSupplyAtStart,
              "Up"
            );
            const pricePerShareAtEnd = SharesMath.toAssets(
              BigInt(10 ** this.decimals),
              periodSummary.totalAssetsAtEnd,
              periodSummary.netTotalSupplyAtEnd,
              "Up"
            );
            const monthEndTimestamp = this.getMonthEndTimestamp({year: startDate.year, month: startDate.month});
            const duration = monthEndTimestamp - periodSummary.blockTimestamp;
            const percentage = duration / periodSummary.duration;
            const totalEvolution = pricePerShareAtEnd - pricePerShareAtStart;
            const adjustedEvolution = Number(formatUnits(totalEvolution, this.decimals)) * percentage;
            const pricePerShareAtMonthEnd = pricePerShareAtStart + (parseUnits(adjustedEvolution.toString(), this.decimals));


            let startTimestamp = periodSummary.blockTimestamp;
            if (this.inceptionTimestamp === null) {
              startTimestamp = periodSummary.blockTimestamp;
              this.inceptionTimestamp = periodSummary.blockTimestamp;
            }
            const pricePerShareAtBeginningOfMonth = this.monthlyData[this.monthlyData.length - 1].pricePerShareAtMonthEnd;
            const performance =  Number(formatUnits(pricePerShareAtMonthEnd - pricePerShareAtBeginningOfMonth, this.decimals)) / Number(formatUnits(pricePerShareAtBeginningOfMonth, this.decimals));
            const monthDuration = this.getMonthDuration(startDate.month, startDate.year);
            const apr = performance * YEAR_IN_SECONDS / monthDuration;

            this.monthlyData.push({
              month: `${startDate.month}/${startDate.year}`,
              pricePerShareAtMonthEnd: pricePerShareAtMonthEnd,
              timestamp: startTimestamp,
              duration: duration,
              apr: apr,
              blockNumber: periodSummary.blockNumber,
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
    const date = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    return Math.floor(date.getTime() / 1000);
  }

  private getMonthEndTimestamp({year, month}: {year: number, month: number}): number {
    const date = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
    return Math.floor(date.getTime() / 1000);
  }

  private getMonthDuration(month: number, year: number): number {
    const startTimestamp = this.getMonthStartTimestamp({year, month});
    const endTimestamp = this.getMonthEndTimestamp({year, month});
    return endTimestamp - startTimestamp;
  }

  private getTimestampMonth(timestamp: number): number {
    const date = new Date(timestamp * 1000);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth(); // 0-11
    return year * 12 + month;
  }

  private getTimestampDate(timestamp: number): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  } {
    const date = new Date(timestamp * 1000);
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
    };
  }
}
