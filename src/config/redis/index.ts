import Redis, { RedisOptions } from 'ioredis';

import { appConfig } from '../env';
import { appLogger } from '../../utils/api-logger';

interface IRedisOptions extends RedisOptions {}

const options: IRedisOptions = {
  keyPrefix: appConfig.redis.prefix,
  connectTimeout: appConfig.redis.timeout,
  maxRetriesPerRequest: appConfig.redis.maxRetires,
};

const redisURI: string = appConfig.redis.uri;
const redis: Redis.Redis = new Redis(redisURI, options);

redis.on('error', (error: Error): void => {
  appLogger.error(`Redis :: connection ${JSON.stringify(error)}`);
});

redis.on('connect', (): void => {
  appLogger.info('Redis :: connected');
});

redis.on('reconnecting', (): void => {
  appLogger.warn('Redis :: reconnecting');
});

redis.on('end', (): void => {
  appLogger.warn('Redis :: disconnected');
});

export { redis };
