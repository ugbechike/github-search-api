import { appLogger } from '../src/utils/api-logger';
import { run as githubSearch } from './github-search';
import { run as clearCache } from './clear-cache';

(async () => {
  appLogger.info('running api flow');

  // where i will call the api flows eg: github-search and clear cache
  await githubSearch();
  await clearCache();

  process.exit(0);
})();
