---
title: Introduction to Rust Language
summary: "An introduction to Rust: why it exists, what problem its ownership system solves, and how the memory concepts from the Zig course map directly onto Rust's compile-time safety guarantees."
prerequisites: 
  - basis/cs_with_zig/summary
aliases: []
tags: ["Rust"]
updated: 2026-05-20
---

Rust is the language this project has been building toward since the very first checkpoint. Every concept from the Zig course — stack frames, heap allocation, pointers, type sizes — was preparing you for the mental model Rust is built on. The difference is that in Rust, the compiler enforces what you practiced manually in Zig.

## What Rust is

Rust is a **systems programming language**: it gives you direct control over memory and hardware, compiles to efficient native machine code, and runs without a garbage collector. In that sense it sits in the same category as C and Zig.

What separates Rust from those languages is its **ownership system** — a set of rules the compiler checks at compile time that make memory-safety bugs impossible to ship. In Zig, if you forgot to free heap memory, accessed a freed pointer, or accidentally shared mutable data across threads, nothing stopped you until the program crashed or produced wrong results at runtime. Rust makes those bugs *compile errors*. The program either passes the borrow checker or it doesn't build.

This guarantee has no runtime cost. There is no garbage collector running in the background, no reference counting at every pointer dereference. The safety comes entirely from the compiler's static analysis, which means Rust programs perform at the same level as equivalent C or Zig programs.

## The ownership model

Rust's ownership system rests on three rules that every Rust programmer internalizes quickly:

1. Every value has exactly one **owner** — the variable binding that holds it.
2. When the owner goes out of scope, the value is **dropped** — its memory is freed automatically.
3. Ownership can be **transferred** (moved) to a new owner, at which point the old owner can no longer use it.

These three rules are enough to eliminate memory leaks and double-frees without a garbage collector.

```rust
fn main() {
    let s = String::from("hello"); // s owns the heap allocation
    let t = s;                     // ownership moves to t; s is no longer valid
    println!("{}", t);             // ok
    // println!("{}", s);          // compile error: value moved
}                                  // t goes out of scope here; the heap memory is freed
```

### Borrowing

Transferring ownership every time you want to use a value would make functions nearly unusable. **Borrowing** lets you pass a reference to a value without giving up ownership:

```rust
fn length(s: &String) -> usize { // borrows s; does not take ownership
    s.len()
}

fn main() {
    let s = String::from("hello");
    let n = length(&s); // s is still valid after this call
    println!("{} has {} characters", s, n);
}
```

The borrow checker enforces two rules about references:

- You can have any number of **shared references** (`&T`) at the same time — but no mutations while any shared reference is live.
- You can have exactly one **exclusive reference** (`&mut T`) — and nothing else (not even a read) while it is live.

These rules eliminate data races. If you've ever chased a bug caused by one part of a program silently modifying data while another part is reading it, you know why this matters.

## What the Zig course prepared you for

The mapping from Zig to Rust is direct:

| Zig | Rust |
|-----|------|
| Call `allocator.free` when done | Owner drops → memory freed |
| Don't access after freeing | Borrow checker rejects dangling references |
| Don't free twice | Ownership is unique; double-free is a compile error |
| `*T` raw pointer | `&T` shared reference, `&mut T` exclusive reference |
| `[*]T` pointer to heap array | `Vec<T>` owned heap collection |
| Manually check bounds | Compiler and runtime check bounds; panics on failure |

The mental model you have of the stack, the heap, and pointers translates without change. What changes is who enforces it: in Zig, you; in Rust, the compiler.

## What to expect from this course

The essential Rust course builds your skills in roughly this order:

1. **Variables and types** — Rust's type system is more expressive than Zig's. `struct`, `enum`, and `match` let you model data precisely.
2. **Ownership and borrowing** — the borrow checker in detail. You'll develop intuition for what it allows and why.
3. **Error handling** — Rust uses `Result<T, E>` and the `?` operator. There are no null pointers and no unchecked exceptions.
4. **Traits** — Rust's version of interfaces. Traits define shared behavior that any type can implement, and they underpin generics.
5. **Iterators and closures** — idiomatic Rust prefers iterator chains over raw loops in many contexts.
6. **Concurrency** — ownership and borrowing extend to threads, making data races a compile error.

Each of these builds on the ones before it. Ownership is the hardest to internalize — expect to read the compiler errors carefully the first few times. They are among the best error messages in any language, and they will teach you the rules.
