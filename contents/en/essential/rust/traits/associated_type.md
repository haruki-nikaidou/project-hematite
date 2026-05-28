---
title: Associated Types
summary: "An *associated type* is a type member declared inside a trait that each implementor picks once. You'll see why `Iterator` uses `type Item;` instead of a type parameter, when an associated type is the right tool versus a generic parameter, and how this avoids the combinatorial explosion of having to write `Iterator<i32>`, `Iterator<String>`, and so on at every call site."
prerequisites:
  - essential/rust/traits/generic_trait
aliases: []
tags: ["Rust", "Generics"]
updated: 2026-05-27
---

A trait can carry a **type member** alongside its method members. The implementor picks that type once, and every method in the trait can refer to it by name — no angle brackets required at every call site.

## Declaring an associated type

Inside a trait body, write `type Name;` to declare an associated type:

```rust
trait Container {
    type Item;

    fn first(&self) -> Option<&Self::Item>;
    fn len(&self) -> usize;
}
```

`Self::Item` refers to the associated type belonging to whichever type implements the trait. The implementor is responsible for substituting a concrete type for `Item`.

## Implementing a trait with an associated type

```rust
struct Stack<T> {
    data: Vec<T>,
}

impl<T> Container for Stack<T> {
    type Item = T;

    fn first(&self) -> Option<&T> {
        self.data.first()
    }

    fn len(&self) -> usize {
        self.data.len()
    }
}
```

`type Item = T;` fixes the associated type for this `impl`. Every method in this block can then use `T` (or `Self::Item`) directly, without repeating it in angle brackets.

## The `Iterator` trait

The standard library's `Iterator` is the canonical example:

```rust
trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
    // ...
}
```

`next` returns the associated type wrapped in `Option`. A range iterator over integers has `type Item = i32`; a string-split iterator has `type Item = &str`. These are different concrete types, but the same trait describes both.

## Associated types versus generic parameters

Compare two ways of expressing "convert `self` to some other type":

```rust
// generic parameter — the caller can ask for many output types
trait Convert<T> {
    fn convert(&self) -> T;
}

// associated type — the implementor commits to one output type
trait IntoOwned {
    type Output;
    fn into_owned(self) -> Self::Output;
}
```

With `Convert<T>`, a single type can implement `Convert<f64>`, `Convert<String>`, and `Convert<i32>` at the same time. That is exactly what you want for a flexible conversion trait.

With `IntoOwned`, each type has exactly one `Output`. That is what you want for `Iterator::Item` — a vector iterator produces `i32`s, not `i32`s sometimes and `String`s other times. Locking the output to one type per implementor is a feature, not a limitation.

The rule of thumb:

- Use a **type parameter** when the same type might usefully implement the trait for several different choices of that type — multiple implementations are the goal.
- Use an **associated type** when each implementor has one natural choice — a single implementation per type is the goal.

## Call-site ergonomics

With a generic parameter, every function that works with iterators would need to name `I` and the item type separately:

```rust
// hypothetical Iterator<T>
fn sum_all<T, I: Iterator<T>>(iter: I) -> T { ... }
```

With an associated type, the item type is implied:

```rust
fn sum_all<I: Iterator>(iter: I) -> I::Item { ... }
```

`I::Item` reads "the item type of `I`". There is no separate type parameter to introduce. Code that uses `Iterator` everywhere benefits from this every time it writes a bound.

## Constraining an associated type

You can place a bound on an associated type inside a `where` clause:

```rust
use std::fmt::Display;

fn print_first<I>(iter: I)
where
    I: Iterator,
    I::Item: Display,
{
    if let Some(item) = iter.into_iter().next() {
        println!("{item}");
    }
}
```

`I::Item: Display` says "the item type of `I` must implement `Display`". The function works for any iterator whose items can be printed — no matter what the concrete item type is.

You can also fix the associated type to a concrete value in a bound:

```rust
fn sum_ints<I: Iterator<Item = i32>>(iter: I) -> i32 {
    iter.sum()
}
```

`Iterator<Item = i32>` constrains `I` to iterators that produce `i32`s specifically. This is the standard syntax for "pinning" an associated type when you need a concrete guarantee rather than just a bound on it.

## Summary

- An **associated type** is declared with `type Name;` inside a trait and assigned with `type Name = T;` inside an `impl`.
- Each implementor commits to one concrete type, unlike a generic parameter where the same type can implement the trait for many choices.
- `Self::Item` (or `I::Item` from outside) refers to the associated type; no extra angle brackets needed at call sites.
- Use a generic parameter when multiple implementations per type are useful; use an associated type when each type has exactly one natural choice.
- Constrain associated types with `I::Item: Bound` or pin them with `Iterator<Item = i32>`.
