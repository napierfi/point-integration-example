import { Address, createPublicClient, erc20Abi, http } from 'viem';
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

export async function getYtTotalSupplyMap(
  chainId: keyof typeof chainIdToChain,
  marketDetails: MarketDetails[],
  blockNumber: number,
) {
  const client = createPublicClient({
    chain: chainIdToChain[chainId],
    transport: http(),
  });

  const totalSupplies = (await client.multicall({
    allowFailure: false,
    blockNumber: BigInt(blockNumber),
    contracts: marketDetails.map((marketDetail) => ({
      address: marketDetail.ytAddress as Address,
      abi: erc20Abi,
      functionName: 'totalSupply',
    })),
  })) as bigint[];

  return marketDetails.reduce(
    (acc, marketDetail, i) => {
      acc[marketDetail.ytAddress] = totalSupplies[i];
      return acc;
    },
    {} as Record<string, bigint>,
  );
}

export async function getYtUnderlyingMap(
  chainId: keyof typeof chainIdToChain,
  marketDetails: MarketDetails[],
  blockNumber: number,
) {
  const client = createPublicClient({
    chain: chainIdToChain[chainId],
    transport: http(),
  });

  const underlyingAmounts = (await client.multicall({
    allowFailure: false,
    blockNumber: BigInt(blockNumber),
    contracts: marketDetails.map((marketDetail) => ({
      address: marketDetail.underlyingAddress as Address,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [marketDetail.ptAddress],
    })),
  })) as bigint[];

  return marketDetails.reduce(
    (acc, marketDetail, i) => {
      acc[marketDetail.ytAddress] = underlyingAmounts[i];
      return acc;
    },
    {} as Record<string, bigint>,
  );
}

export async function getLpTotalSupplyMap(
  chainId: keyof typeof chainIdToChain,
  marketDetails: MarketDetails[],
  blockNumber: number,
) {
  const client = createPublicClient({
    chain: chainIdToChain[chainId],
    transport: http(),
  });

  const totalSupplies = (await client.multicall({
    allowFailure: false,
    blockNumber: BigInt(blockNumber),
    contracts: marketDetails.map((marketDetail) => ({
      address: marketDetail.lpAddress as Address,
      abi: erc20Abi,
      functionName: 'totalSupply',
    })),
  })) as bigint[];

  return marketDetails.reduce(
    (acc, marketDetail, i) => {
      acc[marketDetail.lpAddress] = totalSupplies[i];
      return acc;
    },
    {} as Record<string, bigint>,
  );
}

export async function getLpUnderlyingMap(
  chainId: keyof typeof chainIdToChain,
  marketDetails: MarketDetails[],
  blockNumber: number,
) {
  const client = createPublicClient({
    chain: chainIdToChain[chainId],
    transport: http(),
  });

  const underlyingAmounts = (await client.multicall({
    allowFailure: false,
    blockNumber: BigInt(blockNumber),
    contracts: marketDetails.map((marketDetail) => ({
      address: marketDetail.underlyingAddress as Address,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [marketDetail.lpAddress],
    })),
  })) as bigint[];

  return marketDetails.reduce(
    (acc, marketDetail, i) => {
      acc[marketDetail.lpAddress] = underlyingAmounts[i];
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
