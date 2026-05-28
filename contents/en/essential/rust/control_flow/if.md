---
title: "`if` Expressions"
summary: "Rust's `if` is an *expression*, not just a statement: every branch produces a value of the same type, and the whole `if`/`else` can be assigned to a binding. You'll see the difference between `if` and `if let`, why omitting `else` is allowed only when the `if` is used as a statement (returning `()`), and the idiomatic 'early return' shape `if cond { return foo; }`."
prerequisites:
  - essential/rust/function
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

Rust's `if` is not just a conditional statement — it is an **expression** that produces a value. This one property changes how you write assignments, function bodies, and conditional logic throughout the language.

## The basic shape

The condition must be a `bool`. Rust never coerces integers, pointers, or other types to boolean, so `if n` where `n` is an integer is a compile error — write `if n != 0` instead.

```rust
if temperature > 100.0 {
    println!("too hot");
} else if temperature < 0.0 {
    println!("too cold");
} else {
    println!("just right");
}
```

## `if` as a value-producing expression

Because `if` is an expression, you can assign its result directly to a binding:

```rust
let label = if n > 0 { "positive" } else { "non-positive" };
```

All branches must produce the same type. Mismatched arms are a compile error:

```rust
let x = if flag { 1 } else { "text" }; // error: expected integer, found `&str`
```

Each branch is a block, and a block's value is its **last expression** (no trailing semicolon). A trailing semicolon turns the expression into a statement and makes the block return `()`, which causes a type error when the declared type is not `()`:

```rust
let x = if flag { 1 } else { 2; }; // error: expected i32, found ()
//                             ^ semicolon discards the 2
```

## Omitting `else`

When `if` is used as a *statement* — its value is thrown away — you may omit the `else` branch. Both the if-branch and the implicit else-absence return `()`, so the types are consistent:

```rust
if verbose {
    println!("debug: starting");
}
```

If you try to use such a form as an expression, the compiler insists on an `else`:

```rust
let x = if flag { 1 }; // error: `if` may be missing an `else` clause
```

## Early returns — the guard clause

[Functions](../../function/) in Rust use `return` only for early exits. A common pattern is the **guard clause**: check a precondition at the top and bail immediately when it fails:

```rust
fn parse_positive(s: &str) -> Option<u32> {
    if s.is_empty() {
        return None;
    }
    let n: u32 = s.parse().ok()?;
    if n == 0 {
        return None;
    }
    Some(n)
}
```

Guard clauses keep the happy path un-nested and easy to scan. Inside loops, the same idiom uses `continue` (skip this iteration) or `break` (exit the loop) instead of `return`.

## `if let`

`if let` pairs a pattern with a conditional: the block runs only when the pattern matches.

```rust
let config: Option<&str> = Some("debug");

if let Some(level) = config {
    println!("log level: {level}");
}
```

This is shorthand for a `match` with one meaningful arm. Add `else` to handle the non-matching case:

```rust
if let Some(level) = config {
    println!("log level: {level}");
} else {
    println!("using default log level");
}
```

`if let` is an expression like regular `if`, so you can assign its result to a binding as long as both branches agree on a type. You will see `if let` used frequently with `Option`, `Result`, and any enum with a payload — any situation where you care about exactly one variant. Patterns in general are covered in [Pattern Matching](../../pattern_match/).
