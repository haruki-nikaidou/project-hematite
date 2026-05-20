---
name: write-checkpoint
description: Author a new English (or non-translated) checkpoint article for Project Hematite — covers cpId selection, file placement under `contents/<lang>/<cpId>.md`, frontmatter schema, body structure, KaTeX math, code blocks, and prerequisite DAG hygiene. Use whenever the user asks to write, draft, add, or expand a checkpoint, article, or learning unit, or edits any file under `contents/en/` (or a brand-new locale file with no English source yet).
---

# Write Checkpoint

A **checkpoint** is one self-contained learning unit in Project Hematite's prerequisite DAG. This skill is the working playbook for producing one. The authoritative spec is [`roles/writing-articles.md`](../../roles/writing-articles.md) — read it first if you are touching any rule that is not spelled out below.

## 1. Decide the cpId before opening an editor

A `cpId` is a `/`-separated path. The **first segment** must come from this fixed list:

- Levels: `elementry`, `basis`, `essential`, `advanced`, `cutting-edge`
- Categories: `tricks`, `proof`, `homework`, `side-lines`

All segments are `snake_case`. Example: `basis/math/analysis/limit`.

Pick the level by audience:

| Level | Reader assumption | Tone |
|-------|-------------------|------|
| `elementry` | Zero prior knowledge | Conversational, everyday analogies, short sentences |
| `basis` | Has finished all prerequisites | Friendly but precise; define then explain |
| `essential` | Competent developer | Technical, direct, link rather than re-explain |
| `advanced` | Specialist | Dense allowed; always motivate first |
| `cutting-edge` | Researcher | Frontier-level, formal notation OK |

Categories (`tricks`, `proof`, `homework`, `side-lines`) match the level of whatever they accompany.

Confirm:
- [ ] First segment is in the fixed list.
- [ ] No segment has spaces, hyphens (except `cutting-edge`, `side-lines`), or capitals.
- [ ] cpId does not already exist (check `contents/en/<cpId>.md`).

## 2. Place the file

```
contents/en/<cpId>.md
```

English is mandatory for every checkpoint. Other locales (`ja`, …) live at `contents/<lang>/<cpId>.md` and are optional. If you are creating a non-English-first file, read the [translate-checkpoint](../translate-checkpoint/SKILL.md) skill instead.

## 3. Write the frontmatter

Copy this template, then fill it in:

```yaml
---
title: <Title Case for English>
summary: "<One or two complete sentences describing what the reader will know after reading.>"
prerequisites:
  - <cpId of a direct prerequisite>
aliases: []
tags: ["<Title Case Tag>"]
updated: <YYYY-MM-DD>
---
```

Field rules:

- **`title`**: required, Title Case (English), ≤ 60 chars.
- **`summary`**: strongly recommended. Without one, search and index pages show nothing. Write a complete statement, not a fragment. Describe what the reader will know after reading, not just the topic.
- **`prerequisites`**: list **only direct** prerequisites (if `A → B → C`, list only `B` for `C`, never both). Each entry must start with a valid first segment. The full graph must be acyclic — `pnpm build` enforces this.
- **`aliases`**: only when renaming a checkpoint. Old cpIds go here so external links survive. Not for synonyms.
- **`tags`**: Title Case, reuse existing tags where possible. Do **not** repeat the cpId path (no `Basis` or `Math` tag on `basis/math/...`).
- **`updated`**: ISO 8601 (`YYYY-MM-DD`). Update on substantive edits, not typos.

## 4. Write the body

### Structure

Do **not** add a top-level `# Title` heading — the title comes from frontmatter.

Typical outline:

1. **Opening hook** (1–3 sentences) — answer "Why does this matter to me?"
2. **Concept sections** with `##` and `###` headings. Each self-contained.
3. **Code examples** — short, annotated, runnable where possible.
4. **Summary** — bullet list of takeaways. **Required for `elementry` and `basis`**, recommended elsewhere.
5. **What's next** (optional) — link to natural follow-ups.

### Voice

- Second person ("you", "your"). Never "one should…" or passive substitutes.
- Sentence case for headings (`## What even is a stack?`), proper nouns excepted.
- Informative headings, not labels (`## Why stacks are useful` ✅, not `## Use cases`).

