// Base pool type with common properties
export interface BasePool {
  ptAddress: string;
  ytAddress: string;
  lpAddress: string;
  poolAddress: string;
  underlyingAddress: string;
}

// Curve TwoCrypto pool specific type
export interface CurvePool extends BasePool {
  poolType: 'CURVE_TWO_CRYPTO';
  poolId?: undefined;
}

// TokiHook pool specific type (requires poolId)
export interface TokiHookPool extends BasePool {
  poolType: 'TOKI_HOOK';
  poolId: string;
}

// Union type for all pool types
export type Pool = CurvePool | TokiHookPool;

// Type guards
export function isCurvePool(pool: Pool): pool is CurvePool {
  return pool.poolType === 'CURVE_TWO_CRYPTO';
}

export function isTokiHookPool(pool: Pool): pool is TokiHookPool {
  return pool.poolType === 'TOKI_HOOK';
}

// Array type guards
export function filterCurvePools(pools: Pool[]): CurvePool[] {
  return pools.filter(isCurvePool);
}

export function filterTokiHookPools(pools: Pool[]): TokiHookPool[] {
  return pools.filter(isTokiHookPool);
}

// Validation function
export function validatePool(data: unknown): Pool {
  if (!data || typeof data !== 'object') {
    throw new Error('Pool data must be an object');
  }

  const pool = data as any;

  // Validate required fields
  const requiredFields = ['ptAddress', 'ytAddress', 'lpAddress', 'poolAddress', 'underlyingAddress'];
  for (const field of requiredFields) {
    if (!pool[field] || typeof pool[field] !== 'string') {
      throw new Error(`${field} is required and must be a string`);
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(pool[field])) {
      throw new Error(`${field} must be a valid Ethereum address`);
    }
  }

  // Validate poolType
  if (pool.poolType !== 'CURVE_TWO_CRYPTO' && pool.poolType !== 'TOKI_HOOK') {
    throw new Error('poolType must be either CURVE_TWO_CRYPTO or TOKI_HOOK');
  }

  // For TokiHook, poolId is required
  if (pool.poolType === 'TOKI_HOOK') {
    if (!pool.poolId || typeof pool.poolId !== 'string') {
      throw new Error('poolId is required for TOKI_HOOK pools');
    }
    if (!/^0x[a-fA-F0-9]{64}$/.test(pool.poolId)) {
      throw new Error('poolId must be a 32-byte hex string for TOKI_HOOK pools');
    }
  }

  return pool as Pool;
}

// Array validation function
export function validatePools(data: unknown[]): Pool[] {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }

  return data.map(pool => validatePool(pool));
}