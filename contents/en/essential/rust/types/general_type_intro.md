---
title: What a Type Is in Rust
summary: "An orientation to Rust's type system: what a type tells the compiler, why every value has exactly one statically-known type, the difference between primitive and user-defined types, and how this contrasts with the looser type discipline of Zig and the runtime types of dynamic languages."
prerequisites:
  - essential/rust/intro
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

A **type** is a promise. When you write `let x: u32 = 5;`, you are telling the compiler that `x` holds a 32-bit unsigned integer — and the compiler will hold you to that promise everywhere `x` is used.

This sounds simple, but types are doing several jobs at once.

## What a type tells the compiler

Every type communicates three things:

- **Size**: how many bytes a value of that type occupies in memory.
- **Layout**: how those bytes are arranged (which bytes encode the integer, which is padding, which is a discriminant).
- **Operations**: which methods, operators, and trait implementations are available.

When the compiler knows the type of every value, it generates correct machine code without any runtime type tags. The type information exists at compile time and is then erased — the running program never asks "what type is this?"

## Static typing

Rust is **statically typed**: every expression has a single type fully known at compile time. There is no `any` type, no implicit coercion that silently reinterprets bytes, and no way to bypass the type system without writing explicitly `unsafe` code.

You rarely need to write types out — Rust's type inference fills them in most of the time. But the type is always there. When inference cannot figure it out, the compiler asks you to annotate.

```rust
let x = 5;       // inferred as i32
let y: u8 = 5;   // annotated
let z = 5u8;     // type suffix on the literal
```

## Primitive and user-defined types

Rust's type system has two layers.

**Primitive types** are built into the language: the integer and float families, `bool`, `char`, and the unit type `()`. Their sizes and operations are fixed by the language specification.

**User-defined types** — `struct`, `enum`, and the types composed from them — are everything else. The compiler treats them with the same precision: it knows their sizes, layouts, and available operations just as well as it knows those of `u32`.

This symmetry is deliberate. Defining your own type is as first-class as using a built-in one. A `Point` struct, a `Color` enum, a `Vec<u8>` from the standard library — all live in the same type system, on equal footing.

## How Rust's types differ from Zig's

Zig is also statically typed and compiles to native code. But Zig has `anytype` for generic parameters, and byte-level reinterpretation with `@bitCast` is a routine operation. Zig gives you tools to say "trust me, I know the real type here."

Rust makes that bargain harder. The `as` cast covers defined numeric conversions but will not reinterpret bytes between unrelated types. Reinterpreting raw bytes requires `unsafe` and `std::mem::transmute` — an explicit, visible claim that you are taking full responsibility. The common path is to stay inside the type system and let the compiler catch mistakes.

## What this means in practice

Reading a function signature in Rust is informative:

```rust
fn area(width: f64, height: f64) -> f64 { width * height }
```

You know the inputs are 64-bit floats, the output is a 64-bit float, and no other types are involved. The compiler verifies this at every call site. There is no way to silently pass a `u32` and get a coerced result.

This strictness is intentional. The type system is Rust's first line of defense — before ownership, before the borrow checker — because preventing incorrect programs from compiling is cheaper than debugging them at runtime.
