---
title: "`Clone` と `Copy`"
summary: "値の複製方法を分類する二つのトレイト。`Clone` は「明示的な `.clone()` 呼び出しによってコピーを作れる（コストがかかる可能性がある）」ことを表す。`Copy` はより厳格な約束で「この値の複製はビット単位の単純なコピーだ」を意味し、コンパイラが暗黙的に値を複製できるようになる。どの組み込み型がそれぞれを実装しているか、`Copy` に `Clone` が必要な理由、そして `String` が `Clone` であるのに `Copy` でない理由を学ぶ。"
prerequisites:
  - essential/rust/types/size
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "メモリ"]
updated: 2026-05-27
---
