---
title: ジェネリックトレイトとトレイト境界
summary: "型パラメータを使ってトレイトをパラメータ化する方法（`trait Convert<T>`）と、ジェネリック関数や型を*トレイト境界*（trait bound）で制約する方法（`fn print<T: Display>(x: T)`）を学ぶ。トレイト境界が静的型検査を犠牲にせずにジェネリックコードを表現豊かにする理由と、`+` や `where` を使った複数境界の組み合わせ方を理解する。"
prerequisites:
  - essential/rust/traits/traits_intro
  - essential/rust/types/generic_inductive_definitions
aliases: []
tags: ["Rust", "ジェネリクス"]
updated: 2026-05-27
---
