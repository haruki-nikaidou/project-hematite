---
title: Ownership
summary: "Ownership is Rust's compile-time mechanism for enforcing RAII automatically. Every value has exactly one owner; when the owner goes out of scope, the value is dropped. You'll see the three ownership rules, how assignment transfers ownership (so the source variable can no longer be used), and why the `Sized`, `Clone`, and `Copy` traits determine which kinds of values transfer this way and which are duplicated implicitly instead."
prerequisites:
  - essential/rust/raii
  - essential/rust/memory/traits/sized
  - essential/rust/memory/traits/clone_copy
aliases: []
tags: ["Rust", "Ownership"]
updated: 2026-05-27
---
