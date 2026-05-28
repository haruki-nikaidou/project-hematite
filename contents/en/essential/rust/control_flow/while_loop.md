---
title: "`while` and `loop`"
summary: "Rust's unbounded looping constructs: `while cond { … }` runs while a condition holds, `loop { … }` runs forever (until you `break` out of it), and `while let pat = expr { … }` loops as long as a pattern keeps matching. You'll see why `loop` is the only loop that can produce a value (via `break value`) and the idiomatic shapes for retry loops and event loops."
prerequisites:
  - essential/rust/control_flow/if
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

When you need a loop whose iteration count is not known in advance — or potentially infinite — Rust gives you three constructs: `while`, `loop`, and `while let`.

## `while`

`while` evaluates a condition before each iteration and exits as soon as it is false:

```rust
let mut n = 1;
while n < 100 {
    n *= 2;
}
println!("{n}"); // 128
```

Like [`if`](../if/), the condition must be a `bool`. Rust does not coerce integers or pointers to boolean.

## `loop`

`loop` runs forever until you `break` out of it:

```rust
loop {
    let line = read_line();
    if line == "quit" {
        break;
    }
    process(line);
}
```

Because the compiler knows `loop` always executes at least once, it is the **only** loop construct that can produce a value. Pass the value to `break`:

```rust
let result = loop {
    let candidate = next_candidate();
    if is_valid(candidate) {
        break candidate; // becomes the value of the whole `loop` expression
    }
};
```

`while` and `while let` cannot do this — their condition might be false from the start, so there is no guaranteed value to produce.

## Retry and event loops

`loop` + `break value` is the idiomatic shape for retry patterns:

```rust
let connection = loop {
    match try_connect() {
        Ok(conn) => break conn,
        Err(e) => {
            eprintln!("retrying after error: {e}");
            std::thread::sleep(std::time::Duration::from_secs(1));
        }
    }
};
```

For event loops that should run until a termination signal, `loop` with a `break` condition reads more clearly than a `while` built around a mutable flag.

## `while let`

`while let` loops as long as a pattern continues to match:

```rust
let mut stack = vec![1, 2, 3];
while let Some(top) = stack.pop() {
    println!("{top}");
}
```

`stack.pop()` returns `Option<i32>`: `Some(v)` while elements remain, then `None`. When `pop()` returns `None`, the pattern stops matching and the loop ends.

This is equivalent to a `loop` containing `match` + `break`, but the intent is clearer at a glance. It is the natural companion to `if let` — same desugaring, repeated instead of conditional.

## `continue` and `break` with labels

Nested loops can be hard to break out of. Labels target a specific loop:

```rust
'outer: for row in &grid {
    for &cell in row {
        if cell == target {
            break 'outer; // exits both loops
        }
    }
}
```

Labels start with a single quote and precede the loop keyword. `break 'label value` combines a label with a value for labeled `loop` expressions.
