---
title: Calling Stack
summary: "Learn how the call stack manages function calls at runtime: what a stack frame contains, how the stack pointer tracks active frames, and what causes a stack overflow."
prerequisites: 
  - basis/cs_with_zig/function_intro
  - basis/data_structure/stack
aliases: []
tags: []
updated: 2026-05-16
---

Every time your program calls a function, something must remember where execution should resume once that function returns. If `main` calls `square`, and `square` calls `multiply`, the computer needs to know: when `multiply` finishes, go back to `square`; when `square` finishes, go back to `main`. That "something" is the **call stack**.

## What the call stack is

The **call stack** is a region of memory that the operating system allocates for your program at startup. Your program uses it exclusively to manage function calls: each call adds information to this region, and each return removes it. The LIFO property you studied in [Stack](/en/cp/basis/data_structure/stack/) makes this structure a natural fit — the function called *last* is always the one that returns *first*.

The unit of information stored for each active function call is called a **stack frame** (sometimes *activation record*). When a function is called, a new frame is pushed onto the call stack. When it returns, its frame is popped off.

## What a stack frame contains

A stack frame holds everything the function needs to execute and to return cleanly:

- **Return address** — the memory address of the instruction in the *caller* that should run after this function returns. Without it, the CPU would not know where to jump back.
- **Local variables** — variables declared inside the function body, like `var count: i32 = 0`.
- **Function arguments** — the values passed to the function. On modern architectures, arguments start in CPU registers and spill into the frame only when there are too many to fit.
- **Saved registers** — if this function needs a CPU register that the caller was also using, it saves the caller's value into the frame first and restores it before returning.

You never manage stack frames by hand. The compiler generates all the push and pop code. The important thing is understanding what is *in* a frame, because that knowledge explains stack overflow, variable lifetimes, and debugger backtraces.

## Tracing a call step by step

Here is a small Zig program with a two-level call chain:

```zig
const std = @import("std");

fn multiply(a: i32, b: i32) i32 {
    return a * b;
}

fn square(n: i32) i32 {
    return multiply(n, n);
}

pub fn main() void {
    const result = square(5);
    std.debug.print("{}\n", .{result}); // 25
}
```

Follow the call stack as this runs:

1. **`main` starts.** A frame for `main` is pushed. It contains the storage for `result` (not yet set) and the return address back to the OS startup code.

2. **`main` calls `square(5)`.** A frame for `square` is pushed on top of `main`'s frame. It contains the argument `n = 5` and the return address pointing back into `main`.

3. **`square` calls `multiply(5, 5)`.** A frame for `multiply` is pushed. It contains `a = 5`, `b = 5`, and the return address pointing back into `square`.

4. **`multiply` executes and returns `25`.** Its frame is popped. The CPU jumps to the stored return address, landing back inside `square`.

5. **`square` returns `25`.** Its frame is popped. Execution resumes in `main`.

6. **`main` stores `25` in `result`** and continues to the print call.

At any moment, the call stack contains exactly the frames for all functions that have been called but not yet returned — the active call chain from `main` down to wherever execution currently is.

## The stack pointer

The CPU keeps a dedicated register called the **stack pointer** (`rsp` on x86-64) that always points to the top of the call stack. When a frame is pushed, the stack pointer moves to reserve space; when a frame is popped, it moves back.

When you ask a debugger for a **backtrace** (also called a *stack trace*), it walks the call stack from the current top frame down to `main`, printing each function name and the values stored in that frame. This is why a backtrace shows exactly the chain of calls that led to where execution stopped — the stack pointer gives the debugger its starting point, and each frame records how to find the one beneath it.

## What causes stack overflow

The call stack has a finite size — typically a few megabytes per thread. If your program pushes frames faster than it pops them, it eventually runs out of space. This is a **stack overflow**.

The most common cause is unbounded recursion:

```zig
fn infinite(n: i32) i32 {
    return infinite(n + 1); // never returns — keeps pushing frames
}
```

Each call pushes a new frame without ever returning, so the stack grows until the OS detects the overflow and terminates the process. Zig (like Rust and C) does not insert a stack-depth check at every call; the OS handles detection via a *guard page* — a protected memory region just past the end of the stack that triggers a fault when the stack pointer crosses it.

Stack overflow is also possible without recursion. Declaring a very large local array can exhaust the remaining stack space in a single frame:

```zig
fn bigFrame() void {
    var buffer: [10_000_000]u8 = undefined; // 10 MB on the stack
    _ = buffer;
}
```

The solution for large allocations is the **heap**, not the stack — covered in [malloc and dynamic memory](/en/cp/basis/cs_with_zig/malloc/).

## Local variables are tied to their frame

Because local variables live inside a stack frame, they are valid only while that frame is on the stack. When the function returns, the frame is popped, and the memory is immediately available for the next call.

This means returning a pointer to a local variable is unsafe: by the time the caller reads through that pointer, the frame that held the variable is gone, and the memory may already belong to a new frame.

```zig
fn dangling() *i32 {
    var x: i32 = 42;
    return &x; // x's frame will be popped immediately after this return
}
```

Zig detects this particular mistake at compile time. In Rust, the borrow checker enforces the same invariant for you. The underlying reason in both cases is the same: a pointer can outlive the stack frame that owns the data it points to.

## Summary

- The **call stack** is a LIFO region of memory that manages function calls at runtime.
- Each function call pushes a **stack frame**; each return pops it. A frame holds the **return address**, **local variables**, **arguments**, and **saved registers**.
- The **stack pointer** register tracks the current top of the stack. Debugger backtraces start there and walk down to `main`.
- **Stack overflow** occurs when frames accumulate faster than they are popped — most often from unbounded recursion, but also from very large local allocations.
- Local variables are valid only while their function's frame is on the stack. Returning a pointer to a local variable is unsafe for this reason.
