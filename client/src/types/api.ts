import type { Verse } from "./quran";

export type TranslationLanguage = "en" | "bn";
export type TagType = "Search";

export interface ApiResponse<TData, TMeta = unknown> {
  success: boolean;
  statusCode?: number;
  message?: string | null;
  data: TData;
  meta?: TMeta;
}

export interface SearchAyahsQueryParams {
  searchTerm: string;
  translationLanguage?: TranslationLanguage;
  page?: number;
  limit?: number;
}

export interface SearchAyahsResponse {
  total: number;
  page: number;
  limit: number;
  results: Array<Verse & { surahId: number }>;
}
