---
title: The Size of a Type
summary: "Every Rust type a value can be stored in has a fixed compile-time size in bytes, queryable with `std::mem::size_of`. You'll see why primitive sizes match their bit width, how structs and enums compute their sizes, and which kinds of types (slices, trait objects) deliberately have *no* statically-known size."
prerequisites:
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-27
---
