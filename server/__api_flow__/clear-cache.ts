// @ts-ignore
import assert from 'assert';
// @ts-ignore
import supertest from 'supertest';
import { app } from '../src/config/server/server';
import { appConfig } from '../src/config/env';
import { appLogger } from '../src/utils/api-logger';

export const run = async () => {
  appConfig.isTesting = true;
  appConfig.isDevelopment = false;

  await clearCache('users', 'ugbechike');
  await clearCache('repositories', 'github search');
};

const clearCache = async (searchText: string, searchType: string) => {
  // clear cache
  appLogger.info('running clear cache flow');

  await supertest(app)
    .post('api/clear-cache')
    .send({
      search_text: searchText,
      search_type: searchType,
    })
    .then((resp) => {
      assert.ok(resp.status);
    })
    .catch((err) => {
      console.error('Handling promise rejection', err);
    });
};
