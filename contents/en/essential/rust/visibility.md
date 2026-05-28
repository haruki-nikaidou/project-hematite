---
title: Visibility — `pub` and Friends
summary: "Rust organises code into *modules*, and every item (function, struct, field, trait) is private to its own module by default. You'll see the visibility modifiers — `pub`, `pub(crate)`, `pub(super)`, `pub(in path)` — what each one means, why struct fields have their own visibility independent of the struct itself, and how the privacy boundary lines up with module boundaries."
prerequisites:
  - essential/rust/function
  - essential/rust/types/product_type
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

Every item in Rust — function, struct, field, type alias, constant — starts out **private to its own module**. You choose what to expose, rather than choosing what to hide. This default forces you to think about API boundaries deliberately.

## Modules and the privacy boundary

A **module** (`mod`) is both the unit of code organization and the unit of privacy. The privacy boundary falls between a module and everything outside it:

```rust
mod geometry {
    pub struct Point {
        pub x: f64,
        pub y: f64,
    }

    fn distance(a: &Point, b: &Point) -> f64 {
        ((a.x - b.x).powi(2) + (a.y - b.y).powi(2)).sqrt()
    }
}
```

Code outside `geometry` can use `Point` and its fields because they are `pub`. It cannot call `distance` — that function is private to the module.

## Private by default

Without any modifier, an item is visible only within the module where it is declared and that module's descendants:

```rust
mod auth {
    fn hash_password(pw: &str) -> Vec<u8> { todo!() }

    pub fn verify(pw: &str, hash: &[u8]) -> bool {
        hash_password(pw) == hash // hash_password is accessible here
    }
}

// auth::hash_password(...)  // compile error: function `hash_password` is private
let _ = auth::verify("secret", &stored_hash); // ok
```

`hash_password` is an implementation detail; `verify` is the interface. The privacy default enforces this separation at the call site rather than relying on documentation.

## Visibility modifiers

Four modifiers widen visibility beyond the declaring module:

### `pub` — visible everywhere

`pub` makes an item accessible from any code that can name the module. Use it for the public API of a library crate or for items a binary exposes across its module tree.

```rust
pub fn add(a: i32, b: i32) -> i32 { a + b }
```

### `pub(crate)` — visible within the current crate

`pub(crate)` restricts access to the compilation unit — useful for items shared across modules in one crate that should not appear in the public API:

```rust
pub(crate) fn intern(s: &str) -> u32 { todo!() }
```

Outside the crate, `intern` is invisible.

### `pub(super)` — visible to the parent module

`pub(super)` gives the parent module access without widening visibility further:

```rust
mod ui {
    mod button {
        pub(super) fn render_frame() { todo!() }
    }

    fn draw() {
        button::render_frame(); // accessible because pub(super) targets ui
    }
}

// ui::button::render_frame() // compile error from outside ui
```

### `pub(in path)` — visible within a specific module subtree

`pub(in path)` names an ancestor module; the item is accessible anywhere inside that module's subtree:

```rust
mod config {
    pub mod parsing {
        pub(in crate::config) fn raw_parse(s: &str) { todo!() }
    }

    pub mod validation {
        fn check(s: &str) {
            super::parsing::raw_parse(s); // inside crate::config: allowed
        }
    }
}

// config::parsing::raw_parse(...)  // compile error: outside crate::config
```

## Struct field visibility

A struct's overall visibility and its fields' visibility are independent. Marking a struct `pub` does not make its fields `pub`:

```rust
pub struct Config {
    pub host: String, // accessible from outside
    port: u16,        // private; only this module can read or set it
}
```

External code can accept, store, or pass a `Config`, but it cannot read `port` directly. You control access through methods.

This has a practical consequence for construction: if *every* field of a struct is private, external code cannot build one with struct literal syntax — only through constructors you provide:

```rust
impl Config {
    pub fn new(host: String, port: u16) -> Self {
        Self { host, port }
    }
}
```

The struct literal `Config { host: "...", port: 8080 }` is only valid inside the module that declares `Config`.

## Re-exporting with `pub use`

You can bring an item into scope and re-export it in one step:

```rust
// lib.rs
pub use self::geometry::Point;
```

Now callers can write `crate_name::Point` instead of `crate_name::geometry::Point`. Re-exporting lets you present a flat, clean public API while keeping the internal module structure organized.

## Summary

- Every item is private by default — visible only within its declaring module and that module's descendants.
- `pub` widens visibility to all code that can name the module.
- `pub(crate)` restricts to the current crate; `pub(super)` to the parent module; `pub(in path)` to a named ancestor's subtree.
- Struct fields carry their own visibility, independent of the struct's; a `pub` struct with private fields hides its representation.
- `pub use` re-exports an item under a shorter path, letting you shape the public API independently of the module structure.
