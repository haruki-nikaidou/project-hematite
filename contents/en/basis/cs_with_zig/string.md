---
title: String
summary: "In Zig, a string is a slice of bytes (`[]const u8`). This checkpoint explains how string literals are stored in memory, why the number of bytes is not always the number of visible characters, and how to perform common operations like printing, slicing, comparing, and building strings at runtime."
prerequisites: 
  - basis/cs_with_zig/pointer
  - basis/data_structure/array
aliases: []
tags:
  - Types
  - Strings
updated: 2026-05-16
---

Every program that interacts with users handles text — file paths, error messages, names, commands. In most high-level languages, strings are their own built-in type with special syntax baked deep into the compiler. Zig takes a different route: a string is simply a **slice of bytes**, and that plain foundation turns out to explain a surprising amount of what strings can and cannot do.

## A string is `[]const u8`

You know from [Array](/en/cp/basis/data_structure/array/) that a slice (`[]T`) is a pointer to a block of elements paired with a runtime length. A string in Zig is nothing more than a slice of `u8` bytes where those bytes represent text:

```zig
const greeting: []const u8 = "hello";
```

The `const` in `[]const u8` means you cannot modify the individual bytes through this slice — you can read them but not write to them. A mutable slice `[]u8` would allow modification; more on that later.

That's it. There is no special `String` type, no hidden structure, no extra metadata. A Zig string is a view into a sequence of bytes, and every string operation is an operation on a slice of `u8`.

## String literals and where they live

When you write `"hello"` in source code, the compiler stores those five bytes in the program's **data region** — the segment of memory that holds compile-time constants (described in [Memory Layout](/en/cp/basis/cs_with_zig/memory_layout/)). This region is loaded once when the program starts and stays there until it exits.

The precise type of a string literal is `*const [N:0]u8` — a pointer to a compile-time array of `N` bytes with a **sentinel** of `0` at the end. The `:0` notation means the array is **null-terminated**: the compiler places a zero byte immediately after the last character, even though that byte is not counted in `N`.

```text
"hello"  in memory:

 address: 4000  4001  4002  4003  4004  4005
          ┌─────┬─────┬─────┬─────┬─────┬─────┐
 byte:    │ 104 │ 101 │ 108 │ 108 │ 111 │   0 │
          └─────┴─────┴─────┴─────┴─────┴─────┘
            'h'   'e'   'l'   'l'   'o'  null
```

The null terminator is a convention inherited from the C programming language, where strings had no separate length field and code found the end of a string by scanning for the zero byte. Zig keeps the null terminator for interoperability with C libraries, but Zig code itself typically works with slices that carry their own `.len` — there is no need to scan for the end.

In practice, a `*const [5:0]u8` coerces silently to `[]const u8` wherever you use it, so you rarely see the longer type in everyday code:

```zig
const std = @import("std");

pub fn main() void {
    const s: []const u8 = "hello"; // *const [5:0]u8 coerces to []const u8
    std.debug.print("length: {}\n", .{s.len}); // length: 5
}
```

`.len` returns the number of **bytes**, not the null terminator. A five-character ASCII string has `.len == 5`.

## Printing strings: `{s}` vs `{}`

You have been using `{}` to print numbers and booleans. For strings, use `{s}` — the "string" format specifier:

```zig
const std = @import("std");

pub fn main() void {
    const name: []const u8 = "Zig";
    std.debug.print("Hello, {s}!\n", .{name}); // Hello, Zig!
}
```

Using `{}` on a `[]const u8` would print the slice as a raw sequence of integers rather than readable text. Always use `{s}` when you intend to print human-readable text.

## Bytes and characters: ASCII

For ordinary English text, every character maps to exactly one byte. The correspondence is defined by **ASCII** (American Standard Code for Information Interchange), a 128-entry table that assigns a number between 0 and 127 to each letter, digit, and common symbol:

```text
'A' → 65     'a' → 97     '0' → 48     ' ' → 32
'B' → 66     'b' → 98     '1' → 49     '!' → 33
```

In ASCII, `.len` equals the number of visible characters, and you can treat each byte as exactly one character:

```zig
const std = @import("std");

pub fn main() void {
    const word: []const u8 = "Rust";
    for (word) |byte| {
        std.debug.print("{c} = {d}\n", .{ byte, byte });
        // {c} formats a u8 as a character; {d} formats it as a decimal number
    }
    // R = 82
    // u = 117
    // s = 115
    // t = 116
}
```

## Bytes and characters: UTF-8

ASCII only covers 128 code points — it has no room for accented letters, Han characters, Arabic script, emoji, or the vast majority of human writing. Modern text uses **UTF-8**, an encoding that represents every Unicode character while remaining compatible with ASCII.

The key property of UTF-8: characters outside the ASCII range are encoded as **multiple bytes**. An accented letter might take 2 bytes; a Han character might take 3; an emoji might take 4.

```zig
const std = @import("std");

pub fn main() void {
    const s: []const u8 = "héllo"; // 'é' is a two-byte UTF-8 sequence
    std.debug.print("bytes: {}\n", .{s.len}); // bytes: 6  (not 5!)
}
```

`"héllo"` has five visible characters but six bytes. `.len` reports the byte count, always. If you index into a UTF-8 string with `s[i]`, you get the `u8` at position `i` in the byte sequence — which may be the middle of a multi-byte character, not a meaningful character boundary.

Zig does not hide this complexity behind automatic character abstraction, which is consistent with its design: the language shows you what is actually happening in memory. When you need to iterate over Unicode characters (called *code points*) rather than raw bytes, use `std.unicode.Utf8View`:

