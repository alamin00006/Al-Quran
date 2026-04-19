import type { Translation, Verse } from "@/lib/quran-types";
import { HighlightedText } from "@/components/shared/HighlightedText";

// Renders one ayah with Arabic text, translation, numbering, and highlights.
export function VerseCard({
  verse,
  surahId,
  verseIndex,
  searchTerm,
  arabicClass,
  arabicSize,
  translation,
  translationSize,
}: {
  verse: Verse;
  surahId: number;
  verseIndex: number;
  searchTerm: string;
  arabicClass: string;
  arabicSize: number;
  translation: Translation;
  translationSize: number;
}) {
  const translatedText = translation === "bn" ? verse.bn : verse.en;

  return (
    <li
      id={String(verse.id)}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-4 shadow-card backdrop-blur-sm transition-spring animate-fade-in-up hover:border-primary/30 hover:shadow-soft sm:p-8"
      style={{
        animationDelay: `${Math.min(verseIndex * 20, 300)}ms`,
        animationFillMode: "backwards",
      }}
    >
      {/* Ayah metadata row with local and global verse references. */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center text-xs font-bold text-primary-foreground gradient-primary shadow-soft"
            style={{
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            }}
          >
            {verse.id}
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Ayah {verse.id}
          </span>
        </div>
        <span className="text-xs text-muted-foreground/60">
          {surahId}:{verse.id}
        </span>
      </div>

      {/* Arabic verse text controlled by the selected Arabic font and size. */}
      <p
        className={`arabic-text text-foreground ${arabicClass}`}
        style={{ fontSize: `clamp(1.35rem, 7vw, ${arabicSize}px)`, lineHeight: 1.95 }}
      >
        {verse.ar}
      </p>

      {/* Translation text controlled by the selected translation size. */}
      <div className="mt-5 border-t border-border/50 pt-4">
        <p
          className="leading-relaxed text-muted-foreground"
          style={{ fontSize: `clamp(0.875rem, 4vw, ${translationSize}px)` }}
          lang={translation}
        >
          {searchTerm ? (
            <HighlightedText text={translatedText} searchTerm={searchTerm} />
          ) : (
            translatedText
          )}
        </p>
      </div>
    </li>
  );
}
