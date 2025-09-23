export interface User {
  id: number;
  login: string;
  githubId: number | null;
  name: string | null;
  avatarUrl: string | null;
  company?: string | null;
  blog: string | null;
  location?: string | null;
  email: string | null;
  bio: string | null;
  publicRepos: number | null;
  publicGists: number | null;
  followers: number | null;
  following: number | null;
  createdAt?: Date | null;
  fetchedAt: Date;
  isDeleted?: boolean;
}
