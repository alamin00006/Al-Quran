import ApiError from "../../../errors/ApiError.js";
import type { Ayah as AyahType } from "../../../interface/quran.js";
import { isDBConnected } from "../../../config/db.js";
import { getLocalAyah, getLocalAyahsBySurah } from "../../../shared/localQuranData.js";
import Ayah from "./ayah.model.js";

export async function getAyahsBySurah(surahId: number): Promise<AyahType[]> {
  if (!isDBConnected()) {
    return getLocalAyahsBySurah(surahId);
  }

  try {
    return await Ayah.find({ surahId }, { _id: 0, __v: 0 }).sort({ id: 1 }).lean<AyahType[]>();
  } catch {
    return getLocalAyahsBySurah(surahId);
  }
}

export async function getAyah(surahId: number, ayahId: number): Promise<AyahType> {
  if (!isDBConnected()) {
    return getLocalAyah(surahId, ayahId);
  }

  try {
    const ayah = await Ayah.findOne({ surahId, id: ayahId }, { _id: 0, __v: 0 }).lean<AyahType>();

    if (!ayah) {
      throw new ApiError(404, `Ayah ${surahId}:${ayahId} not found`);
    }

    return ayah;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    return getLocalAyah(surahId, ayahId);
  }
}
