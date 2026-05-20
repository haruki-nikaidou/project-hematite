---
title: Summary of Zig Course
summary: "A review of everything covered in the Zig course — from primitive types to manual memory management and recursive algorithms — and a bridge to the Rust and JavaScript/TypeScript courses ahead."
prerequisites: 
  - basis/cs_with_zig/boolean
  - basis/cs_with_zig/integer
  - basis/cs_with_zig/float
  - basis/cs_with_zig/string
  - basis/cs_with_zig/hashmap
  - basis/cs_with_zig/malloc
  - basis/cs_with_zig/memory_layout
  - basis/cs_with_zig/pointer
  - basis/cs_with_zig/recursive
  - basis/cs_with_zig/condition
  - basis/cs_with_zig/loop
aliases: []
tags: ["Zig"]
updated: 2026-05-20
---

You've worked through the Zig portion of Project Hematite — not because Zig is the destination, but because it strips away abstraction and shows you how computers actually work. This checkpoint steps back and ties the pieces together.

## What the course covered

The Zig course built knowledge in five interconnected areas.

### Data representation

You started with the primitive types that every language ultimately compiles down to:

- **Booleans** — a single bit of information, `true` or `false`, and the comparison and logical operators that produce them.
- **Integers** — fixed-width signed and unsigned values (`i32`, `u64`, etc.). The width determines the value range, overflow behavior is explicit rather than silent, and the choice of type affects both correctness and memory use.
- **Floats** — IEEE 754 representation, the reason floating-point arithmetic surprises newcomers, and when to prefer `f32` versus `f64`.
- **Strings** — not a first-class primitive in Zig, but a slice of bytes. Working with strings directly showed you why character encoding matters and what lies beneath the surface of a "string" in any language.

### Control flow

Conditions and loops are the skeleton of every algorithm:

- `if`/`else` and `switch` let your program take different paths based on data.
- `while` and `for` loops repeat work. These are the iteration building blocks for nearly any processing task.

### Memory

Memory is the largest conceptual investment in the course, and the one that pays off most directly in Rust.

[Memory Layout](/en/cp/basis/cs_with_zig/memory_layout/) taught you that a running program's memory is divided into four regions — code, data, stack, and heap. The **stack** manages local variables automatically: each function call pushes a frame, and returning pops it. The **heap** is a large pool you borrow from explicitly and must return to when done.

[Allocate Heap Memory](/en/cp/basis/cs_with_zig/malloc/) put that model into practice. You used Zig's allocator API to request heap memory, learned about memory leaks (forgetting to free) and use-after-free bugs (accessing freed memory), and saw exactly why these are dangerous.

[Pointer](/en/cp/basis/cs_with_zig/pointer/) connected the stack and heap. A pointer is just a number — a memory address — but it is the fundamental tool for sharing data between parts of a program without copying it.

### Data structures

[Hash Map](/en/cp/basis/cs_with_zig/hashmap/) introduced one of the most widely used data structures in real programs. A hash map stores key-value pairs and retrieves any value in O(1) average time — constant time regardless of how many entries it holds.

### Algorithms and recursion

[Recursion](/en/cp/basis/cs_with_zig/recursive/) taught a technique where a function calls itself on a smaller version of the same problem. The recursive structure mirrors mathematical definitions, uses the call stack to track intermediate results, and requires a base case to prevent infinite descent. You also saw when to prefer a loop instead.

## Why Zig, and why the course ends here

Zig is an explicit language. It does not hide allocation, does not have a garbage collector, and does not shield you from the machine. That transparency made it ideal for teaching the concepts that everything else in this project depends on.

But Zig is not the goal. Project Hematite is a Rust learning course. The Zig chapters served as a controlled environment where you could learn to manage memory by hand — so that when Rust takes over that job automatically, you understand exactly what it is doing for you. The course does not go deeper into Zig; you now know enough about how computers work to move to a language designed for real production use.

## How this carries forward

### Into Rust

Rust's ownership system is a compile-time enforcement of the discipline you practiced in Zig:

| What you did manually in Zig | What Rust does automatically |
|------------------------------|------------------------------|
| Call `allocator.free` when done | Owner goes out of scope → memory freed |
| Not access memory after freeing it | Borrow checker rejects dangling references |
| Not free the same memory twice | Ownership is unique; double-free is a compile error |
| Pass a pointer to share data without copying | Pass a reference `&T` or `&mut T` |

The vocabulary changes — *ownership*, *borrowing*, *lifetimes* — but the underlying model is identical to what you built in Zig. The difference is that the compiler enforces it instead of you.

### Into TypeScript

The connection is less obvious but real. TypeScript operates at a higher level than Zig — it has a garbage collector, dynamic dispatch, and a browser runtime — but the foundations you built still apply:

- **Type thinking**: TypeScript's value is its static type system. Having worked with fixed-width integers, precise float semantics, and strongly typed structs, you'll find TypeScript's type annotations intuitive rather than foreign.
- **Data structures**: JavaScript objects are hash maps under the hood. Your understanding of key hashing, average O(1) lookup, and worst-case behavior applies directly.
- **Algorithmic thinking**: The recursion you practiced in Zig is a language-neutral skill. It works the same way in TypeScript.

## Summary

- **Primitive types**: booleans, fixed-width integers (signed and unsigned), IEEE 754 floats, and strings as byte slices. Each type occupies a known number of bytes and carries specific arithmetic rules.
- **Control flow**: `if`/`else`, `switch`, `while`, and `for` loops are the building blocks of every algorithm.
- **Memory regions**: code, data, stack, and heap. The stack is automatic and fast but limited in size and lifetime. The heap is large and persistent but requires explicit management.
- **Pointers**: values that store memory addresses — the fundamental tool for sharing data without copying and for building structures whose size is not known at compile time.
- **Hash maps**: key-value stores with O(1) average-time lookup, one of the most commonly used data structures in practice.
- **Recursion**: solving a problem by reducing it to a smaller version of itself, stopping at a base case. Unbounded recursion causes a stack overflow.
- **All of this transfers**: to Rust's ownership model, TypeScript's type system, and the algorithmic thinking required in any language.

## What's next

You're ready to branch into the two major tracks this project covers:

- [Introduction to Rust Language](/en/cp/essential/rust/intro/) — Rust is the primary language of Project Hematite. Start here to see how everything you built in Zig maps directly onto Rust's ownership, borrowing, and lifetimes.
- [Introduction to JavaScript & TypeScript](/en/cp/essential/js/intro/) — TypeScript is the most popular programming language as of 2025 and the language of the modern web. Start here if you'll be building web tooling or frontend applications alongside Rust.

You don't have to finish one track before starting the other. Many readers study both in parallel.
