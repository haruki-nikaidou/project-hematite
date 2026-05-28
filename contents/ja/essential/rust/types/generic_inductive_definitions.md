---
title: ジェネリックな帰納的定義
summary: "帰納的型を別の型でパラメータ化する方法 — `enum Option<T>`、`enum List<T>`、`struct Pair<A, B>`。`<T>` という型パラメータの構文、ジェネリックな定義がコンパイルは一度だけでもインスタンス化ごとに異なる具体型を生成する理由、そしてこれが型に適用した多相的関数と同じアイデアである点を学ぶ。"
prerequisites:
  - essential/rust/types/inductive_types_intro
aliases: []
tags: ["Rust", "ADT", "ジェネリクス"]
updated: 2026-05-27
---

`IntList`、`StringList`、`FloatList` を別々に書く代わりに、要素型が何であっても動く `List<T>` を一つ書く。**型パラメータ**（type parameter）とは、その型が使われるときに埋められるプレースホルダーだ。

## 構文

型パラメータは型名の後ろ、山括弧内に書く名前だ。

```rust
enum Option<T> {
    None,
    Some(T),
}
```

`T` がプレースホルダーだ。`Option<i32>`、`Option<String>`、`Option<bool>` は一つの定義から生成される三つの異なる具体型だ。

二つのパラメータを持つ構造体：

```rust
struct Pair<A, B> {
    first: A,
    second: B,
}

let p: Pair<i32, &str> = Pair { first: 42, second: "hello" };
```

## ジェネリックな再帰リスト

ジェネリクスと帰納的型がなぜ相性がよいかを示す典型例が、単方向連結リストだ。

```rust
enum List<T> {
    Nil,
    Cons(T, Box<List<T>>),
}
```

`Nil` は空のリスト。`Cons(x, rest)` は `x` を `rest` の先頭に追加する。再帰フィールド `Box<List<T>>` は、あらゆる再帰的帰納型と同じ理由で `Box` が必要だ — コンパイラに有限の既知サイズを与えるためだ。

整数リストと文字列リストを同じ定義で構築できる。

```rust
let ints: List<i32> = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
let strs: List<&str> = List::Cons("a", Box::new(List::Nil));
```

## 定義一つ、具体型は多数

コンパイラが `List<i32>` と `List<&str>` を見ると、それぞれに対して別々の機械語コードを生成する — この処理を**単相化**（monomorphization）と呼ぶ。ジェネリックな定義はテンプレートであり、異なるインスタンス化ごとに具体的な特殊化型が生成される。

つまり Rustのジェネリック型は**型パラメータによる実行時コストがない**。`List<i32>` 向けに生成されるコードは、`List` を `i32` 専用として定義した場合と完全に同じだ。

## ジェネリック型への `impl` ブロック

ジェネリック型にメソッドを追加するには、型パラメータが二箇所に現れる。`impl` の後（導入）と型名の後（使用）だ。

```rust
impl<T> List<T> {
    fn is_empty(&self) -> bool {
        matches!(self, List::Nil)
    }
}
```

`impl` の後の `<T>` は「任意の型 `T` に対して」を意味し、`List` の後の `<T>` は「この `impl` は `List<T>` に適用される」を意味する。両方が必要だ。

## 多相性との対応

ジェネリックな型定義は、ジェネリック関数の型レベル版だ。`fn identity<T>(x: T) -> T` が任意の `T` に対して動くように、`List<T>` は任意の要素型に対して動く。どちらも「型に対してパラメータ化されている」ことを表現している — 関数は項のレベルで、型定義は型のレベルで。同じ単相化のメカニズムが両方に適用される。
