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
