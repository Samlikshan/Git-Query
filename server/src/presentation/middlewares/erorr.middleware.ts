import { Request, Response, NextFunction } from "express";
import { BaseError } from "../../infrastructure/errors/base.error";
import { handlePrismaError } from "../../infrastructure/errors/prisma.error";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  let customError: BaseError;

  if (err instanceof BaseError) {
    customError = err;
  } else if (err instanceof Error && "code" in err) {
    customError = handlePrismaError(err);
  } else {
    customError = new BaseError(
      "InternalServerError",
      500,
      "Something went wrong",
    );
  }

  res.status(customError.statusCode).json({
    status: "error",
    name: customError.name,
    message: customError.message,
    ...(process.env.NODE_ENV === "development" && { stack: customError.stack }),
  });
}
