---
title: 標準入出力
summary: "プログラムは外部の世界と通信する必要がある。このチェックポイントでは Zig の標準 I/O を扱う — stdout への出力、stdin からの読み取り、テキストからの数値解析、そして I/O に付きもののエラー処理を学ぶ。"
prerequisites:
  - basis/cs_with_zig/prepare_environment
  - basis/cs_with_zig/simple_variable
  - basis/cs_with_zig/integer
  - basis/cs_with_zig/string
aliases: []
tags:
  - IO
updated: 2026-05-20
---

書くプログラムはどれも外部の世界と通信する必要がある — 結果を表示したり、ユーザーから入力を受け取ったり、何が問題だったかを伝えたりする。開発中は変数を確認するために `std.debug.print` を使ってきたが、この関数は*エラーストリーム*に書き込む。実際のプログラムが結果を送り出す*出力ストリーム*ではない。このチェックポイントではその区別を明確にし、適切なストリームへの書き込みと読み取りの方法、そして画面上の値の見た目を細かく制御する書式指定子を紹介する。

## 3つの標準ストリーム

プロセスが起動すると、オペレーティングシステムは3つのオープンファイルディスクリプタを渡す:

| ストリーム | ファイルディスクリプタ | Zig のハンドル | 目的 |
|------------|----------------------|----------------|------|
| **stdin** | 0 | `std.io.getStdIn()` | ターミナル（またはパイプ）からの入力 |
| **stdout** | 1 | `std.io.getStdOut()` | 通常のプログラム出力 |
| **stderr** | 2 | `std.io.getStdErr()` | エラーメッセージ、診断情報 |

`std.debug.print` は **stderr**（fd 2）に書き込む。これは意図的な設計だ: デバッグ出力はプログラムの実際の結果と分離されているため、シェルのパイプラインやリダイレクトが診断ノイズで汚染されない。ユーザーに見せる出力には **stdout** に書き込む。

## stdout への書き込み

`std.io.getStdOut()` は `File` を返す。そこで `.writer()` を呼び出すと `Writer` が得られる — 背後にあるファイルにバイトを送り込む方法を知っている値だ。

```zig
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, {s}!\n", .{"world"});
}
```

`std.debug.print` と比べて2点変わっている:

1. 関数の戻り値型が `!void` になっている — `!` プレフィックスはエラーを返す可能性があることを意味する。ファイルへの書き込みは失敗しうる操作（ターミナルが閉じていたり、パイプが壊れていたりする）なので、戻り値型にその可能性を反映しなければならない。
2. 各書き込み操作の前に `try` がついている。書き込みが失敗すると、`try` はエラーを呼び出し元に伝播する — ここでは `main` がそのエラーをオペレーティングシステムに返すことになる。

ライター上の `print` メソッドはすでに知っている書式文字列を受け付ける。`writeAll` は書式なしで生のバイト列を送る:

```zig
try stdout.writeAll("no formatting needed\n");
```

## バッファリング出力

`stdout.print` を呼び出すたびにOSへのシステムコールが発行される。システムコールはコストが高く — メモリへの書き込みより数千倍遅い。多くの行を出力するプログラムで、小さな書き込みを一度ずつ送り続けると大量のCPU時間を浪費する。

**バッファリング I/O** は書き込みをメモリバッファに蓄積し、より大きなチャンクにまとめてOSに送る。Zig はこのために `std.io.bufferedWriter` を提供している:

```zig
const std = @import("std");

pub fn main() !void {
    const raw_stdout = std.io.getStdOut();
    var bw = std.io.bufferedWriter(raw_stdout.writer());
    const stdout = bw.writer();

    for (0..5) |i| {
        try stdout.print("line {d}\n", .{i});
    }

    try bw.flush(); // バッファのバイトをOSに送る
}
```

最後の `bw.flush()` は必須だ — これを忘れると、バッファに残っているバイトはプログラム終了時に黙って破棄される。習慣にしよう: バッファリングライターを使ったら、リターンする前に必ずフラッシュする。

いつバッファリングすべきか？プログラムが密なループで多くの行を書き出す場合だ。単一の出力や、ユーザーが各行を即座に見る必要があるインタラクティブなプロンプトでは、バッファリングは複雑さを増すだけで利点がない。

