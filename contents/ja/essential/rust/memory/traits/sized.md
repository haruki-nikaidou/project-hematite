---
title: "`Sized` トレイトと `?Sized`"
summary: "`Sized` はコンパイル時にサイズが判明しているすべての型が自動的に実装するマーカートレイト（marker trait）で、値をスタック上に置いたり値渡しできたりするための前提条件だ。すべてのジェネリック型パラメータに暗黙的な `T: Sized` 境界が付く理由、`T: ?Sized` で境界を緩和するタイミング、そして `Sized` でない Rust の型（スライス `[T]`、`str`、トレイトオブジェクト `dyn Trait`）を学ぶ。"
prerequisites:
  - essential/rust/types/size
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "メモリ"]
updated: 2026-05-27
---
