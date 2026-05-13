---
title: Code Block
summary: "Learn what code blocks are in Zig, how they create their own scopes and control variable lifetimes, and how Zig's unique block-as-expression feature lets a block produce a value using labeled break — eliminating the need for many temporary variables."
prerequisites: 
  - basis/cs_with_zig/boolean
  - basis/cs_with_zig/integer
  - basis/cs_with_zig/float
  - basis/cs_with_zig/simple_variable
aliases: []
tags: []
updated: 2026-05-13
---

Every language lets you group statements together, but Zig goes a step further: a group of statements can *produce a value*, just like an expression can. Understanding how blocks work — and how to exploit them — will make your code tighter, clearer, and free of unnecessary mutable variables.

## What is a code block?

A **code block** (or simply a **block**) is a sequence of statements enclosed in curly braces `{ }`. Every function body is a block, and you can also write a free-standing block anywhere a statement is expected:

```zig
pub fn main() void {
    // This is the function body — a block.

    {
        // This is a nested block — also a block.
        const x: i32 = 10;
        _ = x;
    }
}
```

A block is not just a grouping convenience. It defines a **scope**: the region of the program in which a given set of variables is visible and alive. You were introduced to scope briefly in the [Simple Variable](../simple_variable/) checkpoint; this checkpoint makes the rules precise.

## Scope and variable lifetimes

Every variable declared inside a block belongs to that block's scope. It comes into existence when the declaration is reached and is **destroyed** — its memory released — when the block ends. No variable can outlive its enclosing block.

```zig
pub fn main() void {
    const a: i32 = 1; // 'a' is in scope for all of main

    {
        const b: i32 = 2; // 'b' is only in scope inside this block
        _ = a;            // outer variables are visible here
        _ = b;
    }                     // 'b' is destroyed here

    _ = a;                // 'a' is still alive
    // _ = b;             // compile error: 'b' is not in scope
}
```

Two rules govern visibility:

- An **inner scope can read and use variables from outer scopes**.
- An **outer scope cannot see variables declared in inner scopes**.

This design is not just bookkeeping. It is a form of *intentional encapsulation*: you can introduce a variable to solve a local problem without polluting the surrounding namespace, and the compiler guarantees that nothing outside the block can accidentally depend on it.

### Shadowing

Zig permits **shadowing**: declaring a new variable inside an inner scope with the same name as one in an outer scope. The inner declaration temporarily hides the outer one within that inner scope.

```zig
pub fn main() void {
    const x: i32 = 10;

    {
        const x: i32 = 99; // shadows the outer 'x'
        _ = x;             // refers to 99, not 10
    }

    _ = x; // refers to the outer 'x' again: 10
}
```

Use shadowing sparingly. The compiler accepts it, but a human reader can easily miss the inner redeclaration and be confused about which value `x` holds. Prefer a distinct name when the values represent distinct concepts.

## Blocks as expressions

Here is where Zig's block design diverges from most languages. In Zig, a block can **produce a value** and be used wherever an expression is expected. To do this, you:

1. Attach a **label** to the block — a name followed by a colon before the opening brace: `label: { ... }`.
2. Use `break :label value;` inside the block to exit it and yield `value` as the block's result.

```zig
const std = @import("std");

pub fn main() void {
    const x: i32 = blk: {
        const a: i32 = 6;
        const b: i32 = 7;
        break :blk a * b; // the block evaluates to 42
    };

    std.debug.print("x = {}\n", .{x}); // x = 42
}
```

The type of the block expression is inferred from the value passed to `break`. Here `a * b` is `i32`, so `x` is `i32`. The label name (`blk` in this example) is arbitrary — choose something that communicates intent.

### Why this matters: fewer temporary variables

In languages where blocks cannot produce values, computing a value that requires multiple steps forces you to introduce a mutable intermediate:

```zig
// Without block expressions — forced to use a var
var result: i32 = 0;
if (some_condition) {
    result = compute_a();
} else {
    result = compute_b();
}
```

With a labeled block, you can keep `result` immutable:

```zig
// With a block expression — result stays const
const result: i32 = blk: {
    if (some_condition) break :blk compute_a();
    break :blk compute_b();
};
```

`const` is always preferable when the value does not need to change. Block expressions let you reach for `const` in situations that would otherwise demand `var`.

## Labeled blocks and early exit

The `break :label` construct is not limited to the last statement in a block. You can `break` from anywhere inside a labeled block, which serves as a clean way to exit early from complex initialization logic:

```zig
const std = @import("std");

pub fn main() void {
    const input: i32 = -5;

    const clamped: i32 = clamp: {
        if (input < 0) break :clamp 0;
        if (input > 100) break :clamp 100;
        break :clamp input;
    };

    std.debug.print("clamped = {}\n", .{clamped}); // clamped = 0
}
```

Each `break :clamp` exits the block and provides its value. The first condition that fires wins, and the later lines are never reached. This is a deliberate, readable pattern — not unlike early returns in a function, but scoped to a single expression.

## Nested blocks

Blocks can be nested to any depth. Each level introduces its own scope, and `break :label` always targets the specific label it names, not just the nearest enclosing block:

```zig
const std = @import("std");

pub fn main() void {
    const value: i32 = outer: {
        const a: i32 = 3;

        const inner_result: i32 = inner: {
            const b: i32 = 4;
            break :inner a + b; // exits the inner block, yields 7
        };

        // inner_result is 7; 'b' is already gone
        break :outer inner_result * 2; // exits the outer block, yields 14
    };

    std.debug.print("value = {}\n", .{value}); // value = 14
}
```

Here `b` is destroyed when the inner block ends. The outer block can still use `inner_result` because that variable was declared in its own scope.

## Blocks in the rest of the language

Blocks are not an isolated feature. They appear throughout Zig as the structural component that holds groups of statements together:

- **Function bodies** — the block after `fn name(...) ReturnType` is the function's body block. A function returns a value by reaching its final expression or using `return`, not `break`.
- **`if` / `else if` / `else` branches** — each branch body is a block, and the whole `if` construct can also be a block expression (covered in the next checkpoint).
- **`while` and `for` loop bodies** — the repeated section of a loop is a block; `break` exits the loop, and a labeled loop can also yield a value.

Each of these constructs gets its own checkpoint. Recognizing that they all follow the same block-and-scope rules makes each new construct easier to understand.

## Summary

- A **code block** is a sequence of statements wrapped in `{ }`. It defines a **scope**.
- Variables declared inside a block are **destroyed when the block ends**. They are not visible outside it.
- Inner scopes can read variables from outer scopes; outer scopes cannot see into inner scopes.
- **Shadowing** — re-declaring a name from an outer scope — is allowed but should be used with care.
- A block becomes a **block expression** when given a label (`label: { ... }`) and exited with `break :label value;`. The block evaluates to that value.
- Block expressions let you initialize `const` variables with logic that requires multiple steps, avoiding the need for a temporary `var`.
- `break :label` can appear anywhere inside a labeled block, providing a clean early-exit pattern.
- Function bodies, `if` branches, and loop bodies are all blocks that follow the same scope rules.
