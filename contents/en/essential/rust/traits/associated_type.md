---
title: Associated Types
summary: "An *associated type* is a type member declared inside a trait that each implementor picks once. You'll see why `Iterator` uses `type Item;` instead of a type parameter, when an associated type is the right tool versus a generic parameter, and how this avoids the combinatorial explosion of having to write `Iterator<i32>`, `Iterator<String>`, and so on at every call site."
prerequisites:
  - essential/rust/traits/generic_trait
aliases: []
tags: ["Rust", "Generics"]
updated: 2026-05-27
---
