import { IErrMessages } from '../../utils/err-messages';

export enum GithubSearchEntityTypesEnum {
  'users' = 'users',
  'repositories' = 'repositories',
}

export interface GithubApiResponse {
  data: Data;
  size: number;
  has_more_data: boolean;
  page: number;
  search_type: GithubSearchEntityTypesEnum;
  search_text: string;

  // data: Data; size: number; has_more_data: boolean; page: number; search_type: GithubSearchEntityTypesEnum; search_text: string
}

export interface Data {
  total_count: number;
  incomplete_results: boolean;
  items: Item[];
}

export interface Item {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
  owner: Owner;
  homepage?: null;
  size?: number;
  stargazers_count?: number;
  watchers_count?: number;
  language?: null;
  has_issues?: boolean;
  has_projects?: boolean;
  has_downloads?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  forks_count?: number;
  mirror_url?: null;
  archived?: boolean;
  disabled?: boolean;
  open_issues_count?: number;
  license?: null;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  default_branch?: string;
  permissions?: Permissions;
}

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: string;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

export interface Permissions {
  admin?: boolean;
  push?: boolean;
  pull?: boolean;
}
