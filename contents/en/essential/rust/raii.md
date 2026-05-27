---
title: Resource Acquisition Is Initialization (RAII)
summary: "RAII is the design pattern that ties a resource's lifetime to a value's lifetime: acquire the resource when the value is created, release it when the value is destroyed. You'll see why this turns 'remember to clean up' into 'let the compiler do it', how `Box`, `Vec`, and file handles all follow the same pattern through `Drop`, and why RAII is the right mental model for the ownership rules you're about to meet."
prerequisites:
  - essential/rust/types/std/box
  - essential/rust/memory/traits/drop
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---
