---
title: 論理値
summary: "Zigの bool 型の仕組み、比較演算子と論理演算子がどのように論理値を生成・結合するか、そして短絡評価（short-circuit evaluation）が条件式をより安全かつ効率的にする仕組みを解説する。"
prerequisites: 
  - basis/cs_with_zig/prepare_environment
  - basis/cs_with_zig/simple_variable
aliases: []
tags: ["Types"]
updated: 2026-05-13
---

ほぼすべての実用プログラムには判断が必要だ。この値は範囲内か？ 接続は成功したか？ カウンタが上限に達したか？ これらの問いにはちょうど2つの答えしかない — はい/いいえ、真/偽。**ブール値（boolean）** はそれを表す：`true` か `false` かのどちらか、中間はない。

[Simple Variable](../simple_variable/) チェックポイントでは `bool` をZigの4つの基本型のひとつとして紹介し、詳細は後回しにすると述べた。このチェックポイントがその詳細を語る。読み終えるころには、比較演算子が論理値を生成する仕組み、論理演算子がそれらを結合する方法、短絡評価が重要な理由、そしてこれらのピースが実際のプログラムで書くあらゆる条件式にどう組み合わさるかが分かるようになる。

## `bool` 型

`bool` はZigにおける論理値の型だ。取りうる値はちょうど2つだ。

```zig
const is_ready:  bool = true;
var   has_error: bool = false;
```

どちらのリテラルも直接代入できるし、`bool` を生成する任意の式の結果を代入することもできる — 比較演算子が登場すれば頻繁に見ることになる。

`std.debug.print` で `bool` を出力すると、リテラルの単語 `true` または `false` が表示される。

```zig
const std = @import("std");

pub fn main() void {
    const flag: bool = true;
    std.debug.print("{}\n", .{flag}); // true
}
```

内部では、Zigは `bool` を1バイトのメモリに格納する。ビットパターン `0x01` が `true`、`0x00` が `false` を表す。正確なサイズはstruct（構造体）や配列を扱い始めたときに重要になるが、日常的な使用では `bool` を不透明なyes/noフラグとして扱えばよい。

## 比較演算子

**比較演算子（comparison operators）** は2つの値を取り、その関係を表す `bool` を返す。Zigは6つを提供する。

| 演算子 | 意味 |
|----------|---------|
| `==` | 等しい |
| `!=` | 等しくない |
| `<` | より小さい |
| `>` | より大きい |
| `<=` | 以下 |
| `>=` | 以上 |

```zig
const std = @import("std");

pub fn main() void {
    const x: i32 = 10;
    const y: i32 = 20;

    std.debug.print("x == y : {}\n", .{x == y}); // false
    std.debug.print("x != y : {}\n", .{x != y}); // true
    std.debug.print("x  < y : {}\n", .{x < y});  // true
    std.debug.print("x  > y : {}\n", .{x > y});  // false
    std.debug.print("x <= y : {}\n", .{x <= y}); // true
    std.debug.print("x >= y : {}\n", .{x >= y}); // false
}
```

いくつかのルールを頭に入れておこう。

- **両辺は同じ型でなければならない。** Zigは比較前にオペランドを暗黙的に拡張・縮小しない。`u32` を直接 `i64` と比較するのは算術で型を混在させるのと同様、コンパイルエラーになる。
- **順序演算子（`<`、`>`、`<=`、`>=`）は自然な順序を持つ型にのみ使える** — 整数やFloatなどが対象だ。`bool` 値自体には定義されていない。
- `==` と `!=` は `bool` にも使えるが、使う理由はほとんどない。`flag == true` と書くのは `flag` と書くのと同じ回り道であり、`flag == false` は次節で触れる `!flag` と同じだ。

比較の結果を名前付き変数に代入するのは慣用的なコードであり、式をあちこちにインライン展開するより意図が明確になることが多い。

```zig
const score:       i32  = 87;
const is_passing:  bool = score >= 60;
const is_perfect:  bool = score == 100;
```

## 論理演算子

**論理演算子（logical operators）** は論理値を結合して、より複雑な条件を表現する。Zigは3つを提供する。

| 演算子 | 形式 | 意味 |
|----------|------|---------|
| `and` | `a and b` | `a` と `b` の**両方**が `true` のとき `true` |
| `or` | `a or b` | `a` か `b` の**少なくとも一方**が `true` のとき `true` |
| `!` | `!a` | `a` が `false` のとき `true`、その逆も同様 |

> **Zigはキーワード `and` と `or` を使う** — C、Java、Rustで一般的な `&&` や `||` 記号ではない。これらの言語を知っている場合、最初につまずきやすい構文の違いだ。

真理値表ですべてのケースを示す。

**`and`**

| `a` | `b` | `a and b` |
|-----|-----|-----------|
| `true` | `true` | `true` |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

**`or`**

