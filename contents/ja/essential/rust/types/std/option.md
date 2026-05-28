---
title: "`Option<T>`"
summary: "`Option<T>` は「`T` があるか、何もないか」を表す標準の直和型だ：`Some(T)` は値を持ち、`None` は何も持たない。Rust に `null` がない理由と代わりに型システムで不在を表現する方法、`match`・`if let`・`?` 演算子が `Option` を使いやすくする仕組み、そして便利なヘルパー（`unwrap_or`、`map`、`and_then`）を学ぶ。"
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/pattern_match
aliases: []
tags: ["Rust", "標準ライブラリ"]
updated: 2026-05-27
---

`Option<T>` は Rust における null の代替だ。あらゆる参照を null にして実行時にクラッシュさせる代わりに、Rust は値の不在を型に明示する：`Option<String>` を返す関数は、値付きの `Some(String)` か何も持たない `None` のどちらかを返す。コンパイラは両方を処理することを強制する。

## 定義

`Option<T>` は標準ライブラリで次のように定義されている：

```rust
enum Option<T> {
    None,
    Some(T),
}
```

`None` と `Some` は自動的にスコープに入る — `Option::None` や `Option::Some` と書く必要はない（書いても構わない）。

## `Option` に対するパターンマッチ

`Option` を調べる正規の方法は[パターンマッチ](../../../pattern_match/)だ：

```rust
fn greet(name: Option<&str>) {
    match name {
        Some(n) => println!("Hello, {n}!"),
        None    => println!("Hello, stranger!"),
    }
}
```

`match` は網羅的だ：どちらかのアームが欠けているとコンパイラはコンパイルを拒否する。

「`Some` の場合だけ何かする」というパターンには `if let` が簡潔だ：

```rust
if let Some(n) = name {
    println!("Hello, {n}!");
}
```

## `?` 演算子

`Option<T>` を返す関数の中で、`?` 演算子は `None` の場合に短絡する：`Some` をアンラップするか、即座に `None` を外側の関数から返す。

```rust
fn double_first(numbers: &[i32]) -> Option<i32> {
    let first = numbers.first()?; // スライスが空なら None
    first.checked_mul(2)          // オーバーフローするなら None
}
```

`Option` への `?` は次の糖衣構文だ：

```rust
match value {
    Some(x) => x,
    None    => return None,
}
```

## コンビネータ

`Option` は、明示的な `match` なしにオプショナルな値を変換・合成するための高階メソッドを提供する。

**`map`** は内部の値が存在する場合に変換する：

```rust
let n: Option<i32> = Some(4);
let doubled = n.map(|x| x * 2);            // Some(8)
let nothing: Option<i32> = None;
let still_nothing = nothing.map(|x| x * 2); // None
```

**`and_then`** は自身が `Option` を返す操作を連鎖させる：

```rust
fn parse_and_double(s: &str) -> Option<i32> {
    s.parse::<i32>().ok().and_then(|n| n.checked_mul(2))
}
```

`and_then` は `map` が `Option<Option<T>>` を生成してしまう場合に使う — 結果を自動的にフラット化する。

**`unwrap_or`** はフォールバック値を提供する：

```rust
let value = optional.unwrap_or(0);
```

**`unwrap_or_else`** はフォールバックを遅延評価する。`Some` のときのコストを避けられる：

```rust
let value = optional.unwrap_or_else(|| expensive_default());
```

## `Option` と `Result` の相互変換

`Option` と `Result` は近い仲間だ。`ok_or` はエラーを付加して `None` を `Err` に変換する：

```rust
let value: Result<i32, &str> = Some(42).ok_or("missing"); // Ok(42)
let error: Result<i32, &str> = None.ok_or("missing");     // Err("missing")
```

逆方向では、`Result::ok()` がエラーを捨てて `Option` を返す：

```rust
let opt: Option<i32> = "42".parse::<i32>().ok(); // Some(42)
```

`Result<T, E>` 型の全体像は [Result](../result/) で扱う。

## まとめ

- `Option<T>` は「存在」を `Some(T)`、「不在」を `None` でエンコードする — ヌルポインタはない。
- `match` と `if let` は網羅性チェック付きで `Option` を分解する。
- `Option` を返す関数内の `?` は自動的に `None` へ短絡する。
- `map` は内部値を変換し、`and_then` はオプショナルな操作を連鎖させ、`unwrap_or` はデフォルト値を提供する。
- `ok_or` は `Option` を `Result` に変換し、`Result::ok()` は逆に変換する。
