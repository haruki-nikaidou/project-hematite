---
title: Ownership
summary: "Ownership is Rust's compile-time mechanism for enforcing RAII automatically. Every value has exactly one owner; when the owner goes out of scope, the value is dropped. You'll see the three ownership rules, how assignment transfers ownership (so the source variable can no longer be used), and why the `Sized`, `Clone`, and `Copy` traits determine which kinds of values transfer this way and which are duplicated implicitly instead."
prerequisites:
  - essential/rust/raii
  - essential/rust/memory/traits/sized
  - essential/rust/memory/traits/clone_copy
aliases: []
tags: ["Rust", "Ownership"]
updated: 2026-05-27
---

[RAII](../raii/) gives every resource an owner and guarantees cleanup at scope exit. Ownership is Rust's compile-time system for making that guarantee precise and verifiable. This checkpoint makes the rules explicit — covering the three ownership axioms, how values move between variables, and when `Copy` or `Clone` applies instead.

## The three ownership rules

Every value in Rust satisfies three rules simultaneously:

1. **Every value has exactly one owner** — the variable binding that holds it.
2. **When the owner goes out of scope, the value is dropped** — cleanup runs automatically.
3. **Ownership can be transferred to a new owner**, after which the original owner can no longer use the value.

These three rules are sufficient to guarantee no resource is leaked and none is freed twice.

## Move semantics

When you assign a value to another variable, or pass a value to a function, **ownership moves**. The original binding becomes permanently invalid:

```rust
let s = String::from("hello"); // s owns the heap allocation
let t = s;                     // ownership moves from s to t
// println!("{}", s);          // compile error: value moved
println!("{}", t);             // ok
```

This is not a copy — no new heap allocation is made. `t` now holds the same allocation `s` held. The compiler marks `s` as moved and rejects any use of it afterward.

The same rule applies when passing a value to a function:

```rust
fn consume(s: String) {
    println!("{}", s);
} // s is dropped here; the heap allocation is freed

let greeting = String::from("hi");
consume(greeting);
// greeting is no longer valid — it was moved into consume
```

## What can be moved

For a type to be movable by value, its size must be known at compile time. The [`Sized`](../memory/traits/sized/) marker trait is the formal requirement: every generic type parameter has an implicit `T: Sized` bound. Unsized types — slices `[T]`, `str`, trait objects `dyn Trait` — cannot be held as owned values; they can only appear behind a reference.

## `Copy`: moves that silently duplicate

Types that implement [`Copy`](../memory/traits/clone_copy/) are **bitwise-duplicated** wherever they are "moved". The original binding stays valid:

```rust
let x: i32 = 5;
let y = x;         // x is copied (bitwise), not moved
println!("{}", x); // x is still valid
```

`Copy` applies to types for which a bitwise copy is semantically correct and cheap: integers, floats, `bool`, `char`, and tuples or arrays of `Copy` types. Types that implement `Drop` cannot implement `Copy` — two copies would each call `drop`, freeing the same resource twice.

## `Clone`: explicit duplication

[`Clone`](../memory/traits/clone_copy/) is the opt-in form of duplication. Calling `.clone()` produces an independent copy, potentially at non-trivial cost:

```rust
let s = String::from("hello");
let t = s.clone(); // independent heap allocation for t
println!("{} {}", s, t); // both valid
```

A `String` must copy its entire heap buffer on `clone`. Because this allocation is real work, Rust makes it explicit: you write `.clone()` to opt in, rather than having the compiler duplicate heap data silently.

All `Copy` types also implement `Clone` — calling `.clone()` on a `Copy` type just copies the bits. The converse is not true: `String` is `Clone` but not `Copy`.

## Compiler enforcement

The borrow checker tracks move state for every variable at every point in the program. Using a moved value is a compile error:

```rust
let v = vec![1, 2, 3];
let w = v;
println!("{:?}", v); // error[E0382]: borrow of moved value: `v`
```

The error message names the variable, shows where it was moved, and points to the invalid use. These errors are the compiler proving your resource management is sound before the program ever runs.

## Summary

- Every value has exactly one owner; when the owner leaves scope, the value is dropped.
- Assigning to a new variable or passing to a function **moves** ownership; the old binding is no longer valid.
- [`Sized`](../memory/traits/sized/) is required for values passed by value; unsized types can only live behind a reference.
- [`Copy`](../memory/traits/clone_copy/) types are bitwise-duplicated silently; no `Drop` implementation is allowed on them.
- [`Clone`](../memory/traits/clone_copy/) types require an explicit `.clone()` call to duplicate — you opt into the cost.
