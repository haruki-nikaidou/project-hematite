---
title: References as Types
summary: "Rust's reference types `&T` and `&mut T` are the direct analog of Zig's `*T`: a value that stores another value's address. This checkpoint introduces references purely as *types* — how to form them with `&`/`&mut`, how to read through them with `*`, and how they compare to raw pointers. The compile-time rules that govern when a reference is *valid* (the borrow checker) come later."
prerequisites:
  - essential/rust/types/general_type_intro
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

When two parts of your program need to work with the same data, you don't want to copy it every time. **References** let you pass a handle to an existing value instead of the value itself — safely, without the footguns of raw pointers.

## `&T` — shared reference

A **shared reference** `&T` gives you read-only access to a `T` that lives somewhere else. You can have as many `&T` references to the same value as you like, all at once.

```rust
let x: i32 = 42;
let r: &i32 = &x; // r points to x
```

`r` itself is a variable whose value is the address of `x`. It does not own the integer; it merely borrows a view of it.

## `&mut T` — exclusive (mutable) reference

A **mutable reference** `&mut T` gives you read-write access. In exchange, you can only have one `&mut T` to a given value at any point — no other reference to the same value may exist at the same time.

```rust
let mut y: i32 = 10;
let m: &mut i32 = &mut y;
*m += 1; // y is now 11
```

The exclusivity rule is what lets Rust guarantee there are no data races and no aliased writes. The compiler enforces it; you'll meet the details in the borrow-checker chapters.

## Forming references

You create a reference with `&` (shared) or `&mut` (mutable) applied to any expression that produces a place:

```rust
let values = [1, 2, 3];
let ref_to_array: &[i32; 3] = &values;

let mut count = 0_u32;
let ref_to_count: &mut u32 = &mut count;
```

`&expr` and `&mut expr` are the only ways to form references. There is no separate "address-of operator" — it is just `&`.

## Reading through a reference

To get the value a reference points to, you **dereference** it with `*`:

```rust
let n: i32 = 7;
let r: &i32 = &n;
let v = *r; // v == 7, copied out of the referent
```

In practice, Rust inserts **automatic deref coercions** in many situations, so you rarely have to write `*` by hand. Method calls and field accesses follow references automatically:

```rust
let s = String::from("hello");
let r: &String = &s;
let length = r.len(); // no explicit * needed; Rust inserts it
```

When you do need explicit `*` — for example, to assign through a mutable reference — write it:

```rust
let mut x = 0_i32;
let m = &mut x;
*m = 99; // assign through the reference
```

## Size of a reference

Regardless of what `T` is, `&T` and `&mut T` are both exactly one `usize` wide — one machine pointer. The referent can be a `u8` or a 1 MB struct; the reference is always pointer-sized.

```rust
use std::mem::size_of;

assert_eq!(size_of::<&u8>(),    size_of::<usize>());
assert_eq!(size_of::<&[u8; 1024]>(), size_of::<usize>());
```

## References vs. raw pointers

Rust also has **raw pointers**: `*const T` (read-only) and `*mut T` (read-write). They look similar but behave very differently:

| | `&T` / `&mut T` | `*const T` / `*mut T` |
|---|---|---|
| Always non-null | yes | no |
| Guaranteed valid | yes (compiler checks) | no |
| Dereference requires `unsafe` | no | yes |
| Borrow-checker tracked | yes | no |

Raw pointers exist for FFI and low-level code. In ordinary Rust you use references; you reach for raw pointers only when you need to step outside the rules.

## Borrow rules — intentionally deferred

References are subject to the **borrow checker**: a set of compile-time rules that prove no reference outlives its referent and that `&` and `&mut` to the same place are never alive simultaneously. Those rules — lifetimes, borrow scopes, the exact error messages you'll see — are covered in dedicated checkpoints. For now, treat references purely as typed addresses.

## Zig analogy

If you already know Zig, the mapping is direct:

- `&T` in Rust ≈ `*const T` in Zig — a pointer you can only read through
- `&mut T` in Rust ≈ `*T` in Zig (non-const pointer) — a pointer you can write through

The key difference is that Rust's type system tracks whether a reference is alive and exclusive at compile time; Zig leaves that responsibility to you.

## Summary

- `&T` is a shared (read-only) reference; any number may coexist.
- `&mut T` is an exclusive (read-write) reference; only one may exist at a time.
- Form them with `&expr` / `&mut expr`.
- Dereference with `*r`; Rust auto-derefs in method calls and many other positions.
- Both are pointer-sized (`usize`) regardless of `T`.
- References are always valid — unlike raw pointers `*const T` / `*mut T`, which require `unsafe` to dereference.
- The borrow-checker rules that govern reference lifetimes and aliasing are covered separately.
