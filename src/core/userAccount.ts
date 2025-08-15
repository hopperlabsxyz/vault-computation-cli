import type { Address } from "viem";
import type { ReferralConfig } from "./types";

/**
 * A user account in a vault.
 * It contains the balance, the cashback, the fees, the points, the referral and the rebate rate.
 */
export class UserAccount {
  public address: Address;
  // Amount of shares
  protected balance: bigint = 0n;
  // Amount of shares that the user has received as cashback, thanks to fee rebate and referral rewards
  protected cashback: bigint = 0n;
  // Amount of shares that the user has paid as fees
  protected fees: bigint = 0n;
  // Amount of points that the user has earned
  protected points: Record<string, number> = {};
  // The referral config that the user has been referred by
  // one account can have been referred by only one other account
  protected referral: ReferralConfig | undefined;
  // The rebate rate in basis points
  protected rebateRateBps: number | undefined;
  // The address of the user

  constructor(address: Address) {
    this.address = address;
  }

  public increaseBalance(amount: bigint): bigint {
    this.balance += amount;
    return this.balance;
  }

  public decreaseBalance(amount: bigint): bigint {
    this.balance -= amount;
    return this.balance;
  }

  public increaseFees(amount: bigint): bigint {
    this.fees += amount;
    return this.fees;
  }

  public increaseCashback(amount: bigint): bigint {
    this.cashback += amount;
    return this.cashback;
  }

  public increasePoints(name: string, amount: number): number {
    if (!this.points[name]) this.points[name] = 0;

    this.points[name] += amount;
    return this.points[name];
  }

  // Getter
  public getPoints(name: string): number {
    return this.points[name] || 0;
  }

  public getAllPoints(): Record<string, number> {
    return this.points;
  }

  public getFees(): bigint {
    return this.fees;
  }

  public getCashback(): bigint {
    return this.cashback;
  }

  public getBalance(): bigint {
    return this.balance;
  }

  /**
   * @param rate - The rebate rate in basis points
   */
  public setRebateRateBps(rate: number) {
    this.rebateRateBps = rate;
  }

  /**
   * @returns The rebate rate in basis points
   */
  public getRebateRateBps(): number | undefined {
    return this.rebateRateBps;
  }

  public setReferral(referral: Address, rewardRateBps: number) {
    this.referral = { referral, rewardRateBps };
  }

  public getReferral(): ReferralConfig | undefined {
    return this.referral;
  }
}
