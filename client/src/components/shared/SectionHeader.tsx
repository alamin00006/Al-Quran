import { Loader2 } from "lucide-react";

// Renders a section title with count metadata and optional loading indicator.
export function SectionHeader({
  title,
  countLabel,
  isLoading = false,
}: {
  title: string;
  countLabel: string;
  isLoading?: boolean;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
      <h2 className="font-display text-lg font-semibold text-foreground sm:text-xl">
        {title}
      </h2>
      <div className="ornament hidden min-w-16 flex-1 items-center sm:flex" />
      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
        {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
        {countLabel}
      </span>
    </div>
  );
}
