import type { SurahMeta, Translation } from "@/lib/quran-types";

// Returns the localized surah name for the active translation language.
export function getLocalizedSurahName(
  surah: Pick<SurahMeta, "name_en" | "name_bn">,
  translation: Translation,
) {
  return translation === "bn" && surah.name_bn ? surah.name_bn : surah.name_en;
}
