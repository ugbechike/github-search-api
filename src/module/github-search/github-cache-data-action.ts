import {IAppRequest} from "../../types/app-request";
import {GithubSearchTypesEnum} from "../../types/github-types/search-api-response";
import {IAppResponse} from "../../types/app-response";
import {ServiceGithubApiResponse} from "./github-search-action";
import {redis} from "../../config/redis";
import {NextFunction} from "express";

interface IReq extends IAppRequest {
  body: {
    search_type: GithubSearchTypesEnum;
    search_text: string;
    size?: number;
    page?: number;
  };
}

export interface IRes extends IAppResponse {
  json: (body: ServiceGithubApiResponse) => this;
}

export async function githubCacheDataAction(req: IReq, res: IRes, next: NextFunction): Promise<IAppResponse> {
  const {search_type = GithubSearchTypesEnum.users, search_text, size, page } = req.body;

  const stringifyData: string = await redis.get(search_type);

  if (stringifyData !== null) {


    const data: any = JSON.parse(stringifyData);

    const response = {...data, search_text, search_type, size, page};

    return res.json(response);
  }

  next();
  return


}
