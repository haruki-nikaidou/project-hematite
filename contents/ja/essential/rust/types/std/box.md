---
title: "`Box<T>`"
summary: "`Box<T>` はもっともシンプルな所有ポインタだ：`T` をヒープ上に保持し、`Box` 自体がドロップされるとそのヒープメモリを解放する。`Box::new` がどのようにアロケートするか、`Box<T>` が再帰的な型（`enum List { Cons(i32, Box<List>) }`）を表現可能にする理由、そして Rust における RAII スタイルのメモリ管理の基礎的な例として理解する。"
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/memory/traits/drop
aliases: []
tags: ["Rust", "標準ライブラリ", "メモリ"]
updated: 2026-05-27
---

`Box<T>` は Rust でもっともシンプルな所有ヒープポインタだ。型 `T` の単一の値をヒープ上にアロケートし、`Box` がスコープを抜けると自動的にそのアロケーションを解放する。

## `Box::new` によるアロケーション

```rust
let b = Box::new(42_i32);
println!("{}", *b); // 参照解除して読み出し：42 を表示
```

`Box::new(value)` は `value` をヒープへムーブし、所有する `Box<T>` を返す。`Box` 自体は小さい — ポインタ1つ分 — であり、宣言した場所（スタック、構造体フィールド、別の `Box`）に存在する。

`Box` を通じて読み出すには `*` で参照解除する。多くのコンテキストでは Rust が `Deref` トレイトを通じて自動的に参照解除するため、`*` を書かずに `Box<String>` を `String` が期待される場所でそのまま使える。

## 所有権と `Drop`

`Box<T>` は [`Drop`](../../memory/traits/drop/) を実装している。`Box` がスコープを抜けると、次の順序で2つのことが起きる：

1. 内包する `T` がドロップされる（自身のクリーンアップが先に実行される）。
2. ヒープアロケーションが解放される。

```rust
{
    let b = Box::new(String::from("hello"));
    println!("{b}");
} // String がドロップされ、その後ヒープアロケーションが解放される
```

`Box` はその内容を所有する。`Box` をムーブするとヒープアロケーションの所有権もムーブされる。`Box` をドロップすると解放される — 手動で `free` を呼ぶ必要はない。

## 再帰的な型を表現可能にする

`Box` が*必要*になる主なケースは再帰的帰納型（recursive inductive type）だ。裸の再帰 enum はサイズが無限大になる：

```rust
// error: recursive type `List` has infinite size
enum List {
    Nil,
    Cons(i32, List),
}
```

`Box<T>` のサイズは固定で既知 — ポインタ1つ分だ。再帰するフィールドを `Box` で包むと、コンパイラは具体的なサイズを得られる：

```rust
enum List {
    Nil,
    Cons(i32, Box<List>),
}

let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
```

リストはメモリが許す限り長くできる。チェーン内の各 `Box` は常にポインタ1つ分のスペースしか占めない。

## `Box<dyn Trait>` — ランタイム多相

`Box` は**トレイトオブジェクト**（trait object）を保持できる：コンパイル時に具体的な型が消去されるが、あるトレイトを実装することが保証された値だ：

```rust
trait Animal {
    fn sound(&self) -> &str;
}

struct Dog;
impl Animal for Dog {
    fn sound(&self) -> &str { "woof" }
}

let a: Box<dyn Animal> = Box::new(Dog);
println!("{}", a.sound()); // "woof"
```

`Box<dyn Trait>` は具体的な値をヒープ上に格納し、そのメソッドテーブルへのポインタとともに保持する。これが、具体的な型を静的に知ることができない場合に Rust がランタイム多相を実現する方法だ。トレイトオブジェクトの詳細な仕組みは後で扱う。ここでの要点は、`Box` がヒープアロケートされた型消去済み値の自然なコンテナであることだ。

## まとめ

- `Box::new(x)` は `x` をヒープへムーブし、所有ポインタを返す。
- `Box` がドロップされると、ヒープアロケーションが自動的に解放される。
- `Box<T>` は再帰的帰納型に必須のソリューションだ。
- `Box<dyn Trait>` はランタイム多相を可能にする。
