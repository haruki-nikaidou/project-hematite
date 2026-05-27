---
title: Type Alignment
summary: "A type's *alignment* is the address boundary one of its values must start on, queryable with `std::mem::align_of`. You'll see why hardware imposes alignment, how the compiler inserts padding between struct fields to satisfy it, why reordering fields can shrink a struct, and the `#[repr(C)]` and `#[repr(packed)]` attributes that change the default layout."
prerequisites:
  - essential/rust/types/size
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---
