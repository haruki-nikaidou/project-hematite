---
title: Simple Variable
summary: "Learn what variables are, how to declare them in Zig with `const` and `var`, the four fundamental types (integers, floats, booleans, and pointers), how to print their values, and how Zig's scope rules control where a variable lives."
prerequisites:
  - basis/cs_with_zig/prepare_environment
  - elementry/computer_science/how_programs_work
aliases: []
tags: []
updated: 2026-05-13
---

Variables are the foundation of almost every program. Without them, a program can only do one exact thing — but with variables, it can work with any data, adapt to input, and change its behavior at runtime. In Zig, variables are explicit and strict by design, which makes bugs easier to catch before your code ever runs.

## What is a variable?

A **variable** is a named location in memory that holds a value. You give it a name so you can refer to that value later in your code, rather than writing the same raw number or flag everywhere.

Think of it like a labeled box: the label is the name, the contents are the value, and the shape of the box is the type. The *type* tells the program how many bytes of memory to reserve and how to interpret those bytes.

## Declaring variables in Zig

Zig has two kinds of variable declarations:

- `const` — declares an **immutable binding**: once assigned, the value cannot change.
- `var` — declares a **mutable binding**: the value can be reassigned later.

Both follow the same basic form:

```zig
const name: Type = value;
var   name: Type = value;
```

Notice that the type comes *after* the name, separated by a colon. Here is a concrete example:

```zig
const speed_of_light: u64 = 299_792_458; // immutable, metres per second
var   score: i32 = 0;                    // mutable, starts at zero
score = 100;                             // reassigning is fine for var
```

A few things to note:

- Numeric literals may contain underscores (`299_792_458`) for readability — the compiler ignores them.
- Every variable must be **initialized** at the point of declaration. Zig does not allow you to leave a variable without a value.
- If you declare a `var` and never actually mutate it, the compiler will refuse to compile and tell you to use `const` instead. Zig enforces this to keep code honest.

Prefer `const` by default. Reserve `var` for values that genuinely need to change.

## Simple types at a glance

Zig is a **statically typed** language: every variable has a fixed type that is known at compile time and never changes. Here are the four categories this checkpoint introduces.

### Integers

An **integer** is a whole number with no fractional part. Zig's integer types encode the *sign* and the *bit width* directly in the type name:

| Type | Signed? | Approximate range |
|------|---------|------------------|
| `u8` | No (unsigned) | 0 to 255 |
| `i8` | Yes (signed) | −128 to 127 |
| `u32` | No | 0 to ~4.3 billion |
| `i32` | Yes | ~−2.1 billion to ~2.1 billion |
| `u64` | No | 0 to ~18.4 × 10¹⁸ |
| `i64` | Yes | ~±9.2 × 10¹⁸ |
| `usize` | No | pointer-sized (platform-dependent) |

A **signed** integer can hold negative numbers; an **unsigned** integer cannot, but represents twice as many positive values in the same number of bits. The prefix `u` means unsigned, `i` means signed, and the number is the bit count.

```zig
const max_players: u8    = 255;
var   temperature: i32   = -10;
var   count:       usize = 0;
```

For general-purpose counting, `i32` or `u32` are common choices. You will see `usize` often when indexing arrays. A deeper treatment of integer arithmetic, overflow behavior, and type casting is covered in a later checkpoint.

### Floats

A **float** (or **floating-point number**) represents a real number with a fractional part — values like `3.14`, `-0.5`, or `6.022e23`. Zig's float types encode their precision in the type name:

| Type | Bit width | Significant decimal digits |
|------|-----------|---------------------------|
| `f32` | 32 | ~7 |
| `f64` | 64 | ~15–16 |
| `f128` | 128 | ~34 |

```zig
const pi:          f64 = 3.14159265358979;
var   temperature: f32 = -4.5;
const avogadro:    f64 = 6.022e23;        // scientific notation is valid
```

`f64` is the right default for most work. Use `f32` when memory is tight and the reduced precision is acceptable (common in graphics and embedded systems). Notice that float literals must contain either a decimal point or an exponent — `6.022e23` qualifies without a period.

Floats have important quirks: they cannot represent every real number exactly, and arithmetic results can silently accumulate rounding error. A deeper treatment — covering all of Zig's float types, special values (`NaN`, `Inf`), comparison pitfalls, and type casting — is in the [Float Number](../float/) checkpoint.

### Booleans

