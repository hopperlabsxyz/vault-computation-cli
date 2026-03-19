# Lagoon Private Internal SDK — Full Architecture Plan

*March 2026 — Prepared for team review*

## Context

Lagoon needs to:
1. Extract reusable computation logic from `vault-computation-cli` into a private SDK
2. DRY up pure computation functions duplicated between CLI and backend
3. Build a factsheet generation feature in the backend, powered by the SDK
4. Maintain clear separation of concerns across all codebases

### Key Decisions
- **Scope**: CLI-only computations first; factsheet-specific metrics (Sharpe, drawdown) added later
- **NPM scope**: `@lagoon-protocol/*` published as private packages to npm (same registry as public SDK)
- **Repo strategy**: Standalone monorepo (separate from sdk-v0)
- **CLI location**: Stays as a separate repo (`vault-computation-cli`). Consumes SDK via npm private packages.
- **YEAR_IN_SECONDS**: Canonical value = `31,557,600` (365.25 days, from CLI). Smart contracts use `31,536,000` (known bug on contract side). Public SDK v0-computation also has this bug — to be fixed.

---

## 1. Current State Analysis

### Three codebases with overlapping concerns

| Concern | CLI | Backend | Public SDK |
|---------|-----|---------|------------|
| Fee calculation (mgmt/perf/protocol) | vault.ts state machine | N/A | simulation/fees.ts (different approach) |
| Per-user fee distribution | vault.ts | N/A | N/A |
| APR computation | monthlyPerformance.ts | utils/apr.ts + VaultStateService | computeAPR() |
| PPS calculation | vault.ts | VaultUtils.convertToAssets | VaultUtils in v0-core |
| VPPS (with airdrops) | period-fee.ts | N/A | N/A |
| PPS interpolation at timestamp | N/A | getPriceReferenceAtTimestamp | N/A |
| Time-weighted APR | N/A | timeWeightAPRWithinAPeriod | N/A |
| Airdrop APR contribution | N/A | computeAprFromAirdrop | N/A |
| Event replay (state machine) | vault.ts + processEvents.ts | N/A | N/A |
| Point distribution | vault.ts + pointTracker.ts | N/A | N/A |
| Referral rewards/rebates | vault.ts | N/A | N/A |
| EOM interpolation | period-fee.ts + time.ts | N/A | N/A |
| Subgraph queries | fetchVaultEvents.ts | GqlClientProvider + Drizzle | N/A |
| On-chain reads | fetchVault.ts, fetchFeeRates.ts | ViemClientStore + v0-viem | v0-viem |
| Octav composition | N/A | CompositionService | N/A |
| Vault state from DB | N/A | VaultRepository (Drizzle) | N/A |

---

## 2. Architecture: What Goes Where

### Principle: Computation = SDK, Orchestration = Backend, I/O = Stays local

