---
title: "`if` Expressions"
summary: "Rust's `if` is an *expression*, not just a statement: every branch produces a value of the same type, and the whole `if`/`else` can be assigned to a binding. You'll see the difference between `if` and `if let`, why omitting `else` is allowed only when the `if` is used as a statement (returning `()`), and the idiomatic 'early return' shape `if cond { return foo; }`."
prerequisites:
  - essential/rust/function
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---
