---
title: Boolean
summary: "Learn how Zig's bool type works, how comparison and logical operators produce and combine boolean values, and how short-circuit evaluation can make your conditions both safer and more efficient."
prerequisites: 
  - basis/cs_with_zig/prepare_environment
  - basis/cs_with_zig/simple_variable
aliases: []
tags: ["Types"]
updated: 2026-05-13
---

Almost every real program needs to make decisions: is this value in range? Did the connection succeed? Has the counter hit its limit? All of those questions have exactly two possible answers — yes or no, true or false. A **boolean** captures that: a value that is either `true` or `false`, with no middle ground.

The [Simple Variable](../simple_variable/) checkpoint introduced `bool` as one of Zig's four fundamental types and noted that its full story would come later. This checkpoint tells that story. By the end you will know how comparison operators produce boolean values, how logical operators combine them, why short-circuit evaluation matters, and how these pieces fit together into the conditions you will write in every real program.

## The `bool` type

`bool` is the type of a boolean value in Zig. It has exactly two possible values:

```zig
const is_ready:  bool = true;
var   has_error: bool = false;
```

You can assign either literal directly, or assign the result of any expression that produces a `bool` — which you will see often once comparison operators enter the picture.

Printing a `bool` with `std.debug.print` outputs the literal word `true` or `false`:

```zig
const std = @import("std");

pub fn main() void {
    const flag: bool = true;
    std.debug.print("{}\n", .{flag}); // true
}
```

Under the hood, Zig stores a `bool` in one byte of memory: the bit pattern `0x01` represents `true` and `0x00` represents `false`. The exact storage size matters most when you start working with structs and arrays, but for everyday use, just treat `bool` as an opaque yes-or-no flag.

## Comparison operators

**Comparison operators** take two values and produce a `bool` that describes their relationship. Zig provides six:

| Operator | Meaning |
|----------|---------|
| `==` | Equal to |
| `!=` | Not equal to |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal to |
| `>=` | Greater than or equal to |

```zig
const std = @import("std");

pub fn main() void {
    const x: i32 = 10;
    const y: i32 = 20;

    std.debug.print("x == y : {}\n", .{x == y}); // false
    std.debug.print("x != y : {}\n", .{x != y}); // true
    std.debug.print("x  < y : {}\n", .{x < y});  // true
    std.debug.print("x  > y : {}\n", .{x > y});  // false
    std.debug.print("x <= y : {}\n", .{x <= y}); // true
    std.debug.print("x >= y : {}\n", .{x >= y}); // false
}
```

A few rules to keep in mind:

- **Both sides must have the same type.** Zig never silently widens or narrows operands before comparing. Comparing a `u32` directly to an `i64` is a compile error, just as mixing types in arithmetic is.
- **Ordering operators (`<`, `>`, `<=`, `>=`) work only for types that have a natural order** — integers and floats, for example. They are not defined for `bool` values themselves.
- `==` and `!=` work for `bool` too, but there is rarely a good reason to use them: writing `flag == true` is just a roundabout way of writing `flag`, and `flag == false` is the same as `!flag` (covered in the next section).

Assigning the result of a comparison to a named variable is perfectly idiomatic, and often makes the intent clearer than inlining the expression everywhere:

```zig
const score:       i32  = 87;
const is_passing:  bool = score >= 60;
const is_perfect:  bool = score == 100;
```

## Logical operators

**Logical operators** combine boolean values to express more complex conditions. Zig provides three:

| Operator | Form | Meaning |
|----------|------|---------|
| `and` | `a and b` | `true` only when **both** `a` and `b` are `true` |
| `or` | `a or b` | `true` when **at least one** of `a` or `b` is `true` |
| `!` | `!a` | `true` when `a` is `false`, and vice versa |

> **Zig uses the keywords `and` and `or`**, not the `&&` and `||` symbols common in C, Java, and Rust. If you have a background in any of those languages, this is the syntax difference you are most likely to trip over first.

The truth tables spell out every case:

**`and`**

| `a` | `b` | `a and b` |
|-----|-----|-----------|
| `true` | `true` | `true` |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

**`or`**

| `a` | `b` | `a or b` |
|-----|-----|----------|
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

