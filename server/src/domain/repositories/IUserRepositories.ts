import { User } from "../entities/User";

export interface IUserRepositories {
  findByLogin(login: string): Promise<User | null>;
  save(user: Omit<User, "id">): Promise<User>;
  update(user: Omit<User, "id">): Promise<User>;
  searchUsers(
    filters: { username?: string; location?: string },
    page: number,
    limit: number,
  ): Promise<{ users: User[]; total: number }>;
  listUsers(
    sortBy: string,
    order: "asc" | "desc",
    page: number,
    limit: number,
  ): Promise<{ users: User[]; total: number }>;
  softDeleteById(id: number): Promise<User | null>;
  updateByLogin(username: string, data: Partial<User>): Promise<User>;
}
