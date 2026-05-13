---
title: Float Number
summary: "Explore Zig's floating-point types in depth: how IEEE 754 represents fractional values, the five float widths Zig provides, writing float literals and scientific notation, arithmetic operators, special values (NaN and infinity), precision pitfalls, and safe conversion between float and integer types."
prerequisites: 
  - basis/cs_with_zig/prepare_environment
  - basis/cs_with_zig/simple_variable
  - basis/cs_with_zig/integer
aliases: []
tags: ["Types"]
updated: 2026-05-13
---

The [Simple Variable](../simple_variable/) checkpoint introduced floating-point types alongside integers and promised that a deeper treatment was coming. This checkpoint delivers on that promise. By the end you will understand how floats represent numbers under the hood, how to choose the right float type, what `NaN` and `Inf` really mean, why two floats that look equal sometimes aren't, and how to move values safely between float and integer types.

## What a float actually is

Integers store whole numbers as a fixed pattern of bits, each bit carrying a power-of-two place value. Floats are different. They encode three separate pieces of information in one bit pattern — a **sign**, an **exponent**, and a **significand** (sometimes called the *mantissa*) — in a way that resembles scientific notation in base two.

The dominant standard is **IEEE 754**, which virtually all modern hardware follows and which Zig conforms to. At 64 bits, the layout is:

- 1 bit for the **sign** (0 = positive, 1 = negative)
- 11 bits for the **exponent** (encodes the power of two that scales the number)
- 52 bits for the **significand** (the significant digits in binary)

$$
\text{value} = (-1)^{\text{sign}} \times 2^{\text{exponent} - 1023} \times 1.\overline{\text{significand}}
$$

You do not need to memorise this formula. What matters is the consequence it implies: **a float can only represent a finite set of values**. Any real number that doesn't land exactly on one of those grid points is silently rounded to the nearest representable one. This rounding is the source of the classic surprise:

```zig
const std = @import("std");

pub fn main() void {
    const x: f64 = 0.1 + 0.2;
    std.debug.print("{d}\n", .{x}); // 0.30000000000000004 — not 0.3!
}
```

Both `0.1` and `0.2` are not exactly representable in binary, so each is rounded to the nearest grid point. Adding two rounded values produces a result that is slightly off. This is not a Zig bug — it is fundamental to how IEEE 754 works in every language.

## Zig's float type family

Zig provides five float types. All follow IEEE 754 or its extensions:

| Type | Bit width | Significand bits | Approximate significant decimal digits |
|------|-----------|-----------------|----------------------------------------|
| `f16` | 16 | 10 | ~3–4 |
| `f32` | 32 | 23 | ~7 |
| `f64` | 64 | 52 | ~15–16 |
| `f80` | 80 | 64 | ~18–19 |
| `f128` | 128 | 112 | ~34 |

A few notes on when to reach for each:

- **`f16`** is "half precision". It is mainly used in machine-learning pipelines and GPU shaders where bandwidth matters more than precision. Its representable range is very limited (roughly ±65 504) and it has only 3–4 significant decimal digits, so arithmetic errors accumulate quickly.
- **`f32`** is "single precision" — the standard in graphics, game engines, and embedded systems. It is what most GPU shader languages call `float`.
- **`f64`** is "double precision" — the everyday workhorse. This is what Python's `float`, C's `double`, and Rust's `f64` all mean. **Use `f64` as your default.**
- **`f80`** is the x87 extended-precision format, providing extra headroom for intermediate calculations. It is widely used in scientific computing on x86 but is *not* available on every platform (notably absent on ARM and WebAssembly targets).
- **`f128`** is "quad precision", offering 34 significant decimal digits. It is typically implemented in software rather than hardware, so operations can be orders of magnitude slower. Reach for it only when you genuinely need extreme precision.

```zig
const pi_f32:  f32  = 3.1415927;         // ~7 digits — the last digit is rounded
const pi_f64:  f64  = 3.141592653589793;
const pi_f128: f128 = 3.14159265358979323846264338327950;
```

## Writing float literals

A float literal must contain at least a decimal point *or* an exponent — otherwise the compiler treats it as an integer:

```zig
const a: f64 = 3.0;    // decimal point → float literal
const b: f64 = 3e2;    // exponent only → float literal, value 300.0
const c: f64 = 3.0e2;  // both → float literal, value 300.0
// const d: f64 = 3;   // compile error: 3 is an integer literal, not a float
```

Zig also accepts hexadecimal float literals, which are useful when you need an *exact* binary representation:

```zig
const hex: f32 = 0x1.91eb86p1; // exactly 3.14 in IEEE 754 binary
```

For everyday work, decimal literals are clearer. Hexadecimal floats are a niche tool for low-level numeric code.

