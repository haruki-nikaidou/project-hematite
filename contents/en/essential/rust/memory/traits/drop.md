---
title: "The `Drop` Trait"
summary: "`Drop` lets a type run custom cleanup code the instant a value of that type goes out of scope. You'll see why `Drop` is what makes `Box`, `Vec`, and `String` automatically release their heap memory, how the compiler guarantees `drop` runs exactly once, and why you almost never call `drop` directly — the compiler inserts the call for you at the end of each scope."
prerequisites:
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---
