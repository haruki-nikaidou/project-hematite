---
title: Range Types
summary: "Rust's range expressions `a..b`, `a..=b`, `..b`, `a..`, and `..` produce values of the `Range*` family of types in `std::ops`. You'll see what each range type contains, why they implement `Iterator` (so they work in `for` loops), and how they double as the slicing arguments behind `&v[i..j]`."
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust", "Standard Library"]
updated: 2026-05-27
---

Range expressions are literals that produce values of the `Range*` types from `std::ops`. Writing `1..5` is sugar for constructing a `Range<i32>` value — a real type you can store, pass, and iterate.

## The range types

| Expression | Type | Meaning |
|------------|------|---------|
| `a..b` | `Range<T>` | half-open: a ≤ n < b |
| `a..=b` | `RangeInclusive<T>` | closed: a ≤ n ≤ b |
| `a..` | `RangeFrom<T>` | a ≤ n (unbounded above) |
| `..b` | `RangeTo<T>` | n < b (unbounded below) |
| `..=b` | `RangeToInclusive<T>` | n ≤ b (unbounded below) |
| `..` | `RangeFull` | all elements |

`Range<T>` and `RangeInclusive<T>` are the most common because they implement `Iterator`. The others — `RangeTo`, `RangeToInclusive`, `RangeFrom`, and `RangeFull` — exist primarily as slice indices.

## Ranges as iterators

`Range<T>` and `RangeInclusive<T>` implement `Iterator` for integer types, so they work directly in `for` loops:

```rust
for i in 0..5 {
    println!("{i}"); // 0, 1, 2, 3, 4
}

for i in 0..=5 {
    println!("{i}"); // 0, 1, 2, 3, 4, 5
}
```

Because a range is an `Iterator`, you can call any iterator adapter on it:

```rust
let squares: Vec<i32> = (1..=5).map(|n| n * n).collect(); // [1, 4, 9, 16, 25]
let evens: Vec<i32>   = (0..20).filter(|n| n % 2 == 0).collect();
```

`RangeFrom` (`a..`) is also an iterator that counts upward forever. Pair it with `.take(n)` to avoid an infinite loop:

```rust
let first_five: Vec<i32> = (10..).take(5).collect(); // [10, 11, 12, 13, 14]
```

## Ranges as slice indices

Any slice or `Vec` can be indexed with a range to select a contiguous subrange. This produces a [slice](../../slice/) reference with no copying:

```rust
let v = vec![10, 20, 30, 40, 50];

let a: &[i32] = &v[1..4];   // [20, 30, 40]        — Range
let b: &[i32] = &v[..3];    // [10, 20, 30]         — RangeTo
let c: &[i32] = &v[3..];    // [40, 50]             — RangeFrom
let d: &[i32] = &v[..];     // [10, 20, 30, 40, 50] — RangeFull
let e: &[i32] = &v[1..=3];  // [20, 30, 40]         — RangeInclusive
```

The bounds are checked at runtime and panic if out of range.

## Ranges in `match`

Range patterns in `match` use the same `..=` syntax but are distinct from the `Range*` types — they are a feature of the pattern language, not values:

```rust
let label = match score {
    0..=49  => "fail",
    50..=69 => "pass",
    70..=89 => "merit",
    _       => "distinction",
};
```

A match pattern `0..=49` does not construct a `RangeInclusive<i32>`; it is purely a compile-time syntactic check against a numeric range.

## Summary

- `a..b` produces a `Range<T>` (half-open); `a..=b` produces a `RangeInclusive<T>` (closed).
- `Range` and `RangeInclusive` implement `Iterator` for integer types and work directly in `for` loops and iterator adapters.
- `..b`, `a..`, `..=b`, and `..` are primarily used as slice indices to select contiguous subranges without copying.
- Match arm patterns `a..=b` look like ranges but are distinct syntax — they test values rather than constructing `Range` objects.
