import type { Address } from "viem";

export class UserAccount {
  protected balance: bigint = 0n;
  protected cashback: bigint = 0n;
  protected fees: bigint = 0n;
  protected points: Record<string, number> = {};
  address: Address;

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
}
