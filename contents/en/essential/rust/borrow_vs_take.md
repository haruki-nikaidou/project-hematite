---
title: Borrowing vs. Taking Ownership
summary: "When designing a function that uses a value, you can either *borrow* it (take a reference `&T` or `&mut T` and leave ownership with the caller) or *take* it (accept `T` by value and become its new owner). You'll see the trade-offs — who has to think about lifetimes, who pays the cost of `Drop`, when taking ownership is the right call — and learn the conventions Rust APIs follow."
prerequisites:
  - essential/rust/ownership
  - essential/rust/types/reference
  - essential/rust/visibility
aliases: []
tags: ["Rust", "Ownership"]
updated: 2026-05-27
---

Every parameter in a Rust function signature is a design decision: you choose whether to take ownership of the argument or merely borrow it. The choice determines what the caller must give up, what you can do with the value inside the function, and who is responsible for cleanup.

## Taking by value

A parameter declared as `T` takes **ownership**. The caller's variable is moved into the function (or copied, for [`Copy`](../memory/traits/clone_copy/) types):

```rust
fn greet(name: String) {
    println!("Hello, {name}!");
} // name is dropped here — the heap allocation is freed

let user = String::from("Alice");
greet(user);
// user is no longer valid — it was moved into greet
```

Inside the function, you own the value completely: you can store it in a struct field, return it, transform it, or let it drop at end of scope. The caller gives up their binding when they call the function.

## Borrowing with `&T`

A parameter declared as `&T` **borrows** the value. The function receives a read-only reference; the caller keeps ownership:

```rust
fn greet(name: &str) {
    println!("Hello, {name}!");
}

let user = String::from("Alice");
greet(&user);
println!("{user}"); // still valid — greet only borrowed it
```

No ownership transfers. No `Drop` runs inside the function. The caller's value is unaffected when the function returns.

## Borrowing mutably with `&mut T`

A parameter declared as `&mut T` borrows for exclusive read-write access. The caller still owns the value; the function can modify it through the reference:

```rust
fn shout(s: &mut String) {
    s.make_ascii_uppercase();
}

let mut msg = String::from("hello");
shout(&mut msg);
println!("{msg}"); // "HELLO"
```

Exclusive means exactly that: while the `&mut` reference is live, no other reference to the same value may exist. The borrow checker enforces this statically, which is why `&mut T` parameters can only be passed from a `mut` binding.

## The core trade-offs

The right signature follows from what the function needs to do with the value:

| Need | Signature |
|------|-----------|
| Read without modifying | `&T` |
| Modify in place | `&mut T` |
| Store in a struct field | `T` — you must own it to hold it |
| Return a transformed version built from the input | `T` — consume and produce |
| Return information derived from the input | `&T` — compute without owning |

When in doubt, borrow. Taking ownership imposes a cost on every call site: the caller must give up their value (clone it explicitly if they still need it, or the type must be `Copy`). Borrowing is always cheaper to use at a call site.

## Who pays for `Drop`

Taking ownership makes the function responsible for drop. This is sometimes exactly what you want — a function that intentionally consumes its input:

```rust
impl Builder {
    pub fn build(self) -> Product { todo!() }
}
```

Calling `.build()` finalizes the builder and produces a `Product`. The builder cannot be used again — that's the point. Consuming `self` expresses this intent directly in the type signature.

Borrowing transfers no drop responsibility. The caller's scope still owns the value; drop runs there when the caller's scope ends.

## Lifetimes: the hidden cost of storing a borrow

When a function only uses a reference during its own execution, lifetimes are implicit and inferred by the compiler. But if you need to **store** a borrowed reference in a struct or **return** it from a function, you must annotate lifetimes explicitly:

```rust
struct Cache<'a> {
    data: &'a [u8], // must not outlive its source
}
```

Taking ownership sidesteps this entirely — an owned `Vec<u8>` has no lifetime parameter. If managing lifetimes would be awkward in a particular context, accepting `T` instead of `&T` is sometimes the right trade-off.

## API conventions

Idiomatic Rust APIs follow recognizable patterns:

**Read-only operations** borrow:

```rust
fn display(value: &impl std::fmt::Display) { println!("{value}"); }
fn process(data: &[u8]) { /* ... */ }
```

**Constructors** often take ownership to avoid a copy at the call site:

```rust
pub fn new(name: String) -> Self {
    Self { name }
}
```

**The `impl Into<T>` pattern** lets callers pass a string literal or an existing `String` without forcing either to call `.to_string()`:

```rust
pub fn new(name: impl Into<String>) -> Self {
    Self { name: name.into() }
}
// new("literal") and new(existing_string) both work
```

**Consuming methods** take `self` by value and signal that the value is spent after the call:

```rust
impl Request {
    pub fn send(self) -> Response { todo!() }
}
```

## Summary

- `T` takes ownership: the caller's variable is moved; the function can store, return, or drop the value.
- `&T` borrows for reading: no ownership transfer; the caller's value is unchanged after the call.
- `&mut T` borrows for mutation: exclusive write access, still no ownership transfer.
- Prefer borrowing unless you need to store, forward, or consume the value — taking ownership costs the caller a move or a clone.
- Taking ownership avoids lifetime annotations; storing a borrowed reference in a struct requires them.
- Common conventions: read-only → `&T`; in-place mutation → `&mut T`; store or consume → `T`; flexible constructors → `impl Into<T>`.
