---
title: Function
summary: "Learn how to declare and call functions in Zig, how parameters and return values work, why the pub keyword controls visibility, and how keeping functions small and focused makes programs easier to understand and change."
prerequisites:
  - basis/cs_with_zig/prepare_environment
  - basis/cs_with_zig/simple_variable
  - basis/cs_with_zig/code_block
aliases: []
tags: []
updated: 2026-05-13
---

Every non-trivial program contains logic that needs to run from more than one place. Without a way to name and reuse that logic, you end up copying it — and every copy is a future bug waiting to diverge from the others. **Functions** solve this: they give a name to a block of logic so you can invoke it by name anywhere, any number of times, without repeating the code.

## What is a function?

A **function** is a named, reusable piece of code that optionally accepts input values, runs a sequence of statements, and optionally produces an output value. You define the function once and *call* it — ask it to run — whenever you need that work done.

Think of a function like a labeled recipe card: the card's title is the function's name, the ingredient list is the parameter list, the steps are the body, and the dish you end up with is the return value.

## Declaring a function

In Zig, a function declaration follows this form:

```zig
fn name(param1: Type1, param2: Type2) ReturnType {
    // body
}
```

- `fn` is the keyword that begins every function declaration.
- `name` is the identifier you will use to call it. By convention, Zig function names use `camelCase`.
- The **parameter list** in parentheses declares the inputs. Each parameter has a name and a type, separated by a colon.
- `ReturnType` is the type of the value the function produces.
- The body is the block of statements between `{` and `}`.

Here is a minimal concrete example:

```zig
fn add(a: i32, b: i32) i32 {
    return a + b;
}
```

`add` takes two 32-bit signed integers and returns their sum. The `return` keyword hands the value back to the caller and exits the function immediately.

> **Zig requires an explicit `return`** to produce a value from a function. Unlike some languages, the value of the last expression in a block is *not* automatically returned. If you omit `return`, the compiler will tell you that the function's control flow can reach the end without returning a value.

## The `pub` keyword

By default, a function is **private** — visible only within the file it is declared in. Adding `pub` before `fn` makes it **public**, so other files that import this one can call it:

```zig
pub fn add(a: i32, b: i32) i32 {
    return a + b;
}
```

A good rule of thumb: declare functions as private (no `pub`) unless there is a concrete reason for another file to call them. Keeping the public surface small makes a module easier to understand and refactor later.

## The `void` return type

When a function does not need to produce a value — for example, one that only prints to the terminal — its return type is **`void`**. You may omit the `return` statement entirely, or write a bare `return;` to exit early:

```zig
const std = @import("std");

fn greet(name: []const u8) void {
    std.debug.print("Hello, {s}!\n", .{name});
}

pub fn main() void {
    greet("world"); // Hello, world!
}
```

`void` is not a value — it simply means "this function produces nothing useful." Trying to assign the result of a `void` function to a variable is a compile error.

## Calling a function

To **call** a function, write its name followed by arguments in parentheses, matching the order and types of the parameter list:

```zig
const std = @import("std");

fn square(n: i32) i32 {
    return n * n;
}

pub fn main() void {
    const result = square(7);
    std.debug.print("{}\n", .{result}); // 49
}
```

The call `square(7)` hands the value `7` to `n`, runs the body, and the `return` sends `49` back. That value is then bound to `result`.

Function calls are expressions: their result can be passed directly to another call, used in arithmetic, or stored in a variable.

```zig
const std = @import("std");

fn double(n: i32) i32 {
    return n * 2;
}

pub fn main() void {
    std.debug.print("{}\n", .{double(double(3))}); // 12
}
```

## The `main` function: the entry point

Every executable Zig program must define a **`main` function**. It is the first function the operating system calls when you run your program. All other functions are reachable only because `main` (or something `main` calls) eventually calls them.

```zig
const std = @import("std");

pub fn main() void {
    std.debug.print("program started\n", .{});
}
```

`main` must be `pub` so the Zig build system can find it. It takes no parameters in its simplest form, and its return type is usually `void` (or `!void` when it can return errors — a pattern covered in the error handling checkpoint).

## Parameters are immutable by default

Inside a function body, each parameter behaves like a `const` binding. You can read it, pass it further, or compute from it, but you cannot reassign it:

```zig
fn tryToMutate(x: i32) void {
    x = x + 1; // compile error: cannot assign to constant
}
```

If you need a mutable local copy, declare a `var` inside the body and initialize it from the parameter:

```zig
fn countDown(start: i32) void {
    const std = @import("std");
    var n: i32 = start;
    while (n > 0) : (n -= 1) {
        std.debug.print("{}\n", .{n});
    }
}
```

## A complete working example

Here is a small program that ties the ideas together:

```zig
const std = @import("std");

fn clamp(value: i32, min: i32, max: i32) i32 {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

fn printClamped(value: i32) void {
    const result = clamp(value, 0, 100);
    std.debug.print("clamp({}) = {}\n", .{ value, result });
}

pub fn main() void {
    printClamped(-5);  // clamp(-5) = 0
    printClamped(50);  // clamp(50) = 50
    printClamped(120); // clamp(120) = 100
}
```

`clamp` encapsulates the boundary logic. `printClamped` wraps `clamp` and the printing into a single named operation. `main` reads as a short list of intentions. Each function does one thing.

## Multiple return values

Zig functions return exactly one value. When you need to return more than one piece of data, the conventional approach is to return a **struct** that bundles those values together. Another common pattern is an **error union** (written `ErrorSet!Type`), which either returns a value or signals that something went wrong. Both patterns appear in later checkpoints; for now, just note that you are not limited to a single primitive as a return type.

## `comptime` parameters

Functions in Zig can be made generic by declaring parameters with the keyword **`comptime`**, which tells the compiler to resolve that parameter's value at compile time rather than at runtime. This unlocks type-level programming and zero-overhead abstractions. The full mechanics are covered in the comptime checkpoint; for now, it is enough to know that Zig's generics work through this mechanism rather than a separate template or generic syntax.

## Keeping functions small and focused

A function should do **one thing** and do it clearly. This principle — sometimes called the **single responsibility** idea — is not a rigid rule, but a guide: if you find yourself writing a long function with a comment like `// --- part 2 ---` in the middle, that is usually a sign to split it into two named functions.

Small, focused functions are:

- **Easier to read** — a good name summarizes what the function does, so callers can understand the code without reading the body.
- **Easier to test** — you can verify a small function in isolation.
- **Easier to change** — fixing or improving one piece of logic has no risk of breaking an unrelated piece in the same body.

There is no magic maximum line count. The test is: can you give this function a name that honestly describes everything it does?

## Summary

- A **function** names a reusable block of logic. Declare one with `fn name(params) ReturnType { }`.
- **`pub`** makes a function visible to other files. Omit it to keep a function private to its own file.
- **Parameters** are declared as `name: Type` pairs and are immutable inside the body. Declare a local `var` if you need a mutable copy.
- Use **`return value;`** to produce a result. Zig does not implicitly return the last expression — `return` is always required.
- When a function produces nothing useful, its return type is **`void`** and `return` may be omitted.
- **`main`** is the program's entry point. It must be `pub` and takes no parameters in its basic form.
- To return multiple values, use a **struct**; to return a value-or-error, use an **error union** — both are covered in later checkpoints.
- Functions can accept **`comptime`** parameters to be generic; the full story is in the comptime checkpoint.
- Keep functions **small and focused**: one clear responsibility per function makes code easier to read, test, and change.
