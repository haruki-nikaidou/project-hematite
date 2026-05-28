---
title: "`Result<T, E>`"
summary: "`Result<T, E>` is the standard sum type for 'a successful `T` or an error `E`': `Ok(T)` or `Err(E)`. You'll see why Rust handles recoverable errors as values rather than exceptions, how the `?` operator turns `Result`-returning calls into clean linear code, and how `Result` and `Option` interoperate."
prerequisites:
  - essential/rust/types/std/option
aliases: []
tags: ["Rust", "Standard Library"]
updated: 2026-05-27
---

Errors happen — a file may not exist, a network request may time out, a number may not parse. Rust encodes recoverable errors as values rather than exceptions: a function either returns `Ok(T)` with a success value or `Err(E)` with an error. The caller must handle both.

## The definition

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

`T` is the success type; `E` is the error type. A function that might fail annotates its return type:

```rust
fn parse_port(s: &str) -> Result<u16, std::num::ParseIntError> {
    s.parse::<u16>()
}
```

## Matching on a `Result`

Pattern matching handles both outcomes exhaustively:

```rust
match parse_port("8080") {
    Ok(port) => println!("listening on {port}"),
    Err(e)   => eprintln!("bad port: {e}"),
}
```

For the "do something only on error" pattern, `if let Err` is concise:

```rust
if let Err(e) = risky_operation() {
    eprintln!("failed: {e}");
}
```

## The `?` operator

The `?` operator is the primary reason `Result`-based code stays readable. Inside a function that returns `Result<T, E>`, appending `?` to any `Result`-producing expression either unwraps the `Ok` value or immediately returns the `Err`:

```rust
use std::fs;
use std::io;

fn read_username(path: &str) -> Result<String, io::Error> {
    let contents = fs::read_to_string(path)?; // returns Err on failure
    Ok(contents.trim().to_string())
}
```

Without `?`, each step would require an explicit `match`. With it, the happy path reads linearly.

`?` also performs an automatic conversion via `From`: if the expression's error type differs from the function's declared `E`, Rust calls `From::from` to convert it. This lets a single function use `?` on calls with different concrete error types, as long as each one converts into the function's `E`.

## Interoperability with `Option`

[`Option<T>`](../option/) and `Result<T, E>` convert into each other:

| Expression | Converts |
|------------|---------|
| `opt.ok_or(e)` | `Option<T>` → `Result<T, E>` |
| `opt.ok_or_else(\|\| compute_err())` | lazy version |
| `result.ok()` | `Result<T, E>` → `Option<T>` (discards the error) |

`ok_or` is common inside `Result`-returning functions when a step returns `Option`:

```rust
fn first_word(s: &str) -> Result<&str, &str> {
    s.split_whitespace().next().ok_or("empty string")
}
```

## Common methods

**`map`** transforms the `Ok` value without touching `Err`:

```rust
let doubled: Result<i32, _> = "21".parse::<i32>().map(|n| n * 2); // Ok(42)
```

**`map_err`** transforms the `Err` value, useful for normalising error types:

```rust
let result: Result<i32, String> =
    "abc".parse::<i32>().map_err(|e| e.to_string());
```

**`unwrap_or`** returns the `Ok` value or a fallback if `Err`:

```rust
let n: i32 = "bad".parse().unwrap_or(0); // 0
```

**`and_then`** chains a second fallible operation that runs only on `Ok`:

```rust
fn validated_port(s: &str) -> Result<u16, String> {
    s.parse::<u16>()
        .map_err(|e| e.to_string())
        .and_then(|p| {
            if p >= 1024 { Ok(p) } else { Err("port must be ≥ 1024".to_string()) }
        })
}
```

## Summary

- `Result<T, E>` encodes success as `Ok(T)` and failure as `Err(E)`.
- `match` and `if let` destructure `Result` exhaustively.
- `?` in a `Result`-returning function short-circuits to `Err` and auto-converts the error type via `From`.
- `opt.ok_or(e)` converts `Option` to `Result`; `result.ok()` converts back.
- `map`, `map_err`, `and_then`, and `unwrap_or` compose `Result` values without explicit matching.
