import type { Referral } from "gql/graphql";
import { type Address } from "viem";

export type Vault = {
  chainId: number;
  address: Address;
};

export type ReferralCustom = Referral & {
  feeRebate: number;
  feeBonus: number;
};

export type ReferralConfig = {
  referrer: Address;
  feeRebate: number;
  feeBonus: number;
};
