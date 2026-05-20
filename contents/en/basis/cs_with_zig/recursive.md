---
title: Recursion
summary: "A recursive function calls itself to solve a smaller version of the same problem. This checkpoint explains how recursion uses the call stack, why every recursion needs a base case, and when an iterative loop is the better fit."
prerequisites:
  - basis/cs_with_zig/function_intro
  - basis/cs_with_zig/calling_stack
  - basis/cs_with_zig/condition
aliases: []
tags:
  - Functions
  - Recursion
updated: 2026-05-20
---

Some problems have a shape where the solution to the whole problem looks just like the solution to a smaller piece of it. **Recursion** is the technique of exploiting that shape: you write a function that calls itself on a smaller input, trusting that the smaller call will eventually reach a case simple enough to answer directly.

## What makes a function recursive

A **recursive function** is a function that includes at least one call to itself in its body. Each self-call is expected to work on a *strictly smaller* problem, and the chain of calls ends when the problem shrinks to the **base case** — an input so simple that the answer is known immediately without another call.

The classic textbook example is factorial: $n! = n \times (n-1) \times \cdots \times 1$. The recursive version mirrors the mathematical definition exactly:

```zig
const std = @import("std");

fn factorial(n: u64) u64 {
    if (n == 0) return 1;        // base case: 0! = 1 by definition
    return n * factorial(n - 1); // recursive case
}

pub fn main() void {
    std.debug.print("{}\n", .{factorial(5)}); // 120
}
```

When you call `factorial(5)`, it returns `5 * factorial(4)`. That call returns `4 * factorial(3)`, and so on. Once the argument reaches `0`, the base case fires and the chain of multiplications unwinds back to the original call.

## How recursion uses the call stack

Recursion is not magic — it is an ordinary sequence of function calls, and as you learned in [Calling Stack](/en/cp/basis/cs_with_zig/calling_stack/), every function call pushes a frame onto the call stack. Recursive calls are no different.

Tracing `factorial(3)` step by step:

1. `factorial(3)` is called. Its frame holds `n = 3` and the return address back to `main`. It cannot return yet — it needs `factorial(2)` first.
2. `factorial(2)` is called. Its frame holds `n = 2`. It needs `factorial(1)`.
3. `factorial(1)` is called. Its frame holds `n = 1`. It needs `factorial(0)`.
4. `factorial(0)` is called. Its frame holds `n = 0`. The base case matches — it returns `1` immediately.
5. The frame for `factorial(0)` is popped. `factorial(1)` now has its answer: `1 * 1 = 1`. It returns `1`.
6. The frame for `factorial(1)` is popped. `factorial(2)` computes `2 * 1 = 2` and returns.
7. The frame for `factorial(2)` is popped. `factorial(3)` computes `3 * 2 = 6` and returns.

The key insight is that all intermediate frames stay on the stack *simultaneously* while waiting for their recursive call to return. `factorial(n)` will hold `n` frames at peak depth.

## Why the base case is not optional

Without a base case, a recursive function never stops calling itself. Each call pushes a new frame, and the call stack grows without bound until the operating system terminates the program with a stack overflow.

```zig
fn countDown(n: i32) void {
    // missing base case — runs forever and crashes
    countDown(n - 1);
}
```

The base case is the exit condition that every recursive chain must eventually reach. Before writing any recursive function, ask yourself two questions:

1. What is the simplest possible input that I can answer directly? That is your base case.
2. Does every other input reduce toward that base case in a finite number of steps? If not, the recursion may not terminate.

## A second example: summing a slice

Factorial is useful for learning, but it only takes a single integer. Here is a recursive function that operates on a slice — a type of problem where the recursive structure is less obvious at first:

```zig
const std = @import("std");

fn sumSlice(nums: []const i64) i64 {
    if (nums.len == 0) return 0;   // base case: empty slice sums to 0
    return nums[0] + sumSlice(nums[1..]); // add first element, recurse on the rest
}

pub fn main() void {
    const data = [_]i64{ 1, 2, 3, 4, 5 };
    std.debug.print("{}\n", .{sumSlice(&data)}); // 15
}
```

Each recursive call peels off one element from the front of the slice. The slice shrinks by one with every call, so it must eventually become empty — which is the base case. The recursion terminates.

Notice that `nums[1..]` is a new **slice** (a pointer + length pair pointing one element further in), not a copy of the array. No data is duplicated; only the view into the data changes.

## Recursion depth and stack overflow

Because each active recursive call holds a frame on the stack, a deeply recursive function can overflow the stack just like the unbounded example in [Calling Stack](/en/cp/basis/cs_with_zig/calling_stack/). The stack on most systems is a few megabytes, and each frame typically uses a few dozen to a few hundred bytes. That gives you roughly tens of thousands of frames before things go wrong.

For `factorial`, even `factorial(20)` overflows `u64`, so you will never reach a dangerous depth in practice. But for general recursion over user-supplied input — such as traversing a file system or parsing a deeply nested document — you must be aware of the maximum possible depth.

## When to use a loop instead

Recursion and iteration are equally powerful in theory: anything you can do with one, you can do with the other. In practice, choose based on the shape of the problem.

**Prefer recursion when:**
- The problem naturally decomposes into smaller copies of itself (trees, graphs, divide-and-conquer algorithms).
- The recursive structure makes the code match the mathematical definition closely, which makes it easier to verify for correctness.

**Prefer a loop when:**
- The recursion is **tail recursion** — the recursive call is the very last thing the function does, with no work on the way back. Loops are the direct equivalent and do not grow the stack.
- The maximum input size could produce a depth that risks stack overflow.
- Performance is critical and you want to avoid the overhead of repeatedly pushing and popping frames.

The factorial example above is a case where a loop is actually the better choice in production code. The recursive version is clear for learning, but the iterative version uses constant stack space regardless of `n`:

```zig
fn factorialLoop(n: u64) u64 {
    var result: u64 = 1;
    var i: u64 = 2;
    while (i <= n) : (i += 1) {
        result *= i;
    }
    return result;
}
```

A good rule of thumb: if you find yourself writing `return myFunc(reducedInput)` with *nothing* after the recursive call, replace the recursion with a loop. If there is work to do on the way back — like `return n * factorial(n - 1)` — the recursive structure is doing real work and a loop replacement requires explicitly managing a stack, which is usually not worth it.

## Summary

- A **recursive function** calls itself on a smaller input. Every recursive definition consists of a **base case** (answered directly) and a **recursive case** (reduces the input and calls itself).
- Recursive calls use the **call stack** just like any other function call. Each active call holds a frame until it returns, so deep recursion can cause a **stack overflow**.
- The base case must be reachable from every possible input, and every recursive step must make progress toward it.
- **Choose recursion** when the problem structure is naturally self-similar (trees, divide-and-conquer). **Choose a loop** when the recursion is tail recursion or when input size may be unbounded.
