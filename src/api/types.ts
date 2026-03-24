export interface PeriodFeeEntryResponse {
  period: number;
  blockNumber: string;
  managementFees: string;
  performanceFees: string;
  protocolFees: string;
  timestamp: number;
  managementRate: number;
  performanceRate: number;
  pricePerShare: string;
  totalAssets: string;
  totalSupply: string;
}

export interface AirdropResponse {
  name: string;
  ppsIncrease: number;
  distributionTimestamp: number;
}

export interface PeriodFeeResultResponse {
  periodFees: {
    chainId: number;
    address: string;
    decimals: number;
    assetDecimals: number;
    entries: PeriodFeeEntryResponse[];
    airdrops: AirdropResponse[];
  };
}

export interface UserFeeEntryResponse {
  account: string;
  referrer: string;
  balance: number;
  fees: number;
  cashback: number;
}

export interface UserFeeResultResponse {
  userFees: {
    chainId: number;
    address: string;
    pricePerShare: number;
    entries: UserFeeEntryResponse[];
  };
}

export interface UserBalanceEntryResponse {
  account: string;
  balance: number;
}

export interface UserBalanceResultResponse {
  userBalances: {
    chainId: number;
    address: string;
    entries: UserBalanceEntryResponse[];
  };
}

export interface UserPointEntryResponse {
  account: string;
  points: Record<string, number>;
}

export interface UserPointsResultResponse {
  userPoints: {
    chainId: number;
    address: string;
    pointNames: string[];
    entries: UserPointEntryResponse[];
  };
}

export interface VaultEventEntryResponse {
  blockNumber: string;
  type: string;
  blockTimestamp: number;
}

export interface VaultEventsSummaryResponse {
  vaultEventsSummary: {
    events: VaultEventEntryResponse[];
  };
}

export interface ClaimableControllersResponse {
  claimableControllers: string[];
}
