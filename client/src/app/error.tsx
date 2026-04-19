"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Displays a recoverable route-level error state for the Next.js app router.
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4 py-16 text-center">
      <div className="w-full space-y-6 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-card backdrop-blur-sm sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The page could not load properly. Try again, or return home and
            continue reading.
          </p>
        </div>

        {error.digest && (
          <p className="rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
