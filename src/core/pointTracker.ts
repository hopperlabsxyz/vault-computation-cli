// this class is responsible for storing the evolution of various points through time for one vault

import type { Point } from "./types";

/**
 * Represents a single point in time with an amount value
 */
export type Dot = { amount: number; timestamp: number };

/**
 * PointTracker is responsible for tracking and managing the evolution of various points
 * through time for a single vault. It maintains a historical record of point values
 * and can calculate the difference between consecutive points.
 */
export class PointTracker {
  /**
   * Stores the historical data for each point name.
   * The key is the point name and the value is an array of points ordered by timestamp.
   */
  points: Record<string, Dot[]> = {};

  /**
   * Adds a new point to the historical record and calculates the difference from the previous point.
   * Points must be added in chronological order to maintain data integrity.
   *
   * @param point - The point to add, containing a name, amount, and timestamp
   * @returns The difference between the new point's amount and the previous point's amount.
   *          If this is the first point for this name, returns the full amount.
   */
  public registerPoint(point: Point): number {
    let previousAmount = 0;
    const lastPoint = this.lastPoint(point.name);
    if (lastPoint) {
      previousAmount = lastPoint.amount;
    } else this.points[point.name] = [];

    this.pushPoint(point);
    const diff = Number((point.amount - previousAmount));
    if (diff < 0)
      throw new Error(
        `New Point record decrease the amount of points: timestamp ${point.timestamp}`
      );
    return diff;
  }

  /**
   * Adds a new point to the internal storage for the given point name.
   *
   * @param point - The point to store
   * @private
   */
  private pushPoint(point: Point) {
    this.points[point.name].push({
      amount: point.amount,
      timestamp: point.timestamp,
    });
  }

  /**
   * Retrieves the most recent point for a given name.
   *
   * @param name - The name of the point series to query
   * @returns The most recent point if it exists, undefined otherwise
   * @private
   */
  public lastPoint(name: string): Dot | undefined {
    const len: number | undefined = this.points[name]?.length;
    if (len) return this.points[name][len - 1];
    return undefined;
  }

  public pointNames(): string[] {
    return Object.keys(this.points);
  }
}
