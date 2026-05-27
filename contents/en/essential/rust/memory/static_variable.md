---
title: "`static` Variables"
summary: "A `static` declares a single value that lives in the program's data segment for the entire run of the program. Unlike `const`, a `static` has a fixed memory address you can take a reference to. You'll see when to use `static` (large read-only tables, program-wide handles), why mutable `static`s require `unsafe`, and how `static`s relate to the data region of memory you learned in the Zig course."
prerequisites:
  - essential/rust/variable
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---
