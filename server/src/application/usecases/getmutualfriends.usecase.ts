import { inject, injectable } from "inversify";
import { IUserRepositories } from "../../domain/repositories/IUserRepositories";
import TYPES from "../../config/types";
import { GithubService } from "../../infrastructure/services/github.service";
import { BaseError } from "../../infrastructure/errors/base.error";
import { IFriendsRepository } from "../../domain/repositories/IFriendsRepositories";
import { Friend } from "../../domain/entities/Friend";

@injectable()
export class GetMutualFriends {
  constructor(
    @inject(TYPES.IUserRepositories) private userRepo: IUserRepositories,
    @inject(TYPES.IFriendsRepositories) private friendsRepo: IFriendsRepository,
    @inject(TYPES.GithubService) private githubService: GithubService,
  ) {}

  async execute(username: string, forceRefresh: boolean): Promise<Friend[]> {
    const lowerUsername = username.toLowerCase();

    const user = await this.userRepo.findByLogin(lowerUsername);
    if (!user) {
      throw new BaseError("NotFountError", 400, "User not found");
    }

    const cached = await this.friendsRepo.findByUserId(user.id!);
    if (cached.length > 0 && !forceRefresh) {
      return cached;
    }

    const followers = await this.githubService.fetchUserConnections(
      username,
      "followers",
    );
    const followings = await this.githubService.fetchUserConnections(
      username,
      "following",
    );

    const followersSet = new Set(
      followers.map((u: any) => u.login.toLowerCase()),
    );
    const mutuals = followings.filter((u: any) =>
      followersSet.has(u.login.toLowerCase()),
    );

    await this.friendsRepo.deleteByUserId(user.id!);

    const entries = mutuals.map((m: any) => ({
      userId: user.id!,
      login: m.login.toLowerCase(),
      avatarUrl: m.avatar_url,
    }));

    await this.friendsRepo.saveMany(entries);
    const friends = this.friendsRepo.findByUserId(user.id!);

    return friends;
  }
}
