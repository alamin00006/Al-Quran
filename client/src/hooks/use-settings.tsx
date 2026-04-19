import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react";
import type { Settings, ArabicFont } from "@/types/quran";
import type { SettingsContextValue } from "@/types/settings";

const STORAGE_KEY = "quran-settings-v1";

const DEFAULT_SETTINGS: Settings = {
  arabicFont: "amiri",
  arabicSize: 32,
  translationSize: 16,
  translation: "en",
  theme: "light",
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

// Loads persisted reader settings from localStorage on the client.
function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// Provides persisted reader settings and mutation helpers to the app.
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setIsLoaded(true);
  }, []);

  // Persists settings after localStorage has been read.
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [isLoaded, settings]);

  // Applies the current theme class to the root document element.
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [settings.theme]);

  const update = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  }, []);

  const value: SettingsContextValue = {
    settings,
    setArabicFont: (f) => update("arabicFont", f),
    setArabicSize: (n) => update("arabicSize", n),
    setTranslationSize: (n) => update("translationSize", n),
    setTranslation: (t) => update("translation", t),
    setTheme: (t) => update("theme", t),
    toggleTheme: () =>
      setSettings((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" })),
    reset: () => setSettings(DEFAULT_SETTINGS),
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// Reads the current settings context.
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}

// Maps the selected Arabic font setting to a Tailwind font utility.
export function arabicFontClass(font: ArabicFont): string {
  switch (font) {
    case "scheherazade":
      return "font-scheherazade";
    case "naskh":
      return "font-naskh";
    default:
      return "font-amiri";
  }
}
