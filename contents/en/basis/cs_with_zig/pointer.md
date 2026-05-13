---
title: Pointer
summary: "A pointer stores a memory address rather than a value directly. You will learn how to create and dereference pointers in Zig, why every pointer is the same size regardless of what it points to, and why recursive data structures cannot exist without them."
prerequisites: 
  - basis/cs_with_zig/memory_layout
  - basis/cs_with_zig/integer
  - basis/data_structure/array
  - basis/cs_with_zig/simple_variable
aliases: []
tags: []
updated: 2026-05-13
---

[Simple Variable](/en/cp/basis/cs_with_zig/simple_variable/) briefly introduced the pointer type: `*T` is a pointer to a value of type `T`, `&x` gives you a pointer to `x`, and `p.*` reads back the value it points to. This checkpoint unpacks what that actually means inside memory, and reveals the one situation where pointers are not merely convenient — they are the only possible solution.

## A pointer is a memory address

[Memory Layout](/en/cp/basis/cs_with_zig/memory_layout/) established that RAM is a long sequence of bytes, each with a unique numeric **address**. A **pointer** is simply a variable that stores one of those addresses. Instead of holding data directly, it says "go look over there."

```zig
var   x: i32  = 42;
const p: *i32 = &x;    // p holds the address of x, e.g. 0x7ffe_dc8a_1234

std.debug.print("address: {}\n", .{p});    // prints the address as a number
std.debug.print("value:   {}\n", .{p.*});  // dereferences p → prints 42
```

Writing `p.*` tells the CPU: "go to the address stored in `p` and read an `i32` from there." A mutable pointer lets you write through it as well:

```zig
var y: i32 = 10;
const q: *i32 = &y;
q.* = 99;                         // writes 99 to the address stored in q
std.debug.print("{}\n", .{y});    // prints 99
```

Use `*const T` when you want to read through a pointer but never modify the target — it is the read-only counterpart of `*T`.

### Every pointer is the same size

Here is a fact that surprises many newcomers: **every pointer, regardless of what it points to, occupies exactly 8 bytes on a 64-bit machine**.

```zig
std.debug.print("{}\n", .{@sizeOf(*u8)});        // 8
std.debug.print("{}\n", .{@sizeOf(*i32)});       // 8
std.debug.print("{}\n", .{@sizeOf(*f64)});       // 8
std.debug.print("{}\n", .{@sizeOf(*[100]i32)});  // still 8
```

The type tells the compiler how to interpret the bytes at the target address; it has no effect on how large the pointer itself is. A pointer is, at heart, a 64-bit integer holding an address — always 8 bytes. This fact turns out to be essential in the next section.

## Why a recursive struct must use a pointer

Suppose you want to model a chain of integer nodes where each node can optionally link to the next. A natural first attempt is to embed the next node directly inside the struct:

```zig
const Node = struct {
    value: i32,
    next:  Node,   // ❌ compile error: struct 'Node' depends on itself
};
```

The compiler must know how many bytes a `Node` occupies before it can allocate memory for one. But a `Node` contains another `Node`, which contains another `Node`, without end — the size would be infinite. Zig refuses to compile this, as does every other compiled language.

The solution follows directly from the fact you just learned: a pointer is always 8 bytes, no matter what it points to. Store a **pointer to the next node** instead of the node itself:

```zig
const Node = struct {
    value: i32,
    next:  ?*Node,   // pointer to the next Node, or null
};
```

The `?` in `?*Node` makes the pointer **optional**: it can hold either a valid address or `null`. Now the compiler can compute the size in one step:

- `i32` → 4 bytes
- `?*Node` → 8 bytes (Zig represents `null` as the zero address, so no extra byte is needed)
- Total: 12 bytes (plus any alignment padding)

`null` is how you mark the last node in the chain — it has no next, so its `next` field is `null`.

Here is a complete working example with three nodes on the stack:

```zig
const std = @import("std");

const Node = struct {
    value: i32,
    next:  ?*Node,
};

pub fn main() void {
    var third  = Node{ .value = 30, .next = null };
    var second = Node{ .value = 20, .next = &third };
    var first  = Node{ .value = 10, .next = &second };

    var current: ?*Node = &first;
    while (current) |node| {
        std.debug.print("{}\n", .{node.value});
        current = node.next;
    }
    // prints: 10   20   30
}
```

The `while (current) |node|` syntax unwraps the optional: if `current` is non-null, `node` is bound to the `*Node` pointer inside it, and the loop body runs. When `current` becomes `null`, the loop stops.

A struct that references itself through a pointer is called a **recursive data structure**. The `Node` chain above is exactly the pattern behind a linked list. Trees and graphs are built on the same idea — every self-referential edge becomes a pointer.

## Stack allocation and its limits

The nodes in the example above are local variables, so they live on the **stack**. That is fine when you know at compile time that there are exactly three nodes.

But suppose the number of nodes is determined by user input. The stack frame for a function is sized at compile time — there is no way to reserve space for a number of items that is only known when the program is actually running. The same problem appears with any [array](/en/cp/basis/data_structure/array/) whose length comes from user input or a file: the compiler demands a size it does not have.

When the stack is not an option, you request memory from the **heap** at runtime. Heap allocation hands you back a pointer (or in Zig's idiomatic style, a **slice** — a pointer bundled with its length) to the newly reserved block. The [Allocate Heap Memory](/en/cp/basis/cs_with_zig/malloc/) checkpoint covers exactly how to make that request and return the memory when you are done.

## Summary

- A **pointer** (`*T`) stores the memory address of a value of type `T`.
- Create a pointer with `&variable`; read or write the pointed-at value with `pointer.*`.
- Use `*const T` for a read-only pointer and `*T` for a mutable one.
- Every pointer is **8 bytes** on a 64-bit machine, regardless of what it points to.
- A struct that embeds itself directly has **infinite size** and will not compile; store a pointer (`*Self`) instead.
- **Optional pointers** (`?*T`) can be `null`, which cleanly signals "there is nothing here."
- Structs that reference themselves through a pointer are called **recursive data structures** — linked lists, trees, and graphs are all built this way.
- Heap allocation, covered in [Allocate Heap Memory](/en/cp/basis/cs_with_zig/malloc/), always gives you a pointer or slice to the allocated memory.
