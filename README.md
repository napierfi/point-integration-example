# Underlying Balance Tracker Example

This is an example implementation showing how to track underlying token balances across Napier markets by calculating user positions from YT and LP holdings.

## Overview

This example demonstrates how to fetch data from Napier markets to calculate user balances for LP and YT tokens, converting them to their underlying token value. The results are exported to a CSV file for analysis.

## Methodology

The script follows these steps:

1. Fetches market details for specified Napier markets using subgraph data
2. Gets user balances for LP and YT tokens at a specific block number
3. Converts LP and YT token balances to their underlying token value
4. Aggregates total underlying value per user across all markets
5. Exports user balances to a CSV file with address and underlying balance columns

## Usage

### Prerequisites

- Node.js
- pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

### Configuration

Edit the configuration variables in `src/index.ts` to set:

- `markets`: Array of Napier market addresses to track
- `chainId`: The blockchain network ID
- `blockNumber`: The specific block to analyze

### Running the Script

```bash
pnpm ts src/index.ts
```

This will generate a `user_balances.csv` file containing addresses and their corresponding underlying token balances.

## Output

The generated CSV file contains two columns:

- `address`: User wallet address
- `balance`: Balance in underlying token value

## Verification

You can verify the results by checking two constraints:

1. For YT positions: The total underlying value should not exceed `underlying.balanceOf(PT)` for each market
2. For LP positions: The total underlying value should not exceed `underlyingBalanceOf(LP)` for each market

These constraints ensure the calculated balances stay within the actual underlying tokens locked in the protocol.
