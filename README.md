# Fees Computation CLI

A command-line tool for computing and analyzing fees across multiple blockchain networks (Ethereum, Base, Arbitrum, and Avalanche). This tool helps track and analyze fee distributions, referral rewards, and rebates for vaults.

## Features

- Multi-chain support (Ethereum, Base, Arbitrum, Avalanche)
- Fee computation and analysis
- Referral reward tracking
- Fee rebate calculations
- OTC (Over-The-Counter) deals support
- CSV report generation
- Block range analysis
- Fee receiver transfer tracking

## Prerequisites

- Bun runtime (v1.0.0 or higher)
- Access to blockchain RPC endpoints

### Installing Bun

1. Install Bun using curl (macOS and Linux):

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Or using npm:

```bash
npm install -g bun
```

3. Verify the installation:

```bash
bun --version
```

For Windows users, Bun can be installed using WSL (Windows Subsystem for Linux) or through the official installer from [bun.sh](https://bun.sh).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fees-computation-cli.git
cd fees-computation-cli
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory with your RPC URLs:

```env
RPC_URL_1=https://eth-mainnet.g.alchemy.com/v2/your-api-key
RPC_URL_8453=https://mainnet.base.org
RPC_URL_42161=https://arb-mainnet.g.alchemy.com/v2/your-api-key
RPC_URL_43114=https://api.avax.network/ext/bc/C/rpc
```

## Available Commands

### Find Blocks

```bash
bun run find-blocks <chainId:VaultAddress> [options]
```

Identifies blocks where fee distributions and fee receiver transfers occurred for a specific vault. This command helps determine the block range for fee computation by showing:

- Blocks with total assets updates
- Blocks with fee receiver transfers
- All events in chronological order with timestamps

### User Fee

```bash
bun run user-fee <chainId:VaultAddress> [options]
```

Generates comprehensive fee reports per user for a vault, calculating:

- User balances
- Fee amounts
- Referral rewards
- Fee rebates
- Price per share

### User Points

```bash
bun run user-points <chainId:VaultAddress> [options]
```

Calculates and distributes points to shareholders proportionally based on their holdings. Points are distributed according to a time series specified in a CSV file.

Required options:

- `--points <string>`: CSV file with point evolution data (format: timestamp,amount,name)

### Find Claimable Controllers

```bash
bun run find-claimable-controllers <chainId:VaultAddress> [options]
```

Identifies all controllers (users) who have made deposit requests on the vault and haven't cancelled them. Useful for getting the arguments for the `claimSharesOnBehalf()` function.

### Period Fee

```bash
bun run period-fee <chainId:VaultAddress> [options]
```

Generates detailed fee reports for specific periods between totalAssets updates. The report includes:

- Management fees
- Performance fees
- Management and performance rates
- Price per share
- Timestamps for each period

### Interpolate

```bash
bun run interpolate <csv file> [options]
```

Performs linear interpolation on a CSV file containing time series points, generating intermediate points at specified intervals.

## Claimable deposits addresses

Find addresses on a vault that have claimable deposits.

```bash
bun run find-claimable-controllers <chainId>:<vaultAddress> --from-block <number> [options]
```

Examples:

```bash
# Basic usage looks since vault inception block
bun run find-claimable-controllers 1:0x07ed467acd4ffd13023046968b0859781cb90d9b

# Using from block
bun run find-claimable-controllers 1:0x07ed467acd4ffd13023046968b0859781cb90d9b --from-block 1000000

```

### Output

The command returns a list of addresses — these are the controller (user) addresses that still have unclaimed shares in the specified vault.

#### Example Output

```text
[
  "0xAbC123...def",
  "0x456DeF...789",
  "0x789abc...123"
]
```

#### Usage Example in Smart Contract Interaction

This list can be used directly as input to the Vault smart contract function:

```solidity
claimSharesOnBehalf(address[] controllers)
```

You can pass this list of addresses as an argument to `claimSharesOnBehalf()` in order to trigger the claiming process on behalf of these users.

Make sure the caller has permission to claim on behalf of these addresses.

## Compute Fees

Calculate fees for a specific vault within a block range:

```bash
bun run compute <chainId>:<vaultAddress> --from-block <number> --to-block <number> [options]
```

Options:

- `-r, --readable`: Format output in human-readable format
- `-o, --output <string>`: Output file path for CSV report
- `-d, --deals <string>`: Path to OTC deals configuration file
- `--fee-rebate-rate <number>`: Bips of fees to refund to referred users (default: 500)
- `--fee-reward-rate <number>`: Bips of fees to distribute to referrers (default: 1500)

Examples:

```bash
# Basic usage with block range
bun run user-fee 1:0x07ed467acd4ffd13023046968b0859781cb90d9b --from-block 1000000 --to-block 2000000

# With readable output and CSV export
bun run user-fee 1:0x07ed467acd4ffd13023046968b0859781cb90d9b --from-block 1000000 --to-block 2000000 -r -o fees.csv

# With OTC deals and custom fee rates
bun run user-fee 1:0x07ed467acd4ffd13023046968b0859781cb90d9b --from-block 1000000 --to-block 2000000 -d deals.csv --fee-rebate-rate 1000 --fee-reward-rate 2000
```

## Find Blocks

Find blocks containing nav updates and fee receiver transfers:

```bash
bun run find-blocks <chainId>:<vaultAddress> --from-block <number> --to-block <number>
```

This command will show you:

- All blocks where nav update occurred
- All blocks where fee receiver transfers occurred
- Events are displayed in chronological order

Example:

```bash
bun run find-blocks 1:0x07ed467acd4ffd13023046968b0859781cb90d9b --from-block 1000000 --to-block 2000000
```

Output example:

```
From 1000000

Events in chronological order:
1000001 - Fee distribution
1000001 - Fee receiver transfer
1000002 - Fee distribution
1000004 - Fee receiver transfer
1000007 - Fee receiver transfer

To 1001000
```

### OTC Deals Format

The OTC deals file should be a CSV with the following format:

```csv
chainId,vault,ownerAddress,dealPercentage
1,0x123...,0x456...,800
8453,0x789...,0xabc...,500
```

- `chainId`: Network chain ID (1 for Ethereum, 8453 for Base, etc.)
- `vault`: Address of the vault
- `ownerAddress`: Address of the deal owner
- `dealPercentage`: Deal percentage in basis points (e.g., 800 for 8%)

If you put chainId 0 and vault 0x0 for a deal, it is considered as a wildcard and the tool will use it for all chains.
Any other value will be used for the specific chain.

# Project Structure

```
src/
├── abis/         # Contract ABIs
├── cli/          # Command-line interface
├── core/         # Core business logic
├── gql/          # GraphQL queries
├── lib/          # Shared libraries
├── parsing/      # Data parsing utilities
├── tests/        # Test files
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Development

### Running Tests

```bash
bun test
```

## License

MIT
