---
title: Resource Acquisition Is Initialization (RAII)
summary: "RAII is the design pattern that ties a resource's lifetime to a value's lifetime: acquire the resource when the value is created, release it when the value is destroyed. You'll see why this turns 'remember to clean up' into 'let the compiler do it', how `Box`, `Vec`, and file handles all follow the same pattern through `Drop`, and why RAII is the right mental model for the ownership rules you're about to meet."
prerequisites:
  - essential/rust/types/std/box
  - essential/rust/memory/traits/drop
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---

Resource management used to be manual: allocate memory, open a file, acquire a lock — then remember to free, close, and release at every exit point. Miss one path and you have a leak; hit the same path twice and you corrupt state. RAII replaces "remember to clean up" with a structural guarantee: the resource lives exactly as long as the value that holds it.

## The pattern

**RAII** — *Resource Acquisition Is Initialization* — ties a resource's lifetime to a value's lifetime:

- When the value is **created**, the resource is acquired.
- When the value is **destroyed**, the resource is released — automatically and unconditionally.

"Destroyed" means the value goes out of scope. The compiler knows exactly when that is, so cleanup is not optional and cannot be forgotten.

## `Drop` as the mechanism

In Rust, RAII works through the [`Drop`](../memory/traits/drop/) trait. When a value leaves scope, the compiler inserts a call to `drop` — whether execution falls off the end of a block, returns early, or exits through `?`. [`Drop`](../memory/traits/drop/) covers the trait in detail; what matters here is that *every scope exit* is a cleanup point.

```rust
{
    let guard = mutex.lock().unwrap(); // lock acquired
    // ... critical section ...
}   // guard dropped → lock released, unconditionally
```

## `Box`, `Vec`, and the standard library

[`Box<T>`](../types/std/box/) is the simplest example. Creating a `Box` allocates heap memory; dropping the `Box` frees it:

```rust
{
    let b = Box::new([0u8; 1024]); // heap allocation acquired
    // ... use b ...
}   // b dropped → heap allocation freed
```

`Vec<T>`, `String`, `File`, and nearly every standard library type that wraps an external resource follows this same pattern. Constructors acquire; `drop` implementations release. You never call `free`, `close`, or `unlock` directly in ordinary Rust code — scope does that work for you.

## Scope is precise and exhaustive

Early returns and error propagation don't leak:

```rust
fn process(path: &str) -> std::io::Result<()> {
    let file = std::fs::File::open(path)?; // file descriptor acquired
    // ... read from file ...
    Ok(())
} // file dropped here, regardless of how the function returned
```

The `?` operator returns early on error and still invokes `drop` on every value in scope at that point. There is no "unwind and forget to close" footgun.

## The ownership rules follow from RAII

RAII requires one unambiguous answer to "who drops this value?" at every point in the program. If two variables could both own the same heap allocation, `drop` would free the memory twice — a critical bug. If no variable owned it, `drop` would never run — a leak.

The ownership rules you'll meet next are the compiler's mechanism for enforcing that every value has exactly one owner, and therefore exactly one drop call. Ownership is RAII made systematic and compile-time verified.

## Summary

- RAII ties a resource's lifetime to its owning value's lifetime: acquire on creation, release on destruction.
- In Rust, [`Drop`](../memory/traits/drop/) is the mechanism — the compiler inserts `drop` calls at every scope exit.
- [`Box<T>`](../types/std/box/), `Vec<T>`, `String`, and `File` all implement `Drop`; you never free their resources manually.
- Every scope exit — including early returns and `?` — triggers `drop` on all values in that scope.
- The ownership rules exist to give RAII a single, compile-time-verified answer to "who drops this value?"
