---
title: Integer
summary: "Explore Zig's integer type system in depth: arbitrary-width types, numeric literals in different bases, arithmetic operations, overflow behavior across build modes, and safe type casting with `@as`, `@intCast`, and `@truncate`."
prerequisites: 
  - basis/cs_with_zig/prepare_environment
  - basis/cs_with_zig/simple_variable
aliases: []
tags: ["Types"]
updated: 2026-05-13
---

The [Simple Variable](../simple_variable/) checkpoint introduced integer types as one of Zig's fundamental building blocks, and promised a deeper treatment of arithmetic, overflow behavior, and type casting. This checkpoint delivers on that promise. By the end you will know how to pick the right integer type for any situation, write numeric constants in any base, reason about what happens when arithmetic hits a boundary, and move values safely between different integer types.

## The integer type family

You already know the naming pattern: the prefix `u` means unsigned, `i` means signed, and the number that follows is the **bit width** — how many binary digits the type occupies in memory.

What the previous checkpoint didn't mention is that Zig is not limited to a fixed menu of widths. You can use *any* bit width from 0 to 65535. Types like `u1`, `i3`, `u7`, `u24`, `u48`, and `u128` are all perfectly valid. In everyday code, though, you will almost always reach for the standard power-of-two widths:

| Type | Signed | Bit width | Value range |
|------|--------|-----------|-------------|
| `u8` | No | 8 | 0 to 255 |
| `i8` | Yes | 8 | −128 to 127 |
| `u16` | No | 16 | 0 to 65 535 |
| `i16` | Yes | 16 | −32 768 to 32 767 |
| `u32` | No | 32 | 0 to 4 294 967 295 |
| `i32` | Yes | 32 | −2 147 483 648 to 2 147 483 647 |
| `u64` | No | 64 | 0 to ~1.8 × 10¹⁹ |
| `i64` | Yes | 64 | ~±9.2 × 10¹⁸ |
| `u128` | No | 128 | 0 to ~3.4 × 10³⁸ |
| `i128` | Yes | 128 | ~±1.7 × 10³⁸ |

Two platform-dependent types complete the picture:

- **`usize`** — an unsigned integer exactly as wide as a memory address on the current platform: 32 bits on 32-bit systems, 64 bits on 64-bit systems. Zig uses `usize` for array indices, slice lengths, and any value that represents a count of bytes.
- **`isize`** — the signed counterpart of `usize`. You need it when a difference between two indices or addresses might be negative.

> **Choosing a width:** when in doubt, `i32` or `u32` covers most general-purpose arithmetic. Reach for `u8` when the value is byte-sized (a colour channel, an ASCII code), `u64`/`i64` for potentially large values, and `usize` for anything related to memory sizes or array indexing.

## Writing integer literals

An **integer literal** is a number written directly in source code. Zig supports four bases:

| Prefix | Base | Example | Decimal value |
|--------|------|---------|---------------|
| (none) | 10 — decimal | `255` | 255 |
| `0x` | 16 — hexadecimal | `0xFF` | 255 |
| `0o` | 8 — octal | `0o377` | 255 |
| `0b` | 2 — binary | `0b1111_1111` | 255 |

All four of those literals represent the same value — choose whichever base makes the intent clearest. Hexadecimal is natural for colour values, memory addresses, and protocol fields where you think in four-bit groups. Binary is clearest for masks and bit flags.

Underscores may appear anywhere inside a literal (but not at the very start or end) and are silently ignored by the compiler. Use them freely to group digits
 into readable chunks:

```zig
const red:   u32 = 0xFF_00_00;        // RGB colour: full red, no green, no blue
const mask:  u8  = 0b0000_1111;       // lower nibble: bits 0–3 set, bits 4–7 clear
const limit: u64 = 1_000_000_000_000; // one trillion, easier to scan than 1000000000000
```

A literal that has no explicit type annotation has the special compile-time type **`comptime_int`**, which stores values at arbitrary precision and never overflows. The moment you assign the literal to a typed variable, the compiler narrows it and checks that the value fits:

```zig
const x = 9_999_999_999; // comptime_int — fine, no overflow possible yet
const y: u32 = 9_999_999_999; // compile error: value does not fit in u32
```

Because this check happens at compile time, integer literals can never silently overflow — an out-of-range literal is always a compile error.

## Arithmetic operations

Zig provides the standard arithmetic operators for integers:

| Operator | Operation |
|----------|-----------|
| `+` | Addition |
| `-` | Subtraction (binary) or negation (unary) |
| `*` | Multiplication |
| `/` | Division |
| `%` | Remainder |

**Both operands of a binary operation must have the same type.** Zig never silently widens or narrows one side to match the other. Mixing types is a compile error:

```zig
const a: u32 = 100;
const b: u64 = 200;
const c = a + b; // compile error: type mismatch — u32 and u64 are different types
```

**Integer division truncates toward zero** — the fractional part is discarded, not rounded:

```zig
const q1 = 7  / 2;  // 3  (not 3.5, not 4)
const q2 = -7 / 2;  // -3 (truncates toward zero, not -4)
```

The `%` operator returns the **remainder** after division. Its sign always follows the *dividend* — the left-hand operand:

```zig
const r1 =  7 % 3;  //  1
const r2 = -7 % 3;  // -1  (sign follows the dividend −7, not the divisor 3)
```

Zig also provides **bitwise operators** for working directly with the binary representation:

| Operator | Operation |
|----------|-----------|
| `&` | Bitwise AND |
| `\|` | Bitwise OR |
| `^` | Bitwise XOR |
| `~` | Bitwise NOT (unary) |
| `<<` | Left shift |
| `>>` | Right shift |

These are most useful when dealing with hardware registers, network protocols, image data, or any context where individual bits carry independent meaning.

