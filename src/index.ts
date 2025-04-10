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

  const userBalancesInShareLp = userWithBalances
    .filter((userWithBalance) => userWithBalance.type === 'LP')
    .reduce(
      (acc, userWithBalance) => {
        const totalSupply = lpTotalSupplyMap[userWithBalance.tokenAddress];
        const totalUnderlying = lpUnderlyingMap[userWithBalance.tokenAddress];
        const balance = userWithBalance.balance;
        const balanceInUnderlying = (balance * totalUnderlying) / totalSupply;
        acc[userWithBalance.accountAddress] = balanceInUnderlying;
        return acc;
      },
      {} as Record<string, bigint>,
    );

  const userBalancesInShareYt = userWithBalances
    .filter((userWithBalance) => userWithBalance.type === 'YT')
    .reduce(
      (acc, userWithBalance) => {
        const totalSupply = ytTotalSupplyMap[userWithBalance.tokenAddress];
        const totalUnderlying = ytUnderlyingMap[userWithBalance.tokenAddress];
        const balance = userWithBalance.balance;
        const balanceInUnderlying = (balance * totalUnderlying) / totalSupply;
        acc[userWithBalance.accountAddress] = balanceInUnderlying;
        return acc;
      },
      {} as Record<string, bigint>,
    );

  // Export to CSV
  const csvContentLp = Object.entries(userBalancesInShareLp)
    .map(([address, balance]) => `${address},${balance}`)
    .join('\n');
  const headerLp = 'address,balance\n';
  fs.writeFileSync('user_balances_lp.csv', headerLp + csvContentLp);
  console.log('Exported user balances to user_balances_lp.csv');

  const csvContentYt = Object.entries(userBalancesInShareYt)
    .map(([address, balance]) => `${address},${balance}`)
    .join('\n');
  const headerYt = 'address,balance\n';
  fs.writeFileSync('user_balances_yt.csv', headerYt + csvContentYt);
  console.log('Exported user balances to user_balances_yt.csv');
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
