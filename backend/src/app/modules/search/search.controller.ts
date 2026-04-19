import type { Request, Response } from "express";

import type { TranslationLanguage } from "../../../interface/quran.js";
import catchAsync from "../../../shared/catchAsync.js";
import { parseOptionalPositiveInteger } from "../../../shared/requestValidation.js";
import sendResponse from "../../../shared/sendResponse.js";
import { searchAyahs } from "./search.service.js";

function getQueryString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

/**
 * Handles translation search requests and normalizes query parameters for the service layer.
 */
export const search = catchAsync(async (request: Request, response: Response) => {
  const query = getQueryString(request.query.q);
  const language = getQueryString(request.query.lang) as TranslationLanguage | undefined;
  const limit = parseOptionalPositiveInteger(request.query.limit, "limit", 50);
  const page = parseOptionalPositiveInteger(request.query.page, "page", 1);

  const data = await searchAyahs({
    q: query,
    lang: language,
    limit,
    page,
  });

  sendResponse(response, {
    statusCode: 200,
    success: true,
    message: "Search results retrieved successfully",
    meta: {
      total: data.total,
      page: data.page,
      limit: data.limit,
    },
    data: data.results,
  });
});
