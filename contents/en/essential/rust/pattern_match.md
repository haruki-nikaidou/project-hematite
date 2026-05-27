---
title: Pattern Matching
summary: "Pattern matching is Rust's primary tool for inspecting algebraic data: a *pattern* simultaneously tests a value's shape and binds parts of it to new names. You'll see patterns in `let`, function parameters, `if let`, `while let`, and as the foundation that makes `match` expressive."
prerequisites:
  - essential/rust/types/product_type
  - essential/rust/types/sum_type
  - essential/rust/function
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

A **pattern** does two things at once: it tests whether a value has a certain shape, and it binds names to parts of that value. Patterns appear throughout Rust wherever a value is introduced.

## Patterns in `let`

The simplest pattern is a name — it matches anything and binds it:

```rust
let x = 42;
```

Tuples and structs can be destructured directly:

```rust
let (a, b) = (1, 2);

struct Point { x: f64, y: f64 }
let p = Point { x: 3.0, y: 4.0 };
let Point { x, y } = p;
```

## Patterns in `match`

`match` is where patterns earn their power. Each arm is `pattern => expression`, and `match` is **exhaustive** — every possible value must be handled:

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn process(msg: Message) {
    match msg {
        Message::Quit           => println!("quit"),
        Message::Move { x, y } => println!("move to {x},{y}"),
        Message::Write(text)   => println!("write: {text}"),
    }
}
```

If you add a variant to `Message`, any `match` without a catch-all will refuse to compile until you handle the new variant. Exhaustiveness turns the compiler into a checklist.

`match` is also an **expression** and produces a value:

```rust
let label = match n {
    0       => "zero",
    1..=9   => "single digit",
    _       => "large",
};
```

The wildcard `_` matches anything and discards it.

## Common pattern forms

| Pattern | Matches |
|---------|---------|
| `name` | anything; binds to `name` |
| `_` | anything; discards |
| `42` / `true` / `'a'` | that exact literal |
| `1..=9` | that inclusive range |
| `(a, b)` | a 2-tuple; binds `a` and `b` |
| `Point { x, y }` | a struct; binds fields |
| `Some(v)` | the `Some` variant; binds inner |
| `None` | the `None` variant |
| `Foo::Bar(x, y)` | enum variant with payload |

Patterns can be nested arbitrarily:

```rust
match pair {
    (Some(x), Some(y)) if x == y => println!("equal: {x}"),
    (Some(x), _)                 => println!("left: {x}"),
    (_, Some(y))                 => println!("right: {y}"),
    _                            => println!("neither"),
}
```

## Guards

An arm can narrow its match with an extra condition after the pattern:

```rust
match n {
    x if x < 0 => println!("negative: {x}"),
    0           => println!("zero"),
    x           => println!("positive: {x}"),
}
```

The guard `if x < 0` only runs when the pattern `x` already matched. A failed guard does not end the `match` — it falls through to the next arm.

## `if let` and `while let`

When only one variant matters, `if let` avoids a full `match`:

```rust
if let Some(value) = optional {
    println!("got {value}");
}
```

`while let` loops as long as the pattern keeps matching:

```rust
while let Some(top) = stack.pop() {
    println!("{top}");
}
```

Both are syntactic sugar for a `match` with one meaningful arm and `_ => ()` elsewhere.

## Patterns in function parameters

Parameters are patterns too:

```rust
fn first((x, _): (i32, i32)) -> i32 {
    x
}
```

This is rarely needed, but it demonstrates that patterns appear anywhere a value is bound — not only in `let` and `match`.
