---
title: 連結リスト
summary: "連結リスト（linked list）は要素を連続したメモリに格納するのではなく、ポインタでノードをつなぐ構造だ。既知の位置での挿入・削除が $O(1)$ である代わりに、インデックスアクセスは $O(n)$ になる。"
prerequisites: 
  - basis/cs_with_zig/pointer
  - basis/data_structure/array
aliases: []
tags:
  - Data Structures
updated: 2026-05-16
---

[配列](/ja/cp/basis/data_structure/array/)が $O(1)$ のインデックスアクセスを実現できるのは、要素を連続して詰め込んでいるからだ。しかしその同じレイアウトが、挿入と削除を高コストにする — ギャップより後のすべての要素を 1 つずつずらす必要があり、$O(n)$ の時間がかかる。**連結リスト**（linked list）はこの問題をポインタで独立したノードをつなぐことで完全に回避し、2 つのノードの間への挿入をポインタの更新だけで済ませる。

## 連結リストの構造

連結リストは**ノード**（node）のチェーンだ。各ノードは値と、次のノードへのポインタを持つ。最初のノード — **ヘッド**（head） — への 1 本のポインタだけがチェーン全体へのアクセス手段になる。最後のノードの `next` ポインタは `null` でチェーンの終わりを示す。

[ポインタ](/ja/cp/basis/cs_with_zig/pointer/)では、このまさしき形を紹介した。オプショナルポインタを通じて自分自身を参照する構造体だ。そこで登場した `Node` 型がここでの構成要素になる：

```zig
const Node = struct {
    value: i32,
    next:  ?*Node,
};
```

3 つのノードからなるリストのメモリ上の配置は次のようになる：

```text
head
 │
 ▼
┌────────────┐    ┌────────────┐    ┌────────────┐
│ value = 10 │    │ value = 20 │    │ value = 30 │
│ next  ─────┼───►│ next  ─────┼───►│ next = null│
└────────────┘    └────────────┘    └────────────┘
   0x1a4c            0x2f10            0x3b88
```

3 つのアドレスは配列のものとはまったく異なる。ノードは、アロケータが空き領域を見つけた場所それぞれに散在している。この散在こそが連結リストの定義的特徴であり、その強みでも弱みでもある。

## ヒープ上のノード

[ポインタ](/ja/cp/basis/cs_with_zig/pointer/)では例をシンプルに保つためにノードをスタック（stack）上に置いた。実用的な連結リストは**ヒープ**（heap）上に置く必要がある。コンパイル時にいくつのノードが必要かはほとんどわからないし、新しいノードはそれを作った関数よりも長く生存しなければならない。

`allocator.create(T)` はヒープ上に型 `T` の値 1 つ分の領域を確保し、`!*T` を返す。配列に使った `allocator.alloc(T, n)` のノード単位版だ。

以下は、ヘッドへの先頭追加を繰り返してリストを構築し、走査して、すべてのノードを解放する完全なプログラムだ：

```zig
const std = @import("std");

const Node = struct {
    value: i32,
    next:  ?*Node,
};

fn prepend(allocator: std.mem.Allocator, head: ?*Node, value: i32) !*Node {
    const node = try allocator.create(Node);
    node.* = .{ .value = value, .next = head };
    return node;
}

fn freeList(allocator: std.mem.Allocator, head: ?*Node) void {
    var current = head;
    while (current) |node| {
        const next = node.next;  // 解放前に保存する — 解放済みメモリの読み取りは未定義動作
        allocator.destroy(node);
        current = next;
    }
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var head: ?*Node = null;
    head = try prepend(allocator, head, 30);
    head = try prepend(allocator, head, 20);
    head = try prepend(allocator, head, 10);
    defer freeList(allocator, head);

    var current: ?*Node = head;
    while (current) |node| {
        std.debug.print("{}\n", .{node.value}); // 10, 20, 30 の順に表示
        current = node.next;
    }
}
```

`prepend` はノードを 1 つ作成し、その `next` を現在のヘッドに設定して、新しいノードを新たなヘッドとして返す。リストがどれだけ長くても 2 本のポインタに触れるだけ — $O(1)$ だ。

`freeList` はチェーンを走査して各ノードを destroy する。`destroy` を呼ぶと `node` のメモリはもう有効ではないため、`node.next` を事前に保存しておく必要がある。

## 既知の位置への挿入と削除

連結リストが配列より優位に立つのは、リスト中のあるノードへのポインタをすでに持っているときだ。

**ノードの後ろに挿入：**

```zig
fn insertAfter(allocator: std.mem.Allocator, prev: *Node, value: i32) !void {
    const new_node = try allocator.create(Node);
    new_node.* = .{ .value = value, .next = prev.next };
    prev.next = new_node;
}
```

