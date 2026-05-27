---
title: Variables in Rust
summary: "How to declare variables in Rust with `let`, the role of `mut`, why bindings are immutable by default, shadowing, and how Rust's type inference fills in type annotations you omit."
prerequisites:
  - essential/rust/intro
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

Rust calls variable declarations **bindings** for a reason: `let x = 5` binds the name `x` to the value `5`. The binding is, by default, immutable — you can read `x`, but you cannot change it.

## The `let` keyword

Every variable declaration starts with `let`:

```rust
let x = 5;
let greeting = String::from("hello");
```

The type is usually inferred. When it cannot be inferred, or when you want to be explicit, add a type annotation after the name:

```rust
let x: i32 = 5;
let bytes: Vec<u8> = Vec::new();
```

## Immutability by default

Rust variables are **immutable by default**. This code is a compile error:

```rust
let x = 5;
x = 6; // error: cannot assign twice to immutable variable
```

The compiler enforces immutability so that a reader can trust that a value will not change. When you see `let x = 5` without `mut`, you know `x` will always be `5` in that scope — no need to scan the rest of the function to confirm.

To allow reassignment, add `mut`:

```rust
let mut x = 5;
x = 6; // ok
```

Use `mut` when the binding needs to change. Leave it off when it does not.

## Shadowing

Rust allows **shadowing**: a second `let` with the same name creates a new binding that hides the first:

```rust
let x = 5;
let x = x + 1;  // new binding, shadows old x
let x = x * 2;  // another new binding
println!("{}", x); // 12
```

Shadowing differs from mutation. Each `let x` creates a fresh binding — the old one is simply unreachable. Importantly, the new binding can have a different type:

```rust
let guess = "42";                              // &str
let guess: u32 = guess.parse().expect("NaN"); // u32, same name
```

With `mut`, the type could not change — a mutation must preserve the type. Shadowing is idiomatic when transforming a value through a pipeline and the intermediate bindings are not needed afterward.

## Scope

A binding lives from its declaration to the end of the block containing it. When execution leaves the block, the value is **dropped** — its memory is freed or any owned resource is released:

```rust
{
    let s = String::from("hello");
    println!("{}", s);
} // s is dropped here; the heap allocation is freed
```

This is Rust's **RAII** in action. The scope determines the lifetime of the binding, and the compiler ensures values are cleaned up at the right moment.

## Type inference

Rust infers types from context:

```rust
let x = 5;           // i32 (integer literal default)
let y = 5.0;         // f64 (float literal default)
let mut v = Vec::new();
v.push(1u8);         // v is now Vec<u8>, inferred from the push
```

Integer literals without context default to `i32`; float literals default to `f64`. When inference has no basis, the compiler asks for an annotation:

```rust
let v: Vec<u8> = Vec::new(); // no push to infer from, annotation required
```

Add a type suffix — `5u8`, `3.14f32` — to override the default on a literal.
