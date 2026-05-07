---
title: スタック
summary: 再帰・構文解析・アンドゥ機能の基盤となるLIFOデータ構造。
prerequisites: []
aliases:
  - basis/computer_science/data_structures/stack
tags: [データ構造, コンピュータサイエンス]
updated: 2026-05-01
---

## スタックとは？

**スタック**は**後入れ先出し（LIFO: Last In, First Out）**の原則に従う線形データ構造です。皿を積み重ねるイメージで、追加も取り出しも上から行います。

主な操作は2つです：

| 操作 | 説明 |
|------|------|
| `push` | 要素を上に追加する |
| `pop`  | 上の要素を取り出して返す |

## Rustによる実装

```rust
struct Stack<T> {
    inner: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { inner: Vec::new() }
    }

    fn push(&mut self, item: T) {
        self.inner.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.inner.pop()
    }

    fn peek(&self) -> Option<&T> {
        self.inner.last()
    }

    fn is_empty(&self) -> bool {
        self.inner.is_empty()
    }
}
```

## コールスタック

プログラミング言語は関数呼び出しを追跡するために**コールスタック**を維持します。関数が呼ばれるとスタックフレームがpushされ、returnするとpopされます。深い再帰でスタックオーバーフローが起きるのはこのためです。

## 時間計算量

Rustの`Vec`をバッキングストアとする場合、主要操作はすべて**償却O(1)**で動作します。
