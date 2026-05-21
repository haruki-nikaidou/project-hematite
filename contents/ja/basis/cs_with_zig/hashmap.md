---
title: ハッシュマップ
summary: "ハッシュマップ（hash map）はキーと値のペアを格納し、キーによって平均 $O(1)$ 時間で任意の値を取り出す。Zig の標準ライブラリのハッシュマップをブラックボックスとして使う方法：作成、エントリの挿入と検索、そしてハッシュマップが適切なツールかどうかの判断を学ぶ。"
prerequisites:
  - basis/data_structure/array
  - basis/cs_with_zig/memory_layout
aliases: []
tags:
  - Data Structures
updated: 2026-05-20
---

ドキュメント内の単語頻度を追跡しているとしよう。数千の異なる単語があって「'graph' は何回現れたか？」に即座に答えたい。[配列](/ja/cp/basis/data_structure/array/)ではこれを効率よく行えない — 配列で単語を検索するにはすべてのエントリをスキャンする必要があり $O(n)$ 時間かかる。必要なのは各単語をそのカウントに直接マッピングして定数時間で任意の検索に答える構造だ。それが**ハッシュマップ**（hash map）だ。

## ハッシュマップとは何か

**ハッシュマップ**（ハッシュテーブル、辞書、またはマップとも呼ぶ）は**キーと値のペア**のコレクションを格納する。各キーはマップ内で一意であり、マップはすべてのキーにちょうど 1 つの値を関連付ける。

```text
キー          値
─────────────────
"apple"   →  3
"banana"  →  7
"cherry"  →  1
```

最もよく使う 3 つの操作：

- **put**：キー `k` の下に値 `v` を格納する。`k` がすでに存在する場合、古い値が置き換えられる。
- **get**：キー `k` を与えて関連する値を取り出す — または `k` が不在であることを知る。
- **remove**：`k` のキーと値のペアを削除する。

3 つすべてがマップにすでに含まれているペア数に関わらず**平均 $O(1)$ 時間**で動作する。それがハッシュマップの定義的な約束だ。

どうしてこれを達成できるか？内部メカニズム — *ハッシング*（hashing）と呼ばれる — は後のチェックポイントに任せる。今はハッシュマップを魔法の箱として扱う：キーを渡すと即座に値が返ってくる。スキャンもポインタチェイスも不要だ。契約だけ知っておけばよい：一意のキー、put/get/remove の平均 $O(1)$、$O(n)$ 空間。

## Zig のハッシュマップ

Zig の標準ライブラリは最もよくあるキーの種類に対して 2 つのハッシュマップ型を提供する：

- `std.AutoHashMap(K, V)` — 整数、真偽値、列挙型、単純な構造体などの純粋なデータ型のキー向け。Zig がハッシュ関数を生成する。
- `std.StringHashMap(V)` — `[]const u8` 文字列のキー向け。

どちらも同じインターフェイスを持つ；キーの型だけが異なる。

### ハッシュマップの作成

ヒープ確保の配列と同様、ハッシュマップはヒープに存在する。作成時にアロケータを渡し、完了時に `deinit()` を呼ぶ — [メモリレイアウト](/ja/cp/basis/cs_with_zig/memory_layout/)で見たのと同じパターンだ：

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var map = std.AutoHashMap(i32, []const u8).init(allocator);
    defer map.deinit();  // 常に init とペアにする
}
```

`std.AutoHashMap(i32, []const u8)` は `i32` キーから `[]const u8`（文字列）値へのマップだ。2 つの型パラメータは `(KeyType, ValueType)` だ。

### エントリの挿入と更新

`put(key, value)` は新しいペアを挿入するか、キーがすでに存在する場合は既存の値を上書きする：

```zig
try map.put(1, "one");
try map.put(2, "two");
try map.put(3, "three");
try map.put(2, "TWO");  // キー 2 は "TWO" にマップされる
```

`put` は内部でメモリを確保するためメモリ不足エラーで失敗することがあり、`try` が必要だ。

### 値の検索

`get(key)` は `?V` — オプション値 — を返す。キーがマップにない場合は `null` だ：

```zig
const result = map.get(2);
if (result) |value| {
    std.debug.print("found: {s}\n", .{value}); // found: TWO
} else {
    std.debug.print("not found\n", .{});
}

