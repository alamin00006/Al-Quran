import { Sparkles } from "lucide-react";
import { SearchInput } from "@/components/shared/SearchInput";

const heroArabicText = "\u0671\u0642\u0652\u0631\u064e\u0623\u0652 \u0628\u0650\u0671\u0633\u0652\u0645\u0650 \u0631\u064e\u0628\u0650\u0651\u0643\u064e";

const heroStats = [
  { value: "114", label: "Surahs" },
  { value: "6,236", label: "Ayahs" },
  { value: "2", label: "Translations" },
];

// Renders the home hero and primary search input.
export function HomeHero({
  searchInput,
  onSearchInputChange,
  onClearSearch,
}: {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onClearSearch: () => void;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/50 gradient-hero text-primary-foreground shadow-elegant sm:rounded-3xl">
      {/* Background pattern layer for visual depth. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-glow/30 blur-3xl" />

      <div className="relative px-4 py-10 text-center animate-fade-in-up sm:px-12 sm:py-16">
        {/* Page introduction and title. */}
        <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:px-4">
          <Sparkles className="h-3 w-3 text-accent-glow" />
          <span className="truncate uppercase tracking-wider">The Noble Quran</span>
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-6xl">
          Read &amp; Reflect
        </h1>

        <p className="mt-4 font-amiri text-2xl text-accent-glow sm:text-3xl" dir="rtl">
          {heroArabicText}
        </p>

        <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/80 sm:text-base">
          Search any surah or ayah - all 6,236 verses with Arabic, English &amp; Bangla translations.
        </p>

        {/* Search input used for both surah filtering and ayah search. */}
        <div className="mx-auto mt-8 max-w-xl">
          <SearchInput
            value={searchInput}
            onChange={onSearchInputChange}
            onClear={onClearSearch}
            placeholder="Search surah or ayah (e.g. mercy, prayer, Al-Fatiha, 36)..."
            className="border-0 bg-background/95 text-foreground shadow-lg backdrop-blur-sm focus-visible:ring-accent"
          />
        </div>

        {/* Dataset summary shown below the search input. */}
        <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-2 text-center sm:mt-10 sm:gap-4">
          {heroStats.map((statistic) => (
            <div key={statistic.label}>
              <div className="font-display text-xl font-bold text-accent-glow sm:text-3xl">
                {statistic.value}
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-widest text-primary-foreground/70">
                {statistic.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
