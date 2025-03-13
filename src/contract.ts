import { createPublicClient, http } from 'viem';
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  fraxtal,
  mainnet,
  mantle,
  optimism,
  polygon,
  sonic,
} from 'viem/chains';
import { MarketDetails } from './subgraph';
import { LENS_ABI } from './abi';

export async function getPriceDataMap(
  chainId: keyof typeof chainIdToChain,
  marketDetails: MarketDetails[],
  blockNumber: number,
) {
  const client = createPublicClient({
    chain: chainIdToChain[chainId],
    transport: http(),
  });

  const priceData = (await client.multicall({
    blockNumber: BigInt(blockNumber),
    contracts: marketDetails.map(
      (marketDetail) =>
        ({
          address: '0x0000006178ee874e0ae58b131b8a5fcbe78cab2f',
          abi: LENS_ABI,
          functionName: 'getPriceData',
          args: [marketDetail.lpAddress],
        }) as const,
    ),
    allowFailure: false,
  })) as PriceData[];

  return priceData.reduce(
    (acc, pd, index) => {
      acc[marketDetails[index].ptAddress] = pd.ptPriceInShare;
      acc[marketDetails[index].lpAddress] = pd.lpPriceInShare;
      acc[marketDetails[index].ytAddress] = pd.ytPriceInShare;
      return acc;
    },
    {} as Record<string, bigint>,
  );
}

const chainIdToChain = {
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [mantle.id]: mantle,
  [sonic.id]: sonic,
  [arbitrum.id]: arbitrum,
  [base.id]: base,
  [optimism.id]: optimism,
  [avalanche.id]: avalanche,
  [fraxtal.id]: fraxtal,
  [bsc.id]: bsc,
} as const;

type ChainId = keyof typeof chainIdToChain;

export type PriceData = {
  scale: bigint;
  assetPriceInUSD: bigint;
  ptPriceInShare: bigint;
  ytPriceInShare: bigint;
  ptPriceInUSD: bigint;
  ytPriceInUSD: bigint;
  lpPriceInShare: bigint;
  lpPriceInUSD: bigint;
  virtualPrice: bigint;
  impliedAPY: bigint;
};
