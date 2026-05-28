---
title: 範囲型
summary: "Rust の範囲（range）式 `a..b`、`a..=b`、`..b`、`a..`、`..` は `std::ops` の `Range*` ファミリーの型の値を生成する。各範囲型が何を含むか、なぜ `Iterator` を実装するか（`for` ループで使える理由）、そして `&v[i..j]` の背後にあるスライシング引数としてどのように機能するかを学ぶ。"
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust", "標準ライブラリ"]
updated: 2026-05-27
---

範囲式は `std::ops` の `Range*` 型の値を生成するリテラルだ。`1..5` と書くことは `Range<i32>` の値を構築する糖衣構文であり、格納・渡し・イテレートできる実際の型だ。

## 範囲型

| 式 | 型 | 意味 |
|------------|------|---------|
| `a..b` | `Range<T>` | 半開区間: a ≤ n < b |
| `a..=b` | `RangeInclusive<T>` | 閉区間: a ≤ n ≤ b |
| `a..` | `RangeFrom<T>` | a ≤ n（上限なし） |
| `..b` | `RangeTo<T>` | n < b（下限なし） |
| `..=b` | `RangeToInclusive<T>` | n ≤ b（下限なし） |
| `..` | `RangeFull` | すべての要素 |

`Range<T>` と `RangeInclusive<T>` がもっとも一般的だ。`Iterator` を実装しているからだ。残りの `RangeTo`・`RangeToInclusive`・`RangeFrom`・`RangeFull` は主にスライスのインデックスとして使われる。

## イテレータとしての範囲

`Range<T>` と `RangeInclusive<T>` は整数型に対して `Iterator` を実装しているため、`for` ループで直接使える：

```rust
for i in 0..5 {
    println!("{i}"); // 0, 1, 2, 3, 4
}

for i in 0..=5 {
    println!("{i}"); // 0, 1, 2, 3, 4, 5
}
```

範囲は `Iterator` なので、任意のイテレータアダプタを呼べる：

```rust
let squares: Vec<i32> = (1..=5).map(|n| n * n).collect(); // [1, 4, 9, 16, 25]
let evens: Vec<i32>   = (0..20).filter(|n| n % 2 == 0).collect();
```

`RangeFrom`（`a..`）は永遠に上に向かってカウントするイテレータでもある。無限ループを避けるには `.take(n)` と組み合わせる：

```rust
let first_five: Vec<i32> = (10..).take(5).collect(); // [10, 11, 12, 13, 14]
```

## スライスインデックスとしての範囲

任意のスライスや `Vec` を範囲でインデックスすると、連続した部分範囲を選択できる。コピーなしで[スライス](../../slice/)参照が生成される：

```rust
let v = vec![10, 20, 30, 40, 50];

let a: &[i32] = &v[1..4];   // [20, 30, 40]        — Range
let b: &[i32] = &v[..3];    // [10, 20, 30]         — RangeTo
let c: &[i32] = &v[3..];    // [40, 50]             — RangeFrom
let d: &[i32] = &v[..];     // [10, 20, 30, 40, 50] — RangeFull
let e: &[i32] = &v[1..=3];  // [20, 30, 40]         — RangeInclusive
```

境界値は実行時にチェックされ、範囲外の場合はパニックする。

## `match` における範囲

`match` における範囲パターンは同じ `..=` 構文を使うが、`Range*` 型とは別物だ — パターン言語の機能であり、値ではない：

```rust
let label = match score {
    0..=49  => "fail",
    50..=69 => "pass",
    70..=89 => "merit",
    _       => "distinction",
};
```

マッチパターン `0..=49` は `RangeInclusive<i32>` を構築しない；純粋にコンパイル時の数値範囲に対する構文的チェックだ。

## まとめ

- `a..b` は `Range<T>`（半開区間）を生成し、`a..=b` は `RangeInclusive<T>`（閉区間）を生成する。
- `Range` と `RangeInclusive` は整数型に対して `Iterator` を実装しており、`for` ループやイテレータアダプタで直接使える。
- `..b`・`a..`・`..=b`・`..` は主にスライスインデックスとして使われ、コピーなしで連続した部分範囲を選択する。
- マッチアームのパターン `a..=b` は範囲のように見えるが別の構文であり、`Range` オブジェクトを構築するのではなく値をテストする。