Like integer literals, a bare float literal has the special compile-time type **`comptime_float`**, which carries full decimal precision. It is narrowed to a concrete type only when you assign it to a typed variable:

```zig
const tau = 6.283185307179586476925; // comptime_float — full precision at compile time
const tf: f32 = tau;                 // narrowed to ~7 significant digits
const td: f64 = tau;                 // narrowed to ~15–16 significant digits
```

Underscores are allowed anywhere inside a float literal and are silently ignored:

```zig
const planck: f64 = 6.626_070_15e-34; // Planck's constant, easier to read
```

## Arithmetic with floats

Floats support four arithmetic operators:

| Operator | Operation |
|----------|-----------|
| `+` | Addition |
| `-` | Subtraction / unary negation |
| `*` | Multiplication |
| `/` | Division |

There is **no `%` remainder operator for floats**. Use `@mod(a, b)` from the standard library when you need a floating-point remainder — it returns a result with the same sign as the divisor (mathematical modulo), unlike integer `%` which follows the dividend.

As with integers, **both operands of a binary operation must have the same type**. Zig never silently widens or narrows one side:

```zig
const a: f32 = 1.5;
const b: f64 = 2.5;
const c = a + b; // compile error: type mismatch — f32 and f64 are different types
```

Unlike integer division, float division does not truncate: `7.0 / 2.0` is `3.5`. Dividing by float zero does not panic — it produces a special value (covered next).

## Special values: NaN and Inf

IEEE 754 reserves certain bit patterns for values outside the normal number line:

- **`Inf` (positive infinity)** — produced by overflow or by dividing a positive non-zero value by zero.
- **`-Inf` (negative infinity)** — the negative counterpart.
- **`NaN` (Not a Number)** — produced by undefined operations such as `0.0 / 0.0` or taking the square root of a negative number.

```zig
const std = @import("std");

pub fn main() void {
    // Using a runtime variable avoids compile-time evaluation of the divisions.
    var zero: f64 = 0.0;
    _ = &zero;

    std.debug.print("1.0 / 0.0  = {}\n", .{1.0 / zero});   // inf
    std.debug.print("-1.0 / 0.0 = {}\n", .{-1.0 / zero});  // -inf
    std.debug.print("0.0 / 0.0  = {}\n", .{0.0 / zero});   // nan

    const inf: f64 = 1.0 / zero;
    std.debug.print("inf + 1    = {}\n", .{inf + 1.0});     // inf
    std.debug.print("inf - inf  = {}\n", .{inf - inf});     // nan

    const nan: f64 = 0.0 / zero;
    std.debug.print("nan == nan = {}\n", .{nan == nan});    // false!
}
```

The last line is the critical one: **`NaN` is never equal to anything, including itself**. This is a deliberate IEEE 754 rule, and it means you cannot detect NaN with `==`. Use `std.math.isNan(x)` instead:

```zig
const std = @import("std");

pub fn checkNan(x: f64) void {
    if (std.math.isNan(x)) {
        std.debug.print("got NaN!\n", .{});
    }
}
```

Note the asymmetry with integers: dividing an integer by zero panics in Zig (in safe builds). Dividing a float by zero does not panic — it produces `Inf` or `NaN`. Keep this distinction in mind when you are deciding between integer and float types for a given problem.

## Precision and comparison pitfalls

Because every float operation may introduce a tiny rounding error, comparing floats with `==` is almost always the wrong approach:

```zig
const a: f64 = 0.1 + 0.2;
const b: f64 = 0.3;

if (a == b) {
    // This branch is almost certainly NOT taken.
}
```

The idiomatic fix is an **epsilon comparison** — checking whether the absolute difference falls within some acceptable tolerance:

```zig
const std = @import("std");

pub fn main() void {
    const a: f64 = 0.1 + 0.2;
    const b: f64 = 0.3;
    const eps: f64 = 1e-9; // one billionth — adjust to match your precision needs

    if (@abs(a - b) < eps) {
        std.debug.print("close enough\n", .{});
    }
}
```

Choosing the right epsilon depends on the magnitude of your values and how many operations have accumulated rounding error. When values can span many orders of magnitude, a *relative* epsilon is more robust than an absolute one: compare `@abs(a - b) / @abs(b)` rather than `@abs(a - b)` alone.

The standard library provides two ready-made helpers in `std.math`:

```zig
const std = @import("std");

pub fn main() void {
    const a: f64 = 0.1 + 0.2;
    const b: f64 = 0.3;

    // Absolute tolerance: |a - b| < tolerance
    const abs_close = std.math.approxEqAbs(f64, a, b, 1e-9);

    // Relative tolerance: |a - b| < tolerance * |b|
    const rel_close = std.math.approxEqRel(f64, a, b, 1e-9);

    std.debug.print("abs: {}\n", .{abs_close}); // true
    std.debug.print("rel: {}\n", .{rel_close}); // true
}
```

