const TYPES = {
  IUserRepositories: Symbol.for("IUserRepositories"),
  IFriendsRepositories: Symbol.for("IFriendsRepositories"),
  GithubService: Symbol.for("GithubService"),
  CreateUser: Symbol.for("CreateUser"),
  GetMutualFriends: Symbol.for("GetMutualFriends"),
  listUsers: Symbol.for("ListUsers"),
  SoftDeleteUser: Symbol.for("SoftDeleteUser"),
  UpdateUser: Symbol.for("UpdateUser"),
  UserController: Symbol.for("UserController"),
};

export default TYPES;