## 書式指定子

`print` の書式文字列は `{指定子}` プレースホルダーを使う。すでに `{}` （型のデフォルト）と `{s}` （文字列）は見てきた。よく使う全セットを示す:

| 指定子 | 意味 | 値の例 | 出力例 |
|--------|------|--------|--------|
| `{}` | 型のデフォルト書式 | `42` (`i32`) | `42` |
| `{d}` | 10進整数 | `255` (`u8`) | `255` |
| `{b}` | 2進整数 | `255` (`u8`) | `11111111` |
| `{o}` | 8進整数 | `255` (`u8`) | `377` |
| `{x}` | 小文字16進 | `255` (`u8`) | `ff` |
| `{X}` | 大文字16進 | `255` (`u8`) | `FF` |
| `{s}` | 文字列（`[]const u8`） | `"hi"` | `hi` |
| `{c}` | `u8` をASCII文字として | `65` (`u8`) | `A` |
| `{e}` | 指数表記の浮動小数点 | `0.001` (`f64`) | `1e-3` |
| `{any}` | 任意の値をデバッグ書式で | `.{1, true}` | `{ 1, true }` |

指定子には**幅と揃え方**を含めることができる。まず埋め文字、次に揃え方向（`<` 左揃え、`>` 右揃え、`^` 中央揃え）、そして最小幅の順に書く:

```zig
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();

    // 幅8フィールドに右揃え、スペース埋め
    try stdout.print("{d:>8}\n", .{42});    //       42
    // 左揃え
    try stdout.print("{d:<8}\n", .{42});    // 42
    // 幅8でゼロ埋め
    try stdout.print("{d:0>8}\n", .{42});   // 00000042
    // ゼロ埋み16進
    try stdout.print("0x{X:0>4}\n", .{255}); // 0x00FF
}
```

幅の後に `.N` を付けることで浮動小数点の精度も制御できる:

```zig
try stdout.print("{d:.3}\n", .{3.14159}); // 3.142  (小数3桁)
```

## stdin からの読み取り

`std.io.getStdIn().reader()` は `Reader` を返す — `Writer` の入力版だ。最もよく使う操作は、区切りバイトまで1行ずつ読み取ることだ:

```zig
const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    var buf: [256]u8 = undefined;

    const maybe_line = try stdin.readUntilDelimiterOrEof(&buf, '\n');
    if (maybe_line) |line| {
        std.debug.print("you typed: {s}\n", .{line});
    } else {
        std.debug.print("stdin was closed before any input arrived\n", .{});
    }
}
```

`readUntilDelimiterOrEof` は区切り文字（ここでは `'\n'`）に達するかファイル終端になるまで `buf` にバイトを読み込む。戻り値は `?[]u8` — オプショナルなスライスだ:

- EOFの前に少なくとも1バイト読み込んだ場合、`some_slice` を返す（区切り文字自体を含まない、`buf` の埋まった部分）。
- バイトが読まれないまま stdin が既にEOFだった場合、`null` を返す。

`if (maybe_line) |line|` 構文はオプショナルを展開する。`maybe_line` が `null` なら `else` ブランチが実行される。値を持つなら、`|…|` の中の変数 `line` がそれをキャプチャする。

ほとんどのシステムでは行末は `\n` だ。Windowsでは `\r\n` で終わる — スライスには `\n` の前に `\r` バイトが残る。きれいな文字列が必要なときは `std.mem.trimRight(u8, line, &.{'\r', '\n'})` で末尾の空白を取り除く。

### バッファサイズの選択

`readUntilDelimiterOrEof` は行がバッファより長い場合 `error.StreamTooLong` を返す。期待する入力に基づいてバッファサイズを選ぼう: 256バイトはほとんどのユーザープロンプトに十分だが、長い行を持つファイル処理には4096以上を使う。

## テキストからの数値解析

入力はバイトとして届く — `"42"` や `"3.14"` という文字を表す `u8` のスライスであり、整数の `42` や浮動小数点の `3.14` ではない。テキストは明示的に解析しなければならない。

### 整数の解析

`std.fmt.parseInt(T, str, base)` は文字列を指定した基数で型 `T` の整数に変換する。戻り値は `T` またはエラー（`error.InvalidCharacter`、`error.Overflow`）だ:

