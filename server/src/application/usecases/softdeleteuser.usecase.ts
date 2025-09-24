import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { IUserRepositories } from "../../domain/repositories/IUserRepositories";
import { BaseError } from "../../infrastructure/errors/base.error";

@injectable()
export class SoftDeleteUser {
  constructor(
    @inject(TYPES.IUserRepositories) private userRepo: IUserRepositories,
  ) {}

  async execute(username: string) {
    const user = await this.userRepo.findByLogin(username);
    if (!user) {
      throw new BaseError("NotFoundError", 404, "User not found");
    }

    if (user.isDeleted) {
      throw new BaseError("ValidationError", 400, "User already deleted");
    }

    return this.userRepo.softDeleteById(user.id);
  }
}
