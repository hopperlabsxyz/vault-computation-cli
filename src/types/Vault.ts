import type { Referral } from "gql/graphql";
import { type Address } from "viem";

export type Vault = {
  chainId: number;
  address: Address;
};

export type ReferralCustom = Referral & {
  feeRebateRate: number;
  feeRewardRate: number;
};

export type ReferralConfig = {
  referrer: Address;
  feeRebateRate: number;
  feeRewardRate: number;
};
