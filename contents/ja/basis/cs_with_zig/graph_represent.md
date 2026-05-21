---
title: Zig でグラフを表現する
summary: "隣接行列と隣接リストは同じグラフを相反するトレードオフで格納する：行列は $O(1)$ の辺検索を提供するが $O(n^2)$ の空間を使い、リストは $O(n+m)$ の空間を使うが隣接頂点の列挙を実際の次数に比例した時間で行う。両方を Zig で実装し、それぞれが適切な選択である場面を学ぶ。"
prerequisites:
  - basis/data_structure/array
  - basis/data_structure/linked_list
  - basis/data_structure/graph
  - basis/cs_with_zig/hashmap
aliases: []
tags:
  - Data Structures
  - Graph Theory
updated: 2026-05-20
---

[グラフ](/ja/cp/basis/data_structure/graph/)はグラフが*何であるか*を定義した。今度の問いはメモリにどう格納するかだ。これは学術的な問題ではない — 選んだ表現がどの操作が速くどの操作が遅いかを決め、それがアルゴリズムの性能に直接影響する。

2 つの標準的な表現は**隣接行列**（adjacency matrix）と**隣接リスト**（adjacency list）だ。3 つ目の[ハッシュマップ](/ja/cp/basis/cs_with_zig/hashmap/)を使ったオプションは、高速な辺検索が必要な疎なグラフに有用だ。3 つともに同じ数学的対象を表現し、メモリの整理の仕方だけが異なる。

このチェックポイント全体を通して、グラフは $0, 1, \ldots, n-1$ とラベル付けされた $n$ 頂点と $m$ 辺を持つと仮定する。全体で使う例グラフは：

```text
0 ──── 1
│      │
2 ──── 3
```

$n = 4$ 頂点と $m = 4$ 辺：$(0,1)$, $(0,2)$, $(1,3)$, $(2,3)$。

## 隣接行列

**隣接行列**（adjacency matrix）は $n \times n$ の二次元配列だ。行 $u$、列 $v$ のエントリが辺 $(u, v)$ の存在を教える。

- **重み無しグラフ**：辺が存在すれば `true`、そうでなければ `false`。
- **重み付きグラフ**：エントリは辺の重み。センチネル値（多くの場合 `0` または最大整数）が「辺なし」を表す。

例グラフの行列：

```text
     0      1      2      3
0 [ false, true,  true,  false ]
1 [ true,  false, false, true  ]
2 [ true,  false, false, true  ]
3 [ false, true,  true,  false ]
```

グラフが無向のため、行列は対称だ：エントリ $(u, v)$ は常にエントリ $(v, u)$ と等しい。

### Zig での実装

