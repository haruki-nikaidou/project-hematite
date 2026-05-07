---
title: Functions
summary: The building block of abstraction — named, reusable pieces of computation.
prerequisites: []
aliases: []
tags: [computer-science, programming]
updated: 2026-05-01
---

## What is a Function?

A **function** is a named, self-contained block of code that performs a specific task. You can call it by name, optionally passing inputs (parameters) and receiving an output (return value).

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let result = add(3, 4); // 7
}
```

## Why Functions Matter

Functions are the primary abstraction mechanism in most programming languages. They let you:

- **Avoid repetition**: write once, call many times.
- **Name ideas**: give meaningful names to computations.
- **Compose**: build complex behaviour from simple parts.

## Parameters and Return Values

A function's *signature* declares what it accepts and what it returns. In Rust, every expression has a type, and the last expression in a function body is its return value (no semicolon needed).

```rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```

## First-Class Functions

Rust functions are first-class values: you can store them in variables, pass them to other functions, or return them from functions.

```rust
fn apply(f: fn(i32) -> i32, x: i32) -> i32 {
    f(x)
}

fn double(x: i32) -> i32 { x * 2 }

fn main() {
    println!("{}", apply(double, 5)); // 10
}
```

## Summary

Functions are fundamental to all programming. Every other checkpoint in Project Hematite builds on this concept.
