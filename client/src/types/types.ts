export interface User {
  id?: string; // internal DB id
  github_id?: number; // GitHub numeric ID
  username: string; // GitHub login
  name?: string;
  avatarUrl?: string;
  bio?: string | null;
  blog?: string | null;
  location?: string | null;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  createdAt?: string; // from GitHub API
  updtedAt?: string | null; // for soft delete
}

export interface Repo {
  id?: string;
  github_id?: number;
  name: string;
  full_name?: string;
  description?: string | null;
  html_url?: string;
  language?: string | null;
  forks_count?: number;
  stargazers_count?: number;
  watchers_count?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiError {
  message: string;
}
