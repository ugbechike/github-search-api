import {IAppRequest} from "../../types/app-request";
import {IAppResponse} from "../../types/app-response";
import {BaseValidationType} from "../../types/base-validator";
import {body} from "express-validator";
import {reqValidationResult} from "../../config/mw/req-validator-mw";
import {Data, GithubApiResponse, GithubSearchEntityTypesEnum, Item} from "../../types/github-types/search-api-response";
import {Octokit} from '@octokit/rest';
import axios from "axios";
import {redis} from "../../config/redis";


interface IReq extends IAppRequest {
  body: {
    search_type: GithubSearchEntityTypesEnum;
    search_text: string;
    size?: number;
    page?: number;
  };
}

export interface IRes extends IAppResponse {
  json: (body: GithubApiResponse) => this;
}


export const actionSearchGithubValidator: BaseValidationType = [body('search_text').exists(), body('size').optional().isNumeric(), body('page').optional().isNumeric(), reqValidationResult];
export async function githubSearchAction(req: IReq, res: IRes): Promise<IAppResponse> {
  const {search_text, search_type = GithubSearchEntityTypesEnum.users, page = 1, size = 20 } = req.body;
  const octokit = new Octokit();

  let resp: any;
  try{
    if (search_text) {
      resp = await octokit.request(`GET /search/${search_type}`, {
        q: search_text,
        page,
        per_page: size
      })
    }
  } catch (err) {
    return res.status(500);
  }

  // check if has more data for pagination in front-end
  const has_more_data: boolean = resp?.data && resp?.data.length > size - 1;

  const data: Data = resp.data;

  // check if search-type is user
  // then get the user profile from the url
  if (search_type === GithubSearchEntityTypesEnum.users) {
    try {
      const userProfiles = await Promise.all(
        data.items.map(async (item: any) => {
          const response = await axios.get(item.url);
          return response.data;
        })
      );

      const profilesById: any = userProfiles.reduce(
        (accumulator: any, profile: any) => ({
          ...accumulator,
          [profile.id]: profile
        }),
        {}
      );


      data.items = data.items.map((item: any) => ({
        ...item,
        profile: profilesById[item.id]
      }));
    } catch (err) {
      console.log('error', err);
      console.info("Failed to fetch profile info");
    }
  }




  const response = { data, search_text, search_type, size, page, has_more_data };


  // set the data in redis for 2hours
  await redis.set(search_type, JSON.stringify(response), 'EX',  60 * 60 * 2);
  return res.json(response);
}
