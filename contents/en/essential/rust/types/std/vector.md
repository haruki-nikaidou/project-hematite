---
title: "`Vec<T>`"
summary: "`Vec<T>` is Rust's growable heap-allocated array: a contiguous buffer plus a length and capacity. You'll see how `push`, `pop`, and indexing work, how the buffer grows when capacity is exceeded, why `&v[..]` gives you a slice view, and how the `Vec` releases all its memory automatically when it goes out of scope."
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/types/slice
  - essential/rust/memory/traits/drop
aliases: []
tags: ["Rust", "Standard Library", "Memory"]
updated: 2026-05-27
---
