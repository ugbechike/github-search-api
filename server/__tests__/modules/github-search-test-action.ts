import { httpPost } from '../utils/api-request';
// import {GithubApiResponse} from "../../src/types/github-types/search-api-response";
// import {IRes} from "../../src/module/github-search/github-search-action";

// put type of data to expect or snapshot for large res
const githubSearchUrl = '/api/search';
export const GithubSearchTestAction = () => {
  it('should select a search_type users and search for users from github', async () => {
    const response: any = await httpPost(githubSearchUrl, {
      search_text: 'ugbechike',
      search_type: 'users',
    });

    expect(response.status).toEqual(200);
    expect(response.body.data).toBeDefined();
  });

  it('should search user without setting search_type', async () => {
    const response: any = await httpPost(githubSearchUrl, {
      search_text: 'ugbechike',
    });
    expect(response.status).toEqual(200);
    expect(response.body.data).toBeDefined();
  });

  it('should search repository with search_type repositories', async () => {
    const response: any = await httpPost(githubSearchUrl, {
      search_text: 'github-search',
      search_type: 'repositories',
    });
    expect(response.status).toEqual(200);
    expect(response.body.data).toBeDefined();
  });

  it('should search without post data', async () => {
    const response: any = await httpPost(githubSearchUrl, {});
    expect(response.status).toEqual(400);
    expect(response.body.data).toBeUndefined();
  });
};
