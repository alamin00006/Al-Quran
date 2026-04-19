import { memo } from "react";
import Link from "next/link";
import type { ArabicFont, SurahMeta, Translation } from "@/types/quran";
import { arabicFontClass } from "@/hooks/use-settings";
import { getLocalizedSurahName } from "@/lib/surah-name";

// Renders a single surah card used by the home page grid.
function SurahCardComponent({
  surah,
  translation,
  arabicFont,
}: {
  surah: SurahMeta;
  translation: Translation;
  arabicFont: ArabicFont;
}) {
  const localizedName = getLocalizedSurahName(surah, translation);

  return (
    <Link
      href={`/surah/${surah.id}`}
      className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-3 shadow-card backdrop-blur-sm transition-spring hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant sm:gap-4 sm:p-4"
    >
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-smooth group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      <div className="relative shrink-0">
        <div
          className="flex h-12 w-12 items-center justify-center text-sm font-bold text-primary-foreground gradient-primary shadow-soft"
          style={{
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          }}
        >
          {surah.id}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {/* Primary name row with localized name and Arabic name. */}
        <div className="flex min-w-0 items-baseline justify-between gap-2">
          <h3 className="truncate font-display text-base font-semibold text-foreground transition-smooth group-hover:text-primary">
            {localizedName}
          </h3>
          <span
            className={`shrink-0 text-xl text-primary transition-smooth group-hover:text-primary-glow sm:text-2xl ${arabicFontClass(arabicFont)}`}
            dir="rtl"
          >
            {surah.name_ar}
          </span>
        </div>
        {/* Secondary metadata row for translation, verse count, and revelation type. */}
        <p className="mt-1 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
          <span className="min-w-0 truncate">
            {translation === "bn" ? surah.name_en : surah.name_translation}
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>{surah.total_verses} verses</span>
          <span aria-hidden="true">&middot;</span>
          <span
            className={`capitalize ${
              surah.type === "meccan" ? "text-accent-foreground/70" : "text-primary/70"
            }`}
          >
            {surah.type}
          </span>
        </p>
      </div>
    </Link>
  );
}

export const SurahCard = memo(SurahCardComponent);
