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
  async searchUsers(
    filters: { username?: string; location?: string },
    page: number = 1,
    limit: number = 10,
  ): Promise<{ users: User[]; total: number }> {
    const where: any = {
      isDeleted: false,
    };

    if (filters.username) {
      where.login = { contains: filters.username, mode: "insensitive" };
    }

    if (filters.location) {
      where.location = { contains: filters.location, mode: "insensitive" };
    }

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }
}
