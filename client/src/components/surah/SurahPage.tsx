"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useSettings, arabicFontClass } from "@/hooks/use-settings";
import { Bismillah } from "@/components/surah/Bismillah";
import { SurahHeader } from "@/components/surah/SurahHeader";
import { SurahNavigation } from "@/components/surah/SurahNavigation";
import { VerseList } from "@/components/surah/VerseList";
import { SearchInput } from "@/components/shared/SearchInput";
import { normalizeSearchText } from "@/lib/search-normalize";
import type { Surah, SurahMeta } from "@/lib/quran-types";

// Determines whether the Bismillah should appear before the current surah.
const shouldShowBismillah = (surahId: number, searchTerm: string) =>
  !searchTerm && surahId !== 1 && surahId !== 9;

// Coordinates the surah reading page, including local ayah filtering and settings.
const SurahPage = ({
  id,
  initialSurah,
  initialSurahs = [],
}: {
  id: string;
  initialSurah?: Surah;
  initialSurahs?: SurahMeta[];
}) => {
  const surahId = Number(id);
  const { settings } = useSettings();
  const [searchInput, setSearchInput] = useState("");
  const searchTerm = searchInput.trim();
  const surah = initialSurah ?? null;
  const arabicClass = arabicFontClass(settings.arabicFont);

  // Filters verses locally inside the currently loaded surah.
  const filteredVerses = useMemo(() => {
    if (!surah) return [];

    const normalizedSearchTerm = normalizeSearchText(searchTerm);
    if (!normalizedSearchTerm) return surah.verses;

    return surah.verses.filter((verse) => {
      const translatedText =
        settings.translation === "bn" ? verse.bn : verse.en;
      const searchableVerseText = normalizeSearchText(
        `${verse.id} ${verse.ar} ${translatedText}`,
      );

      return searchableVerseText.includes(normalizedSearchTerm);
    });
  }, [surah, searchTerm, settings.translation]);

  // Resolves adjacent surahs for sequential navigation.
  const { previousSurah, nextSurah } = useMemo(() => {
    if (!surah) return { previousSurah: null, nextSurah: null };

    return {
      previousSurah:
        surahId > 1
          ? (initialSurahs.find((surahMeta) => surahMeta.id === surahId - 1) ??
            null)
          : null,
      nextSurah:
        surahId < 114
          ? (initialSurahs.find((surahMeta) => surahMeta.id === surahId + 1) ??
            null)
          : null,
    };
  }, [initialSurahs, surah, surahId]);

  if (!surah) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Surah not found</h1>
        <Link
          href="/"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Back to surah list
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl min-w-0 space-y-6 sm:space-y-8">
      {/* Back navigation to the surah list. */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" /> All surahs
        </Link>
      </div>

      {/* Surah metadata and Arabic title header. */}
      <SurahHeader
        surah={surah}
        arabicClass={arabicClass}
        translation={settings.translation}
      />

      {/* Local ayah search within the loaded surah. */}
      <SearchInput
        value={searchInput}
        onChange={setSearchInput}
        onClear={() => setSearchInput("")}
        placeholder={`Search ayahs in ${
          settings.translation === "bn" && surah.name_bn ? surah.name_bn : surah.name_en
        }...`}
        className="border-border/60 bg-card/70 backdrop-blur-sm focus-visible:border-primary/40 focus-visible:ring-primary/20"
      />

      {/* Search match summary shown only while filtering ayahs. */}
      {searchTerm && (
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground">
            {filteredVerses.length} match
            {filteredVerses.length !== 1 ? "es" : ""}
          </span>
          <div className="ornament flex flex-1" />
        </div>
      )}

      {/* Bismillah section shown for eligible surahs when not filtering. */}
      {shouldShowBismillah(surah.id, searchTerm) && (
        <Bismillah arabicClass={arabicClass} arabicSize={settings.arabicSize} />
      )}

      {/* Verse list with active Arabic and translation typography settings. */}
      <VerseList
        verses={filteredVerses}
        surahId={surah.id}
        searchTerm={searchTerm}
        arabicClass={arabicClass}
        arabicSize={settings.arabicSize}
        translation={settings.translation}
        translationSize={settings.translationSize}
      />

      {/* Previous and next surah navigation for linear reading. */}
      {!searchTerm && (
        <SurahNavigation
          previousSurah={previousSurah}
          nextSurah={nextSurah}
          translation={settings.translation}
        />
      )}
    </div>
  );
};

export default SurahPage;
