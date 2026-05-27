---
title: Iterators
summary: "Behind every `for` loop is the `Iterator` trait — a single `fn next(&mut self) -> Option<Self::Item>` that produces values one at a time. You'll see how iterator *adapters* (`map`, `filter`, `take`, `chain`) compose lazily into pipelines, how *consumers* (`collect`, `sum`, `fold`, `for_each`) drive them, and why this style is both idiomatic and as fast as the equivalent hand-written loop."
prerequisites:
  - essential/rust/control_flow/for
  - essential/rust/traits/associated_type
aliases: []
tags: ["Rust", "Iterator"]
updated: 2026-05-27
---