Use `approxEqAbs` when you know the rough scale of your values. Use `approxEqRel` when the values might be very large or very small and you care about relative accuracy.

## Casting between types

Zig never implicitly converts between types. All conversions must be written explicitly with a built-in function.

### Between float types

**`@as(T, value)`** widens a float to a broader type. Widening is always safe — no information is lost:

```zig
const x: f32 = 3.14;
const y: f64 = @as(f64, x); // widening: always exact in terms of the f32 value
```

**`@floatCast(value)`** narrows a float to a smaller type. Precision is silently lost; the result is rounded to the nearest representable value in the target type. There is no runtime panic:

```zig
const x: f64 = 3.141592653589793;
const y: f32 = @floatCast(x); // y is approximately 3.1415927 — precision lost
```

Write `@floatCast` only when you consciously accept the precision loss. If the value might be outside the target type's representable range (beyond about ±3.4 × 10³⁸ for `f32`), the result is `Inf`.

### Between floats and integers

**`@floatFromInt(value)`** converts an integer to a float. For small integers this is exact; for large ones the integer value may be rounded to the nearest representable float:

```zig
const n: i32 = 42;
const f: f64 = @floatFromInt(n); // 42.0 — exact for values this small

const big: i64 = 9_007_199_254_740_993; // 2^53 + 1
const g: f64 = @floatFromInt(big);      // rounded: f64 cannot represent every i64
```

**`@intFromFloat(value)`** converts a float to an integer by **truncating toward zero** — the fractional part is discarded, not rounded. In Debug and ReleaseSafe builds it **panics** if the float is `NaN`, `Inf`, or out of range for the destination integer type:

```zig
const f: f64 = 3.9;
const n: i32 = @intFromFloat(f); // n = 3 — fractional part discarded

const g: f64 = -3.9;
const m: i32 = @intFromFloat(g); // m = -3 — truncates toward zero, not -4

const bad: f64 = 1.0e18;
// const x: i32 = @intFromFloat(bad); // runtime panic: out of range for i32
```

### Casting cheat-sheet

| Situation | Tool |
|-----------|------|
| Widen float to a broader type | `@as(T, value)` |
| Narrow float to a smaller type (precision lost) | `@floatCast(value)` |
| Integer → float | `@floatFromInt(value)` |
| Float → integer (truncates, panics on NaN/Inf/overflow) | `@intFromFloat(value)` |

## Printing floats

The `{}` placeholder used throughout this guide works for floats, but it prints a default representation. Zig's format specifiers give you more control:

```zig
const std = @import("std");

pub fn main() void {
    const x: f64 = 3.141592653589793;

    std.debug.print("{}\n",     .{x}); // 3.141592653589793       (default)
    std.debug.print("{d}\n",    .{x}); // 3.141592653589793       (decimal)
    std.debug.print("{e}\n",    .{x}); // 3.141592653589793e+00   (scientific)
    std.debug.print("{d:.2}\n", .{x}); // 3.14                    (2 decimal places)
    std.debug.print("{d:.6}\n", .{x}); // 3.141593                (6 decimal places)
}
```

The `{d:.N}` specifier limits the output to *N* decimal places. This affects only how the value is displayed — it does not change the precision stored in the variable.

## Summary

- Floats follow the **IEEE 754** standard, encoding a sign, exponent, and significand in a fixed number of bits. They can only represent a finite set of values — most real numbers are stored as the nearest representable approximation.
- Zig provides five float types: `f16`, `f32`, `f64`, `f80`, `f128`. Use **`f64`** as the default. Use `f32` when memory or bandwidth is tight. Use `f128` only when extreme precision is required and you can afford the performance cost.
- Float literals must contain a decimal point or an exponent (or both). A bare float literal has type **`comptime_float`** — arbitrary precision at compile time, narrowed to a concrete type on assignment. Underscores are allowed for readability.
- Arithmetic (`+`, `-`, `*`, `/`) requires both operands to have the **same type**. There is no `%` for floats — use `@mod`. Float division by zero produces `Inf` or `NaN`, not a panic.
- **`NaN` is never equal to anything, including itself.** Use `std.math.isNan(x)` to test for it.
- **Comparing floats with `==` is almost always wrong** due to accumulated rounding error. Use an epsilon comparison with `@abs(a - b) < eps`, or the `std.math.approxEqAbs` / `std.math.approxEqRel` helpers.
- Casting: `@as(T, v)` to widen, `@floatCast(v)` to narrow (precision lost silently), `@floatFromInt(v)` for integer-to-float, and `@intFromFloat(v)` for float-to-integer (truncates toward zero; panics on `NaN`, `Inf`, or out-of-range values in safe builds).