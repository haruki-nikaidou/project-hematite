---
title: "`static` Variables"
summary: "A `static` declares a single value that lives in the program's data segment for the entire run of the program. Unlike `const`, a `static` has a fixed memory address you can take a reference to. You'll see when to use `static` (large read-only tables, program-wide handles), why mutable `static`s require `unsafe`, and how `static`s relate to the data region of memory you learned in the Zig course."
prerequisites:
  - essential/rust/variable
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-28
---

Every program has a data segment — a region of memory that exists for the entire run of the process. `static` puts a value there. Unlike a `let` binding that lives on the stack for the duration of a scope, or a heap allocation that lives until it is dropped, a `static` is initialized once at program startup and released only when the process exits.

## Declaring a `static`

```rust
static MAX_SIZE: usize = 4096;
static GREETING: &str = "hello";
```

Like `const`, a `static` requires an explicit type annotation. Unlike `const`, the value is stored at a fixed address — you can take a reference to it:

```rust
fn greeting() -> &'static str {
    &GREETING
}
```

The type `&'static str` means a reference valid for the entire lifetime of the program. Every reference to a `static` automatically gets the `'static` lifetime.

## Mutability and `unsafe`

A `static` without `mut` is read-only after initialization. Multiple threads can read it simultaneously with no risk of a data race.

A `static mut` is different. Rust cannot verify concurrent access at compile time, so reading or writing a `static mut` requires an `unsafe` block:

```rust
static mut COUNTER: u32 = 0;

unsafe {
    COUNTER += 1; // no compile-time protection against concurrent access
}
```

In practice, avoid `static mut` directly. Thread-safe types like `AtomicU32` or `Mutex<T>` can live in a plain (non-`mut`) `static` and give you safe concurrent access:

```rust
use std::sync::atomic::{AtomicU32, Ordering};

static COUNTER: AtomicU32 = AtomicU32::new(0);

COUNTER.fetch_add(1, Ordering::Relaxed); // no unsafe required
```

## The `'static` lifetime

The `'static` lifetime is not the same thing as a `static` variable — it means "lives for the entire program." It applies to:

- References to `static` variables
- String literals (`"hello"` has type `&'static str`)
- Owned types with no borrowed data (e.g. `String`, `Vec<u8>`)

A `T: 'static` bound on a generic parameter means the type must not contain any non-`'static` references — not that the value must be a `static` variable.

## When to use `static` versus `const`

| | `const` | `static` |
|---|---|---|
| Address | None — substituted at each use site | Fixed for the entire program |
| Reference | Cannot take `&CONST` | `&'static T` |
| Best for | Named scalar values, compile-time arithmetic | Large tables, global handles, interned strings |

Use [`const`](../const_variable/) when you need a named value used in expressions. Use `static` when you need a single, addressable value that persists — or when a type requires initialization that isn't a constant expression.
