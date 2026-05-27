---
title: "`Box<T>`"
summary: "`Box<T>` is the simplest owning pointer: it holds a `T` on the heap and frees that heap memory when the `Box` itself is dropped. You'll see how `Box::new` allocates, why `Box<T>` makes recursive types (`enum List { Cons(i32, Box<List>) }`) representable, and how it is the foundational example of RAII-style memory management in Rust."
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/memory/traits/drop
aliases: []
tags: ["Rust", "Standard Library", "Memory"]
updated: 2026-05-27
---
