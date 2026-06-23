# Vault Computation CLI

A command-line tool for computing Lagoon vault data. It calls the Lagoon
**computation API** (`api.lagoon.finance`) and renders the results as CSV — no
RPC or subgraph access required.

## Features

- Per-period fee reports (management / performance / protocol fees, vpps,
  interpolated end-of-month snapshots)
- Per-user fee reports with referral rewards and OTC fee rebates
- Points repartition over a time series
- Linear interpolation of a CSV time series (offline utility)
- CSV report generation, raw or human-readable (`-r`)

## Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or higher)

## Installation

```bash
git clone https://github.com/hopperlabsxyz/fees-computation-cli.git
cd fees-computation-cli
bun install
```

No configuration is required — the CLI targets `https://api.lagoon.finance` by
default. To point at a different deployment, set `COMPUTATION_API_URL`:

```bash
COMPUTATION_API_URL=https://my-backend.example bun run period-fee ...
```

## Commands

List everything with `bun run help`. Each command takes a `chainId:VaultAddress`
argument; the three computation commands also accept `--silent` and `-o/--output`.

| Command | Alias | Description |
| --- | --- | --- |
| `find-blocks` | `fb` | List a vault's totalAssetsUpdated / fee-receiver blocks |
| `find-claimable-controllers` | `fcc` | Controllers with a claimable deposit request |
| `period-fee` | `pf` | Per-period fee report |
| `user-fee` | `uf` | Per-user fee report (referrals, rebates) |
| `user-points` | `up` | Points repartition |
| `interpolate` | `ip` | Linear interpolation of a CSV time series |

### Find Blocks (fb)

```bash
bun run find-blocks <chainId:VaultAddress> [--fromBlock <n>] [--toBlock <n>]
```

Lists, in chronological order, the blocks where the vault emitted a
`totalAssetsUpdated` (period boundaries — use these for `period-fee`/`user-fee`
`-f/-t`) and where the fee receiver moved shares. Reads from the indexer
(`api.lagoon.finance/query`).

### Find Claimable Controllers (fcc)

```bash
bun run find-claimable-controllers <chainId:VaultAddress>
```

Prints a JSON array of controllers that have a settled-but-unclaimed deposit
request (`claimableDeposit > 0`) — ready to pass to `claimSharesOnBehalf()`.
Reads current state from the indexer (`api.lagoon.finance/query`).

### Period Fee (pf)

```bash
bun run period-fee <chainId:VaultAddress> [-f <fromBlock>] [-t <toBlock>] [-r]
```

Fees per period between `totalAssetsUpdated` events. If `-f/-t` are omitted, the
oldest and newest update blocks are used. `-r` formats amounts in human units;
without it, amounts are raw wei. Columns:

`chainId,vault,period,blockNumber,managementFees,performanceFees,protocolFees,timestamp,managementRate,performanceRate,pricePerShare,totalAssets,totalSupply,vpps`

Rows that are interpolated end-of-month snapshots populate only
`chainId,vault,period,timestamp,pricePerShare,vpps`.

### User Fee (uf)

```bash
bun run user-fee <chainId:VaultAddress> -f <fromBlock> -t <toBlock> [-r] \
  [-d deals.csv] [--referrals refs.csv]
```

Per-user balances, fees, referrer and cashback. `-f/-t` must be
`totalAssetsUpdated` block numbers. Optional OTC inputs:

- `-d, --deals <csv>` — `chainId,vault,owner,rebateRateBps` (a `0,0x0` row is a
  wildcard for any vault)
- `--referrals <csv>` — `chainId,vault,referrer,referred,rewardRateBps,rebateRateBps`

### User Points (up)

```bash
bun run user-points <chainId:VaultAddress> --points points.csv
```

Distributes points to shareholders proportionally at each timestamp. `--points`
is a CSV of `timestamp,amount,name`. For accuracy, use timestamps right before
`totalAssetsUpdated` events.

### Interpolate (ip)

```bash
bun run interpolate <csv file> -f <fromTimestamp> -t <toTimestamp> [--frequency <seconds>]
```

Linear interpolation of a CSV time series, generating intermediate points.

## License

[MIT](/LICENSE) License

## Disclaimer ⚠️

This code is provided on a best-effort basis by the Lagoon team. It is provided
"as is" without warranties of any kind. Lagoon and its contributors accept no
liability for any loss or damage resulting from its use. Perform your own
testing and due diligence before relying on it.
