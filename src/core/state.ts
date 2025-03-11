import type { DepositRequest, RedeemRequest } from "gql/graphql";
import type { Address } from "viem";

export class State {
  private totalSupply = 0n;
  private totalAssets = 0n;

  private prePendingDeposits: Record<Address, bigint | undefined> = {};
  private prePendingRedeems: Record<Address, bigint | undefined> = {};

  private pendingDeposits: Record<Address, bigint | undefined> = {};
  private pendingRedeems: Record<Address, bigint | undefined> = {};

  private preReferrals: Record<Address, Address | undefined> = {}; // first address is referee, second is referrer
  private referrals: Record<Address, Address | undefined> = {};

  private lastFeeComputationBlock = 0n;
  private firstFeeComputed = false;
  private lastFeeComputed = false;
  private lastFees = 0n;

  public depositRequest(event: DepositRequest) {
    const depositRequest = event as DepositRequest;
    const depositUser = depositRequest.controller;

    if (this.prePendingDeposits[depositUser] === undefined)
      this.prePendingDeposits[depositUser] = 0n;

    this.prePendingDeposits[depositUser] += depositRequest.assets;
  }

  public redeemRequest(event: RedeemRequest) {
    const redeemRequest = event as RedeemRequest;
    const redeemUser = redeemRequest.owner;
    if (this.prePendingRedeems[redeemUser] === undefined)
      this.prePendingRedeems[redeemUser] = 0n;

    this.prePendingRedeems[redeemUser] += redeemRequest.shares;
  }
}
