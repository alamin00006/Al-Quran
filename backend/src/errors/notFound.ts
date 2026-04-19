import type { NextFunction, Request, Response } from "express";

import ApiError from "./ApiError.js";

const notFound = (_request: Request, _response: Response, next: NextFunction): void => {
  next(new ApiError(404, "API not found"));
};

export default notFound;
