import fs from 'fs';
import { getPriceDataMap } from './contract';
import { getMarketDetails, getUserWithBalancesForTokens } from './subgraph';

// CONFIGURABLE
const markets = ['0xaf2391b932d439138641be3ee879b0c853d6e566'];
const chainId = 1;
const blockNumber = 22028602;

async function main() {
  const marketDetails = await getMarketDetails(chainId, markets, blockNumber);
  const priceDataMap = await getPriceDataMap(
    chainId,
    marketDetails,
    blockNumber,
  );

  const userWithBalances = await getUserWithBalancesForTokens(
    chainId,
    marketDetails.flatMap((md) => [md.lpAddress, md.ytAddress]),
    blockNumber,
  );

  const WAD = 10n ** 18n;
  const userWithBalancesInShareMap = userWithBalances.reduce(
    (acc, userWithBalance) => {
      const price = priceDataMap[userWithBalance.tokenAddress];
      const balance = userWithBalance.balance;
      const balanceInShare = (balance * price) / WAD;
      acc[userWithBalance.accountAddress] = balanceInShare;
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
