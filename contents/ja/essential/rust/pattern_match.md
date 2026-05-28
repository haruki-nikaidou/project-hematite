---
title: パターンマッチング
summary: "パターンマッチングはRustが代数的データを検査するための主要なツールだ。*パターン*は値の形状をテストしながら、同時にその一部を新しい名前にバインドする。`let`、関数パラメータ、`if let`、`while let` でのパターンの使い方、そして `match` を表現力豊かにする基盤としてのパターンを解説する。"
prerequisites:
  - essential/rust/types/product_type
  - essential/rust/types/sum_type
  - essential/rust/function
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

**パターン（pattern）**は同時に2つのことをする。値が特定の形状を持つかどうかをテストし、その値の一部を名前にバインドする。パターンはRustの中で値が導入されるあらゆる場所に現れる。

## `let` でのパターン

最もシンプルなパターンは名前だ——何にでもマッチし、バインドする。

```rust
let x = 42;
```

タプルやstructは直接デストラクチャ（destructure）できる。

```rust
let (a, b) = (1, 2);

struct Point { x: f64, y: f64 }
let p = Point { x: 3.0, y: 4.0 };
let Point { x, y } = p;
```

## `match` でのパターン

`match` はパターンがその力を発揮する場所だ。各アームは `パターン => 式` という形で、`match` は**網羅的（exhaustive）**——あらゆる可能な値を処理しなければならない。

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn process(msg: Message) {
    match msg {
        Message::Quit           => println!("quit"),
        Message::Move { x, y } => println!("move to {x},{y}"),
        Message::Write(text)   => println!("write: {text}"),
    }
}
```

`Message` にバリアントを追加すると、キャッチオールのない `match` は新しいバリアントを処理するまでコンパイルを拒否する。網羅性がコンパイラをチェックリストに変える。

`match` は**式**でもあり、値を生成する。

```rust
let label = match n {
    0       => "zero",
    1..=9   => "single digit",
    _       => "large",
};
```

ワイルドカード `_` は何にでもマッチし、それを捨てる。

## よくあるパターンの形式

| パターン | マッチする対象 |
|---------|---------|
| `name` | 何でも。`name` にバインド |
| `_` | 何でも。捨てる |
| `42` / `true` / `'a'` | その特定のリテラル |
| `1..=9` | その閉区間の範囲 |
| `(a, b)` | 2要素タプル。`a` と `b` をバインド |
| `Point { x, y }` | struct。フィールドをバインド |
| `Some(v)` | `Some` バリアント。内部をバインド |
| `None` | `None` バリアント |
| `Foo::Bar(x, y)` | ペイロード付きのenumバリアント |

パターンは任意に入れ子にできる。

```rust
match pair {
    (Some(x), Some(y)) if x == y => println!("equal: {x}"),
    (Some(x), _)                 => println!("left: {x}"),
    (_, Some(y))                 => println!("right: {y}"),
    _                            => println!("neither"),
}
```

## ガード

アームはパターンの後に追加条件を付けてマッチを絞り込める。

```rust
match n {
    x if x < 0 => println!("negative: {x}"),
    0           => println!("zero"),
    x           => println!("positive: {x}"),
}
```

ガード `if x < 0` はパターン `x` がすでにマッチした場合にのみ実行される。ガードが失敗しても `match` は終わらない——次のアームに続く。

## `if let` と `while let`

1つのバリアントだけが重要な場合、`if let` は完全な `match` を避けられる。

```rust
if let Some(value) = optional {
    println!("got {value}");
}
```

`while let` はパターンがマッチし続ける間ループする。

```rust
while let Some(top) = stack.pop() {
    println!("{top}");
}
```

どちらも、意味のある1つのアームと `_ => ()` を持つ `match` の糖衣構文（syntactic sugar）だ。

## 関数パラメータでのパターン

パラメータもパターンだ。

```rust
fn first((x, _): (i32, i32)) -> i32 {
    x
}
```

これが必要になることは稀だが、パターンが `let` と `match` だけでなく、値がバインドされるあらゆる場所に現れることを示している。
