import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SurahMeta, Translation } from "@/lib/quran-types";
import { getLocalizedSurahName } from "@/lib/surah-name";

// Renders previous and next surah links for sequential reading.
export function SurahNavigation({
  previousSurah,
  nextSurah,
  translation,
}: {
  previousSurah: SurahMeta | null;
  nextSurah: SurahMeta | null;
  translation: Translation;
}) {
  return (
    <nav className="flex flex-col items-stretch justify-between gap-2 pt-4 sm:flex-row sm:items-center">
      {/* Previous surah action. */}
      {previousSurah ? (
        <Button
          variant="outline"
          asChild
          className="h-12 w-full rounded-xl border-border/60 bg-card/60 backdrop-blur-sm transition-smooth hover:border-primary/40 sm:w-auto sm:flex-initial"
        >
          <Link href={`/surah/${previousSurah.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Previous
              </span>
              <span className="truncate text-sm font-medium">
                {getLocalizedSurahName(previousSurah, translation)}
              </span>
            </div>
          </Link>
        </Button>
      ) : (
        <span />
      )}

      {/* Next surah action. */}
      {nextSurah ? (
        <Button
          variant="outline"
          asChild
          className="h-12 w-full rounded-xl border-border/60 bg-card/60 backdrop-blur-sm transition-smooth hover:border-primary/40 sm:w-auto sm:flex-initial"
        >
          <Link href={`/surah/${nextSurah.id}`}>
            <div className="flex flex-col items-end leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Next
              </span>
              <span className="truncate text-sm font-medium">
                {getLocalizedSurahName(nextSurah, translation)}
              </span>
            </div>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}
