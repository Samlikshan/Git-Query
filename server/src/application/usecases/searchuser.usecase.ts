import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IUserRepositories } from "../../domain/repositories/IUserRepositories";

@injectable()
export class SearchUsers {
  constructor(
    @inject(TYPES.IUserRepositories) private userRepo: IUserRepositories,
  ) {}

  async execute(
    filters: { username?: string; location?: string },
    page = 1,
    limit = 10,
  ) {
    return this.userRepo.searchUsers(filters, page, limit);
  }
}
