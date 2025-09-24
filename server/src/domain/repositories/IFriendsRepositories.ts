import { Friend } from "../entities/Friend";

export interface IFriendsRepository {
  findByUserId(userId: number): Promise<Friend[]>;
  deleteByUserId(userId: number): Promise<void>;
  saveMany(
    friends: Omit<Friend, "id" | "createdAt" | "updatedAt">[],
  ): Promise<void>;
}
