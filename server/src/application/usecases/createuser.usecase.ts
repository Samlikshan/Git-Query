import { inject, injectable } from "inversify";
import { IUserRepositories } from "../../domain/repositories/IUserRepositories";
import { User } from "../../domain/entities/User";
import TYPES from "../../config/types";
import { GithubService } from "../../infrastructure/services/github.service";

@injectable()
export class CreateUser {
  constructor(
    @inject(TYPES.IUserRepositories) private userRepo: IUserRepositories,
    @inject(TYPES.GithubService) private githubService: GithubService,
  ) {}

  async execute(username: string): Promise<User> {
    const lowerUsername = username.toLowerCase();

    const existing = await this.userRepo.findByLogin(lowerUsername);

    if (existing && !existing.isDeleted) {
      return existing;
    }

    const gh = await this.githubService.fetchUser(lowerUsername);

    const user: Omit<User, "id"> = {
      login: gh.login.toLowerCase(),
      githubId: gh.id,
      name: gh.name ?? null,
      avatarUrl: gh.avatar_url ?? null,
      company: gh.company ?? null,
      blog: gh.blog ?? null,
      location: gh.location ?? null,
      email: gh.email ?? null,
      bio: gh.bio ?? null,
      publicRepos: gh.public_repos ?? 0,
      publicGists: gh.public_gists ?? 0,
      followers: gh.followers ?? 0,
      following: gh.following ?? 0,
      createdAt: gh.created_at ? new Date(gh.created_at) : null,
      fetchedAt: new Date(),
      isDeleted: false,
    };
    if (existing) {
      return this.userRepo.update(user);
    }
    return this.userRepo.save(user);
  }
}
