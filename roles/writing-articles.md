# Writing & Translating Articles 

This document is the authoritative guideline for anyone (human or AI agent) writing or translating checkpoint articles for **Project Hematite** — an open education site for future Rust developers.

## 1. Project Overview

Project Hematite teaches computer science, mathematics, and software best practices, aimed at learners who eventually want to write real Rust code. Content is organized as a graph of **checkpoints**: short, self-contained learning units with explicit prerequisite links.

Supported locales (in priority order):

| Code | Language |
|------|----------|
| `en` | English (primary) |
| `ja` | Japanese |

Every checkpoint **must** exist in English. Japanese is optional but welcome.

## 2. Content Taxonomy

### 2.1 Levels (ordered)

| ID | Display | Purpose |
|----|---------|---------|
| `elementry` | Elementary | Zero prior knowledge assumed. Concepts explained from scratch. |
| `basis` | Basis | Core ideas a developer must solidly understand. |
| `essential` | Essential | Directly applicable to writing production Rust. |
| `advanced` | Advanced | Nuanced topics that deepen expertise. |
| `cutting-edge` | Cutting Edge | Frontier research or experimental Rust features. |

Levels are the **first path segment** of every checkpoint ID. They form the URL and file structure.

### 2.2 Non-level Categories

| ID | Display | Purpose |
|----|---------|---------|
| `tricks` | Tricks | Standalone tips, idioms, or patterns that don't fit a level. |
| `proof` | Proof | Formal mathematical proofs, standalone or attached to another checkpoint. |
| `homework` | Homework | Practice exercises or problem sets. |
| `side-lines` | Side Lines | Tangential, curiosity-driven content (e.g. history, fun facts). |

Categories also act as the first path segment.

## 3. File & Path Conventions

### 3.1 Checkpoint ID

A **checkpoint ID** (`cpId`) is a `/`-separated path starting with one of the first segments above, e.g.:

```
elementry/computer_science/commonly_used_os
basis/math/induction
essential/rust/ownership
tricks/rust/newtype_pattern
```

Rules:
- All segments are **snake_case** (lowercase, underscores for spaces).
- No trailing slash, no leading slash.
- The first segment **must** be one of the values in `FIRST_SEGMENTS` (levels + categories).

### 3.2 File Location

The Markdown file lives at:

```
contents/<lang>/<cpId>.md
```

Examples:

| cpId | English file | Japanese file |
|------|-------------|--------------|
| `elementry/computer_science/commonly_used_os` | `contents/en/elementry/computer_science/commonly_used_os.md` | `contents/ja/elementry/computer_science/commonly_used_os.md` |
| `basis/math/induction` | `contents/en/basis/math/induction.md` | `contents/ja/basis/math/induction.md` |

### 3.3 URL

The public URL of a checkpoint is:

```
/<lang>/cp/<cpId>/
```

Example: `/en/cp/elementry/computer_science/commonly_used_os/`

## 4. Frontmatter Schema

Every article must begin with a YAML frontmatter block. All fields are described below.

```
---
title: <string>            # Required. Human-readable title.
summary: <string>          # Recommended. One or two sentence description, shown in search results and index pages.
prerequisites:             # List of cpIds this checkpoint depends on. Default: [].
  - elementry/computer_science/commonly_used_os
aliases:                   # Former cpIds that now resolve to this one. Used after renames. Default: [].
  - elementry/cs/os
tags:                      # Free-form tags for filtering. Default: [].
  - Introduction
updated: YYYY-MM-DD        # Date of last substantive edit. Recommended.
---
```

### 4.1 `title`

- Required, non-empty string.
- Use Title Case for English.
- Keep it concise (aim for ≤ 60 characters).

### 4.2 `summary`

- Strongly recommended. Without a summary, search results and index pages will show nothing.
- 1–2 sentences, written as a complete statement (not a sentence fragment).
- Describe what the reader will know after reading, not just the topic. E.g., prefer _"A beginner-friendly introduction to stacks and how they are used in Rust."_ over _"About stacks."_

### 4.3 `prerequisites`

- A list of **cpIds** that the reader must have completed before reading this checkpoint.
- Each entry must begin with a valid first segment (`elementry`, `basis`, …, `tricks`, `proof`, `homework`, `side-lines`).
- The prerequisite graph across all checkpoints **must be a DAG** (no cycles). The build will fail if a cycle is detected. Verify before committing.
- Less is more: only list direct prerequisites, not transitive ones. If `A → B → C`, list only `B` as a prerequisite of `C`, not both `A` and `B`.
- List prerequisites in the order the reader should ideally study them.

