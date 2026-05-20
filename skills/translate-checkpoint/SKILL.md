---
name: translate-checkpoint
description: Translate an existing Project Hematite checkpoint from English into another locale (primarily Japanese) — covers which frontmatter fields to translate vs. preserve verbatim, file placement at `contents/<lang>/<cpId>.md`, Japanese-specific tone and terminology rules, code/math handling, and the "translation pending" marker for partial work. Use whenever the user asks to translate, localise, or produce a Japanese (or other-locale) version of a checkpoint, or edits any file under `contents/ja/` (or another non-English locale).
---

# Translate Checkpoint

This skill is for **translating** an existing checkpoint into another locale. If you are writing a brand-new article from scratch, use [write-checkpoint](../write-checkpoint/SKILL.md) instead. The authoritative spec is [`roles/writing-articles.md`](../../roles/writing-articles.md), §10 in particular.

## 1. Confirm the English source exists

Every checkpoint **must** exist in English first. Before translating, verify:

```
contents/en/<cpId>.md          ← must exist
contents/<lang>/<cpId>.md      ← the file you will create or edit
```

`<lang>` is currently `ja`. The cpId is identical across locales — it does not get translated.

If the English file is missing, stop and use [write-checkpoint](../write-checkpoint/SKILL.md) to author it first.

## 2. Copy the file structure, then translate selectively

Start from the English original. Translate only the prose; keep machine-readable identifiers untouched.

### What to translate

