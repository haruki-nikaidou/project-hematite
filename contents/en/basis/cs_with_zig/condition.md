---
title: Condition Statement
summary: "Learn how to branch program execution in Zig using if/else if/else, if as an expression, optional unwrapping with if, and switch — including how Zig's strict bool requirement and exhaustive switch matching help you write safer, more correct branching logic."
prerequisites: 
  - basis/cs_with_zig/code_block
  - basis/cs_with_zig/boolean
aliases: []
tags: []
updated: 2026-05-13
---

A program that does exactly the same thing regardless of its input is not very useful. Conditions are how you give a program the ability to choose: do this under these circumstances, do that otherwise. Getting the syntax and semantics right from the start — especially the ways Zig's rules differ from languages you may already know — saves a lot of debugging time later.

## The `if` statement

An **`if` statement** evaluates a boolean condition and executes a block of code only when that condition is `true`. Its basic form is:

```zig
if (condition) {
    // executed when condition is true
}
```

You can add an `else` branch that runs when the condition is `false`:

```zig
const std = @import("std");

pub fn main() void {
    const score: i32 = 74;

    if (score >= 60) {
        std.debug.print("Passing.\n", .{});
    } else {
        std.debug.print("Failing.\n", .{});
    }
}
```

For more than two cases, chain additional conditions with `else if`:

```zig
const std = @import("std");

pub fn main() void {
    const score: i32 = 74;

    if (score >= 90) {
        std.debug.print("Grade: A\n", .{});
    } else if (score >= 80) {
        std.debug.print("Grade: B\n", .{});
    } else if (score >= 70) {
        std.debug.print("Grade: C\n", .{});
    } else if (score >= 60) {
        std.debug.print("Grade: D\n", .{});
    } else {
        std.debug.print("Grade: F\n", .{});
    }
}
```

Zig evaluates branches top to bottom and executes the first one whose condition is `true`. The remaining branches are skipped.

## Conditions must be `bool`

Zig requires the condition in every `if` to have type `bool` exactly. **There is no implicit conversion from integers or pointers to `bool`**. This is a deliberate difference from C, where any non-zero integer is treated as `true`.

```zig
const x: i32 = 1;

// if (x) { ... }         // compile error: expected bool, found i32
if (x != 0) { /* ok */ }  // explicit comparison produces a bool
```

This strictness is a feature: the compiler catches a whole class of bugs — accidentally treating a count or a pointer as a condition — before the program ever runs. Always write out the comparison explicitly.

## `if` as an expression

Because `if` / `else` branches are blocks, and blocks can produce values (as you learned in the [Code Block](../code_block/) checkpoint), the entire `if` construct can act as an expression. The syntax is the same; you just use it in a position that expects a value:

```zig
const std = @import("std");

pub fn main() void {
    const score: i32 = 74;
    const grade: []const u8 = if (score >= 60) "Pass" else "Fail";

    std.debug.print("Result: {s}\n", .{grade});
}
```

A few rules apply when using `if` as an expression:

- **Both branches must produce a value of the same type.** Zig cannot pick a common type for you.
- **The `else` branch is mandatory.** Without an `else`, the `if` might produce no value at all, which leaves the variable uninitialized — something Zig never permits.

Using `if` as an expression lets you declare `grade` as `const`. Without this feature you would need a mutable `var` initialized before the `if`, then re-assigned inside each branch.

For multi-statement branches, use labeled blocks to yield the final value:

```zig
const std = @import("std");

pub fn main() void {
    const raw: i32 = 130;

    const capped: i32 = if (raw > 100) blk: {
        std.debug.print("Score exceeds maximum; capping.\n", .{});
        break :blk 100;
    } else raw;

    std.debug.print("capped = {}\n", .{capped});
}
```

## Unwrapping optionals with `if`

Zig has a type system feature called **optionals**: a value of type `?T` can either hold a `T` or be `null`. You will learn about optionals in depth in a later checkpoint, but `if` has special syntax for them that is worth knowing now:

```zig
const std = @import("std");

pub fn main() void {
    const maybe: ?i32 = 42;

    if (maybe) |value| {
        // 'value' is i32 here — the null case is ruled out
        std.debug.print("Got: {}\n", .{value});
    } else {
        std.debug.print("Nothing.\n", .{});
    }
}
```

The `|value|` syntax **unwraps** the optional: if `maybe` is not `null`, the non-null inner value is bound to `value` and the `if` branch executes with that binding in scope. If `maybe` is `null`, the `else` branch runs instead.

This pattern is so common in Zig that learning to recognize it early will help you read any real codebase. The full semantics of optionals and the null-safety guarantees behind them are covered in the Optionals checkpoint.

## Readability: early returns vs. deep nesting

When conditions are nested several levels deep, the code becomes hard to follow — the "happy path" (the normal, expected case) is buried under layers of indentation:

```zig
fn process(x: i32) void {
    if (x > 0) {
        if (x < 1000) {
            if (x % 2 == 0) {
                // ... actual work, buried three levels deep
            }
        }
    }
}
```

A common and idiomatic alternative is the **early exit** (or guard) style: check for error or invalid conditions first, exit immediately if they apply, and let the normal path continue at the same indentation level:

```zig
const std = @import("std");

fn process(x: i32) void {
    if (x <= 0) return;
    if (x >= 1000) return;
    if (x % 2 != 0) return;

    // Normal path — no extra indentation required.
    std.debug.print("Processing {}\n", .{x});
}
```

