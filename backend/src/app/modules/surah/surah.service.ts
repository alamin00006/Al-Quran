import ApiError from "../../../errors/ApiError.js";
import type { Surah as SurahType, SurahWithVerses } from "../../../interface/quran.js";
import { isDBConnected } from "../../../config/db.js";
import { getLocalSurahById, listLocalSurahs } from "../../../shared/localQuranData.js";
import Ayah from "../ayah/ayah.model.js";
import Surah from "./surah.model.js";

/**
 * Returns the complete surah catalogue, using bundled JSON data when MongoDB is unavailable.
 */
export async function listSurahs(): Promise<SurahType[]> {
  if (!isDBConnected()) {
    return listLocalSurahs();
  }

  try {
    return await Surah.find({}, { _id: 0, __v: 0 }).sort({ id: 1 }).lean<SurahType[]>();
  } catch {
    // Keep the public API available during transient database failures.
    return listLocalSurahs();
  }
}

/**
 * Loads a surah with its verses from MongoDB, falling back to the local Quran dataset on infrastructure errors.
 */
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
      // Preserve domain-level not-found responses instead of masking them with fallback data.
      throw error;
    }

    return getLocalSurahById(id);
  }
}
