---
title: 幅優先探索
summary: "幅優先探索（BFS）は選ばれた始点から距離 k の頂点をすべて訪問してから距離 k+1 の頂点を訪問するという形でグラフを層ごとに探索する。このチェックポイントではキューを使った BFS の導出、重み無しグラフで最短距離を計算することの証明、$O(V+E)$ の実行時間の分析を行う。"
prerequisites:
  - basis/algorithm/time_complexity
  - basis/data_structure/queue
  - basis/cs_with_zig/graph_represent
aliases: []
tags:
  - Algorithms
  - Graphs
  - Search
updated: 2026-05-20
---

地図上の最短経路を求める、ソーシャルネットワークの知人の距離を計算する、ウェブのリンクをクロールする — これらはすべて同じ問題に帰着する：始点からの距離順にグラフを探索する。**幅優先探索**（breadth-first search / BFS）はまさにこれを行うアルゴリズムであり、グラフのサイズに比例した時間で動作する。

## BFS のグラフ探索方法

選んだ**始点**（source）頂点 $s$ から、BFS は層ごとに広がる。まず $s$ から 1 辺で到達できるすべての頂点を訪問し、次に 2 辺で到達できるすべての頂点を訪問するという具合だ。距離 $k$ のすべての頂点を処理し終えるまで距離 $k+1$ には進まない。

[キュー](../../data_structure/queue/)がこの層ごとの規律を強制する。頂点は発見された時点で後ろに追加され、処理される時点で前から取り出される。こうして早く発見された（近い）頂点が常に先に処理される。閉路のあるグラフで頂点を再訪するのを避けるため、BFS は頂点をキューに追加した瞬間にその**距離**を記録する。距離が記録された頂点は二度とキューに追加されない。

小さな例グラフでのトレースを示す：

```text
0 ──── 1
│      │
2 ──── 3
```

始点 $s = 0$ からの BFS：

| ステップ | 処理 | 発見 | キュー（処理後） | dist の更新 |
|------|---------|----------|-------------|--------------|
| 初期化 | — | 0 | [0] | d[0]=0 |
| 1 | 0 | 1, 2 | [1, 2] | d[1]=1, d[2]=1 |
| 2 | 1 | 3 | [2, 3] | d[3]=2 |
| 3 | 2 | （1 と 3 はすでに訪問済み） | [3] | — |
| 4 | 3 | （1 と 2 はすでに訪問済み） | [] | — |

BFS 完了後、頂点 0 からの距離は：

$$
d[0] = 0, \quad d[1] = 1, \quad d[2] = 1, \quad d[3] = 2
$$

これらはこの重み無しグラフの真の最短距離だ。

## アルゴリズム

BFS は距離配列 $d$ を保持し、始点 $s$ 以外はすべて $\infty$ に初期化する（$d[s] = 0$）。各ステップで先頭の頂点 $u$ をデキューし、各隣接頂点 $v$ を調べる。$d[v]$ がまだ $\infty$ なら、まだ到達されていない：$d[v] = d[u] + 1$ と設定して $v$ をエンキューする。

```text
BFS(graph, source s):
    d[v] = ∞  for all v
    d[s] = 0
    enqueue s

    while queue is not empty:
        u = dequeue
        for each neighbor v of u:
            if d[v] == ∞:
                d[v] = d[u] + 1
                enqueue v
```

`d[v] == ∞` のチェックが訪問済みチェックを兼ねる。一度有限の距離が設定されると、その頂点は二度とエンキューされない。

## Zig での BFS 実装

