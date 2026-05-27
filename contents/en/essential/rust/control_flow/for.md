---
title: "`for` Loops"
summary: "The most common iteration shape in Rust: `for x in expr { … }` walks every element of an iterable — a range like `0..n`, a slice like `&v`, an array, or any value with an `IntoIterator` impl. You'll see the three flavours (`for x in v`, `for x in &v`, `for x in &mut v`) and how each relates to ownership of the elements."
prerequisites:
  - essential/rust/control_flow/while_loop
  - essential/rust/types/std/range
  - essential/rust/types/slice
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---
