import ApiError from "../../../errors/ApiError.js";
import type { Surah as SurahType, SurahWithVerses } from "../../../interface/quran.js";
import { isDBConnected } from "../../../config/db.js";
import { getLocalSurahById, listLocalSurahs } from "../../../shared/localQuranData.js";
import Ayah from "../ayah/ayah.model.js";
import Surah from "./surah.model.js";

export async function listSurahs(): Promise<SurahType[]> {
  if (!isDBConnected()) {
    return listLocalSurahs();
  }

  try {
    return await Surah.find({}, { _id: 0, __v: 0 }).sort({ id: 1 }).lean<SurahType[]>();
  } catch {
    return listLocalSurahs();
  }
}

export async function getSurahById(id: number): Promise<SurahWithVerses> {
  if (!isDBConnected()) {
    return getLocalSurahById(id);
  }

  try {
    const surah = await Surah.findOne({ id }, { _id: 0, __v: 0 }).lean<SurahType>();

    if (!surah) {
      throw new ApiError(404, `Surah ${id} not found`);
    }

    const verses = await Ayah.find({ surahId: id }, { _id: 0, __v: 0, surahId: 0 })
      .sort({ id: 1 })
      .lean<SurahWithVerses["verses"]>();

    return { ...surah, verses };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    return getLocalSurahById(id);
  }
}
