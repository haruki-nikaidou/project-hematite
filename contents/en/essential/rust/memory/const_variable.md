---
title: "`const` Bindings"
summary: "A `const` binding declares a true compile-time constant — its value is computed at compile time and substituted at each use site. You'll see how `const` differs from `let` (no runtime address, no `mut`, requires a type annotation), what kinds of expressions are allowed in a `const` initializer, and when to reach for `const` versus an immutable `let`."
prerequisites:
  - essential/rust/variable
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-28
---

A `const` binding declares a true compile-time constant. Every use of the name is replaced with the value at compile time — like a text substitution, but type-checked. No memory is reserved; there is no address to take.

## Syntax

A `const` requires an explicit type annotation and cannot be `mut`:

```rust
const MAX_CONNECTIONS: u32 = 100;
const PI: f64 = std::f64::consts::PI;
```

`const` can appear at any scope — inside a function, inside an `impl` block, or at the module level.

## What can go in the initializer

Only **constant expressions** are allowed; Rust evaluates them entirely at compile time. You can use:

- integer, float, `bool`, and `char` literals
- arithmetic and bitwise operations on `const` values
- calls to `const fn` functions
- struct and enum constructors, if all fields are constant expressions

Heap allocation, runtime I/O, and anything that depends on program state are forbidden.

```rust
const KILOBYTE: usize = 1024;
const MEGABYTE: usize = KILOBYTE * 1024;

const fn triple(x: u32) -> u32 {
    x * 3
}

const NINE: u32 = triple(3);
```

## `const` versus immutable `let`

An immutable `let` is still a runtime binding — it has an address, a stack slot, and a scope lifetime:

```rust
let x = 5; // runtime, has an address on the stack
```

A `const` is substituted at each use site. If you use `MAX_CONNECTIONS` three times, the compiler places the value `100` at each call site directly:

```rust
const MAX_CONNECTIONS: u32 = 100;
assert!(n < MAX_CONNECTIONS); // compiles as: assert!(n < 100)
```

Use `const` for fixed, named values shared across the codebase — things that should never appear as a magic literal. Use `let` for values that vary between runs, or that are computed at runtime even if they happen to be immutable in a given scope.

## `const` versus `static`

A [`static`](../static_variable/) stores the value at a fixed address that lives for the entire program. A `const` has no address; you cannot take `&CONST_NAME`. When you need to hold a reference to a value across the whole program — a lookup table, a global configuration struct — use `static`, not `const`.