**`!` (not)**

| `a` | `!a` |
|-----|------|
| `true` | `false` |
| `false` | `true` |

A concrete example using all three:

```zig
const std = @import("std");

pub fn main() void {
    const age:        u32  = 25;
    const has_ticket: bool = true;

    const can_enter:    bool = age >= 18 and has_ticket;
    const needs_review: bool = age < 18 or !has_ticket;

    std.debug.print("can_enter    : {}\n", .{can_enter});    // true
    std.debug.print("needs_review : {}\n", .{needs_review}); // false
}
```

### Operator precedence

`!` binds tightest (it applies to the immediately following value), then `and`, then `or`. When the order might be ambiguous — or simply when you want to make the logic obvious to the next reader — use parentheses:

```zig
// These two mean different things:
const a = x or y and z;    // parsed as: x or (y and z)
const b = (x or y) and z;  // (x or y) first, then and with z
```

Parentheses cost nothing. Use them liberally whenever a compound expression has more than two parts.

## Short-circuit evaluation

Zig evaluates `and` and `or` with **short-circuit** semantics: as soon as the final result is determined, the right-hand side is *not* evaluated at all.

- For `a and b`: if `a` is `false`, the whole expression is `false` regardless of `b`, so `b` is skipped.
- For `a or b`: if `a` is `true`, the whole expression is `true` regardless of `b`, so `b` is skipped.

This is not just a performance optimization — it is a correctness tool. Consider checking whether division is safe before performing it:

```zig
const divisor:   i32 = 0;
const numerator: i32 = 10;

// Safe: if divisor == 0, the right side is never reached
const result: bool = divisor != 0 and numerator / divisor > 5;
```

Without short-circuit evaluation, `numerator / divisor` would execute even when `divisor` is zero, causing a runtime panic. With it, the division is only attempted after `divisor != 0` has confirmed it is safe.

The practical rule: **place cheaper or guarding conditions on the left, and more expensive or potentially unsafe conditions on the right**. The left side controls whether the right side runs at all.

## De Morgan's laws

Two classical identities — known as **De Morgan's laws** — are worth knowing because they come up whenever you simplify or refactor conditional logic:

$$
\lnot (A \land B) \equiv \lnot A \lor \lnot B
$$

$$
\lnot (A \lor B) \equiv \lnot A \land \lnot B
$$

In plain words:

- Negating an `and` is the same as `or`-ing the individual negations.
- Negating an `or` is the same as `and`-ing the individual negations.

In Zig syntax:

```zig
// These pairs are always equivalent:
const p = !(a and b);  // same as: !a or !b
const q = !(a or b);   // same as: !a and !b
```

You will encounter these most often when you have a leading `!` applied to a compound condition and you want to distribute it inward — for instance, to flip an `if`/`else` branch so the "interesting" path comes first, or to simplify a double negation:

```zig
// Original: "skip if both are invalid"
const skip = !(valid_a and valid_b); // !(A and B)

// Equivalent, sometimes clearer: "skip if either is invalid"
const skip2 = !valid_a or !valid_b;  // !A or !B
```

Both forms produce the same result. Which one to choose comes down to which reads more naturally in context.

## Summary

- `bool` is Zig's boolean type. Its only valid values are `true` and `false`. It occupies one byte in memory.
- **Comparison operators** (`==`, `!=`, `<`, `>`, `<=`, `>=`) take two same-typed values and return a `bool`. The ordering operators apply to integers and floats; `==` and `!=` also apply to `bool`.
- **Logical operators** combine booleans: `and` requires both sides to be `true`; `or` requires at least one; `!` flips a single value. Zig uses the keywords `and` and `or` — **not** `&&` and `||`.
- `!` binds tighter than `and`, which binds tighter than `or`. Use parentheses any time the reading order might be unclear.
- **Short-circuit evaluation** means the right-hand side of `and` is skipped when the left is `false`, and the right-hand side of `or` is skipped when the left is `true`. Put guard conditions on the left to prevent unsafe expressions from ever running.
- **De Morgan's laws**: `!(a and b)` is equivalent to `!a or !b`, and `!(a or b)` is equivalent to `!a and !b`. Use them to simplify conditions with a leading `!`.