二次元行列はフラットな `[]bool` スライスに自然にマッピングされる。行 $u$ はインデックス $u \times n$ から始まるので、エントリ $(u, v)$ はインデックス $u \times n + v$ にある：

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    const matrix = try allocator.alloc(bool, n * n);
    defer allocator.free(matrix);
    @memset(matrix, false);  // 辺なしで開始

    // u と v の間に無向辺を追加する
    const addEdge = struct {
        fn f(mat: []bool, cols: usize, u: usize, v: usize) void {
            mat[u * cols + v] = true;
            mat[v * cols + u] = true;  // 無向：両方向
        }
    }.f;

    addEdge(matrix, n, 0, 1);
    addEdge(matrix, n, 0, 2);
    addEdge(matrix, n, 1, 3);
    addEdge(matrix, n, 2, 3);

    // O(1) の辺チェック
    std.debug.print("edge (0,1): {}\n", .{matrix[0 * n + 1]}); // true
    std.debug.print("edge (0,3): {}\n", .{matrix[0 * n + 3]}); // false

    // 頂点 1 の隣接頂点を列挙する：行全体をスキャンする必要がある — O(n)
    std.debug.print("neighbors of 1: ", .{});
    for (0..n) |v| {
        if (matrix[1 * n + v]) std.debug.print("{} ", .{v}); // 0 3
    }
    std.debug.print("\n", .{});
}
```

`@memset(matrix, false)` はアロケーション全体をゼロクリアし、実際の辺を追加する前にすべての辺を不在に設定する。

### トレードオフ

**辺検索は $O(1)$。** 辺 $(u, v)$ が存在するか？インデックス $u \times n + v$ への配列の 1 回の読み取り。

**隣接頂点の列挙は $O(n)$。** $u$ に隣接するすべての頂点を見つけるには、$u$ が 2 つの隣接頂点しか持たなくても行全体 — $n$ エントリ — をスキャンしなければならない。

**空間は $O(n^2)$。** 1,000 頂点のグラフは実際に存在する辺の数に関わらず $1{,}000 \times 1{,}000$ の行列 — 100 万エントリ — を必要とする。

隣接行列は**密なグラフ** — $m$ が $n^2$ に近い — で威力を発揮する。ほぼすべての頂点ペアが接続されているとき、$O(n^2)$ のメモリは無駄にならず、$O(1)$ の辺検索が価値を持つ。

## 隣接リスト

**隣接リスト**（adjacency list）は各頂点に隣接頂点のリストを 1 つ格納する。実際に存在する辺に比例したメモリしか確保せず、疎なグラフに対してはるかに効率的だ。

```text
頂点 0 → [1, 2]
頂点 1 → [0, 3]
頂点 2 → [0, 3]
頂点 3 → [1, 2]
```

### ArrayList を使った実装

Zig の `std.ArrayList(T)` は成長可能な配列 — 要素を追加すると拡張できるヒープ確保のスライスに似たもの — だ。`append(value)` でアイテムを追加し、現在の内容を `list.items` でアクセスする：

```zig
var list = std.ArrayList(usize).init(allocator);
defer list.deinit();
try list.append(42);
try list.append(7);
// list.items は今スライス [42, 7]
```

隣接リストでは、頂点ごとに 1 つの `ArrayList(usize)` を作成し、辺を追加するときに隣接頂点のインデックスを追加する：

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    // 頂点ごとに 1 つの成長可能な隣接頂点リスト
    const adj = try allocator.alloc(std.ArrayList(usize), n);
    defer allocator.free(adj);

    for (adj) |*list| list.* = std.ArrayList(usize).init(allocator);
    defer for (adj) |*list| list.deinit();

    const addEdge = struct {
        fn f(a: []std.ArrayList(usize), u: usize, v: usize) !void {
            try a[u].append(v);
            try a[v].append(u);  // 無向
        }
    }.f;

    try addEdge(adj, 0, 1);
    try addEdge(adj, 0, 2);
    try addEdge(adj, 1, 3);
    try addEdge(adj, 2, 3);

    // 頂点 1 の隣接頂点を列挙する：O(deg(1))、実際の隣接頂点のみ訪問
    std.debug.print("neighbors of 1: ", .{});
    for (adj[1].items) |v| std.debug.print("{} ", .{v}); // 0 3
    std.debug.print("\n", .{});

    // 辺チェック：O(deg(u)) — v を探してリストをスキャン
    const hasEdge = struct {
        fn f(a: []std.ArrayList(usize), u: usize, v: usize) bool {
            for (a[u].items) |w| if (w == v) return true;
            return false;
        }
    }.f;
    std.debug.print("edge (0,1): {}\n", .{hasEdge(adj, 0, 1)}); // true
    std.debug.print("edge (0,3): {}\n", .{hasEdge(adj, 0, 3)}); // false
}
```

### トレードオフ

**隣接頂点の列挙は $O(\deg(u))$。** `adj[u].items` を反復すると $u$ の実際の隣接頂点のみを訪問する — 不在の辺をスキャンする無駄な仕事がない。

**辺検索は $O(\deg(u))$。** $(u, v)$ が存在するかチェックするには $u$ の隣接リストを線形スキャンする必要がある。

**空間は $O(n + m)$。** $n$ 個のリストに合計 $2m$ エントリを格納する（各無向辺は 2 つのリストに現れる）。$m \ll n^2$ の疎なグラフでは $n^2$ の行列よりはるかに少ないメモリだ。

隣接リストは**疎なグラフ** — そして現実のグラフのほとんどは疎だ — に適切な選択だ。道路網、ソーシャルネットワーク、依存グラフはいずれも $m$ が $n^2$ よりはるかに小さい。

## 隣接マップ

