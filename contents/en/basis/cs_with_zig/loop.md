---
title: Loop Statement
summary: "Learn how Zig's while and for loops work, how to control loop flow with break and continue, and how loops can be used as expressions that produce a value."
prerequisites: 
  - basis/cs_with_zig/condition
  - basis/cs_with_zig/boolean
aliases: []
tags: []
updated: 2026-05-13
---

Copying and pasting the same block of code ten times is not programming — it is busywork, and it creates ten places where a future bug can hide. Loops let you express "repeat this work" once, clearly, and let the machine handle the repetition. They are the tool that turns a program that handles one item into one that handles a million.

## Why loops exist

Suppose you want to print the numbers 1 through 5. Without a loop, you write five nearly identical statements. With a loop, you write the logic once and tell the program how many times to run it. Any time you find yourself writing the same code block repeatedly with only a counter or an element changing, a loop is the right tool.

## The `while` loop

A **`while` loop** runs its body repeatedly for as long as a condition remains `true`. The moment the condition becomes `false`, the loop stops and execution continues after the closing brace.

```zig
const std = @import("std");

pub fn main() void {
    var i: u32 = 1;
    while (i <= 5) {
        std.debug.print("{}\n", .{i});
        i += 1;
    }
}
```

Output:

```
1
2
3
4
5
```

### The continue expression

Zig's `while` loop has an optional **continue expression** — a step that runs at the end of every iteration, including ones that used `continue` to skip the body early (more on `continue` below). It sits between the condition and the body, separated by a colon:

```zig
while (condition) : (step) {
    // body
}
```

The previous example rewrites cleanly with a continue expression:

```zig
const std = @import("std");

pub fn main() void {
    var i: u32 = 1;
    while (i <= 5) : (i += 1) {
        std.debug.print("{}\n", .{i});
    }
}
```

Moving the increment into the continue expression keeps it separate from the body logic, making it harder to accidentally skip the increment when you add an early `continue` later.

## The `for` loop

A **`for` loop** iterates over every element of a slice or array. You do not manage an index variable manually — the loop hands each element to you directly via a **capture**:

```zig
const std = @import("std");

pub fn main() void {
    const fruits = [_][]const u8{ "apple", "banana", "cherry" };

    for (fruits) |fruit| {
        std.debug.print("{s}\n", .{fruit});
    }
}
```

Output:

```
apple
banana
cherry
```

The `|fruit|` syntax is the capture: for each iteration, `fruit` is bound to the current element. The original array is not modified.

### Capturing the index

When you also need to know the position of each element, you can zip the array with a range starting at `0..`:

```zig
const std = @import("std");

pub fn main() void {
    const fruits = [_][]const u8{ "apple", "banana", "cherry" };

    for (fruits, 0..) |fruit, i| {
        std.debug.print("{}: {s}\n", .{ i, fruit });
    }
}
```

Output:

```
0: apple
1: banana
2: cherry
```

The `0..` produces an integer that counts up from zero in step with each element. The two captures `|fruit, i|` correspond to the two iterables `(fruits, 0..)` in the same left-to-right order.

## `break` and `continue`

Two keywords let you alter the normal flow of a loop mid-iteration.

**`continue`** skips the rest of the current iteration's body and jumps to the next one. In a `while` loop with a continue expression, the continue expression still runs.

```zig
const std = @import("std");

pub fn main() void {
    var i: u32 = 0;
    while (i < 10) : (i += 1) {
        if (i % 2 == 0) continue; // skip even numbers
        std.debug.print("{}\n", .{i});
    }
}
```

Output: `1 3 5 7 9` (each on its own line).

**`break`** exits the loop immediately, regardless of whether the condition is still `true`.

```zig
const std = @import("std");

pub fn main() void {
    var i: u32 = 0;
    while (i < 100) : (i += 1) {
        if (i == 5) break; // stop early
        std.debug.print("{}\n", .{i});
    }
}
```

Output: `0 1 2 3 4` (each on its own line). The loop never reaches 6 or beyond.

## Infinite loops

A loop with the condition `while (true)` runs forever unless something inside it executes `break`. This pattern is called an **infinite loop**, and it is the right choice whenever the termination condition is naturally expressed from *inside* the loop — for example, an event loop, a REPL, or reading input until a sentinel value appears.

```zig
const std = @import("std");

pub fn main() void {
    var count: u32 = 0;
    while (true) {
        count += 1;
        if (count == 3) break;
    }
    std.debug.print("stopped at {}\n", .{count}); // stopped at 3
}
```

Use `while (true)` deliberately. An accidental infinite loop (one that never reaches `break` due to a logic error) will hang your program.

## Labeled `break` for nested loops

When you nest one loop inside another, a plain `break` only exits the *innermost* loop. To exit an outer loop from inside an inner one, Zig lets you attach a **label** to the outer loop and use it with `break`:

```zig
const std = @import("std");

pub fn main() void {
    outer: for (0..4) |row| {
        for (0..4) |col| {
            if (row == 2 and col == 2) break :outer;
            std.debug.print("({}, {})\n", .{ row, col });
        }
    }
    std.debug.print("done\n", .{});
}
```

Without `break :outer`, `break` would only exit the inner `for` loop and the outer loop would continue. The label `outer:` placed immediately before a loop can be targeted by both `break :outer` and `continue :outer`.

## Loop as expression

In Zig, a loop can be an **expression** — it can produce a value that you assign to a variable. To return a value from a loop, pass the value to `break`:

```zig
const std = @import("std");

pub fn main() void {
    // Find the first even number in the list, or 0 if none exists.
    const numbers = [_]i32{ 1, 3, 7, 8, 11 };

    const first_even: i32 = for (numbers) |n| {
        if (n % 2 == 0) break n; // produce n as the loop's value
    } else 0; // else branch runs if the loop completed without break

    std.debug.print("first even: {}\n", .{first_even}); // first even: 8
}
```

The `else` clause after a `for` or `while` loop runs only if the loop finished *without* ever executing a `break`. This makes it the natural place to supply a default value when a search comes up empty.

## Summary

- Loops let you repeat a block of code without duplicating it, and scale the same logic from one item to any number.
- A **`while` loop** runs while a condition is `true`. The optional **continue expression** `while (cond) : (step) { }` runs `step` after every iteration, even ones that `continue` early.
- A **`for` loop** iterates over a slice or array. Use `for (items) |item| { }` to capture elements, and `for (items, 0..) |item, i| { }` to also capture a zero-based index.
- **`continue`** skips to the next iteration; **`break`** exits the loop immediately.
- **Infinite loops** (`while (true)`) are the right pattern when termination is determined from inside the loop.
- **Labels** (`outer: for ...` and `break :outer`) let you exit an outer loop from inside a nested loop.
- A loop can act as an **expression**: `break value` produces a value, and the `else` clause after the loop provides a fallback for when the loop completes without `break`.
