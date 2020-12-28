
export interface GithubApiResponse {
  // items: any[]; // todo github api resp
  has_more_data: boolean;
}

export enum GithubSearchTypesEnum {
  'users' = 'users',
  'repositories' = 'repositories',
}
