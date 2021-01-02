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

  await githubSearchApi('ugbechike', 'users');
  await githubSearchApi('todo-app', 'repositories');
};

const githubSearchApi = async (searchText: string, searchType: string) => {
  // search users
  appLogger.info('running search flow');

  await supertest(app)
    .post('app/search')
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
