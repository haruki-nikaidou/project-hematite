---
title: トレイト
summary: "Rust における*トレイト*（trait）は、型が提供を約束できるメソッドの名前付き集合だ。トレイトの宣言方法、`impl Trait for Type` による型へのトレイト実装、実装の一貫性を保つ孤児ルール（orphan rule）、そしてトレイトが他言語のインターフェース・型クラス・抽象基底クラスに相当する理由を学ぶ。"
prerequisites:
  - essential/rust/types/product_type
  - essential/rust/types/sum_type
  - essential/rust/function
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

**トレイト**（trait）は、型が提供を約束できるメソッドの名前付き集合だ。型がトレイトを実装していれば、そのトレイトを期待するコードはどれでも、具体的な型を知らずにその型を扱える。

## トレイトの宣言

```rust
trait Greet {
    fn greeting(&self) -> String;
}
```

これはコントラクト（contract）を宣言している：`Greet` を実装する型はすべて、`self` への共有参照を受け取り `String` を返す `greeting` メソッドを持たなければならない。

## トレイトの実装

```rust
struct Person {
    name: String,
}

impl Greet for Person {
    fn greeting(&self) -> String {
        format!("Hello, I'm {}!", self.name)
    }
}
```

`impl Trait for Type` はトレイトのコントラクトを特定の型に結び付ける。これにより `Person` に対して `.greeting()` を呼び出せるようになり、`Greet` が要求される場所ならどこでも `Person` を使える。

## デフォルトメソッド実装

トレイトはメソッドにデフォルトの本体を提供できる：

```rust
trait Greet {
    fn name(&self) -> &str;

    fn greeting(&self) -> String {
        format!("Hello, I'm {}!", self.name())
    }
}
```

実装者は `name` を必ず提供しなければならないが、オーバーライドしない限り `greeting` は無償で得られる。デフォルトメソッドにより、トレイトはすべての実装者に繰り返しを強いることなく有用な振る舞いを提供できる。

## 孤児ルール

トレイトを型に実装できるのは：
- そのトレイトを自分が定義した場合、**または**
- その型を自分が定義した場合だ。

外部のトレイトを外部の型に実装することはできない。たとえば、自分のクレート（crate）内で `std::fmt::Display`（標準ライブラリ由来）を `Vec<T>`（同じく標準ライブラリ由来）に実装することはできない。この**孤児ルール**により、ある型へのトレイト実装は常に高々一つしか存在しないことが保証される — 異なるクレートからの競合した実装は生まれない。

## 関数シグネチャでのトレイトの使用

トレイトを実装する任意の型を受け入れるための構文は二通りある：

```rust
fn print_greeting(g: &impl Greet) {
    println!("{}", g.greeting());
}

fn print_greeting<T: Greet>(g: &T) {
    println!("{}", g.greeting());
}
```

どちらも同じ意味だ：`Greet` を実装する任意の型への参照を受け入れる。前者（`impl Trait`）は簡潔で、後者（境界付きジェネリクス `T: Greet`）は型パラメータが複数の位置に現れる場合や `where` 節で使う場合に必要になる。

## トレイト間の曖昧さの解消

複数のトレイトが同じ名前のメソッドを定義できる。どちらもスコープ内にある場合、Rust はどちらを意図しているかを特定する手助けを必要とする：

```rust
trait A { fn hello(&self); }
trait B { fn hello(&self); }

struct Foo;
impl A for Foo { fn hello(&self) { println!("A"); } }
impl B for Foo { fn hello(&self) { println!("B"); } }

let f = Foo;
A::hello(&f); // A の hello を呼び出す
B::hello(&f); // B の hello を呼び出す
```

実際には、曖昧さが生じることは稀だ。スコープ内にそのメソッドを持つトレイトが一つだけなら、Rust は `.hello()` を自動的に解決する。

## トレイトの位置づけ

トレイトは Java/Go のインターフェース、Haskell の型クラス（type class）、C++ の抽象基底クラス（abstract base class）と同じ役割を果たす — 具体的な型を名指しすることなく共有された振る舞いを記述する。Rust の実装は具体的な型ごとに個別の特化コードを生成する（単相化（monomorphization））ため、トレイト境界を持つジェネリック関数は手書きの特化コードと比べてランタイムオーバーヘッドを持たない。
