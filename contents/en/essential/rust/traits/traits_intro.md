---
title: Traits
summary: "A *trait* in Rust is a named set of methods that a type can promise to provide. You'll see how to declare a trait, how to implement one for a type with `impl Trait for Type`, the orphan rule that keeps implementations coherent, and why traits are Rust's answer to interfaces, type classes, and abstract base classes from other languages."
prerequisites:
  - essential/rust/types/product_type
  - essential/rust/types/sum_type
  - essential/rust/function
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

A **trait** is a named set of methods that a type can promise to provide. Once a type implements a trait, any code that expects that trait can work with the type — without knowing which concrete type it is.

## Declaring a trait

```rust
trait Greet {
    fn greeting(&self) -> String;
}
```

This declares a contract: any type that implements `Greet` must have a `greeting` method that takes a shared reference to `self` and returns a `String`.

## Implementing a trait

```rust
struct Person {
    name: String,
}

impl Greet for Person {
    fn greeting(&self) -> String {
        format!("Hello, I'm {}!", self.name)
    }
}
```

`impl Trait for Type` connects the trait's contract to a specific type. After this, calling `.greeting()` on a `Person` compiles, and anywhere a `Greet` is required a `Person` can be used.

## Default method implementations

A trait can supply a default body for a method:

```rust
trait Greet {
    fn name(&self) -> &str;

    fn greeting(&self) -> String {
        format!("Hello, I'm {}!", self.name())
    }
}
```

An implementor *must* provide `name` but gets `greeting` for free unless it overrides it. Default methods let traits ship useful behavior without forcing every implementor to repeat it.

## The orphan rule

You can implement a trait for a type if:
- you defined the trait, **or**
- you defined the type.

You cannot implement a foreign trait for a foreign type. For example, you cannot implement `std::fmt::Display` (from the standard library) for `Vec<T>` (also from the standard library) in your own crate. This **orphan rule** ensures there is always at most one implementation of a trait for a type — no conflicting implementations from different crates.

## Using traits in function signatures

Two syntaxes let you accept any type that implements a trait:

```rust
fn print_greeting(g: &impl Greet) {
    println!("{}", g.greeting());
}

fn print_greeting<T: Greet>(g: &T) {
    println!("{}", g.greeting());
}
```

Both mean the same thing: accept a reference to any type that implements `Greet`. The first form (`impl Trait`) is concise; the second (generic with a bound `T: Greet`) is needed when the type parameter appears in multiple positions or in a `where` clause.

## Disambiguating between traits

Multiple traits can define a method with the same name. When both are in scope, Rust needs help to know which one you mean:

```rust
trait A { fn hello(&self); }
trait B { fn hello(&self); }

struct Foo;
impl A for Foo { fn hello(&self) { println!("A"); } }
impl B for Foo { fn hello(&self) { println!("B"); } }

let f = Foo;
A::hello(&f); // calls A's hello
B::hello(&f); // calls B's hello
```

In practice, ambiguity is rare. Rust resolves `.hello()` automatically when only one trait with that method is in scope.

## Traits in context

Traits serve the same role as Java/Go interfaces, Haskell type classes, and C++ abstract base classes — they describe shared behavior without naming a concrete type. Rust's implementation generates separate, specialized code per concrete type (monomorphization), so generic functions with trait bounds carry no runtime overhead compared to hand-written specializations.