| `a` | `b` | `a or b` |
|-----|-----|----------|
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

**`!`（否定、not）**

| `a` | `!a` |
|-----|------|
| `true` | `false` |
| `false` | `true` |

3つすべてを使った具体例を示す。

```zig
const std = @import("std");

pub fn main() void {
    const age:        u32  = 25;
    const has_ticket: bool = true;

    const can_enter:    bool = age >= 18 and has_ticket;
    const needs_review: bool = age < 18 or !has_ticket;

    std.debug.print("can_enter    : {}\n", .{can_enter});    // true
    std.debug.print("needs_review : {}\n", .{needs_review}); // false
}
```

### 演算子の優先順位

`!` が最も強く結びつき（直後の値に適用される）、次に `and`、そして `or` の順だ。順序が曖昧になりそうなとき、あるいは次の読み手にロジックを明示したいときは括弧を使おう。

```zig
// 以下の2つは意味が異なる:
const a = x or y and z;    // x or (y and z) と解釈される
const b = (x or y) and z;  // まず (x or y)、その後 z と and
```

括弧にコストはない。複合式が3つ以上の部分からなるときは積極的に使おう。

## 短絡評価

Zigは `and` と `or` を**短絡評価（short-circuit evaluation）** で評価する。最終結果が確定した時点で、右辺は*評価されない*。

- `a and b` の場合: `a` が `false` なら、`b` にかかわらず式全体が `false` になるため、`b` はスキップされる。
- `a or b` の場合: `a` が `true` なら、`b` にかかわらず式全体が `true` になるため、`b` はスキップされる。

これは単なるパフォーマンス最適化ではなく、正確さのためのツールだ。除算を行う前にそれが安全かどうかを確認する例を考えよう。

```zig
const divisor:   i32 = 0;
const numerator: i32 = 10;

// 安全: divisor == 0 なら右辺には決して到達しない
const result: bool = divisor != 0 and numerator / divisor > 5;
```

短絡評価がなければ、`divisor` がゼロのときでも `numerator / divisor` が実行され、ランタイムパニックが発生する。短絡評価があれば、`divisor != 0` で安全が確認された後にのみ除算が試みられる。

実践的なルール: **コストが低い条件や保護条件を左に置き、コストが高い条件や危険になりうる条件を右に置く**。左辺が右辺を実行するかどうかを制御する。

## ド・モルガンの法則

**ド・モルガンの法則（De Morgan's laws）** として知られる2つの古典的な恒等式は、条件ロジックを単純化・リファクタリングするときによく登場するので覚えておく価値がある。

$$
\lnot (A \land B) \equiv \lnot A \lor \lnot B
$$

$$
\lnot (A \lor B) \equiv \lnot A \land \lnot B
$$

平易な言葉で言えば:

- `and` の否定は、それぞれの否定を `or` したものと同じ。
- `or` の否定は、それぞれの否定を `and` したものと同じ。

Zig構文では:

```zig
// 以下のペアは常に等価:
const p = !(a and b);  // !a or !b と同じ
const q = !(a or b);   // !a and !b と同じ
```

これらが最もよく登場するのは、複合条件の先頭に `!` がある場合に、それを内側に分配したいとき — たとえば、「興味深い」パスが最初に来るように `if`/`else` ブランチを反転させるときや、二重否定を単純化するときだ。

```zig
// 元のコード: "両方が無効なら飛ばす"
const skip = !(valid_a and valid_b); // !(A and B)

// 等価な形、より明確なこともある: "どちらかが無効なら飛ばす"
const skip2 = !valid_a or !valid_b;  // !A or !B
```

どちらの形も同じ結果を生む。どちらを選ぶかは、文脈でどちらが自然に読めるかによる。

## まとめ

- `bool` はZigの論理値型だ。有効な値は `true` と `false` のみ。メモリ上では1バイトを占める。
- **比較演算子**（`==`、`!=`、`<`、`>`、`<=`、`>=`）は同じ型の2つの値を取り、`bool` を返す。順序演算子は整数とFloatに適用される。`==` と `!=` は `bool` にも適用できる。
- **論理演算子** は論理値を結合する: `and` は両辺が `true` のときに `true`、`or` は少なくとも一方が `true` のときに `true`、`!` は単一の値を反転させる。Zigはキーワード `and` と `or` を使う — `&&` や `||` **ではない**。
- `!` は `and` より強く結びつき、`and` は `or` より強く結びつく。読む順序が不明確になりそうなときは括弧を使う。
- **短絡評価**: `and` の右辺は左辺が `false` のときにスキップされ、`or` の右辺は左辺が `true` のときにスキップされる。安全でない式が実行されるのを防ぐために保護条件を左に置く。
- **ド・モルガンの法則**: `!(a and b)` は `!a or !b` と等価、`!(a or b)` は `!a and !b` と等価。先頭の `!` を持つ条件の単純化に使う。
