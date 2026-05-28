---
title: "`Clone` と `Copy`"
summary: "値の複製方法を分類する二つのトレイト。`Clone` は「明示的な `.clone()` 呼び出しによってコピーを作れる（コストがかかる可能性がある）」ことを表す。`Copy` はより厳格な約束で「この値の複製はビット単位の単純なコピーだ」を意味し、コンパイラが暗黙的に値を複製できるようになる。どの組み込み型がそれぞれを実装しているか、`Copy` に `Clone` が必要な理由、そして `String` が `Clone` であるのに `Copy` でない理由を学ぶ。"
prerequisites:
  - essential/rust/types/size
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "メモリ"]
updated: 2026-05-28
---

値を新しい変数に代入したり関数に渡したりすると、所有権がムーブする — 元のバインディングは使えなくなる。しかし、ムーブではなく複製すべき型もある。整数をコピーするコストは実質ゼロで、意味論も明快だ。一方、`String` のような型は複製できるが、新たなヒープアロケーション（heap allocation）というコストを伴う。Rust はこの二つのケースを `Clone` と `Copy` という二つのトレイトで形式化している。

## `Clone`：明示的な複製

`Clone` は汎用の複製トレイトだ：

```rust
pub trait Clone {
    fn clone(&self) -> Self;
}
```

どんな型でも `Clone` を実装できる。メソッドは明示的に呼び出すため、コストが呼び出し箇所から見える：

```rust
let s = String::from("hello");
let t = s.clone(); // 新しいヒープアロケーション。s はまだ有効
println!("{} {}", s, t);
```

すべてのフィールドがすでに `Clone` を実装していれば `#[derive(Clone)]` が使える：

```rust
#[derive(Clone)]
struct Config {
    timeout: u32,
    host: String,
}

let a = Config { timeout: 30, host: String::from("localhost") };
let b = a.clone(); // ディープコピー：b.host に新しい String アロケーション
```

## `Copy`：暗黙的なビット単位複製

`Copy` はより厳格な約束だ。値の複製はアロケーションも副作用もない単純なビット単位コピーであることを意味する：

```rust
pub trait Copy: Clone {}
```

`Copy` 型は使われるたびに**暗黙的に**複製される — `.clone()` の呼び出しは不要だ：

```rust
let x: i32 = 5;
let y = x; // ビット単位コピー。x はムーブされない
println!("{}", x); // まだ有効
```

`Copy` を実装している型：

- すべての整数・浮動小数点プリミティブ（`u8`、`i32`、`f64`、…）
- `bool` と `char`
- 生ポインタ（`*const T`、`*mut T`）
- 共有参照 `&T`（参照自体がコピーされる。参照先ではない）
- すべての要素が `Copy` である配列 `[T; N]` とタプル `(T, U, …)`

## `Copy` に `Clone` が必要な理由

`pub trait Copy: Clone {}` という境界は、すべての `Copy` 型が `Clone` も実装しなければならないことを意味する。これは一貫している：ビット単位コピーは常に有効な（そして高速な）`clone` の実装だ。シンプルな値型では両方をまとめて導出するのが慣用的だ：

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
struct Point {
    x: f64,
    y: f64,
}

let a = Point { x: 1.0, y: 2.0 };
let b = a; // コピー。ムーブではない
println!("{:?}", a); // まだ有効
```

## `String` が `Clone` でも `Copy` でない理由

`String` はヒープアロケーションへのポインタを保持している。ビット単位コピーをすると、同じアロケーションを指す二つの `String` 値ができてしまう。両方をドロップすると同じメモリが二度解放され — 未定義動作（undefined behavior）になる。

そのため `String` は `Clone`（新鮮なバッファをアロケートする）を実装しているが、`Copy` は実装していない。コンパイラは `String` をデフォルトでムーブするため、常にちょうど一人の所有者が存在することが保証される。

## `Drop` と `Copy` が相互排他な理由

[`Drop`](./drop/) を実装している型はカスタムクリーンアップコードを持ち、それはちょうど一度だけ実行されなければならない。その型が `Copy` でもあったら、ビット単位コピーが際限なく増殖し、コンパイラは「ちょうど一度」を保証できなくなる。コンパイラはこれを強制する：`Drop` も実装している型に `Copy` を導出しようとするとコンパイルエラーになる。
