import { IAppRequest } from '../../types/app-request';
import { IAppResponse } from '../../types/app-response';
import { BaseValidationType } from '../../types/base-validator';
import { body } from 'express-validator';
import { reqValidationResult } from '../../config/mw/req-validator-mw';
import { GithubApiResponse, GithubSearchEntityTypesEnum } from '../../types/github-types/search-api-response';
import { errMsgCode } from '../../utils/err-messages';
import { githubSearchService } from '../github-search-services/github-search-service';

interface IReq extends IAppRequest {
  body: {
    search_type: GithubSearchEntityTypesEnum;
    search_text: string;
    size?: number;
    page?: number;
  };
}

export interface IRes extends IAppResponse {
  json: (body: GithubApiResponse | { errMsg: string }) => this;
}

export const actionSearchGithubValidator: BaseValidationType = [body('search_text').exists(), body('size').optional().isNumeric(), body('page').optional().isNumeric(), reqValidationResult];
export async function githubSearchAction(req: IReq, res: IRes): Promise<IAppResponse> {
  const { search_text, search_type = GithubSearchEntityTypesEnum.users, page = 1, size = 6 } = req.body;
  let response: GithubApiResponse;
  try {
    response = await githubSearchService({ search_type, search_text, page, size });
  } catch (e) {
    res.status(500).send({ errMsg: errMsgCode.E_AN_ERROR_OCCURRED });
  }

  return res.json(response);
}
