---
title: "`static` 変数"
summary: "`static` はプログラムのデータセグメント（data segment）上に配置され、プログラム実行中ずっと存在し続ける単一の値を宣言する。`const` と異なり、`static` は参照を取れる固定のメモリアドレスを持つ。`static` をいつ使うべきか（大きな読み取り専用テーブル、プログラム全体で共有するハンドルなど）、ミュータブルな `static` に `unsafe` が必要な理由、そして `static` が Zig コースで学んだメモリのデータ領域とどう関係するかを学ぶ。"
prerequisites:
  - essential/rust/variable
aliases: []
tags: ["Rust", "メモリ"]
updated: 2026-05-28
---

すべてのプログラムにはデータセグメント（data segment）がある — プロセスの実行中ずっと存在するメモリの領域だ。`static` はそこに値を置く。スコープの間だけスタック上に存在する `let` バインディングや、ドロップされるまでヒープ上に存在するアロケーションとは違い、`static` はプログラム起動時に一度だけ初期化され、プロセスが終了するときにしか解放されない。

## `static` の宣言

```rust
static MAX_SIZE: usize = 4096;
static GREETING: &str = "hello";
```

`const` と同様、`static` には明示的な型注釈が必要だ。`const` とは異なり、値は固定アドレスに格納される — 参照を取ることができる：

```rust
fn greeting() -> &'static str {
    &GREETING
}
```

型 `&'static str` は、プログラム全体のライフタイムにわたって有効な参照を意味する。`static` への参照は自動的に `'static` ライフタイムを持つ。

## ミュータビリティと `unsafe`

`mut` なしの `static` は初期化後は読み取り専用だ。複数のスレッドが同時に読み取ってもデータ競合の心配はない。

`static mut` は話が別だ。Rust はコンパイル時に並行アクセスを検証できないため、`static mut` の読み書きには `unsafe` ブロックが必要になる：

```rust
static mut COUNTER: u32 = 0;

unsafe {
    COUNTER += 1; // 並行アクセスに対するコンパイル時の保護がない
}
```

実際には、`static mut` を直接使うのは避けるべきだ。`AtomicU32` や `Mutex<T>` のようなスレッドセーフな型は通常の（`mut` なしの）`static` に格納でき、安全な並行アクセスを提供してくれる：

```rust
use std::sync::atomic::{AtomicU32, Ordering};

static COUNTER: AtomicU32 = AtomicU32::new(0);

COUNTER.fetch_add(1, Ordering::Relaxed); // unsafe 不要
```

## `'static` ライフタイム

`'static` ライフタイムと `static` 変数は別物だ — `'static` は「プログラム全体にわたって存在する」を意味する。これが適用されるのは：

- `static` 変数への参照
- 文字列リテラル（`"hello"` の型は `&'static str`）
- 借用データを持たないオーナード型（例：`String`、`Vec<u8>`）

ジェネリックパラメータの `T: 'static` 境界は、その型が `'static` でない参照を含んではならないことを意味する — 値が `static` 変数でなければならないという意味ではない。

## `static` と `const` の使い分け

| | `const` | `static` |
|---|---|---|
| アドレス | なし — 各使用箇所に展開される | プログラム全体を通じて固定 |
| 参照 | `&CONST` は取れない | `&'static T` |
| 向いているもの | 名前付きスカラー値、コンパイル時の算術 | 大きなテーブル、グローバルハンドル、インターン文字列 |

式の中で使う名前付きの値が必要なら [`const`](../const_variable/) を使う。アドレスを持ち持続する単一の値が必要なとき、または定数式では表せない初期化が必要な型のときは `static` を使う。