実装は[隣接リスト](../../cs_with_zig/graph_represent/)をグラフの表現として使う。キューとして `head` インデックス付きの `ArrayList` がクリーンに機能する：`append` で後ろに追加し、`head` を進めることで前から削除する。

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    // 例グラフの隣接リストを構築する。
    const adj = try allocator.alloc(std.ArrayList(usize), n);
    defer allocator.free(adj);
    for (adj) |*list| list.* = std.ArrayList(usize).init(allocator);
    defer for (adj) |*list| list.deinit();

    const edges = [_][2]usize{ .{ 0, 1 }, .{ 0, 2 }, .{ 1, 3 }, .{ 2, 3 } };
    for (edges) |e| {
        try adj[e[0]].append(e[1]);
        try adj[e[1]].append(e[0]);
    }

    // 始点頂点 0 からの BFS。
    const dist = try allocator.alloc(usize, n);
    defer allocator.free(dist);
    @memset(dist, std.math.maxInt(usize));  // ∞

    // ArrayList をキューとして使う：head は先頭要素のインデックス。
    var queue = std.ArrayList(usize).init(allocator);
    defer queue.deinit();
    var head: usize = 0;

    dist[0] = 0;
    try queue.append(0);

    while (head < queue.items.len) {
        const u = queue.items[head];
        head += 1;

        for (adj[u].items) |v| {
            if (dist[v] == std.math.maxInt(usize)) {  // まだ到達していない
                dist[v] = dist[u] + 1;
                try queue.append(v);
            }
        }
    }

    for (0..n) |v| {
        std.debug.print("dist[{}] = {}\n", .{ v, dist[v] });
        // dist[0] = 0
        // dist[1] = 1
        // dist[2] = 1
        // dist[3] = 2
    }
}
```

`queue` 配列は `append` によって右に伸び、`head` によって左から消費される。すべての頂点はちょうど 1 回追加されるため、キューの合計空間は $O(V)$ だ。

## BFS が最短経路を見つける理由

アルゴリズム全体を通して次の不変条件が成立する：

> 頂点 $v$ がエンキューされるとき、$d[v]$ は $s$ から $v$ への最短経路の長さと等しい。

**基底ケース**：$d[s] = 0$ で $s$ から $s$ への空のパスの長さは 0。✓

**帰納的ステップ**：現在キューにあるすべての頂点が正しい距離を持つと仮定する。BFS が $u$ をデキューして $d[v] = \infty$ の隣接頂点 $v$ を見つけたとき、$d[v] = d[u] + 1$ と設定する。より短いパスは存在するか？$v$ へのいかなるパスも $v$ に隣接する頂点 $w$ を通らなければならない。$d[w] < d[u]$ なら、$w$ は $u$ より先にエンキューされた — BFS はより近い頂点を先に処理する — ので $w$ はすでに処理されている。しかしそうなら $w$ を処理したとき $v$ に到達していたはずで、$d[v] = \infty$ に矛盾する。よって $d[u] + 1$ が真の最短距離だ。

帰納法により、BFS が割り当てるすべての距離は正しい。

## 実行時間

BFS は各頂点を最大 1 回エンキューする（$d[v] = \infty$ の頂点のみエンキューされる）。頂点 $u$ をデキューするたびにアルゴリズムは $\deg(u)$ 個の隣接頂点を反復する。すべての頂点で合計すると：

$$
\sum_{u \in V} \deg(u) = 2|E|
$$

無向辺 $(u, v)$ はそれぞれ $\deg(u)$ と $\deg(v)$ に等しく寄与するためだ。$O(V)$ の初期化コストを加えると：

$$
T(V, E) = O(V + E)
$$

これは最適だ：すべての頂点と辺を調べなければならないアルゴリズムは $\Theta(V + E)$ より良くできない。

## まとめ

- **BFS** は始点 $s$ から距離 $k$ の頂点をすべて処理してから距離 $k+1$ に進むという形でグラフを層ごとに探索する。
- **キュー**が層ごとの順序を強制する。頂点はエンキューされた瞬間に到達済みとしてマーク（有限の距離が割り当てられ）、重複を防ぐ。
- BFS は重み無しグラフで**最短経路距離**を計算する：頂点が初めて到達されたとき割り当てられた距離は証明可能な最小値だ。
- 実行時間は $O(V + E)$：各頂点は 1 回エンキューされ、各辺は最大 2 回調べられる。
- 隣接頂点の反復コストを $O(V)$ でなく $O(\deg(u))$ にするため隣接リストを使う。
