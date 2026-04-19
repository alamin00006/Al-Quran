"use client";

import { useMemo, useState } from "react";

import { useSettings, arabicFontClass } from "@/hooks/use-settings";
import { useDebounced } from "@/hooks/use-debounced";
import { useSearchAyahsByTextQuery } from "@/store/api";
import { AyahSearchResults } from "@/components/home/AyahSearchResults";
import { HomeHero } from "@/components/home/HomeHero";
import { SurahGrid } from "@/components/home/SurahGrid";
import { AyahSearchSkeleton } from "@/components/loadingStates/AyahSearchSkeleton";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { normalizeSearchText } from "@/lib/search-normalize";
import { getLocalizedSurahName } from "@/lib/surah-name";
import type { AyahSearchHit } from "@/types/quran";
import type { SurahMeta } from "@/types/quran";

const MIN_AYAH_SEARCH_LENGTH = 2;
const MAX_SEARCH_RESULTS = 50;

// Coordinates the home page search experience and surah list rendering.
const SurahListPage = ({
  initialSurahs = [],
}: {
  initialSurahs?: SurahMeta[];
}) => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounced(searchInput.trim(), 350);
  const { settings } = useSettings();
  const arabicClass = arabicFontClass(settings.arabicFont);
  const isAyahSearch = debouncedSearchTerm.length >= MIN_AYAH_SEARCH_LENGTH;

  // Searches ayah translations only when the query is long enough.
  const { data: apiSearchResponse, isFetching: isSearchingAyahs } =
    useSearchAyahsByTextQuery(
      {
        searchTerm: debouncedSearchTerm,
        translationLanguage: settings.translation,
        limit: MAX_SEARCH_RESULTS,
      },
      { skip: !isAyahSearch },
    );

  // Filters surah metadata locally for instant name and number search.
  const filteredSurahs = useMemo(() => {
    const normalizedSearchTerm = normalizeSearchText(debouncedSearchTerm);
    if (!normalizedSearchTerm) return initialSurahs;

    return initialSurahs.filter((surah) => {
      const searchableSurahText = normalizeSearchText(
        `${surah.id} ${surah.name_en} ${surah.name_bn ?? ""} ${surah.name_translation} ${surah.name_ar}`,
      );

      return searchableSurahText.includes(normalizedSearchTerm);
    });
  }, [debouncedSearchTerm, initialSurahs]);

  // Prepares localized surah names for ayah search result labels.
  const surahNameById = useMemo(() => {
    const surahNameMap = new Map<number, string>();
    for (const surah of initialSurahs) {
      surahNameMap.set(
        surah.id,
        getLocalizedSurahName(surah, settings.translation),
      );
    }
    return surahNameMap;
  }, [settings.translation, initialSurahs]);

  // Maps backend search results into UI-friendly ayah hit objects.
  const ayahHits: AyahSearchHit[] = useMemo(
    () =>
      (apiSearchResponse?.results ?? []).map((searchResult) => ({
        surahId: searchResult.surahId,
        surahName:
          surahNameById.get(searchResult.surahId) ??
          `Surah ${searchResult.surahId}`,
        verseId: searchResult.id,
        ar: searchResult.ar,
        text: settings.translation === "bn" ? searchResult.bn : searchResult.en,
      })),
    [apiSearchResponse?.results, settings.translation, surahNameById],
  );

  return (
    <div className="min-w-0 space-y-8 sm:space-y-12">
      {/* Hero section with the global search input. */}
      <HomeHero
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onClearSearch={() => setSearchInput("")}
      />

      {/* Surah list section with local filtering against SSG metadata. */}
      <section>
        <SectionHeader
          title={debouncedSearchTerm ? "Matching Surahs" : "Browse Surahs"}
          countLabel={`${filteredSurahs.length} ${
            filteredSurahs.length === 1 ? "surah" : "surahs"
          }`}
        />
        <SurahGrid
          surahs={filteredSurahs}
          searchTerm={debouncedSearchTerm}
          translation={settings.translation}
          arabicFont={settings.arabicFont}
        />
      </section>

      {/* Ayah search section that queries the backend when the search term is long enough. */}
      {isAyahSearch && (
        <section>
          <SectionHeader
            title="Matching Ayahs"
            countLabel={`${ayahHits.length} result${ayahHits.length !== 1 ? "s" : ""}`}
            isLoading={isSearchingAyahs}
          />
          {isSearchingAyahs ? (
            <AyahSearchSkeleton />
          ) : (
            <AyahSearchResults
              ayahHits={ayahHits}
              searchTerm={debouncedSearchTerm}
              isSearching={isSearchingAyahs}
              arabicClass={arabicClass}
              translation={settings.translation}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default SurahListPage;
