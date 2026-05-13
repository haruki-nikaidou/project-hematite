---
title: Stack
summary: "A stack is a last-in, first-out (LIFO) data structure essential to how programs manage function calls, expression evaluation, and backtracking algorithms."
prerequisites:
  - basis/data_structure/array
aliases: []
tags:
  - Data Structures
  - LIFO
updated: 2026-05-13
---

When your program calls a function, or when you undo the last action in a text editor, or when a browser navigates back to the previous page — all of these rely on the same simple idea: the **stack**.

## What a stack is

A **stack** is a collection of elements that follows the **Last-In, First-Out** (LIFO) principle: the most recently added item is always the first one removed. Think of a stack of plates. You place new plates on top, and you always pick up from the top. You never slide a plate out from the middle.

Every stack exposes exactly two core operations:

- **push** — add an element to the top of the stack.
- **pop** — remove and return the element at the top.

A third helper operation is common but not strictly required:

- **peek** (or *top*) — read the top element without removing it.

## How a stack works, step by step

Suppose you start with an empty stack and run:

```
push(1)   →  [1]
push(2)   →  [1, 2]
push(3)   →  [1, 2, 3]
pop()     →  returns 3, stack is [1, 2]
pop()     →  returns 2, stack is [1]
```

The last element pushed (`3`) is the first one popped. This is the LIFO property in action.

## Implementing a stack with an array

Because arrays give you $O(1)$ indexed access, they are the most common backing store for a stack. You track one extra value — the **top index** — that points to the current top element.

- **push**: increment the top index, then write the new element there.
- **pop**: read the element at the top index, then decrement it.
- **peek**: read the element at the top index without changing it.

All three operations run in $O(1)$ time.

Here is a simple stack in Rust backed by a `Vec` (which is itself a growable array):

```rust
pub struct Stack<T> {
    data: Vec<T>,
}

impl<T> Stack<T> {
    /// Creates an empty stack.
    pub fn new() -> Self {
        Stack { data: Vec::new() }
    }

    /// Pushes `value` onto the top of the stack.
    pub fn push(&mut self, value: T) {
        self.data.push(value);
    }

    /// Removes and returns the top element, or `None` if the stack is empty.
    pub fn pop(&mut self) -> Option<T> {
        self.data.pop()
    }

    /// Returns a reference to the top element without removing it.
    pub fn peek(&self) -> Option<&T> {
        self.data.last()
    }

    /// Returns `true` if the stack contains no elements.
    pub fn is_empty(&self) -> bool {
        self.data.is_empty()
    }
}
```

`Vec::push` and `Vec::pop` both operate on the end of the vector, so this implementation is $O(1)$ for every operation (amortized for `push`, because the underlying array occasionally needs to grow).

## Why the LIFO order matters

The LIFO property is not just a curiosity — it shows up naturally whenever you need to *reverse* a sequence of decisions or *remember where you came from*:

- **Function call management.** Every time your program calls a function, the return address and local variables are pushed onto the *call stack*. When the function returns, they are popped off. This is explored in depth in [Calling Stack](/en/cp/basis/cs_with_zig/calling_stack/).
- **Undo/redo systems.** Every edit is pushed. Pressing Ctrl+Z pops the last edit and reverses it.
- **Balanced parentheses checking.** Push each opening bracket; when you see a closing bracket, pop and verify they match.
- **Depth-first search (DFS).** An explicit stack can replace recursion when traversing trees or graphs.

## Overflow and underflow

Two error conditions you should always guard against:

- **Stack overflow** — pushing onto a full stack (relevant for fixed-size arrays; `Vec`-backed stacks grow automatically, but unbounded growth can exhaust memory).
- **Stack underflow** — calling `pop` or `peek` on an empty stack. In the Rust implementation above, both return `Option<T>`, which forces you to handle the empty case explicitly rather than panicking.

## Summary

- A stack stores elements in **LIFO** order: the last element pushed is the first one popped.
- The three core operations are **push**, **pop**, and **peek**, all $O(1)$ with an array-backed implementation.
- Rust's `Vec` is a natural backing store: `push` and `pop` on the end give you stack semantics directly.
- Stacks appear throughout computing wherever you need to track a history of operations or defer work to be processed in reverse order.
