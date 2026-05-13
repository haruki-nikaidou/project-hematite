---
title: Memory Layout
summary: ""
prerequisites: 
  - elementry/computer_science/how_programs_work
  - basis/cs_with_zig/prepare_environment
  - basis/cs_with_zig/function_intro
  - basis/data_structure/stack
aliases: []
tags: ["Memory", "Systems"]
updated: 2026-05-13
---

> This article is to be edited soon

Every program you run gets handed a chunk of RAM by the operating system. That chunk doesn't sit there as an undifferentiated blob — your program divides it into distinct regions, each with different rules about what lives there and how long it survives. Understanding these regions is the mental model that makes Rust's ownership system feel logical rather than arbitrary, and it applies equally to C, C++, Go, and virtually every other systems programming language.

## Memory is a long row of numbered bytes

[How Programs Work](/en/cp/elementry/computer_science/how_programs_work/) established that a program is a list of instructions the CPU follows. When the OS launches a program, it loads those instructions into RAM and tells the CPU where to start executing.

From the CPU's perspective, RAM is a long, flat sequence of **bytes**. Each byte is a tiny box that can hold exactly one value between 0 and 255. What makes RAM useful is that every byte has a unique number called an **address**. The CPU can say "give me the byte at address 4,200" and get it back in nanoseconds.

Picture it as a very long row of numbered mailboxes:

```text
address:  0     1     2     3     4     5     6     7    ...
        ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
value:  │  72 │  65 │ 108 │ 108 │ 111 │   0 │ ... │ ... │ ...
        └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

A modern 64-bit program sees an address space far larger than any real machine's RAM — the OS handles the gap through a mechanism called *virtual memory* — but the important abstraction holds: from your program's perspective, memory is a giant array of bytes, each uniquely numbered.

## The four regions of program memory

When a program starts, the OS sets up its memory in four regions, each with a distinct role:

```text
high addresses
┌──────────────────┐
│      Stack       │  ← grows downward with each function call
│        ↓         │
│                  │
│        ↑         │
│       Heap       │  ← grows upward as you request more memory
├──────────────────┤
│       Data       │  global and static variables
├──────────────────┤
│       Code       │  your compiled program instructions
└──────────────────┘
low addresses
```

### The code region

The **code region** (also called the *text segment*) holds the compiled machine instructions of your program — the actual binary the CPU reads and executes. It's loaded once at startup and stays constant while the program runs.

### The data region

The **data region** holds **global variables** — values that are declared outside any function and exist for the entire lifetime of the program. Most programs keep this region small; the interesting action happens in the stack and heap.

### The stack and heap

The **stack** and the **heap** are the two regions you'll think about most as a programmer. They handle memory with completely opposite strategies: the stack is automatic but constrained, the heap is flexible but requires manual management. Let's look at each in depth.

## The stack: memory that follows function calls

Imagine a stack of plates at a cafeteria. Plates are added to the top and removed from the top — you never pull one from the middle. The last plate placed is the first one removed. Computer scientists call this **LIFO** (**Last In, First Out**).

A program's call stack works exactly the same way, but instead of plates it handles **stack frames**. A **stack frame** is a block of memory the CPU reserves for one function call. It holds all the local variables declared inside that function, along with some bookkeeping the CPU needs to resume the caller once the function returns.

Here is what happens when one function calls another:

1. The caller's frame is already on the stack.
2. The callee **pushes** a new frame onto the top — its local variables are allocated there.
3. The callee executes, reading and writing its local variables within its own frame.
4. When the callee **returns**, its frame is **popped** off instantly. That memory is immediately available for the next function call.

This means local variables are strictly temporary. They come into existence when their function is called and vanish the instant it returns. The hardware manages this entirely — you never write code to clean them up.

### Seeing it in Zig

Here is a small Zig program that shows the stack at work:

```zig
const std = @import("std");

fn multiply(a: i32, b: i32) i32 {
    const product = a * b; // 'product' lives in multiply's stack frame
    return product;        // frame is released when multiply() returns
}

pub fn main() void {
    const x: i32 = 6;
    const y: i32 = 7;
    const result = multiply(x, y); // result lives in main's stack frame
    std.debug.print("{}\n", .{result});
}
```

While `multiply` is executing, the call stack looks roughly like this:

```text
  top of stack (most recently pushed)
  ┌──────────────────────────┐
  │  multiply's frame         │
  │    a:       i32 = 6      │
  │    b:       i32 = 7      │
  │    product: i32 = 42     │
  ├──────────────────────────┤
  │  main's frame             │
  │    x:      i32 = 6       │
  │    y:      i32 = 7       │
  │    result: i32 = ?       │  ← not yet filled in
  └──────────────────────────┘
  bottom of stack
