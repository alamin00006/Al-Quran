import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BookOpen, Sparkles, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings";

// Renders the fixed top navigation and settings trigger.
export function AppHeader() {
  const { settings, toggleTheme } = useSettings();

  return (
    <header className="fixed inset-x-0 top-0 z-40 glass-strong border-b border-border/50">
      <div className="container flex h-16 min-w-0 items-center justify-between gap-3">
        <Link href="/" className="group flex min-w-0 items-center gap-3 font-semibold">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-soft transition-spring group-hover:scale-105 group-hover:shadow-glow">
            <BookOpen className="h-5 w-5" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent animate-pulse" />
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-lg tracking-tight">Al-Quran</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
              The Noble Recitation
            </span>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full transition-smooth"
            aria-label="Toggle theme"
          >
            {settings.theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </Button>
          <SidebarTrigger className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </header>
  );
}
