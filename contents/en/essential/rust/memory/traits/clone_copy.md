---
title: "`Clone` and `Copy`"
summary: "Two traits that classify how a value can be duplicated. `Clone` says 'a copy can be made, possibly at non-trivial cost' via an explicit `.clone()` call. `Copy` is the stricter promise 'duplicating this value is a trivial bitwise copy', which lets the compiler duplicate values implicitly. You'll see which built-in types implement each, why `Copy` requires `Clone`, and why `String` is `Clone` but not `Copy`."
prerequisites:
  - essential/rust/types/size
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---
