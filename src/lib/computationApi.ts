import { get } from "env-var";

// Default points at the prod Lagoon backend (computation API + GraphQL). Override
// with COMPUTATION_API_URL to test against another environment, e.g.
// https://api-pprod.lagoon.finance.
const BASE_URL = get("COMPUTATION_API_URL")
  .default("https://api.lagoon.finance")
  .asString();

export type PeriodFeeRow = {
  chainId: number;
  vault: string;
  period: number;
  blockNumber: number | null;
  managementFees: string | null;
  performanceFees: string | null;
  protocolFees: string | null;
  timestamp: number;
  managementRate: number | null;
  performanceRate: number | null;
  pricePerShare: string;
  totalAssets: string | null;
  totalSupply: string | null;
  vpps: string;
  interpolated: boolean;
};

export type PeriodFeesResult = {
  chainId: number;
  vault: string;
  decimals: number;
  assetDecimals: number;
  rows: PeriodFeeRow[];
};

export type UserFeeRow = {
  account: string;
  referrer: string;
  balance: string;
  fees: string;
  cashback: string;
};

export type UserFeesResult = {
  chainId: number;
  vault: string;
  decimals: number;
  assetDecimals: number;
  pricePerShare: string;
  rows: UserFeeRow[];
};

export type UserPointsResult = {
  chainId: number;
  vault: string;
  pointNames: string[];
  rows: { account: string; points: Record<string, number> }[];
};

export type RefundRow = {
  account: string;
  perfFees: string;
  refund: string;
  refundGross: string;
};

export type RefundHwmResult = {
  chainId: number;
  vault: string;
  decimals: number;
  assetDecimals: number;
  pricePerShare: string;
  highWaterMark: string;
  rows: RefundRow[];
};

// POST a computation request and return the parsed JSON body. On a non-2xx the
// backend sends { message }, which we surface verbatim so the CLI prints the
// same clear errors it used to throw locally (invalid block, zero supply, ...).
async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const j = (await res.json()) as { message?: string | string[] };
      if (j.message)
        detail = Array.isArray(j.message) ? j.message.join("; ") : j.message;
    } catch {
      // non-JSON error body; keep the status line
    }
    throw new Error(detail);
  }
  return (await res.json()) as T;
}

export const computationApi = {
  periodFees: (chainId: number, vault: string, body: object) =>
    post<PeriodFeesResult>(`/computation/${chainId}/${vault}/period-fees`, body),
  userFees: (chainId: number, vault: string, body: object) =>
    post<UserFeesResult>(`/computation/${chainId}/${vault}/user-fees`, body),
  userPoints: (chainId: number, vault: string, body: object) =>
    post<UserPointsResult>(`/computation/${chainId}/${vault}/user-points`, body),
  refundHwm: (chainId: number, vault: string, body: object) =>
    post<RefundHwmResult>(`/computation/${chainId}/${vault}/refund-hwm`, body),
};

// GraphQL query against the Lagoon indexer (api.lagoon.finance/query).
export async function lagoonQuery<T>(
  query: string,
  variables?: object
): Promise<T> {
  const res = await fetch(`${BASE_URL}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length)
    throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data as T;
}
