import fs from "node:fs";
import path from "node:path";

import ApiError from "../errors/ApiError.js";
import type {
  Ayah,
  SearchAyahsInput,
  SearchAyahsResult,
  Surah,
  SurahWithVerses,
  TranslationLanguage,
} from "../interface/quran.js";

interface QuranDataSurah extends Surah {
  verses: Array<Omit<Ayah, "surahId">>;
}

const translationLanguages: TranslationLanguage[] = ["en", "bn"];

let surahsCache: Surah[] | null = null;
let quranCache: QuranDataSurah[] | null = null;

function dataPath(fileName: string) {
  return path.join(process.cwd(), "data", fileName);
}

function readJsonFile<T>(fileName: string): T {
  return JSON.parse(fs.readFileSync(dataPath(fileName), "utf8")) as T;
}

function getSurahs() {
  surahsCache ??= readJsonFile<Surah[]>("surahs.json").sort(
    (a, b) => a.id - b.id,
  );
  return surahsCache;
}

function getQuran() {
  quranCache ??= readJsonFile<QuranDataSurah[]>("quran.json").sort(
    (a, b) => a.id - b.id,
  );
  return quranCache;
}

function isTranslationLanguage(value: string): value is TranslationLanguage {
  return translationLanguages.includes(value as TranslationLanguage);
}

export function listLocalSurahs(): Surah[] {
  return getSurahs();
}

export function getLocalSurahById(id: number): SurahWithVerses {
  const surah = getQuran().find((item) => item.id === id);

  if (!surah) {
    throw new ApiError(404, `Surah ${id} not found`);
  }

  return { ...surah, verses: surah.verses };
}

export function getLocalAyahsBySurah(surahId: number): Ayah[] {
  const surah = getQuran().find((item) => item.id === surahId);
  return surah?.verses.map((verse) => ({ surahId, ...verse })) ?? [];
}

export function getLocalAyah(surahId: number, ayahId: number): Ayah {
  const ayah = getLocalAyahsBySurah(surahId).find(
    (verse) => verse.id === ayahId,
  );

  if (!ayah) {
    throw new ApiError(404, `Ayah ${surahId}:${ayahId} not found`);
  }

  return ayah;
}

export function searchLocalAyahs({
  q,
  lang = "en",
  limit = 50,
  page = 1,
}: SearchAyahsInput): SearchAyahsResult {
  if (!q?.trim()) {
    throw new ApiError(400, "Query 'q' is required");
  }

  if (!isTranslationLanguage(lang)) {
    throw new ApiError(400, "lang must be 'en' or 'bn'");
  }

  const searchTerm = q.trim().toLowerCase();
  const boundedLimit = Math.min(limit, 200);
  const boundedPage = page;
  const start = (boundedPage - 1) * boundedLimit;

  const results = getQuran()
    .flatMap((surah) =>
      surah.verses.map((verse) => ({ surahId: surah.id, ...verse })),
    )
    .filter((ayah) => ayah[lang].toLowerCase().includes(searchTerm));

  return {
    total: results.length,
    page: boundedPage,
    limit: boundedLimit,
    results: results.slice(start, start + boundedLimit),
  };
}
