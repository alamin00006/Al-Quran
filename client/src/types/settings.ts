import type { ArabicFont, Settings, Theme, Translation } from "./quran";

export interface SettingsContextValue {
  settings: Settings;
  setArabicFont: (font: ArabicFont) => void;
  setArabicSize: (size: number) => void;
  setTranslationSize: (size: number) => void;
  setTranslation: (translation: Translation) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  reset: () => void;
}
