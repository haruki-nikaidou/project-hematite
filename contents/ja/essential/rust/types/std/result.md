---
title: "`Result<T, E>`"
summary: "`Result<T, E>` は「成功した `T` かエラー `E` か」を表す標準の直和型だ：`Ok(T)` または `Err(E)`。Rust が回復可能なエラーを例外ではなく値として扱う理由、`?` 演算子が `Result` を返す呼び出しをすっきりした線形コードに変える仕組み、そして `Result` と `Option` の相互運用を学ぶ。"
prerequisites:
  - essential/rust/types/std/option
aliases: []
tags: ["Rust", "標準ライブラリ"]
updated: 2026-05-27
---

エラーは起きる — ファイルが存在しないかもしれず、ネットワークリクエストがタイムアウトするかもしれず、数値がパースできないかもしれない。Rust は回復可能なエラーを例外ではなく値としてエンコードする：関数は成功値とともに `Ok(T)` を返すか、エラーとともに `Err(E)` を返す。呼び出し側は両方を処理しなければならない。

## 定義

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

`T` は成功型、`E` はエラー型だ。失敗する可能性のある関数は戻り値の型に注釈をつける：

```rust
fn parse_port(s: &str) -> Result<u16, std::num::ParseIntError> {
    s.parse::<u16>()
}
```

## `Result` に対するパターンマッチ

パターンマッチは両方の結果を網羅的に処理する：

```rust
match parse_port("8080") {
    Ok(port) => println!("listening on {port}"),
    Err(e)   => eprintln!("bad port: {e}"),
}
```

「エラーの場合だけ何かする」というパターンには `if let Err` が簡潔だ：

```rust
if let Err(e) = risky_operation() {
    eprintln!("failed: {e}");
}
```

## `?` 演算子

`?` 演算子は `Result` ベースのコードが読みやすく保たれる主な理由だ。`Result<T, E>` を返す関数の中で、`Result` を生成する式に `?` を付加すると、`Ok` の値をアンラップするか、即座に `Err` を返す：

```rust
use std::fs;
use std::io;

fn read_username(path: &str) -> Result<String, io::Error> {
    let contents = fs::read_to_string(path)?; // 失敗時に Err を返す
    Ok(contents.trim().to_string())
}
```

`?` がなければ、各ステップに明示的な `match` が必要になる。`?` があれば、ハッピーパスが線形に読める。

`?` はさらに `From` を通じた自動変換も行う：式のエラー型が関数で宣言された `E` と異なる場合、Rust は `From::from` を呼んで変換する。これにより、各エラー型が関数の `E` に変換できる限り、単一の関数内で異なる具体的なエラー型を持つ呼び出しに `?` を使える。

## `Option` との相互運用

[`Option<T>`](../option/) と `Result<T, E>` は互いに変換できる：

| 式 | 変換内容 |
|------------|---------|
| `opt.ok_or(e)` | `Option<T>` → `Result<T, E>` |
| `opt.ok_or_else(\|\| compute_err())` | 遅延評価版 |
| `result.ok()` | `Result<T, E>` → `Option<T>`（エラーを捨てる） |

`ok_or` は、あるステップが `Option` を返すときに `Result` を返す関数内でよく使う：

```rust
fn first_word(s: &str) -> Result<&str, &str> {
    s.split_whitespace().next().ok_or("empty string")
}
```

## よく使うメソッド

**`map`** は `Err` に触れずに `Ok` の値を変換する：

```rust
let doubled: Result<i32, _> = "21".parse::<i32>().map(|n| n * 2); // Ok(42)
```

**`map_err`** は `Err` の値を変換する。エラー型を正規化するのに便利だ：

```rust
let result: Result<i32, String> =
    "abc".parse::<i32>().map_err(|e| e.to_string());
```

**`unwrap_or`** は `Ok` の値を返すか、`Err` の場合はフォールバックを返す：

```rust
let n: i32 = "bad".parse().unwrap_or(0); // 0
```

**`and_then`** は `Ok` の場合にのみ実行される第2の失敗しうる操作を連鎖させる：

```rust
fn validated_port(s: &str) -> Result<u16, String> {
    s.parse::<u16>()
        .map_err(|e| e.to_string())
        .and_then(|p| {
            if p >= 1024 { Ok(p) } else { Err("port must be ≥ 1024".to_string()) }
        })
}
```

## まとめ

- `Result<T, E>` は成功を `Ok(T)`、失敗を `Err(E)` でエンコードする。
- `match` と `if let` は `Result` を網羅的に分解する。
- `Result` を返す関数内の `?` は `Err` へ短絡し、`From` を通じてエラー型を自動変換する。
- `opt.ok_or(e)` は `Option` を `Result` に変換し、`result.ok()` は逆に変換する。
- `map`・`map_err`・`and_then`・`unwrap_or` は明示的なマッチなしに `Result` の値を合成する。