変更されるポインタフィールドは `new_node.next` と `prev.next` の 2 つだけで、リストの長さに関わらず $O(1)$ だ。

配列の位置 $i$ への挿入と比べてみよう。インデックス $i$ 以降のすべての要素を 1 スロット右にずらす必要があり、$O(n)$ の書き込みが生じる。

**指定ノードの次のノードを削除：**

```zig
fn removeAfter(allocator: std.mem.Allocator, prev: *Node) void {
    const target = prev.next orelse return;
    prev.next = target.next;
    allocator.destroy(target);
}
```

こちらもポインタの更新だけ — $O(1)$ だ。

**ヘッドを削除：**

```zig
fn popFront(allocator: std.mem.Allocator, head: *?*Node) void {
    const old_head = head.* orelse return;
    head.* = old_head.next;
    allocator.destroy(old_head);
}
```

`head` はヘッドポインタへのポインタ（`*?*Node`）にしており、呼び出し元のヘッド変数を更新できるようにしている。3 つの操作はいずれも、適切なポインタを持っていれば $O(1)$ だ。

## 連結リストが手放すもの

$O(1)$ の挿入・削除には現実のコストが伴う。

**$O(1)$ のインデックスアクセスがない。** 配列が使うようなベースアドレスの計算式が存在しない。位置 $i$ のノードに到達するには、ヘッドから `next` ポインタをたどって 1 つずつ進むしかなく、$O(n)$ かかる。既知のインデックスへの読み取りが中心のワークロードなら配列の勝ちだ。

**ポインタのオーバーヘッド。** 各ノードは値の他に少なくとも 1 本のポインタを保持する。64 ビットマシンではノードあたり 8 バイト余分にかかる。`i32`（4 バイト）が 100 万個あるリストは、4 MB のデータに加えて少なくとも 8 MB のポインタオーバーヘッドを抱える。

**キャッシュ効率の悪さ。** 現代の CPU はメモリをキャッシュライン（cache line）単位、すなわち 64 バイトのブロックでロードする。配列の要素は隣接して詰まっているため、1 つの要素をフェッチすると近くの要素も一緒にキャッシュに入ることが多い。連結リストのノードは散在しているため、`node.next` をたどるたびにキャッシュミスが発生し、CPU が数十ナノ秒停止しやすい。実際には、連結リストの走査は同じ $O(n)$ の配列走査より何倍も遅くなることがある。

## 操作の比較

| 操作 | 連結リスト | 配列 |
|------|-----------|------|
| インデックス $i$ の読み書き | $O(n)$ | $O(1)$ |
| ヘッドへの挿入・削除 | $O(1)$ | $O(n)$ |
| 既知のノードの後ろへの挿入・削除 | $O(1)$ | $O(n)$ |
| 値の検索 | $O(n)$ | $O(n)$ |
| 末尾への追加（tail ポインタなし） | $O(n)$ | $O(1)$ ならし |
| 要素あたりのメモリ | 値 + ポインタ | 値のみ |

連結リストが適しているのは、すでにポインタを持っている位置への挿入・削除が頻繁で、任意のインデックスへのジャンプがほとんど必要ない場面だ。

## 双方向連結リスト

上のノードは前方向にしかポインタを持たない。後ろ向きのポインタを加えることもできる：

```zig
const DNode = struct {
    value: i32,
    next:  ?*DNode,
    prev:  ?*DNode,
};
```

**双方向連結リスト**（doubly linked list）はノードあたり 8 バイト余分にかかるが、2 つの利点が得られる。どちらの方向にも走査できること、そしてノード自体だけを持っていれば — 直前のノードを探さなくても — $O(1)$ での削除ができること。Rust の `std::collections::LinkedList` や標準ライブラリのデック（deque）実装の多くが双方向ノードを使う理由はここにある。

## まとめ

- **連結リスト**は `next` ポインタでつながれたノードのチェーンで、最後のノードの `next` は `null` だ。
- **ヘッド**ポインタが唯一のエントリポイントだ。走査は $O(n)$ で、$O(1)$ のインデックスアクセスはない。
- ノードはヒープ上に置く。`allocator.create(Node)` で確保し、`allocator.destroy(node)` で解放する。解放前に必ず `node.next` を保存しておく。
- **既知の位置への挿入・削除は $O(1)$** — リストの長さに関わらず、ポインタを 2 本更新するだけだ。
- コスト：ノードあたりのポインタオーバーヘッドと、散在したメモリによる走査時の頻繁なキャッシュミス。
- **双方向連結リスト**は `prev` ポインタを追加し、ノード単体からの $O(1)$ 削除と逆方向の走査を可能にする。
