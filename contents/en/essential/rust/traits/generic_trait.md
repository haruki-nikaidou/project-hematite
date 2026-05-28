---
title: Generic Traits and Trait Bounds
summary: "How to parametrise a trait with type parameters (`trait Convert<T>`), and how to constrain a generic function or type with a *trait bound* (`fn print<T: Display>(x: T)`). You'll see why trait bounds make generic code expressive without sacrificing static type checking, and how multiple bounds combine with `+` and `where`."
prerequisites:
  - essential/rust/traits/traits_intro
  - essential/rust/types/generic_inductive_definitions
aliases: []
tags: ["Rust", "Generics"]
updated: 2026-05-27
---

Generics let you write one function or type that works for many concrete types. Trait bounds let you say which operations that type must support. Together they give you reusable, zero-cost abstractions that the compiler still checks statically.

## Generic traits

A trait itself can be generic — parametrised by a type variable in angle brackets:

```rust
trait Convert<T> {
    fn convert(&self) -> T;
}
```

An implementor fills in the concrete type:

```rust
struct Celsius(f64);

impl Convert<f64> for Celsius {
    fn convert(&self) -> f64 {
        self.0
    }
}

impl Convert<String> for Celsius {
    fn convert(&self) -> String {
        format!("{:.1}°C", self.0)
    }
}
```

The same type can implement `Convert<f64>` and `Convert<String>` independently — each combination is its own `impl` block.

## Trait bounds on functions

A **trait bound** tells the compiler which traits a type parameter must implement. The bound goes after the type parameter name, separated by `:`:

```rust
use std::fmt::Display;

fn print_twice<T: Display>(value: T) {
    println!("{value}");
    println!("{value}");
}
```

`T: Display` means "accept any `T`, provided it implements `Display`". Without the bound, `println!("{value}")` would not compile — the compiler has no evidence that `T` supports being formatted.

Calling `print_twice(42)` works because `i32: Display`. Calling `print_twice(vec![1, 2])` fails at the call site because `Vec<i32>` does not implement `Display` — the error appears immediately, not deep in the function body.

## Multiple bounds

Use `+` to require more than one trait:

```rust
use std::fmt::{Debug, Display};

fn show<T: Display + Debug>(value: T) {
    println!("display: {value}");
    println!("debug:   {value:?}");
}
```

There is no limit on how many bounds you can combine.

## The `where` clause

When a signature grows long, move bounds into a `where` clause:

```rust
fn compare_and_display<T, U>(t: T, u: U) -> bool
where
    T: Display + PartialOrd,
    U: Display + Into<T>,
{
    let u_as_t = u.into();
    println!("comparing {t} and {u_as_t}");
    t > u_as_t
}
```

`where` is purely cosmetic — it means exactly the same thing as inline bounds, just written separately. Use it when the inline form becomes hard to read.

## Trait bounds on structs

A struct can carry a bound, requiring that any type stored inside it supports a particular trait:

```rust
use std::fmt::Display;

struct Wrapper<T: Display> {
    value: T,
}

impl<T: Display> Wrapper<T> {
    fn show(&self) {
        println!("{}", self.value);
    }
}
```

The bound is repeated on `impl`. In modern Rust, it is usually cleaner to put bounds only on the methods that need them rather than on the struct definition, but the above pattern is valid and common in older code.

## `impl Trait` shorthand

The `impl Trait` syntax from [Traits](../traits_intro/) is sugar for a single unnamed type parameter with a bound:

```rust
// sugar
fn print(value: impl Display) { println!("{value}"); }

// desugared
fn print<T: Display>(value: T) { println!("{value}"); }
```

They are equivalent for single-argument use. The explicit `<T: ...>` form is required when the same type parameter appears in multiple positions:

```rust
// T must be the same type in both arguments
fn equal<T: PartialEq>(a: T, b: T) -> bool {
    a == b
}
```

Writing `fn equal(a: impl PartialEq, b: impl PartialEq)` would give `a` and `b` independent anonymous type parameters, allowing them to be different types — which is almost never what you want for an equality check.

## Monomorphization and zero cost

Every call to `print_twice::<i32>` generates specialized machine code for `i32`. Every call with `String` generates different code for `String`. This **monomorphization** happens at compile time — there is no runtime dispatch, no vtable, no boxing. Generic functions with trait bounds are exactly as fast as hand-written functions for each concrete type.

## Summary

- A **generic trait** (`trait Convert<T>`) lets one trait describe conversions to many target types.
- A **trait bound** (`T: Display`) constrains a type parameter to types that implement a given trait.
- Multiple bounds combine with `+`; a `where` clause moves them out of the signature for readability.
- `impl Trait` is syntactic sugar for an unnamed type parameter with a single bound; use the explicit `<T: ...>` form when the same type parameter appears more than once.
- Trait bounds are checked statically; monomorphization means there is no runtime cost.
