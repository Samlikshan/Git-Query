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
  async getUsers(params: {
    username?: string;
    location?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    page?: number;
    limit?: number;
  }): Promise<{ users: User[]; total: number }> {
    const {
      username,
      location,
      sortBy = "created_at",
      order = "desc",
      page = 1,
      limit = 10,
    } = params;

    const where: any = { isDeleted: false };

    if (username) {
      where.login = { contains: username, mode: "insensitive" };
    }
    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    const allowedSortFields: Record<string, string> = {
      public_repos: "publicRepos",
      public_gists: "publicGists",
      followers: "followers",
      following: "following",
      created_at: "createdAt",
    };
    const prismaField = allowedSortFields[sortBy] || "createdAt";

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [prismaField]: order },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async softDeleteById(id: number): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async updateByLogin(username: string, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { login: username },
      data,
    });
  }
}
