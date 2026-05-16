---
title: Linked List
summary: "A linked list connects nodes through pointers rather than storing elements in contiguous memory, giving O(1) insertion and deletion at any known position in exchange for O(n) indexed access."
prerequisites: 
  - basis/cs_with_zig/pointer
  - basis/data_structure/array
aliases: []
tags:
  - Data Structures
updated: 2026-05-16
---

[Arrays](/en/cp/basis/data_structure/array/) earn their $O(1)$ indexed access by packing elements contiguously — but that same layout makes insertion and deletion expensive: every element after the gap must shift one position, costing $O(n)$ time. A **linked list** sidesteps this entirely by connecting independent nodes through pointers, so inserting between two nodes is just a pointer update.

## The structure of a linked list

A linked list is a chain of **nodes**. Each node holds a value and a pointer to the next node. A single pointer to the first node — the **head** — is the only handle you need to access the whole chain. The last node's `next` pointer is `null`, marking the end.

[Pointer](/en/cp/basis/cs_with_zig/pointer/) introduced exactly this shape: a struct that references itself through an optional pointer. The `Node` type from that checkpoint is the building block:

```zig
const Node = struct {
    value: i32,
    next:  ?*Node,
};
```

Here is what a three-node list looks like in memory:

```text
head
 │
 ▼
┌────────────┐    ┌────────────┐    ┌────────────┐
│ value = 10 │    │ value = 20 │    │ value = 30 │
│ next  ─────┼───►│ next  ─────┼───►│ next = null│
└────────────┘    └────────────┘    └────────────┘
   0x1a4c            0x2f10            0x3b88
```

The three addresses are nothing like those of an array: the nodes are scattered wherever the allocator found free space. That scattering is the defining characteristic of a linked list, and it is both its strength and its weakness.

## Nodes on the heap

[Pointer](/en/cp/basis/cs_with_zig/pointer/) placed nodes on the stack to keep the example simple. In practice, a linked list must live on the **heap**: you rarely know at compile time how many nodes you will need, and new nodes must outlive the function that creates them.

`allocator.create(T)` allocates space for a single value of type `T` on the heap and returns `!*T`. This is the per-node equivalent of `allocator.alloc(T, n)` that you used for heap arrays.

Here is a complete program that builds a list by repeatedly prepending to the head, traverses it, and frees all nodes:

```zig
const std = @import("std");

const Node = struct {
    value: i32,
    next:  ?*Node,
};

fn prepend(allocator: std.mem.Allocator, head: ?*Node, value: i32) !*Node {
    const node = try allocator.create(Node);
    node.* = .{ .value = value, .next = head };
    return node;
}

fn freeList(allocator: std.mem.Allocator, head: ?*Node) void {
    var current = head;
    while (current) |node| {
        const next = node.next;  // save before freeing — reading freed memory is undefined behavior
        allocator.destroy(node);
        current = next;
    }
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var head: ?*Node = null;
    head = try prepend(allocator, head, 30);
    head = try prepend(allocator, head, 20);
    head = try prepend(allocator, head, 10);
    defer freeList(allocator, head);

    var current: ?*Node = head;
    while (current) |node| {
        std.debug.print("{}\n", .{node.value}); // 10, then 20, then 30
        current = node.next;
    }
}
```

`prepend` creates one node, sets its `next` to the current head, and returns the new node as the new head. It touches only two pointers regardless of how long the list already is — $O(1)$.

`freeList` walks the chain and destroys each node. It must save `node.next` before calling `destroy`, because the memory at `node` is no longer valid after it is freed.

## Inserting and removing at a known position

The advantage linked lists have over arrays becomes concrete when you already hold a pointer to a node in the middle of the list.

**Insert after a node:**

```zig
fn insertAfter(allocator: std.mem.Allocator, prev: *Node, value: i32) !void {
    const new_node = try allocator.create(Node);
    new_node.* = .{ .value = value, .next = prev.next };
    prev.next = new_node;
}
```

Only two pointer fields change — `new_node.next` and `prev.next` — regardless of list length. This is $O(1)$.

Compare that to inserting at position $i$ in an array: every element from index $i$ onward must shift one slot to the right — $O(n)$ writes.

**Remove the node after a given node:**

```zig
fn removeAfter(allocator: std.mem.Allocator, prev: *Node) void {
    const target = prev.next orelse return;
    prev.next = target.next;
    allocator.destroy(target);
}
```

Again, just a pointer update — $O(1)$.

**Remove the head:**

```zig
fn popFront(allocator: std.mem.Allocator, head: *?*Node) void {
    const old_head = head.* orelse return;
    head.* = old_head.next;
    allocator.destroy(old_head);
}
```

`head` here is a pointer to the head pointer (`*?*Node`) so the function can update the caller's head variable. All three operations are $O(1)$ once you hold the right pointer.

## What linked lists trade away

The $O(1)$ insertions and deletions come with real costs.

**No $O(1)$ indexed access.** There is no base-address formula like the one arrays use. To reach the node at position $i$, you must walk from the head, following `next` pointers one at a time — $O(n)$. If your workload is dominated by reads at known indices, an array wins.

**Pointer overhead.** Every node stores at least one pointer alongside the value. On a 64-bit machine that is 8 extra bytes per node. A list of a million `i32` values (4 bytes each) carries at least 8 MB of pointer overhead on top of the 4 MB of data.

**Poor cache behavior.** Modern CPUs load memory in cache lines — blocks of 64 bytes at a time. Array elements are packed together, so fetching one element often brings several neighbors into the cache at no extra cost. Linked list nodes are scattered, so each `node.next` dereference is likely to be a cache miss that stalls the CPU for dozens of nanoseconds. In practice, traversing a linked list is often several times slower than the same traversal over an array, even though both are $O(n)$.

## Operations at a glance

| Operation | Linked list | Array |
|-----------|-------------|-------|
| Read or write at index $i$ | $O(n)$ | $O(1)$ |
| Insert or delete at head | $O(1)$ | $O(n)$ |
| Insert or delete after a known node | $O(1)$ | $O(n)$ |
| Search for a value | $O(n)$ | $O(n)$ |
| Append at tail (no tail pointer kept) | $O(n)$ | $O(1)$ amortized |
| Memory per element | value + pointer | value only |

Linked lists are the right choice when you frequently insert or delete at positions you already hold a pointer to, and you rarely need to jump to an arbitrary index.

## Doubly linked lists

The nodes above each point only forward. You can add a backward pointer:

```zig
const DNode = struct {
    value: i32,
    next:  ?*DNode,
    prev:  ?*DNode,
};
```

A **doubly linked list** pays 8 extra bytes per node but gains two things: traversal in either direction, and $O(1)$ removal given only the node itself — without needing to track down the node before it. This is why Rust's `std::collections::LinkedList` and most standard-library deque implementations use doubly linked nodes.

## Summary

- A **linked list** is a chain of nodes connected by `next` pointers; the last node's `next` is `null`.
- The **head** pointer is the only entry point. Traversal is $O(n)$; there is no $O(1)$ indexed access.
- Nodes live on the heap. Use `allocator.create(Node)` to allocate one and `allocator.destroy(node)` to free it; always save `node.next` before freeing.
- **Insertion and deletion at a known position are $O(1)$** — just two pointer updates, regardless of list length.
- The cost: pointer overhead per node, and scattered memory leads to frequent cache misses during traversal.
- A **doubly linked list** adds a `prev` pointer, enabling $O(1)$ removal given only the node and backward traversal.
