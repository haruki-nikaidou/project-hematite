---
title: Introduction to JavaScript & TypeScript
summary: "An introduction to JavaScript and TypeScript for Rust developers: why TypeScript became the most popular programming language in 2025, where it fits in the modern web ecosystem, and what this course covers."
prerequisites: 
  - basis/cs_with_zig/summary
aliases: []
tags: ["JavaScript", "TypeScript"]
updated: 2026-05-20
---

Project Hematite is a Rust course at heart — but if you want to build software that runs in a browser, powers modern web tooling, or talks to a JavaScript-first ecosystem, you need TypeScript. The two languages complement each other rather than compete.

## TypeScript reaches the top

In 2025, TypeScript became the most popular programming language among developers on GitHub, according to [GitHub's Octoverse report](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/#the-top-programming-languages-of-2025-typescript-jumps-to-1-while-python-takes-2). It is the first time TypeScript has held the top position, with Python following in second.

**TypeScript** is JavaScript with a static type system layered on top. Every valid JavaScript file is also valid TypeScript — TypeScript adds optional type annotations that a compiler checks before the code runs, then strips them away to produce plain JavaScript. You get the reach of JavaScript (every browser, every Node or Bun runtime) with the safety of static types.

```ts
// JavaScript: no type information, error only visible at runtime
function greet(name) {
    return "Hello, " + name.toUpperCase();
}

// TypeScript: type annotation catches mistakes before running
function greet(name: string): string {
    return "Hello, " + name.toUpperCase();
}
```

If you've spent any time with Zig's strict type system, TypeScript's `string`, `number`, `boolean`, and union types will feel immediately familiar — just applied to the web domain.

## Why TypeScript for Rust developers

Rust is excellent for systems programming, command-line tools, WebAssembly, and server backends. Rust-native web frameworks exist — Axum for HTTP servers, Leptos for frontend — and they are genuinely impressive. But the reality of modern web development is that TypeScript dominates in three areas where Rust currently doesn't:

**Frontend development.** Browsers execute JavaScript. Every major frontend framework — React, Vue, Svelte, SolidJS — targets TypeScript as its primary authoring language. If you're building a user interface, you're writing TypeScript.

**Tooling.** Build systems, configuration files, test runners, linters, and code generators are overwhelmingly written in JavaScript or TypeScript. Even tools implemented in Rust — like Rolldown and OXC — expose TypeScript APIs to their users.

**Shared ecosystems.** Many production stacks mix Rust backends with TypeScript frontends. Reading, writing, and reasoning about TypeScript is a practical necessity for any developer working in that environment.

## Bun: the runtime for this course

This course uses **Bun** as the JavaScript and TypeScript runtime, not Node.js.

Bun is a modern runtime built from scratch (in Zig, as it happens). It runs TypeScript directly without a separate compilation step, includes its own package manager, bundler, and test runner, and is significantly faster than Node.js for common tasks. Installing Bun gives you a complete development environment in one binary.

Running a TypeScript file requires no configuration:

```sh
bun run script.ts
```

With Node.js you'd need to install additional tooling (`tsx`, `ts-node`, or a transpile step) before achieving the same result. Bun removes that friction.

Package management follows the same pattern:

```sh
bun add zod          # install a dependency
bun install          # restore dependencies from lockfile
bun run build        # run a script defined in package.json
```

The commands mirror npm and Yarn closely, so knowledge transfers easily if you encounter those tools elsewhere.

## What this course covers

The `essential/js` course focuses on the foundations every developer needs before touching a web framework:

- **Package managers** — how JavaScript projects declare dependencies, what a lockfile guarantees, and how Bun's package manager works.
- **Bundlers** — why browsers and runtimes need code to be bundled, what a bundler actually does, and how to configure basic bundling with Bun's built-in bundler.
- **Data types** — JavaScript's dynamic type system, TypeScript's static annotations on top of it, and the key differences from Rust's type system (no integer widths, `null` and `undefined`, prototype-based objects).
- **Core language features** — functions, closures, objects, arrays, `async`/`await`, modules (`import`/`export`), and other fundamentals you'll use in every project.

**What this course does not cover:** building user interfaces. Frontend development — components, state management, routing, server-side rendering — is the subject of the `essential/svelte` and `essential/nextjs` courses. Those courses build directly on what you learn here, so completing `essential/js` first gives you the grounding they assume.
