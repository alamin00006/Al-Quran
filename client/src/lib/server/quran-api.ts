import type { Surah, SurahMeta } from "@/lib/quran-types";

type ApiResponse<TData> = {
  success: boolean;
  data: TData;
};

// Resolves the backend API URL for server-side static generation.
const getServerBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Fetches build-time Quran data from the backend for SSG pages.
async function fetchFromApi<TData>(path: string): Promise<TData> {
  const response = await fetch(`${getServerBaseUrl()}${path}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse<TData>;
  return payload.data;
}

// Loads all surah metadata for the statically generated home page.
export const getStaticSurahs = () => fetchFromApi<SurahMeta[]>("/surahs");

// Loads a single surah with verses for statically generated surah pages.
export const getStaticSurahById = (surahId: string | number) =>
  fetchFromApi<Surah>(`/surahs/${surahId}`);
