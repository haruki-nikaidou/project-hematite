---
title: 文字列
summary: "Zigにおける文字列は `[]const u8`（バイトのスライス）だ。このチェックポイントでは、文字列リテラルがメモリにどのように格納されるか、バイト数が必ずしも見える文字数と一致しない理由、そして表示・スライス・比較・実行時の文字列構築といった一般的な操作の方法を説明する。"
prerequisites: 
  - basis/cs_with_zig/pointer
  - basis/data_structure/array
aliases: []
tags:
  - Types
  - Strings
updated: 2026-05-16
---

ユーザーと対話するプログラムはすべてテキストを扱う — ファイルパス、エラーメッセージ、名前、コマンド。多くの高水準言語では、文字列はコンパイラに深く組み込まれた専用の組み込み型だ。Zigは別の道を選ぶ：文字列は単純に**バイトのスライス**（slice of bytes）であり、そのシンプルな土台が文字列にできること・できないことの多くを説明することになる。

## 文字列は `[]const u8`

[Array](/ja/cp/basis/data_structure/array/) でスライス（`[]T`）が、実行時の長さとセットになった要素ブロックへのポインタだと学んだ。Zigの文字列はそれ以上でも以下でもなく、テキストを表す `u8` バイトのスライスだ：

```zig
const greeting: []const u8 = "hello";
```

`[]const u8` の `const` は、このスライスを通じて個々のバイトを変更できないことを意味する — 読むことはできるが書くことはできない。ミュータブルなスライス `[]u8` なら変更を許すが、それは後述する。

以上だ。特別な `String` 型も、隠れた構造も、余分なメタデータも存在しない。Zigの文字列はバイト列へのビュー（view）であり、文字列操作はすべて `u8` スライスへの操作だ。

## 文字列リテラルとその格納場所

ソースコードに `"hello"` と書くと、コンパイラはその5バイトをプログラムの**データ領域**（data region）— コンパイル時定数を保持するメモリのセグメント（[Memory Layout](/ja/cp/basis/cs_with_zig/memory_layout/) で説明）— に格納する。この領域はプログラムの起動時に一度読み込まれ、終了まで存在し続ける。

文字列リテラルの正確な型は `*const [N:0]u8` だ — `N` バイトのコンパイル時配列へのポインタで、末尾に `0` の**センチネル**（sentinel）がある。`:0` 記法は配列が**ヌル終端**（null-terminated）であることを意味する：最後の文字の直後にゼロバイトが置かれるが、そのバイトは `N` に含まれない。

```text
"hello"  のメモリ上の配置:

 アドレス: 4000  4001  4002  4003  4004  4005
          ┌─────┬─────┬─────┬─────┬─────┬─────┐
 バイト:  │ 104 │ 101 │ 108 │ 108 │ 111 │   0 │
          └─────┴─────┴─────┴─────┴─────┴─────┘
            'h'   'e'   'l'   'l'   'o'  null
```

ヌル終端はC言語から受け継いだ慣習だ。C言語では文字列に別途長さフィールドがなく、ゼロバイトを探してスキャンすることで文字列の末尾を見つけていた。Zigはライブラリとの相互運用のためにヌル終端を残しているが、Zig自体のコードは通常、独自の `.len` を持つスライスで動作するため、末尾を探してスキャンする必要はない。

実際には、`*const [5:0]u8` は使う場所で黙って `[]const u8` に型強制（coerce）されるため、日常のコードでより長い型を見ることはほとんどない：

```zig
const std = @import("std");

pub fn main() void {
    const s: []const u8 = "hello"; // *const [5:0]u8 が []const u8 に型強制される
    std.debug.print("length: {}\n", .{s.len}); // length: 5
}
```

`.len` はヌル終端ではなく**バイト数**を返す。5文字のASCII文字列なら `.len == 5` となる。

## 文字列の表示：`{s}` と `{}`

数値やブール値には `{}` を使ってきた。文字列には `{s}` — 「string」フォーマット指定子 — を使う：

```zig
const std = @import("std");

pub fn main() void {
    const name: []const u8 = "Zig";
    std.debug.print("Hello, {s}!\n", .{name}); // Hello, Zig!
}
```

`[]const u8` に `{}` を使うと、読めるテキストではなく整数の生の列としてスライスが表示される。人間が読めるテキストを表示したいときは必ず `{s}` を使うこと。

## バイトと文字：ASCII

