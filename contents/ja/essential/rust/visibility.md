---
title: 可視性——`pub` とその仲間
summary: "Rustはコードを*モジュール*に整理し、すべてのアイテム（関数、struct、フィールド、トレイト）はデフォルトで自身のモジュールにプライベートだ。可視性修飾子——`pub`、`pub(crate)`、`pub(super)`、`pub(in path)`——それぞれの意味、structフィールドがstructそのものとは独立した可視性を持つ理由、そしてプライバシー境界がモジュール境界にどう沿っているかを解説する。"
prerequisites:
  - essential/rust/function
  - essential/rust/types/product_type
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

Rustのすべてのアイテム——関数、struct、フィールド、型エイリアス、定数——は**自身のモジュールにプライベート**な状態から始まる。何を隠すかではなく、何を公開するかを選ぶ。このデフォルトはAPIの境界について意識的に考えることを強制する。

## モジュールとプライバシー境界

**モジュール（`mod`）**はコード整理の単位であり、同時にプライバシーの単位でもある。プライバシー境界はモジュールとその外側のすべてのものの間に引かれる。

```rust
mod geometry {
    pub struct Point {
        pub x: f64,
        pub y: f64,
    }

    fn distance(a: &Point, b: &Point) -> f64 {
        ((a.x - b.x).powi(2) + (a.y - b.y).powi(2)).sqrt()
    }
}
```

`geometry` の外側のコードは `pub` なので `Point` とそのフィールドを使える。しかし `distance` は呼び出せない——その関数はモジュールにプライベートだ。

## デフォルトのプライベート

修飾子なしのアイテムは、宣言されたモジュールとそのモジュールの子孫の内側でのみ可視だ。

```rust
mod auth {
    fn hash_password(pw: &str) -> Vec<u8> { todo!() }

    pub fn verify(pw: &str, hash: &[u8]) -> bool {
        hash_password(pw) == hash // hash_password はここからアクセス可能
    }
}

// auth::hash_password(...)  // コンパイルエラー: 関数 `hash_password` はプライベート
let _ = auth::verify("secret", &stored_hash); // ok
```

`hash_password` は実装の詳細であり、`verify` がインタフェースだ。プライバシーのデフォルトはドキュメントに頼るのではなく、コールサイトでこの分離を強制する。

## 可視性修飾子

4つの修飾子が宣言モジュールを超えて可視性を広げる。

### `pub` — どこからでも可視

`pub` はモジュールを名指しできるあらゆるコードからアクセス可能にする。ライブラリクレートのパブリックAPIや、バイナリがモジュールツリーをまたいで公開するアイテムに使う。

```rust
pub fn add(a: i32, b: i32) -> i32 { a + b }
```

### `pub(crate)` — 現在のクレート内で可視

`pub(crate)` はアクセスをコンパイル単位（クレート、crate）に限定する。1つのクレートのモジュール間で共有するが、パブリックAPIには出したくないアイテムに便利だ。

```rust
pub(crate) fn intern(s: &str) -> u32 { todo!() }
```

クレートの外側では `intern` は不可視だ。

### `pub(super)` — 親モジュールに可視

`pub(super)` は可視性をこれ以上広げることなく親モジュールにアクセスを与える。

```rust
mod ui {
    mod button {
        pub(super) fn render_frame() { todo!() }
    }

    fn draw() {
        button::render_frame(); // pub(super) が ui を対象にしているのでアクセス可能
    }
}

// ui::button::render_frame() // ui の外からはコンパイルエラー
```

### `pub(in path)` — 特定のモジュールサブツリー内で可視

`pub(in path)` は祖先モジュールを名指しする。アイテムはそのモジュールのサブツリー内のどこからでもアクセス可能だ。

```rust
mod config {
    pub mod parsing {
        pub(in crate::config) fn raw_parse(s: &str) { todo!() }
    }

    pub mod validation {
        fn check(s: &str) {
            super::parsing::raw_parse(s); // crate::config の内側: 許可される
        }
    }
}

// config::parsing::raw_parse(...)  // コンパイルエラー: crate::config の外側
```

## structフィールドの可視性

structの全体的な可視性とそのフィールドの可視性は独立している。structを `pub` にしてもフィールドが `pub` になるわけではない。

```rust
pub struct Config {
    pub host: String, // 外側からアクセス可能
    port: u16,        // プライベート。このモジュールだけが読み書きできる
}
```

外部のコードは `Config` を受け取ったり、格納したり、渡したりできるが、`port` を直接読めない。メソッドを通じてアクセスを制御する。

これは構築に実際的な影響を持つ。structの*すべて*のフィールドがプライベートであれば、外部コードはstructリテラル構文でインスタンスを作れない——自分が提供するコンストラクタを通じてのみ作れる。

```rust
impl Config {
    pub fn new(host: String, port: u16) -> Self {
        Self { host, port }
    }
}
```

structリテラル `Config { host: "...", port: 8080 }` は `Config` を宣言したモジュールの内側でのみ有効だ。

## `pub use` による再エクスポート

アイテムをスコープに持ち込み、同時に再エクスポートできる。

```rust
// lib.rs
pub use self::geometry::Point;
```

これにより呼び出し元は `crate_name::geometry::Point` の代わりに `crate_name::Point` と書ける。再エクスポートによって、内部のモジュール構造を整理しつつ、フラットでクリーンなパブリックAPIを提示できる。

## まとめ

- すべてのアイテムはデフォルトでプライベートだ——宣言モジュールとその子孫の内側でのみ可視。
- `pub` はモジュールを名指しできるすべてのコードへ可視性を広げる。
- `pub(crate)` は現在のクレートに限定する。`pub(super)` は親モジュールに限定する。`pub(in path)` は指定した祖先のサブツリーに限定する。
- structフィールドはstructとは独立した可視性を持つ。プライベートフィールドを持つ `pub` structはその内部表現を隠す。
- `pub use` はアイテムを短いパスで再エクスポートし、モジュール構造とは独立してパブリックAPIを形成できる。
