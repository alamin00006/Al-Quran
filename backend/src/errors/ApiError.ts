export default class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    stack = "",
  ) {
    super(message);
    this.name = "ApiError";

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
