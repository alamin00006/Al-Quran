import { Skeleton } from "@/components/ui/skeleton";

// Shows placeholder search result cards while ayah search is loading.
export function AyahSearchSkeleton() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 3 }).map((_, skeletonIndex) => (
        <li
          key={skeletonIndex}
          className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-card"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <Skeleton className="mb-4 ml-auto h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </li>
      ))}
    </ul>
  );
}
