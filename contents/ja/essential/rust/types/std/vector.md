---
title: "`Vec<T>`"
summary: "`Vec<T>` は Rust の伸長可能なヒープアロケートされた配列だ：連続したバッファと長さおよびキャパシティを持つ。`push`・`pop`・インデックスアクセスの仕組み、キャパシティを超えたときのバッファ成長の仕組み、`&v[..]` がスライスビューを与える理由、そしてスコープを抜けると `Vec` がメモリを自動解放する仕組みを学ぶ。"
prerequisites:
  - essential/rust/types/generic_inductive_definitions
  - essential/rust/types/slice
  - essential/rust/memory/traits/drop
aliases: []
tags: ["Rust", "標準ライブラリ", "メモリ"]
updated: 2026-05-27
---

`Vec<T>` は Rust の汎用の伸長可能なシーケンスだ。内部的には3つのフィールドで構成される：ヒープアロケートされたバッファへのポインタ、**長さ**（present な要素の数）、**キャパシティ**（再アロケーション前に格納できる要素の数）。Rust におけるコンテナ作業の多くは `Vec` から始まる。

## `Vec` の作成

よく使う3つの方法：

```rust
let mut v: Vec<i32> = Vec::new();   // 空、キャパシティ 0
let mut v = Vec::with_capacity(8);  // 8スロットを事前確保、長さは 0
let v = vec![1, 2, 3, 4, 5];       // マクロ：リテラルリストから初期化
```

`vec![]` は `Vec::new()` に一連の push を続ける形に展開される糖衣構文だ。

## `push`・`pop`・インデックスアクセス

```rust
let mut v = vec![10, 20, 30];

v.push(40);              // 末尾に追加；v は [10, 20, 30, 40] になる
let last = v.pop();      // 末尾の要素を取り除いて返す：Some(40)
println!("{}", v[0]);    // 位置でインデックスアクセス：10
println!("{}", v.len()); // 3
```

`[]` によるインデックスアクセスは範囲外でパニックする。代わりに `.get(i)` を使うと `Option<&T>` が得られる：

```rust
match v.get(10) {
    Some(x) => println!("{x}"),
    None    => println!("out of bounds"),
}
```

## キャパシティと成長

現在のキャパシティを超えて `push` すると、`Vec` はより大きなバッファをアロケートし — 通常は2倍 — 要素をコピーし、古いバッファを解放する。1回の `push` あたりの償却コストは O(1) だ。

```rust
let mut v: Vec<i32> = Vec::new();
println!("{}", v.capacity()); // 0

v.push(1);
println!("{}", v.capacity()); // 通常 4；正確な値は未規定
```

最終的なサイズが事前にわかっている場合は `Vec::with_capacity(n)` を使うと繰り返しの再アロケーションを避けられる。

## スライスビュー

`Vec<T>` は `Deref<Target = [T]>` を実装しているため、[スライス](../../slice/) `&[T]` が期待される場所では `Vec<T>` への参照が自動的に型強制される：

```rust
fn sum(values: &[i32]) -> i32 {
    values.iter().sum()
}

let v = vec![1, 2, 3];
println!("{}", sum(&v)); // &Vec<i32> が &[i32] に型強制される
```

範囲インデックスでサブスライスを取得することもできる — コピーは発生しない：

```rust
let middle: &[i32] = &v[1..3]; // [2, 3]
let whole:  &[i32] = &v[..];   // [1, 2, 3]
```

## イテレーション

`Vec` は3種類すべての所有権フレーバーでイテレートできる：

```rust
let mut v = vec![1, 2, 3];

for x in &v     { /* x: &i32   — ループ後も v を使える       */ }
for x in &mut v { /* x: &mut i32 — 要素をインプレース変更する */ }
for x in v      { /* x: i32   — v が消費される               */ }
```

## メモリと `Drop`

`Vec` は [`Drop`](../../../memory/traits/drop/) を実装している。`Vec` がスコープを抜けると、バッファ内のすべての要素をドロップし、次にヒープアロケーションを解放する — 手動の `free` は不要だ。

```rust
{
    let v = vec![String::from("a"), String::from("b")];
} // 各 String が先にドロップされ、その後バッファが解放される
```

## まとめ

- `Vec<T>` は長さとキャパシティを持つヒープバッファだ。
- `push` は末尾に追加し、`pop` は末尾の要素を `Option<T>` として取り除き、`[i]` でインデックスアクセス（範囲外でパニック）、`.get(i)` は `Option<&T>` を返す。
- キャパシティは `push` が超過すると自動的に成長する（通常は2倍）；サイズが既知なら `with_capacity` で再アロケーションを避けられる。
- `&Vec<T>` は `&[T]` に型強制されるため、`Vec` はスライスを受け取る場所ならどこでも使える。
- `Vec` がドロップされると、すべての要素がドロップされてヒープバッファが解放される。
