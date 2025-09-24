import { injectable } from "inversify";
import { prisma } from "../db/prisma.client";
import { IFriendsRepository } from "../../domain/repositories/IFriendsRepositories";
import { Friend } from "../../domain/entities/Friend";

@injectable()
export class FriendsRepository implements IFriendsRepository {
  async findByUserId(userId: number): Promise<Friend[]> {
    return prisma.friend.findMany({ where: { userId } });
  }

  async deleteByUserId(userId: number): Promise<void> {
    await prisma.friend.deleteMany({ where: { userId } });
  }

  async saveMany(
    friends: Omit<Friend, "id" | "createdAt" | "updatedAt">[],
  ): Promise<void> {
    if (!friends.length) return;
    await prisma.friend.createMany({ data: friends, skipDuplicates: true });
  }
}
