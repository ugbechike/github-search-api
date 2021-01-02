import { Octokit } from '@octokit/rest';
import { Data, GithubSearchEntityTypesEnum } from '../../types/github-types/search-api-response';
import { redis } from '../../config/redis';

type githubSearchServicePropsTypes = {
  search_text: string;
  page: number;
  size: number;
  search_type: string;
};
export const githubSearchService = async (props: githubSearchServicePropsTypes) => {
  const { search_text, search_type, page, size } = props;

  const octokit = new Octokit({ auth: process.env.GITHUB_AUTH });

  let resp: any;
  if (search_text) {
    resp = await octokit.search[search_type as 'repos' | 'users']({
      q: search_text,
      page,
      per_page: size,
    });
  }

  // check if has more data for pagination in front-end
  const has_more_data: boolean = resp?.data && resp?.data.length > size - 1;

  const data: Data = resp.data;

  // check if search-type is user
  // then get the user profile from the url
  if (search_type === GithubSearchEntityTypesEnum.users) {
    try {
      const userProfiles = await Promise.all(
        data.items.map(async (item) => {
          const response = await octokit.users.getByUsername({
            username: item.login,
          });
          return response.data;
        }),
      );

      const profilesById: any = userProfiles.reduce(
        (accumulator: any, owner: any) => ({
          ...accumulator,
          [owner.id]: owner,
        }),
        {},
      );

      data.items = data.items.map((item: any) => ({
        ...item,
        owner: profilesById[item.id],
      }));
    } catch (err) {
      return err;
    }
  }

  const response = { data, search_text, search_type, size, page, has_more_data };

  // set the data in redis for 2hours
  await redis.set(`${search_type}:${search_text}`, JSON.stringify(response), 'EX', 60 * 60 * 2);

  return response;
};
