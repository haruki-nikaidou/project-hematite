---
title: Simultaneous (Mutually Recursive) Inductive Types
summary: "When two or more inductive types refer to each other in their definitions, they are *simultaneous* (mutually recursive) inductive types. You'll see classic examples — expression and statement, tree and forest — and how to declare and traverse them in Rust without tripping the recursion rules."
prerequisites:
  - essential/rust/types/iterated_inductive_types
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---

Sometimes two types are so intertwined that neither can be fully defined without mentioning the other. Trying to write one first and the other second leaves you with a forward reference — a type that hasn't been introduced yet. The solution is to define both at the same time.

**Simultaneous** (or **mutually recursive**) inductive types are two or more inductive types that each appear in the other's constructors. Neither type is "inner" or "outer"; they are peers that give each other meaning.

## Rust handles this naturally

In Rust, `enum` and `struct` declarations inside a module are unordered. The compiler sees every definition before it type-checks any of them, so you can write mutually recursive types in any order without forward-declarations or prototypes:

```rust
enum Tree<T>   { Leaf(T), Branch(Forest<T>) }
enum Forest<T> { Empty, Prepend(Box<Tree<T>>, Box<Forest<T>>) }
```

This is different from languages like C, where types must be declared before they are used.

## Example 1 — tree and forest

A *tree* either holds a single value (a `Leaf`) or holds a collection of sub-trees (a `Branch`). A *forest* is that collection: either empty, or a tree prepended to a smaller forest.

```rust
enum Tree<T>   { Leaf(T), Branch(Forest<T>) }
enum Forest<T> { Empty, Prepend(Box<Tree<T>>, Box<Forest<T>>) }
```

Counting leaves uses mutual recursion: `count_tree` delegates the branching case to `count_forest`, and `count_forest` delegates each element back to `count_tree`.

```rust
fn count_tree<T>(tree: &Tree<T>) -> usize {
    match tree {
        Tree::Leaf(_) => 1,
        Tree::Branch(forest) => count_forest(forest),
    }
}

fn count_forest<T>(forest: &Forest<T>) -> usize {
    match forest {
        Forest::Empty => 0,
        Forest::Prepend(tree, rest) => count_tree(tree) + count_forest(rest),
    }
}
```

Each function's base case (`Leaf`, `Empty`) produces a concrete number. Each inductive case delegates to the peer function with a strictly smaller argument, so the pair terminates for the same reason any structurally recursive function does.

## Example 2 — expressions and statements

Language ASTs are a classic use-case. Expressions produce values; statements cause effects. In many languages, `let` bindings blur the line: a `let` expression contains a statement (the assignment) and a body expression. Modelling this directly requires mutual recursion:

```rust
enum Expr {
    Num(f64),
    Var(String),
    Let(String, Box<Stmt>, Box<Expr>),
}

enum Stmt {
    Assign(String, Box<Expr>),
    Seq(Box<Stmt>, Box<Stmt>),
}
```

`Expr::Let` carries a `Stmt` (the binding), and `Stmt::Assign` carries an `Expr` (the right-hand side). Neither type is a subset of the other; they truly co-define each other.

## Mutually recursive functions

Two `fn` items in the same module can call each other without any special syntax — same as the type declarations, they are unordered:

```rust
fn count_tree<T>(tree: &Tree<T>) -> usize { /* … calls count_forest */ }
fn count_forest<T>(forest: &Forest<T>) -> usize { /* … calls count_tree */ }
```

No `forward` keyword, no header file, no prototype. Rust resolves names across the whole module before it compiles any function body.

## The `Box` requirement

The indirection rule from [Iterated Inductive Types](../iterated_inductive_types/) applies here too, but it spans the pair of types. Without `Box`, the size of `Tree<T>` would depend on the size of `Forest<T>`, which would depend on the size of `Tree<T>` — an infinite loop in the size computation.

`Box<T>` breaks the cycle: `Forest::Prepend` holds a *pointer* to a `Tree<T>` (always pointer-sized) and a *pointer* to a `Forest<T>` (also always pointer-sized). The compiler can now compute finite sizes for both types.

The rule of thumb is the same as for single-type recursion: if a field's type is or contains the type being defined (directly or through a mutual reference), that field must be behind an indirection.

## Summary

- Simultaneous inductive types are two or more types whose constructors each reference the other.
- Rust module-level declarations are unordered, so mutually recursive types and their associated functions require no forward declarations.
- The `Box` requirement extends across the mutual reference: any field that closes a cycle between the two types must sit behind a fixed-size indirection.
- Mutual recursion in functions follows naturally: two `fn` items in the same module can call each other freely, and termination is guaranteed by the same structural-recursion argument as for single-type recursion.
