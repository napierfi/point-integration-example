import fs from 'fs';
import { getMarketDetails, getUserWithBalancesForTokens } from './subgraph';
import {
  getLpUnderlyingMap,
  getYtTotalSupplyMap,
  getYtUnderlyingMap,
} from './contract';
import { getLpTotalSupplyMap } from './contract';
import { BigNumber } from 'bignumber.js';
import { configuration } from './configuration';
async function main() {
  const { chainId, markets, blockNumber } = configuration;
  const marketDetails = await getMarketDetails(chainId, markets, blockNumber);

  const userWithBalances = await getUserWithBalancesForTokens(
    chainId,
    marketDetails.flatMap((md) => [md.ytAddress, md.lpAddress]),
    blockNumber,
  );

  const [lpTotalSupplyMap, ytTotalSupplyMap, lpUnderlyingMap, ytUnderlyingMap] =
    await Promise.all([
      getLpTotalSupplyMap(chainId, marketDetails, blockNumber),
      getYtTotalSupplyMap(chainId, marketDetails, blockNumber),
      getLpUnderlyingMap(chainId, marketDetails, blockNumber),
      getYtUnderlyingMap(chainId, marketDetails, blockNumber),
    ]);

  const userWithBalancesInShareMap = userWithBalances.reduce(
    (acc, userWithBalance) => {
      let totalSupply = 1n;
      let totalUnderlying = 0n;

      if (userWithBalance.type === 'LP') {
        totalSupply = lpTotalSupplyMap[userWithBalance.tokenAddress];
      } else if (userWithBalance.type === 'YT') {
        totalSupply = ytTotalSupplyMap[userWithBalance.tokenAddress];
      }

      if (userWithBalance.type === 'LP') {
        totalUnderlying = lpUnderlyingMap[userWithBalance.tokenAddress];
      } else if (userWithBalance.type === 'YT') {
        totalUnderlying = ytUnderlyingMap[userWithBalance.tokenAddress];
      }

      const balance = userWithBalance.balance;
      const balanceInUnderlying = (balance * totalUnderlying) / totalSupply;
      acc[userWithBalance.accountAddress] = balanceInUnderlying;
      return acc;
    },
    {} as Record<string, bigint>,
  );

  // Export to CSV
  const csvContent = Object.entries(userWithBalancesInShareMap)
    .map(([address, balance]) => `${address},${balance}`)
    .join('\n');

  const header = 'address,balance\n';
  fs.writeFileSync('user_balances.csv', header + csvContent);
  console.log('Exported user balances to user_balances.csv');
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
