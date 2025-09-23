import { BaseError } from "./base.error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handlePrismaError(error: unknown): BaseError {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return new BaseError("PrismaError", 409, "Duplicate record");
    }
    if (error.code === "P2025") {
      return new BaseError("PrismaError", 404, "Record not found");
    }
  }

  return new BaseError("PrismaError", 500, "Database error");
}