A **boolean** (`bool`) holds exactly one of two values: `true` or `false`. Booleans are the natural output of comparisons and the natural input to `if` conditions.

```zig
const is_running: bool = true;
var   has_error:  bool = false;
```

Their full role in branching and logic operators is explored once you reach the control flow checkpoint.

### Pointers

A **pointer** stores the *memory address* of another value, rather than the value itself. In Zig, the type `*T` means "a pointer to a value of type `T`".

```zig
var   x:  i32  = 42;
const px: *i32 = &x;  // px holds the address of x
```

The `&` operator produces the address of a variable. To read or write the value that a pointer refers to, use the `.*` suffix:

```zig
const value = px.*;   // dereference: reads 42 from the address stored in px
```

Pointers are powerful but require care. This checkpoint only introduces their syntax; the semantics — including `*const T` versus `*T`, null safety, and pointer arithmetic — are covered in the pointers checkpoint, which lists this one as a prerequisite.

## Printing a variable

The simplest way to observe a variable's value during development is to print it. Zig's standard library provides `std.debug.print`, which writes directly to the standard error stream with no additional setup required.

```zig
const std = @import("std");

pub fn main() void {
    const score: i32 = 42;
    std.debug.print("score = {}\n", .{score});
}
```

Running this program outputs:

```
score = 42
```

Breaking down what each part does:

- `@import("std")` loads the standard library and binds it to the name `std`.
- The first argument to `std.debug.print` is a **format string**. The `{}` placeholder is replaced by the corresponding variable's value.
- The second argument, `.{score}`, is an **anonymous struct literal** — Zig's way of passing a variable-length list of values to the formatter.
- `\n` is a newline character, moving the cursor to the next line.

The same `{}` placeholder works for all simple types:

```zig
const std = @import("std");

pub fn main() void {
    const flag: bool = true;
    var   x:    i32  = 7;
    const pi:   f64  = 3.14;
    const px:   *i32 = &x;

    std.debug.print("flag  = {}\n",  .{flag});  // flag  = true
    std.debug.print("x     = {}\n",  .{x});     // x     = 7
    std.debug.print("pi    = {}\n",  .{pi});    // pi    = 3.14
    std.debug.print("px    = {}\n",  .{px});    // px    = (a memory address)
    std.debug.print("px.*  = {}\n",  .{px.*});  // px.*  = 7
}
```

## Scope

Every variable in Zig lives within a **scope** — the block of code where it is visible and valid. Scopes are delimited by curly braces `{` and `}`.

```zig
pub fn main() void {
    const a: i32 = 1;     // 'a' lives in the outer scope

    {
        const b: i32 = 2; // 'b' lives in this inner scope
        _ = a;            // outer variables are visible inside
        _ = b;
    }                     // 'b' is destroyed here

    _ = a;                // 'a' is still alive
    // _ = b;             // ERROR: 'b' is not in scope here
}
```

> `_ = expr;` is Zig's way of explicitly discarding a value. The compiler requires that every computed value is either used or explicitly discarded, so you will see this pattern in examples that focus on scope rather than on what the variables actually do.

When execution leaves a scope, all variables declared inside it are **destroyed**. This is not only a visibility rule — it determines the *lifetime* of values, which becomes critically important when you start working with pointers and memory allocation.

Three rules to keep in mind:

- An **inner scope can read variables from outer scopes**.
- An **outer scope cannot see variables from inner scopes**.
- **Shadowing** — declaring a new variable with the same name as one in an outer scope — is allowed in Zig, but use it sparingly. It can easily hide bugs.

## Summary

- A **variable** is a named memory location that holds a typed value.
- `const` declares an immutable binding; `var` declares a mutable one. Prefer `const` by default.
- The type annotation comes after the name: `const x: i32 = 0;`. Every variable must be initialized.
- Four core types at this stage:
  - **Integers** (`i32`, `u32`, `usize`, …) — whole numbers with explicit sign and width.
  - **Floats** (`f32`, `f64`, …) — real numbers with a fractional part; not every value is representable exactly.
  - **Booleans** (`bool`) — `true` or `false`.
  - **Pointers** (`*T`) — the memory address of a value of type `T`.
- Use `std.debug.print("{}\n", .{x})` to print any simple variable's value to stderr.
- Variables live within **scopes** bounded by `{ }`. Inner scopes see outer variables; outer scopes do not see inner variables. A variable is destroyed when its scope ends.
