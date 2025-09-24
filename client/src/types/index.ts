export interface User {
  id: number;
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  blog: string;
  location: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  createdAt: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  clone_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  createdAT: string;
  updatedAt: string;
}

export interface AppState {
  currentView: "home" | "repoDetails" | "mutualFriends" | "usersList";
  selectedUser: User | null;
  selectedRepo: Repository | null;
  userRepos: Repository[];
  mutualFriends: User[];
  dbUsers: User[];
  isLoading: boolean;
  error: string | null;
}
