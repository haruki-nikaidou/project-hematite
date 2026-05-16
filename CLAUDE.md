# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Production build → ./dist/
pnpm preview    # Preview production build
pnpm astro check  # TypeScript/Astro type checking
```

Requires Node.js ≥ 22.12.0 and pnpm.

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
