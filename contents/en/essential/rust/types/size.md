---
title: The Size of a Type
summary: "Every Rust type a value can be stored in has a fixed compile-time size in bytes, queryable with `std::mem::size_of`. You'll see why primitive sizes match their bit width, how structs and enums compute their sizes, and which kinds of types (slices, trait objects) deliberately have *no* statically-known size."
prerequisites:
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---

When you write `let x: u32 = 42;`, Rust needs to know how many bytes to reserve for `x` — at compile time, unconditionally. That requirement, called the **size** of a type, underpins nearly everything about memory layout: stack frames, array strides, `memcpy` calls, and FFI boundaries.

## Querying size with `std::mem::size_of`

`std::mem::size_of::<T>()` returns the size of `T` in bytes as a `usize`. It is a const function, so you can use it in constant expressions.

```rust
use std::mem;

fn main() {
    println!("{}", mem::size_of::<u8>());    // 1
    println!("{}", mem::size_of::<i32>());   // 4
    println!("{}", mem::size_of::<f64>());   // 8
    println!("{}", mem::size_of::<bool>());  // 1
    println!("{}", mem::size_of::<char>());  // 4
    println!("{}", mem::size_of::<usize>()); // 8 on 64-bit targets
    println!("{}", mem::size_of::<()>());    // 0
}
```

If you have a value in hand rather than a type, use `mem::size_of_val(&x)` instead.

## Primitive type sizes

The table below summarises the standard primitives. The sizes follow directly from the bit width you already know from [primitive types](../basic_types/).

| Type | Size (bytes) | Notes |
|------|-------------|-------|
| `u8`, `i8` | 1 | |
| `u16`, `i16` | 2 | |
| `u32`, `i32`, `f32` | 4 | |
| `u64`, `i64`, `f64` | 8 | |
| `u128`, `i128` | 16 | |
| `usize`, `isize` | 4 or 8 | matches pointer width |
| `bool` | 1 | only `0x00` and `0x01` are valid |
| `char` | 4 | stores a Unicode scalar value |
| `()` | 0 | the unit type carries no data |

`usize` and `isize` mirror Zig's `usize` and `isize`: they are exactly as wide as a pointer on the target platform.

## Struct size: fields plus padding

A struct's size is **not** simply the sum of its field sizes. The compiler inserts invisible **padding** bytes between fields to ensure each field starts at its required address boundary. That boundary is the field's **alignment** — covered in detail in the [next checkpoint](../align/).

```rust
use std::mem;

struct Foo {
    a: u8,   // 1 byte
    b: u32,  // 4 bytes
    c: u16,  // 2 bytes
}

fn main() {
    println!("{}", mem::size_of::<Foo>()); // 12, not 7
}
```

The extra 5 bytes come from padding the compiler adds to meet each field's alignment requirement. The exact layout is discussed in [Type Alignment](../align/).

## Enum size: discriminant plus the largest variant

A Rust enum is essentially a tagged union. Its size is:

$$\text{size(enum)} = \text{size(discriminant)} + \text{size(largest variant)}$$

plus any padding needed to align the whole thing. A discriminant is an integer that identifies which variant is active.

```rust
use std::mem;

enum Message {
    Quit,                  // no data
    Move { x: i32, y: i32 }, // 8 bytes of data
    Write(String),         // 24 bytes on 64-bit
}

fn main() {
    println!("{}", mem::size_of::<Message>()); // at least 24 + discriminant bytes
}
```

### Niche optimisation for `Option<&T>`

The compiler knows that a reference is never null (its bit pattern `0x0…0` is invalid). It uses that forbidden bit pattern as the `None` discriminant. The result: `Option<&T>` is exactly the same size as `&T`.

```rust
use std::mem;

fn main() {
    assert_eq!(
        mem::size_of::<Option<&u32>>(),
        mem::size_of::<&u32>(),  // both 8 bytes on 64-bit
    );
}
```

This is called a **niche optimisation** — the compiler exploits invalid bit patterns inside a type to store the discriminant for free. The same trick applies to `Option<Box<T>>`, `Option<fn()>`, and other non-nullable pointer-like types.

## Dynamically sized types (DSTs)

Some types deliberately have no compile-time size:

- `[T]` — a slice of `T` values; the length is not part of the type
- `dyn Trait` — a trait object; the concrete type is only known at runtime

`size_of::<[u8]>()` is a compile error. Use `size_of_val` with a reference:

```rust
use std::mem;

fn print_slice_size(s: &[u32]) {
    println!("{}", mem::size_of_val(s)); // length * 4
}

fn main() {
    print_slice_size(&[1, 2, 3]); // 12
}
```

A **fat pointer** to a DST — `&[T]` or `&dyn Trait` — does have a known size: two pointer widths (pointer + length or pointer + vtable pointer).

```rust
use std::mem;

fn main() {
    println!("{}", mem::size_of::<&[u32]>());    // 16: ptr + len
    println!("{}", mem::size_of::<&dyn std::fmt::Display>()); // 16: ptr + vtable
}
```

## The `Sized` trait and `?Sized`

Every type with a compile-time size implicitly implements the `Sized` marker trait. DSTs do not. By default, generic type parameters require `Sized`:

```rust
fn wrap<T>(x: T) -> Box<T> {   // T: Sized is implicit
    Box::new(x)
}
```

Writing `T: ?Sized` opts out of that requirement, allowing the function to accept `T = [u8]` or `T = dyn Trait`. You will encounter `?Sized` most often in the standard library (e.g. `Box<T: ?Sized>`, `Rc<T: ?Sized>`).

## Summary

- `std::mem::size_of::<T>()` returns the compile-time byte size of `T`; use `size_of_val(&x)` when you only have a value.
- Primitive sizes match their bit width; `()` is zero bytes.
- Struct size equals the sum of field sizes plus compiler-inserted padding for alignment.
- Enum size is discriminant + largest variant; the niche optimisation can make `Option<&T>` the same size as `&T`.
- DSTs (`[T]`, `dyn Trait`) have no compile-time size; fat pointers to them are two pointer widths.
- `Sized` is the implicit bound on all generic parameters; `?Sized` lifts it.
