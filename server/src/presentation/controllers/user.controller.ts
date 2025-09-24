import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../application/usecases/createuser.usecase";
import TYPES from "../../config/types";
import { BaseError } from "../../infrastructure/errors/base.error";
import { GetMutualFriends } from "../../application/usecases/getmutualfriends.usecase";
import { SearchUsers } from "../../application/usecases/searchuser.usecase";
import { ListUsers } from "../../application/usecases/listusers.usecase";
import { SoftDeleteUser } from "../../application/usecases/softdeleteuser.usecase";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUser) private createUserUseCase: CreateUser,
    @inject(TYPES.GetMutualFriends)
    private getMutualFriendsUseCawse: GetMutualFriends,
    @inject(TYPES.SearchUser) private searchUserUseCase: SearchUsers,
    @inject(TYPES.listUsers) private listUsersUseCase: ListUsers,
    @inject(TYPES.SoftDeleteUser) private softDeleteUserUseCase: SoftDeleteUser,
  ) {}

  async getuser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;

      if (!username) {
        throw new BaseError("ValidationError", 400, "username is required");
      }

      const user = await this.createUserUseCase.execute(username);
      res.status(201).json(user);
    } catch (err: any) {
      next(err);
    }
  }

  async getFreinds(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const { forceRefresh } = req.body;
      if (!username) {
        throw new BaseError("ValidationError", 400, "username is required");
      }
      const mutualFriends = await this.getMutualFriendsUseCawse.execute(
        username,
        forceRefresh,
      );

      res.status(200).json({ mutualFriends });
    } catch (error) {
      next(error);
    }
  }
  async searchUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, location, page = "1", limit = "10" } = req.query;

      const result = await this.searchUserUseCase.execute(
        { username: username as string, location: location as string },
        parseInt(page as string, 10),
        parseInt(limit as string, 10),
      );

      res.status(200).json({
        data: result.users,
        pagination: {
          total: result.total,
          page: parseInt(page as string, 10),
          limit: parseInt(limit as string, 10),
          totalPages: Math.ceil(result.total / parseInt(limit as string, 10)),
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        sortBy = "created_at",
        order = "desc",
        page = "1",
        limit = "10",
      } = req.query;

      const result = await this.listUsersUseCase.execute(
        sortBy as string,
        order as "asc" | "desc",
        parseInt(page as string, 10),
        parseInt(limit as string, 10),
      );

      res.status(200).json({
        data: result.users,
        pagination: {
          total: result.total,
          page: parseInt(page as string, 10),
          limit: parseInt(limit as string, 10),
          totalPages: Math.ceil(result.total / parseInt(limit as string, 10)),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async softDeleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      if (!username) {
        throw new BaseError("ValidationError", 400, "username is required");
      }

      const deletedUser = await this.softDeleteUserUseCase.execute(username);

      res.status(200).json({
        message: `User ${username} soft deleted successfully`,
        user: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
