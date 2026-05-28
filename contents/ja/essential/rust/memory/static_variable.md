---
title: "`static` 変数"
summary: "`static` はプログラムのデータセグメント（data segment）上に配置され、プログラム実行中ずっと存在し続ける単一の値を宣言する。`const` と異なり、`static` は参照を取れる固定のメモリアドレスを持つ。`static` をいつ使うべきか（大きな読み取り専用テーブル、プログラム全体で共有するハンドルなど）、ミュータブルな `static` に `unsafe` が必要な理由、そして `static` が Zig コースで学んだメモリのデータ領域とどう関係するかを学ぶ。"
prerequisites:
  - essential/rust/variable
aliases: []
tags: ["Rust", "メモリ"]
updated: 2026-05-27
---
