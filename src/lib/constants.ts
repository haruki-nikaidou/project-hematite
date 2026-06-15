export const LEVELS = [
  "elementry",
  "basis",
  "essential",
  "advanced",
  "cutting-edge",
] as const;

export const CATEGORIES = [
  "tricks",
  "proof",
  "homework",
  "side-lines",
] as const;

export const FIRST_SEGMENTS = [...LEVELS, ...CATEGORIES] as const;

export const LOCALES = ["en", "ja", "zh-tw"] as const;
export const DEFAULT_LOCALE = "en" as const;

export type Level = (typeof LEVELS)[number];
export type Category = (typeof CATEGORIES)[number];
export type FirstSegment = (typeof FIRST_SEGMENTS)[number];
export type Locale = (typeof LOCALES)[number];

export const LEVEL_LABELS: Record<Level, string> = {
  elementry: "Elementry",
  basis: "Basis",
  essential: "Essential",
  advanced: "Advanced",
  "cutting-edge": "Cutting Edge",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  tricks: "Tricks",
  proof: "Proof",
  homework: "Homework",
  "side-lines": "Side Lines",
};

export const LEVEL_ORDER: Record<Level, number> = {
  elementry: 0,
  basis: 1,
  essential: 2,
  advanced: 3,
  "cutting-edge": 4,
};
