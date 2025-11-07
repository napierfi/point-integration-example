import { config as dotenvConfig } from 'dotenv';
dotenvConfig(); // Load environment variables

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
import { TOKI_HOOK_ABI, TOKI_POOL_TOKEN_ABI } from './abi';
import { config } from './constant';

const getClient = (chainId: number) => {
  const transport = config.isDev ? http(config.rpcUrl) : http();

  return createPublicClient({
    chain: getChainIdToChain(chainId),
    transport,
  });
};

// Helper function to handle multicall errors gracefully
async function safeMulticall(
  client: any,
  contracts: any[],
  blockNumber: number | undefined,
  context: string,
): Promise<(bigint | null)[]> {
  // Check if using Tenderly RPC - if so, use individual calls instead of multicall
  const isTenderly = client.transport.url?.includes('tenderly');

  if (isTenderly) {
    console.log(
      `🔧 Using individual calls for ${context} (Tenderly RPC detected)`,
    );
    const results: (bigint | null)[] = [];

    for (let i = 0; i < contracts.length; i++) {
      const contract = contracts[i];
      try {
        const result = await client.readContract({
          address: contract.address,
          abi: contract.abi,
          functionName: contract.functionName,
          args: contract.args || [],
          ...(blockNumber && { blockNumber: BigInt(blockNumber) }),
        });
        results.push(result as bigint);
      } catch (error) {
        console.warn(
          `⚠️  ${context} - Contract call failed [${i + 1}/${contracts.length}]:`,
        );
        console.warn(`   Target: ${contract.address}`);
        console.warn(`   Function: ${contract.functionName}`);
        console.warn(`   Error: ${(error as any)?.message || 'Unknown error'}`);
        results.push(null);
      }
    }

    return results;
  }

  try {
    const results = await client.multicall({
      allowFailure: true, // Allow individual calls to fail
      ...(blockNumber && { blockNumber: BigInt(blockNumber) }),
      contracts,
    });

    return results.map((result: any, index: number) => {
      if (result.status === 'failure') {
        console.warn(
          `⚠️  ${context} - Contract call failed [${index + 1}/${contracts.length}]:`,
        );
        console.warn(`   Target: ${contracts[index].address}`);
        console.warn(`   Function: ${contracts[index].functionName}`);
        console.warn(`   Error: ${result.error?.message || 'Unknown error'}`);
        return null;
      }
      return result.result as bigint;
    });
  } catch (error) {
    console.error(`❌ ${context} - Multicall completely failed:`, error);
    console.error(`   RPC URL: ${client.transport.url || 'default'}`);
    console.error(`   Block Number: ${blockNumber}`);
    console.error(`   Number of contracts: ${contracts.length}`);

    // Return null for all contracts if multicall fails completely
    return contracts.map(() => null);
  }
}

export async function getYtTotalSupplyMap(
  chainId: number,
  marketDetails: MarketDetails[],
  blockNumber: number | undefined,
) {
  const client = getClient(chainId);

  const contracts = marketDetails.map((marketDetail) => ({
    address: marketDetail.ytAddress as Address,
    abi: erc20Abi,
    functionName: 'totalSupply',
  }));

  const totalSupplies = await safeMulticall(
    client,
    contracts,
    blockNumber,
    'YT Total Supply',
  );

  return marketDetails.reduce(
    (acc, marketDetail, i) => {
      const supply = totalSupplies[i];
      if (supply !== null) {
        acc[marketDetail.ytAddress] = supply;
      } else {
        console.warn(
          `⚠️  Skipping YT total supply for ${marketDetail.ytAddress} (call failed)`,
        );
      }
      return acc;
    },
    {} as Record<string, bigint>,
  );
}

export async function getYtUnderlyingMap(
  chainId: number,
  marketDetails: MarketDetails[],
  blockNumber: number | undefined,
) {
  const client = getClient(chainId);

  const contracts = marketDetails.map((marketDetail) => ({
    address: marketDetail.underlyingAddress as Address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [marketDetail.ptAddress],
  }));

  const underlyingAmounts = await safeMulticall(
    client,
    contracts,
    blockNumber,
    'YT Underlying Balance',
  );

  return marketDetails.reduce(
    (acc, marketDetail, i) => {
      const amount = underlyingAmounts[i];
      if (amount !== null) {
        acc[marketDetail.ytAddress] = amount;
      } else {
        console.warn(
          `⚠️  Skipping YT underlying balance for ${marketDetail.ytAddress} (call failed)`,
        );
      }
      return acc;
    },
    {} as Record<string, bigint>,
  );
}

