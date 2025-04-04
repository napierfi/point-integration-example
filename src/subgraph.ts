import request, { gql } from 'graphql-request';

const baseApiUrl = `https://api-v2.napier.finance/v1/subgraph/napier-v2`;

export async function getMarketDetails(
  chainId: number,
  markets: string[],
  blockNumber: number,
): Promise<MarketDetails[]> {
  const url = `${baseApiUrl}/${chainId}`;
  const query = gql`
    query getMarketDetails($markets: [ID!], $blockNumber: Int!) {
      principals(where: { id_in: $markets }, block: { number: $blockNumber }) {
        id
        yieldToken {
          id
        }
        targetToken {
          id
        }
        pool {
          poolToken {
            id
          }
        }
      }
    }
  `;

  const data: any = await request(url, query, { markets, blockNumber });
  return data.principals.map((principal: any) => {
    return {
      ptAddress: principal.id,
      ytAddress: principal.yieldToken.id,
      lpAddress: principal.pool.poolToken.id,
      underlyingAddress: principal.targetToken.id,
    };
  });
}

export type MarketDetails = {
  ptAddress: string;
  ytAddress: string;
  lpAddress: string;
  underlyingAddress: string;
};

export async function getUserWithBalancesForTokens(
  chainId: number,
  tokens: string[],
  blockNumber: number,
): Promise<UserBalance[]> {
  const url = `${baseApiUrl}/${chainId}`;
  const query = gql`
    query getUserWithBalancesForTokens($tokens: [ID!], $blockNumber: Int!) {
      accountTokens(
        where: { token_in: $tokens, balance_gt: 0 }
        block: { number: $blockNumber }
        first: 1000
        skip: 0
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
  const data: any = await request(url, query, { tokens, blockNumber });
  return data.accountTokens.map((accountToken: any) => {
    return {
      tokenAddress: accountToken.token.id,
      accountAddress: accountToken.account.id,
      balance: BigInt(accountToken.balance),
      type: accountToken.token.type as TokenType,
    };
  });
}

export type UserBalance = {
  tokenAddress: string;
  accountAddress: string;
  balance: bigint;
  type: TokenType;
};

type TokenType = 'PT' | 'YT' | 'LP' | 'TARGET' | 'UNKNOWN';
