import type { Request, Response } from "express";

import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { parsePositiveInteger } from "../../../shared/requestValidation.js";
import { getAyahsBySurah } from "../ayah/ayah.service.js";
import { getSurahById, listSurahs } from "./surah.service.js";

/**
 * Handles the surah index endpoint and returns lightweight metadata for all chapters.
 */
export const list = catchAsync(async (_request: Request, response: Response) => {
  const data = await listSurahs();
  sendResponse(response, {
    statusCode: 200,
    success: true,
    message: "Surahs retrieved successfully",
    meta: { count: data.length },
    data,
  });
});

/**
 * Handles a single-surah request after validating the route parameter.
 */
export const getOne = catchAsync(async (request: Request, response: Response) => {
  const surahId = parsePositiveInteger(request.params.id, "Surah id");
  const data = await getSurahById(surahId);
  sendResponse(response, {
    statusCode: 200,
    success: true,
    message: "Surah retrieved successfully",
    data,
  });
});

/**
 * Handles verse collection requests for a specific surah.
 */
export const getAyahs = catchAsync(async (request: Request, response: Response) => {
  const surahId = parsePositiveInteger(request.params.id, "Surah id");
  const data = await getAyahsBySurah(surahId);
  sendResponse(response, {
    statusCode: 200,
    success: true,
    message: "Ayahs retrieved successfully",
    meta: { count: data.length },
    data,
  });
});