```

The instant `multiply` returns, its entire frame disappears. `main` receives the returned `42`, stores it in `result`, and continues — now with only its own frame on the stack.

### How many bytes does a type occupy?

Every variable on the stack occupies a fixed number of bytes determined by its type. Zig lets you inspect this at compile time with `@sizeOf`:

```zig
const std = @import("std");

pub fn main() void {
    std.debug.print("bool: {} byte(s)\n", .{@sizeOf(bool)});
    std.debug.print("u8:   {} byte(s)\n", .{@sizeOf(u8)});
    std.debug.print("u32:  {} byte(s)\n", .{@sizeOf(u32)});
    std.debug.print("u64:  {} byte(s)\n", .{@sizeOf(u64)});
    std.debug.print("f32:  {} byte(s)\n", .{@sizeOf(f32)});
    std.debug.print("f64:  {} byte(s)\n", .{@sizeOf(f64)});
}
```

Run it and you'll see:

```text
bool: 1 byte(s)
u8:   1 byte(s)
u32:  4 byte(s)
u64:  8 byte(s)
f32:  4 byte(s)
f64:  8 byte(s)
```

These numbers reflect the types' bit widths: a `u32` is a 32-bit (4-byte) unsigned integer, a `u64` is 64 bits (8 bytes), and so on. The CPU is built to work efficiently with these exact sizes.

`@sizeOf` works on structs too. A struct's size is the sum of its fields' sizes — plus any **padding** the compiler inserts, as you'll see shortly:

```zig
const std = @import("std");

const Point = struct {
    x: f32,
    y: f32,
};

pub fn main() void {
    // Two f32 fields, each 4 bytes → 8 bytes total
    std.debug.print("Point: {} bytes\n", .{@sizeOf(Point)});
}
```

### Stack limitations

The stack is extremely fast, but it has two firm constraints.

**Size limit.** The stack is a fixed, relatively small region of memory — typically a few megabytes. If you nest too many function calls, or declare very large arrays as local variables, the stack runs out of space. This is the notorious **stack overflow** error: the stack grew past its limit and crashed into something it wasn't supposed to touch.

**Lifetime limit.** A local variable exists only while its function's frame is on the stack. Once the function returns, the variable is gone. You cannot hold on to a local variable after the function that owns it has returned. In Rust, the *lifetime* system enforces this rule at compile time, but the underlying reason for that rule is this physical fact about the stack.

## The heap: memory you control

The stack's constraints are fine for most local work, but sometimes you need memory that:

- **Survives beyond a function call** — perhaps you want to build a list and pass it to the rest of the program.
- **Grows at runtime** — you don't know how many items the user will add until the program is already running.
- **Is simply too large for the stack** — a buffer holding an entire image or video frame easily exceeds a typical stack limit.

For all of these, you turn to the **heap**. The heap is a large, general-purpose pool of memory your program can borrow from at any point during execution.

The key difference from the stack: **the heap is not automatic**. When you allocate memory on the heap, the system marks those bytes as in use and gives them to you. When you are done, you must explicitly tell the system so it can mark them as free. Nothing frees heap memory for you.

This freedom comes with responsibility. Two classic mistakes appear in nearly every codebase that manages heap memory manually:

- **Memory leak** — you allocate heap memory and never free it. The memory stays reserved forever, slowly exhausting available RAM until the program or the whole system grinds to a halt.
- **Use-after-free** — you free a block of heap memory, then accidentally access it again. Those bytes may have already been reused for something else entirely. The resulting behavior is undefined and often catastrophic.

These two classes of bug are the source of an enormous number of real-world security vulnerabilities and crashes. Different languages have chosen different strategies to prevent them:

| Language | Heap management strategy |
|----------|--------------------------|
| C | Manual: `malloc` / `free` called explicitly |
| Zig | Manual: allocator API called explicitly |
| C++ | Manual with RAII; optional smart pointers |
| Rust | Ownership system enforces correctness at compile time |
| Go / Java / Python | Garbage collector reclaims unreachable memory automatically |

In this course you'll practice manual heap management in Zig first. Feeling the discipline required to get it right by hand makes Rust's automatic approach far more satisfying — you'll understand exactly what work it is doing for you.

For now, hold the concept: the heap exists, it's large, and it requires deliberate management. The mechanics of actually allocating and freeing heap memory are covered in [Allocate Heap Memory](/en/cp/basis/cs_with_zig/malloc/).

## Alignment: why data isn't packed wall to wall

There is one more concept that shapes how data is laid out in memory: **alignment**.

CPUs read and write memory in fixed-size chunks — typically 4 or 8 bytes at a time. For this to work efficiently, the hardware requires that a value be stored at an address that is a multiple of the value's size. A 4-byte `u32` should start at an address divisible by 4 (0, 4, 8, 12, …); an 8-byte `u64` should start at an address divisible by 8. This requirement is called the type's **alignment**.

Zig exposes alignment through `@alignOf`:

```zig
const std = @import("std");

