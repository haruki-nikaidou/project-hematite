---
title: 関連型
summary: "*関連型*（associated type）はトレイト内で宣言された型メンバーで、各実装者が一度だけ選ぶものだ。`Iterator` が型パラメータではなく `type Item;` を使う理由、関連型が適切なケースとジェネリックパラメータが適切なケース、そして呼び出しサイトごとに `Iterator<i32>`、`Iterator<String>` などと書く必要をなくす仕組みを学ぶ。"
prerequisites:
  - essential/rust/traits/generic_trait
aliases: []
tags: ["Rust", "ジェネリクス"]
updated: 2026-05-27
---
