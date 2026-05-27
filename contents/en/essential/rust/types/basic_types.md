---
title: Primitive Types in Rust
summary: "Rust's built-in primitive types — fixed-width integers (`i8`…`i128`, `u8`…`u128`, `isize`, `usize`), floating-point numbers (`f32`, `f64`), `bool`, `char`, and the unit type `()` — and how they map onto the Zig primitives you already know."
prerequisites:
  - essential/rust/types/general_type_intro
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

Every value in Rust has a type, and the simplest types are built into the language. These **primitive types** are the atoms from which all other types are constructed.

## Integer types

Rust has signed and unsigned integer types at five widths plus a pointer-width pair:

| Signed  | Unsigned | Width |
|---------|----------|-------|
| `i8`    | `u8`     | 8 bits |
| `i16`   | `u16`    | 16 bits |
| `i32`   | `u32`    | 32 bits |
| `i64`   | `u64`    | 64 bits |
| `i128`  | `u128`   | 128 bits |
| `isize` | `usize`  | pointer-width (64 bits on 64-bit systems) |

The signed types use two's complement. A `u8` holds $[0, 255]$; an `i8` holds $[-128, 127]$.

`usize` is the type of array indices and memory lengths — the natural integer size for addressing memory. If you're coming from Zig, the mapping is direct: Zig's `u8`, `i32`, `usize`, and `isize` correspond exactly.

```rust
let a: u8 = 255;
let b: i32 = -1_000_000; // underscores as separators are allowed
let c: usize = 42;
```

**Integer overflow**: in debug builds Rust panics on integer overflow; in release builds it wraps. For explicit wrapping semantics use `.wrapping_add()`, `.wrapping_mul()`, and similar methods.

## Floating-point types

Rust provides two IEEE 754 floating-point types:

- `f32` — 32-bit single precision
- `f64` — 64-bit double precision (the default for float literals)

```rust
let x: f32 = 1.5;
let y = 2.71828;   // inferred as f64
```

Arithmetic between `f32` and `f64` is not implicit — you must cast with `as`.

## The boolean type

`bool` holds exactly two values: `true` and `false`. It is one byte in memory.

```rust
let flag = true;
let combined = flag && false; // false
```

Rust does not treat integers as booleans. `if 1 { }` is a compile error; you must provide a `bool` expression.

## The character type

`char` is a Unicode scalar value — a single Unicode code point, stored as four bytes.

```rust
let letter = 'a';
let crab = '🦀';
```

`char` literals use single quotes; string literals use double quotes. A Rust `char` is not a byte: iterating a string with `.chars()` yields code points, while `.bytes()` yields raw bytes.

## The unit type

`()` is the **unit type** — "void" in other languages. It has exactly one value, also written `()`. A function with no stated return type returns `()` implicitly.

```rust
fn greet(name: &str) { // return type is ()
    println!("Hello, {name}!");
}
```

Unit appears naturally in generics: `Result<(), String>` is a result that succeeds with no useful value and fails with a `String`.

## Numeric literals

```rust
let decimal     = 98_222;      // underscores for readability
let hex         = 0xff;
let octal       = 0o77;
let binary      = 0b1111_0000;
let byte: u8    = b'A';        // byte literal — u8 only
```

## Casting with `as`

The `as` keyword performs explicit numeric conversions:

```rust
let wide: i32 = 300;
let narrow = wide as u8; // truncates: 300 % 256 = 44
```

Conversions between numeric types are always explicit in Rust. There is no implicit widening or narrowing. Be aware of truncation and sign changes when casting to a narrower type.
