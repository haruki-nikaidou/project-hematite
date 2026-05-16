---
title: 条件文
summary: "Zigで if/else if/else、式としての if、if によるオプショナルのアンラップ、そして switch を使ってプログラムの実行を分岐させる方法を解説する。Zigの厳格な bool 要件と網羅的な switch マッチングが、より安全で正確な分岐ロジックの記述にどう役立つかも取り上げる。"
prerequisites: 
  - basis/cs_with_zig/code_block
  - basis/cs_with_zig/boolean
aliases: []
tags: []
updated: 2026-05-13
---

入力に関係なく常に同じことをするプログラムは、あまり役に立たない。条件（condition）はプログラムに選択する能力を与える手段だ — ある状況ではこちらを、それ以外の状況ではあちらを実行する。構文とセマンティクスを最初から正しく理解しておくこと、特にZigのルールがすでに知っている言語と異なる点を把握しておくことが、後のデバッグ時間を大幅に節約する。

## `if` 文

**`if` 文** はブール条件を評価し、その条件が `true` のときだけコードブロックを実行する。基本形はこうだ。

```zig
if (condition) {
    // condition が true のとき実行される
}
```

条件が `false` のときに実行される `else` ブランチを追加できる。

```zig
const std = @import("std");

pub fn main() void {
    const score: i32 = 74;

    if (score >= 60) {
        std.debug.print("Passing.\n", .{});
    } else {
        std.debug.print("Failing.\n", .{});
    }
}
```

3つ以上のケースには `else if` で追加の条件を連鎖させる。

```zig
const std = @import("std");

pub fn main() void {
    const score: i32 = 74;

    if (score >= 90) {
        std.debug.print("Grade: A\n", .{});
    } else if (score >= 80) {
        std.debug.print("Grade: B\n", .{});
    } else if (score >= 70) {
        std.debug.print("Grade: C\n", .{});
    } else if (score >= 60) {
        std.debug.print("Grade: D\n", .{});
    } else {
        std.debug.print("Grade: F\n", .{});
    }
}
```

Zigはブランチを上から順に評価し、条件が `true` になった最初のものを実行する。残りのブランチはスキップされる。

## 条件は `bool` でなければならない

Zigはすべての `if` の条件が厳密に `bool` 型であることを要求する。**整数やポインタから `bool` への暗黙的な変換はない**。これはCとの意図的な違いであり、Cではゼロでない整数が `true` として扱われる。

```zig
const x: i32 = 1;

// if (x) { ... }         // コンパイルエラー: bool が期待されるが i32 が渡された
if (x != 0) { /* ok */ }  // 明示的な比較が bool を生成する
```

この厳格さは機能だ。カウントやポインタを誤って条件として扱うというバグのクラス全体を、プログラムが実行される前にコンパイラが検出する。常に比較を明示的に書くこと。

## 式としての `if`

`if` / `else` ブランチはブロックであり、ブロックは値を生成できる（[Code Block](../code_block/) チェックポイントで学んだ通り）。そのため、`if` 構文全体を式として使うことができる。構文は同じで、値が期待される位置で使うだけだ。

```zig
const std = @import("std");

pub fn main() void {
    const score: i32 = 74;
    const grade: []const u8 = if (score >= 60) "Pass" else "Fail";

    std.debug.print("Result: {s}\n", .{grade});
}
```

`if` を式として使う場合、いくつかのルールが適用される。

- **両ブランチが同じ型の値を生成しなければならない。** Zigが共通の型を自動選択することはない。
- **`else` ブランチが必須だ。** `else` がなければ、`if` がまったく値を生成しない可能性があり、変数が初期化されないままになる — Zigが決して許さないことだ。

`if` を式として使うことで `grade` を `const` として宣言できる。この機能がなければ、`if` の前に可変な `var` を初期化し、各ブランチ内で再代入する必要がある。

複数文のブランチには、最終値を返すためにラベル付きブロックを使う。

```zig
const std = @import("std");

pub fn main() void {
    const raw: i32 = 130;

    const capped: i32 = if (raw > 100) blk: {
        std.debug.print("Score exceeds maximum; capping.\n", .{});
        break :blk 100;
    } else raw;

    std.debug.print("capped = {}\n", .{capped});
}
```

