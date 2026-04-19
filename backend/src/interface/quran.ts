export type RevelationType = "meccan" | "medinan";
export type TranslationLanguage = "en" | "bn";

export interface Surah {
  id: number;
  name_ar: string;
  name_en: string;
  name_bn: string;
  name_translation: string;
  type: RevelationType;
  total_verses: number;
}

export interface Ayah {
  surahId: number;
  id: number;
  ar: string;
  en: string;
  bn: string;
}

export interface SurahWithVerses extends Surah {
  verses: Omit<Ayah, "surahId">[];
}

export interface SearchAyahsInput {
  q?: string;
  lang?: TranslationLanguage;
  limit?: number;
  page?: number;
}

export interface SearchAyahsResult {
  total: number;
  page: number;
  limit: number;
  results: Ayah[];
}
