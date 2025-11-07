import { config as dotenvConfig } from 'dotenv';
dotenvConfig(); // Load environment variables

export const isDev = process.env.NODE_ENV === 'development';

export const backendUrl = process.env.BACKEND_URL;

export const baseUrl = isDev
  ? backendUrl
  : 'https://api-v2.napier.finance/v1/subgraph/napier-v2';

export const rpcUrl = process.env.RPC_URL;

// Merged configuration object - user config + environment constants
import { configuration as userConfig } from './configuration';

export const config = {
  ...userConfig,
  isDev,
  baseUrl,
  rpcUrl,
} as {
  chainId: number;
  markets: string[];
  blockNumber: number | undefined;
  isDev: boolean;
  baseUrl: string;
  rpcUrl: string | undefined;
};
