import ApiError from "../../../errors/ApiError.js";
import type {
  Ayah as AyahType,
  SearchAyahsInput,
  SearchAyahsResult,
  TranslationLanguage,
} from "../../../interface/quran.js";
import { isDBConnected } from "../../../config/db.js";
import { searchLocalAyahs } from "../../../shared/localQuranData.js";
import Ayah from "../ayah/ayah.model.js";

const translationLanguages: TranslationLanguage[] = ["en", "bn"];

function isTranslationLanguage(value: string): value is TranslationLanguage {
  return translationLanguages.includes(value as TranslationLanguage);
}

export async function searchAyahs({
  q,
  lang = "en",
  limit = 50,
  page = 1,
}: SearchAyahsInput): Promise<SearchAyahsResult> {
  if (!q?.trim()) {
    throw new ApiError(400, "Query 'q' is required");
  }

  if (!isTranslationLanguage(lang)) {
    throw new ApiError(400, "lang must be 'en' or 'bn'");
  }

  if (!isDBConnected()) {
    return searchLocalAyahs({ q, lang, limit, page });
  }

  const safeSearchTerm = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundedLimit = Math.min(limit, 200);
  const boundedPage = page;
  const skip = (boundedPage - 1) * boundedLimit;
  const filter = { [lang]: { $regex: safeSearchTerm, $options: "i" } };

  try {
    const [results, total] = await Promise.all([
      Ayah.find(filter, { _id: 0, __v: 0 })
        .sort({ surahId: 1, id: 1 })
        .skip(skip)
        .limit(boundedLimit)
        .lean<AyahType[]>(),
      Ayah.countDocuments(filter),
    ]);

    return { total, page: boundedPage, limit: boundedLimit, results };
  } catch {
    return searchLocalAyahs({ q, lang, limit, page });
  }
}
