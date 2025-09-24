import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../application/usecases/createuser.usecase";
import TYPES from "../../config/types";
import { BaseError } from "../../infrastructure/errors/base.error";
import { GetMutualFriends } from "../../application/usecases/getmutualfriends.usecase";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUser) private createUser: CreateUser,
    @inject(TYPES.GetMutualFriends)
    private getMutualFriends: GetMutualFriends,
  ) {}

  async getuser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;

      if (!username) {
        throw new BaseError("ValidationError", 400, "username is required");
      }

      const user = await this.createUser.execute(username);
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
      const mutualFriends = await this.getMutualFriends.execute(
        username,
        forceRefresh,
      );

      res.status(200).json({ mutualFriends });
    } catch (error) {
      next(error);
    }
  }
}
