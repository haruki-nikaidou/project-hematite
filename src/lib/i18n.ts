import { LOCALES, DEFAULT_LOCALE, type Locale } from "./constants";

export { LOCALES, DEFAULT_LOCALE };
export type { Locale };

export function isLocale(s: string): s is Locale {
  return (LOCALES as readonly string[]).includes(s);
}

/** UI strings keyed by locale. Add more keys as needed. */
const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.search.placeholder": "Search checkpoints…",
    "cp.prerequisites": "Prerequisites",
    "cp.dependents": "Used by",
    "cp.updated": "Last updated",
    "cp.tags": "Tags",
    "cp.translation_pending": "Translation pending",
    "index.checkpoints": "Checkpoints",
    "index.subcategories": "Subcategories",
    "level.elementry": "Elementry",
    "level.basis": "Basis",
    "level.essential": "Essential",
    "level.advanced": "Advanced",
    "level.cutting-edge": "Cutting Edge",
    "category.tricks": "Tricks",
    "category.proof": "Proof",
    "category.homework": "Homework",
    "category.side-lines": "Side Lines",
    "theme.toggle": "Toggle theme",
    "lang.switch": "Language",
  },
  ja: {
    "nav.home": "ホーム",
    "nav.about": "このサイトについて",
    "nav.search.placeholder": "チェックポイントを検索…",
    "cp.prerequisites": "前提知識",
    "cp.dependents": "これを使うもの",
    "cp.updated": "最終更新",
    "cp.tags": "タグ",
    "cp.translation_pending": "翻訳中",
    "index.checkpoints": "チェックポイント",
    "index.subcategories": "サブカテゴリ",
    "level.elementry": "入門",
    "level.basis": "基礎",
    "level.essential": "必須",
    "level.advanced": "上級",
    "level.cutting-edge": "最先端",
    "category.tricks": "テクニック",
    "category.proof": "証明",
    "category.homework": "宿題",
    "category.side-lines": "サイドライン",
    "theme.toggle": "テーマ切替",
    "lang.switch": "言語",
  },
} satisfies Record<Locale, Record<string, string>>;

type UIKey = keyof (typeof ui)["en"];

export function t(lang: Locale, key: UIKey): string {
  return (
    (ui[lang] as Record<string, string>)[key] ??
    (ui["en"] as Record<string, string>)[key] ??
    key
  );
}
