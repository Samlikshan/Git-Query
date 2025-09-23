import { User } from "../entities/User";

export interface IUserRepositories {
  findByLogin(login: string): Promise<User | null>;
  save(user: Omit<User, "id">): Promise<User>;
  update(user: Omit<User, "id">): Promise<User>;
}
