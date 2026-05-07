---
title: Stack
summary: A LIFO data structure fundamental to recursion, parsing, and undo mechanics.
prerequisites:
  - elementry/computer_science/function
aliases:
  - basis/computer_science/data_structures/stack
tags: [data-structure, computer-science]
updated: 2026-05-01
---

## What is a Stack?

A **stack** is a linear data structure that follows the **Last In, First Out (LIFO)** principle. Think of a stack of plates: you add to the top and remove from the top.

The two primary operations are:

| Operation | Description |
|-----------|-------------|
| `push`    | Add an element to the top |
| `pop`     | Remove and return the top element |

## Implementation in Rust

```rust
struct Stack<T> {
    inner: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { inner: Vec::new() }
    }

    fn push(&mut self, item: T) {
        self.inner.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.inner.pop()
    }

    fn peek(&self) -> Option<&T> {
        self.inner.last()
    }

    fn is_empty(&self) -> bool {
        self.inner.is_empty()
    }
}
```

## The Call Stack

Every programming language maintains a **call stack** to track function calls. When a function is called, a *stack frame* is pushed; when it returns, the frame is popped. This is why deep [recursion](../../recursive) can cause a stack overflow.

## Practical Uses

- **Undo / redo** systems in editors.
- **Expression parsing** (balancing parentheses, evaluating postfix).
- **Depth-first search** (DFS) iterative implementations.
- **Browser history** (back/forward navigation).

## Time Complexity

All core stack operations run in **O(1)** amortised time when backed by a dynamic array (like Rust's `Vec`).