## Overflow and Zig's safety model

**Overflow** occurs when an arithmetic result falls outside the range the type can hold. Adding 1 to a `u8` that already contains 255 produces 256, which does not fit in 8 bits.

How Zig handles this depends on the **build mode** you compile with:

- **Debug** (the default when you run `zig run` or `zig build` without flags) and **ReleaseSafe** — overflow causes a **runtime panic**. The program halts immediately and prints an error. This is intentional: Zig wants you to find overflow bugs loudly during development, not silently in production.
- **ReleaseFast** and **ReleaseSmall** — the overflow checks are removed to improve speed or reduce binary size. The resulting behavior is unspecified; you cannot rely on it for correctness.

### Wrapping arithmetic

Sometimes modular wrap-around is the *intended* behavior — for example, in cyclic counters or certain cryptographic algorithms. Rather than relying on build-mode-dependent behavior, use Zig's **wrapping operators**, which always wrap regardless of build mode:

| Operator | Operation |
|----------|-----------|
| `+%` | Wrapping addition |
| `-%` | Wrapping subtraction |
| `*%` | Wrapping multiplication |

```zig
const std = @import("std");

pub fn main() void {
    const max: u8  = 255;
    const next: u8 = max +% 1; // always 0, in every build mode

    std.debug.print("255 +% 1 = {}\n", .{next}); // 255 +% 1 = 0
}
```

### Saturating arithmetic

When wrap-around would produce a nonsensical result but a panic is also undesirable — adjusting a clamped setting, accumulating a running total that should never exceed a bound — use the **saturating operators**, which clamp the result to the type's minimum or maximum:

| Operator | Operation |
|----------|-----------|
| `+\|` | Saturating addition |
| `-\|` | Saturating subtraction |
| `*\|` | Saturating multiplication |

```zig
const std = @import("std");

pub fn main() void {
    const vol:   u8 = 250;
    const louder: u8 = vol +| 10; // 255 — stays at max, never wraps to 4

    const low:    i8 = -120;
    const lower:  i8 = low -| 20; // -128 — stays at min

    std.debug.print("louder = {}\n", .{louder}); // louder = 255
    std.debug.print("lower  = {}\n", .{lower});  // lower  = -128
}
```

As a rule: use wrapping operators when modular arithmetic is the intent, saturating operators when clamping is the intent, and regular operators (`+`, `-`, `*`) when overflow means a bug in your logic.

## Casting between integer types

Zig never implicitly converts between integer types — every conversion must be written explicitly. Three built-in functions handle this.

### Widening with `@as`

**`@as(T, value)`** coerces `value` to the type `T`. For *widening* — going from a smaller type to a larger one — this is always safe and accepted at compile time:

```zig
const byte: u8  = 200;
const word: u32 = @as(u32, byte); // always safe: 200 always fits in u32
```

`@as` is also the standard way to force a specific type onto a literal when the surrounding context does not already specify one:

```zig
const flags = @as(u16, 0b0000_0001_0000_0000);
```

### Narrowing with `@intCast`

**`@intCast(value)`** converts an integer to the type that the surrounding context expects. Use it when going to a *narrower* type or when changing signedness — situations where the value might not fit. In Debug and ReleaseSafe builds, `@intCast` **panics at runtime** if the source value does not fit in the destination type:

```zig
const big:   i64 = 1_000;
const small: i32 = @intCast(big); // fine: 1 000 fits in i32

const too_big: i64 = 3_000_000_000;
const bad:     i32 = @intCast(too_big); // runtime panic in Debug/ReleaseSafe
```

Writing `@intCast` is a claim: "I know this value fits in the target type." The runtime check in safe builds enforces that
 claim and catches you when you are wrong.

### Bit truncation with `@truncate`

**`@truncate(value)`** fits the value into the destination type by keeping only the low-order bits and discarding the rest. It never panics:

```zig
const word: u16 = 0x1234;
const low:  u8  = @truncate(word); // 0x34 — keeps lower 8 bits, drops 0x12
```

Use `@truncate` only when you explicitly intend to discard the high bits. If you want a guarantee that the high bits are zero (i.e., that the value actually fits), use `@intCast` instead — it will panic in safe builds if they are not.

### Choosing the right tool

| Situation | Tool |
|-----------|------|
| Widen to a larger type | `@as(T, value)` |
| Narrow, want a runtime check that the value fits | `@intCast(value)` |
| Narrow, intentionally discarding the high bits | `@truncate(value)` |

## Summary

- Zig integer types encode sign (`u`/`i`) and bit width directly in the name. You can choose any width from 0 to 65535; the most common are 8, 16, 32, 64, and 128. `usize` and `isize` are platform-sized types used for indices, lengths, and memory sizes.
- Integer literals can be written in decimal, hexadecimal (`0x`), octal (`0o`), or binary (`0b`). Underscores can appear anywhere inside a literal for readability. A bare literal has type `comptime_int` — arbitrary-precision, compile-time-only — and is narrowed to a concrete type only when assigned.
- Arithmetic operators (`+`, `-`, `*`, `/`, `%`) require both operands to have **the same type**. Integer division truncates toward zero. The `%` remainder's sign follows the dividend.
- **Overflow** causes a runtime panic in Debug and ReleaseSafe builds; in ReleaseFast and ReleaseSmall the check is removed. Use wrapping operators (`+%`, `-%`, `*%`) for intentional modular arithmetic, and saturating operators (`` +| ``, `` -| ``, `` *| ``) for intentional clamping — both behave consistently across all build modes.
- Three casting built-ins: `@as(T, v)` for widening, `@intCast(v)` for narrowing with a runtime safety check, and `@truncate(v)` for deliberate bit truncation without a check.
