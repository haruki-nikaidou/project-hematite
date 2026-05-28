---
title: 直和型 — 列挙型
summary: "Rustの直和型：`enum` は*バリアント*の固定リストを宣言し、列挙型の値はそのうちの正確に1つだ。Cスタイルの列挙型、ペイロードを持つバリアントの列挙型、「複数の可能性のうちの1つ」を正確にモデル化する理由、そして値の数がバリアントの値の数の*和*である理由を解説する。"
prerequisites:
  - essential/rust/types/adt
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---

**直和型（sum type）**は値を固定された選択肢の集合のうちの正確に1つにする。Rustでは、直和型は `enum` として表現される。

## 基本的な列挙型

最も単純な列挙型（enum）は、データを持たない名前付きバリアントのリストだ：

```rust
enum Direction {
    North,
    South,
    East,
    West,
}

let heading = Direction::North;
```

これはCやZigの列挙型に似ている：値の集合が固定され完全に既知の名前付き定数だ。

## ペイロードを持つ列挙型

RustのenumがCスタイルのenumと異なるのは、各バリアントがデータを保持できる点だ：

```rust
enum Shape {
    Circle(f64),                         // 半径
    Rectangle(f64, f64),                 // 幅、高さ
    Triangle { base: f64, height: f64 }, // 名前付きフィールド
}
```

各バリアントは独立して保持するデータを決める — またはなしでも構わない。値の作成：

```rust
let c = Shape::Circle(5.0);
let r = Shape::Rectangle(3.0, 4.0);
```

## 列挙型へのマッチング

列挙型のバリアント内のデータにアクセスする唯一の方法は `match` だ。これは**網羅的（exhaustive）**だ：すべてのバリアントを処理する必要がある：

```rust
fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle(r) => std::f64::consts::PI * r * r,
        Shape::Rectangle(w, h) => w * h,
        Shape::Triangle { base, height } => 0.5 * base * height,
    }
}
```

`Shape` に新しいバリアントを追加すると、キャッチオールを持たないすべての `match` はコンパイルに失敗する — コンパイラがチェックリストになる。この網羅性がenumでドメインをモデル化する核心的な理由だ。

## なぜ「直和」か

直和型の値の数は、そのバリアントの値の数の*和*だ。3つのユニットバリアントを持つenumは $1 + 1 + 1 = 3$ 個の可能な値を持つ。`Option<bool>` は $1 + 2 = 3$ 個の可能な値を持つ：`None`、`Some(true)`、または `Some(false)`。この加算関係がこの型ファミリーの名前の由来だ。

## `Option` と `Result`

標準ライブラリの2つのenumは、すべてのRustコードベースに登場する：

```rust
enum Option<T> {
    None,
    Some(T),
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

`Option<T>` は存在するかもしれない値を表す — Rustにおけるnullの置き換えだ。`Result<T, E>` は `T` で成功するか `E` で失敗する可能性のある計算を表す。どちらも両方のケースを明示的に処理することを強制する。

```rust
fn parse_age(s: &str) -> Result<u8, String> {
    s.parse::<u8>().map_err(|e| e.to_string())
}

match parse_age("42") {
    Ok(age)  => println!("age: {age}"),
    Err(msg) => println!("error: {msg}"),
}
```

## 不正な状態を表現不可能にする

列挙型は一度に1つの状態しか取れないため、enumはステートマシンを自然にモデル化する。ネットワーク接続を考えてみよう：

```rust
enum Connection {
    Connecting,
    Connected { peer_addr: std::net::SocketAddr },
    Disconnected { reason: String },
}
```

各バリアント内に関連データを格納することで、接続が確立されていることを確認しない限りピアアドレスにアクセスできない — 型システムが無効なアクセスを防ぐ。ロジックが `peer_addr` を必要とするなら、それを提供する `match` アームが唯一コンパイルが通る場所だ。

このパターン — **不正な状態を表現不可能にする（making invalid states unrepresentable）** — はRustにおける直和型の最も強力な使い方の1つだ。
