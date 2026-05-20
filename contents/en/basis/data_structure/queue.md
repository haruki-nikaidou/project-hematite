---
title: Queue
summary: "A queue is a first-in, first-out (FIFO) data structure: elements are added at the back and removed from the front. This checkpoint contrasts queues with stacks, walks through array- and linked-list-backed implementations, and surveys the algorithms — like BFS and scheduling — that rely on FIFO order."
prerequisites:
  - basis/data_structure/array
  - basis/data_structure/linked_list
aliases: []
tags:
  - Data Structures
  - FIFO
updated: 2026-05-20
---

Every time you send a print job, open a website, or trigger a background task, your request joins a **queue** — waiting in line behind whatever arrived before it. Queues are one of the simplest and most ubiquitous data structures in computing, and understanding them unlocks algorithms from breadth-first search to operating-system scheduling.

## What a queue is

A **queue** is a collection of elements that follows the **First-In, First-Out** (FIFO) principle: the element that has been waiting the longest is always the next one processed. Think of a checkout line at a shop. New customers join at the back; the customer at the front is served next. No one cuts in.

This is the direct counterpart to the [stack](../stack/), which follows Last-In, First-Out (LIFO). The difference is which end you remove from: a stack removes from the same end you insert into; a queue removes from the *opposite* end.

Every queue exposes two core operations:

- **enqueue** (or *push_back*) — add an element to the back of the queue.
- **dequeue** (or *pop_front*) — remove and return the element at the front.

A common helper:

- **peek** (or *front*) — read the front element without removing it.

## How a queue works, step by step

Starting with an empty queue:

```
enqueue(1)  →  [1]
enqueue(2)  →  [1, 2]
enqueue(3)  →  [1, 2, 3]
dequeue()   →  returns 1, queue is [2, 3]
dequeue()   →  returns 2, queue is [3]
enqueue(4)  →  [3, 4]
dequeue()   →  returns 3, queue is [4]
```

The first element in (`1`) is always the first element out. Contrast this with a stack: if you had pushed and popped in the same sequence, `pop()` would have returned `3`, then `2`, then `1`.

## Implementing a queue with an array

The obvious approach — use a `Vec` and remove from index 0 — works but costs $O(n)$ per dequeue, because every remaining element must shift one position toward the front.

The standard fix is a **circular buffer**: treat the underlying array as a ring, and keep two indices, `head` and `tail`, that wrap around when they reach the array's end. Both enqueue and dequeue then move only one index — $O(1)$.

Rust's standard library provides exactly this as `VecDeque<T>` (a double-ended queue backed by a circular buffer). You rarely need to implement the ring logic yourself:

```rust
use std::collections::VecDeque;

let mut queue: VecDeque<i32> = VecDeque::new();

queue.push_back(1);
queue.push_back(2);
queue.push_back(3);

assert_eq!(queue.pop_front(), Some(1));
assert_eq!(queue.pop_front(), Some(2));
assert_eq!(queue.front(),     Some(&3)); // peek
```

`push_back` and `pop_front` are both $O(1)$ amortized. When the buffer is full, `VecDeque` allocates a larger one and copies elements over — the same amortized growth strategy that `Vec` uses.

## Implementing a queue with a linked list

A [linked list](../linked_list/) is a natural fit for a queue. You keep two pointers — **head** (front) and **tail** (back) — so that:

- **enqueue** appends a new node after the tail and advances the tail pointer — $O(1)$.
- **dequeue** reads the head node, advances the head pointer to the next node, and drops the old head — $O(1)$.

No shifting, no circular arithmetic. Here is a minimal implementation in Rust using `Box<T>` for heap-allocated nodes:

```rust
struct Node<T> {
    value: T,
    next: Option<Box<Node<T>>>,
}

pub struct LinkedQueue<T> {
    head: Option<Box<Node<T>>>,
    tail: *mut Node<T>,
    len: usize,
}

impl<T> LinkedQueue<T> {
    pub fn new() -> Self {
        LinkedQueue { head: None, tail: std::ptr::null_mut(), len: 0 }
    }

    pub fn enqueue(&mut self, value: T) {
        let mut node = Box::new(Node { value, next: None });
        let raw: *mut Node<T> = &mut *node;
        if self.tail.is_null() {
            self.head = Some(node);
        } else {
            unsafe { (*self.tail).next = Some(node); }
        }
        self.tail = raw;
        self.len += 1;
    }

    pub fn dequeue(&mut self) -> Option<T> {
        self.head.take().map(|node| {
            self.head = node.next;
            if self.head.is_none() {
                self.tail = std::ptr::null_mut();
            }
            self.len -= 1;
            node.value
        })
    }

    pub fn peek(&self) -> Option<&T> {
        self.head.as_deref().map(|n| &n.value)
    }

    pub fn is_empty(&self) -> bool {
        self.len == 0
    }
}
```

The raw `tail` pointer avoids the double-`Option` gymnastics that fully safe linked-list code in Rust requires. In production, you would reach for `VecDeque` or a crate like `crossbeam-queue` instead of managing raw pointers yourself.

## Comparing the two implementations

| Property | `VecDeque` (circular array) | Linked-list queue |
|---|---|---|
| Enqueue | $O(1)$ amortized | $O(1)$ |
| Dequeue | $O(1)$ amortized | $O(1)$ |
| Memory per element | value only (dense array) | value + two pointers |
| Cache behavior | Excellent — contiguous ring | Poor — nodes scattered in memory |
| Allocation per element | No (reuses buffer) | Yes — one heap allocation per node |

In practice, `VecDeque` is faster for most workloads because of cache locality. A linked-list queue shines when elements are large (pointer overhead becomes negligible) or when you need $O(1)$ worst-case guarantees rather than amortized.

## Where queues appear in algorithms

**Breadth-first search (BFS).** When exploring a graph layer by layer — shortest path in an unweighted graph, level-order tree traversal — you process each node and enqueue its unvisited neighbors. FIFO order guarantees you finish all nodes at depth $d$ before visiting any at depth $d+1$.

```
enqueue(start)
while queue is not empty:
    node = dequeue()
    for each neighbor of node:
        if not visited:
            mark visited
            enqueue(neighbor)
```

**Task scheduling.** Operating-system process schedulers, web-server request handlers, and print spoolers all maintain a queue of pending work. Requests are processed in arrival order, ensuring fairness.

**Buffering between producers and consumers.** When a fast producer generates data faster than a slow consumer can process it — such as reading packets off a network and parsing them — a queue acts as an elastic buffer that absorbs bursts without dropping data.

## Summary

- A queue stores elements in **FIFO** order: the first element enqueued is the first one dequeued.
- The two core operations are **enqueue** (add to back) and **dequeue** (remove from front), both $O(1)$ with a circular-buffer or linked-list implementation.
- In Rust, prefer **`VecDeque<T>`** for most use cases: it gives $O(1)$ amortized operations with excellent cache performance.
- A **linked-list queue** with head and tail pointers achieves $O(1)$ without amortization, at the cost of one heap allocation per element and poorer cache behavior.
- Queues are essential to **BFS**, **task scheduling**, and **producer–consumer buffering** — any situation where work must be processed in arrival order.