普通の英語テキストでは、各文字はちょうど1バイトに対応する。この対応は**ASCII**（American Standard Code for Information Interchange、米国情報交換標準コード）で定義されており、各文字・数字・一般的な記号に0から127の番号を割り当てた128エントリの表だ：

```text
'A' → 65     'a' → 97     '0' → 48     ' ' → 32
'B' → 66     'b' → 98     '1' → 49     '!' → 33
```

ASCIIでは `.len` が見える文字数と等しくなり、各バイトをちょうど1文字として扱える：

```zig
const std = @import("std");

pub fn main() void {
    const word: []const u8 = "Rust";
    for (word) |byte| {
        std.debug.print("{c} = {d}\n", .{ byte, byte });
        // {c} は u8 を文字としてフォーマット; {d} は10進数としてフォーマット
    }
    // R = 82
    // u = 117
    // s = 115
    // t = 116
}
```

## バイトと文字：UTF-8

ASCIIは128コードポイントしかカバーしていない — アクセント付き文字、漢字、アラビア文字、絵文字、人類の文字の大半に対応できない。現代のテキストは**UTF-8**（Unicode変換形式8ビット）を使用しており、ASCIIと互換性を保ちながらすべてのUnicode文字を表現できるエンコーディングだ。

UTF-8の重要な特性：ASCII範囲外の文字は**複数バイト**でエンコードされる。アクセント付き文字は2バイト、漢字は3バイト、絵文字は4バイトになることがある。

```zig
const std = @import("std");

pub fn main() void {
    const s: []const u8 = "héllo"; // 'é' は2バイトのUTF-8シーケンス
    std.debug.print("bytes: {}\n", .{s.len}); // bytes: 6  (5 ではない!)
}
```

`"héllo"` は見える文字が5つでもバイト数は6だ。`.len` は常にバイト数を報告する。`s[i]` でUTF-8文字列にインデックスアクセスすると、バイト列の位置 `i` にある `u8` が得られるが、それはマルチバイト文字の途中のバイトかもしれず、意味のある文字境界とは限らない。

Zigはこの複雑さを自動的な文字抽象化の裏に隠さない。これはZigの設計と一致している：言語はメモリで実際に何が起きているかを見せる。生のバイトではなくUnicode文字（*コードポイント*と呼ぶ）を反復処理したい場合は `std.unicode.Utf8View` を使う：

```zig
const std = @import("std");

pub fn main() !void {
    const s: []const u8 = "héllo";
    const view = try std.unicode.Utf8View.init(s);
    var iter = view.iterator();
    while (iter.nextCodepoint()) |cp| {
        std.debug.print("U+{X:0>4}\n", .{cp});
    }
    // U+0068  (h)
    // U+00E9  (é)
    // U+006C  (l)
    // U+006C  (l)
    // U+006F  (o)
}
```

英語やASCIIのみの入力を扱うプログラムなら、バイトを直接扱って問題ない。非ASCII文字が含まれる可能性がある場合は慎重に：バイトが必要か文字が必要かを判断して、適切な道具を選ぼう。

## 部分文字列のスライス

文字列はスライスなので、既に知っている範囲構文（range syntax）を使って部分文字列を取り出せる：

```zig
const std = @import("std");

pub fn main() void {
    const sentence: []const u8 = "hello world";
    const word: []const u8 = sentence[0..5]; // バイト 0, 1, 2, 3, 4
    std.debug.print("{s}\n", .{word}); // hello
}
```

`sentence[0..5]` は、同じ元のバイト列を指す新しい `[]const u8` を生み出す — コピーは発生しない。他のスライス操作と同様に、ZigはDebugビルドとReleaseSafeビルドで実行時に境界チェックを行う。

## 文字列の比較

`==` 演算子はポインタを比較する。内容が同じバイト列を持つ二つの別々のスライスも、異なるメモリ場所を指しているため `==` では不等号になる。二つの文字列が同じ内容かを調べるには `std.mem.eql` を使う：

```zig
const std = @import("std");

pub fn main() void {
    const a: []const u8 = "hello";
    const b: []const u8 = "hello";
    const c: []const u8 = "world";

    std.debug.print("{}\n", .{std.mem.eql(u8, a, b)}); // true
    std.debug.print("{}\n", .{std.mem.eql(u8, a, c)}); // false
}
```

`std.mem.eql(u8, x, y)` はまず長さが一致するかを確認し、次に各バイトを比較する。長さが等しく対応するすべてのバイトペアが同一の場合にのみ `true` を返す。

