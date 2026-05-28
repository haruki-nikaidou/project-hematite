---
title: "`match` 式"
summary: "Rustの`match`式は値をパターンのリストと照合し、最初にマッチしたアームのコードを実行する。`match`が*式*である理由（値を生成する）、網羅性チェック（exhaustiveness）によってすべてのバリアントを必ず処理できる保証の仕組み、そしてガード（`if`）でアームをさらに絞り込む方法を学ぶ。"
prerequisites:
  - essential/rust/pattern_match
aliases: []
tags: ["Rust"]
updated: 2026-05-27
---

`match`はRustで値を検査する手段だ——値をパターンのシーケンスと照合し、最初にマッチしたアームのコードを実行する。[パターンマッチング](../../pattern_match/)を基盤として、二つのコンパイラによる保証を追加する：すべての可能な値を網羅しなければならないという**網羅性**（exhaustiveness）と、すべてのアームが同じ型を生成しなければならないという保証だ。

## 基本的な形

```rust
let n: i32 = 2;

match n {
    1     => println!("one"),
    2     => println!("two"),
    3..=9 => println!("small"),
    _     => println!("something else"),
}
```

アームは上から下に試される。最初にマッチしたアームが勝つ。ワイルドカード`_`はキャッチオール——何にでもマッチし、値を捨てる。

## 式としての `match`

`match`はマッチしたアームの値を生成する：

```rust
let description = match n {
    0     => "zero",
    1..=9 => "single digit",
    _     => "large",
};
```

すべてのアームは同じ型を生成しなければならない。発散するアーム——`panic!`や`return`を呼び出して`!`を返すアーム——はこの要件から除外される。

## 網羅性

可能な値が一つでも未処理のままだとコードはコンパイルできない：

```rust
enum Direction { North, South, East, West }

let dir = Direction::East;

let label = match dir {
    Direction::North => "N",
    Direction::South => "S",
    Direction::East  => "E",
    // error: non-exhaustive patterns — `Direction::West` not covered
};
```

この保証は列挙型に新しいバリアントを追加したときに真価を発揮する：キャッチオールのない`match`がコードベース全体でコンパイルに失敗し、新しいケースをどう扱うか決めるまでコンパイルが通らない。バリアントを見落とすことは決してない。

## 構造化された値のマッチング

パターンはマッチしながらデストラクチャリングを行う。構造体バリアント・タプルバリアント・入れ子の列挙型はすべて統一的に扱われる：

```rust
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
}

fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle { radius }           => std::f64::consts::PI * radius * radius,
        Shape::Rectangle { width, height } => width * height,
    }
}
```

フィールド名`radius`・`width`・`height`はパターンによって束縛され、各アームの式で使える。

## 複数パターンと範囲

一つのアームで`|`を使って複数のパターンをカバーできる：

```rust
match c {
    'a' | 'e' | 'i' | 'o' | 'u' => println!("vowel"),
    'a'..='z'                    => println!("consonant"),
    _                            => println!("other"),
}
```

パターン内の閉区間は`..=`で書く。

## ガード

アームはパターンの後ろに追加条件を付けてマッチを絞り込める：

```rust
match n {
    x if x < 0 => println!("negative: {x}"),
    0           => println!("zero"),
    x           => println!("positive: {x}"),
}
```

ガードはパターンがすでにマッチした場合にのみ実行される。ガードが失敗するとそのアームはスキップされ、次のアームが試される——`match`はそこで終わらない。

## `@` による束縛

`@`はサブパターンに対してテストしながら、マッチした値を名前に束縛する：

```rust
match n {
    small @ 1..=9 => println!("small: {small}"),
    large @ 10..  => println!("large: {large}"),
    _             => println!("zero or negative"),
}
```

`@`がないと、値を束縛する（範囲情報を失う）か範囲を使う（束縛した名前を失う）かのどちらかを選ばなければならない。
