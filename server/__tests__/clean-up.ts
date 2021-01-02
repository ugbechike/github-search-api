import { redis } from '../src/config/redis';

afterAll(() => {
  redis.disconnect();
});