### Emphasis

| Use | For |
|-----|-----|
| `**bold**` | key terms on first mention |
| `*italics*` | subtle emphasis, foreign words, titles |
| `` `inline code` `` | code tokens, file names, command names, type names, CLI flags |
| ALL CAPS | never |

## 5. Math (KaTeX)

- Inline: `$f(x) = x^2$`.
- Display (its own line): wrap with `$$ … $$`.
- Number an equation with `\tag{1}` only if the article refers back to it.
- Always follow display math with prose that explains what it means.
- Use `\mathbb{N}`, `\mathbb{Z}`, `\mathbb{Q}`, `\mathbb{R}`, `\mathbb{C}` for standard sets.
- Use `\coloneqq` for definitions (e.g. `f \coloneqq x \mapsto x^2`).
- Never write `$$ f(x) $$` inline — use `$f(x)$`.

## 6. Code blocks

Always specify the language after the opening triple backticks:

````
```rust
fn main() {
    println!("Hello, world!");
}
```
````

- Never leave the language blank.
- Add a file-path comment on the first line **only when it helps the reader** (e.g. `// src/main.rs`). Not by default.
- Rust examples must be idiomatic: use `?` for error propagation; avoid `unwrap()` in production-style snippets.

## 7. Cross-references

- Reference another checkpoint by linking it: `[Stacks](../stack/)`. Don't name without linking.
- **Internal links to other checkpoints must be relative paths**, never absolute. Use `../stack/` or `../../basis/data_structure/stack/`, never `/en/cp/basis/data_structure/stack/`. Absolute paths hard-code the locale (`/en/…`) and would point a Japanese reader back at the English version after translation; relative paths resolve against the current page and therefore stay in the reader's language automatically.
  - ✅ `[Stacks](../stack/)`
  - ✅ `[Real numbers](../../analysis/real_number_a/)`
  - ❌ `[Stacks](/en/cp/basis/data_structure/stack/)`
  - ❌ `[Stacks](https://...example.com/en/cp/...)`
- External links (to non-checkpoint URLs) are fine as absolute URLs.
- Do **not** repeat content from prerequisites. Summarise in one sentence and link.
- Avoid "as discussed above" — checkpoints are read in any order after prerequisites.

## 8. Final checklist

Before declaring the article done:

- [ ] File at `contents/en/<cpId>.md` with snake_case cpId.
- [ ] `title`, `summary`, `updated` filled in.
- [ ] `prerequisites` are direct, each starts with a valid first segment, no transitive entries.
- [ ] `tags` are Title Case and don't duplicate the cpId path.
- [ ] No top-level `#` heading in the body.
- [ ] Math uses `$…$` / `$$…$$`; no inline `$$`.
- [ ] Every code block has a language tag.
- [ ] Summary section present (required for `elementry`, `basis`).
- [ ] Every link to another checkpoint is a **relative** path (`../foo/`), never `/en/cp/...` or any other locale-prefixed absolute URL.
- [ ] `pnpm build` runs clean (catches cycles, missing prerequisites, alias collisions).

## Common mistakes to avoid

| Don't | Do instead |
|-------|------------|
| Add a `# Title` heading | Let frontmatter handle the title |
| List transitive prerequisites | List only direct ones |
| Use `unwrap()` casually in Rust | Use `?` or explain the panic |
| Write `$$ f(x) $$` inline | Use `$f(x)$` |
| Link checkpoints with absolute paths like `/en/cp/…` | Use relative links (`../stack/`) so translated pages still link within their own locale |
| Translate cpIds (e.g. `ja/...`) | cpIds are language-neutral |
| Leave `summary` empty | Always write a meaningful summary |
| Use bare ` ``` ` fences | Always include a language |

## Additional resources

- Full normative spec: [`roles/writing-articles.md`](../../roles/writing-articles.md)
- Example existing article: [`contents/en/basis/math/analysis/e.md`](../../contents/en/basis/math/analysis/e.md)
- To translate this article afterwards: [translate-checkpoint](../translate-checkpoint/SKILL.md)
