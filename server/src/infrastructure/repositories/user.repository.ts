import { injectable } from "inversify";
import { prisma } from "../db/prisma.client";
import { IUserRepositories } from "../../domain/repositories/IUserRepositories";
import { User } from "../../domain/entities/User";

@injectable()
export class UserRepositories implements IUserRepositories {
  async findByLogin(login: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { login } });
  }

  async save(user: Omit<User, "id">): Promise<User> {
    return prisma.user.create({ data: user });
  }

  async update(user: Omit<User, "id">): Promise<User> {
    return prisma.user.update({
      where: { login: user.login },
      data: user,
    });
  }
}
