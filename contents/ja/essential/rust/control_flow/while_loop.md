---
title: "`while` と `loop`"
summary: "Rustの無限ループ構文：`while cond { … }` は条件が成立する間実行され、`loop { … }` は`break`するまで永遠に実行され、`while let pat = expr { … }` はパターンがマッチし続ける間ループする。`loop`だけが値を生成できる理由（`break value`を通じて）と、リトライループやイベントループの慣用的な形を学ぶ。"
prerequisites:
  - essential/rust/control_flow/if
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

イテレーション回数が事前にわからない——あるいは無限になりうる——ループが必要なとき、Rustは三つの構文を提供する：`while`、`loop`、そして`while let`だ。

## `while`

`while`は各イテレーションの前に条件を評価し、条件が偽になった時点で終了する：

```rust
let mut n = 1;
while n < 100 {
    n *= 2;
}
println!("{n}"); // 128
```

[`if`](../if/)と同様に、条件は`bool`でなければならない。Rustは整数やポインタを自動でブール値に変換しない。

## `loop`

`loop`は`break`するまで永遠に実行される：

```rust
loop {
    let line = read_line();
    if line == "quit" {
        break;
    }
    process(line);
}
```

コンパイラは`loop`が必ず少なくとも一度実行されることを把握しているため、`loop`は値を生成できる**唯一**のループ構文だ。`break`に値を渡す：

```rust
let result = loop {
    let candidate = next_candidate();
    if is_valid(candidate) {
        break candidate; // `loop` 式全体の値になる
    }
};
```

`while`と`while let`はこれができない——条件が最初から偽の可能性があるため、生成する値が保証されない。

## リトライループとイベントループ

`loop` + `break value`はリトライパターンの慣用的な形だ：

```rust
let connection = loop {
    match try_connect() {
        Ok(conn) => break conn,
        Err(e) => {
            eprintln!("retrying after error: {e}");
            std::thread::sleep(std::time::Duration::from_secs(1));
        }
    }
};
```

終了シグナルが来るまで実行し続けるイベントループには、ミュータブルなフラグを使った`while`より、`break`条件を持つ`loop`の方が意図が明確に読める。

## `while let`

`while let`はパターンがマッチし続ける間ループする：

```rust
let mut stack = vec![1, 2, 3];
while let Some(top) = stack.pop() {
    println!("{top}");
}
```

`stack.pop()`は`Option<i32>`を返す：要素がある間は`Some(v)`、なくなると`None`だ。`pop()`が`None`を返すとパターンのマッチが止まり、ループが終了する。

これは`loop`の中に`match` + `break`を書いたものと等価だが、一目で意図が伝わる。`if let`の自然な仲間といえる——同じデシュガーを繰り返し行う形だ。

## `continue` と `break` のラベル付き使用

入れ子になったループを抜け出すのは難しいことがある。ラベルを使うと特定のループを指定できる：

```rust
'outer: for row in &grid {
    for &cell in row {
        if cell == target {
            break 'outer; // 両方のループを抜ける
        }
    }
}
```

ラベルはシングルクォートで始まり、ループキーワードの前に置く。`break 'label value`でラベルと値を組み合わせ、ラベル付き`loop`式で値を生成できる。
