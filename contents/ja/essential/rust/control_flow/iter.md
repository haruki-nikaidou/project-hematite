---
title: イテレータ
summary: "すべての`for`ループの背後にあるのは`Iterator`トレイト——`fn next(&mut self) -> Option<Self::Item>`というひとつのメソッドが値を一つずつ生成する。イテレータ*アダプター*（`map`・`filter`・`take`・`chain`）が遅延評価でパイプラインを構成する仕組み、*コンシューマー*（`collect`・`sum`・`fold`・`for_each`）がそれを駆動する仕組み、そしてこのスタイルが慣用的でかつ等価な手書きループと同じ速さである理由を学ぶ。"
prerequisites:
  - essential/rust/control_flow/for
  - essential/rust/traits/associated_type
aliases: []
tags: ["Rust", "Iterator"]
updated: 2026-05-27
---

Rustのすべての[`for`](../for/)ループは内部でひとつのメソッドを呼び出している：`next`だ。**`Iterator`**トレイトはこの最小限のインターフェイスを捉えており、標準ライブラリで値のシーケンスを生成するほぼすべてのものがこれを実装している。

## `Iterator` トレイト

このトレイトに必須のメソッドはひとつだ：

```rust
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
```

`next`は各要素に対して`Some(item)`を返し、シーケンスが尽きると`None`を返す。`type Item`はイテレータが生成するものを表す[関連型](../../traits/associated_type/)だ。

`Iterator`を手で実装することはほとんどないが、シグネチャを見ると`for`の仕組みが明快になる：

```rust
let mut iter = vec![10, 20, 30].into_iter();
assert_eq!(iter.next(), Some(10));
assert_eq!(iter.next(), Some(20));
assert_eq!(iter.next(), Some(30));
assert_eq!(iter.next(), None);
```

`for`ループはまさにこの呼び出しシーケンスにデシュガーされる。

## アダプター — 遅延変換

**アダプター**（adapter）は既存のイテレータをラップして新しいイテレータを返す。アダプターは*遅延評価*だ：コンシューマーによって駆動されるまで何も実行されない：

```rust
let v = vec![1, 2, 3, 4, 5];

// まだ何も実行されない — パイプラインを記述しているだけ
let pipeline = v.iter()
    .filter(|&&x| x % 2 == 0)
    .map(|&x| x * 10);
```

よく使われるアダプター：

| アダプター | 生成するもの |
|---------|---------|
| `.map(f)` | `f`で変換された要素 |
| `.filter(pred)` | `pred`が`true`の要素 |
| `.take(n)` | 最初の`n`要素まで |
| `.skip(n)` | 最初の`n`要素を飛ばした残り |
| `.chain(other)` | `self`の要素に続いて`other`の要素 |
| `.enumerate()` | `(インデックス, 要素)`のペア |
| `.zip(other)` | `(self の要素, other の要素)`のペア |
| `.flat_map(f)` | `f`が返す各サブイテレータの要素 |
| `.peekable()` | 消費せずに次の要素を覗けるイテレータ |

アダプターは遅延評価なので、いくつ連鎖させてもヒープへの中間アロケーションは発生しない。

## コンシューマー — パイプラインを駆動する

**コンシューマー**（consumer）はイテレータから要素を引き出し、最終的な結果を生成する：

```rust
let doubled_evens: Vec<i32> = (1..=10)
    .filter(|x| x % 2 == 0)
    .map(|x| x * 2)
    .collect();
// [4, 8, 12, 16, 20]
```

よく使われるコンシューマー：

| コンシューマー | 返すもの |
|----------|---------|
| `.collect::<C>()` | `C: FromIterator`を実装する任意のコレクション |
| `.sum::<T>()` | すべての要素の合計 |
| `.product::<T>()` | すべての要素の積 |
| `.fold(init, f)` | 各要素に`f`を適用して構築した単一の値 |
| `.for_each(f)` | 各要素に`f`を実行する。`()`を返す |
| `.count()` | 要素の数 |
| `.any(pred)` / `.all(pred)` | 短絡評価するブールテスト |
| `.find(pred)` | 最初にマッチした要素（`Option`として） |
| `.position(pred)` | 最初にマッチした要素のインデックス（`Option<usize>`として） |
| `.max()` / `.min()` | 最大/最小の要素（`Option`として） |

`fold`は最も汎用的なコンシューマーで、`sum`・`product`・さらには`collect`さえも内包する：

```rust
let product = (1..=5).fold(1u64, |acc, x| acc * x);
assert_eq!(product, 120);
```

## ゼロコスト抽象化

Rustコンパイラはイテレータチェーンをインライン化し最適化するため、等価な手書きループと同じ機械語を生成する。パイプラインを書いてもパフォーマンスのトレードオフはない：

```rust
// パイプライン
let sum: i32 = v.iter().filter(|&&x| x > 0).map(|&x| x * 2).sum();

// 手動ループ — リリース最適化後は同じアセンブリ
let mut sum = 0i32;
for &x in &v {
    if x > 0 { sum += x * 2; }
}
```

## 独自のイテレータを書く

`next`を実装した型はすべて、トレイトのデフォルト実装を通じてアダプターとコンシューマーのメソッドを無料で得られる：

```rust
struct Countdown(u32);

impl Iterator for Countdown {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.0 == 0 {
            None
        } else {
            self.0 -= 1;
            Some(self.0 + 1)
        }
    }
}

let v: Vec<u32> = Countdown(3).collect();
assert_eq!(v, [3, 2, 1]);
```

`next`だけを実装すれば、`.map`・`.filter`・`.collect`その他すべてが使えるようになる。
