---
title: "`if` 式"
summary: "Rustの`if`は文ではなく*式*であり、すべての分岐が同じ型の値を生成し、`if`/`else`全体を束縛に代入できる。`if`と`if let`の違い、`else`を省略できるのが`if`を文として使う場合（`()`を返す場合）に限られる理由、そして慣用的な「早期リターン」パターン`if cond { return foo; }`を学ぶ。"
prerequisites:
  - essential/rust/function
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

Rustの`if`は単なる条件文ではなく、値を生成する**式**だ。このひとつの性質が、代入・関数本体・条件ロジックの書き方をすべて変える。

## 基本的な形

条件式は`bool`でなければならない。Rustは整数やポインタなどを自動でブール値に変換しないため、`n`が整数のとき`if n`はコンパイルエラーになる——`if n != 0`と書くこと。

```rust
if temperature > 100.0 {
    println!("too hot");
} else if temperature < 0.0 {
    println!("too cold");
} else {
    println!("just right");
}
```

## 値を生成する式としての `if`

`if`は式なので、その結果を束縛に直接代入できる：

```rust
let label = if n > 0 { "positive" } else { "non-positive" };
```

すべての分岐は同じ型を生成しなければならない。型が一致しない分岐はコンパイルエラーになる：

```rust
let x = if flag { 1 } else { "text" }; // error: expected integer, found `&str`
```

各分岐はブロックであり、ブロックの値は**最後の式**（末尾にセミコロンなし）だ。末尾にセミコロンを付けると式が文になり、ブロックは`()`を返す。宣言された型が`()`でない場合は型エラーになる：

```rust
let x = if flag { 1 } else { 2; }; // error: expected i32, found ()
//                             ^ セミコロンが 2 を捨てる
```

## `else` の省略

`if`を*文*として使う場合——その値が捨てられる場合——`else`分岐を省略できる。if分岐と暗黙のelse省略の両方が`()`を返すので、型が一致する：

```rust
if verbose {
    println!("debug: starting");
}
```

このような形を式として使おうとすると、コンパイラは`else`を要求する：

```rust
let x = if flag { 1 }; // error: `if` may be missing an `else` clause
```

## 早期リターン — ガード節

Rustの[関数](../../function/)では`return`は早期終了にのみ使う。よく使われるパターンが**ガード節**（guard clause）だ：先頭で事前条件を確認し、条件を満たさない場合は即座に抜ける：

```rust
fn parse_positive(s: &str) -> Option<u32> {
    if s.is_empty() {
        return None;
    }
    let n: u32 = s.parse().ok()?;
    if n == 0 {
        return None;
    }
    Some(n)
}
```

ガード節はハッピーパスのネストを浅く保ち、読みやすくする。ループ内では同じイディオムで`return`の代わりに`continue`（現在のイテレーションをスキップ）や`break`（ループを抜ける）を使う。

## `if let`

`if let`はパターンと条件を組み合わせる：パターンがマッチしたときだけブロックが実行される。

```rust
let config: Option<&str> = Some("debug");

if let Some(level) = config {
    println!("log level: {level}");
}
```

これは意味のあるアームが一つの`match`の短縮形だ。`else`を追加してマッチしない場合を処理することもできる：

```rust
if let Some(level) = config {
    println!("log level: {level}");
} else {
    println!("using default log level");
}
```

`if let`も通常の`if`と同じく式なので、両分岐の型が一致していれば結果を束縛に代入できる。`if let`は`Option`・`Result`・ペイロードを持つ列挙型など、特定の一つのバリアントだけに関心がある状況で頻繁に使われる。パターン全般については[パターンマッチング](../../pattern_match/)で扱う。
