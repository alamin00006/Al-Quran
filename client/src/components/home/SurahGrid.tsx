import { memo } from "react";
import { SurahCard } from "@/components/SurahCard";
import type { ArabicFont, SurahMeta, Translation } from "@/lib/quran-types";

// Renders the responsive grid of surah navigation cards.
function SurahGridComponent({
  surahs,
  searchTerm,
  translation,
  arabicFont,
}: {
  surahs: SurahMeta[];
  searchTerm: string;
  translation: Translation;
  arabicFont: ArabicFont;
}) {
  if (surahs.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No surah matches "{searchTerm}".
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {/* Surah cards are capped during search to keep results concise. */}
      {surahs.slice(0, searchTerm ? 6 : surahs.length).map((surah, surahIndex) => (
        <div
          key={surah.id}
          className="animate-fade-in-up"
          style={{
            animationDelay: `${Math.min(surahIndex * 15, 400)}ms`,
            animationFillMode: "backwards",
          }}
        >
          <SurahCard
            surah={surah}
            translation={translation}
            arabicFont={arabicFont}
          />
        </div>
      ))}
    </div>
  );
}

export const SurahGrid = memo(SurahGridComponent);
