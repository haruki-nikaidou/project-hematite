---
title: Allocate Heap Memory
summary: "The stack cannot hold data that is too large or whose size is unknown at compile time. This checkpoint explains how to allocate and free heap memory in Zig using its allocator interface, why getting that pairing wrong causes serious bugs, and how Rust's ownership system eliminates those bugs at compile time."
prerequisites: 
  - basis/cs_with_zig/memory_layout
  - basis/cs_with_zig/integer
  - basis/cs_with_zig/simple_variable
aliases: []
tags: []
updated: 2026-05-13
---

[Memory Layout](/en/cp/basis/cs_with_zig/memory_layout/) introduced two constraints the stack cannot escape: it is small (typically a few megabytes), and its size must be fully determined at compile time. When either constraint is a problem, you reach for the **heap** — a large pool of memory your program borrows from and returns to at runtime, in whatever amounts it needs.

This checkpoint covers the mechanics: how to make that request in Zig, how to give the memory back, and what can go wrong when the pairing breaks down.

## When the stack is not enough

### Data too large for the stack

Stack overflow is a real failure mode. If you declare a local array with millions of elements, the stack runs out of space before the program can do anything useful:

```zig
pub fn main() void {
    var huge: [10_000_000]u8 = undefined;  // likely crashes at runtime: stack overflow
    _ = huge;
}
```

Large buffers — images, audio data, big matrices — must live on the heap.

### Arrays whose length is unknown at compile time

This is the more common case. Consider an array of integers whose length the user provides while the program is running:

```zig
const n = readUserInput();
var buffer: [n]u8 = undefined;  // ❌ compile error: array length must be comptime-known
```

The compiler rejects this because it cannot determine the size of `buffer` when it compiles the function — that size depends on what the user types, which only exists at runtime. Every array that must grow or shrink based on input, file contents, or network data has this problem.

The heap lifts the restriction: you ask for exactly as many bytes as you need at the moment you need them, and the operating system provides them.

## The allocator interface

Zig does not have a hidden global allocator. Every heap allocation goes through an **allocator** — a value that implements the `std.mem.Allocator` interface. You create one and pass it explicitly to any code that allocates memory. Nothing happens behind your back.

`std.heap.GeneralPurposeAllocator` is a safe general-purpose allocator well suited for development: in debug builds it detects leaks and catches invalid frees.

```zig
const std = @import("std");

pub fn main() !void {
    // Set up the allocator
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();           // prints a leak report if any memory was not freed
    const allocator = gpa.allocator();

    // Ask for an array of 5 i32 values on the heap
    const numbers = try allocator.alloc(i32, 5);
    defer allocator.free(numbers);    // return the memory when this scope exits

    for (numbers, 0..) |*n, i| {
        n.* = @intCast(i * 10);
    }
    for (numbers) |n| {
        std.debug.print("{} ", .{n});
    }
    // prints: 0 10 20 30 40
}
```

The two core operations are:

| Operation | Call | What it does |
|-----------|------|--------------|
| **Allocate** | `allocator.alloc(T, n)` | Reserves `n × @sizeOf(T)` bytes; returns `![]T` |
| **Free** | `allocator.free(slice)` | Returns those bytes to the allocator |

`alloc` returns an **error union** `![]T` because the system could be out of memory. Using `try` propagates that error to the caller — the correct response. The value you get back is a **slice** `[]T`: a view into contiguous memory with a built-in `.len` field, usable exactly like an ordinary fixed-size array.

Pairing `alloc` with a `defer free` on the very next line is the standard Zig idiom that prevents most accidental leaks. The `defer` keyword runs its statement when the surrounding scope exits, regardless of how it exits — normal return, early return, or error.

## The danger of manual management

Every `alloc` must be matched with exactly one `free`. Breaking that rule in either direction produces bugs that are hard to track down and dangerous in production.

### Memory leak

You allocate memory and never free it. The operating system cannot reclaim those bytes until the process exits:

```zig
fn process(allocator: std.mem.Allocator) !void {
    const buf = try allocator.alloc(u8, 1024);
    if (someCondition()) {
        return error.Cancelled;  // ❌ returns without freeing buf
    }
    allocator.free(buf);
}
```

In a long-running server this slowly exhausts all available RAM. The `GeneralPurposeAllocator` will report the leak when you call `gpa.deinit()` in debug mode — another reason to keep that `defer`.

### Use-after-free

You free memory and then access it. The allocator may have already given those bytes to a different allocation, so you are now reading or writing unpredictable data:

```zig
const buf = try allocator.alloc(u8, 4);
allocator.free(buf);
buf[0] = 99;   // ❌ undefined behaviour — bytes already returned to the allocator
```

Use-after-free is one of the most exploited classes of security vulnerabilities. Attackers can craft inputs that cause your program to free memory at a chosen time and then read or write it as if it still belonged to them.

### Double free

You call `free` on the same slice twice. This corrupts the allocator's internal bookkeeping, usually causing a crash — or silently producing exploitable behaviour:

```zig
allocator.free(buf);
// ... later, perhaps in a different code path ...
allocator.free(buf);   // ❌ already freed
```

All three bugs share the same root: the compiler has no visibility into whether you correctly paired every `alloc` with exactly one `free` at the right time.

## This is why Rust exists

Zig puts the full responsibility for correct pairing on you. That is a deliberate design choice — Zig aims to be a transparent, low-level language where you control everything. But as programs grow, the number of allocations grows with them, and maintaining the invariant by hand becomes progressively harder.

**Rust** addresses this with its **ownership** and **borrow checker** system. The compiler tracks, at compile time, which part of the code *owns* each piece of heap memory. When the owner's scope ends, the memory is freed automatically — no `free` call needed, no garbage-collector pauses. More importantly, the borrow checker turns use-after-free, double-free, and most memory leaks into **compile-time errors** rather than runtime disasters.

You have now seen both sides of the coin: the raw power of direct heap allocation, and the cost of managing every pairing by hand. Rust's ownership model exists precisely to keep the power while eliminating the cost.

## Summary

- The **stack** cannot hold data that is too large (stack overflow) or whose size is unknown at compile time (the compiler needs a fixed array length).
- **Heap memory** solves both: request exactly as many bytes as you need now with `allocator.alloc(T, n)`, and return them with `allocator.free(slice)`.
- In Zig, all allocation is explicit — you create and pass an allocator, and every allocation is visible in the code.
- `alloc` returns `![]T` (an error union); always use `try` so an out-of-memory failure propagates rather than being silently ignored.
- Pair every `alloc` with a `defer free` on the next line to prevent accidental leaks.
- **Memory leak** — forgetting to `free`; **use-after-free** — accessing memory after `free`; **double free** — calling `free` twice on the same allocation.
- **Rust's ownership system** eliminates all three by verifying the pairing rules at compile time and freeing memory automatically when the owner goes out of scope.
