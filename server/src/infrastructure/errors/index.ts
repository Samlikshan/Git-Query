import { BaseError } from "./base.error";

export class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super("NotFoundError", 404, message);
  }
}

export class ValidationError extends BaseError {
  constructor(message = "Invalid input") {
    super("ValidationError", 400, message);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized") {
    super("UnauthorizedError", 401, message);
  }
}
