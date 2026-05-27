---
title: Sum Types — Enums
summary: "Rust's sum types: `enum` declares a fixed list of *variants*, and a value of the enum is exactly one of them. You'll see C-style enums, enums whose variants carry payloads, why this models 'one of several possibilities' precisely, and why the value count is the *sum* of the variants' value counts."
prerequisites:
  - essential/rust/types/adt
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---

A **sum type** lets a value be exactly one of a fixed set of alternatives. In Rust, sum types are expressed as `enum`.

## Basic enums

The simplest enum is a list of named variants with no attached data:

```rust
enum Direction {
    North,
    South,
    East,
    West,
}

let heading = Direction::North;
```

This resembles enums in C or Zig: a named constant whose set of values is fixed and exhaustively known.

## Enums with payloads

What distinguishes Rust enums from C-style enums is that each variant can carry data:

```rust
enum Shape {
    Circle(f64),                         // radius
    Rectangle(f64, f64),                 // width, height
    Triangle { base: f64, height: f64 }, // named fields
}
```

Each variant independently decides what data it carries — or none at all. Creating values:

```rust
let c = Shape::Circle(5.0);
let r = Shape::Rectangle(3.0, 4.0);
```

## Matching on enums

The only way to access the data inside an enum variant is `match`. It is **exhaustive**: you must handle every variant:

```rust
fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle(r) => std::f64::consts::PI * r * r,
        Shape::Rectangle(w, h) => w * h,
        Shape::Triangle { base, height } => 0.5 * base * height,
    }
}
```

If you add a new variant to `Shape`, every `match` without a catch-all will fail to compile — the compiler becomes a checklist. This exhaustiveness is the core reason to model domains with enums.

## Why "sum"?

The value count of a sum type is the *sum* of its variants' value counts. An enum with three unit variants has $1 + 1 + 1 = 3$ possible values. An `Option<bool>` has $1 + 2 = 3$ possible values: `None`, `Some(true)`, or `Some(false)`. This additive relationship gives the type family its name.

## `Option` and `Result`

Two enums from the standard library appear throughout every Rust codebase:

```rust
enum Option<T> {
    None,
    Some(T),
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

`Option<T>` represents a value that may or may not be present — Rust's replacement for null. `Result<T, E>` represents a computation that may succeed with a `T` or fail with an `E`. Both force you to handle both cases explicitly.

```rust
fn parse_age(s: &str) -> Result<u8, String> {
    s.parse::<u8>().map_err(|e| e.to_string())
}

match parse_age("42") {
    Ok(age)  => println!("age: {age}"),
    Err(msg) => println!("error: {msg}"),
}
```

## Making invalid states unrepresentable

Because an enum can only be in one state at a time, enums naturally model state machines. Consider a network connection:

```rust
enum Connection {
    Connecting,
    Connected { peer_addr: std::net::SocketAddr },
    Disconnected { reason: String },
}
```

Storing the relevant data inside each variant means you cannot access the peer address unless you have first confirmed the connection is established — the type system prevents the invalid access. If the logic requires a `peer_addr`, the `match` arm that provides it is the only place that access compiles.

This pattern — **making invalid states unrepresentable** — is one of the most powerful uses of sum types in Rust.
