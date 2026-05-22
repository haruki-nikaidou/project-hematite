# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Production build → ./dist/
pnpm preview    # Preview production build
pnpm astro check  # TypeScript/Astro type checking
```

### CLI tool (`scripts/hematite-cli.ts`)

```bash
pnpm cli dep <cpId> [--lang <locale>]   # List all transitive prerequisites of a checkpoint
pnpm cli check-i18n [path-prefix]       # Find EN checkpoints missing a Japanese translation
```

Examples:
```bash
pnpm cli dep basis/algorithm/intro
pnpm cli dep basis/math/induction --lang ja
pnpm cli check-i18n                     # check all checkpoints
pnpm cli check-i18n basis/math          # check only under basis/math/
```

Requires Node.js ≥ 22.12.0 and pnpm.

## Agent skills

Two Cursor agent skills live under `.claude/skills/` and are loaded automatically when relevant:

- **`write-checkpoint`** (`.claude/skills/write-checkpoint/SKILL.md`): Author a new English checkpoint — cpId selection, frontmatter schema, body structure, KaTeX math, code blocks, and DAG hygiene. Triggered when writing or editing files under `contents/en/`.
- **`translate-checkpoint`** (`.claude/skills/translate-checkpoint/SKILL.md`): Translate an existing checkpoint into Japanese (or another locale) — which frontmatter fields to translate vs. preserve verbatim, tone and terminology rules, the "translation pending" marker. Triggered when editing files under `contents/ja/`.

## Architecture

Project Hematite is a static Rust-learning website built with **Astro 6 + Svelte 5 + MDX**. The central concept is a DAG (Directed Acyclic Graph) of learning "checkpoints" where each checkpoint declares its prerequisites.

### Data flow

```
contents/{en,ja}/**/*.md  →  checkpoint-validator.ts  →  node_modules/.astro/hematite.json
                                       ↓
                              Astro builds pages + static JSON API → dist/
```

### Key layers

**Content** (`contents/`): Markdown files with YAML frontmatter. Each file declares `title`, `summary`, `prerequisites` (list of `cpId` strings), `aliases`, `tags`, and `updated`. Organized as `contents/<lang>/<level>/<category>/<topic>.md`.

**Build Integration** (`src/integrations/checkpoint-validator.ts`): Runs at Astro config phase. Parses all content files, validates the DAG (no cycles via Kahn's algorithm, no alias collisions, all prerequisites exist), computes content-addressed SHA-256 hashes, writes a cache to `node_modules/.astro/hematite.json`, and injects alias redirects into Astro config. This cache is the single source of truth for graph data at page render time.

**Core logic** (`src/lib/`):
- `graph.ts` — `GraphNode` type, `topoSort()`, `buildDependents()`
- `aliases.ts` — alias map building and collision checks
- `hash.ts` — canonical SHA-256 (recursively sorts object keys, preserves array order)
- `paths.ts` — conversions between entry IDs, cpIds, and URL slugs
- `content-loader.ts` — filesystem walker with lightweight YAML frontmatter parser
- `constants.ts` — levels, locales, labels, ordering
- `i18n.ts` — UI strings (en/ja)

**Pages** (`src/pages/`):
- `[lang]/cp/[...slug].astro` — individual checkpoint pages
- `[lang]/index/[...slug].astro` — category browse pages
- `latest.json.ts`, `graph-[lang]-[hash].json.ts`, `aliases-[lang]-[hash].json.ts` — public graph API endpoints

**Content schema** (`src/content.config.ts`): Zod schema for frontmatter validation via Astro content collections.

### Public API

External tools discover the graph via `/latest.json` (returns current hashes + URLs per language), then fetch `/graph-<lang>-<hash>.json` for the full DAG or `/aliases-<lang>-<hash>.json` for alias redirects. Hashes change whenever content changes, enabling cache-safe URLs.

### Checkpoint IDs

A `cpId` is the locale-stripped identifier used in prerequisites, e.g. `ownership` (not `en/ownership`). The `paths.ts` utilities handle all ID transformations.
