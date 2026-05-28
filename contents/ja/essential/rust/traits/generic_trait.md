---
title: ジェネリックトレイトとトレイト境界
summary: "型パラメータを使ってトレイトをパラメータ化する方法（`trait Convert<T>`）と、ジェネリック関数や型を*トレイト境界*（trait bound）で制約する方法（`fn print<T: Display>(x: T)`）を学ぶ。トレイト境界が静的型検査を犠牲にせずにジェネリックコードを表現豊かにする理由と、`+` や `where` を使った複数境界の組み合わせ方を理解する。"
prerequisites:
  - essential/rust/traits/traits_intro
  - essential/rust/types/generic_inductive_definitions
aliases: []
tags: ["Rust", "ジェネリクス"]
updated: 2026-05-27
---

ジェネリクスを使えば、多くの具体型に対して動く関数や型を一つ書ける。トレイト境界を使えば、その型がどんな操作をサポートしなければならないかをコンパイラに伝えられる。この二つを組み合わせることで、静的にチェックされる再利用可能なゼロコスト抽象化が得られる。

## ジェネリックトレイト

トレイト自体もジェネリックにできる — 山括弧内の型変数によってパラメータ化される：

```rust
trait Convert<T> {
    fn convert(&self) -> T;
}
```

実装者は具体的な型を埋める：

```rust
struct Celsius(f64);

impl Convert<f64> for Celsius {
    fn convert(&self) -> f64 {
        self.0
    }
}

impl Convert<String> for Celsius {
    fn convert(&self) -> String {
        format!("{:.1}°C", self.0)
    }
}
```

同じ型が `Convert<f64>` と `Convert<String>` を個別に実装できる — それぞれの組み合わせが独自の `impl` ブロックになる。

## 関数のトレイト境界

**トレイト境界**（trait bound）は、型パラメータがどのトレイトを実装しなければならないかをコンパイラに伝える。境界は型パラメータ名の後ろに `:` で区切って書く：

```rust
use std::fmt::Display;

fn print_twice<T: Display>(value: T) {
    println!("{value}");
    println!("{value}");
}
```

`T: Display` は「`Display` を実装する任意の `T` を受け入れる」という意味だ。境界がなければ `println!("{value}")` はコンパイルできない — `T` がフォーマットをサポートする証拠がないからだ。

`print_twice(42)` は `i32: Display` であるため動作する。`print_twice(vec![1, 2])` は `Vec<i32>` が `Display` を実装していないため呼び出しサイトで失敗する — エラーは関数本体の奥深くではなく、即座に現れる。

## 複数の境界

複数のトレイトを要求するには `+` を使う：

```rust
use std::fmt::{Debug, Display};

fn show<T: Display + Debug>(value: T) {
    println!("display: {value}");
    println!("debug:   {value:?}");
}
```

組み合わせる境界の数に制限はない。

## `where` 節

シグネチャが長くなったら、境界を `where` 節に移動できる：

```rust
fn compare_and_display<T, U>(t: T, u: U) -> bool
where
    T: Display + PartialOrd,
    U: Display + Into<T>,
{
    let u_as_t = u.into();
    println!("comparing {t} and {u_as_t}");
    t > u_as_t
}
```

`where` は純粋に見た目の問題だ — インラインの境界とまったく同じ意味で、別に書いているだけだ。インラインの形が読みにくくなったときに使う。

## 構造体のトレイト境界

構造体に境界を付けることで、内部に保存される型が特定のトレイトをサポートすることを要求できる：

```rust
use std::fmt::Display;

struct Wrapper<T: Display> {
    value: T,
}

impl<T: Display> Wrapper<T> {
    fn show(&self) {
        println!("{}", self.value);
    }
}
```

境界は `impl` にも繰り返す。現代の Rust では、構造体定義ではなく必要なメソッドだけに境界を置く方が通常はすっきりするが、上記のパターンは有効で古いコードでもよく見られる。

## `impl Trait` の省略記法

[トレイト](../traits_intro/)で登場した `impl Trait` 構文は、単一の名前なし型パラメータとその境界の糖衣構文だ：

```rust
// 省略形
fn print(value: impl Display) { println!("{value}"); }

// 展開形
fn print<T: Display>(value: T) { println!("{value}"); }
```

単一引数での使用では等価だ。同じ型パラメータが複数の位置に現れる場合は明示的な `<T: ...>` 形式が必要になる：

```rust
// 両引数の T は同じ型でなければならない
fn equal<T: PartialEq>(a: T, b: T) -> bool {
    a == b
}
```

`fn equal(a: impl PartialEq, b: impl PartialEq)` と書くと、`a` と `b` に独立した匿名型パラメータが与えられ、異なる型でも許されてしまう — 等値比較ではほぼ望まない動作だ。

## 単相化とゼロコスト

`print_twice::<i32>` を呼び出すたびに、コンパイラは `i32` 専用の機械語コードを生成する。`String` で呼び出すと `String` 用に別のコードが生成される。この**単相化**はコンパイル時に起きる — 実行時ディスパッチも、仮想テーブル（vtable）も、ボクシングも不要だ。トレイト境界を持つジェネリック関数は、各具体型向けに手書きした関数と比べて速度は変わらない。

## まとめ

- **ジェネリックトレイト**（`trait Convert<T>`）は、一つのトレイトで多くのターゲット型への変換を記述できる。
- **トレイト境界**（`T: Display`）は、型パラメータを特定のトレイトを実装する型に制約する。
- 複数の境界は `+` で組み合わせる。`where` 節は可読性のために境界をシグネチャの外に移動する。
- `impl Trait` は単一の境界を持つ名前なし型パラメータの糖衣構文だ。型パラメータが複数の位置に現れる場合は明示的な `<T: ...>` 形式を使う。
- トレイト境界は静的にチェックされ、単相化により実行時コストはない。
