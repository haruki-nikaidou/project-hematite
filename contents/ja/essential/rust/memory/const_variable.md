---
title: "`const` バインディング"
summary: "`const` バインディングは真のコンパイル時定数を宣言する — その値はコンパイル時に計算され、使用されるたびに各使用箇所に展開される。`const` が `let` とどう違うか（実行時アドレスを持たない、`mut` 不可、型注釈が必須）、`const` の初期化式に許される式の種類、そして `const` とイミュータブルな `let` をどう使い分けるかを学ぶ。"
prerequisites:
  - essential/rust/variable
aliases: []
tags: ["Rust", "メモリ"]
updated: 2026-05-28
---

`const` バインディングは真のコンパイル時定数を宣言する。名前が使われるたびに、コンパイル時に値で置き換えられる — テキスト置換のようなものだが、型チェックが入る。メモリは確保されず、アドレスを取ることもできない。

## 構文

`const` は明示的な型注釈が必要で、`mut` にはできない：

```rust
const MAX_CONNECTIONS: u32 = 100;
const PI: f64 = std::f64::consts::PI;
```

`const` は任意のスコープに書ける — 関数内、`impl` ブロック内、またはモジュールレベルでも使える。

## 初期化式に書けるもの

**定数式（constant expression）**だけが許される。Rust はそれらを完全にコンパイル時に評価する。使えるのは：

- 整数、浮動小数点数、`bool`、`char` のリテラル
- `const` 値に対する算術演算・ビット演算
- `const fn` 関数の呼び出し
- すべてのフィールドが定数式であれば、構造体・列挙体（enum）のコンストラクタ

ヒープアロケーション（heap allocation）、実行時 I/O、プログラム状態に依存するものはすべて禁止だ。

```rust
const KILOBYTE: usize = 1024;
const MEGABYTE: usize = KILOBYTE * 1024;

const fn triple(x: u32) -> u32 {
    x * 3
}

const NINE: u32 = triple(3);
```

## `const` とイミュータブルな `let` の違い

イミュータブルな `let` は依然として実行時のバインディングだ — アドレスを持ち、スタック上のスロットを占有し、スコープのライフタイムを持つ：

```rust
let x = 5; // 実行時。スタック上にアドレスがある
```

`const` は各使用箇所に展開される。`MAX_CONNECTIONS` を三箇所で使えば、コンパイラはそれぞれの箇所に直接 `100` を置く：

```rust
const MAX_CONNECTIONS: u32 = 100;
assert!(n < MAX_CONNECTIONS); // コンパイル後は assert!(n < 100) と同じ
```

コードベース全体で共有される固定の名前付き値 — マジックリテラルとして現れてはならないもの — には `const` を使う。実行ごとに変わりうる値や、あるスコープでたまたまイミュータブルでも実行時に計算される値には `let` を使う。

## `const` と `static` の違い

[`static`](../static_variable/) はプログラム全体のライフタイムにわたる固定アドレスに値を格納する。`const` はアドレスを持たず、`&CONST_NAME` を取ることはできない。プログラム全体で値への参照を保持する必要がある場合 — ルックアップテーブル、グローバルな設定構造体 — は `const` ではなく `static` を使う。
