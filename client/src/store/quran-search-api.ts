import type {
  ApiResponse,
  SearchAyahsQueryParams,
  SearchAyahsResponse,
} from "@/types/api";
import type { Verse } from "@/types/quran";
import { baseApi } from "./base-api";

// Injects Quran search endpoints into the shared RTK Query API slice.
export const quranSearchApi = baseApi.injectEndpoints({
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

export const { useSearchAyahsByTextQuery } = quranSearchApi;
