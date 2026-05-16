---
title: Array
summary: "An array stores elements of the same type in a contiguous block of memory, giving you O(1) access to any element by index. You will learn how that indexing works at the hardware level, how to use fixed-size arrays and flexible slices in Zig, and when to move array storage to the heap."
prerequisites: 
  - basis/cs_with_zig/memory_layout
  - basis/cs_with_zig/integer
aliases: []
tags:
  - Data Structures
updated: 2026-05-16
---

If you have written any code at all, you have used an array. It is the most fundamental data structure in computing — so simple that hardware was designed around it. Before exploring more sophisticated structures, it is worth understanding exactly why arrays work the way they do.

## What an array is

An **array** is a fixed-size, ordered collection of elements of the same type, stored in **contiguous memory** — one element placed directly after another, with no gaps between them.

Two properties define every array:

- **Element type** — all elements must have the same type, so every element occupies the same number of bytes.
- **Length** — the number of elements, fixed for the array's lifetime (for the basic form; growable variants are covered below).

The phrase "contiguous memory" is the key. Because elements are packed together without gaps, the array earns a property that no non-contiguous structure can match: **O(1) indexed access** — reaching any element takes the same constant time, whether it is the first or the millionth.

## Why indexing is O(1)

[Memory Layout](/en/cp/basis/cs_with_zig/memory_layout/) established that RAM is a long sequence of bytes, each identified by a unique numeric **address**. When an array is created, the runtime reserves a block of consecutive addresses for it.

Because all elements have the same type, they all occupy the same number of bytes. Call that size $s$. If the first element lives at address $b$ (the **base address**), then element $i$ lives at:

$$
\text{address}(i) = b + i \times s
$$

This is constant-time arithmetic. The CPU computes it in a single instruction, regardless of the array's total length. No searching, no following chains of pointers — just one multiply and one add.

Here is a concrete example with a five-element `i32` array (each `i32` occupies 4 bytes):

```text
index:    0         1         2         3         4
         ┌─────────┬─────────┬─────────┬─────────┬─────────┐
value:   │   10    │   20    │   30    │   40    │   50    │
         └─────────┴─────────┴─────────┴─────────┴─────────┘
address: 1000      1004      1008      1012      1016
```

Accessing element at index 3: $1000 + 3 \times 4 = 1012$. Done.

## Fixed-size arrays in Zig

Zig's syntax for a fixed-size array type is `[N]T`, where `N` is the compile-time length and `T` is the element type.

```zig
const std = @import("std");

pub fn main() void {
    const nums: [5]i32 = .{ 10, 20, 30, 40, 50 };

    std.debug.print("element 0: {}\n", .{nums[0]}); // 10
    std.debug.print("element 3: {}\n", .{nums[3]}); // 40
    std.debug.print("length:    {}\n", .{nums.len}); // 5
    std.debug.print("size:      {} bytes\n", .{@sizeOf([5]i32)}); // 20
}
```

`nums.len` is a compile-time constant equal to `N`. `@sizeOf([5]i32)` is 20 — five elements at 4 bytes each, packed with no gaps, exactly as the address formula predicts.

### Writing to an array

To modify elements, the array must be declared with `var`:

```zig
var scores: [3]u32 = .{ 0, 0, 0 };
scores[0] = 95;
scores[1] = 87;
scores[2] = 76;
```

### Bounds checking

Zig checks every index access against the array's length in Debug and ReleaseSafe builds. Accessing `nums[5]` on a five-element array — where valid indices are 0 through 4 — causes a **runtime panic** rather than silently reading garbage memory:

```zig
const nums: [5]i32 = .{ 10, 20, 30, 40, 50 };
_ = nums[5]; // runtime panic: index out of bounds
```

This is the same safety model you saw with integer overflow: Debug builds catch mistakes loudly so you find them during development.

## Iterating over an array

Zig's `for` loop can walk an array by element, by index, or both at once:

```zig
const std = @import("std");

pub fn main() void {
    const words: [3][]const u8 = .{ "alpha", "beta", "gamma" };

    // by element
    for (words) |w| {
        std.debug.print("{}\n", .{w});
    }

    // by index and element together
    for (words, 0..) |w, i| {
        std.debug.print("[{}] {}\n", .{ i, w });
    }
}
```

## Slices: a runtime-flexible view

