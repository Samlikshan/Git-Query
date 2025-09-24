import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IUserRepositories } from "../../domain/repositories/IUserRepositories";

@injectable()
export class ListUsers {
  constructor(
    @inject(TYPES.IUserRepositories) private userRepo: IUserRepositories,
  ) {}

  async execute(sortBy: string, order: "asc" | "desc", page = 1, limit = 10) {
    return this.userRepo.listUsers(sortBy, order, page, limit);
  }
}
