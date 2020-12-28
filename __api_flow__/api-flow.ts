import { appLogger } from '../src/utils/api-logger';
import {run as githubSearch} from "./github-search";

(async () => {
  appLogger.info('running api flow');

  // where i will call the api flows eg: github-search and clear cache
  await githubSearch();

  process.exit(0);

})();
