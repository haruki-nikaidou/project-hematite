---
title: Iterated (Recursive) Inductive Types
summary: "An iterated inductive type is one whose constructors may refer back to the type itself — the classic recursive definitions like singly-linked lists and binary trees. You'll see why Rust requires recursive variants to live behind an indirection (`Box<Self>` or similar) and how that mirrors the recursive definition's structure exactly."
prerequisites:
  - essential/rust/types/inductive_types_intro
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---

The real power of inductive types is that constructors can take values of the *same type being defined*. This is the step from simple sums and products to the rich recursive structures — lists, trees, grammars — that appear everywhere in systems programming.

An **iterated** (or **recursive**) inductive type is an inductive type where at least one constructor has a field whose type is the type itself. The definition "iterates" because applying the inductive step repeatedly builds arbitrarily deep values.

## Why indirection is required

As [Inductive Types](../inductive_types_intro/) explains, Rust computes every type's size at compile time. A bare recursive field would demand an infinitely large type:

```rust
// error: recursive type `List` has infinite size
enum List<T> {
    Nil,
    Cons(T, List<T>), // a List containing a List containing…
}
```

The fix is a fixed-size indirection. `Box<T>` stores the sub-value on the heap and holds a pointer in its place. A pointer is always pointer-sized no matter what it points to, so the cycle is broken:

```rust
enum List<T> {
    Nil,
    Cons(T, Box<List<T>>),
}
```

## Singly-linked list

`List<T>` is the canonical example. It has two constructors:

- `Nil` — the empty list (base case, no recursive field)
- `Cons(T, Box<List<T>>)` — an element prepended to a shorter list (inductive step)

Building a list and traversing it look like this:

```rust
enum List<T> {
    Nil,
    Cons(T, Box<List<T>>),
}

fn sum(list: &List<i32>) -> i32 {
    match list {
        List::Nil => 0,
        List::Cons(head, tail) => head + sum(tail),
    }
}

fn main() {
    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Cons(3, Box::new(List::Nil))))));
    println!("{}", sum(&list)); // 6
}
```

The `Nil` arm is the base case. The `Cons` arm unwraps `head` and recurses on `tail`, which is `Box<List<T>>` — Rust auto-derefs through the `Box` in a `match`, so you write `tail` not `*tail`.

## Binary tree

A binary tree adds branching. Each node either holds a value with two sub-trees, or is a leaf with no data:

```rust
enum Tree<T> {
    Leaf,
    Node { val: T, left: Box<Tree<T>>, right: Box<Tree<T>> },
}
```

A depth function uses the same structural recursion pattern:

```rust
fn depth<T>(tree: &Tree<T>) -> usize {
    match tree {
        Tree::Leaf => 0,
        Tree::Node { left, right, .. } => 1 + depth(left).max(depth(right)),
    }
}
```

`Tree::Leaf` is the base case; `Tree::Node` is the inductive step. The function terminates because each recursive call is given a sub-tree, which is strictly smaller than the original.

## Why structural recursion always terminates

Every value of a recursive inductive type was built from smaller values: `Cons(head, tail)` was built using a pre-existing `tail`; `Node { left, right, .. }` was built from pre-existing `left` and `right`. Structural recursion follows this construction backwards: each recursive call receives a sub-value that is one level closer to a base case. There are no infinite values in a finite Rust program, so the chain must reach a base case.

This is the same guarantee as mathematical induction — and the reason these types are called *inductive*.

## Other indirection options

`Box<T>` gives you unique ownership of the sub-value. Two other pointer types are sometimes useful for recursive types:

- `Rc<T>` — reference-counted shared ownership on one thread (covered in a later checkpoint)
- `Arc<T>` — atomically reference-counted shared ownership across threads (covered in a later checkpoint)

Both break the infinite-size cycle in the same way `Box<T>` does. Which one to choose depends on whether you need to share nodes between multiple parents — `Box<T>` is the right default for a plain tree or list.

## Contrast: `Vec<T>` as a flat recursive structure

`Vec<T>` is technically recursive in its implementation (it owns a heap-allocated buffer), but it is *not* a recursive variant in the type-definition sense. A `Vec<i32>` has the same type regardless of how many integers it holds. The recursion is hidden inside the allocator, not encoded in the type's constructors.

Recursive inductive types like `List<T>` encode the length in the type's structure: a three-element list has type shape `Cons(_, Box<Cons(_, Box<Cons(_, Box<Nil>)>)>)`. A `Vec<i32>` is always just `Vec<i32>`. Both are useful; understanding the difference tells you which pattern to reach for.

## Summary

- An iterated inductive type has at least one constructor with a field of the same type.
- Rust requires that recursive field to sit behind a fixed-size indirection (`Box<T>` is the standard choice) because every type must have a known, finite size at compile time.
- Structural recursion on recursive inductive types terminates because each recursive call operates on a strictly smaller sub-value and base cases carry no recursive fields.
- `Rc<T>` and `Arc<T>` are alternatives to `Box<T>` when you need shared ownership of sub-values.
