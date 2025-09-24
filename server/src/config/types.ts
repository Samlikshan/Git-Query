const TYPES = {
  IUserRepositories: Symbol.for("IUserRepositories"),
  IFriendsRepositories: Symbol.for("IFriendsRepositories"),
  GithubService: Symbol.for("GithubService"),
  CreateUser: Symbol.for("CreateUser"),
  GetMutualFriends: Symbol.for("GetMutualFriends"),
  SearchUser: Symbol.for("SearchUser"),
  listUsers: Symbol.for("ListUsers"),
  UserController: Symbol.for("UserController"),
};

export default TYPES;
