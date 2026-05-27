---
title: "`Box<T>`"
summary: "`Box<T>` is the simplest owning pointer: it holds a `T` on the heap and frees that heap memory when the `Box` itself is dropped. You'll see how `Box::new` allocates, why `Box<T>` makes recursive types (`enum List { Cons(i32, Box<List>) }`) representable, and how it is the foundational example of RAII-style memory management in Rust."
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/memory/traits/drop
aliases: []
tags: ["Rust", "Standard Library", "Memory"]
updated: 2026-05-27
---

`Box<T>` is the simplest owning heap pointer in Rust. It allocates a single value of type `T` on the heap and frees that allocation automatically when the `Box` goes out of scope.

## Allocating with `Box::new`

```rust
let b = Box::new(42_i32);
println!("{}", *b); // dereference to read: prints 42
```

`Box::new(value)` moves `value` onto the heap and returns an owning `Box<T>`. The `Box` itself is small — one pointer — and lives wherever you declare it: the stack, a struct field, another `Box`.

To read through a `Box`, dereference with `*`. In most contexts Rust dereferences automatically via the `Deref` trait, so you can use a `Box<String>` anywhere a `String` is expected without writing `*`.

## Ownership and `Drop`

`Box<T>` implements [`Drop`](../../memory/traits/drop/). When a `Box` goes out of scope, two things happen in order:

1. The contained `T` is dropped (its own cleanup runs first).
2. The heap allocation is freed.

```rust
{
    let b = Box::new(String::from("hello"));
    println!("{b}");
} // String is dropped, then the heap allocation is freed
```

The `Box` owns its contents. Moving the `Box` moves ownership of the heap allocation. Dropping the `Box` frees it — no manual `free` call needed.

## Making recursive types representable

The main case that *requires* `Box` is recursive inductive types. A bare recursive enum has infinite size:

```rust
// error: recursive type `List` has infinite size
enum List {
    Nil,
    Cons(i32, List),
}
```

`Box<T>` has a known, fixed size — one pointer. Wrapping the recursive field in a `Box` gives the compiler a concrete size:

```rust
enum List {
    Nil,
    Cons(i32, Box<List>),
}

let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
```

The list can be as long as memory allows; each `Box` in the chain always occupies exactly one pointer's worth of space.

## `Box<dyn Trait>` — runtime polymorphism

`Box` can hold a **trait object**: a value whose concrete type is erased at compile time but which is guaranteed to implement a trait:

```rust
trait Animal {
    fn sound(&self) -> &str;
}

struct Dog;
impl Animal for Dog {
    fn sound(&self) -> &str { "woof" }
}

let a: Box<dyn Animal> = Box::new(Dog);
println!("{}", a.sound()); // "woof"
```

`Box<dyn Trait>` stores the concrete value on the heap alongside a pointer to its method table. This is how Rust achieves runtime polymorphism when the concrete type cannot be known statically. The full mechanics of trait objects are covered later; the key point here is that `Box` is the natural container for heap-allocated, type-erased values.

## Summary

- `Box::new(x)` moves `x` to the heap and returns an owning pointer.
- When the `Box` is dropped, the heap allocation is freed automatically.
- `Box<T>` is the required solution for recursive inductive types.
- `Box<dyn Trait>` enables runtime polymorphism.
