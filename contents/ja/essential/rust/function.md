---
title: Rustの関数
summary: "`fn name(arg: T, …) -> Ret { … }` でRustの関数を宣言する方法を解説する。パラメータの型注釈は必須で、戻り値の型はデフォルトで `()` になり、本体の最後の式が戻り値となり、`return` は早期脱出のために予約されている。RustのZigとの構文の違い、そしてブロック式のセマンティクスが `let x = if cond { a } else { b };` を自然に書けるようにする仕組みも説明する。"
prerequisites:
  - essential/rust/variable
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

関数はRustの再利用可能なコードの基本単位だ。Zigを書いたことがあれば構文は馴染みやすいが、注釈と戻り値周りにいくつかの重要な違いがある。

## 関数の宣言

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}
```

キーワードは `fn` だ。パラメータの型は常に必須——Rustはそれらを推論しない。戻り値の型は `->` の後に続く。関数が何も返さない場合は `->` 節を完全に省略する。Rustは暗黙的にユニット型（unit type）`()` を使う。

## 暗黙のリターン

関数本体はブロック式（block expression）だ。ブロック内の**最後の式**が戻り値になる——通常のケースでは `return` キーワードは不要だ。

```rust
fn double(n: i32) -> i32 {
    n * 2  // セミコロンなし → この式が戻り値
}
```

セミコロンを付けると式が**文（statement）**になり、値が捨てられる。するとブロックは `()` を返し、関数の宣言した戻り値の型が `()` でない場合は型エラーになる。

```rust
fn double_wrong(n: i32) -> i32 {
    n * 2;  // セミコロン: 値が捨てられ、ブロックは () を返す
    // コンパイルエラー: expected i32, found ()
}
```

この式と文の区別はRustで最初に内面化すべきことの1つだ。ルール: ブロックの末尾にセミコロンがない → その式が戻り値。

## 早期リターン

`return` は早期脱出に使える。

```rust
fn first_even(nums: &[i32]) -> Option<i32> {
    for &n in nums {
        if n % 2 == 0 {
            return Some(n);
        }
    }
    None // 最後の式、暗黙的に返される
}
```

慣用的なRustでは `return` は早期脱出のみに使い、最終値には使わない。

## パラメータと所有権

各パラメータはRustの所有権ルールに従って引数を受け取る。`T` として宣言されたパラメータは値の所有権を取得し、`&T` は借用（読み取り専用）、`&mut T` はミュータブルに借用する。

```rust
fn length(s: &str) -> usize {
    s.len()
}

fn main() {
    let greeting = String::from("hello");
    let n = length(&greeting); // 呼び出し後も greeting は有効
    println!("{greeting} has {n} characters");
}
```

関数シグネチャは完全なコントラクトだ。呼び出し元に何がムーブまたは借用されるかを正確に伝える。

## あらゆる場所のブロック式

`if`、`match`、そして普通のブロックはすべて式なので、関数本体として自然に組み合わせられる。

```rust
fn sign(n: i32) -> &'static str {
    if n > 0 { "positive" } else if n < 0 { "negative" } else { "zero" }
}
```

三項演算子（ternary operator）は不要だ——`if` 自体が値を生成する。

これにより、中間変数なしに複雑な値をインラインで計算できる。

```rust
fn clamp(x: f64, lo: f64, hi: f64) -> f64 {
    if x < lo { lo } else if x > hi { hi } else { x }
}
```

## 発散する関数

常にパニックし、永遠にループし、`std::process::exit` を呼ぶなどして決して返らない関数は、戻り値の型として `!`（*never型*）を持つ。

```rust
fn fatal(msg: &str) -> ! {
    panic!("{msg}");
}
```

コンパイラは `!` が `match` や `if` の任意のブランチで使えることを理解している。そのブランチは値をまったく生成しないからだ。
