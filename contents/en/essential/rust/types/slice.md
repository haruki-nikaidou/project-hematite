---
title: Slices
summary: "A slice `[T]` is a contiguous run of `T` values whose length is not known at compile time, almost always handled through a *slice reference* `&[T]` or `&mut [T]` — a fat pointer holding both an address and a length. You'll see how slices generalise references, why `&str` is just a slice of UTF-8 bytes, and how indexing and iteration work on them."
prerequisites:
  - essential/rust/types/reference
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---