The two versions are logically identical. The early-exit version is usually easier to read because:

- Each guard expresses a single, clearly labelled rejection condition.
- The meaningful work sits at the top level of the function rather than at the deepest indent.
- Adding or removing a guard is a one-line change.

You will see functions discussed more in a later checkpoint. For now the key takeaway is the principle: **reject invalid inputs at the top, handle the normal case below**.

## The `switch` statement

When a single value needs to be compared against many possible cases, an `if` / `else if` chain becomes repetitive. The **`switch` statement** is a cleaner alternative:

```zig
const std = @import("std");

pub fn main() void {
    const day: u8 = 3;

    switch (day) {
        1 => std.debug.print("Monday\n",    .{}),
        2 => std.debug.print("Tuesday\n",   .{}),
        3 => std.debug.print("Wednesday\n", .{}),
        4 => std.debug.print("Thursday\n",  .{}),
        5 => std.debug.print("Friday\n",    .{}),
        6 => std.debug.print("Saturday\n",  .{}),
        7 => std.debug.print("Sunday\n",    .{}),
        else => std.debug.print("Invalid day\n", .{}),
    }
}
```

Each line inside `switch` is a **prong**: a pattern on the left of `=>` and a statement or expression on the right.

### Exhaustiveness

`switch` in Zig is **exhaustive**: every possible value of the switched-on type must be handled, either by an explicit prong or by a catch-all `else` prong. If you omit `else` and any value is unmatched, the program will not compile. This prevents an entire class of bugs where a new case is added but the corresponding branch is forgotten.

### Matching multiple values and ranges

A single prong can match several values at once by separating them with commas, and it can match a contiguous range using `...`:

```zig
const std = @import("std");

pub fn main() void {
    const score: u8 = 74;

    switch (score) {
        90...100 => std.debug.print("A\n", .{}),
        80...89  => std.debug.print("B\n", .{}),
        70...79  => std.debug.print("C\n", .{}),
        60...69  => std.debug.print("D\n", .{}),
        0...59   => std.debug.print("F\n", .{}),
        else     => std.debug.print("Out of range\n", .{}),
    }
}
```

> **Note:** `...` in a `switch` prong is an *inclusive* range — both endpoints are included.

For multi-statement branches, wrap the body in a block:

```zig
const std = @import("std");

pub fn main() void {
    const code: u8 = 2;

    switch (code) {
        1 => {
            std.debug.print("Code 1: initializing\n", .{});
            std.debug.print("Ready.\n", .{});
        },
        2, 3 => {
            std.debug.print("Code 2 or 3: running\n", .{});
        },
        else => {
            std.debug.print("Unknown code\n", .{});
        },
    }
}
```

### `switch` as an expression

Like `if`, `switch` can produce a value when every prong yields one:

```zig
const std = @import("std");

pub fn main() void {
    const day: u8 = 6;

    const kind: []const u8 = switch (day) {
        1...5 => "weekday",
        6, 7  => "weekend",
        else  => "invalid",
    };

    std.debug.print("{}\n", .{kind});
}
```

When used as an expression, all prongs must produce the same type, and the `else` prong (or an exhaustive match) is still required.

### Matching on enums

`switch` pairs especially well with **enums** (a type whose values are a closed, named set). When switching on an enum, Zig knows all possible values at compile time, so the exhaustiveness check is exact — no `else` is needed as long as every variant is covered:

```zig
const std = @import("std");

const Direction = enum { north, south, east, west };

pub fn main() void {
    const dir: Direction = .east;

    switch (dir) {
        .north => std.debug.print("Going north\n", .{}),
        .south => std.debug.print("Going south\n", .{}),
        .east  => std.debug.print("Going east\n",  .{}),
        .west  => std.debug.print("Going west\n",  .{}),
    }
}
```

If a new variant is later added to `Direction`, every `switch` that lacks an `else` will fail to compile, forcing you to handle the new case. This makes refactoring much safer. Enums are covered in depth in the Enum checkpoint.

## Summary

- An **`if` statement** evaluates a `bool` condition and runs its block when the condition is `true`. Chain additional cases with `else if`; catch the remaining cases with `else`.
- Zig **requires the condition to be exactly `bool`**. There is no implicit integer-to-bool coercion. Always write the comparison explicitly (e.g. `x != 0` instead of `x`).
- `if` / `else` is an **expression**: it can produce a value, letting you initialize a `const` without a temporary `var`. Both branches must produce the same type, and `else` is mandatory when a value is expected.
- `if (opt) |v| { ... }` **unwraps an optional**: if `opt` is not `null`, `v` holds the inner value inside the block. Full optional semantics are covered in a later checkpoint.
- Prefer the **early exit** style over deep nesting: guard against invalid inputs at the top of a function and let the normal path run at the base indentation level.
- A **`switch` statement** matches a single value against multiple prongs using `=>`. Prongs can list individual values (comma-separated) or inclusive ranges (`...`).
- `switch` is **exhaustive**: every value must be covered by an explicit prong or an `else` catch-all. Omitting coverage is a compile error.
- Like `if`, `switch` can also be used as an **expression**; all prongs must then produce the same type.
- Switching on an **enum** with full coverage requires no `else` and lets the compiler enforce that new variants are handled everywhere they are switched on.