```zig
const std = @import("std");

pub fn main() !void {
    const text: []const u8 = "42";
    const n: i32 = try std.fmt.parseInt(i32, text, 10);
    std.debug.print("parsed: {d}\n", .{n}); // parsed: 42
}
```

基数に `0` を渡すと、パーサーがプレフィックス（`0x`、`0o`、`0b`）から基数を自動検出する — Zig リテラルで使う4つの基数をすべて受け付けたいときに便利だ。

`try` は解析エラーを伝播する。期待する桁のところに文字があったり、値が `i32` に収まらなかったりすると、関数はエラーを返し `main` はそのエラーで終了する。

### 浮動小数点の解析

`std.fmt.parseFloat(T, str)` は文字列を型 `T` の浮動小数点に変換する:

```zig
const std = @import("std");

pub fn main() !void {
    const text: []const u8 = "3.14";
    const x: f64 = try std.fmt.parseFloat(f64, text);
    std.debug.print("parsed: {d:.2}\n", .{x}); // parsed: 3.14
}
```

`parseInt` と `parseFloat` の違いとして、先頭・末尾の空白を受け付けるのは `parseFloat` だけだ — 入力にスペースが含まれる可能性があるときは、先に `std.mem.trim` で取り除く。

## まとめ: 完全なインタラクティブプログラム

プロンプトを表示し、ユーザーから数値を読み取り、2倍にして返す小さなプログラムを示す:

```zig
const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    const stdout = std.io.getStdOut().writer();

    try stdout.writeAll("Enter a number: ");

    var buf: [64]u8 = undefined;
    const maybe_line = try stdin.readUntilDelimiterOrEof(&buf, '\n');
    const line = maybe_line orelse {
        try stdout.writeAll("No input received.\n");
        return;
    };

    const trimmed = std.mem.trimRight(u8, line, &.{'\r', '\n', ' '});
    const n = std.fmt.parseInt(i64, trimmed, 10) catch |err| {
        try stdout.print("Parse error: {}\n", .{err});
        return;
    };

    try stdout.print("{d} doubled is {d}\n", .{ n, n * 2 });
}
```

注目すべきパターンがいくつかある:

- `maybe_line orelse { … }` は「`null` なら、このブロックを実行してリターンする」の短縮形だ。`if (maybe_line) |l| { line = l; } else { … }` と同等だが簡潔だ。
- `catch |err| { … }` は `parseInt` からのエラーを伝播せずにキャッチする。`|err|` の部分がエラー値を束縛し、表示したり検査したりできる。エラーをバブルアップさせる代わりにローカルで処理したいときに便利だ。
- プロンプト `"Enter a number: "` は改行なしで `writeAll` を使っている — カーソルを同じ行に留め、ユーザーがプロンプトの直後に入力できるようにするためだ。

## まとめ

- 3つの標準ストリームがある: **stdin**（入力）、**stdout**（通常出力）、**stderr**（診断情報）。`std.debug.print` は stderr に書き込む; ユーザー向けの出力には `std.io.getStdOut().writer()` を使う。
- `std.io.getStdOut().writer()` でライターを、`std.io.getStdIn().reader()` でリーダーを得る。どちらの操作も失敗しうるので、これらを使う関数は通常 `!void` を返す。
- ループで多くの行を出力するときは `std.io.bufferedWriter` でライターをラップする。リターンする前に必ず `.flush()` を呼ぶ。
- 書式指定子は値の見た目を制御する: `{d}` は10進、`{x}`/`{X}` は16進、`{b}` は2進、`{s}` は文字列、`{c}` は文字。`{d:>10}` で幅と揃え方を、`{d:0>8}` でゼロ埋めを指定する。
- `reader.readUntilDelimiterOrEof(&buf, '\n')` で1行読み取る。結果は `?[]u8` — `if` か `orelse` で展開する。解析前に末尾の `\r\n` を取り除く。
- テキストを整数に変換するには `std.fmt.parseInt(T, str, base)`、浮動小数点には `std.fmt.parseFloat(T, str)`。どちらも不正な入力にはエラーを返す; `try` で伝播させるか `catch` でローカルに処理する。
