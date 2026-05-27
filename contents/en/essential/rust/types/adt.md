---
title: Algebraic Data Types
summary: "What an algebraic data type (ADT) is, why combining values (`AND`) and choosing between alternatives (`OR`) are the two building blocks every data model is made of, and why Rust's `struct` and `enum` together cover everything you can express with ADTs."
prerequisites:
  - essential/rust/types/general_type_intro
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---

Every type you define in Rust is built from two operations: **combining** and **choosing**. Applied repeatedly, these two operations are enough to describe any data structure.

This idea has a name: **algebraic data types**, or ADTs.

## Two operations

The first operation is **product**: you combine several values into one. A point in 2D space is an x-coordinate *and* a y-coordinate. A user record is a name *and* an age *and* an email address. If you have the product, you always have all of its parts. Rust spells this as `struct`.

The second operation is **sum**: you choose one from a fixed set of alternatives. A traffic light is red *or* yellow *or* green. A parse result is a valid value *or* an error. If you have the sum, you always have exactly one variant. Rust spells this as `enum`.

Every user-defined type in Rust is some composition of these two operations.

## Why "algebraic"?

The terminology comes from counting values.

A **product type** $A \times B$ has exactly $|A| \cdot |B|$ possible values — one for each combination of an $A$ value and a $B$ value. If `bool` has 2 values and `u8` has 256, then a struct holding both has $2 \times 256 = 512$ possible values.

A **sum type** $A + B$ has exactly $|A| + |B|$ possible values — one for each value of $A$ plus one for each value of $B$. An enum with two unit variants has $1 + 1 = 2$ possible values — exactly like `bool`.

This counting view matters when you design data models. If a type has more possible states than your domain needs, code will have to guard against impossible states at runtime. Designing types with the right number of states lets the compiler eliminate those guards.

## Why ADTs matter in Rust

The payoff of ADTs in Rust is **exhaustiveness**. When you `match` on an enum, Rust requires you to handle every variant. You cannot forget a case at compile time.

If you add a new variant to an enum, every `match` that does not have a catch-all will fail to compile — serving as a built-in checklist. ADTs turn domain modeling into a form of correctness enforcement.

## Products and sums compose

The real power comes from combining the two operations. A `Result<T, E>` is a sum type: `Ok(T)` *or* `Err(E)`. The `T` inside might itself be a product type — a struct holding several fields.

```rust
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Triangle { base: f64, height: f64 },
}
```

Any data model describable in English with "and" and "or" maps directly onto an ADT.

## Rust's coverage

Rust's `struct` covers product types; `enum` covers sum types. Together they cover the full expressible space of ADTs. There is no need for inheritance hierarchies, discriminated-union workarounds, or nullable fields to represent optionality — all of that is handled by `struct` and `enum` with no hacks required.

The next two checkpoints, [Product Types](../product_type/) and [Sum Types](../sum_type/), cover the syntax and idioms for each.
