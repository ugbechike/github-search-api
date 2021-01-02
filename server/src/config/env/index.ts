import 'dotenv/config';

export type ConfigMapType = {
  [name: string]: () => IConfig;
};

export interface IConfig {
  name: string;
  port: number;
  isLocal?: boolean;
  isTesting?: boolean;
  isProduction?: boolean;
  isDevelopment?: boolean;
  httpTimeout: number;
  routePathPrefix: string;
  redis: {
    uri: string;
    prefix: string;
    timeout: number;
    maxRetires: number;
  };
}

const nodeEnv: string = process.env.NODE_ENV ?? 'development';
const appName: string = process.env.APP_NAME ?? 'github-search-api';

const development: any = (): IConfig => {
  return {
    isLocal: false,
    isTesting: false,
    isDevelopment: nodeEnv === 'development',
    isProduction: nodeEnv === 'production',
    name: appName,
    port: parseInt(process.env.PORT || '5005') ?? 0,
    redis: {
      uri: process.env.REDIS_URI ?? 'redis://0.0.0.0:6379',
      prefix: process.env.REDIS_PREFIX ?? 'github-search-api_',
      timeout: parseInt(process.env.REDIS_TIMEOUT) ?? 10000, // 10 seconds
      maxRetires: parseInt(process.env.REDIS_MAX_RETRIES) ?? 10,
    },
    httpTimeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT) ?? 10000,
    routePathPrefix: process.env.ROUTE_PATH_PREFIX ?? '/api/github-search/',
  };
};

const production: any = (): IConfig => {
  return {
    isTesting: false,
    isLocal: false,
    isDevelopment: nodeEnv === 'development',
    isProduction: nodeEnv === 'production',
    name: appName,
    port: parseInt(process.env.PORT || '0') ?? 0,
    redis: {
      uri: process.env.REDIS_URI ?? 'redis://0.0.0.0:6379',
      prefix: process.env.REDIS_PREFIX ?? 'github-search-api_',
      timeout: parseInt(process.env.REDIS_TIMEOUT) ?? 10000, // 10 seconds
      maxRetires: parseInt(process.env.REDIS_MAX_RETRIES) ?? 10,
    },
    httpTimeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT) ?? 10000,
    routePathPrefix: process.env.ROUTE_PATH_PREFIX ?? '/api/github-search/',
  };
};

const test: any = (): IConfig => {
  return {
    isTesting: true,
    isLocal: false,
    isDevelopment: nodeEnv === 'development',
    isProduction: nodeEnv === 'production',
    name: appName,
    port: parseInt(process.env.PORT || '5005') ?? 0,
    redis: {
      uri: process.env.REDIS_URI ?? 'redis://0.0.0.0:6379',
      prefix: process.env.REDIS_PREFIX ?? 'github-search-api_',
      timeout: parseInt(process.env.REDIS_TIMEOUT) ?? 10000, // 10 seconds
      maxRetires: parseInt(process.env.REDIS_MAX_RETRIES) ?? 10,
    },
    httpTimeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT) ?? 10000,
    routePathPrefix: process.env.ROUTE_PATH_PREFIX ?? '/api/github-search/',
  };
};

const configMap: ConfigMapType = {
  test,
  development,
  production,
};

export const appConfig: IConfig = configMap[nodeEnv]();
