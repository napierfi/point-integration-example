import { config } from 'dotenv';
import request, { gql } from 'graphql-request';
import { baseUrl, isDev } from './constant';
config();

export async function getMarketDetails(
  chainId: number,
  markets: string[],
  _blockNumber: number | undefined,
): Promise<MarketDetails[]> {
  const url = `${baseUrl}/${chainId}`;

  // Build dynamic query based on environment and blockNumber
  const buildQuery = (withBlock: boolean) => {
    const devFields = isDev ? `
              poolId
              poolType` : '';

    const blockFilter = withBlock ? `
            block: { number: $blockNumber }` : '';

    const blockVariable = withBlock ? `
        query getMarketDetails($markets: [ID!], $blockNumber: BigInt) {` : `
        query getMarketDetails($markets: [ID!]) {`;

    return gql`
        ${blockVariable}
          principals(
            where: { id_in: $markets }
            ${blockFilter}
          ) {
            id
            yieldToken {
              id
            }
            targetToken {
              id
            }
            pool {
              id
              ${devFields}
              poolToken {
                id
              }
            }
          }
        }
      `;
  };

  let data: any;
  if (_blockNumber) {
    // Use block filter when blockNumber is provided (works for both dev and prod)
    const queryWithBlock = buildQuery(true);
    data = await request(url, queryWithBlock, { markets, blockNumber: _blockNumber });
  } else {
    // Use latest data when no blockNumber (works for both dev and prod)
    const latestQuery = buildQuery(false);
    data = await request(url, latestQuery, { markets });
  }
  return data.principals.map((principal: any) => ({
    ptAddress: principal.id,
    ytAddress: principal.yieldToken.id,
    lpAddress: principal.pool.poolToken.id,
    poolAddress: principal.pool.id,
    underlyingAddress: principal.targetToken.id,
    poolType: principal.pool.poolType || 'CURVE_TWO_CRYPTO', // Default for production
    poolId: principal.pool.poolId, // Only available in dev subgraph
  }));
}

export async function getUserWithBalancesForTokens(
  chainId: number,
  tokens: string[],
  _blockNumber: number | undefined,
): Promise<UserBalance[]> {
  const url = `${baseUrl}/${chainId}`;

  // Build dynamic query with optional block filter
  const buildQuery = (withBlock: boolean) => {
    const blockFilter = withBlock ? `
        block: { number: $blockNumber }` : '';

    const blockVariable = withBlock ? `
        query getUserWithBalancesForTokens($tokens: [String], $blockNumber: BigInt!) {` : `
        query getUserWithBalancesForTokens($tokens: [String]) {`;

    return gql`
        ${blockVariable}
          accountTokens(
            where: { token_in: $tokens, balance_gt: 0 }
            first: 1000
            skip: 0
            ${blockFilter}
          ) {
            id
            token {
              id
              type
            }
            account {
              id
            }
            balance
          }
        }
      `;
  };

  if (_blockNumber) {
    // Use block filter when blockNumber is provided
    const queryWithBlock = buildQuery(true);
    const data: any = await request(url, queryWithBlock, { tokens, blockNumber: _blockNumber });
    return data.accountTokens.map((accountToken: any) => ({
      tokenAddress: accountToken.token.id,
      accountAddress: accountToken.account.id,
      balance: BigInt(accountToken.balance),
      type: accountToken.token.type,
    }));
  } else {
    // Use latest data when no blockNumber
    const latestQuery = buildQuery(false);
    const data: any = await request(url, latestQuery, { tokens });
    return data.accountTokens.map((accountToken: any) => ({
      tokenAddress: accountToken.token.id,
      accountAddress: accountToken.account.id,
      balance: BigInt(accountToken.balance),
      type: accountToken.token.type,
    }));
  }
}

// Types
export type PoolType = 'CURVE_TWO_CRYPTO' | 'TOKI_HOOK';

export type MarketDetails = {
  ptAddress: string;
  ytAddress: string;
  lpAddress: string;
  poolAddress: string;
  underlyingAddress: string;
  poolType: PoolType;
  poolId?: string; // Only for TOKI_HOOK pools
};

export type UserBalance = {
  tokenAddress: string;
  accountAddress: string;
  balance: bigint;
  type: 'PT' | 'YT' | 'LP' | 'TARGET' | 'UNKNOWN';
};
