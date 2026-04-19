import type { ErrorRequestHandler } from "express";

import config from "../config/index.js";
import type { TErrorSources } from "../interface/error.js";
import ApiError from "./ApiError.js";

const globalErrorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error instanceof Error ? error.message : "Something went wrong";
  const errorSources: TErrorSources = [
    {
      path: "",
      message,
    },
  ];

  response.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.nodeEnv === "development" && error instanceof Error ? error.stack : null,
  });
};

export default globalErrorHandler;
