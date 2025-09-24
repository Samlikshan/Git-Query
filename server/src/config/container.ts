import { Container } from "inversify";
import TYPES from "./types";

import { IUserRepositories } from "../domain/repositories/IUserRepositories";
import { UserRepositories } from "../infrastructure/repositories/user.repository";
import { GithubService } from "../infrastructure/services/github.service";
import { CreateUser } from "../application/usecases/createuser.usecase";
import { UserController } from "../presentation/controllers/user.controller";
import { GetMutualFriends } from "../application/usecases/getmutualfriends.usecase";
import { IFriendsRepository } from "../domain/repositories/IFriendsRepositories";
import { FriendsRepository } from "../infrastructure/repositories/friend.repository";
import { ListUsers } from "../application/usecases/listusers.usecase";
import { SoftDeleteUser } from "../application/usecases/softdeleteuser.usecase";
import { UpdateUser } from "../application/usecases/updateuser.usecase";

const container = new Container();

// Repositories
container
  .bind<IUserRepositories>(TYPES.IUserRepositories)
  .to(UserRepositories)
  .inSingletonScope();
container
  .bind<IFriendsRepository>(TYPES.IFriendsRepositories)
  .to(FriendsRepository)
  .inSingletonScope();

// Services
container
  .bind<GithubService>(TYPES.GithubService)
  .to(GithubService)
  .inSingletonScope();

// Use cases
container.bind<CreateUser>(TYPES.CreateUser).to(CreateUser).inSingletonScope();
container
  .bind<GetMutualFriends>(TYPES.GetMutualFriends)
  .to(GetMutualFriends)
  .inSingletonScope();
container.bind<ListUsers>(TYPES.listUsers).to(ListUsers).inSingletonScope();
container
  .bind<SoftDeleteUser>(TYPES.SoftDeleteUser)
  .to(SoftDeleteUser)
  .inSingletonScope();
container.bind<UpdateUser>(TYPES.UpdateUser).to(UpdateUser).inSingletonScope();

// Controllers
container
  .bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();

export default container;