```
┌─────────────────────────────────────────────────────────┐
│                  @lagoon-protocol (public)               │
│  v0-core    v0-viem    v0-computation                    │
└────────┬──────────────────┬──────────────────────────────┘
         │                  │
┌────────▼──────────────────▼──────────────────────────────┐
│          lagoon-internal-sdk (private monorepo)           │
│                                                           │
│  ┌─────────────────────┐  ┌───────────────────────────┐  │
│  │ internal-computation │  │   internal-subgraph       │  │
│  │                     │  │                           │  │
│  │ Vault state machine │  │ Paginated subgraph        │  │
│  │ Fee distribution    │  │ queries (CLI + tools)     │  │
│  │ Event preprocessing │  │                           │  │
│  │ APR utilities       │  │ Configurable client       │  │
│  │ PPS/VPPS            │  │ factory                   │  │
│  │ Monthly performance │  │                           │  │
│  │ Time utilities      │  │ NOT used by backend       │  │
│  │ Point tracker       │  │ (backend has DB + own     │  │
│  │ Interpolation       │  │  subgraph access)         │  │
│  │ Constants (SSOT)    │  │                           │  │
│  │                     │  │                           │  │
│  │ Used by: CLI +      │  │ Used by: CLI only         │  │
│  │ Backend + tools     │  │                           │  │
│  └─────────────────────┘  └───────────────────────────┘  │
│                                                           │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│          vault-computation-cli (separate repo)            │
│                                                            │
│  Imports: internal-computation + internal-subgraph         │
│  Thin shell: arg parsing + CSV output + I/O               │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    Backend (NestJS)                        │
│                                                            │
│  Imports: @lagoon-protocol/internal-computation            │
│  Does NOT import: internal-subgraph (has own data layer)   │
│                                                            │
│  ┌──────────────────┐  ┌─────────────────────────────┐   │
│  │ VaultModule       │  │ FactsheetModule (NEW)       │   │
│  │ (existing)        │  │                             │   │
│  │ VaultRepository   │  │ FactsheetService            │   │
│  │ VaultStateService │  │  → gathers data from        │   │
│  │  → imports APR    │  │    existing services         │   │
│  │    utils from SDK │  │  → calls SDK computation     │   │
│  │                   │  │  → formats factsheet         │   │
│  │                   │  │  → generates PDF             │   │
│  └──────────────────┘  └─────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Package Structure

```
lagoon-internal-sdk/
├── package.json              # { "private": true, workspaces: ["packages/*"] }
├── tsconfig.json
├── packages/
│   ├── tsconfig.base.json    # Copied from sdk-v0
│   │
│   ├── computation/          # @lagoon-protocol/internal-computation
│   │   ├── package.json      # published as private npm package
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       │
│   │       │  # --- Extracted from CLI src/core/ ---
│   │       ├── vault.ts              # Vault state machine (NO I/O)
│   │       ├── user-account.ts       # UserAccount class
│   │       ├── rates-manager.ts      # RatesManager class
│   │       ├── point-tracker.ts      # PointTracker class
│   │       ├── monthly-performance.ts # MonthlyPerformanceTracker
│   │       ├── preprocess-events.ts  # Event normalization + sorting
│   │       ├── process-events.ts     # Pure orchestrator (accepts pre-fetched data)
│   │       ├── validation.ts         # strictBlockNumberMatching
│   │       ├── interpolation.ts      # interpolateEveryX
│   │       ├── airdrop.ts            # computeAirdropSum, VPPS helpers
│   │       │
│   │       │  # --- Extracted from backend src/utils/apr.ts ---
│   │       ├── apr-utils.ts          # extractOldestAndNewest, timeWeightAPR,
│   │       │                         # getPriceReferenceAtTimestamp,
│   │       │                         # computeAprFromAirdrop, isTimestampOlderThan
│   │       │
│   │       │  # --- Shared ---
│   │       ├── constants.ts          # BPS_DIVIDER, YEAR_IN_SECONDS (SSOT), DAY_IN_SECONDS
│   │       ├── time-utils.ts         # getEndOfMonthTimestamps
│   │       ├── wildcard.ts           # filterWildCard, isWildCard
│   │       └── types.ts              # All shared interfaces
│   │
│   └── subgraph/             # @lagoon-protocol/internal-subgraph
│       ├── package.json      # published as private npm package
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts
│           ├── client.ts             # createSubgraphClient(urls)
│           ├── pagination.ts         # fetchAll generic paginator
│           ├── types.ts              # Hand-written subgraph response types
│           └── queries/
│               ├── vault-events.ts   # Combined vault events query
│               ├── transfers.ts
│               ├── total-assets-updated.ts
│               ├── state-updateds.ts
│               └── airdrops.ts       # Lagoon API query
```

CLI (`vault-computation-cli`, separate repo) installs SDK via npm:
  "@lagoon-protocol/internal-computation": "^x.y.z"
  "@lagoon-protocol/internal-subgraph": "^x.y.z"

### Dependency Graph

```
@lagoon-protocol/v0-core (public, peer dep)
@lagoon-protocol/v0-computation (public, peer dep)
         │
         ▼
@lagoon-protocol/internal-computation    ← pure computation, NO I/O
         │
    ┌────┴────────────────┐
    ▼                     │
internal-subgraph         │              ← data fetching for CLI/tools
    │                     │
    ▼                     ▼
  CLI (separate repo)   Backend (separate repo)
  installs via npm      installs via npm