A fixed-size array has its length baked into its type — `[5]i32` and `[10]i32` are different types that cannot be used interchangeably. This becomes inconvenient when a function needs to work on arrays of any length, or when the length is only known at runtime.

A **slice** (`[]T`) solves this. It is a lightweight pair:

- a **pointer** to the first element
- a **length** stored as `usize`

The length is a runtime value, not a type-level constant, so one slice type covers any array of that element type regardless of size.

```zig
const std = @import("std");

fn sum(s: []const i32) i32 {
    var total: i32 = 0;
    for (s) |v| total += v;
    return total;
}

pub fn main() void {
    const a: [3]i32 = .{ 1, 2, 3 };
    const b: [5]i32 = .{ 10, 20, 30, 40, 50 };

    std.debug.print("{}\n", .{sum(&a)}); // 6
    std.debug.print("{}\n", .{sum(&b)}); // 150
}
```

`&a` coerces the `[3]i32` array into a `[]const i32` slice. The function `sum` never sees the concrete array type — only the pointer and the length. The `[]const` in `[]const i32` means the slice cannot be used to modify the underlying elements; use `[]i32` for a mutable slice.

You can also create a slice that covers only part of an array using the `start..end` range syntax:

```zig
const arr: [6]i32 = .{ 0, 1, 2, 3, 4, 5 };
const mid = arr[2..5]; // slice covering indices 2, 3, 4 → values 2, 3, 4
```

Slice bounds are also checked at runtime in safe builds.

## Heap-allocated arrays

Fixed-size arrays on the stack have the constraints you already know from [Memory Layout](/en/cp/basis/cs_with_zig/memory_layout/): the length must be known at compile time, and a very large array will overflow the stack.

When the length comes from user input, a file, or a network response — or when the array is too large for the stack — allocate it on the heap. `allocator.alloc(T, n)` reserves `n` elements and returns `![]T`, a slice that owns that heap memory:

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 8; // could come from user input at runtime
    const buf = try allocator.alloc(i32, n);
    defer allocator.free(buf);

    for (buf, 0..) |*elem, i| {
        elem.* = @intCast(i * i); // fill with squares: 0, 1, 4, 9, …
    }

    for (buf) |v| {
        std.debug.print("{} ", .{v});
    }
    // 0 1 4 9 16 25 36 49
}
```

The returned slice `buf` behaves identically to any other `[]i32` — indexed access, bounds checks, and iteration all work the same way. The only difference is that you must call `allocator.free(buf)` when you are done; pairing it with `defer` on the very next line is the standard idiom.

## Time complexity of common operations

| Operation | Time | Why |
|-----------|------|-----|
| Read / write element at index $i$ | $O(1)$ | Address arithmetic: $b + i \times s$ |
| Search for a value (unsorted) | $O(n)$ | Must check every element in the worst case |
| Insert at the end (in-bounds) | $O(1)$ | One write to the next slot |
| Insert at position $i$ (shift right) | $O(n)$ | Up to $n - i$ elements must move one slot |
| Delete at position $i$ (shift left) | $O(n)$ | Up to $n - i$ elements must move one slot |

The $O(1)$ read and write are arrays' defining strength. The $O(n)$ insertion and deletion in the middle are their main weakness. When your workload involves many insertions or deletions at arbitrary positions, a different structure — such as a [linked list](/en/cp/basis/data_structure/linked_list/) — may be more appropriate.

## Summary

- An **array** stores elements of the same type in **contiguous memory** — no gaps between elements.
- Any element can be reached in **O(1)** time using the formula $\text{address}(i) = b + i \times s$, where $b$ is the base address and $s$ is the element size in bytes.
- In Zig, `[N]T` is a fixed-size array type; both `N` and the element type `T` are compile-time constants. Access elements with `arr[i]` and iterate with `for`.
- Out-of-bounds accesses **panic** at runtime in Debug and ReleaseSafe builds.
- A **slice** (`[]T`) is a pointer plus a runtime length, letting one type cover arrays of any size. Coerce an array to a slice with `&arr`; extract a sub-range with `arr[start..end]`.
- When the array length is unknown at compile time or the data is too large for the stack, allocate on the heap with `allocator.alloc(T, n)` and free with `allocator.free(slice)`.
- Reading and writing are O(1); inserting or deleting in the middle is O(n) because elements must shift.
