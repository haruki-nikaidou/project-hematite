---
title: Iterated (Recursive) Inductive Types
summary: "An iterated inductive type is one whose constructors may refer back to the type itself — the classic recursive definitions like singly-linked lists and binary trees. You'll see why Rust requires recursive variants to live behind an indirection (`Box<Self>` or similar) and how that mirrors the recursive definition's structure exactly."
prerequisites:
  - essential/rust/types/inductive_types_intro
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---