## `if` によるオプショナルのアンラップ

Zigには**オプショナル（optionals）** と呼ばれる型システムの機能がある。`?T` 型の値は `T` を保持するか `null` になるかのどちらかだ。オプショナルについては後のチェックポイントで詳しく学ぶが、`if` にはオプショナル専用の構文があり、今のうちに知っておく価値がある。

```zig
const std = @import("std");

pub fn main() void {
    const maybe: ?i32 = 42;

    if (maybe) |value| {
        // ここでの 'value' は i32 — null の場合は排除されている
        std.debug.print("Got: {}\n", .{value});
    } else {
        std.debug.print("Nothing.\n", .{});
    }
}
```

`|value|` 構文はオプショナルを**アンラップ（unwrap）** する。`maybe` が `null` でない場合、null でない内部値が `value` に束縛され、その束縛がスコープ内にある状態で `if` ブランチが実行される。`maybe` が `null` の場合は `else` ブランチが実行される。

このパターンはZigで非常によく使われるため、早い段階で認識できるようにしておくと実際のコードベースを読むときに役立つ。オプショナルの完全なセマンティクスとその背後にあるnull安全性の保証は、Optionalsチェックポイントで扱う。

## 可読性：早期リターンと深いネスト

条件が何重にもネストすると、コードが追いにくくなる。「ハッピーパス」（通常の期待されるケース）がインデントの層の下に埋もれてしまう。

```zig
fn process(x: i32) void {
    if (x > 0) {
        if (x < 1000) {
            if (x % 2 == 0) {
                // ... 実際の処理、3段深くに埋もれている
            }
        }
    }
}
```

よく使われる慣用的な代替手段は**早期リターン（early exit）**（またはガード）スタイルだ。最初にエラーや無効な条件を確認し、該当する場合はすぐに抜け、通常のパスを同じインデントレベルで続けさせる。

```zig
const std = @import("std");

fn process(x: i32) void {
    if (x <= 0) return;
    if (x >= 1000) return;
    if (x % 2 != 0) return;

    // 通常のパス — 余分なインデントは不要。
    std.debug.print("Processing {}\n", .{x});
}
```

2つのバージョンは論理的に同一だ。早期リターンバージョンは通常読みやすい。理由は以下の通りだ。

- 各ガードが単一の明確に示された拒否条件を表現している。
- 意味のある処理が最深のインデントではなく関数のトップレベルに位置する。
- ガードの追加・削除が1行の変更で済む。

関数については後のチェックポイントで詳しく説明する。今の段階での重要な教訓は原則だ。**無効な入力はトップで弾き、通常ケースはその下で処理する**。

## `switch` 文

単一の値を多くの候補と比較する必要がある場合、`if` / `else if` の連鎖は冗長になる。**`switch` 文** はよりすっきりした代替手段だ。

```zig
const std = @import("std");

pub fn main() void {
    const day: u8 = 3;

    switch (day) {
        1 => std.debug.print("Monday\n",    .{}),
        2 => std.debug.print("Tuesday\n",   .{}),
        3 => std.debug.print("Wednesday\n", .{}),
        4 => std.debug.print("Thursday\n",  .{}),
        5 => std.debug.print("Friday\n",    .{}),
        6 => std.debug.print("Saturday\n",  .{}),
        7 => std.debug.print("Sunday\n",    .{}),
        else => std.debug.print("Invalid day\n", .{}),
    }
}
```

`switch` 内の各行は**プロング（prong）** だ。`=>` の左にパターン、右に文や式がある。

### 網羅性

Zigの `switch` は**網羅的（exhaustive）** だ。対象の型のすべての可能な値が、明示的なプロングまたはキャッチオール `else` プロングによって処理されなければならない。`else` を省略して未マッチの値がある場合、プログラムはコンパイルできない。これにより、新しいケースが追加されたのに対応するブランチが忘れられるという種類のバグ全体を防ぐ。

### 複数値と範囲のマッチ

単一のプロングで複数の値をカンマ区切りで同時にマッチさせることができ、`...` を使って連続した範囲をマッチさせることもできる。

