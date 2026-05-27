---
title: Generic Inductive Definitions
summary: "How to parametrise an inductive type by another type — `enum Option<T>`, `enum List<T>`, `struct Pair<A, B>`. You'll see the `<T>` type-parameter syntax, why a generic definition compiles once but produces a distinct concrete type per instantiation, and how this is the same idea as a polymorphic function applied to types."
prerequisites:
  - essential/rust/types/inductive_types_intro
aliases: []
tags: ["Rust", "ADT", "Generics"]
updated: 2026-05-27
---

Instead of writing a separate `IntList`, `StringList`, and `FloatList`, you write one `List<T>` that works for any element type. A **type parameter** is a placeholder that is filled in when the type is used.

## The syntax

A type parameter is a name in angle brackets after the type name:

```rust
enum Option<T> {
    None,
    Some(T),
}
```

`T` is the placeholder. `Option<i32>`, `Option<String>`, and `Option<bool>` are three different concrete types produced from one definition.

A struct with two parameters:

```rust
struct Pair<A, B> {
    first: A,
    second: B,
}

let p: Pair<i32, &str> = Pair { first: 42, second: "hello" };
```

## A generic recursive list

The canonical example that shows why generics and inductive types fit together is a singly-linked list:

```rust
enum List<T> {
    Nil,
    Cons(T, Box<List<T>>),
}
```

`Nil` is the empty list. `Cons(x, rest)` prepends `x` to `rest`. The recursive field `Box<List<T>>` requires `Box` for the same reason as any recursive inductive type: to give the compiler a finite, known size.

Building a list of integers and a list of strings reuses the same definition:

```rust
let ints: List<i32> = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
let strs: List<&str> = List::Cons("a", Box::new(List::Nil));
```

## One definition, many concrete types

When the compiler sees `List<i32>` and `List<&str>`, it generates separate machine code for each — a process called **monomorphization**. The generic definition is a template; each distinct instantiation produces a concrete, specialized type.

This means generic types in Rust have **no runtime cost from the type parameter**: the generated code for `List<i32>` is exactly what you would write if `List` had been defined specifically for `i32`.

## `impl` blocks for generic types

To add methods to a generic type, the type parameter appears twice: once after `impl` (introducing it) and once after the type name (using it):

```rust
impl<T> List<T> {
    fn is_empty(&self) -> bool {
        matches!(self, List::Nil)
    }
}
```

The `<T>` after `impl` says "for any type `T`"; the `<T>` after `List` says "this `impl` applies to `List<T>`". Both are required.

## The connection to polymorphism

A generic type definition is the type-level analog of a generic function. Just as `fn identity<T>(x: T) -> T` works for any `T`, `List<T>` works for any element type. Both express "parametrised over a type" — functions at the term level, type definitions at the type level. The same monomorphization mechanism applies to both.
