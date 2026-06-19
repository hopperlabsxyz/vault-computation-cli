# Migrating from the CLI to the computation API

The lagoon-backend `computation` endpoints port three CLI commands to REST. They
share the same `processEvents` engine, so results match — but the **inputs and a
few output details differ**. This guide maps each command to its endpoint and
lists the gotchas to watch for.

Base path: `POST /computation/{chainId}/{vault}/{period-fees,user-fees,user-points}`
Send `Accept: text/csv` for CSV (same columns as the CLI); omit it for JSON.

## Command → endpoint

| CLI command | Endpoint |
| --- | --- |
| `period-fee` / `pf` | `POST /computation/{chainId}/{vault}/period-fees` |
| `user-fee` / `uf` | `POST /computation/{chainId}/{vault}/user-fees` |
| `user-points` / `up` | `POST /computation/{chainId}/{vault}/user-points` |

The `chainId:VaultAddress` argument becomes the two path params.

## Input mapping

### period-fees
| CLI flag | API body field |
| --- | --- |
| `-f, --from-block` | `fromBlock` (string) |
| `-t, --to-block` | `toBlock` (string) |
| `-r, --readable` | n/a — the API CSV is always readable-formatted |

### user-fees
| CLI flag | API body field |
| --- | --- |
| `-f, --from-block` | `fromBlock` (string) |
| `-t, --to-block` | `toBlock` (string) |
| `-d, --deals <csv>` | `rebateDeals[]` (see CSV→JSON below) |
| `--referrals <csv>` | `offChainReferrals[]` (see CSV→JSON below) |
| `--fee-rebate-rate` (default 500) | `defaultRebateRateBps` |
| `--fee-reward-rate` (default 1500) | `defaultRewardRateBps` |

### user-points
| CLI flag | API body field |
| --- | --- |
| `--points <csv>` | `points[]` — `{ timestamp, amount, name }` per row |

### Deal / referral CSV → JSON

Rebate deals CSV (`chain,vault,owner,rebate`) → `rebateDeals[]`:
```json
{ "chainId": 1, "vault": "0x…", "owner": "0x…", "feeRebateRate": 5000 }
```

Offchain referrals CSV (`chain,vault,referrer,referred,reward,rebate`) → `offChainReferrals[]`:
```json
{ "chainId": 1, "vault": "0x…", "referrer": "0x…", "referred": "0x…",
  "rewardRateBps": 2500, "rebateRateBps": 5000, "assets": 0 }
```
(`assets` is always `0`, matching the CLI parser.)

## ⚠️ Wildcards: expand `0x0` to the full zero-address

The CLI treats `chainId 0` + vault `0x0` as a wildcard that applies a deal/referral
to **every** vault. The API **rejects the `0x0` shorthand with HTTP 400** — its
address fields require a full 42-char address.

To send a wildcard, use `chainId: 0` with the **zero-address**:
```
0x0000000000000000000000000000000000000000
```

The API filters every `rebateDeals` / `offChainReferrals` entry to the target
vault (exact `(chainId, vault)` match, or the zero-address wildcard) — same as the
CLI's `filterWildCard` (`src/utils/various.ts`). So you can submit a multi-vault
list and only the relevant entries apply.

## Output differences (same numbers, different formatting)

- **Higher precision in the API.** `pricePerShare` and `balance` come back as
  exact decimal strings (e.g. `1.018464700772498278`); the CLI prints float64
  (`1.0184647007724983`). Same value, more digits.
- **Fee amounts.** The API computes management/performance fees with exact integer
  math; the CLI uses a float64 step, so the two can differ in the last digit
  (≤~1e-15 relative). The API is the more accurate side.
- **Zero rows.** The CLI emits a row for an exited holder that accrued 1 wei of
  fees from rounding; the API drops all-effectively-zero rows.

## Example

```bash
# CLI
bun uf 1:0x936fac… -f 23237945 -t 25340162 -r \
  --fee-rebate-rate 500 --fee-reward-rate 1500 -d deals.csv --referrals refs.csv
```
```bash
# API (CSV)
curl -X POST "$BASE/computation/1/0x936fac…/user-fees" \
  -H 'Accept: text/csv' -H 'Content-Type: application/json' \
  -d '{
    "fromBlock": "23237945", "toBlock": "25340162",
    "rebateDeals": [{ "chainId": 1, "vault": "0x936fac…", "owner": "0x…", "feeRebateRate": 5000 }],
    "offChainReferrals": [{ "chainId": 1, "vault": "0x936fac…", "referrer": "0x…",
      "referred": "0x…", "rewardRateBps": 2500, "rebateRateBps": 5000, "assets": 0 }],
    "defaultRebateRateBps": 500, "defaultRewardRateBps": 1500
  }'
```
