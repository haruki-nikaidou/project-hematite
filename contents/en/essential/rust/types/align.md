---
title: Type Alignment
summary: "A type's *alignment* is the address boundary one of its values must start on, queryable with `std::mem::align_of`. You'll see why hardware imposes alignment, how the compiler inserts padding between struct fields to satisfy it, why reordering fields can shrink a struct, and the `#[repr(C)]` and `#[repr(packed)]` attributes that change the default layout."
prerequisites:
  - essential/rust/types/size
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---

Knowing the [size](../size/) of a type tells you how many bytes a value occupies. But knowing where in memory that value is allowed to start is a separate question — and the answer is the type's **alignment**.

## What alignment means

A type's alignment is a power-of-two number of bytes. A value of that type must be stored at an address that is a multiple of its alignment. An `i32` has alignment 4, so it must live at an address like `0x1000`, `0x1004`, or `0x10AC` — never `0x1001`.

`std::mem::align_of::<T>()` returns the alignment requirement as a `usize`:

```rust
use std::mem;

fn main() {
    println!("{}", mem::align_of::<u8>());    // 1
    println!("{}", mem::align_of::<u16>());   // 2
    println!("{}", mem::align_of::<u32>());   // 4
    println!("{}", mem::align_of::<u64>());   // 8
    println!("{}", mem::align_of::<f64>());   // 8
    println!("{}", mem::align_of::<bool>());  // 1
    println!("{}", mem::align_of::<char>());  // 4
}
```

For a value you already hold, use `mem::align_of_val(&x)` — analogous to `size_of_val`.

## Why hardware needs alignment

Modern CPUs are most efficient when a value's address is a multiple of its size. Three concrete reasons:

- **Cache lines**: a cache line is typically 64 bytes. An aligned 8-byte value always sits entirely within one cache line; a misaligned one can straddle two, forcing a second cache fetch.
- **Atomic operations**: most architectures only guarantee atomicity for aligned accesses. Misaligned atomic loads/stores either fault or silently break the atomicity guarantee.
- **SIMD instructions**: vector instructions like SSE/AVX often require their operands to be 16- or 32-byte aligned.

Rust's type system enforces alignment so you never have to worry about the hardware corner cases above — as long as you stay within safe Rust.

## Struct padding

The compiler satisfies each field's alignment requirement by inserting invisible **padding** bytes before that field. A concrete example:

```rust
use std::mem;

struct Foo {
    a: u8,  // align 1, size 1
    b: u32, // align 4, size 4
    c: u16, // align 2, size 2
}

fn main() {
    println!("size:  {}", mem::size_of::<Foo>());  // 12
    println!("align: {}", mem::align_of::<Foo>()); // 4
}
```

Here is what the layout looks like in memory:

```text
offset 0: a        (1 byte)
offset 1: padding  (3 bytes — so that b starts at offset 4)
offset 4: b        (4 bytes)
offset 8: c        (2 bytes)
offset 10: padding (2 bytes — so that the struct size is a multiple of 4)
```

Total: 12 bytes. The raw fields add up to only 7 bytes; the other 5 are padding.

The struct's own alignment is the maximum alignment of its fields — here 4, from `b: u32`. The struct's total size must also be a multiple of its alignment (so that arrays of the struct work correctly), which is why 2 bytes of tail padding are added.

## Reordering fields to reduce padding

Placing fields in descending order of alignment (largest first) minimises wasted space:

```rust
use std::mem;

struct FooOptimal {
    b: u32, // align 4, size 4  — at offset 0
    c: u16, // align 2, size 2  — at offset 4
    a: u8,  // align 1, size 1  — at offset 6
            // 1 byte tail padding to round size up to 8
}

fn main() {
    println!("{}", mem::size_of::<FooOptimal>()); // 8, down from 12
}
```

Rust's default layout (`repr(Rust)`) does **not** guarantee any particular field order and may reorder them on its own. In practice the compiler often does reorder fields, but you cannot rely on it; profile-guided or manual reordering is still useful when you control `repr(C)` structs.

## `#[repr(C)]` — C-compatible layout

By default Rust reserves the right to reorder and pad fields however it likes. `#[repr(C)]` disables that freedom: fields are laid out in declaration order with C-compatible padding rules.

```rust
#[repr(C)]
struct Header {
    version: u8,
    length: u32,
    flags: u16,
}
```

Use `#[repr(C)]` when:

- passing the struct across an FFI boundary to C code,
- using the struct in `unsafe` code that depends on a known offset,
- matching a network or file format specification.

The layout is predictable but may waste more space than the compiler's default.

## `#[repr(packed)]` — no padding

`#[repr(packed)]` removes all padding, packing fields as tightly as possible:

```rust
#[repr(packed)]
struct Packed {
    a: u8,
    b: u32,
    c: u16,
}
```

`size_of::<Packed>()` is now 7 — exactly the sum of the field sizes.

There is a significant danger: taking a reference to a field of a packed struct can produce an **unaligned reference**, which is undefined behaviour in Rust. The compiler will warn you, but the code may still compile.

```rust
#[repr(packed)]
struct Packed {
    a: u8,
    b: u32,
}

fn main() {
    let p = Packed { a: 1, b: 2 };
    let b = p.b;   // OK — copies the value out
    // let r = &p.b; // UB: creates an unaligned reference
}
```

Restrict `#[repr(packed)]` to situations where binary size or wire format absolutely requires it, and never hold references to its fields.

## `#[repr(align(N))]` — raising alignment

You can increase a type's alignment beyond its natural value with `#[repr(align(N))]`, where `N` is a power of two:

```rust
use std::mem;

#[repr(align(64))]
struct CacheAligned {
    data: u32,
}

fn main() {
    println!("{}", mem::align_of::<CacheAligned>()); // 64
    println!("{}", mem::size_of::<CacheAligned>());  // 64 (padded up)
}
```

This is useful for ensuring a struct occupies its own cache line — a technique for avoiding false sharing between threads. You can lower alignment with `#[repr(packed)]` but you cannot raise it with `#[repr(packed)]`.

## Summary

- A type's alignment is the power-of-two address boundary its values must start on, returned by `std::mem::align_of::<T>()`.
- Misaligned accesses can degrade performance, break atomic guarantees, or fault on some hardware; Rust enforces alignment automatically.
- The compiler inserts padding between struct fields and at the end of a struct to satisfy alignment requirements.
- Reordering fields largest-to-smallest alignment typically minimises padding.
- `#[repr(C)]` fixes field order and padding for C interop; `#[repr(packed)]` removes padding but makes unaligned references undefined behaviour; `#[repr(align(N))]` raises the type's alignment.
