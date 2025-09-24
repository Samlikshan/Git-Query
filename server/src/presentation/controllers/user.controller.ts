import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../application/usecases/createuser.usecase";
import TYPES from "../../config/types";
import { BaseError } from "../../infrastructure/errors/base.error";
import { GetMutualFriends } from "../../application/usecases/getmutualfriends.usecase";
import { ListUsers } from "../../application/usecases/listusers.usecase";
import { SoftDeleteUser } from "../../application/usecases/softdeleteuser.usecase";
import { UpdateUser } from "../../application/usecases/updateuser.usecase";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUser) private createUserUseCase: CreateUser,
    @inject(TYPES.GetMutualFriends)
    private getMutualFriendsUseCawse: GetMutualFriends,
    @inject(TYPES.listUsers) private listUsersUseCase: ListUsers,
    @inject(TYPES.SoftDeleteUser) private softDeleteUserUseCase: SoftDeleteUser,
    @inject(TYPES.UpdateUser) private updateUserUseCase: UpdateUser,
  ) {}

  async getuser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;

      if (!username) {
        throw new BaseError("ValidationError", 400, "username is required");
      }

      const { user, repos } = await this.createUserUseCase.execute(username);
      res.status(201).json({ user: user, repos: repos });
    } catch (err: any) {
      console.log(err);
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

      res.status(200).json({ friends: mutualFriends });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        username,
        location,
        sortBy = "created_at",
        order = "desc",
        page = "1",
        limit = "10",
      } = req.query;

      const result = await this.listUsersUseCase.execute({
        username: username as string,
        location: location as string,
        sortBy: sortBy as string,
        order: order as "asc" | "desc",
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
      });

      res.status(200).json({
        users: result.users,
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

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      if (!username) {
        throw new BaseError("ValidationError", 400, "username is required");
      }

      const { location, blog, bio } = req.body;

      const updatedUser = await this.updateUserUseCase.execute(username, {
        location,
        blog,
        bio,
      });

      res.status(200).json({
        message: `User ${username} updated successfully`,
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
