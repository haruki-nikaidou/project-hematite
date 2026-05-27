---
title: References as Types
summary: "Rust's reference types `&T` and `&mut T` are the direct analog of Zig's `*T`: a value that stores another value's address. This checkpoint introduces references purely as *types* — how to form them with `&`/`&mut`, how to read through them with `*`, and how they compare to raw pointers. The compile-time rules that govern when a reference is *valid* (the borrow checker) come later."
prerequisites:
  - essential/rust/types/general_type_intro
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---
