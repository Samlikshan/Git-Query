import { User } from "../entities/User";

export interface IUserRepositories {
  findByLogin(login: string): Promise<User | null>;
  save(user: Omit<User, "id">): Promise<User>;
  update(user: Omit<User, "id">): Promise<User>;
  softDeleteById(id: number): Promise<User | null>;
  getUsers(params: {
    username?: string;
    location?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    page?: number;
    limit?: number;
  }): Promise<{ users: User[]; total: number }>;
  updateByLogin(username: string, data: Partial<User>): Promise<User>;
}
