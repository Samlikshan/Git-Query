import { inject, injectable } from "inversify";
import { IUserRepositories } from "../../domain/repositories/IUserRepositories";
import TYPES from "../../config/types";
import { BaseError } from "../../infrastructure/errors/base.error";
import { User } from "../../domain/entities/User";

interface UpdateUserDTO {
  location?: string;
  blog?: string;
  bio?: string;
}

@injectable()
export class UpdateUser {
  constructor(
    @inject(TYPES.IUserRepositories) private userRepo: IUserRepositories,
  ) {}

  async execute(username: string, data: UpdateUserDTO): Promise<User> {
    const lowerUsername = username.toLowerCase();

    const user = await this.userRepo.findByLogin(lowerUsername);

    if (!user) {
      throw new BaseError("NotFoundError", 404, "User not found");
    }

    const updated = await this.userRepo.updateByLogin(lowerUsername, data);

    return updated;
  }
}
