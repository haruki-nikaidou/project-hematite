---
title: "`for` ループ"
summary: "Rustで最もよく使われるイテレーションの形：`for x in expr { … }` は`0..n`のような範囲、`&v`のようなスライス、配列、あるいは`IntoIterator`を実装する任意の値のすべての要素を走査する。三つの使い方（`for x in v`、`for x in &v`、`for x in &mut v`）とそれぞれが要素の所有権とどう関係するかを学ぶ。"
prerequisites:
  - essential/rust/control_flow/while_loop
  - essential/rust/types/std/range
  - essential/rust/types/slice
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

`for`はシーケンスに変換できる任意の値をイテレートする。単純なループでは[while](../while_loop/)より簡潔に書け、等価なイテレータパイプラインより所有権が明示的だ。

## 範囲のイテレーション

```rust
for i in 0..5 {
    println!("{i}"); // 0, 1, 2, 3, 4
}
```

`0..5`は半開区間の範囲（range）だ：開始を含み、終端を含まない。終端を含めるには`0..=5`を使う。範囲はRustの標準ライブラリに独自の型として存在し、`IntoIterator`を実装しているため、`for`にそのまま渡せる。

## 三種の所有権の形

ループ変数とコレクションの関係は`in`の後ろに何を渡すかで決まる：

| 形式 | コレクションへの影響 | 要素の型 |
|------|-------------------------------|--------------|
| `for x in v` | `v`はムーブ（消費）される | `T` |
| `for x in &v` | `v`はイミュータブルに借用される | `&T` |
| `for x in &mut v` | `v`はミュータブルに借用される | `&mut T` |

```rust
let names = vec!["Alice", "Bob", "Carol"];

// 借用 — ループ後も names は使える
for name in &names {
    println!("{name}");
}

// ムーブ — names は消費される。この後は使えない
for name in names {
    println!("{name}");
}
```

[スライス](../../types/slice/)（`&[T]`）は常に`for x in slice`の形でイテレートする（`slice`はすでに`&[T]`だ）——スライスはデータを所有していないため、値渡しの`IntoIterator`を実装しない。

要素をその場で変更するにはミュータブルに借用する：

```rust
let mut values = vec![1, 2, 3];
for x in &mut values {
    *x *= 2; // &mut i32 越しに代入するため参照外しが必要
}
// values は [2, 4, 6] になる
```

## `for` でのパターンのデストラクチャリング

ループ変数は単なる名前ではなくパターンだ。タプルを直接デストラクチャリングできる：

```rust
let pairs = vec![(1, 'a'), (2, 'b'), (3, 'c')];

for (n, c) in &pairs {
    println!("{n}: {c}");
}
```

## `enumerate` と `zip`

`for`と一緒に、フルパイプラインを組まなくても直接使えるイテレータアダプターが二つある：

```rust
let fruits = ["apple", "banana", "cherry"];

// 各要素と0始まりのインデックスをペアにする
for (i, fruit) in fruits.iter().enumerate() {
    println!("{i}: {fruit}");
}
```

```rust
let nums = [1, 2, 3];
let chars = ['x', 'y', 'z'];

// 二つのコレクションを同時に走査する。短い方で止まる
for (n, c) in nums.iter().zip(chars.iter()) {
    println!("{n}-{c}");
}
```

イテレータアダプターのAPI全体については[イテレータ](../iter/)で扱う。

## `break` と `continue`

`break`はループを即座に終了し、`continue`は現在のイテレーションの残りをスキップする：

```rust
for n in 0..20 {
    if n % 2 == 0 { continue; } // 偶数をスキップ
    if n > 10     { break; }    // n が 10 を超えたら終了
    println!("{n}");
}
```

`loop`と違い、`for`ループは`break value`で値を生成できない——値が必要なら`loop`を使うこと。
