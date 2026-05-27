---
title: Functions in Rust
summary: "How to declare a function in Rust with `fn name(arg: T, …) -> Ret { … }`: parameter type annotations are mandatory, the return type defaults to `()`, the final expression of the body is the return value, and `return` is reserved for early exits. You'll see how Rust's `fn` differs from Zig's function syntax and how block-expression semantics let you write `let x = if cond { a } else { b };` without ceremony."
prerequisites:
  - essential/rust/variable
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

Functions are Rust's basic unit of reusable code. The syntax will feel familiar if you've written Zig, with a few key differences around annotations and return values.

## Declaring a function

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}
```

The keyword is `fn`. Parameter types are always required — Rust does not infer them. The return type follows `->`. If the function returns nothing, omit the `->` clause entirely, and Rust implicitly uses the unit type `()`.

## The implicit return

A function body is a block expression. The **last expression** in the block is the return value — no `return` keyword needed in the normal case:

```rust
fn double(n: i32) -> i32 {
    n * 2  // no semicolon → this expression is the return value
}
```

Adding a semicolon turns an expression into a **statement**, discarding the value. The block then returns `()`, which causes a type error if the function's declared return type is not `()`:

```rust
fn double_wrong(n: i32) -> i32 {
    n * 2;  // semicolon: value discarded, block returns ()
    // compile error: expected i32, found ()
}
```

This expression-vs-statement distinction is one of the first things to internalize in Rust. The rule: no semicolon at the end of a block → that expression is the return value.

## Early returns

`return` is available for early exits:

```rust
fn first_even(nums: &[i32]) -> Option<i32> {
    for &n in nums {
        if n % 2 == 0 {
            return Some(n);
        }
    }
    None // last expression, returned implicitly
}
```

Idiomatic Rust uses `return` only for early exits, not for the final value.

## Parameters and ownership

Each parameter receives its argument under Rust's ownership rules. A parameter declared as `T` takes ownership of the value; `&T` borrows it (read-only); `&mut T` borrows it mutably.

```rust
fn length(s: &str) -> usize {
    s.len()
}

fn main() {
    let greeting = String::from("hello");
    let n = length(&greeting); // greeting still valid after the call
    println!("{greeting} has {n} characters");
}
```

The function signature is a complete contract: it tells the caller exactly what is moved or borrowed.

## Block expressions everywhere

Because `if`, `match`, and plain blocks are all expressions, they compose naturally as function bodies:

```rust
fn sign(n: i32) -> &'static str {
    if n > 0 { "positive" } else if n < 0 { "negative" } else { "zero" }
}
```

No ternary operator is needed — the `if` itself produces the value.

This also means you can compute a complex value inline without an intermediate variable:

```rust
fn clamp(x: f64, lo: f64, hi: f64) -> f64 {
    if x < lo { lo } else if x > hi { hi } else { x }
}
```

## Diverging functions

A function that never returns — because it always panics, loops forever, or calls `std::process::exit` — has the return type `!` (the *never* type):

```rust
fn fatal(msg: &str) -> ! {
    panic!("{msg}");
}
```

The compiler understands that `!` can be used in any branch of a `match` or `if`, since that branch never produces a value at all.
