import type { Verse } from "@/lib/quran-types";
import { baseApi } from "./base-api";

export type TranslationLanguage = "en" | "bn";

interface ApiResponse<TData, TMeta = unknown> {
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

// Injects Quran-specific endpoints into the shared RTK Query API slice.
export const quranApi = baseApi.injectEndpoints({
  endpoints: (endpointBuilder) => ({
    searchAyahsByText: endpointBuilder.query<SearchAyahsResponse, SearchAyahsQueryParams>({
      // Searches ayah translations by text and language.
      query: ({
        searchTerm,
        translationLanguage = "en",
        page = 1,
        limit = 50,
      }) => ({
        url: "/search",
        params: {
          q: searchTerm,
          lang: translationLanguage,
          page,
          limit,
        },
      }),
      // Combines result data with pagination metadata.
      transformResponse: (
        response: ApiResponse<Array<Verse & { surahId: number }>, Omit<SearchAyahsResponse, "results">>,
      ) => ({
        total: response.meta?.total ?? response.data.length,
        page: response.meta?.page ?? 1,
        limit: response.meta?.limit ?? response.data.length,
        results: response.data,
      }),
      providesTags: ["Search"],
    }),
  }),
  overrideExisting: false,
});

export const { useSearchAyahsByTextQuery } = quranApi;
