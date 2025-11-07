# Napier Partner Points Integration

This implementation helps partners calculate user exposure across Napier markets for points integration by computing underlying token balances from PT, YT, and LP positions.

## Overview

This tool fetches data from Napier markets to calculate user balances for yield tokens (YT) and liquidity provider (LP) tokens, converting them to their underlying token value. The results are exported to CSV files for points calculation.

## Exposure Types

| Token Type | Points Eligible | Description |
|------------|----------------|-------------|
| **PT (Principal Token)** | ❌ No | Holds underlying tokens, no points |
| **YT (Yield Token)** | ✅ Yes | Points from share of underlying in PT |
| **LP (Liquidity)** | ✅ Yes | Points from entire LP or non-PT portion |

## Methodology

The script follows these steps:

1. **Preparation**: Fetch market details for specified Napier markets using subgraph data
2. **Data Collection**: Get user balances for YT and LP tokens at specified block
3. **Exposure Calculation**: Convert YT and LP token balances to underlying token value
4. **Balance Aggregation**: Calculate user shares across all markets
5. **Export**: Generate CSV files with user exposures for points calculation

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

Edit `src/configuration.ts` to set your market parameters:

```typescript
export const configuration = {
  chainId: 1,                              // Blockchain network ID
  markets: [
    '0x8eb9f9e97d6a63aab7572ad0d96fa3f09255cce9', // Add your PT addresses
    // Add more PT addresses...
  ],
  blockNumber: undefined,                    // Optional: Use specific block (undefined = latest)
};
```

**Configuration Options:**
- `chainId`: Blockchain network ID (1 = Ethereum, etc.)
- `markets`: Array of Principal Token (PT) addresses to track
- `blockNumber`: Block number for snapshot (undefined = latest data)

### Environment Setup

For development with Tenderly RPC, create `.env`:

```bash
# Development Environment
NODE_ENV=development
RPC_URL=https://your-tenderly-rpc-url
BACKEND_URL=https://api-dev.napier.finance/v1/subgraph/napier-v2
```

For production, omit `.env` file or set `NODE_ENV=production`.

### Running the Script

```bash
# Run the integration script
pnpm ts src/index.ts
```

This generates three CSV files:
- `user_balances_yt.csv` - YT exposures
- `user_balances_lp_non_pt.csv` - LP non-PT exposures
- `user_balances_lp.csv` - LP full exposures

## Output Format

Each CSV file contains three columns:

- `market_address`: Principal Token (PT) contract address
- `user_address`: User wallet address
- `balance`: Balance in underlying token value

**Example CSV:**
```csv
market_address,user_address,balance
0x8eb9f9e97d6a63aab7572ad0d96fa3f09255cce9,0x002ee33092457900515a4249e3ec1cd2b2dc8c32,10936875567605149077355
0x8eb9f9e97d6a63aab7572ad0d96fa3f09255cce9,0x0105b8006f62190fd4b8b8ef1ec0f1fcfdcbfb4d,14532009546707763330499
```

## Integration Steps

### 1. Market Preparation
- Access your Curator Dashboard
- Verify your account and create markets
- Note the PT addresses for your markets

### 2. Configuration Setup
- Add PT addresses to `src/configuration.ts`
- Set appropriate `chainId` for your network
- Configure `blockNumber` if needed (undefined for latest)

### 3. Execute Integration
```bash
pnpm ts src/index.ts
```

### 4. Verification
Verify results using these constraints:
- **YT positions**: Total underlying ≤ `underlying.balanceOf(PT)` for each market
- **LP positions**: Total underlying ≤ `underlyingBalanceOf(LP)` for each market

### 5. Stop Tracking
Stop tracking after market maturity - matured PT no longer generates points.

### 6. User Notification
Display the points program in your UI and notify users about:
- Which markets are eligible for points
- How points are calculated based on exposures
- When tracking stops (maturity)

## Advanced Features

### Block Number Support
- **Development**: `blockNumber: undefined` → Uses latest blockchain state
- **Production**: `blockNumber: 22160745` → Uses historical snapshot
- **Flexible**: Works universally across development and production environments

### Multi-Market Support
- Track unlimited markets simultaneously
- Each record includes market address for attribution
- Automatic balance aggregation per user across all markets

### Environment Flexibility
- **Development**: Uses dev subgraph with additional fields (`poolId`, `poolType`)
- **Production**: Uses production subgraph with core fields
- **Type-safe**: Full TypeScript support with proper error handling

## Troubleshooting

### Common Issues
1. **TypeScript errors**: Ensure all function signatures use `number | undefined` for blockNumber
2. **No data found**: Check that PT addresses exist and are accessible
3. **RPC errors**: For development, ensure Tenderly RPC is accessible
4. **Empty CSV files**: Verify markets have active users with balances

### Debug Mode
Run with verbose logging to see detailed processing:
```bash
DEBUG=1 pnpm ts src/index.ts
```

## Support

For integration support and questions:
- Check the [Napier Documentation](https://docs.napier.finance/curate/napier-curation/manage-market/partner-points-integration)
- Review market details in your Curator Dashboard
- Verify contract addresses on blockchain explorers
