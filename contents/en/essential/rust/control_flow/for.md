---
title: "`for` Loops"
summary: "The most common iteration shape in Rust: `for x in expr { … }` walks every element of an iterable — a range like `0..n`, a slice like `&v`, an array, or any value with an `IntoIterator` impl. You'll see the three flavours (`for x in v`, `for x in &v`, `for x in &mut v`) and how each relates to ownership of the elements."
prerequisites:
  - essential/rust/control_flow/while_loop
  - essential/rust/types/std/range
  - essential/rust/types/slice
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

`for` iterates over any value that can be turned into a sequence of items. For straightforward looping it is cleaner than [while](../while_loop/) and more explicit about ownership than the equivalent iterator pipeline.

## Iterating over a range

```rust
for i in 0..5 {
    println!("{i}"); // 0, 1, 2, 3, 4
}
```

`0..5` is a half-open range: start inclusive, end exclusive. Use `0..=5` to include the endpoint. Ranges are their own type in Rust's standard library — they implement `IntoIterator`, so they plug straight into `for`.

## Three ownership flavors

How the loop variable relates to the collection depends on what you pass after `in`:

| Form | What happens to the collection | Element type |
|------|-------------------------------|--------------|
| `for x in v` | `v` is moved (consumed) | `T` |
| `for x in &v` | `v` is borrowed immutably | `&T` |
| `for x in &mut v` | `v` is borrowed mutably | `&mut T` |

```rust
let names = vec!["Alice", "Bob", "Carol"];

// borrow — names is still usable after the loop
for name in &names {
    println!("{name}");
}

// move — names is consumed; do not use it after this
for name in names {
    println!("{name}");
}
```

For a [slice](../../types/slice/) `&[T]` you always iterate as `for x in slice` (where `slice` is already a `&[T]`) — slices do not implement the by-value `IntoIterator` because they do not own their data.

To mutate elements in place, borrow mutably:

```rust
let mut values = vec![1, 2, 3];
for x in &mut values {
    *x *= 2; // dereference to assign through &mut i32
}
// values is now [2, 4, 6]
```

## Pattern destructuring in `for`

The loop variable is a pattern, not just a name. You can destructure tuples directly:

```rust
let pairs = vec![(1, 'a'), (2, 'b'), (3, 'c')];

for (n, c) in &pairs {
    println!("{n}: {c}");
}
```

## `enumerate` and `zip`

Two iterator adapters are common enough to use directly with `for` without building a full pipeline:

```rust
let fruits = ["apple", "banana", "cherry"];

// pair each element with its zero-based index
for (i, fruit) in fruits.iter().enumerate() {
    println!("{i}: {fruit}");
}
```

```rust
let nums = [1, 2, 3];
let chars = ['x', 'y', 'z'];

// walk two collections in lockstep; stops at the shorter one
for (n, c) in nums.iter().zip(chars.iter()) {
    println!("{n}-{c}");
}
```

You will see the full iterator adapter API in [Iterators](../iter/).

## `break` and `continue`

`break` exits the loop immediately; `continue` skips the rest of the current iteration:

```rust
for n in 0..20 {
    if n % 2 == 0 { continue; } // skip even numbers
    if n > 10     { break; }    // stop once n exceeds 10
    println!("{n}");
}
```

Unlike `loop`, a `for` loop cannot produce a value via `break value` — use `loop` when you need that.