export async function getLpTotalSupplyMap(
  chainId: number,
  marketDetails: MarketDetails[],
  blockNumber: number | undefined,
) {
  const client = getClient(chainId);

  const contracts = marketDetails.map((marketDetail) => ({
    address: marketDetail.lpAddress as Address,
    abi: erc20Abi,
    functionName: 'totalSupply',
  }));

  const totalSupplies = await safeMulticall(
    client,
    contracts,
    blockNumber,
    'LP Total Supply',
  );

  return marketDetails.reduce(
    (acc, marketDetail, i) => {
      const supply = totalSupplies[i];
      if (supply !== null) {
        acc[marketDetail.lpAddress] = supply;
      } else {
        console.warn(
          `⚠️  Skipping LP total supply for ${marketDetail.lpAddress} (call failed)`,
        );
      }
      return acc;
    },
    {} as Record<string, bigint>,
  );
}

// Helper function to get hook addresses from TokiPoolToken contracts
async function getHookAddresses(
  client: any,
  tokiMarkets: MarketDetails[],
  blockNumber: number | undefined,
): Promise<Address[]> {
  // Get hook addresses by calling i_poolKey() on TokiPoolToken contracts
  const contracts = tokiMarkets.map((marketDetail) => ({
    address: marketDetail.lpAddress as Address, // TokiPoolToken contract
    abi: TOKI_POOL_TOKEN_ABI,
    functionName: 'i_poolKey',
  }));

  const poolKeyResults = await safeMulticall(
    client,
    contracts,
    blockNumber,
    'TokiPoolToken i_poolKey',
  );

  // Extract hook addresses from PoolKey results, handle failures
  const hookAddresses: Address[] = [];
  poolKeyResults.forEach((result, index) => {
    if (result !== null) {
      // Convert result to PoolKey and extract hooks address
      try {
        // The result should be a tuple with hooks address
        const poolKey = result as any;
        const hookAddress = poolKey.hooks as Address;
        hookAddresses.push(hookAddress);
      } catch (error) {
        console.error(
          `❌ Failed to extract hook address from PoolKey result for ${tokiMarkets[index].lpAddress}:`,
          error,
        );
        hookAddresses.push(tokiMarkets[index].lpAddress as Address); // Fallback to LP address
      }
    } else {
      console.warn(
        `⚠️  Failed to get PoolKey for ${tokiMarkets[index].lpAddress}, using LP address as fallback`,
      );
      hookAddresses.push(tokiMarkets[index].lpAddress as Address); // Fallback to LP address
    }
  });

  return hookAddresses;
}

export async function getLpNonPtUnderlyingMap(
  chainId: number,
  marketDetails: MarketDetails[],
  blockNumber: number | undefined,
) {
  const client = getClient(chainId);

  // Separate markets by pool type
  const curveMarkets = marketDetails.filter(
    (m) => m.poolType === 'CURVE_TWO_CRYPTO',
  );
  const tokiMarkets = marketDetails.filter((m) => m.poolType === 'TOKI_HOOK');

  const result: Record<string, bigint> = {};

  // Handle CURVE_TWO_CRYPTO markets
  if (curveMarkets.length > 0) {
    console.log(`📊 Processing ${curveMarkets.length} Curve pools...`);
    const curveContracts = curveMarkets.map((marketDetail) => ({
      address: marketDetail.underlyingAddress as Address,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [marketDetail.lpAddress],
    }));

    const curveUnderlyingAmounts = await safeMulticall(
      client,
      curveContracts,
      blockNumber,
      'Curve LP Non-PT Underlying',
    );

    curveMarkets.forEach((marketDetail, i) => {
      const amount = curveUnderlyingAmounts[i];
      if (amount !== null) {
        result[marketDetail.lpAddress] = amount;
      } else {
        console.warn(
          `⚠️  Skipping Curve non-PT underlying for ${marketDetail.lpAddress} (call failed)`,
        );
      }
    });
  }

  // Handle TOKI_HOOK markets
  if (tokiMarkets.length > 0) {
    console.log(`🔗 Processing ${tokiMarkets.length} TokiHook pools...`);

    try {
      // Step 1: Get hook addresses from TokiPoolToken contracts
      const hookAddresses = await getHookAddresses(
        client,
        tokiMarkets,
        blockNumber,
      );

      // Step 2: Call getTotalBalances() on hook contracts
      const tokiContracts = tokiMarkets.map((marketDetail, index) => {
        if (!marketDetail.poolId) {
          throw new Error(
            `poolId is required for TOKI_HOOK pool ${marketDetail.lpAddress}`,
          );
        }
        return {
          address: hookAddresses[index], // Use hook address, not poolAddress
          abi: TOKI_HOOK_ABI,
          functionName: 'getTotalBalances',
          args: [marketDetail.poolId as Address],
        };
      });

      const tokiUnderlyingAmounts = await safeMulticall(
        client,
        tokiContracts,
        blockNumber,
        'TokiHook getTotalBalances',
      );

      // Extract underlying balance from packed result (first 128 bits)
      tokiMarkets.forEach((marketDetail, i) => {
        const packedResult = tokiUnderlyingAmounts[i];
        if (packedResult !== null) {
          const underlyingBalance = packedResult >> 128n; // First 128 bits = underlying
          result[marketDetail.lpAddress] = underlyingBalance;
        } else {
          console.warn(
            `⚠️  Skipping TokiHook non-PT underlying for ${marketDetail.lpAddress} (call failed)`,
          );
        }
      });
    } catch (error) {
      console.error(`❌ TokiHook processing failed:`, error);
      tokiMarkets.forEach((marketDetail) => {
        console.warn(
          `⚠️  Skipping TokiHook non-PT underlying for ${marketDetail.lpAddress} (processing failed)`,
        );
      });
    }
  }

  return result;
}