| Item | Action |
|------|--------|
| `title` value | Translate |
| `summary` value | Translate |
| `tags` values | Translate (see [§2.1 Translating tags](#21-translating-tags) below) |
| Body prose | Translate |
| Section headings | Translate (may rephrase naturally, not literally) |
| Code comments (prose) | Translate the natural-language portion |
| Table cell prose | Translate prose; keep technical terms as-is |

### What to keep verbatim

| Item | Why |
|------|-----|
| Frontmatter field names (`title:`, `prerequisites:`, …) | They are code |
| `prerequisites` values (cpIds) | cpIds are language-neutral, no `ja/` prefix |
| `aliases` values | Same — cpIds |
| `updated` date | Copy unchanged from the English original |
| Code tokens, identifiers, type names, CLI commands | English |
| Math LaTeX source | English/LaTeX |
| File paths inside code blocks | English |

### 2.1 Translating tags

Tags are reader-facing labels, so every locale gets its own version. Rules:

- Translate every entry of `tags` into the target locale; do not leave them in English.
- The English ↔ translated list must be **the same length and in the same order** — each English tag has exactly one translated counterpart at the same index.
- Use the established term in the target language. If none exists, use the same first-mention convention as the body: katakana for Japanese (e.g. English `Ownership` → Japanese `所有権`; English `Newtype Pattern` → Japanese `ニュータイプパターン`).
- Reuse tags already used by other checkpoints in the same locale rather than coining new ones. Stay terminologically consistent across the locale's corpus — if `所有権` is already established for `Ownership`, do not introduce a new variant like `オーナーシップ`.
- Capitalisation: English tags are Title Case; Japanese tags use the natural form (no Latin-style capitalisation, no parenthetical English gloss inside the tag itself).
- Tags that are proper nouns or product names (e.g. `Rust`, `KaTeX`, `LLVM`) stay as-is across all locales.

Example:

```yaml
tags: ["Number", "Constant"]                 # contents/en/...
tags: ["数", "定数"]                          # contents/ja/...
```

### Worked frontmatter example

English (`contents/en/basis/math/analysis/e.md`):

```yaml
---
title: e (Base of Natural Logarithm)
summary: "Introduces Euler's number e ≈ 2.71828, defined as the limit of compound growth, shown to equal an infinite series of reciprocal factorials, and proved irrational."
prerequisites:
  - basis/math/analysis/real_number_a
  - basis/math/analysis/limit
aliases: []
tags: ["Number", "Constant"]
updated: 2026-05-13
---
```

Japanese (`contents/ja/basis/math/analysis/e.md`):

```yaml
---
title: e（自然対数の底）
summary: "オイラー数 e ≈ 2.71828 を複利成長の極限として定義し、逆数の階乗の無限級数に等しいことを示し、無理数であることを証明する。"
prerequisites:
  - basis/math/analysis/real_number_a
  - basis/math/analysis/limit
aliases: []
tags: ["数", "定数"]
updated: 2026-05-13
---
```

Note: `prerequisites`, `aliases`, `updated` are byte-identical. `title`, `summary`, and `tags` are all translated; the `tags` list keeps the same length and order as the English original.

## 3. Japanese-specific rules

When `<lang> = ja`:

- Use natural, technical-but-accessible Japanese. **Avoid heavy keigo** in body text; a friendly non-`です／ます` style is preferred (the existing corpus uses plain form: 「〜だ」「〜する」).
- Section headings can be rephrased to sound natural in Japanese — do not translate word-for-word if the result reads awkwardly.
- For technical terms:
  - **No established Japanese equivalent** → katakana followed by English in parentheses on first mention: `スタック（stack）`.
  - **Established Japanese equivalent exists** → Japanese term followed by English in parentheses on first mention: `再帰（recursion）`.
  - After the first mention, drop the parenthetical.
- Do not translate code-block file paths, identifiers, or virtual paths.
- Math (`$…$` and `$$…$$`) stays in LaTeX. Translate only `\text{…}` labels where they are natural-language and helpful.
- Punctuation: use full-width Japanese punctuation in prose (`、`, `。`, `（）`); keep ASCII punctuation inside math, code, and inline `` `code` ``.

## 4. Body structure stays identical

The translated file mirrors the English structure section-by-section. **Do not** reorder, add, or omit sections. The summary list at the end (required for `elementry` and `basis`) must have the same bullet points in the same order.

If a section in the English original references another checkpoint with a relative link like `[Stacks](../stack/)`, keep the same link target — locale-aware routing handles the rest.

## 5. Handling incomplete or in-progress translations

If you publish a Japanese file that is partial or knowingly out-of-date, add this comment at the **very top of the body** (immediately after the closing `---` of the frontmatter):

```html
<!-- TODO: 翻訳中 / Translation in progress -->
```

The site renders a "Translation pending" banner when this marker is present. Remove the marker once the translation is complete and matches the latest English version.

## 6. Keeping a translation in sync

When the English file's `updated` date changes, the Japanese counterpart is by definition stale. To bring it up to date:

1. Diff the English file against the version your translation was last synced with.
2. Translate the changed portions.
3. Update the Japanese file's `updated` to match the new English `updated`.

If you cannot finish in one pass, add the translation-pending marker (step 5) and leave a clear TODO comment near unfinished sections.

## 7. Final checklist

Before declaring the translation done:

- [ ] File at `contents/<lang>/<cpId>.md` with cpId identical to the English source.
- [ ] `prerequisites`, `aliases`, `updated` are byte-identical to the English file.
- [ ] `title`, `summary`, and **every** `tags` entry are translated and read naturally in the target language.
- [ ] `tags` list has the same length and order as the English original; reuses existing locale tags where possible.
- [ ] Body section structure matches the English source one-to-one.
- [ ] Japanese: plain form (not `です／ます`); first-mention terminology rule applied.
- [ ] All math `$…$` / `$$…$$` blocks are untouched LaTeX.
- [ ] All code blocks: language tag preserved, identifiers untouched, only prose comments translated.
- [ ] Relative cross-reference links (`../foo/`) unchanged.
- [ ] Translation-pending marker present iff the translation is intentionally incomplete.
- [ ] `pnpm build` runs clean.

## Common mistakes to avoid

| Don't | Do instead |
|-------|------------|
| Prefix prerequisites with `ja/` | cpIds are language-neutral |
| Leave `tags` in English | Translate every tag into the target locale, preserving list length and order |
| Coin a new locale-specific term for a tag that already has an established translation elsewhere in the corpus | Reuse the existing locale tag (e.g. always `所有権` for `Ownership`) |
| Translate code identifiers or type names | Keep them in English |
| Translate LaTeX commands or math symbols | Math source is universal |
| Bump `updated` past the English file's date | They should match |
| Use `です／ます` body style | Use plain form (`〜だ`, `〜する`) |
| Render `スタック` with no English gloss on first mention | `スタック（stack）` |
| Add or omit sections relative to the English source | Mirror structure exactly |
| Forget the translation-pending marker on partial work | Add the HTML comment at the top of the body |

## Additional resources

- Full normative spec: [`roles/writing-articles.md`](../../roles/writing-articles.md) — see §10
- English original to translate from: `contents/en/<cpId>.md`
- Reference parallel pair: [`contents/en/basis/math/analysis/e.md`](../../contents/en/basis/math/analysis/e.md) ↔ [`contents/ja/basis/math/analysis/e.md`](../../contents/ja/basis/math/analysis/e.md)
- To write a fresh article first: [write-checkpoint](../write-checkpoint/SKILL.md)
