import type { VaultEventsQuery } from "gql/graphql";
import type { Address } from "viem";
import type { Vault } from "types/Vault";
import type { FetchVaultReturn } from "utils/fetchVault";

export interface DealEvent {
  feeRebateRate: number;
  feeRewardRate: number;
  vault: "0x";
  __typename: "Deal";
  owner: Address;
  referral: Address;
  blockNumber: number;
  blockTimestamp: number;
  logIndex: number;
}
export interface ReferralEvent {
  feeRewardRate: number;
  feeRebateRate: number;
  assets: bigint;
  blockNumber: number;
  blockTimestamp: number;
  requestId: bigint;
  __typename: "Referral";
  id: `0x${string}`;
  transactionHash: `0x${string}`;
  logIndex: number;
  owner: `0x${string}`;
  referral: `0x${string}`;
}

export interface ReferralRate {
  feeRebateRate: number;
  feeRewardRate: number;
}

export type Deals = Record<Address, number>;

export interface VaultAddrresses {
  silo: Address;
  vault: Address;
}

// const a: VaultEventsWithState = {} as VaultEventsWithState

export interface PreProcessingParams {
  chainId: number;
  events: VaultEventsQuery;
  addresses: VaultAddrresses;
  referral?: ReferralRate;
  deals?: Deals;
}

export interface ProcessEventParams {
  event: { __typename: string; blockNumber: bigint };
  fromBlock: number;
}

export interface ProcessVaultParams {
  vault: Vault;
  readable: boolean;
  deals: Record<Address, number>;
  fromBlock: number;
  toBlock: number;
  feeRebateRate: number;
  feeRewardRate: number;
}

export interface ProcessVaultReturn {
  chainId: number;
  address: Address;
  decimals: number;
  pricePerShare: number;
  data: Record<
    Address,
    {
      balance: number;
      fees: number;
      cashback: number;
    }
  >;
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
}>;

export type Rates = {
  management: number;
  performance: number;
};