## コンパイル時の文字列連結

二つの文字列リテラルは `++` 演算子を使ってコンパイル時に結合できる。結果はそれ自体がコンパイル時定数だ：

```zig
const std = @import("std");

const greeting = "Hello, " ++ "world!";

pub fn main() void {
    std.debug.print("{s}\n", .{greeting}); // Hello, world!
}
```

`++` は両オペランドがコンパイル時に既知の場合のみ使える。ユーザー入力や計算値から実行時に文字列を構築するには別のアプローチが必要だ。

## 実行時の文字列構築

文字列の内容がプログラム実行中にしかわからない場合は、`++` が使えない。一般的なケースをカバーする二つの標準的な道具がある。

### 固定バッファへのフォーマット

`std.fmt.bufPrint` は与えた `[]u8` に値をフォーマットして書き込む。そのバッファのうち、フォーマットされたバイトを正確に含む部分スライスを返す：

```zig
const std = @import("std");

pub fn main() !void {
    var buf: [64]u8 = undefined;
    const result: []u8 = try std.fmt.bufPrint(&buf, "score: {d}", .{42});
    std.debug.print("{s}\n", .{result}); // score: 42
}
```

バッファは十分な大きさが必要だ。フォーマット済み出力がバッファの容量を超えると `bufPrint` は `error.NoSpaceLeft` を返し、`try` がそのエラーを呼び出し元に伝播する。このアプローチはヒープ割り当てを一切避けられるため、ログ行や固定フォーマットのメッセージなど固定サイズの出力に向いている。

### `ArrayList(u8)` を使った可変長文字列

最終的な長さが事前にわからない場合は `std.ArrayList(u8)` を使う — 動的サイズの文字列ビルダーのように振る舞う、バイトの可変長リストだ：

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var buf = std.ArrayList(u8).init(allocator);
    defer buf.deinit();

    try buf.appendSlice("Hello");
    try buf.appendSlice(", ");
    try buf.appendSlice("world!");

    const result: []const u8 = buf.items;
    std.debug.print("{s}\n", .{result}); // Hello, world!
}
```

`buf.items` は現在の内容を `[]u8` として公開する。`buf.writer()` と `std.fmt.format` を組み合わせて `ArrayList(u8)` に直接フォーマット済み出力を書き込むこともできるが、単純なケースなら `appendSlice` で十分だ。

## ミュータブルな文字列

`[]const u8` は読み取り専用のビューだ。`const` なしの `[]u8` なら、バイトをその場で変更できる：

```zig
const std = @import("std");

pub fn main() void {
    var bytes: [5]u8 = .{ 'h', 'e', 'l', 'l', 'o' };
    const s: []u8 = &bytes;

    s[0] = 'H'; // スライスを通じて最初のバイトを変更する
    std.debug.print("{s}\n", .{s}); // Hello
}
```

文字列リテラルは `[]u8` として使えない — 読み取り専用メモリに存在するからだ。ミュータブルなバイト配列を得るには、`var` のローカル配列として宣言してそのスライスを取るか、`allocator.alloc(u8, n)` でヒープに割り当てる。

## まとめ

- Zigの文字列は `[]const u8` — バイトのスライスだ。別途の文字列型は存在しない。
- 文字列リテラルの型は `*const [N:0]u8`（ヌル終端、コンパイル時定数）で、`[]const u8` に黙って型強制される。プログラムのデータ領域に格納される。
- 文字列の表示には `{s}` を使う。バイトスライスに `{}` を使うとテキストではなく整数の生の列が表示される。
- `.len` は**バイト数**だ。ASCIIテキストではバイト数と見える文字数が一致する。UTF-8テキストでは1文字が2〜4バイトにまたがることがある。文字（コードポイント）を反復処理するには `std.unicode.Utf8View` を使う。
- 部分文字列は `s[start..end]` でスライスできる — コピーなし、同じバイト列への新しいビューだ。
- 文字列の内容を比較するには `std.mem.eql(u8, a, b)` を使う。`==` 演算子はポインタを比較する（内容ではない）。
- コンパイル時の文字列の結合には `++` を使う。実行時の文字列は `std.fmt.bufPrint` で固定バッファにフォーマットするか、`std.ArrayList(u8)` で動的に構築する。
- `[]u8`（`const` なし）はミュータブルなバイトスライス；`[]const u8` は読み取り専用だ。文字列リテラルは常に読み取り専用だ。
