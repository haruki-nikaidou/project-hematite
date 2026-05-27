---
title: "`while` and `loop`"
summary: "Rust's unbounded looping constructs: `while cond { … }` runs while a condition holds, `loop { … }` runs forever (until you `break` out of it), and `while let pat = expr { … }` loops as long as a pattern keeps matching. You'll see why `loop` is the only loop that can produce a value (via `break value`) and the idiomatic shapes for retry loops and event loops."
prerequisites:
  - essential/rust/control_flow/if
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---
