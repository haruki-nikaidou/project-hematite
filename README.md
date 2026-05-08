# Project Hematite

An open education website for future Rust developers.
Content is organized using a **DAG (Directed Acyclic Graph)** of *checkpoints* — each unit of learning explicitly declares its prerequisites, giving learners a clear, structured path through the material.

The graph is publicly available as a versioned JSON endpoint, so external tools (progress trackers, spaced-repetition systems, custom dashboards, etc.) can consume it freely.

## Features

- **DAG-based prerequisites** — every checkpoint declares what must be understood first; cycles are detected and rejected at build time.
- **Multi-language content** — English (primary) and Japanese, with graceful fallback when a translation is pending.
- **Five learning levels** — Elementary → Basis → Essential → Advanced → Cutting Edge.
- **Public graph API** — the full prerequisite graph and alias map are served as static, content-hashed JSON so external software can track or visualize progress.
- **Full-text search** — powered by Pagefind, fully static, no server required.
- **Math support** — KaTeX renders inline and display math in content pages.

## Project Structure

```text
project-hematite/
├── contents/
│   ├── en/          # English checkpoints  (Markdown + frontmatter)
│   └── ja/          # Japanese checkpoints (Markdown + frontmatter)
├── public/          # Static assets (favicon, …)
└── src/
    ├── components/  # Svelte / Astro UI components
    ├── integrations/# Astro build integrations (graph validator, …)
    ├── layouts/     # Page layout templates
    ├── lib/         # Core logic: graph, i18n, paths, hashing, …
    ├── pages/       # File-based routes
    │   ├── [lang]/  # Localised checkpoint pages
    │   ├── graph-[lang]-[hash].json.ts   # Public graph endpoint
    │   ├── aliases-[lang]-[hash].json.ts # Public alias map endpoint
    │   └── latest.json.ts                # Discovery endpoint
    └── content.config.ts
```

## Learning Levels

| Level | Description |
| :---- | :---------- |
| `elementary` | First contact — no prior Rust knowledge assumed |
| `basis` | Core language features every Rust programmer needs |
| `essential` | Idiomatic patterns and the standard library |
| `advanced` | Internals, unsafe, async, and performance topics |
| `cutting-edge` | Nightly features, research areas, and bleeding-edge crates |

Content can also be tagged with supplementary **categories**: `tricks`, `proof`, `homework`, and `side-lines`.

## Writing Content

Each checkpoint is a Markdown file under `contents/<lang>/<level>/<topic>.md`.

```contents/en/elementry/example-topic.md#L1-10
---
title: "Example Topic"
summary: "One-sentence description shown in listings."
prerequisites:
  - elementry/some-other-topic
aliases:
  - old/path/if/renamed
tags:
  - memory
updated: "2025-01-01"
---

Your content here…
```

- **`prerequisites`** — list of checkpoint IDs (relative paths without the language prefix) that must be completed first.
- **`aliases`** — old IDs redirected to this checkpoint; used so external links remain valid after restructuring.
- **`tags`** — freeform labels for filtering.

> The build will fail with a descriptive error if a prerequisite cycle is detected.

## Public Graph API

After building, three endpoints are available:

| Endpoint | Description |
| :------- | :---------- |
| `/latest.json` | Discover current hashes and URLs for all language graphs |
| `/graph-<lang>-<hash>.json` | Full prerequisite graph for a given language |
| `/aliases-<lang>-<hash>.json` | Alias → canonical ID mapping for a given language |

Graph files are content-hashed — the URL changes only when the graph changes, making them safe to cache indefinitely.

**Example workflow for an external tracker:**

1. Fetch `/latest.json` to find the current graph URL.
2. Fetch the graph JSON and store the node list locally.
3. Let users mark individual checkpoint `id`s as complete.
4. On the next visit, re-fetch `/latest.json`; if the `hash` changed, refresh the graph and reconcile progress.

## Commands

All commands are run from the project root:

| Command | Action |
| :------ | :----- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the local dev server at `localhost:4321` |
| `pnpm build` | Build the production site to `./dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro ...` | Run Astro CLI commands (`astro add`, `astro check`, …) |

**Requirements:** Node.js ≥ 22.12.0, pnpm.

## Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | [Astro](https://astro.build) |
| UI components | [Svelte 5](https://svelte.dev) |
| Styling | SCSS (sass-embedded) |
| Icons | Iconify / Heroicons |
| Search | [Pagefind](https://pagefind.app) |
| Math | [KaTeX](https://katex.org) via rehype-katex |
| Content | MDX + plain Markdown |

## License

Content and source code are released under the terms described in `LICENSE` (see repository root).
