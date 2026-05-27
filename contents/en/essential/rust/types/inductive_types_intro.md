---
title: Inductive Types
summary: "An *inductive type* is a type defined by a finite list of constructors, where each constructor takes a known list of arguments. Sums and products are the smallest examples; this checkpoint introduces the general pattern, the connection to mathematical induction, and why values of an inductive type can be walked by structural recursion."
prerequisites:
  - essential/rust/types/product_type
  - essential/rust/types/sum_type
  - essential/rust/pattern_match
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---

An **inductive type** is a type defined by a finite list of **constructors**. Each constructor specifies what data it bundles into a value of that type, and every value was produced by exactly one constructor — always detectable at runtime via `match`.

The idea comes from mathematics. The natural numbers are defined inductively: `0` is a natural number (base case), and if `n` is a natural number then `n + 1` is too (inductive step). Every natural number is reached by applying these two rules finitely many times.

Data types follow the same pattern.

## Constructors

A **constructor** is a way to *make* a value of the type. Product types have one constructor — the struct literal — that takes all fields:

```rust
struct Point { x: f64, y: f64 }
// One constructor: Point { x: …, y: … }
```

Sum types have one constructor per variant:

```rust
enum Color { Red, Green, Blue }
// Three constructors; each takes no arguments
```

Variants can carry data, making them richer constructors:

```rust
enum Expr {
    Num(f64),
    Add(Box<Expr>, Box<Expr>),
    Mul(Box<Expr>, Box<Expr>),
}
```

`Num` takes one `f64`. `Add` and `Mul` each take two sub-expressions. Because the definition refers back to itself, the sub-expressions are wrapped in `Box` to give the type a finite size (see [Inductive Types — the recursive case](#the-recursive-case-requires-indirection) below).

## Structural recursion

Because every value of an inductive type was built by a specific constructor, you can analyze it by matching on which constructor was used and recursing on the parts:

```rust
fn eval(expr: &Expr) -> f64 {
    match expr {
        Expr::Num(n)    => *n,
        Expr::Add(l, r) => eval(l) + eval(r),
        Expr::Mul(l, r) => eval(l) * eval(r),
    }
}
```

This pattern — match on the constructor, recurse on sub-values — is called **structural recursion**. It terminates automatically: every recursive call operates on a strictly smaller value (a sub-expression), and the base case (`Num`) has no sub-values to recurse on.

## The recursive case requires indirection

Rust computes every type's size at compile time. A bare recursive definition would be infinite:

```rust
// error: recursive type `Expr` has infinite size
enum Expr {
    Num(f64),
    Add(Expr, Expr), // an Expr containing two Exprs containing two more…
}
```

The fix is to break the infinite regress with a fixed-size indirection. The standard tool is `Box<T>`, which stores the sub-value on the heap and holds a pointer to it. A pointer is always pointer-sized regardless of what it points to:

```rust
enum Expr {
    Num(f64),
    Add(Box<Expr>, Box<Expr>), // ok: Box<Expr> has the size of one pointer
    Mul(Box<Expr>, Box<Expr>),
}
```

The compiler tells you when `Box` is required — the error message says so explicitly.

## The connection to mathematical induction

The reason these types are called *inductive* is that properties about their values can be proved by induction, following exactly the structure of the definition:

- Prove the property for base cases (constructors with no recursive fields).
- Assuming the property holds for all sub-values, prove it holds for the recursive constructors.

This is the same shape as `eval`: the `Num` arm is the base case; the `Add` and `Mul` arms are the inductive steps. Any structurally recursive function is an implicit inductive proof about the type.