疎なグラフで $O(1)$ 平均の辺検索*と* $O(\deg(u))$ の隣接頂点列挙の両方が必要なら、各隣接リストを[ハッシュマップ](/ja/cp/basis/cs_with_zig/hashmap/)に置き換える。頂点ごとに `std.AutoHashMap(usize, void)` を格納する — キーは隣接頂点、値は `void`（データなし、存在のみを示す）。重み付きグラフには `std.AutoHashMap(usize, f64)` を使って重みを格納する。

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    const adj = try allocator.alloc(std.AutoHashMap(usize, void), n);
    defer allocator.free(adj);

    for (adj) |*m| m.* = std.AutoHashMap(usize, void).init(allocator);
    defer for (adj) |*m| m.deinit();

    // 無向辺を追加する
    const addEdge = struct {
        fn f(a: []std.AutoHashMap(usize, void), u: usize, v: usize) !void {
            try a[u].put(v, {});
            try a[v].put(u, {});
        }
    }.f;

    try addEdge(adj, 0, 1);
    try addEdge(adj, 0, 2);
    try addEdge(adj, 1, 3);
    try addEdge(adj, 2, 3);

    // 平均 O(1) の辺検索
    std.debug.print("edge (0,1): {}\n", .{adj[0].contains(1)}); // true
    std.debug.print("edge (0,3): {}\n", .{adj[0].contains(3)}); // false

    // O(deg(u)) の隣接頂点列挙
    std.debug.print("neighbors of 1: ", .{});
    var it = adj[1].keyIterator();
    while (it.next()) |k| std.debug.print("{} ", .{k.*});
    std.debug.print("\n", .{});
}
```

`put(v, {})` の `{}` は `void` のゼロサイズ値 — 空間を取らず「このキーが存在する」を示す。

隣接マップは $O(1)$ 平均の辺チェックと引き換えに、頂点ごとに 1 つのハッシュマップと関連するブックキーピングという高い定数倍のオーバーヘッドを支払う。そのトレードオフが価値あるかは、アルゴリズムが個々の辺をどれくらい頻繁にクエリするかによる。

## 表現の選択

| | 隣接行列 | 隣接リスト | 隣接マップ |
|---|---|---|---|
| 辺チェック $(u, v)$ | $O(1)$ | $O(\deg(u))$ | 平均 $O(1)$ |
| $u$ の隣接頂点列挙 | $O(n)$ | $O(\deg(u))$ | $O(\deg(u))$ |
| 空間 | $O(n^2)$ | $O(n + m)$ | $O(n + m)$ |
| 最適な場面 | 密なグラフ | 疎なグラフ | 疎＋頻繁な辺チェック |
| 定数倍オーバーヘッド | 低い | 低い | 高い |

経験則：

- グラフが**密**（$m \approx n^2$）なら**隣接行列**を使う。
- グラフが**疎**（$m \ll n^2$）なら**隣接リスト**を使う。
- 疎なグラフで $O(1)$ の辺チェックが必要なら、**隣接マップ**を検討する — ただしプロファイリングでリストの線形スキャンが実際のボトルネックになっている場合のみ。

現実のグラフのほとんどは疎だ。最も重要なグラフアルゴリズム — BFS、DFS、ダイクストラ最短経路、トポロジカルソート — はすべて隣接リストを念頭に設計されており、計算量の分析は $O(\deg(u))$ の隣接頂点イテレーションを仮定している。

## まとめ

- **隣接行列**はサイズ $n \times n$ のフラットな `[]bool` スライスで、エントリ $(u, v)$ はインデックス $u \times n + v$ にある。辺チェック：$O(1)$；隣接頂点列挙：$O(n)$；空間：$O(n^2)$。
- **隣接リスト**は `[]std.ArrayList(usize)` — 頂点ごとに 1 つの成長可能なリスト。辺チェック：$O(\deg(u))$；隣接頂点列挙：$O(\deg(u))$；空間：$O(n + m)$。
- **隣接マップ**は `[]std.AutoHashMap(usize, void)` — 頂点ごとに 1 つのハッシュマップ。辺チェック：平均 $O(1)$；隣接頂点列挙：$O(\deg(u))$；空間：$O(n + m)$ でより高い定数倍オーバーヘッド。
- 密なグラフには**隣接行列**を使い、疎なグラフ（一般的なケース）には**隣接リスト**を使い、疎なグラフで高速な辺チェックが必要な場合のみ**隣接マップ**を使う。
- 無向グラフでは、すべての辺 $(u, v)$ を両方向に記録しなければならない。
