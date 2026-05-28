---
title: "The `match` Expression"
summary: "Rust's `match` expression evaluates a value against a list of patterns and runs the arm whose pattern matches. You'll see why `match` is an *expression* (it produces a value), how exhaustiveness checking guarantees you handle every variant of a sum type, and how guards (`if`) refine arms further."
prerequisites:
  - essential/rust/pattern_match
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

`match` is how Rust inspects a value by checking it against a sequence of patterns and running the code for the first arm that matches. It builds on [pattern matching](../../pattern_match/) and adds two compiler-enforced guarantees: every possible value must be covered (**exhaustiveness**), and every arm must produce the same type.

## Basic shape

```rust
let n: i32 = 2;

match n {
    1     => println!("one"),
    2     => println!("two"),
    3..=9 => println!("small"),
    _     => println!("something else"),
}
```

Arms are tried top to bottom; the first match wins. The wildcard `_` is a catch-all — it matches anything and discards it.

## `match` as an expression

`match` produces the value of the matched arm:

```rust
let description = match n {
    0     => "zero",
    1..=9 => "single digit",
    _     => "large",
};
```

All arms must produce the same type. Arms that diverge — that return `!` by calling `panic!` or `return` — are exempt from this requirement.

## Exhaustiveness

If any possible value is unhandled, the code will not compile:

```rust
enum Direction { North, South, East, West }

let dir = Direction::East;

let label = match dir {
    Direction::North => "N",
    Direction::South => "S",
    Direction::East  => "E",
    // error: non-exhaustive patterns — `Direction::West` not covered
};
```

This guarantee pays dividends when you add a new variant to an enum: every `match` in the codebase that lacks a catch-all will fail to compile until you decide what to do with the new case. You can never silently miss a variant.

## Matching structured values

Patterns destructure as they match. Struct variants, tuple variants, and nested enums are all handled uniformly:

```rust
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
}

fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle { radius }           => std::f64::consts::PI * radius * radius,
        Shape::Rectangle { width, height } => width * height,
    }
}
```

The field names `radius`, `width`, and `height` are bound by the pattern and available in each arm's expression.

## Multiple patterns and ranges

A single arm can cover multiple patterns with `|`:

```rust
match c {
    'a' | 'e' | 'i' | 'o' | 'u' => println!("vowel"),
    'a'..='z'                    => println!("consonant"),
    _                            => println!("other"),
}
```

Inclusive ranges in patterns are written with `..=`.

## Guards

An arm can narrow its match with an extra condition after the pattern:

```rust
match n {
    x if x < 0 => println!("negative: {x}"),
    0           => println!("zero"),
    x           => println!("positive: {x}"),
}
```

A guard runs only when the pattern already matched. If the guard fails, the arm is skipped and the next arm is tried — the `match` does not end.

## Binding with `@`

`@` binds the matched value to a name while also testing it against a sub-pattern:

```rust
match n {
    small @ 1..=9 => println!("small: {small}"),
    large @ 10..  => println!("large: {large}"),
    _             => println!("zero or negative"),
}
```

Without `@` you would have to choose between binding the value (losing the range information) or using the range (losing the bound name).
