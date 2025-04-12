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

## Usage

### Claimable deposits addresses

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


### Compute Fees

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
bun run compute 1:0x07ed467acd4ffd13023046968b0859781cb90d9b --from-block 1000000 --to-block 2000000

# With readable output and CSV export
bun run compute 1:0x07ed467acd4ffd13023046968b0859781cb90d9b --from-block 1000000 --to-block 2000000 -r -o fees.csv

# With OTC deals and custom fee rates
bun run compute 1:0x07ed467acd4ffd13023046968b0859781cb90d9b --from-block 1000000 --to-block 2000000 -d deals.csv --fee-rebate-rate 1000 --fee-reward-rate 2000
```

### Find Blocks

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

## Project Structure

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