// キー 99 は挿入されていない
std.debug.print("{?s}\n", .{map.get(99)}); // null
```

### 値を取得せずにメンバーシップを確認する

`contains(key)` は値を返さずに `bool` を返す：

```zig
std.debug.print("{}\n", .{map.contains(1)});  // true
std.debug.print("{}\n", .{map.contains(99)}); // false
```

### エントリの削除

`remove(key)` はペアを削除し、キーが存在した場合は `true`、見つからなかった場合は `false` を返す：

```zig
const was_present = map.remove(3);
std.debug.print("{}\n", .{was_present});       // true
std.debug.print("{}\n", .{map.contains(3)});   // false
```

### エントリ数の確認

`count()` は現在格納されているキーと値のペアの数を返す：

```zig
std.debug.print("{}\n", .{map.count()}); // 2  (キー 1 と 2 が残っている)
```

## 1 ステップで挿入または更新する

単語をカウントするには常に登場するパターンが必要だ：キーがすでに存在すれば値をインクリメントし、そうでなければ初期値で挿入する。`get` の後に `put` でこれを行うと 2 回の検索が必要になる。`getOrPut(key)` は 1 回で行う：

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var counts = std.StringHashMap(u32).init(allocator);
    defer counts.deinit();

    const words = [_][]const u8{
        "the", "cat", "sat", "on", "the", "mat", "the",
    };

    for (words) |word| {
        const entry = try counts.getOrPut(word);
        if (entry.found_existing) {
            entry.value_ptr.* += 1;  // すでにある — インクリメント
        } else {
            entry.value_ptr.* = 1;   // 初回 — 初期化
        }
    }

    std.debug.print("the: {}\n", .{counts.get("the").?}); // the: 3
    std.debug.print("cat: {}\n", .{counts.get("cat").?}); // cat: 1
    std.debug.print("sat: {}\n", .{counts.get("sat").?}); // sat: 1
}
```

`getOrPut` は 2 つのフィールドを持つ構造体を返す：

- `found_existing: bool` — キーがすでにマップにあった場合 `true`。
- `value_ptr: *V` — 値が存在するマップの内部ストレージへの直接ポインタ。

`value_ptr` を通じて書き込むことで、2 回目の検索なしにマップをインプレースで更新する。

## ハッシュマップのイテレーション

`iterator()` はすべてのキーと値のペアを生成する。順序は**未指定** — 挿入順や任意のソート順を仮定しないこと：

```zig
var it = counts.iterator();
while (it.next()) |entry| {
    std.debug.print("{s}: {}\n", .{ entry.key_ptr.*, entry.value_ptr.* });
}
// 出力順は様々："on: 1"、"the: 3"、"cat: 1" など
```

`it.next()` の各呼び出しは `?Entry` を返す。`it.next()` が `null` を返すとループが止まる。

## ハッシュマップをいつ使うか

ハッシュマップが適切な選択な場合：

- 数値位置ではなく意味のあるキー — 名前、ID、単語 — で値を検索する必要がある。
- キーの集合がコンパイル時に不明か、キーが 0 から始まる連続した整数でない。
- 平均 $O(1)$ の挿入、検索、削除が必要だ。

[配列](/ja/cp/basis/data_structure/array/)は、キーが 0 から始まる密な整数のとき依然として好ましい。配列のインデックス参照はすべてのハッシュマップのオーバーヘッドを避けてキャッシュにも優しい。キーが任意の場合はハッシュマップを使い、キーが密なインデックスの場合は配列を使う。

## まとめ

- **ハッシュマップ**は**キーと値のペア**を格納し、格納されているエントリ数に関わらず put、get、remove の平均 $O(1)$ 時間を提供する。
- Zig では整数、真偽値、列挙型、または構造体のキーには `std.AutoHashMap(K, V)` を、文字列キーには `std.StringHashMap(V)` を使う。
- `.init(allocator)` で作成し、常に `defer map.deinit()` とペアにしてヒープメモリを解放する。
- `put(key, value)` は挿入または上書き、`get(key)` は `?V` を返す（不在なら null）、`remove(key)` は削除してキーが存在したかを報告する。
- `getOrPut(key)` は 1 回の検索で見つけるか挿入する — カウントと累積の効率的なパターン。
- `count()` はペア数を返す、`iterator()` はすべてのペアを未指定の順序で走査する。
- キーが密な非負整数なら配列を使い、任意のキーにはハッシュマップを使う。
