---
title: Standard Input and Output
summary: "Programs need to talk to the outside world. This checkpoint covers Zig's standard I/O — printing to stdout, reading from stdin, parsing numbers from text, and handling the errors that I/O inevitably raises."
prerequisites:
  - basis/cs_with_zig/prepare_environment
  - basis/cs_with_zig/simple_variable
  - basis/cs_with_zig/integer
  - basis/cs_with_zig/string
aliases: []
tags:
  - IO
updated: 2026-05-20
---

Every program you will write needs to communicate with the outside world — displaying results, asking the user for input, or signalling what went wrong. You have already been using `std.debug.print` to watch variables during development, but that function writes to the *error stream*, not to the *output stream* where a real program would send its results. This checkpoint draws the distinction, shows you how to write to and read from the proper streams, and introduces the format specifiers that give you fine-grained control over how values appear on screen.

## The three standard streams

When a process starts, the operating system hands it three open file descriptors:

| Stream | File descriptor | Zig handle | Purpose |
|--------|-----------------|------------|---------|
| **stdin** | 0 | `std.io.getStdIn()` | Input from the terminal (or a pipe) |
| **stdout** | 1 | `std.io.getStdOut()` | Normal program output |
| **stderr** | 2 | `std.io.getStdErr()` | Error messages, diagnostics |

`std.debug.print` writes to **stderr** (fd 2). This is intentional: debug output is kept separate from the program's real results so that shell pipelines and redirects are not polluted by diagnostic noise. For user-facing output, write to **stdout** instead.

## Writing to stdout

`std.io.getStdOut()` returns a `File`. Call `.writer()` on it to obtain a `Writer` — a value that knows how to send bytes into the underlying file.

```zig
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, {s}!\n", .{"world"});
}
```

Two things changed compared to `std.debug.print`:

1. The function returns `!void` — the `!` prefix means it can return an error. Writing to a file is an operation that can fail (the terminal might be closed, a pipe might be broken), so the return type must reflect that possibility.
2. Each write operation is prefixed with `try`. If the write fails, `try` propagates the error to the caller — here that means `main` returns the error to the operating system.

The `print` method on a writer accepts the same format strings you already know. `writeAll` sends raw bytes without any formatting:

```zig
try stdout.writeAll("no formatting needed\n");
```

## Buffered output

Every call to `stdout.print` issues a system call to the OS. System calls are expensive — thousands of times slower than writing to memory. For programs that produce many lines of output, sending one tiny write at a time wastes significant CPU time.

**Buffered I/O** collects writes in a memory buffer and sends them to the OS in larger chunks. Zig provides `std.io.bufferedWriter` for this:

```zig
const std = @import("std");

pub fn main() !void {
    const raw_stdout = std.io.getStdOut();
    var bw = std.io.bufferedWriter(raw_stdout.writer());
    const stdout = bw.writer();

    for (0..5) |i| {
        try stdout.print("line {d}\n", .{i});
    }

    try bw.flush(); // send buffered bytes to the OS
}
```

`bw.flush()` at the end is mandatory — without it, bytes sitting in the buffer are silently discarded when the program exits. Make it a habit: any time you use a buffered writer, flush before you return.

When should you buffer? When the program writes many lines in a tight loop. For a single output or interactive prompts where the user needs to see each line immediately, buffering adds complexity with no benefit.

## Format specifiers

The `print` format string uses `{specifier}` placeholders. You have already seen `{}` (the default) and `{s}` (string). Here is the full set you will use regularly:

| Specifier | Meaning | Example value | Example output |
|-----------|---------|---------------|----------------|
| `{}` | Default format for the type | `42` (`i32`) | `42` |
| `{d}` | Decimal integer | `255` (`u8`) | `255` |
| `{b}` | Binary integer | `255` (`u8`) | `11111111` |
| `{o}` | Octal integer | `255` (`u8`) | `377` |
| `{x}` | Lowercase hex | `255` (`u8`) | `ff` |
| `{X}` | Uppercase hex | `255` (`u8`) | `FF` |
| `{s}` | String (`[]const u8`) | `"hi"` | `hi` |
| `{c}` | `u8` as ASCII character | `65` (`u8`) | `A` |
| `{e}` | Float in scientific notation | `0.001` (`f64`) | `1e-3` |
| `{any}` | Debug-format any value | `.{1, true}` | `{ 1, true }` |

Specifiers can include **width and alignment**. The fill character comes first, then the alignment direction (`<` left, `>` right, `^` centre), then the minimum width:

```zig
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();

    // right-align in a field of width 8, padded with spaces
    try stdout.print("{d:>8}\n", .{42});    //       42
    // left-align
    try stdout.print("{d:<8}\n", .{42});    // 42
    // zero-pad to width 8
    try stdout.print("{d:0>8}\n", .{42});   // 00000042
    // hexadecimal with zero-padding
    try stdout.print("0x{X:0>4}\n", .{255}); // 0x00FF
}
```

You can also control float precision by appending `.N` after the width:

```zig
try stdout.print("{d:.3}\n", .{3.14159}); // 3.142  (3 decimal places)
```

## Reading from stdin

`std.io.getStdIn().reader()` gives you a `Reader` — the input counterpart to a `Writer`. The most common operation is reading one line at a time, up to a delimiter byte:

