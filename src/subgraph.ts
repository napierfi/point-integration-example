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
    };
  });
}

export type MarketDetails = {
  ptAddress: string;
  ytAddress: string;
  lpAddress: string;
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
      ) {
        id
        token {
          id
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
    };
  });
}

export type UserBalance = {
  tokenAddress: string;
  accountAddress: string;
  balance: bigint;
};
