import type { Translation, Verse } from "@/lib/quran-types";
import { VerseCard } from "./VerseCard";

// Renders the ordered ayah list for a selected surah.
export function VerseList({
  verses,
  surahId,
  searchTerm,
  arabicClass,
  arabicSize,
  translation,
  translationSize,
}: {
  verses: Verse[];
  surahId: number;
  searchTerm: string;
  arabicClass: string;
  arabicSize: number;
  translation: Translation;
  translationSize: number;
}) {
  return (
    <ol className="space-y-4">
      {/* Ayah cards preserve the original verse order. */}
      {verses.map((verse, verseIndex) => (
        <VerseCard
          key={verse.id}
          verse={verse}
          surahId={surahId}
          verseIndex={verseIndex}
          searchTerm={searchTerm}
          arabicClass={arabicClass}
          arabicSize={arabicSize}
          translation={translation}
          translationSize={translationSize}
        />
      ))}

      {/* Empty state for in-surah searches with no matches. */}
      {searchTerm && verses.length === 0 && (
        <li className="rounded-2xl border border-dashed border-border bg-card/40 py-12 text-center text-sm text-muted-foreground">
          No ayahs in this surah match "{searchTerm}".
        </li>
      )}
    </ol>
  );
}
