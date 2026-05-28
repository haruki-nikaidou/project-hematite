---
title: "`Vec<T>`"
summary: "`Vec<T>` is Rust's growable heap-allocated array: a contiguous buffer plus a length and capacity. You'll see how `push`, `pop`, and indexing work, how the buffer grows when capacity is exceeded, why `&v[..]` gives you a slice view, and how the `Vec` releases all its memory automatically when it goes out of scope."
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/types/slice
  - essential/rust/memory/traits/drop
aliases: []
tags: ["Rust", "Standard Library", "Memory"]
updated: 2026-05-27
---

`Vec<T>` is Rust's all-purpose growable sequence. Under the hood it is three fields: a pointer to a heap-allocated buffer, a **length** (how many elements are present), and a **capacity** (how many elements fit before reallocation). Most container work in Rust starts with a `Vec`.

## Creating a `Vec`

Three common ways:

```rust
let mut v: Vec<i32> = Vec::new();   // empty, capacity 0
let mut v = Vec::with_capacity(8);  // pre-allocate 8 slots, length 0
let v = vec![1, 2, 3, 4, 5];       // macro: initialise from a literal list
```

`vec![]` is syntactic sugar that expands to a `Vec::new()` followed by a series of pushes.

## `push`, `pop`, and indexing

```rust
let mut v = vec![10, 20, 30];

v.push(40);              // appends; v is now [10, 20, 30, 40]
let last = v.pop();      // removes and returns the last element: Some(40)
println!("{}", v[0]);    // index by position: 10
println!("{}", v.len()); // 3
```

Indexing with `[]` panics if the index is out of bounds. Use `.get(i)` to receive an `Option<&T>` instead:

```rust
match v.get(10) {
    Some(x) => println!("{x}"),
    None    => println!("out of bounds"),
}
```

## Capacity and growth

When you `push` past the current capacity, `Vec` allocates a larger buffer — typically doubling — copies the elements, and frees the old buffer. The amortised cost per `push` is O(1).

```rust
let mut v: Vec<i32> = Vec::new();
println!("{}", v.capacity()); // 0

v.push(1);
println!("{}", v.capacity()); // typically 4; exact value is unspecified
```

If you know the final size in advance, `Vec::with_capacity(n)` avoids repeated reallocation.

## Slice views

`Vec<T>` implements `Deref<Target = [T]>`, so wherever a [slice](../../slice/) `&[T]` is expected, a reference to a `Vec<T>` coerces automatically:

```rust
fn sum(values: &[i32]) -> i32 {
    values.iter().sum()
}

let v = vec![1, 2, 3];
println!("{}", sum(&v)); // &Vec<i32> coerces to &[i32]
```

You can also take a subslice with a range index — no copying occurs:

```rust
let middle: &[i32] = &v[1..3]; // [2, 3]
let whole:  &[i32] = &v[..];   // [1, 2, 3]
```

## Iteration

A `Vec` is iterable in all three ownership flavors:

```rust
let mut v = vec![1, 2, 3];

for x in &v     { /* x: &i32   — v still usable after       */ }
for x in &mut v { /* x: &mut i32 — modify elements in place */ }
for x in v      { /* x: i32   — v is consumed               */ }
```

## Memory and `Drop`

`Vec` implements [`Drop`](../../../memory/traits/drop/). When a `Vec` goes out of scope, it drops every element in the buffer and then frees the heap allocation — no manual `free` required.

```rust
{
    let v = vec![String::from("a"), String::from("b")];
} // each String is dropped first, then the buffer is freed
```

## Summary

- A `Vec<T>` is a heap buffer with a length and a capacity.
- `push` appends; `pop` removes the last element as `Option<T>`; `[i]` indexes (panics on bounds); `.get(i)` returns `Option<&T>`.
- Capacity grows automatically (typically doubles) when `push` exceeds it; `with_capacity` avoids reallocation when the size is known.
- `&Vec<T>` coerces to `&[T]`, so `Vec` works everywhere a slice is accepted.
- When a `Vec` is dropped, all elements are dropped and the heap buffer is freed.
