---
title: "The `Sized` Trait and `?Sized`"
summary: "`Sized` is the marker trait every type with a compile-time-known size automatically implements — the precondition for a value to live on the stack or be passed by value. You'll see why every generic type parameter has an implicit `T: Sized` bound, when to relax it with `T: ?Sized`, and which Rust types are *not* `Sized` (slices `[T]`, `str`, trait objects `dyn Trait`)."
prerequisites:
  - essential/rust/types/size
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---
