import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../application/usecases/createuser.usecase";
import TYPES from "../../config/types";
import { BaseError } from "../../infrastructure/errors/base.error";

@injectable()
export class UserController {
  constructor(@inject(TYPES.CreateUser) private createUser: CreateUser) {}

  async getuser(req: Request, res: Response, next: NextFunction) {
    const { username } = req.params;

    if (!username) {
      throw new BaseError("ValidationError", 400, "username is required");
    }

    try {
      const user = await this.createUser.execute(username);
      res.status(201).json(user);
    } catch (err: any) {
      next(err);
    }
  }
}
