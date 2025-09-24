import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IUserRepositories } from "../../domain/repositories/IUserRepositories";

interface GetUsersParams {
  username?: string;
  location?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

@injectable()
export class ListUsers {
  constructor(
    @inject(TYPES.IUserRepositories) private userRepo: IUserRepositories,
  ) {}
  async execute(params: GetUsersParams) {
    return this.userRepo.getUsers(params);
  }
}
