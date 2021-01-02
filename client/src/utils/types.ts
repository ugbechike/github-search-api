
export interface Item {
  data?: Data;
  search_text?: string;
  search_type?: string;
  size?: number;
  page?: number;
  has_more_data?: boolean;
}

export interface Data {
  total_count: number;
  incomplete_results: boolean;
  items?: ItemElement[];
}

export interface ItemElement {
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
  language: string;
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
  description?: string,
  name?: string
  full_name?: string,
  updated_at?: string,
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

/// end
