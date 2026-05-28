---
title: "`Option<T>`"
summary: "`Option<T>` is the standard sum type for 'a `T` or nothing': `Some(T)` carries a value, `None` carries none. You'll see why Rust has no `null` and instead encodes absence in the type system, how `match`, `if let`, and the `?` operator make `Option` ergonomic, and the most useful helpers (`unwrap_or`, `map`, `and_then`)."
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/pattern_match
aliases: []
tags: ["Rust", "Standard Library"]
updated: 2026-05-27
---

`Option<T>` is Rust's replacement for null. Instead of allowing any reference to be null and crashing at runtime, Rust makes the absence of a value explicit in the type: a function returning `Option<String>` either returns `Some(String)` with a value or `None` with nothing. The compiler forces you to handle both.

## The definition

`Option<T>` is defined in the standard library as:

```rust
enum Option<T> {
    None,
    Some(T),
}
```

`None` and `Some` are in scope automatically — you do not need to write `Option::None` or `Option::Some`, though you may.

## Matching on an `Option`

The canonical way to inspect an `Option` is [pattern matching](../../../pattern_match/):

```rust
fn greet(name: Option<&str>) {
    match name {
        Some(n) => println!("Hello, {n}!"),
        None    => println!("Hello, stranger!"),
    }
}
```

`match` is exhaustive: the compiler refuses to compile the code if either arm is missing.

For the pattern of "do something only when `Some`", `if let` is more concise:

```rust
if let Some(n) = name {
    println!("Hello, {n}!");
}
```

## The `?` operator

Inside a function that returns `Option<T>`, the `?` operator short-circuits on `None`: it unwraps a `Some` or immediately returns `None` from the surrounding function.

```rust
fn double_first(numbers: &[i32]) -> Option<i32> {
    let first = numbers.first()?; // None if the slice is empty
    first.checked_mul(2)          // None if the result would overflow
}
```

`?` on an `Option` is sugar for:

```rust
match value {
    Some(x) => x,
    None    => return None,
}
```

## Combinators

`Option` provides higher-order methods for transforming and composing optional values without explicit `match`.

**`map`** transforms the inner value if present:

```rust
let n: Option<i32> = Some(4);
let doubled = n.map(|x| x * 2);            // Some(8)
let nothing: Option<i32> = None;
let still_nothing = nothing.map(|x| x * 2); // None
```

**`and_then`** chains an operation that itself returns an `Option`:

```rust
fn parse_and_double(s: &str) -> Option<i32> {
    s.parse::<i32>().ok().and_then(|n| n.checked_mul(2))
}
```

`and_then` is used when `map` would produce `Option<Option<T>>` — it flattens the result automatically.

**`unwrap_or`** provides a fallback value:

```rust
let value = optional.unwrap_or(0);
```

**`unwrap_or_else`** computes the fallback lazily, avoiding the cost when `Some`:

```rust
let value = optional.unwrap_or_else(|| expensive_default());
```

## Converting between `Option` and `Result`

`Option` and `Result` are close cousins. `ok_or` attaches an error to turn `None` into `Err`:

```rust
let value: Result<i32, &str> = Some(42).ok_or("missing"); // Ok(42)
let error: Result<i32, &str> = None.ok_or("missing");     // Err("missing")
```

In the other direction, `Result::ok()` discards the error and returns an `Option`:

```rust
let opt: Option<i32> = "42".parse::<i32>().ok(); // Some(42)
```

The full `Result<T, E>` type is covered in [Result](../result/).

## Summary

- `Option<T>` encodes "present" as `Some(T)` and "absent" as `None` — no null pointers.
- `match` and `if let` destructure `Option` with exhaustiveness checking.
- `?` in an `Option`-returning function short-circuits to `None` automatically.
- `map` transforms the inner value; `and_then` chains optional operations; `unwrap_or` provides a default.
- `ok_or` converts `Option` to `Result`; `Result::ok()` converts back.