export async function getLpFullUnderlyingMap(
  chainId: number,
  marketDetails: MarketDetails[],
  blockNumber: number | undefined,
) {
  const client = getClient(chainId);

  // Separate markets by pool type
  const curveMarkets = marketDetails.filter(
    (m) => m.poolType === 'CURVE_TWO_CRYPTO',
  );
  const tokiMarkets = marketDetails.filter((m) => m.poolType === 'TOKI_HOOK');

  const result: Record<string, bigint> = {};

  // Process CURVE_TWO_CRYPTO markets
  if (curveMarkets.length > 0) {
    console.log(
      `📊 Processing ${curveMarkets.length} Curve pools (full exposure)...`,
    );

    const curveContracts = [
      // Get PT balance in pool
      ...curveMarkets.map((marketDetail) => ({
        address: marketDetail.ptAddress as Address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [marketDetail.poolAddress],
      })),
      // Get underlying balance in pool
      ...curveMarkets.map((marketDetail) => ({
        address: marketDetail.underlyingAddress as Address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [marketDetail.poolAddress],
      })),
    ];

    const curveFullAmounts = await safeMulticall(
      client,
      curveContracts,
      blockNumber,
      'Curve LP Full Underlying',
    );

    // Process Curve results: PT balance + underlying balance = full LP exposure
    for (let i = 0; i < curveMarkets.length; i++) {
      const marketDetail = curveMarkets[i];
      const ptBalanceInPool = curveFullAmounts[i]; // PT balance in pool
      const underlyingBalanceInPool = curveFullAmounts[i + curveMarkets.length]; // underlying balance in pool

      if (ptBalanceInPool !== null && underlyingBalanceInPool !== null) {
        result[marketDetail.lpAddress] =
          ptBalanceInPool + underlyingBalanceInPool;
      } else {
        console.warn(
          `⚠️  Skipping Curve full underlying for ${marketDetail.lpAddress} (call failed)`,
        );
      }
    }
  }

  // Process TOKI_HOOK markets
  if (tokiMarkets.length > 0) {
    console.log(
      `🔗 Processing ${tokiMarkets.length} TokiHook pools (full exposure)...`,
    );

    try {
      // Step 1: Get hook addresses from TokiPoolToken contracts
      const hookAddresses = await getHookAddresses(
        client,
        tokiMarkets,
        blockNumber,
      );

      // Step 2: Call getTotalBalances() on hook contracts
      const tokiContracts = tokiMarkets.map((marketDetail, index) => {
        if (!marketDetail.poolId) {
          throw new Error(
            `poolId is required for TOKI_HOOK pool ${marketDetail.lpAddress}`,
          );
        }
        return {
          address: hookAddresses[index], // Use hook address, not poolAddress
          abi: TOKI_HOOK_ABI,
          functionName: 'getTotalBalances',
          args: [marketDetail.poolId as Address],
        };
      });

      const tokiFullAmounts = await safeMulticall(
        client,
        tokiContracts,
        blockNumber,
        'TokiHook getTotalBalances (Full)',
      );

      // Process Toki results: Combine PT and underlying from packed result
      tokiMarkets.forEach((marketDetail, i) => {
        const packedBalance = tokiFullAmounts[i];
        if (packedBalance !== null) {
          const underlyingBalance = packedBalance >> 128n; // First 128 bits = underlying
          const ptBalance = packedBalance & ((1n << 128n) - 1n); // Last 128 bits = PT balance
          result[marketDetail.lpAddress] = underlyingBalance + ptBalance;
        } else {
          console.warn(
            `⚠️  Skipping TokiHook full underlying for ${marketDetail.lpAddress} (call failed)`,
          );
        }
      });
    } catch (error) {
      console.error(`❌ TokiHook full processing failed:`, error);
      tokiMarkets.forEach((marketDetail) => {
        console.warn(
          `⚠️  Skipping TokiHook full underlying for ${marketDetail.lpAddress} (processing failed)`,
        );
      });
    }
  }

  return result;
}

export function getChainIdToChain(chainId: number) {
  if (chainId in chainIdToChain) {
    return chainIdToChain[chainId as ChainId];
  }
  throw new Error(`Chain ID ${chainId} not found`);
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
