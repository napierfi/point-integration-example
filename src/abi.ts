export const LENS_ABI = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'cancelOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'completeOwnershipHandover',
    inputs: [
      { name: 'pendingOwner', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getAccountData',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'account', type: 'address', internalType: 'address' },
    ],
    outputs: [
      {
        name: 'data',
        type: 'tuple',
        internalType: 'struct Lens.UserData',
        components: [
          { name: 'targetBalance', type: 'uint256', internalType: 'uint256' },
          { name: 'assetBalance', type: 'uint256', internalType: 'uint256' },
          { name: 'ptBalance', type: 'uint256', internalType: 'uint256' },
          { name: 'ytBalance', type: 'uint256', internalType: 'uint256' },
          { name: 'interest', type: 'uint256', internalType: 'uint256' },
          {
            name: 'rewards',
            type: 'tuple[]',
            internalType: 'struct TokenReward[]',
            components: [
              { name: 'token', type: 'address', internalType: 'address' },
              { name: 'amount', type: 'uint256', internalType: 'uint256' },
            ],
          },
          {
            name: 'lpBalanceInWallet',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'lpBalanceInGauge',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'portfolioInShare',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'portfolioInAsset',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'portfolioInUSD', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPriceData',
    inputs: [{ name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' }],
    outputs: [
      {
        name: 'data',
        type: 'tuple',
        internalType: 'struct Lens.PriceData',
        components: [
          { name: 'scale', type: 'uint256', internalType: 'uint256' },
          { name: 'assetPriceInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'ptPriceInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'ytPriceInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'ptPriceInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'ytPriceInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'lpPriceInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'lpPriceInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'virtualPrice', type: 'uint256', internalType: 'uint256' },
          { name: 'impliedAPY', type: 'int256', internalType: 'int256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPriceUSDInWad',
    inputs: [{ name: 'asset', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTVL',
    inputs: [{ name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct Lens.TVLData',
        components: [
          {
            name: 'trancheTVLInShare',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'trancheTVLInAsset',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'trancheTVLInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'poolTVLInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'poolTVLInAsset', type: 'uint256', internalType: 'uint256' },
          { name: 'poolTVLInUSD', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTrancheData',
    inputs: [
      {
        name: 'principalToken',
        type: 'address',
        internalType: 'contract PrincipalToken',
      },
    ],
    outputs: [
      {
        name: 'data',
        type: 'tuple',
        internalType: 'struct Lens.TrancheData',
        components: [
          { name: 'name', type: 'string', internalType: 'string' },
          { name: 'symbol', type: 'string', internalType: 'string' },
          { name: 'factory', type: 'address', internalType: 'address' },
          { name: 'expiry', type: 'uint256', internalType: 'uint256' },
          { name: 'resolver', type: 'address', internalType: 'address' },
          { name: 'yt', type: 'address', internalType: 'address' },
          { name: 'target', type: 'address', internalType: 'address' },
          { name: 'asset', type: 'address', internalType: 'address' },
          { name: 'decimals', type: 'uint256', internalType: 'uint256' },
          { name: 'scale', type: 'uint256', internalType: 'uint256' },
          { name: 'ptTotalSupply', type: 'uint256', internalType: 'uint256' },
          { name: 'ytTotalSupply', type: 'uint256', internalType: 'uint256' },
          { name: 'feePcts', type: 'uint256', internalType: 'FeePcts' },
          {
            name: 'rewardTokens',
            type: 'address[]',
            internalType: 'address[]',
          },
          { name: 'protocolFee', type: 'uint256', internalType: 'uint256' },
          { name: 'curatorFee', type: 'uint256', internalType: 'uint256' },
          {
            name: 'curatorFeeRewards',
            type: 'tuple[]',
            internalType: 'struct TokenReward[]',
            components: [
              { name: 'token', type: 'address', internalType: 'address' },
              { name: 'amount', type: 'uint256', internalType: 'uint256' },
            ],
          },
          {
            name: 'protocolFeeRewards',
            type: 'tuple[]',
            internalType: 'struct TokenReward[]',
            components: [
              { name: 'token', type: 'address', internalType: 'address' },
              { name: 'amount', type: 'uint256', internalType: 'uint256' },
            ],
          },
          { name: 'isExpired', type: 'bool', internalType: 'bool' },
          { name: 'isSettled', type: 'bool', internalType: 'bool' },
          { name: 'paused', type: 'bool', internalType: 'bool' },
          {
            name: 'depositCapInShare',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'depositCapInAsset',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'depositCapInUSD', type: 'uint256', internalType: 'uint256' },
          {
            name: 'maxDepositInShare',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'maxDepositInAsset',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'maxDepositInUSD', type: 'uint256', internalType: 'uint256' },
          {
            name: 'trancheTVLInShare',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'trancheTVLInAsset',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'trancheTVLInUSD', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTwoCryptoData',
    inputs: [{ name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' }],
    outputs: [
      {
        name: 'data',
        type: 'tuple',
        internalType: 'struct Lens.TwoCryptoData',
        components: [
          { name: 'name', type: 'string', internalType: 'string' },
          { name: 'symbol', type: 'string', internalType: 'string' },
          { name: 'decimals', type: 'uint256', internalType: 'uint256' },
          { name: 'coin0', type: 'address', internalType: 'address' },
          { name: 'coin1', type: 'address', internalType: 'address' },
          { name: 'balance0', type: 'uint256', internalType: 'uint256' },
          { name: 'balance1', type: 'uint256', internalType: 'uint256' },
          { name: 'totalSupply', type: 'uint256', internalType: 'uint256' },
          { name: 'ptPriceInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'lpPriceInShare', type: 'uint256', internalType: 'uint256' },
          {
            name: 'poolValueInShare',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'poolValueInAsset',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'poolValueInUSD', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: 'factory', type: 'address', internalType: 'contract Factory' },
      { name: 'feedRegistry', type: 'address', internalType: 'address' },
      { name: 'twoCryptoDeployer', type: 'address', internalType: 'address' },
      { name: 'weth', type: 'address', internalType: 'address' },
      { name: 'owner', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: 'result', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownershipHandoverExpiresAt',
    inputs: [
      { name: 'pendingOwner', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: 'result', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'proxiableUUID',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'requestOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 's_WETH',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 's_factory',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract Factory' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 's_feedRegistry',
    inputs: [],
    outputs: [
      { name: '', type: 'address', internalType: 'contract FeedRegistry' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 's_priceOracles',
    inputs: [{ name: 'currency', type: 'address', internalType: 'Currency' }],
    outputs: [
      {
        name: 'oracle',
        type: 'address',
        internalType: 'contract AggregatorV3Interface',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 's_twoCryptoDeployer',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setFeedRegistry',
    inputs: [
      { name: 'feedRegistry', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPriceOracle',
    inputs: [
      { name: 'currencies', type: 'address[]', internalType: 'Currency[]' },
      { name: 'oracles', type: 'address[]', internalType: 'address[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'upgradeToAndCall',
    inputs: [
      { name: 'newImplementation', type: 'address', internalType: 'address' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverCanceled',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverRequested',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'oldOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Upgraded',
    inputs: [
      {
        name: 'implementation',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'AlreadyInitialized', inputs: [] },
  { type: 'error', name: 'InvalidInitialization', inputs: [] },
  { type: 'error', name: 'Lens_InvalidPrice', inputs: [] },
  { type: 'error', name: 'Lens_LengthMismatch', inputs: [] },
  { type: 'error', name: 'Lens_PriceFeedNotFound', inputs: [] },
  { type: 'error', name: 'NewOwnerIsZeroAddress', inputs: [] },
  { type: 'error', name: 'NoHandoverRequest', inputs: [] },
  { type: 'error', name: 'NotInitializing', inputs: [] },
  { type: 'error', name: 'Unauthorized', inputs: [] },
  { type: 'error', name: 'UnauthorizedCallContext', inputs: [] },
  { type: 'error', name: 'UpgradeFailed', inputs: [] },
  { type: 'error', name: 'Zap_BadPrincipalToken', inputs: [] },
  { type: 'error', name: 'Zap_BadTwoCrypto', inputs: [] },
] as const;

export const QUOTER = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'WETH',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'cancelOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'completeOwnershipHandover',
    inputs: [
      { name: 'pendingOwner', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'convertSharesToYt',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'shares', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'factory',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract Factory' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenInList',
    inputs: [{ name: 'pool', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'address[]', internalType: 'Token[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenOutList',
    inputs: [{ name: 'pool', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'address[]', internalType: 'Token[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: '_factory',
        type: 'address',
        internalType: 'contract Factory',
      },
      {
        name: '_vaultConnectorRegistry',
        type: 'address',
        internalType: 'contract VaultConnectorRegistry',
      },
      {
        name: '_twoCryptoDeployer',
        type: 'address',
        internalType: 'address',
      },
      { name: '_WETH', type: 'address', internalType: 'address' },
      { name: 'owner', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: 'result', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownershipHandoverExpiresAt',
    inputs: [
      { name: 'pendingOwner', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: 'result', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewAddLiquidity',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'shares', type: 'uint256', internalType: 'uint256' },
      { name: 'principal', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: 'liquidity', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewAddLiquidityOneToken',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'tokenIn', type: 'address', internalType: 'Token' },
      { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
      { name: 'principal', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewCollect',
    inputs: [
      {
        name: 'pt',
        type: 'address',
        internalType: 'contract PrincipalToken',
      },
      { name: 'account', type: 'address', internalType: 'address' },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple',
        internalType: 'struct BaseQuoter.PreviewCollectResult',
        components: [
          {
            name: 'interest',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rewards',
            type: 'tuple[]',
            internalType: 'struct TokenReward[]',
            components: [
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewCollects',
    inputs: [
      {
        name: 'pts',
        type: 'address[]',
        internalType: 'contract PrincipalToken[]',
      },
      { name: 'account', type: 'address', internalType: 'address' },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple[]',
        internalType: 'struct BaseQuoter.PreviewCollectResult[]',
        components: [
          {
            name: 'interest',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rewards',
            type: 'tuple[]',
            internalType: 'struct TokenReward[]',
            components: [
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewCombine',
    inputs: [
      {
        name: 'pt',
        type: 'address',
        internalType: 'contract PrincipalToken',
      },
      { name: 'tokenOut', type: 'address', internalType: 'Token' },
      { name: 'principal', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewRedeem',
    inputs: [
      {
        name: 'pt',
        type: 'address',
        internalType: 'contract PrincipalToken',
      },
      { name: 'tokenOut', type: 'address', internalType: 'Token' },
      { name: 'principal', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewRemoveLiquidity',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'shares', type: 'uint256', internalType: 'uint256' },
      { name: 'principal', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewRemoveLiquidityOneToken',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'tokenOut', type: 'address', internalType: 'Token' },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: 'amountOut', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewSupply',
    inputs: [
      {
        name: 'pt',
        type: 'address',
        internalType: 'contract PrincipalToken',
      },
      { name: 'tokenIn', type: 'address', internalType: 'Token' },
      { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewSwapPtForToken',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'tokenOut', type: 'address', internalType: 'Token' },
      { name: 'principal', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: 'amountOut', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewSwapTokenForPt',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'tokenIn', type: 'address', internalType: 'Token' },
      { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: 'principal', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewSwapTokenForYt',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'tokenIn', type: 'address', internalType: 'Token' },
      { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'guessYt', type: 'uint256', internalType: 'ApproxValue' },
      {
        name: 'sharesBorrow',
        type: 'uint256',
        internalType: 'ApproxValue',
      },
      { name: 'sharesSpent', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewSwapUnderlyingForExactYt',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'ytOut', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'sharesSpent', type: 'uint256', internalType: 'uint256' },
      { name: 'sharesBorrow', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewSwapYtForToken',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'tokenOut', type: 'address', internalType: 'Token' },
      { name: 'principal', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
      {
        name: 'principalActual',
        type: 'uint256',
        internalType: 'ApproxValue',
      },
      {
        name: 'getDxResult',
        type: 'uint256',
        internalType: 'ApproxValue',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'proxiableUUID',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'requestOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'uncheckedPreviewSwapUnderlyingForExactYt',
    inputs: [
      { name: 'twoCrypto', type: 'address', internalType: 'TwoCrypto' },
      { name: 'ytOut', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'sharesIn', type: 'uint256', internalType: 'uint256' },
      { name: 'sharesBorrow', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'upgradeToAndCall',
    inputs: [
      {
        name: 'newImplementation',
        type: 'address',
        internalType: 'address',
      },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'vaultConnectorRegistry',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract VaultConnectorRegistry',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'vaultPreviewDeposit',
    inputs: [
      {
        name: 'principalToken',
        type: 'address',
        internalType: 'contract PrincipalToken',
      },
      { name: 'tokenIn', type: 'address', internalType: 'Token' },
      { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'vaultPreviewRedeem',
    inputs: [
      {
        name: 'principalToken',
        type: 'address',
        internalType: 'contract PrincipalToken',
      },
      { name: 'tokenOut', type: 'address', internalType: 'Token' },
      { name: 'shares', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverCanceled',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverRequested',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'oldOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Upgraded',
    inputs: [
      {
        name: 'implementation',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'AlreadyInitialized', inputs: [] },
  { type: 'error', name: 'ConversionLib_NegativeYtPrice', inputs: [] },
  { type: 'error', name: 'InvalidInitialization', inputs: [] },
  { type: 'error', name: 'NewOwnerIsZeroAddress', inputs: [] },
  { type: 'error', name: 'NoHandoverRequest', inputs: [] },
  { type: 'error', name: 'NotInitializing', inputs: [] },
  { type: 'error', name: 'Quoter_ConnectorInvalidToken', inputs: [] },
  {
    type: 'error',
    name: 'Quoter_ERC4626FallbackCallFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Quoter_InsufficientUnderlyingOutput',
    inputs: [],
  },
  { type: 'error', name: 'Quoter_MaximumYtOutputReached', inputs: [] },
  {
    type: 'error',
    name: 'TwoCryptoNGPreviewLib_SolutionNotFound',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TwoCryptoNG_CalcTokenAmountFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TwoCryptoNG_CalcWithdrawOneCoinFailed',
    inputs: [],
  },
  { type: 'error', name: 'Unauthorized', inputs: [] },
  { type: 'error', name: 'UnauthorizedCallContext', inputs: [] },
  { type: 'error', name: 'UpgradeFailed', inputs: [] },
];

export const TOKI_LENS_ABI = [
  {
    type: 'function',
    name: 'getPriceData',
    inputs: [
      { name: 'pool', type: 'address', internalType: 'contract TokiPoolToken' },
    ],
    outputs: [
      {
        name: 'data',
        type: 'tuple',
        internalType: 'struct TokiLens.PriceData',
        components: [
          { name: 'scale', type: 'uint256', internalType: 'uint256' },
          { name: 'assetPriceInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'ptPriceInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'ytPriceInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'ptPriceInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'ytPriceInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'lpPriceInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'lpPriceInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'impliedAPY', type: 'int256', internalType: 'int256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTVL',
    inputs: [
      { name: 'pool', type: 'address', internalType: 'contract TokiPoolToken' },
    ],
    outputs: [
      {
        name: 'tvl',
        type: 'tuple',
        internalType: 'struct TokiLens.TVLData',
        components: [
          { name: 'ptTVLInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'ptTVLInAsset', type: 'uint256', internalType: 'uint256' },
          { name: 'ptTVLInUSD', type: 'uint256', internalType: 'uint256' },
          { name: 'poolTVLInShare', type: 'uint256', internalType: 'uint256' },
          { name: 'poolTVLInAsset', type: 'uint256', internalType: 'uint256' },
          { name: 'poolTVLInUSD', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTrancheData',
    inputs: [
      {
        name: 'principalToken',
        type: 'address',
        internalType: 'contract PrincipalToken',
      },
    ],
    outputs: [
      {
        name: 'data',
        type: 'tuple',
        internalType: 'struct TokiLens.TrancheData',
        components: [
          { name: 'target', type: 'address', internalType: 'address' },
          { name: 'asset', type: 'address', internalType: 'address' },
          { name: 'ptTotalSupply', type: 'uint256', internalType: 'uint256' },
          { name: 'ytTotalSupply', type: 'uint256', internalType: 'uint256' },
          { name: 'feePcts', type: 'uint256', internalType: 'FeePcts' },
          {
            name: 'poolFeeModule',
            type: 'uint256',
            internalType: 'FeePctsPool',
          },
          {
            name: 'depositCapInShare',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'depositCapInAsset',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'depositCapInUSD', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const;

export const TOKI_POOL_TOKEN_ABI = [
  {
    type: 'function',
    name: 'i_poolKey',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          { name: 'currency0', type: 'address', internalType: 'Currency' },
          { name: 'currency1', type: 'address', internalType: 'Currency' },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          { name: 'hooks', type: 'address', internalType: 'contract IHooks' },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const;

export const TOKI_HOOK_ABI = [
  {
    type: 'function',
    name: 'getTotalBalances',
    inputs: [{ name: 'poolId', type: 'bytes32', internalType: 'PoolId' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
] as const;

export const TOKI_QUOTER = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'computeOracleParameters',
    inputs: [
      { name: 'twapWindow', type: 'uint32', internalType: 'uint32' },
      {
        name: 'blockIntervalMs',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    outputs: [
      {
        name: 'cardinalityRequired',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'computePoolParameters',
    inputs: [
      { name: 'rateMin', type: 'uint256', internalType: 'uint256' },
      { name: 'rateMax', type: 'uint256', internalType: 'uint256' },
      { name: 'expiry', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'scalarRoot', type: 'uint256', internalType: 'uint256' },
      {
        name: 'initialRateAnchor',
        type: 'int256',
        internalType: 'int256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertLpToAssets',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertLpToUnderlying',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertPtToAssets',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'principals', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertPtToUnderlying',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'principals', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertYtToAssets',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'principals', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertYtToUnderlying',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'principals', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getImmutableArgs',
    inputs: [],
    outputs: [
      {
        name: 'i_tokiSwapBinSearch',
        type: 'address',
        internalType: 'contract TokiSwapBinSearch',
      },
      {
        name: 'i_tokiPoolDeployer',
        type: 'address',
        internalType: 'contract TokiPoolDeployer',
      },
      {
        name: 'i_principalTokenQuoter',
        type: 'address',
        internalType: 'contract PrincipalTokenQuoter',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getImpliedRateWad',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
    ],
    outputs: [{ name: '', type: 'int256', internalType: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getLiquidityForAmounts',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {
        name: 'amount0Desired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amount1Desired',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
      { name: 'amount0', type: 'uint256', internalType: 'uint256' },
      { name: 'amount1', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenInList',
    inputs: [{ name: 'pool', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'address[]', internalType: 'Token[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenOutList',
    inputs: [{ name: 'pool', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'address[]', internalType: 'Token[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'i_accessManager',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract AccessManager',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewPriceImpactPt',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'principals', type: 'int256', internalType: 'int256' },
    ],
    outputs: [
      {
        name: 'spotExchangeRateBefore',
        type: 'int256',
        internalType: 'int256',
      },
      {
        name: 'executionExchangeRate',
        type: 'int256',
        internalType: 'int256',
      },
      { name: 'priceImpact', type: 'int256', internalType: 'int256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'previewPriceImpactYt',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'principals', type: 'int256', internalType: 'int256' },
    ],
    outputs: [
      {
        name: 'spotExchangeRateBefore',
        type: 'int256',
        internalType: 'int256',
      },
      {
        name: 'executionExchangeRate',
        type: 'int256',
        internalType: 'int256',
      },
      { name: 'priceImpact', type: 'int256', internalType: 'int256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'principalTokenQuoter',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract PrincipalTokenQuoter',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'proxiableUUID',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteAddLiquidity',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {
        name: 'amount0Desired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amount1Desired',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct TokiQuoter.PreviewAddLiquidityResult',
        components: [
          {
            name: 'amount0Spent',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount1Spent',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'liquidity',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'spotExchangeRateBefore',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'executionExchangeRate',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'priceImpact',
            type: 'int256',
            internalType: 'int256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteAddLiquidityOneTokenKeepYt',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'token', type: 'address', internalType: 'Token' },
      {
        name: 'amountDesired',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple',
        internalType: 'struct TokiQuoter.PreviewAddLiquidityResult',
        components: [
          {
            name: 'amount0Spent',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount1Spent',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'liquidity',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'spotExchangeRateBefore',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'executionExchangeRate',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'priceImpact',
            type: 'int256',
            internalType: 'int256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteAddLiquidityOneTokenNoYt',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'token', type: 'address', internalType: 'Token' },
      {
        name: 'amountDesired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'approx',
        type: 'tuple',
        internalType: 'struct ApproximationParams',
        components: [
          { name: 'guessMin', type: 'int256', internalType: 'int256' },
          { name: 'guessMax', type: 'int256', internalType: 'int256' },
          { name: 'eps', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple',
        internalType: 'struct TokiQuoter.PreviewAddLiquidityResult',
        components: [
          {
            name: 'amount0Spent',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount1Spent',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'liquidity',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'spotExchangeRateBefore',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'executionExchangeRate',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'priceImpact',
            type: 'int256',
            internalType: 'int256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteCreateAndAddLiquidity',
    inputs: [
      {
        name: 'suite',
        type: 'tuple',
        internalType: 'struct Factory.Suite',
        components: [
          {
            name: 'accessManagerImpl',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'ptBlueprint',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'resolverBlueprint',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'poolDeployerImpl',
            type: 'address',
            internalType: 'address',
          },
          { name: 'poolArgs', type: 'bytes', internalType: 'bytes' },
          { name: 'resolverArgs', type: 'bytes', internalType: 'bytes' },
        ],
      },
      {
        name: 'modules',
        type: 'tuple[]',
        internalType: 'struct Factory.ModuleParam[]',
        components: [
          {
            name: 'moduleType',
            type: 'uint256',
            internalType: 'ModuleIndex',
          },
          {
            name: 'implementation',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'immutableData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      { name: 'expiry', type: 'uint256', internalType: 'uint256' },
      {
        name: 'amount0Desired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'desiredImpliedRate',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'currency0', type: 'address', internalType: 'address' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct TokiQuoter.PreviewAddLiquidityResult',
        components: [
          {
            name: 'amount0Spent',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount1Spent',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'liquidity',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'spotExchangeRateBefore',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'executionExchangeRate',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'priceImpact',
            type: 'int256',
            internalType: 'int256',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'quoteRemoveLiquidity',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple',
        internalType: 'struct TokiQuoter.QuoteRemoveLiquidityResult',
        components: [
          {
            name: 'amount0Out',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount1Out',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'spotExchangeRateBefore',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'executionExchangeRate',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'priceImpact',
            type: 'int256',
            internalType: 'int256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteRemoveLiquidityOneToken',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      { name: 'token', type: 'address', internalType: 'Token' },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple',
        internalType: 'struct TokiQuoter.QuoteRemoveLiquidityOneTokenResult',
        components: [
          {
            name: 'amountOut',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'spotExchangeRateBefore',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'executionExchangeRate',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'priceImpact',
            type: 'int256',
            internalType: 'int256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteSplitUnderlyingTokenLiquidityKeepYt',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {
        name: 'amount0Desired',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'amount0ToTokenize',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'amount1Out', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteSplitUnderlyingTokenLiquidityNoYt',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          { name: 'fee', type: 'uint24', internalType: 'uint24' },
          { name: 'tickSpacing', type: 'int24', internalType: 'int24' },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {
        name: 'amount0Desired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'approx',
        type: 'tuple',
        internalType: 'struct ApproximationParams',
        components: [
          { name: 'guessMin', type: 'int256', internalType: 'int256' },
          { name: 'guessMax', type: 'int256', internalType: 'int256' },
          { name: 'eps', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    outputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteSwapPt',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct TokiQuoter.QuoteSwapParams',
        components: [
          {
            name: 'poolKey',
            type: 'tuple',
            internalType: 'struct PoolKey',
            components: [
              {
                name: 'currency0',
                type: 'address',
                internalType: 'Currency',
              },
              {
                name: 'currency1',
                type: 'address',
                internalType: 'Currency',
              },
              { name: 'fee', type: 'uint24', internalType: 'uint24' },
              {
                name: 'tickSpacing',
                type: 'int24',
                internalType: 'int24',
              },
              {
                name: 'hooks',
                type: 'address',
                internalType: 'contract IHooks',
              },
            ],
          },
          { name: 'zeroForOne', type: 'bool', internalType: 'bool' },
          { name: 'amount', type: 'uint128', internalType: 'uint128' },
          {
            name: 'approx',
            type: 'tuple',
            internalType: 'struct ApproximationParams',
            components: [
              {
                name: 'guessMin',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'guessMax',
                type: 'int256',
                internalType: 'int256',
              },
              { name: 'eps', type: 'uint256', internalType: 'uint256' },
            ],
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple',
        internalType: 'struct TokiQuoter.QuoteSwapResult',
        components: [
          {
            name: 'amountIn',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amountOut',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'executionExchangeRate',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'spotExchangeRateAfter',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'spotExchangeRateBefore',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'priceImpact',
            type: 'int256',
            internalType: 'int256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'quoteSwapYt',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct TokiQuoter.QuoteSwapParams',
        components: [
          {
            name: 'poolKey',
            type: 'tuple',
            internalType: 'struct PoolKey',
            components: [
              {
                name: 'currency0',
                type: 'address',
                internalType: 'Currency',
              },
              {
                name: 'currency1',
                type: 'address',
                internalType: 'Currency',
              },
              { name: 'fee', type: 'uint24', internalType: 'uint24' },
              {
                name: 'tickSpacing',
                type: 'int24',
                internalType: 'int24',
              },
              {
                name: 'hooks',
                type: 'address',
                internalType: 'contract IHooks',
              },
            ],
          },
          { name: 'zeroForOne', type: 'bool', internalType: 'bool' },
          { name: 'amount', type: 'uint128', internalType: 'uint128' },
          {
            name: 'approx',
            type: 'tuple',
            internalType: 'struct ApproximationParams',
            components: [
              {
                name: 'guessMin',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'guessMax',
                type: 'int256',
                internalType: 'int256',
              },
              { name: 'eps', type: 'uint256', internalType: 'uint256' },
            ],
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'tuple',
        internalType: 'struct TokiQuoter.QuoteSwapResult',
        components: [
          {
            name: 'amountIn',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amountOut',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'executionExchangeRate',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'spotExchangeRateAfter',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'spotExchangeRateBefore',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'priceImpact',
            type: 'int256',
            internalType: 'int256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'upgradeToAndCall',
    inputs: [
      {
        name: 'newImplementation',
        type: 'address',
        internalType: 'address',
      },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Upgraded',
    inputs: [
      {
        name: 'implementation',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'AccessManaged_Restricted', inputs: [] },
  {
    type: 'error',
    name: 'ApproximationParams_InvalidGuess',
    inputs: [],
  },
  { type: 'error', name: 'Expired', inputs: [] },
  { type: 'error', name: 'InvalidBlueprint', inputs: [] },
  { type: 'error', name: 'InvalidInitialization', inputs: [] },
  {
    type: 'error',
    name: 'LibOracle_TWAPWindowTooLarge',
    inputs: [
      { name: 'twapWindow', type: 'uint256', internalType: 'uint256' },
      {
        name: 'cardinalityRequired',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'LiquidityAmounts_InsufficientInitialLiquidity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'LiquidityAmounts_LiquidityExceedsTotalLiquidity',
    inputs: [],
  },
  { type: 'error', name: 'LiquidityAmounts_NoLiquidity', inputs: [] },
  { type: 'error', name: 'NotInitializing', inputs: [] },
  {
    type: 'error',
    name: 'TokiHook_InsufficientInputAmount',
    inputs: [{ name: 'vault', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'TokiSwap_BadRateRange', inputs: [] },
  {
    type: 'error',
    name: 'TokiSwap_ExchangeRateBelowOne',
    inputs: [{ name: 'exchangeRate', type: 'int256', internalType: 'int256' }],
  },
  { type: 'error', name: 'TokiSwap_ImpliedRateZero', inputs: [] },
  {
    type: 'error',
    name: 'TokiSwap_InsufficientPrincipalsLiquidity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TokiSwap_MarketProportionTooHigh',
    inputs: [],
  },
  { type: 'error', name: 'TokiSwap_NoSolutionFound', inputs: [] },
  { type: 'error', name: 'TokiSwap_OnlyExactInSupported', inputs: [] },
  {
    type: 'error',
    name: 'TokiSwap_ProportionGreaterThanOne',
    inputs: [],
  },
  { type: 'error', name: 'TokiSwap_RateScalarZero', inputs: [] },
  { type: 'error', name: 'TokiSwap_ZeroLiquidity', inputs: [] },
  { type: 'error', name: 'UnauthorizedCallContext', inputs: [] },
  { type: 'error', name: 'UpgradeFailed', inputs: [] },
  {
    type: 'error',
    name: 'Zap_DebtExceedsUnderlyingReceived',
    inputs: [],
  },
];
