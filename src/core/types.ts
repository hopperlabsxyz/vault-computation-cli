import type { VaultEventsQuery } from "gql/graphql";
import type { Address } from "viem";
import type { Vault } from "types/Vault";

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

export interface VaultAddrresses {
  feeReceiver: Address;
  silo: Address;
  vault: Address;
}

export type Deals = Record<Address, number>;

export interface PreProcessingParams {
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
  pricePerShare: number;
  data: Record<
    Address,
    {
      balance: number;
      fees: number;
      cashback: number;
    }
  >;
}
