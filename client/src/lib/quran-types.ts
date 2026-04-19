export interface SurahMeta {
  id: number;
  name_ar: string;
  name_en: string;
  name_bn?: string;
  name_translation: string;
  type: "meccan" | "medinan" | string;
  total_verses: number;
}

export interface Verse {
  id: number;
  ar: string;
  en: string;
  bn: string;
}

export interface Surah extends SurahMeta {
  verses: Verse[];
}

export type ArabicFont = "amiri" | "scheherazade" | "naskh";
export type Translation = "en" | "bn";
export type Theme = "light" | "dark";

export interface Settings {
  arabicFont: ArabicFont;
  arabicSize: number; // px
  translationSize: number; // px
  translation: Translation;
  theme: Theme;
}
