import type { Referral } from "../../gql/graphql";
import { type Address } from "viem";

export type Vault = {
  chainId: number;
  address: Address;
};

// export type ReferralCustom = Referral & {
//   rewardRateBps: number;
//   rebateRateBps: number;
//   offchain: boolean;
// };
