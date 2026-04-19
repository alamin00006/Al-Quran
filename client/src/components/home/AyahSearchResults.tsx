import { memo } from "react";
import Link from "next/link";
import type { Translation } from "@/lib/quran-types";
import { HighlightedText } from "@/components/shared/HighlightedText";
import type { AyahSearchHit } from "@/types/quran";

// Renders backend ayah search results on the home page.
function AyahSearchResultsComponent({
  ayahHits,
  searchTerm,
  isSearching,
  arabicClass,
  translation,
}: {
  ayahHits: AyahSearchHit[];
  searchTerm: string;
  isSearching: boolean;
  arabicClass: string;
  translation: Translation;
}) {
  if (ayahHits.length === 0 && !isSearching) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card/40 py-12 text-center text-sm text-muted-foreground">
        No ayahs found for "{searchTerm}".
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {/* Each result links directly to the matching ayah in its surah page. */}
      {ayahHits.map((ayahHit) => (
        <li key={`${ayahHit.surahId}-${ayahHit.verseId}`}>
          <Link
            href={`/surah/${ayahHit.surahId}#${ayahHit.verseId}`}
            className="group block min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4 shadow-card backdrop-blur-sm transition-spring hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft sm:p-5"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-sm font-semibold text-primary">
                {ayahHit.surahName}
              </span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-mono text-secondary-foreground">
                {ayahHit.surahId}:{ayahHit.verseId}
              </span>
            </div>
            <p
              className={`arabic-text mb-3 text-2xl text-foreground sm:text-3xl ${arabicClass}`}
            >
              {ayahHit.ar}
            </p>
            <p
              className="text-sm leading-relaxed text-muted-foreground sm:text-base"
              lang={translation}
            >
              <HighlightedText text={ayahHit.text} searchTerm={searchTerm} />
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const AyahSearchResults = memo(AyahSearchResultsComponent);
