import type { Request, Response } from "express";

import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { parsePositiveInteger } from "../../../shared/requestValidation.js";
import { getAyah } from "./ayah.service.js";

export const getOne = catchAsync(async (request: Request, response: Response) => {
  const surahId = parsePositiveInteger(request.params.surahId, "Surah id");
  const ayahId = parsePositiveInteger(request.params.ayahId, "Ayah id");
  const data = await getAyah(surahId, ayahId);
  sendResponse(response, {
    statusCode: 200,
    success: true,
    message: "Ayah retrieved successfully",
    data,
  });
});