```zig
const std = @import("std");

pub fn main() void {
    const score: u8 = 74;

    switch (score) {
        90...100 => std.debug.print("A\n", .{}),
        80...89  => std.debug.print("B\n", .{}),
        70...79  => std.debug.print("C\n", .{}),
        60...69  => std.debug.print("D\n", .{}),
        0...59   => std.debug.print("F\n", .{}),
        else     => std.debug.print("Out of range\n", .{}),
    }
}
```

> **注意:** `switch` プロング内の `...` は*両端を含む*範囲だ — 両端点が含まれる。

複数文のブランチにはブロックで本体を囲む。

```zig
const std = @import("std");

pub fn main() void {
    const code: u8 = 2;

    switch (code) {
        1 => {
            std.debug.print("Code 1: initializing\n", .{});
            std.debug.print("Ready.\n", .{});
        },
        2, 3 => {
            std.debug.print("Code 2 or 3: running\n", .{});
        },
        else => {
            std.debug.print("Unknown code\n", .{});
        },
    }
}
```

### 式としての `switch`

`if` と同様、`switch` もすべてのプロングが値を生成する場合に値を返すことができる。

```zig
const std = @import("std");

pub fn main() void {
    const day: u8 = 6;

    const kind: []const u8 = switch (day) {
        1...5 => "weekday",
        6, 7  => "weekend",
        else  => "invalid",
    };

    std.debug.print("{}\n", .{kind});
}
```

式として使う場合、すべてのプロングが同じ型を生成しなければならず、`else` プロング（または網羅的なマッチ）は引き続き必要だ。

### 列挙型（enum）へのマッチ

`switch` は特に**列挙型（enum）** と相性が良い。列挙型とは値が閉じた名前付き集合である型だ。列挙型に対して switch を使う場合、Zigはコンパイル時にすべての可能な値を知っているため、網羅性チェックが正確になる — すべてのバリアントが網羅されている限り `else` は不要だ。

```zig
const std = @import("std");

const Direction = enum { north, south, east, west };

pub fn main() void {
    const dir: Direction = .east;

    switch (dir) {
        .north => std.debug.print("Going north\n", .{}),
        .south => std.debug.print("Going south\n", .{}),
        .east  => std.debug.print("Going east\n",  .{}),
        .west  => std.debug.print("Going west\n",  .{}),
    }
}
```

後で `Direction` に新しいバリアントが追加されると、`else` のない `switch` はすべてコンパイルに失敗し、新しいケースの処理を強制する。これによりリファクタリングが大幅に安全になる。列挙型はEnumチェックポイントで詳しく扱う。

## まとめ

- **`if` 文** は `bool` 条件を評価し、条件が `true` のときそのブロックを実行する。`else if` で追加のケースを連鎖させ、残りを `else` で受け取る。
- Zigは**条件が厳密に `bool` であることを要求する**。整数からboolへの暗黙的な型変換はない。常に比較を明示的に書くこと（例: `x` の代わりに `x != 0`）。
- `if` / `else` は**式**だ。値を生成でき、一時的な `var` なしで `const` を初期化できる。両ブランチは同じ型を生成しなければならず、値が期待される場合 `else` は必須だ。
- `if (opt) |v| { ... }` は**オプショナルをアンラップ**する。`opt` が `null` でない場合、`v` がブロック内で内部値を保持する。オプショナルの完全なセマンティクスは後のチェックポイントで扱う。
- 深いネストよりも**早期リターン**スタイルを好む。関数のトップで無効な入力を弾き、通常のパスをベースのインデントレベルで実行させる。
- **`switch` 文** は `=>` を使って単一の値を複数のプロングと照合する。プロングは個別の値（カンマ区切り）または両端を含む範囲（`...`）を列挙できる。
- `switch` は**網羅的**だ。すべての値が明示的なプロングまたは `else` キャッチオールで網羅されなければならない。網羅性の欠如はコンパイルエラーになる。
- `if` と同様、`switch` も**式**として使える。すべてのプロングが同じ型を生成しなければならない。
- **列挙型**に対して完全な網羅性で switch を使う場合は `else` が不要で、コンパイラがすべての switch 箇所で新しいバリアントの処理を強制する。
