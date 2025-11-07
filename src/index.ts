import fs from 'fs';
import { getMarketDetails, getUserWithBalancesForTokens } from './subgraph';
import {
  getYtTotalSupplyMap,
  getYtUnderlyingMap,
  getLpTotalSupplyMap,
  getLpNonPtUnderlyingMap,
  getLpFullUnderlyingMap
} from './contract';
import { validatePools } from './types/pools';
import { config } from './constant';

async function main() {
  const { chainId, markets, blockNumber } = config;

  console.log(`🚀 Point Integration (${config.isDev ? 'Dev' : 'Prod'})`);
  console.log(`   Chain: ${chainId} | Block: ${blockNumber || 'latest'} | Markets: ${markets.length}`);

  // Get market details and validate
  const marketDetails = await getMarketDetails(chainId, markets, blockNumber);
  const validPools = validatePools(marketDetails);

  // Show pool summary
  const curvePools = validPools.filter(p => p.poolType === 'CURVE_TWO_CRYPTO');
  const tokiPools = validPools.filter(p => p.poolType === 'TOKI_HOOK');
  console.log(`   Pools: ${validPools.length} (Curve: ${curvePools.length}, TokiHook: ${tokiPools.length})`);

  // Get user balances
  const userWithBalances = await getUserWithBalancesForTokens(
    chainId,
    validPools.flatMap(p => [p.ytAddress, p.lpAddress]),
    blockNumber,
  );

  // Calculate all balances using existing working functions
  const [
    ytTotalSupply,
    ytUnderlying,
    lpTotalSupply,
    lpNonPtUnderlying,
    lpFullUnderlying
  ] = await Promise.all([
    getYtTotalSupplyMap(chainId, validPools, blockNumber),
    getYtUnderlyingMap(chainId, validPools, blockNumber),
    getLpTotalSupplyMap(chainId, validPools, blockNumber),
    getLpNonPtUnderlyingMap(chainId, validPools, blockNumber),
    getLpFullUnderlyingMap(chainId, validPools, blockNumber)
  ]);

  const balances = {
    ytTotalSupply,
    lpTotalSupply,
    ytUnderlying,
    lpNonPtUnderlying,
    lpFullUnderlying
  };

  // Calculate user shares
  const userShares = calculateUserShares(userWithBalances, balances, validPools);

  // Export results
  exportCsv(userShares.yt, 'user_balances_yt.csv', 'YT');
  exportCsv(userShares.lpNonPt, 'user_balances_lp_non_pt.csv', 'LP Non-PT');
  exportCsv(userShares.lpFull, 'user_balances_lp.csv', 'LP Full');

  console.log('\n✅ Complete!');
  console.log(`   Markets: ${validPools.length} | YT Records: ${Object.keys(userShares.yt).length} | LP Records: ${Object.keys(userShares.lpFull).length}`);

  function calculateUserShares(userWithBalances: { balance: bigint; type: string; tokenAddress: string; accountAddress: string }[], balances: any, pools: any[]) {
    const result = {
      yt: {} as Record<string, {market_address: string, user_address: string, balance: bigint}[]>,
      lpNonPt: {} as Record<string, {market_address: string, user_address: string, balance: bigint}[]>,
      lpFull: {} as Record<string, {market_address: string, user_address: string, balance: bigint}[]>
    };

    // Create token address to pool mapping
    const tokenToPool = pools.reduce((acc, pool) => {
      acc[pool.ytAddress] = pool;
      acc[pool.lpAddress] = pool;
      return acc;
    }, {} as Record<string, any>);

    userWithBalances.filter(b => b.type === 'YT').forEach(userBalance => {
      const pool = tokenToPool[userBalance.tokenAddress];
      if (!pool) return;

      const totalSupply = balances.ytTotalSupply[userBalance.tokenAddress] || 0n;
      const totalUnderlying = balances.ytUnderlying[userBalance.tokenAddress] || 0n;
      if (totalSupply > 0n && totalUnderlying > 0n) {
        const share = (userBalance.balance * totalUnderlying) / totalSupply;
        const key = `${pool.ptAddress}_${userBalance.accountAddress}`;

        if (!result.yt[key]) {
          result.yt[key] = [];
        }
        result.yt[key].push({
          market_address: pool.ptAddress,
          user_address: userBalance.accountAddress,
          balance: share
        });
      }
    });

    userWithBalances.filter(b => b.type === 'LP').forEach(userBalance => {
      const pool = tokenToPool[userBalance.tokenAddress];
      if (!pool) return;

      const totalSupply = balances.lpTotalSupply[userBalance.tokenAddress] || 0n;

      const totalNonPt = balances.lpNonPtUnderlying[userBalance.tokenAddress] || 0n;
      if (totalSupply > 0n && totalNonPt > 0n) {
        const share = (userBalance.balance * totalNonPt) / totalSupply;
        const key = `${pool.ptAddress}_${userBalance.accountAddress}`;

        if (!result.lpNonPt[key]) {
          result.lpNonPt[key] = [];
        }
        result.lpNonPt[key].push({
          market_address: pool.ptAddress,
          user_address: userBalance.accountAddress,
          balance: share
        });
      }

      const totalFull = balances.lpFullUnderlying[userBalance.tokenAddress] || 0n;
      if (totalSupply > 0n && totalFull > 0n) {
        const share = (userBalance.balance * totalFull) / totalSupply;
        const key = `${pool.ptAddress}_${userBalance.accountAddress}`;

        if (!result.lpFull[key]) {
          result.lpFull[key] = [];
        }
        result.lpFull[key].push({
          market_address: pool.ptAddress,
          user_address: userBalance.accountAddress,
          balance: share
        });
      }
    });

    return result;
  }

  function exportCsv(data: Record<string, {market_address: string, user_address: string, balance: bigint}[]>, filename: string, type: string) {
    const entries = Object.values(data).flat();
    if (entries.length === 0) return;

    const csv = entries.map(entry => `${entry.market_address},${entry.user_address},${entry.balance}`).join('\n');
    fs.writeFileSync(filename, 'market_address,user_address,balance\n' + csv);
    console.log(`   📄 ${type}: ${entries.length} balances → ${filename}`);
  }
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