```

---

## 4. What Moves Where — Detailed Migration Map

### From CLI → internal-computation (pure, no I/O)

| CLI Source | SDK Target | Changes |
|-----------|------------|---------|
| `src/core/vault.ts` | `vault.ts` | Remove I/O methods (`generateVault`, `testSupply`, `balanceOf`, `rightTotalSupply`). Replace `@morpho-org/blue-sdk` with `v0-core` MathLib. |
| `src/core/userAccount.ts` | `user-account.ts` | As-is |
| `src/core/rates.ts` | `rates-manager.ts` | As-is |
| `src/core/pointTracker.ts` | `point-tracker.ts` | As-is |
| `src/core/monthlyPerformance.ts` | `monthly-performance.ts` | Replace `SharesMath.toAssets` with `VaultUtils.convertToAssets` |
| `src/core/preprocessEvents.ts` | `preprocess-events.ts` | Replace codegen types with hand-written interfaces |
| `src/core/processEvents.ts` | `process-events.ts` | Accept pre-fetched events + vault state as params (no fetch calls) |
| `src/core/strictBlockNumberMatching.ts` | `validation.ts` | As-is |
| `src/core/types.ts` | `types.ts` | Consolidate + add generic interfaces |
| `src/utils/constants.ts` | `constants.ts` | YEAR_IN_SECONDS = 31,557,600 (SSOT) |
| `src/utils/time.ts` | `time-utils.ts` | As-is |
| `src/utils/various.ts` | `wildcard.ts` | As-is |
| `src/cli/interpolate.ts` (pure fn) | `interpolation.ts` | Extract `interpolateEveryX` |
| `src/cli/period-fee.ts` (pure fn) | `airdrop.ts` | Extract `computeAirdropSum` |

### From Backend → internal-computation (DRY)

| Backend Source | SDK Target | Changes |
|---------------|------------|---------|
| `src/utils/apr.ts` → `extractOldestAndNewestEvent` | `apr-utils.ts` | Already generic |
| `src/utils/apr.ts` → `timeWeightAPRWithinAPeriod` | `apr-utils.ts` | Already pure |
| `src/utils/apr.ts` → `getPriceReferenceAtTimestamp` | `apr-utils.ts` | Generalize to `PeriodSummaryLike[]` interface |
| `src/utils/apr.ts` → `computeAprFromAirdrop` | `apr-utils.ts` | Generalize to `AirdropLike` interface |
| `src/utils/apr.ts` → `isTimestampOlderThan` | `apr-utils.ts` | As-is |
| `src/utils/apr.ts` → `assertPeriodSummary` | **Stays in backend** | Backend-specific type guard |

### From CLI → internal-subgraph

| CLI Source | SDK Target |
|-----------|------------|
| `src/utils/fetchAll.ts` | `pagination.ts` |
| `src/utils/fetchVaultEvents.ts` | `queries/vault-events.ts` |
| `src/utils/fetchVaultTotalAssetsUpdated.ts` | `queries/total-assets-updated.ts` |
| `src/utils/fetchVaultStateUpdateds.ts` | `queries/state-updateds.ts` |
| `src/utils/fetchTransfer.ts` | `queries/transfers.ts` |
| `src/utils/fetchAirdrops.ts` | `queries/airdrops.ts` |

### Stays in CLI (I/O, arg parsing, formatting)

- `index.ts`, `src/cli/*.ts`, `src/parsing/*.ts`, `src/lib/publicClient.ts`, `src/environnement.ts`
- `src/utils/fetchVault.ts`, `fetchFeeRates.ts`, `fetchFeeCooldown.ts` (on-chain reads — migrate to `v0-viem`)

### Stays in Backend (NestJS orchestration, DB, API)

- `src/vault/services/state.service.ts` — calls SDK for pure computation
- `src/vault/vault.repository.ts` — Drizzle queries
- `src/composition/` — Octav API integration

---

## 5. Type Generalization Strategy

Define minimal interfaces in internal-computation that both CLI and backend can satisfy:

```typescript
// types.ts — SDK interfaces
interface EventBase {
  blockNumber: bigint;
  blockTimestamp: bigint;
  logIndex: number;
}

interface PeriodSummaryLike {
  timestamp: number | bigint;
  totalAssetsAtStart: bigint;
  totalSupplyAtStart: bigint;
  totalAssetsAtEnd: bigint;
  netTotalSupplyAtEnd: bigint;
  duration: number | bigint;
}

interface AirdropLike {
  name: string;
  ppsIncrease: number;
  startTimestamp: number;
  endTimestamp: number;
}
```

CLI maps its codegen types to these (structurally compatible). Backend maps its `Transaction & { data: PeriodSummary }` to `PeriodSummaryLike`.

---

## 6. Backend Integration

### How backend uses the SDK

```typescript
// backend/src/vault/services/state.service.ts (AFTER migration)
import {
  timeWeightAPRWithinAPeriod,
  computeAprFromAirdrop,
  getPriceReferenceAtTimestamp,
  type PeriodSummaryLike,
} from '@lagoon-protocol/internal-computation';

// Map backend model → SDK interface
function toPeriodSummaryLike(tx: Transaction & { data: PeriodSummary }): PeriodSummaryLike {
  return {
    timestamp: Number(tx.timestamp),
    totalAssetsAtStart: tx.data.totalAssetsAtStart,
    totalSupplyAtStart: tx.data.totalSupplyAtStart,
    totalAssetsAtEnd: tx.data.totalAssetsAtEnd,
    netTotalSupplyAtEnd: tx.data.netTotalSupplyAtEnd,
    duration: Number(tx.data.duration),
  };
}
```

### Backend Factsheet Module (new, future)

```
src/factsheet/
  factsheet.module.ts         # NestJS module
  factsheet.service.ts        # Orchestrates: gather data → SDK computation → output
  factsheet.resolver.ts       # GraphQL endpoint
  models/factsheet.model.ts   # Output types
  generators/pdf.generator.ts # PDF rendering (future)
```

---

## 7. Implementation Phases

### Repos & Branches
- **SDK**: `lagoon-internal-sdk` — work on `main` (new repo)
- **CLI**: `vault-computation-cli` — branch `feature/consume-internal-sdk` off `origin/main`
- **Backend**: `backend` — branch `feature/consume-internal-sdk` off `origin/main`

### Phase 1: Scaffold SDK + Extract Computation (SDK repo)

1. Scaffold monorepo: `package.json`, `tsconfig.json`, `packages/tsconfig.base.json`
2. Create `@lagoon-protocol/internal-computation` package:
   - Move CLI `src/core/` modules (vault state machine, rates, userAccount, pointTracker, etc.)
   - Strip I/O from Vault class, replace `@morpho-org/blue-sdk` with `v0-core` MathLib
   - Move backend `src/utils/apr.ts` pure functions (generalize types)
   - Add constants, time utils, interpolation, wildcard, airdrop helpers
   - Define shared type interfaces (`PeriodSummaryLike`, `AirdropLike`, `EventBase`)
3. Write tests (vitest) before any consumer depends on SDK
4. Verify `bun run build` produces CJS + ESM + .d.ts

### Phase 2: Create internal-subgraph (SDK repo)

1. Create `@lagoon-protocol/internal-subgraph` package
2. Move paginated subgraph queries from CLI
3. Create configurable client factory (no hardcoded env vars)
4. Hand-write GraphQL response types
5. Move Lagoon API airdrop query
6. Write tests

### Phase 3: Publish SDK to npm (private)
**Must happen BEFORE Phase 4 and 5 — consumers need published packages**

1. Configure npm publish scripts (same pattern as public SDK)
2. Publish `@lagoon-protocol/internal-computation` to npm (private/restricted)
3. Publish `@lagoon-protocol/internal-subgraph` to npm (private/restricted)
4. Verify packages are installable from npm

### Phase 4: Update CLI to Consume SDK (CLI repo)
**Branch: `feature/consume-internal-sdk` off `origin/main`**

1. Add SDK packages as dependencies
2. Replace `src/core/` imports with `@lagoon-protocol/internal-computation`
3. Replace `src/utils/fetch*` imports with `@lagoon-protocol/internal-subgraph`
4. Remove migrated code from CLI
5. Verify all 7 CLI commands produce identical output
6. PR to main

### Phase 5: Update Backend to Consume SDK (Backend repo)
**Branch: `feature/consume-internal-sdk` off `origin/main`**

1. Add `@lagoon-protocol/internal-computation` as dependency
2. Replace `src/utils/apr.ts` pure functions with SDK imports
3. Add type mapping (`Transaction` → `PeriodSummaryLike`)
4. Verify backend tests pass
5. PR to main

### Phase 6: Backend Factsheet Module (Backend repo, ongoing)

1. Create `src/factsheet/` NestJS module
2. `FactsheetService` uses SDK computation + backend data services
3. Add new metrics to SDK: Sharpe ratio, max drawdown, volatility
4. Define `FactsheetData` model, GraphQL endpoint
5. PDF generation (later)

---

## 8. Verification Plan

| Phase | Verification |
|-------|-------------|
| 1 | Backend tests pass. APR results identical before/after. |
| 2 | SDK unit tests pass. CLI produces byte-identical CSV output. |
| 3 | CLI produces byte-identical CSV with new subgraph package. |
| 4 | CLI produces byte-identical CSV output. All 7 commands tested. |
| 5 | Backend tests pass. APR results identical before/after. |
| 6 | Factsheet endpoint returns expected data for test vaults. |

```bash
# Regression: capture reference outputs before migration
bun run period-fee 1:0x... --from-block X --to-block Y > reference_pf.csv
bun run user-fee 1:0x... --from-block X --to-block Y > reference_uf.csv

# After migration: diff
diff reference_pf.csv <(bun run period-fee 1:0x... --from-block X --to-block Y)
```

---

## 9. Summary of All Decisions

| Decision | Choice |
|----------|--------|
| SDK scope | CLI-only computations first, factsheet metrics later |
| NPM scope | `@lagoon-protocol/internal-*` (private on npm) |
| Repo strategy | Standalone monorepo for SDK |
| CLI location | Separate repo, consumes SDK via npm |
| Backend location | Separate repo, consumes SDK via npm |
| Distribution | Private npm packages — **must publish before CLI/backend can consume** |
| YEAR_IN_SECONDS | `31,557,600` (365.25 days). Smart contracts + public SDK have a bug to fix. |
| Branch strategy | SDK: `main`. CLI + Backend: `feature/consume-internal-sdk` off `origin/main`. |
