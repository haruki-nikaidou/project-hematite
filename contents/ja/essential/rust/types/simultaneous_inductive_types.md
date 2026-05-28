---
title: 同時的（相互再帰的）帰納型
summary: "二つ以上の帰納的型が互いの定義を参照するとき、それらは同時的（相互再帰的）帰納型だ。式と文、木と森といった古典的な例を通じて、Rustで再帰規則に引っかからずにそれらを宣言し走査する方法を学ぶ。"
prerequisites:
  - essential/rust/types/iterated_inductive_types
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---

二つの型が互いに深く絡み合っていて、一方を他方に言及せずに完全に定義できないことがある。一方を先に書き、もう一方を後に書こうとすると、まだ導入されていない型への前方参照が発生する。解決策は両方を同時に定義することだ。

**同時的**（または**相互再帰的**）帰納型とは、互いのコンストラクタに現れる二つ以上の帰納的型だ。どちらの型も「内側」でも「外側」でもなく、互いに意味を与え合うピアだ。

## Rustはこれを自然に扱う

Rustでは、モジュール内の `enum` と `struct` の宣言は順序を問わない。コンパイラは型検査を行う前にすべての定義を把握するため、前方宣言やプロトタイプなしに任意の順序で相互再帰型を書ける。

```rust
enum Tree<T>   { Leaf(T), Branch(Forest<T>) }
enum Forest<T> { Empty, Prepend(Box<Tree<T>>, Box<Forest<T>>) }
```

これは、型を使用前に宣言しなければならないCなどの言語とは異なる。

## 例1 — 木と森

*木*（tree）は単一の値を持つ（`Leaf`）か、部分木のコレクションを持つ（`Branch`）かのどちらかだ。*森*（forest）はそのコレクションで、空か、木を小さな森の先頭に追加したものだ。

```rust
enum Tree<T>   { Leaf(T), Branch(Forest<T>) }
enum Forest<T> { Empty, Prepend(Box<Tree<T>>, Box<Forest<T>>) }
```

葉の数を数えるには相互再帰を使う。`count_tree` は分岐ケースを `count_forest` に委譲し、`count_forest` は各要素を `count_tree` に委譲する。

```rust
fn count_tree<T>(tree: &Tree<T>) -> usize {
    match tree {
        Tree::Leaf(_) => 1,
        Tree::Branch(forest) => count_forest(forest),
    }
}

fn count_forest<T>(forest: &Forest<T>) -> usize {
    match forest {
        Forest::Empty => 0,
        Forest::Prepend(tree, rest) => count_tree(tree) + count_forest(rest),
    }
}
```

各関数の基底ケース（`Leaf`、`Empty`）は具体的な数を返す。各帰納ケースは厳密に小さい引数でピアの関数に委譲するため、このペアは任意の構造的再帰関数と同じ理由で停止する。

## 例2 — 式と文

言語の抽象構文木（AST）は典型的なユースケースだ。式は値を生成し、文は作用をもたらす。多くの言語では `let` バインディングがその境界を曖昧にする。`let` 式は文（代入）と本体の式を含む。これを直接モデル化するには相互再帰が必要だ。

```rust
enum Expr {
    Num(f64),
    Var(String),
    Let(String, Box<Stmt>, Box<Expr>),
}

enum Stmt {
    Assign(String, Box<Expr>),
    Seq(Box<Stmt>, Box<Stmt>),
}
```

`Expr::Let` は `Stmt`（バインディング）を持ち、`Stmt::Assign` は `Expr`（右辺）を持つ。どちらの型も相手のサブセットではなく、真に互いを定義し合っている。

## 相互再帰関数

同じモジュール内の二つの `fn` アイテムは特別な構文なしに互いを呼び出せる — 型宣言と同様、順序を問わない。

```rust
fn count_tree<T>(tree: &Tree<T>) -> usize { /* … count_forest を呼ぶ */ }
fn count_forest<T>(forest: &Forest<T>) -> usize { /* … count_tree を呼ぶ */ }
```

`forward` キーワードも、ヘッダファイルも、プロトタイプも不要だ。Rustは関数本体をコンパイルする前にモジュール全体の名前解決を行う。

## `Box` の要件

[反復的帰納型](../iterated_inductive_types/)の間接参照の規則はここにも適用されるが、型のペアをまたがる形になる。`Box` がなければ、`Tree<T>` のサイズが `Forest<T>` のサイズに依存し、`Forest<T>` のサイズが `Tree<T>` のサイズに依存する — サイズ計算の無限ループが発生する。

`Box<T>` がこの循環を断ち切る。`Forest::Prepend` は `Tree<T>` へのポインタ（常にポインタサイズ）と `Forest<T>` へのポインタ（こちらも常にポインタサイズ）を持つ。コンパイラはこれで両方の型の有限サイズを計算できる。

経験則は単一型の再帰と同じだ。フィールドの型が定義中の型を（直接または相互参照を通じて）含む場合、そのフィールドは間接参照の背後に置かなければならない。

## まとめ

- 同時的帰納型とは、それぞれのコンストラクタが相手を参照する二つ以上の型だ。
- Rustのモジュールレベルの宣言は順序を問わないため、相互再帰型とその関連関数に前方宣言は不要だ。
- `Box` の要件は相互参照をまたがって拡張される。二つの型の間の循環を閉じるフィールドは固定サイズの間接参照の背後に置かなければならない。
- 関数の相互再帰は自然に従う。同じモジュール内の二つの `fn` アイテムは自由に互いを呼び出せ、停止性は単一型の再帰と同じ構造的再帰の論拠によって保証される。
