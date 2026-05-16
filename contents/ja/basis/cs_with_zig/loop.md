---
title: ループ文
summary: "Zigの `while` ループと `for` ループの仕組み、`break` と `continue` によるループフローの制御、そしてループを値を生み出す式として使う方法を学ぶ。"
prerequisites: 
  - basis/cs_with_zig/condition
  - basis/cs_with_zig/boolean
aliases: []
tags: []
updated: 2026-05-13
---

同じコードブロックを10回コピー＆ペーストするのはプログラミングではない — それは単純作業であり、将来バグが潜む場所を10箇所作ることになる。ループを使えば「この処理を繰り返せ」と一度だけ明確に書け、繰り返しはコンピュータに任せられる。ループこそが、1つのアイテムを扱うプログラムを100万個のアイテムを扱うプログラムへと変える道具だ。

## ループが存在する理由

1から5までの数を表示したいとする。ループなしでは5つのほぼ同一の文を書く。ループを使えば、ロジックを一度書いて何回実行するかをプログラムに伝えるだけだ。カウンタや要素だけが変わる同じコードブロックを繰り返し書いているなら、ループが正しい道具だ。

## `while` ループ

**`while` ループ**は、条件が `true` である限り本体を繰り返し実行する。条件が `false` になった瞬間、ループは停止して閉じ波括弧の後ろから実行が続く。

```zig
const std = @import("std");

pub fn main() void {
    var i: u32 = 1;
    while (i <= 5) {
        std.debug.print("{}\n", .{i});
        i += 1;
    }
}
```

出力：

```
1
2
3
4
5
```

### continue式

Zigの `while` ループにはオプションの**continue式**（continue expression）がある — 各イテレーションの終わりに実行されるステップで、本体を早期スキップするために `continue` を使ったイテレーションでも実行される（`continue` については後述）。条件と本体の間にコロンで区切って書く：

```zig
while (condition) : (step) {
    // 本体
}
```

先ほどの例はcontinue式を使ってすっきり書き直せる：

```zig
const std = @import("std");

pub fn main() void {
    var i: u32 = 1;
    while (i <= 5) : (i += 1) {
        std.debug.print("{}\n", .{i});
    }
}
```

インクリメントをcontinue式に移すことで、本体のロジックから分離される。後から `continue` を追加してもインクリメントをうっかり省略しにくくなる。

## `for` ループ

**`for` ループ**はスライス（slice）や配列（array）のすべての要素を反復処理する。インデックス変数を手動で管理する必要はなく、ループが**キャプチャ**（capture）を通じて各要素を直接渡してくれる：

```zig
const std = @import("std");

pub fn main() void {
    const fruits = [_][]const u8{ "apple", "banana", "cherry" };

    for (fruits) |fruit| {
        std.debug.print("{s}\n", .{fruit});
    }
}
```

出力：

```
apple
banana
cherry
```

`|fruit|` 構文がキャプチャで、各イテレーションで `fruit` は現在の要素に束縛される。元の配列は変更されない。

### インデックスもキャプチャする

各要素の位置も知りたい場合は、配列と `0..` から始まる範囲をまとめて扱える：

```zig
const std = @import("std");

pub fn main() void {
    const fruits = [_][]const u8{ "apple", "banana", "cherry" };

    for (fruits, 0..) |fruit, i| {
        std.debug.print("{}: {s}\n", .{ i, fruit });
    }
}
```

出力：

```
0: apple
1: banana
2: cherry
```

`0..` は各要素と同期してゼロから数え上がる整数を生成する。二つのキャプチャ `|fruit, i|` は、左から右の順で二つのイテラブル `(fruits, 0..)` に対応する。

## `break` と `continue`

二つのキーワードで、イテレーション途中にループの通常の流れを変えられる。

**`continue`** は現在のイテレーションの本体の残りをスキップして次のイテレーションへジャンプする。continue式を持つ `while` ループでは、continue式は引き続き実行される。