```zig
const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    var buf: [256]u8 = undefined;

    const maybe_line = try stdin.readUntilDelimiterOrEof(&buf, '\n');
    if (maybe_line) |line| {
        std.debug.print("you typed: {s}\n", .{line});
    } else {
        std.debug.print("stdin was closed before any input arrived\n", .{});
    }
}
```

`readUntilDelimiterOrEof` reads bytes into `buf` until it hits the delimiter (`'\n'` here) or reaches end-of-file. It returns `?[]u8` — an optional slice:

- If it read at least one byte before EOF, it returns `some_slice` (the filled portion of `buf`, not including the delimiter itself).
- If stdin was already at EOF with no bytes read, it returns `null`.

The `if (maybe_line) |line|` syntax unwraps the optional. If `maybe_line` is `null`, the `else` branch runs. If it holds a value, the variable `line` inside the `|…|` captures it.

On most systems the line will end with `\n`. On Windows, lines end with `\r\n` — the slice will still contain the `\r` byte before the `\n`. Trim trailing whitespace with `std.mem.trimRight(u8, line, &.{'\r', '\n'})` when you need a clean string.

### Sizing the buffer

`readUntilDelimiterOrEof` returns `error.StreamTooLong` if the line is longer than your buffer. Choose the buffer size based on what you expect: 256 bytes is enough for most user prompts; for file processing with long lines, use 4096 or more.

## Parsing numbers from text

Input arrives as bytes — a slice of `u8` that represents the characters `"42"` or `"3.14"`, not the integer `42` or the float `3.14`. You must parse the text explicitly.

### Parsing integers

`std.fmt.parseInt(T, str, base)` converts a string to an integer of type `T` using the given base. It returns `T` or an error (`error.InvalidCharacter`, `error.Overflow`):

```zig
const std = @import("std");

pub fn main() !void {
    const text: []const u8 = "42";
    const n: i32 = try std.fmt.parseInt(i32, text, 10);
    std.debug.print("parsed: {d}\n", .{n}); // parsed: 42
}
```

Pass `0` as the base to let the parser detect the base from a prefix (`0x`, `0o`, `0b`) — useful when you want to accept all four bases that Zig literals use.

`try` propagates any parse error. If the text contains a letter where a digit is expected, or the value is too large for `i32`, the function returns an error and `main` exits with that error.

### Parsing floats

`std.fmt.parseFloat(T, str)` converts a string to a float of type `T`:

```zig
const std = @import("std");

pub fn main() !void {
    const text: []const u8 = "3.14";
    const x: f64 = try std.fmt.parseFloat(f64, text);
    std.debug.print("parsed: {d:.2}\n", .{x}); // parsed: 3.14
}
```

Both `parseInt` and `parseFloat` accept leading and trailing whitespace only in `parseFloat` — strip it first with `std.mem.trim` if your input might have spaces.

## Putting it together: a complete interactive program

Here is a small program that prints a prompt, reads a number from the user, and doubles it:

```zig
const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    const stdout = std.io.getStdOut().writer();

    try stdout.writeAll("Enter a number: ");

    var buf: [64]u8 = undefined;
    const maybe_line = try stdin.readUntilDelimiterOrEof(&buf, '\n');
    const line = maybe_line orelse {
        try stdout.writeAll("No input received.\n");
        return;
    };

    const trimmed = std.mem.trimRight(u8, line, &.{'\r', '\n', ' '});
    const n = std.fmt.parseInt(i64, trimmed, 10) catch |err| {
        try stdout.print("Parse error: {}\n", .{err});
        return;
    };

    try stdout.print("{d} doubled is {d}\n", .{ n, n * 2 });
}
```

A few patterns here that are worth noting:

- `maybe_line orelse { … }` is the shorthand for "if `null`, run this block and return". It is equivalent to `if (maybe_line) |l| { line = l; } else { … }` but more concise.
- `catch |err| { … }` catches an error from `parseInt` without propagating it. The `|err|` part binds the error value so you can print or inspect it. This is useful when you want to handle an error locally instead of bubbling it up.
- The prompt `"Enter a number: "` uses `writeAll` with no newline — that keeps the cursor on the same line so the user types right after the prompt.

## Summary

- There are three standard streams: **stdin** (input), **stdout** (normal output), **stderr** (diagnostics). `std.debug.print` writes to stderr; use `std.io.getStdOut().writer()` for user-facing output.
- Obtain a writer with `std.io.getStdOut().writer()` and a reader with `std.io.getStdIn().reader()`. Both operations can fail, so functions that use them typically return `!void`.
- Wrap the writer in `std.io.bufferedWriter` when you emit many lines in a loop. Always call `.flush()` before returning.
- Format specifiers control how values appear: `{d}` decimal, `{x}`/`{X}` hex, `{b}` binary, `{s}` string, `{c}` character. Add width and alignment with `{d:>10}` or zero-padding with `{d:0>8}`.
- Read a line with `reader.readUntilDelimiterOrEof(&buf, '\n')`. The result is `?[]u8` — unwrap it with `if` or `orelse`. Trim `\r\n` from the end before parsing.
- Parse text to integers with `std.fmt.parseInt(T, str, base)` and to floats with `std.fmt.parseFloat(T, str)`. Both return errors on invalid input; use `try` to propagate or `catch` to handle locally.
