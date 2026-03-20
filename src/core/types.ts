import type { Address } from "viem";
import type { Vault } from "types/Vault";
import type { OffChainReferral } from "parsing/parseOffchainReferrals";
import type { RebateDeal } from "parsing/parseRebateDeals";
import type { VaultEventsResponse } from "@hopperlabsxyz/internal-subgraph";
import type {
  PeriodFees as _PeriodFees,
  TransferEvent as _TransferEvent,
} from "@hopperlabsxyz/internal-computation";

// Re-export SDK types used by CLI commands
export type {
  PeriodFees,
  PeriodFeeEntry,
  Rates,
  ReferralConfig,
  RebateEvent,
  PointEvent,
  ReferralEvent,
  VaultEvent,
  Dot,
  Point,
  VaultAddresses,
  TransferEvent,
} from "@hopperlabsxyz/internal-computation";

export interface PreProcessingParams {
  events: VaultEventsResponse;
  addresses: {
    silo: Address;
    vault: Address;
  };
  defaultReferralRateBps?: number;
  defaultRebateRateBps?: number;
  rebateDeals?: RebateDeal[];
  offChainReferrals?: OffChainReferral[];
  points?: Array<{ name: string; amount: number; timestamp: number }>;
}

export interface ProcessVaultParams {
  vault: Vault;
  readable: boolean;
  rebateDeals?: RebateDeal[];
  offChainReferrals?: OffChainReferral[];
  points?: Array<{ name: string; amount: number; timestamp: number }>;
  fromBlock?: bigint;
  toBlock?: bigint;
  defaultReferralRateBps?: number;
  defaultRebateRateBps?: number;
  strictBlockNumberMatching?: boolean;
}

export interface ProcessVaultReturn {
  asset: {
    decimals: number;
    address: Address;
  };
  chainId: number;
  address: Address;
  decimals: number;
  pricePerShare: number;
  pointNames: string[];
  events: VaultEventsResponse;
  feeReceiverTransfersFrom: _TransferEvent[];
  data: {
    balance: number;
    cashback: number;
    fees: number;
    points: Record<string, number>;
    account: Address;
    referrer: Address;
  }[];

  periodFees: _PeriodFees;
}
