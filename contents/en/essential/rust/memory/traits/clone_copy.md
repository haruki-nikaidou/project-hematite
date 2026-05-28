---
title: "`Clone` and `Copy`"
summary: "Two traits that classify how a value can be duplicated. `Clone` says 'a copy can be made, possibly at non-trivial cost' via an explicit `.clone()` call. `Copy` is the stricter promise 'duplicating this value is a trivial bitwise copy', which lets the compiler duplicate values implicitly. You'll see which built-in types implement each, why `Copy` requires `Clone`, and why `String` is `Clone` but not `Copy`."
prerequisites:
  - essential/rust/types/size
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-28
---

When you assign a value to a new variable or pass it to a function, ownership moves — the original binding can no longer be used. But some types should be duplicated rather than moved: copying an integer has no meaningful cost and the obvious semantics. Other types, like `String`, can be duplicated but only at real cost: a new heap allocation. Rust formalizes both cases with two traits: `Clone` and `Copy`.

## `Clone`: explicit duplication

`Clone` is the general-purpose duplication trait:

```rust
pub trait Clone {
    fn clone(&self) -> Self;
}
```

Any type can implement `Clone`. The method is called explicitly, so the cost is visible at the call site:

```rust
let s = String::from("hello");
let t = s.clone(); // new heap allocation; s is still valid
println!("{} {}", s, t);
```

Use `#[derive(Clone)]` when all fields already implement `Clone`:

```rust
#[derive(Clone)]
struct Config {
    timeout: u32,
    host: String,
}

let a = Config { timeout: 30, host: String::from("localhost") };
let b = a.clone(); // deep copy: a new String allocation for b.host
```

## `Copy`: implicit bitwise duplication

`Copy` is a stricter promise: duplicating the value is a trivial bitwise copy with no allocation and no side effects:

```rust
pub trait Copy: Clone {}
```

`Copy` types are duplicated **implicitly** wherever they are used — no `.clone()` call required:

```rust
let x: i32 = 5;
let y = x; // bitwise copy; x is not moved
println!("{}", x); // still valid
```

Types that implement `Copy`:

- All integer and float primitives (`u8`, `i32`, `f64`, …)
- `bool` and `char`
- Raw pointers (`*const T`, `*mut T`)
- Shared references `&T` (the reference is copied, not the referent)
- Arrays `[T; N]` and tuples `(T, U, …)` where every element is `Copy`

## Why `Copy` requires `Clone`

The bound `pub trait Copy: Clone {}` means every `Copy` type must also implement `Clone`. This is consistent: a bitwise copy is always a valid (and fast) implementation of `clone`. Deriving both is idiomatic for simple value types:

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
struct Point {
    x: f64,
    y: f64,
}

let a = Point { x: 1.0, y: 2.0 };
let b = a; // copied, not moved
println!("{:?}", a); // still valid
```

## Why `String` is `Clone` but not `Copy`

`String` holds a pointer to a heap allocation. A bitwise copy would produce two `String` values pointing to the same allocation. Dropping both would free the same memory twice — undefined behavior.

`String` therefore implements `Clone` (which allocates a fresh buffer) but not `Copy`. The compiler moves `String` by default, ensuring there is always exactly one owner.

## Why `Drop` and `Copy` are mutually exclusive

Any type that implements [`Drop`](./drop/) has custom cleanup code that must run exactly once. If the type were also `Copy`, bitwise copies would multiply freely and the compiler could not guarantee "exactly once." The compiler enforces this: deriving `Copy` on a type that also implements `Drop` is a compile error.