```zig
const std = @import("std");

pub fn main() void {
    var i: u32 = 0;
    while (i < 10) : (i += 1) {
        if (i % 2 == 0) continue; // 偶数をスキップ
        std.debug.print("{}\n", .{i});
    }
}
```

出力：`1 3 5 7 9`（それぞれ別の行）。

**`break`** は条件がまだ `true` かどうかにかかわらず、即座にループを抜け出す。

```zig
const std = @import("std");

pub fn main() void {
    var i: u32 = 0;
    while (i < 100) : (i += 1) {
        if (i == 5) break; // 早期終了
        std.debug.print("{}\n", .{i});
    }
}
```

出力：`0 1 2 3 4`（それぞれ別の行）。ループは6以上に到達しない。

## 無限ループ

`while (true)` という条件のループは、内部で `break` が実行されない限り永遠に動き続ける。このパターンを**無限ループ**（infinite loop）と呼び、終了条件がループの*内側*から自然に表現できるときに適切な選択となる — イベントループ、REPL（Read-Eval-Print Loop）、センチネル値が現れるまで入力を読み続ける処理などだ。

```zig
const std = @import("std");

pub fn main() void {
    var count: u32 = 0;
    while (true) {
        count += 1;
        if (count == 3) break;
    }
    std.debug.print("stopped at {}\n", .{count}); // stopped at 3
}
```

`while (true)` は意図的に使うこと。論理エラーで `break` に到達しない偶発的な無限ループはプログラムをハングさせる。

## ネストしたループのためのラベル付き `break`

ループをネストした場合、単純な `break` は*最も内側の*ループしか抜け出せない。内側のループから外側のループを抜け出すために、Zigでは外側のループに**ラベル**を付けて `break` と組み合わせられる：

```zig
const std = @import("std");

pub fn main() void {
    outer: for (0..4) |row| {
        for (0..4) |col| {
            if (row == 2 and col == 2) break :outer;
            std.debug.print("({}, {})\n", .{ row, col });
        }
    }
    std.debug.print("done\n", .{});
}
```

`break :outer` がなければ、`break` は内側の `for` ループしか抜け出せず、外側のループは継続する。ループの直前に置いたラベル `outer:` は `break :outer` と `continue :outer` の両方で対象にできる。

## ループを式として使う

Zigではループを**式**として使える — ループが値を生み出し、それを変数に代入できる。ループから値を返すには、`break` に値を渡す：

```zig
const std = @import("std");

pub fn main() void {
    // リストの中で最初の偶数を探す。なければ 0。
    const numbers = [_]i32{ 1, 3, 7, 8, 11 };

    const first_even: i32 = for (numbers) |n| {
        if (n % 2 == 0) break n; // n をループの値として生み出す
    } else 0; // else ブランチはループが break なしに完了した場合に実行される

    std.debug.print("first even: {}\n", .{first_even}); // first even: 8
}
```

`for` または `while` ループの後の `else` 節は、ループが一度も `break` を実行せずに*完了した*場合にのみ実行される。探索が空振りに終わったときのデフォルト値を提供するのに自然な場所だ。

## まとめ

- ループを使えば、コードを複製することなくコードブロックを繰り返せて、同じロジックを1つのアイテムから任意の数までスケールできる。
- **`while` ループ**は条件が `true` である間実行される。オプションの**continue式** `while (cond) : (step) { }` は `continue` で早期スキップされたイテレーションも含め、毎回のイテレーション後に `step` を実行する。
- **`for` ループ**はスライスや配列を反復処理する。`for (items) |item| { }` で要素をキャプチャし、`for (items, 0..) |item, i| { }` でゼロ始まりのインデックスもキャプチャできる。
- **`continue`** は次のイテレーションへスキップし、**`break`** は即座にループを抜け出す。
- **無限ループ**（`while (true)`）は終了条件がループ内部で決まる場合の正しいパターンだ。
- **ラベル**（`outer: for ...` と `break :outer`）を使えば、ネストしたループの内側から外側のループを抜け出せる。
- ループは**式**として機能できる：`break value` で値を生み出し、ループ後の `else` 節が `break` なしに完了した場合のフォールバックを提供する。