```zig
const std = @import("std");

pub fn main() !void {
    const s: []const u8 = "héllo";
    const view = try std.unicode.Utf8View.init(s);
    var iter = view.iterator();
    while (iter.nextCodepoint()) |cp| {
        std.debug.print("U+{X:0>4}\n", .{cp});
    }
    // U+0068  (h)
    // U+00E9  (é)
    // U+006C  (l)
    // U+006C  (l)
    // U+006F  (o)
}
```

For most programs that deal with English or ASCII-only input, working directly with bytes is fine. Whenever the input may contain non-ASCII text, be deliberate: decide whether you need bytes or characters, and choose the right tool.

## Slicing a substring

Because a string is a slice, you can extract a substring using the range syntax you already know:

```zig
const std = @import("std");

pub fn main() void {
    const sentence: []const u8 = "hello world";
    const word: []const u8 = sentence[0..5]; // bytes 0, 1, 2, 3, 4
    std.debug.print("{s}\n", .{word}); // hello
}
```

`sentence[0..5]` produces a new `[]const u8` that points into the same underlying bytes — no copy is made. As with all slice operations, Zig checks the bounds at runtime in Debug and ReleaseSafe builds.

## Comparing strings

The `==` operator compares pointers, not contents. Two separate slices containing identical bytes will still compare as unequal with `==`, because they point to different locations in memory. To test whether two strings have the same content, use `std.mem.eql`:

```zig
const std = @import("std");

pub fn main() void {
    const a: []const u8 = "hello";
    const b: []const u8 = "hello";
    const c: []const u8 = "world";

    std.debug.print("{}\n", .{std.mem.eql(u8, a, b)}); // true
    std.debug.print("{}\n", .{std.mem.eql(u8, a, c)}); // false
}
```

`std.mem.eql(u8, x, y)` first checks that the lengths match, then compares each byte. It returns `true` only if the lengths are equal and every corresponding byte pair is identical.

## Compile-time concatenation

Two string literals can be joined at compile time using the `++` operator. The result is itself a compile-time constant:

```zig
const std = @import("std");

const greeting = "Hello, " ++ "world!";

pub fn main() void {
    std.debug.print("{s}\n", .{greeting}); // Hello, world!
}
```

`++` is only available when both operands are compile-time known. For building strings at runtime — from user input or computed values — you need a different approach.

## Building strings at runtime

When the content of a string is only known while the program is running, you cannot use `++`. Two standard tools cover the common cases.

### Formatting into a fixed buffer

`std.fmt.bufPrint` formats values into a `[]u8` that you supply. It returns a sub-slice of that buffer containing exactly the formatted bytes:

```zig
const std = @import("std");

pub fn main() !void {
    var buf: [64]u8 = undefined;
    const result: []u8 = try std.fmt.bufPrint(&buf, "score: {d}", .{42});
    std.debug.print("{s}\n", .{result}); // score: 42
}
```

The buffer must be large enough. `bufPrint` returns `error.NoSpaceLeft` if the formatted output would exceed the buffer's capacity — `try` propagates that error to the caller. This approach avoids heap allocation entirely, which makes it a good fit for fixed-size output like log lines or fixed-format messages.

### A growable string with `ArrayList(u8)`

When the final length is unknown in advance, use `std.ArrayList(u8)` — a growable list of bytes that behaves like a dynamically sized string builder:

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var buf = std.ArrayList(u8).init(allocator);
    defer buf.deinit();

    try buf.appendSlice("Hello");
    try buf.appendSlice(", ");
    try buf.appendSlice("world!");

    const result: []const u8 = buf.items;
    std.debug.print("{s}\n", .{result}); // Hello, world!
}
```

`buf.items` exposes the current contents as a `[]u8`. You can also write formatted output directly into an `ArrayList(u8)` using `buf.writer()` with `std.fmt.format` — but `appendSlice` is enough for most simple cases.

## Mutable strings

`[]const u8` is a read-only view. A `[]u8` — without `const` — lets you modify the bytes in place:

```zig
const std = @import("std");

pub fn main() void {
    var bytes: [5]u8 = .{ 'h', 'e', 'l', 'l', 'o' };
    const s: []u8 = &bytes;

    s[0] = 'H'; // modify the first byte through the slice
    std.debug.print("{s}\n", .{s}); // Hello
}
```

String literals cannot be used as `[]u8` — they live in read-only memory. To get a mutable byte array, declare it as a `var` local array and take a slice of it, or allocate on the heap with `allocator.alloc(u8, n)`.

## Summary

- A Zig string is a `[]const u8` — a slice of bytes. There is no separate string type.
- String literals have type `*const [N:0]u8` (null-terminated, compile-time constant) and coerce silently to `[]const u8`. They live in the program's data region.
- Print strings with `{s}`. Using `{}` on a byte slice prints raw integers, not text.
- `.len` is the **byte count**. For ASCII text, bytes equal visible characters. For UTF-8 text, one character may span 2–4 bytes. Use `std.unicode.Utf8View` to iterate over characters.
- Slice a substring with `s[start..end]` — no copy, just a new view into the same bytes.
- Compare string contents with `std.mem.eql(u8, a, b)`. The `==` operator compares pointers, not contents.
- Join compile-time strings with `++`. For runtime strings, format into a fixed buffer with `std.fmt.bufPrint` or build dynamically with `std.ArrayList(u8)`.
- `[]u8` (without `const`) is a mutable byte slice; `[]const u8` is read-only. String literals are always read-only.