### 4.4 `aliases`

- Use only when a checkpoint is **renamed**. List the old cpId(s) here so external tools and links don't break.
- Do **not** use aliases for synonyms or alternative spellings.
- An alias itself must also start with a valid first segment.

### 4.5 `tags`

- Use Tags for subject classification and cross-cutting concerns.
- Title Case (e.g., `Linear Algebra`, `Ownership`, `Axiom`).
- Reuse existing tags where possible. New tags are fine but must be meaningful.
- Avoid redundant tags that repeat the cpId path (e.g., don't tag `basis/math/induction` with `Basis` or `Math`).

### 4.6 `updated`

- ISO 8601 date (`YYYY-MM-DD`).
- Update this field whenever the article body changes substantially (not for minor typo fixes).

## 5. Article Body

### 5.1 Language & Tone

- **Elementary level**: Conversational, assume zero prior knowledge. Use everyday analogies. Introduce all jargon before using it. Short sentences.
- **Basis level**: Friendly but more precise. Assume the reader has finished all prerequisites. Define terms formally, then explain intuitively.
- **Essential level**: Technical and direct. Assume competence. Link to prerequisites rather than re-explaining.
- **Advanced / Cutting Edge**: Can be dense. Use formal notation where appropriate. Always provide motivation before diving into details.
- **Categories (tricks, proof, homework, side-lines)**: Match the level of the primary checkpoint they accompany, or choose the most appropriate level when standalone.

Write in **second person** ("you", "your"). Never use "one should…" or passive voice as a substitute for addressing the reader.

### 5.2 Structure

A typical article follows this outline:

1. **Opening hook** — 1–3 sentences that answer: "Why does this matter to me?"
2. **Concept sections** — headings starting with `##`, sub-sections with `###`. Each section is self-contained.
3. **Code examples** — short, runnable where possible; always annotated.
4. **Summary / Recap** — bullet list of the key takeaways. Required for `elementry` and `basis`; recommended for other levels.
5. **What's next** (optional) — a brief forward pointer to natural follow-up checkpoints.

Do **not** include a top-level `# Title` heading — the title comes from frontmatter and is rendered by the site.

### 5.3 Section Headings

- Use sentence case for headings (e.g., `## What even is a stack?`), except for proper nouns.
- Headings should be informative questions or statements, not labels (prefer `## Why stacks are useful` over `## Use cases`).

### 5.4 Emphasis & Formatting

- Use **bold** (`**…**`) for key terms on their first mention.
- Use *italics* (`*…*`) for subtle emphasis, foreign words, or titles.
- Use `inline code` (backticks) for: code tokens, file names, command names, type names, CLI flags, URLs that are literal.
- Never use ALL CAPS for emphasis.

### 5.5 Lists

- Use bulleted lists for unordered items.
- Use numbered lists only for sequential steps or ranked items.
- Keep list items parallel in structure.
- Avoid nesting more than two levels deep.

### 5.6 Tables

Tables are appropriate for comparisons. Keep tables narrow — avoid putting long prose inside cells.

## 6. Math Formatting (KaTeX)

Math is rendered with **KaTeX**. Use standard LaTeX syntax.

- **Inline math**: wrap with `$…$`. Example: `$f(x) = x^2$`
- **Display math** (block): wrap with `$$…$$` on its own line. Example:

  ```
  $$
  \sum_{i=0}^{n} i = \frac{n(n+1)}{2}
  $$
  ```

Rules:
- Always prefer display math for important results, definitions, and multi-line derivations.
- Number important equations with `\tag{1}` etc. when the article refers back to them.
- Follow the equation immediately with a plain-language explanation of what it means — don't let math stand alone without prose.
- Use `\mathbb{N}`, `\mathbb{Z}`, `\mathbb{Q}`, `\mathbb{R}`, `\mathbb{C}` for standard number sets.
- Use `\coloneqq` for definitions (`f \coloneqq x \mapsto x^2`).
- Keep individual LaTeX commands readable; break long expressions across lines inside the `$$` block.

## 7. Code Blocks

All code blocks **must** include the file path of the file the code lives in (or a descriptive virtual path if the snippet is illustrative). Use this exact syntax:

````
```contents/en/elementry/computer_science/how_programs_work.md#L10-20
fn main() {
    println!("Hello, world!");
}
```
````

- Never use triple backticks followed only by a language name (e.g., ` ```rust `). Always use a path.
- For illustrative snippets not tied to a real file, use a descriptive virtual path under `/dev/null/`, e.g. `/dev/null/example.rs`.
- Annotate code with comments. Prefer short, complete, runnable examples.
- Rust examples must be idiomatic (use `?` for error propagation, avoid `unwrap()` in production-style snippets).

## 8. Cross-references

- When referring to another checkpoint by name, link it: `[Stacks](../stack/)` or use the full URL `/en/cp/basis/data_structure/stack/`.
- Avoid "as we discussed in the section above" — checkpoints are independent units that can be read in any order after their prerequisites.
- Do not reproduce content from prerequisites. Summarize in one sentence and link instead.

## 9. Writing for Multiple Levels

When a concept appears at multiple levels, each checkpoint must stand on its own. Example:

- `elementry/math/induction` — intuitive introduction with pictures and simple examples.
- `basis/math/induction` — formal definition, proof template, exercises.
- `proof/math/induction_formal` — a rigorous structural induction proof.

The higher-level article must **not** repeat the elementary explanation verbatim. Link to the lower-level one and build on top.

## 10. Translation Guidelines

When translating an English checkpoint into Japanese (or any other locale):

### 10.1 What to Translate

- `title`: always translate.
- `summary`: always translate.
- Body text: always translate.
- Code comments: translate the prose comments; keep code tokens and identifiers in English.
- Table headers and cell content: translate prose; keep technical terms in English unless a well-established Japanese equivalent exists.

### 10.2 What NOT to Translate

- Frontmatter field names (`title:`, `prerequisites:`, etc.) — these are code.
- `prerequisites` values — cpIds are language-agnostic identifiers.
- `aliases` values — same reason.
- `tags` values — tags are shared across locales; use the same English tags.
- `updated` date — copy it from the English original unchanged.
- Inline code, type names, CLI commands, variable names.
- Math LaTeX source.

### 10.3 Japanese-Specific Rules

- Use natural, technical-but-accessible Japanese. Avoid overly formal keigo in body text; a friendly non-`です/ます` style is preferred.
- Technical terms with no established Japanese equivalent should be written in **katakana** followed by the English term in parentheses on first mention. Example: スタック（stack）.
- For terms that have a well-established Japanese equivalent (e.g., 再帰 for "recursion"), use the Japanese term and mention the English in parentheses on first mention.
- Do **not** translate code block paths or virtual paths.
- Section headings may be phrased more naturally in Japanese rather than literally.

### 10.4 Translation Status

If a Japanese file exists but the translation is incomplete or out-of-date, add a comment at the top of the body:

```
<!-- TODO: 翻訳中 / Translation in progress -->
```

The site displays a "Translation pending" banner when this comment is present.

## 11. Common Mistakes to Avoid

| ❌ Don't | ✅ Do instead |
|----------|--------------|
| Add a `# Title` heading | Let frontmatter handle the title |
| Reference a prerequisite by name without linking | Link to its URL |
| List transitive prerequisites | List only direct prerequisites |
| Use `unwrap()` freely in examples | Use `?` or explain the panic surface |
| Write `$$ f(x) $$` inline | Use `$f(x)$` for inline math |
| Hard-code the language in a path (`/en/cp/…`) in body prose | Use relative links or language-neutral descriptions |
| Create a cycle in the prerequisite graph | Run the build before committing to check for cycles |
| Translate `prerequisites` cpIds into Japanese paths | Keep cpIds language-neutral (no `ja/` prefix) |
| Leave `summary` empty on published articles | Always write a meaningful summary |
| Use bare ` ``` ` code fences without a path | Always include a file path after the opening backticks |

## 12. Quick Checklist

Before submitting a new or updated checkpoint:

- [ ] File is at the correct path: `contents/<lang>/<cpId>.md`
- [ ] `title` is filled in and uses Title Case (English) or natural capitalization (Japanese).
- [ ] `summary` is a complete, meaningful sentence.
- [ ] All `prerequisites` exist as files in the same locale (or in English if the locale file is pending).
- [ ] No prerequisite cycle exists (verify with a local build: `pnpm build`).
- [ ] `updated` date reflects today if you made substantive changes.
- [ ] Math is KaTeX-compatible (`$…$` / `$$…$$`).
- [ ] All code blocks use a path after the opening backticks.
- [ ] No top-level `#` heading in the body.
- [ ] The article ends with a Summary section (required for `elementry` and `basis`).
- [ ] For translations: `tags`, `aliases`, `prerequisites` are identical to the English original.
