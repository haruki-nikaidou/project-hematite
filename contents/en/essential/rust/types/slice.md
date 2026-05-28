---
title: Slices
summary: "A slice `[T]` is a contiguous run of `T` values whose length is not known at compile time, almost always handled through a *slice reference* `&[T]` or `&mut [T]` — a fat pointer holding both an address and a length. You'll see how slices generalise references, why `&str` is just a slice of UTF-8 bytes, and how indexing and iteration work on them."
prerequisites:
  - essential/rust/types/reference
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

An array `[T; N]` knows its length at compile time. But many algorithms need to operate on a run of elements whose length is only known at runtime — the result of a search, a chunk of a file, the contents of a `Vec`. **Slices** are how Rust models that.

## `[T]` — the slice type

`[T]` (read: "slice of T") is a contiguous sequence of `T` values of unknown length. Because its size is not known at compile time, `[T]` is a **dynamically sized type (DST)**: you can never store a `[T]` directly in a variable, a struct field, or on the stack without some fixed-size wrapper.

```rust
// This would be a compile error — [i32] has unknown size:
// let s: [i32] = …;
```

In practice you almost always work with a **slice reference**: `&[T]` or `&mut [T]`.

## `&[T]` — the slice reference (a fat pointer)

A slice reference is a **fat pointer**: a pair of (address of the first element, number of elements). It occupies two `usize`s — twice the size of an ordinary reference.

```rust
use std::mem::size_of;

assert_eq!(size_of::<&[u8]>(), 2 * size_of::<usize>());
```

The address points into an existing contiguous allocation — an array, a `Vec`, a static buffer. The slice does not own the data; it borrows a view of it, exactly like [references](../reference/) borrow scalar values.

## `&mut [T]` — mutable slice reference

`&mut [T]` is the exclusive, read-write counterpart. It lets you sort, overwrite elements, or copy data into the slice. The same exclusivity rule as [`&mut T`](../reference/) applies: no other reference to the overlapping data may exist at the same time.

```rust
let mut data = [3, 1, 4, 1, 5];
let s: &mut [i32] = &mut data;
s.sort();
// data is now [1, 1, 3, 4, 5]
```

## Obtaining a slice

You can take a slice of any contiguous collection with a range index:

```rust
let arr = [10, 20, 30, 40, 50];
let all:   &[i32] = &arr[..];    // the whole array
let first: &[i32] = &arr[..3];   // [10, 20, 30]
let mid:   &[i32] = &arr[1..4];  // [20, 30, 40]

let v = vec![1, 2, 3, 4];
let chunk: &[i32] = &v[1..3];    // [2, 3]
```

Range syntax: `..` (full), `a..b` (exclusive end), `a..=b` (inclusive end), `..b`, `a..`.

## Indexing

Indexing a slice with `s[i]` returns the element by reference and **panics at runtime** if `i` is out of bounds:

```rust
let s = &[10, 20, 30][..];
let x = s[1]; // 20, because i32 is Copy
```

For fallible indexing, use `.get(i)`, which returns `Option<&T>`:

```rust
match s.get(5) {
    Some(v) => println!("got {v}"),
    None    => println!("out of bounds"),
}
```

Prefer `.get()` whenever the index comes from untrusted input.

## Iteration

Three common iteration patterns:

```rust
let s: &[i32] = &[1, 2, 3];

for x in s.iter() {         // yields &i32
    println!("{x}");
}

let mut data = [4, 5, 6];
for x in data.iter_mut() {  // yields &mut i32
    *x *= 2;
}
// data is now [8, 10, 12]

for x in [7, 8, 9] {        // consumes the array; yields i32 (Copy)
    println!("{x}");
}
```

For `&[T]` itself, a `for x in s` loop desugars to `for x in s.iter()` — it yields references, not values.

## Common slice methods

```rust
let s: &[i32] = &[3, 1, 4, 1, 5];

s.len();          // 5
s.is_empty();     // false
s.first();        // Some(&3)
s.last();         // Some(&5)
s.contains(&4);   // true

let mut m = [3, 1, 4, 1, 5];
m.sort();         // [1, 1, 3, 4, 5] — sorts in place, requires &mut [T]
```

These methods are defined on `[T]` and are available through any slice reference without importing anything.

## `&str` is a slice of UTF-8 bytes

A **string slice** `&str` is exactly `&[u8]` with the additional guarantee that the bytes are valid UTF-8. Everything said about `&[T]` applies: it is a fat pointer (address + length), it borrows data from somewhere else, and it does not own the string.

```rust
let greeting: &str = "hello";
let bytes: &[u8] = greeting.as_bytes(); // view the same data as raw bytes
```

The reason `&str` is not simply `&[u8]` is that UTF-8 characters can span multiple bytes. Indexing by byte position with `s[i]` is not available on `&str` — use `.chars()` to iterate over Unicode scalar values or `.bytes()` for raw bytes.

## Array-to-slice coercion

An array `[T; N]` coerces to `&[T]` automatically wherever a slice reference is expected. This is called an **unsized coercion**:

```rust
fn sum(s: &[i32]) -> i32 {
    s.iter().sum()
}

let arr = [1, 2, 3, 4];
let total = sum(&arr); // &[i32; 4] coerces to &[i32]
```

Functions that accept `&[T]` therefore work equally well with arrays, `Vec`, and any other contiguous buffer — you don't need separate overloads.

## Summary

- `[T]` is a DST; you always handle it through `&[T]` or `&mut [T]`.
- `&[T]` is a fat pointer: address + length, size = `2 * usize`.
- Obtain slices via range indexing: `&arr[1..4]`, `&v[..]`.
- `s[i]` panics on out-of-bounds; `.get(i)` returns `Option<&T>`.
- Iterate with `.iter()` (yields `&T`) or `.iter_mut()` (yields `&mut T`).
- Useful methods: `.len()`, `.is_empty()`, `.first()`, `.last()`, `.contains()`, `.sort()`.
- `&str` is a slice of UTF-8 bytes — a fat pointer into a string buffer.
- Arrays `[T; N]` coerce to `&[T]` automatically, so slice-accepting functions work with arrays too.
