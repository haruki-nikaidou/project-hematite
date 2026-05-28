---
title: 関連型
summary: "*関連型*（associated type）はトレイト内で宣言された型メンバーで、各実装者が一度だけ選ぶものだ。`Iterator` が型パラメータではなく `type Item;` を使う理由、関連型が適切なケースとジェネリックパラメータが適切なケース、そして呼び出しサイトごとに `Iterator<i32>`、`Iterator<String>` などと書く必要をなくす仕組みを学ぶ。"
prerequisites:
  - essential/rust/traits/generic_trait
aliases: []
tags: ["Rust", "ジェネリクス"]
updated: 2026-05-27
---

トレイトはメソッドメンバーと並んで**型メンバー**を持てる。実装者はその型を一度だけ決め、トレイトのあらゆるメソッドが名前でそれを参照できる — 呼び出しサイトごとに山括弧は不要だ。

## 関連型の宣言

トレイト本体で `type Name;` と書き、関連型を宣言する：

```rust
trait Container {
    type Item;

    fn first(&self) -> Option<&Self::Item>;
    fn len(&self) -> usize;
}
```

`Self::Item` は、トレイトを実装する型が持つ関連型を指す。実装者は `Item` に具体的な型を代入する責任がある。

## 関連型を持つトレイトの実装

```rust
struct Stack<T> {
    data: Vec<T>,
}

impl<T> Container for Stack<T> {
    type Item = T;

    fn first(&self) -> Option<&T> {
        self.data.first()
    }

    fn len(&self) -> usize {
        self.data.len()
    }
}
```

`type Item = T;` はこの `impl` における関連型を決定する。このブロック内のあらゆるメソッドは `T`（または `Self::Item`）を直接使える — 山括弧で繰り返す必要はない。

## `Iterator` トレイト

標準ライブラリの `Iterator` が典型例だ：

```rust
trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
    // ...
}
```

`next` は関連型を `Option` でくるんで返す。整数に対するレンジイテレータは `type Item = i32` を持ち、文字列分割イテレータは `type Item = &str` を持つ。これらは異なる具体型だが、同じトレイトが両方を記述する。

## 関連型とジェネリックパラメータの比較

「`self` を別の型に変換する」を二通りで表現する場合を比べてみよう：

```rust
// ジェネリックパラメータ — 呼び出し元が多くの出力型を要求できる
trait Convert<T> {
    fn convert(&self) -> T;
}

// 関連型 — 実装者が一つの出力型を決める
trait IntoOwned {
    type Output;
    fn into_owned(self) -> Self::Output;
}
```

`Convert<T>` では、単一の型が `Convert<f64>`、`Convert<String>`、`Convert<i32>` を同時に実装できる。柔軟な変換トレイトにはそれがまさに求められる。

`IntoOwned` では、各型が持つ `Output` はただ一つだ。それが `Iterator::Item` に求められる性質だ — ベクタのイテレータは `i32` を生成し、ときには `i32`、ときには `String` を生成するわけではない。出力を一型に固定するのは制限ではなく特性だ。

おおまかな指針：

- 同じ型がそのパラメータの複数の異なる選択に対してトレイトを実装することが有益な場合は、**型パラメータ**を使う — 複数の実装が目的だ。
- 各実装者に自然な選択が一つしかない場合は、**関連型**を使う — 型ごとに一つの実装が目的だ。

## 呼び出しサイトの使いやすさ

ジェネリックパラメータを使う場合、イテレータを扱うすべての関数は `I` とアイテム型を別々に名前を挙げなければならないだろう：

```rust
// 仮想的な Iterator<T>
fn sum_all<T, I: Iterator<T>>(iter: I) -> T { ... }
```

関連型を使う場合、アイテム型は暗示される：

```rust
fn sum_all<I: Iterator>(iter: I) -> I::Item { ... }
```

`I::Item` は「`I` のアイテム型」と読む。導入すべき別の型パラメータはない。`Iterator` を使うコードはどこでも、境界を書くたびにこの恩恵を受ける。

## 関連型の制約

関連型には `where` 節で境界を置ける：

```rust
use std::fmt::Display;

fn print_first<I>(iter: I)
where
    I: Iterator,
    I::Item: Display,
{
    if let Some(item) = iter.into_iter().next() {
        println!("{item}");
    }
}
```

`I::Item: Display` は「`I` のアイテム型は `Display` を実装しなければならない」という意味だ。アイテムを印刷できる任意のイテレータに対して動く — 具体的なアイテム型を問わない。

境界の中で関連型を具体的な値に固定することもできる：

```rust
fn sum_ints<I: Iterator<Item = i32>>(iter: I) -> i32 {
    iter.sum()
}
```

`Iterator<Item = i32>` は `I` を `i32` を生成するイテレータに制約する。関連型への境界だけでなく具体的な保証が必要なときの標準的な構文だ。

## まとめ

- **関連型**はトレイト内で `type Name;` で宣言し、`impl` 内で `type Name = T;` で代入する。
- 各実装者は一つの具体型を決める。ジェネリックパラメータとは異なり、同じ型がトレイトを多くの選択肢に対して実装することはできない。
- `Self::Item`（外部からは `I::Item`）が関連型を指す。呼び出しサイトに余分な山括弧は不要だ。
- 複数の実装が有益な場合はジェネリックパラメータ、各型に自然な選択が一つしかない場合は関連型を使う。
- 関連型は `I::Item: Bound` で制約し、`Iterator<Item = i32>` で固定する。
