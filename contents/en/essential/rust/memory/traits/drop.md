---
title: "The `Drop` Trait"
summary: "`Drop` lets a type run custom cleanup code the instant a value of that type goes out of scope. You'll see why `Drop` is what makes `Box`, `Vec`, and `String` automatically release their heap memory, how the compiler guarantees `drop` runs exactly once, and why you almost never call `drop` directly — the compiler inserts the call for you at the end of each scope."
prerequisites:
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---

`Drop` is the trait that makes Rust's automatic cleanup work. The compiler inserts a call to `drop` whenever a value's scope ends, and that is the hook where resources — heap memory, file descriptors, locks — are released.

## The trait

```rust
pub trait Drop {
    fn drop(&mut self);
}
```

Implement `Drop` to run custom cleanup when a value goes out of scope:

```rust
struct Guard {
    name: &'static str,
}

impl Drop for Guard {
    fn drop(&mut self) {
        println!("{} released", self.name);
    }
}

fn main() {
    let _a = Guard { name: "lock" };
    let _b = Guard { name: "file" };
} // prints "file released", then "lock released"
```

## When `drop` runs

The compiler inserts `drop` at the end of the block where a value was declared, or at any `return`, `break`, or `?` that exits the scope early.

Variables are dropped in **reverse declaration order** (LIFO). In the example above, `_b` was declared after `_a`, so `_b` is dropped first. This order means a value can always rely on the values it used during construction still being alive when it is dropped.

Fields inside a struct are dropped in **declaration order** *after* the struct's own `drop` method runs.

## You almost never implement `Drop` yourself

Most types do not need a custom `Drop`. The compiler automatically drops each field in turn. You only implement `Drop` yourself when you hold a resource Rust cannot manage on its own — a raw file descriptor, a C library handle, a GPU buffer.

For the most common case — heap memory — `Box<T>`, `Vec<T>`, and `String` already implement `Drop` to free their allocations. You get that cleanup for free by using them.

## You cannot call `drop` explicitly

Calling `value.drop()` directly is a compile error. The compiler must control when `drop` runs so it can guarantee it happens exactly once. Allowing explicit calls would break that guarantee.

To release a resource *before* a scope ends, use the free function `std::mem::drop`:

```rust
let f = std::fs::File::open("data.txt")?;
// ... use f ...
std::mem::drop(f); // closes the file right now
// using f here is a compile error: value was moved
```

`std::mem::drop` takes ownership of the value (moving it into the function), which triggers the normal drop path and satisfies the ownership rules.

## `Drop` and `Copy` are mutually exclusive

`Copy` types are duplicated bitwise whenever used — the compiler makes copies freely, with no tracking of which copy is the "real" one. `Drop` requires exactly one owner to receive exactly one `drop` call. These two requirements are incompatible, so the compiler rejects any type that implements both.
