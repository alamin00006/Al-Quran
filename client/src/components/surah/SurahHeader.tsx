import { BookOpen, MapPin } from "lucide-react";
import type { Surah, Translation } from "@/types/quran";
import { getLocalizedSurahName } from "@/lib/surah-name";

// Displays the selected surah's title, metadata, and Arabic name.
export function SurahHeader({
  surah,
  arabicClass,
  translation,
}: {
  surah: Surah;
  arabicClass: string;
  translation: Translation;
}) {
  const localizedName = getLocalizedSurahName(surah, translation);

  return (
    <header className="relative overflow-hidden rounded-2xl border border-border/50 gradient-hero p-5 text-center text-primary-foreground shadow-elegant sm:rounded-3xl sm:p-12">
      {/* Decorative background layers for the header card. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />

      <div className="relative">
        {/* Metadata pills for surah number, revelation type, and verse count. */}
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm sm:gap-3 sm:px-4">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> Surah {surah.id}
          </span>
          <span className="h-1 w-1 rounded-full bg-primary-foreground/50" />
          <span className="flex items-center gap-1 capitalize">
            <MapPin className="h-3 w-3" /> {surah.type}
          </span>
          <span className="h-1 w-1 rounded-full bg-primary-foreground/50" />
          <span>{surah.total_verses} verses</span>
        </div>

        {/* Localized title block. */}
        <h1
          className={`mt-6 text-4xl text-primary-foreground sm:text-6xl ${arabicClass}`}
          dir="rtl"
        >
          {surah.name_ar}
        </h1>
        <p className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          {localizedName}
        </p>
        <p className="mt-1 text-sm italic text-primary-foreground/70">
          {translation === "bn" ? surah.name_en : surah.name_translation}
        </p>
      </div>
    </header>
  );
}