pub fn main() void {
    std.debug.print("@alignOf(u8):  {}\n", .{@alignOf(u8)});
    std.debug.print("@alignOf(u16): {}\n", .{@alignOf(u16)});
    std.debug.print("@alignOf(u32): {}\n", .{@alignOf(u32)});
    std.debug.print("@alignOf(u64): {}\n", .{@alignOf(u64)});
}
```

Output:

```text
@alignOf(u8):  1
@alignOf(u16): 2
@alignOf(u32): 4
@alignOf(u64): 8
```

### Padding in structs

When the compiler lays out a struct in memory, it inserts invisible **padding** bytes between fields to keep each field aligned correctly. This means the size of a struct is often larger than the sum of its fields.

```zig
const std = @import("std");

const Inefficient = struct {
    a: u8,  // 1 byte at offset 0
            // 3 bytes of padding so that b starts at a multiple of 4
    b: u32, // 4 bytes at offset 4
    c: u8,  // 1 byte at offset 8
            // 3 bytes of padding to make the total a multiple of 4
};
// u8 + u32 + u8 = 6 bytes of data, but...

const Efficient = struct {
    b: u32, // 4 bytes at offset 0
    a: u8,  // 1 byte at offset 4
    c: u8,  // 1 byte at offset 5
            // 2 bytes of padding at the end
};

pub fn main() void {
    std.debug.print("Inefficient: {} bytes\n", .{@sizeOf(Inefficient)});
    std.debug.print("Efficient:   {} bytes\n", .{@sizeOf(Efficient)});
}
```

Run this and you'll see `12` and `8` — four bytes of difference just from reordering the fields. Both structs hold the same data; the compiler just arranges it differently. When you have millions of these structs in memory, or when you're packing data into fixed-size network packets, field ordering matters.

This behavior is not unique to Zig. Every language that compiles to native code — C, C++, Rust — follows the same alignment rules on the same hardware.

## Summary

- From a program's perspective, **memory is a long array of bytes**, each identified by a unique **address**.
- A running program's memory is divided into four regions:
  - **Code** — the compiled machine instructions.
  - **Data** — global and static variables.
  - **Stack** — local variables, managed automatically by the function call mechanism.
  - **Heap** — a large pool of memory you request and release explicitly.
- The **stack** is LIFO: each function call pushes a **stack frame** holding the function's local variables; returning pops the frame and frees those variables instantly. The stack is fast and automatic but limited in size (typically a few megabytes) and in lifetime (locals cannot outlive their function).
- The **heap** is flexible and large, but manual. You must explicitly release heap memory when done. Forgetting causes a **memory leak**; accessing it after release causes a **use-after-free** bug. Rust's ownership system prevents both at compile time.
- Every type has a **size** (bytes it occupies, inspectable with `@sizeOf`) and an **alignment** (address boundary it must start on, inspectable with `@alignOf`). The compiler inserts **padding** between struct fields to satisfy alignment, which is why a struct's `@sizeOf` may exceed the sum of its fields.
- Stack and heap are universal concepts: C, C++, Zig, Rust, Go, and Java all operate on the same underlying model.

## What's next

With memory layout understood, two natural follow-ups await:

- [Allocate Heap Memory](/en/cp/basis/cs_with_zig/malloc/) — how to request and release heap memory in Zig, and what happens when you get it wrong.
- [Pointer](/en/cp/basis/cs_with_zig/pointer/) — a value that stores a memory address, the fundamental tool for working with heap memory and for passing data efficiently between functions.
