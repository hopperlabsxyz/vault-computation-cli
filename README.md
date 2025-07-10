# Vault Computation CLI

A command-line tool for computing lagoon v0 vault data on multiple blockchain networks (Ethereum, Base, Arbitrum, and Avalanche).

## Features

- Multi-chain support (Ethereum, Base, Arbitrum, Avalanche)
- Fee computation and analysis
- Referral reward tracking
- Fee rebate calculations
- OTC (Over-The-Counter) deals support
- CSV report generation
- Points repartition
- Points interpolation
- Fee receiver transfer tracking
- User balance tracking

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
git clone https://github.com/hopperlabsxyz/fees-computation-cli.git
cd fees-computation-cli
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory with your RPC URLs and subgraph URLs:

```env
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key
BASE_RPC_URL=https://mainnet.base.org
AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc
MAINNET_SUBGRAPH_URL=
BASE_SUBGRAPH_URL=
```

## Available Commands

You can list all available commands by running:

```bash
bun run help
```

### User Balance

```bash
bun run user-balance <chainId:VaultAddress> [options]
```

Generates a balance report for a specified vault, including all users balance.

Required options:

- `--to-block <number>`: Ending block number for fee computation (inclusive). Use 'find-blocks' command to find the appropriate block number
- `-o, --output`: Will save the result in output/user-balance in a csv file with following name: <chainId>-<vaultAddress>-<to-block>.csv
- `--silent`: This will prevent the printing of the output on stdout

To know more:

```bash
bun run user-balance --help
```

### Find Blocks

```bash
bun run find-blocks <chainId:VaultAddress> [options]
```

Identifies blocks where fee distributions and fee receiver transfers occurred for a specific vault. This command helps determine the block range for fee computation by showing:

- Blocks with total assets updates
- Blocks with fee receiver transfers
- All events in chronological order with timestamps

To know more:

```bash
bun run find-blocks --help
```

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

To know more:

```bash
bun run user-fee --help
```

### User Points

```bash
bun run user-points <chainId:VaultAddress> [options]
```

Calculates and distributes points to shareholders proportionally based on their holdings. Points are distributed according to a time series specified in a CSV file.

Required options:

- `--points <string>`: CSV file with point evolution data (format: timestamp,amount,name)

To know more:

```bash
bun run user-points --help
```

### Find Claimable Controllers

```bash
bun run find-claimable-controllers <chainId:VaultAddress> [options]
```

Identifies all controllers (users) who have made deposit requests on the vault and haven't cancelled them. Useful for getting the arguments for the `claimSharesOnBehalf()` function.

To know more:

```bash
bun run find-claimable-controllers --help
```

#### Usage Example in Smart Contract Interaction

This list can be used directly as input to the Vault smart contract function:

```solidity
claimSharesOnBehalf(address[] controllers)
```

You can pass this list of addresses as an argument to `claimSharesOnBehalf()` in order to trigger the claiming process on behalf of these users.

Make sure the caller has the permission to claim on behalf of these addresses.

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

To know more:

```bash
bun run period-fee --help
```

### Interpolate

```bash
bun run interpolate <csv file> [options]
```

Performs linear interpolation on a CSV file containing time series points, generating intermediate points at specified intervals.

To know more:

```bash
bun run interpolate --help
```

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
