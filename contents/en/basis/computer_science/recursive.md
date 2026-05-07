---
title: Recursion
summary: A technique where a function calls itself to solve smaller sub-problems.
prerequisites:
  - elementry/computer_science/function
  - basis/computer_science/data_structure/stack
aliases: []
tags: [computer-science, programming, algorithms]
updated: 2026-05-02
---

## What is Recursion?

**Recursion** is when a function calls itself as part of its own definition. Every recursive solution consists of two parts:

1. **Base case** — the simplest input where the answer is known directly.
2. **Recursive case** — reduce the problem to a smaller version and recurse.

```rust
fn factorial(n: u64) -> u64 {
    if n == 0 {
        1 // base case
    } else {
        n * factorial(n - 1) // recursive case
    }
}
```

## How It Relates to the Call Stack

Each recursive call pushes a new frame onto the [call stack](data_structure/stack). When the base case is reached, frames are popped in reverse order. This is why:

- Recursion depth is bounded by available stack memory.
- Deeply recursive functions may panic with a stack overflow.

## Tail Recursion

A function is **tail-recursive** when the recursive call is the *last* action in the function. Compilers can optimise tail calls into loops (tail call elimination), avoiding stack growth.

Rust does **not** guarantee tail call optimisation, so large recursions should be converted to iteration explicitly.

```rust
fn factorial_tail(n: u64, acc: u64) -> u64 {
    if n == 0 {
        acc
    } else {
        factorial_tail(n - 1, n * acc) // tail position
    }
}
```

## Classic Examples

### Fibonacci

```rust
fn fib(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fib(n - 1) + fib(n - 2),
    }
}
```

> Note: The naïve version above is exponential. Use memoisation or dynamic programming for efficiency.

### Binary Search (recursive)

```rust
fn binary_search(arr: &[i32], target: i32, lo: usize, hi: usize) -> Option<usize> {
    if lo > hi { return None; }
    let mid = lo + (hi - lo) / 2;
    match arr[mid].cmp(&target) {
        std::cmp::Ordering::Equal   => Some(mid),
        std::cmp::Ordering::Less    => binary_search(arr, target, mid + 1, hi),
        std::cmp::Ordering::Greater => binary_search(arr, target, lo, mid - 1),
    }
}
```

## When to Use Recursion

Use recursion when the problem is naturally hierarchical (trees, graphs, grammars). For flat, iterative problems, prefer loops — they avoid stack overhead and are often more readable in Rust.
