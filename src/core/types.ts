import type { VaultEventsQuery } from "../../gql/graphql";
import type { Address } from "viem";
import type { Vault } from "types/Vault";
import type { Dot } from "./pointTracker";
import type { OffChainReferral } from "parsing/parseOffchainReferrals";
import type { RebateDeal } from "parsing/parseRebateDeals";

export interface EventBase {
  blockNumber: number;
  blockTimestamp: number;
  logIndex: number;
}

export type RebateEvent = {
  feeRebateRate: number;
  vault: "0x"; // todo: maybe put a real vault address and 0x0 if wild card ?
  __typename: "RebateDeal";
  owner: Address;
} & EventBase;

export type OffChainReferralEvent = {
  feeRewardRate: number;
  vault: "0x"; // todo: maybe put a real vault address and 0x0 if wild card ?
  __typename: "OffChainReferral";
  owner: Address;
  referral: Address;
  reward: number;
} & EventBase;

/// A point transformed to mimic an Event type.
export type PointEvent = {
  amount: number;
  vault: Address;
  __typename: "Point";
  name: string;
} & EventBase;

/// Basic form of a Point data.
export type Point = Dot & { name: string };

export type ReferralEvent = {
  rewardRateBps: number;
  rebateRateBps: number;
  offchain: boolean;
  assets: bigint;
  requestId: bigint;
  __typename: "Referral";
  id: `0x${string}`;
  transactionHash: `0x${string}`;
  owner: `0x${string}`;
  referral: `0x${string}`;
} & EventBase;

export interface ReferralRates {
  feeRebateRateBps: number;
  feeRewardRateBps: number;
}

export interface ReferralConfig {
  referral: Address;
  rewardRateBps: number;
}

// export type ReferralConfig = {
//   referral: Address;
//   feeRewardRateBps: number;
// };

export interface OffChainReferralRates {
  feeRewardRate: number;
}

export interface VaultAddrresses {
  silo: Address;
  vault: Address;
}

export type OffChainReferrals = [
  {
    referral: Address;
    referee: Address;
    rewardRateBps: number;
    blockNumber: number;
    blockTimestamp: number;
    logIndex: number;
  }
];

export interface PreProcessingParams {
  events: VaultEventsQuery;
  addresses: VaultAddrresses;
  defaultReferralRateBps?: number;
  defaultRebateRateBps?: number;
  rebateDeals?: RebateDeal[];
  offChainReferrals?: OffChainReferral[];
  points?: Point[];
}

export interface ProcessEventParams {
  event: { __typename: string; blockNumber: bigint } & Record<string, any>;
  distributeFeesFromBlock: bigint;
}

export interface ProcessEventsParams {
  events: { __typename: string; blockNumber: bigint }[];
  distributeFeesFromBlock: bigint;
  blockEndHook?: (blockNumber: string) => Promise<any>;
}

export interface ProcessVaultParams {
  vault: Vault;
  readable: boolean;
  rebateDeals?: RebateDeal[];
  offChainReferrals?: OffChainReferral[];
  points?: Point[];
  fromBlock?: bigint;
  toBlock?: bigint;
  defaultReferralRateBps?: number;
  defaultRebateRateBps?: number;
  strictBlockNumberMatching?: boolean;
}

export interface ProcessVaultReturn {
  chainId: number;
  address: Address;
  decimals: number;
  pricePerShare: number;
  pointNames: string[];
  data: {
    balance: number;
    cashback: number;
    fees: number;
    points: Record<string, number>;
    account: Address;
    referrer: Address;
  }[];

  periodFees: PeriodFees;
}

export type PeriodFees = Array<{
  managementFees: string;
  performanceFees: string;
  blockNumber: number;
  period: number;
  timestamp: number;
  managementRate: number;
  performanceRate: number;
  pricePerShare: number;
}>;

export type Rates = {
  management: number;
  performance: number;
};
