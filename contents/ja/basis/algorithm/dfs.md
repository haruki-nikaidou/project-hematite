---
title: 深さ優先探索
summary: "深さ優先探索（DFS）は各頂点からバックトラックする前にできる限り深く探索する。このチェックポイントでは再帰版と明示的スタック版の両方を導出し、閉路検出やトポロジカルソートなどの応用を可能にする発見時刻と完了時刻をトレースし、$O(V+E)$ の実行時間を分析する。"
prerequisites:
  - basis/algorithm/time_complexity
  - basis/data_structure/stack
  - basis/cs_with_zig/recursive
  - basis/cs_with_zig/graph_represent
aliases: []
tags:
  - Algorithms
  - Graphs
  - Search
updated: 2026-05-20
---

[BFS](../bfs/) は層ごとに探索することで「最短経路は何か？」に答える。**深さ優先探索**（depth-first search / DFS）は異なる問いを立てる：「グラフの全体的な構造は何か？」— そして戻る前にできる限り深く潜ることで答える。DFS が記録するタイムスタンプが、閉路検出やトポロジカルソートなどのエンジンとなる。

## DFS のグラフ探索方法

頂点 $u$ から始まり、DFS はすぐに最初の未訪問の隣接頂点に再帰し、さらにその頂点の最初の未訪問の隣接頂点に再帰するという具合だ。頂点に未訪問の隣接頂点がなくなって初めて**バックトラック**（backtrack）して呼び出し元に戻り、次の選択肢を試す。探索は本を読むような展開だ：目次に戻る前に一つの章を深く読み進む。

DFS はすべての頂点に 2 つの**タイムスタンプ**を付与する：

- **発見時刻** $d[u]$：$u$ に最初に入った瞬間。
- **完了時刻** $f[u]$：$u$ の部分木が完全に探索されて呼び出し元に制御が戻る瞬間。

[Zig でグラフを表現する](../../cs_with_zig/graph_represent/)の例グラフ（隣接リスト 0→[1,2], 1→[0,3], 2→[0,3], 3→[1,2]）でのトレース：

```text
0 ──── 1
│      │
2 ──── 3
```

```text
call dfs(0)         d[0] = 1
  call dfs(1)       d[1] = 2
    0 は訪問済み — スキップ
    call dfs(3)     d[3] = 3
      1 は訪問済み — スキップ
      call dfs(2)   d[2] = 4
        0 は訪問済み — スキップ
        3 は訪問済み — スキップ
      return        f[2] = 5
    return          f[3] = 6
  return            f[1] = 7
  2 は訪問済み — スキップ
return              f[0] = 8
```

区間 $[d[u], f[u]]$ — ここでは $[1,8]$、$[2,7]$、$[3,6]$、$[4,5]$ — は**括弧定理**（parenthesis theorem）を満たす：任意の 2 頂点 $u$ と $v$ について、それらの区間は完全に入れ子になるか完全に素（disjoint）かのどちらかだ。部分的に重なることはない。

## 再帰 DFS

再帰実装はコンセプトを最も直接的に翻訳したものだ。`State` 構造体がすべての可変フィールドを保持し、再帰メソッドが更新できる：

```zig
const std = @import("std");

const State = struct {
    adj: []std.ArrayList(usize),
    disc: []usize,
    fin: []usize,
    visited: []bool,
    timer: usize,

    fn dfs(self: *State, u: usize) void {
        self.timer += 1;
        self.disc[u] = self.timer;
        self.visited[u] = true;

        for (self.adj[u].items) |v| {
            if (!self.visited[v]) self.dfs(v);
        }

        self.timer += 1;
        self.fin[u] = self.timer;
    }
};

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    const adj = try allocator.alloc(std.ArrayList(usize), n);
    defer allocator.free(adj);
    for (adj) |*list| list.* = std.ArrayList(usize).init(allocator);
    defer for (adj) |*list| list.deinit();

    const edges = [_][2]usize{ .{ 0, 1 }, .{ 0, 2 }, .{ 1, 3 }, .{ 2, 3 } };
    for (edges) |e| {
        try adj[e[0]].append(e[1]);
        try adj[e[1]].append(e[0]);
    }

    const disc = try allocator.alloc(usize, n);
    defer allocator.free(disc);
    const fin = try allocator.alloc(usize, n);
    defer allocator.free(fin);
    const visited = try allocator.alloc(bool, n);
    defer allocator.free(visited);
    @memset(visited, false);

    var state = State{
        .adj = adj,
        .disc = disc,
        .fin = fin,
        .visited = visited,
        .timer = 0,
    };

    // 外側のループが非連結グラフを処理する：未訪問の頂点すべてから
    // 新しい DFS を開始してどの連結成分も漏らさない。
    for (0..n) |u| {
        if (!state.visited[u]) state.dfs(u);
    }

    for (0..n) |v| {
        std.debug.print("vertex {}: disc={} fin={}\n", .{ v, disc[v], fin[v] });
        // vertex 0: disc=1 fin=8
        // vertex 1: disc=2 fin=7
        // vertex 2: disc=4 fin=5
        // vertex 3: disc=3 fin=6
    }
}
```

## 明示的スタックを使った反復 DFS

[再帰](../../cs_with_zig/recursive/)は DFS に自然だが、数百万頂点のグラフでは[コールスタック](../../cs_with_zig/calling_stack/)がオーバーフローする。暗黙のコールスタックを明示的な[スタック](../../data_structure/stack/)に置き換えることで制限をなくせる。

重要な違い：明示的スタックは*現在オープンな*頂点ではなく*処理待ち*の頂点を保持する。そのため追加のブックキーピングなしに完了時刻を計算できないが、単純な到達可能性と訪問順序は問題なく機能する：

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    const adj = try allocator.alloc(std.ArrayList(usize), n);
    defer allocator.free(adj);
    for (adj) |*list| list.* = std.ArrayList(usize).init(allocator);
    defer for (adj) |*list| list.deinit();

    const edges = [_][2]usize{ .{ 0, 1 }, .{ 0, 2 }, .{ 1, 3 }, .{ 2, 3 } };
    for (edges) |e| {
        try adj[e[0]].append(e[1]);
        try adj[e[1]].append(e[0]);
    }

    const visited = try allocator.alloc(bool, n);
    defer allocator.free(visited);
    @memset(visited, false);

    // ArrayList をスタックとして使う：append でプッシュ、pop で最後の要素を削除。
    var stack = std.ArrayList(usize).init(allocator);
    defer stack.deinit();

    for (0..n) |start| {
        if (visited[start]) continue;
        try stack.append(start);

        while (stack.items.len > 0) {
            const u = stack.pop();
            if (visited[u]) continue;  // 複数の先行頂点によってプッシュされた場合
            visited[u] = true;
            std.debug.print("visit {}\n", .{u});

            for (adj[u].items) |v| {
                if (!visited[v]) try stack.append(v);
            }
        }
    }
}
```

`if (visited[u]) continue` のガードが必要なのは、同じ頂点が一度もポップされる前に複数の先行頂点によってスタックにプッシュされることがあるためだ。頂点はプッシュ時ではなくポップ時に訪問済みとしてマークされるため、同じ頂点がスタックに複数回現れることがある。このガードが一度だけ処理されることを保証する。

## 発見時刻と完了時刻：なぜ重要か

$[d[u], f[u]]$ 区間が DFS ベースのアルゴリズムに力を与える。

### 閉路検出

DFS が辺 $(u, v)$ を見つけたとき $v$ がすでにオープン — 発見されたがまだ完了していない — だったなら、$v$ は現在のコールチェーンにおける $u$ の祖先だということだ。これが**後退辺**（back edge）であり、後退辺は閉路を意味する。

**有向**グラフでは：DFS が後退辺を見つけた場合のみ閉路が存在する。形式的に、後退辺 $(u, v)$ は $d[v] < d[u] < f[u] < f[v]$ を満たす — $v$ の区間が $u$ の区間を含む。

**無向**グラフでは：すべての辺は両方向に走査されるので、DFS 木における $u$ の直接の親への辺は常に自明な意味での「後退」辺だ。実際の閉路は DFS が直接の親*以外*の祖先への辺を見つけるときに存在する。

### トポロジカルソート

有向非巡回グラフ（DAG）の**トポロジカル順序付け**（topological ordering）は、すべての有向辺 $u \to v$ について $u$ が $v$ より前に来るように、すべての頂点を一列に並べることだ。

DFS はトポロジカル順序を自動的に生成する：頂点の `fin` 時刻が記録されたとき、出力リストの先頭に追加する。頂点は自分から到達できるすべての頂点が完了した*後*に完了するので、順序の*前*に位置する。最初に先頭追加されたものから最後に先頭追加されたものへと出力リストを処理すると有効なトポロジカル順序が得られる。

## 実行時間

DFS は各頂点をちょうど 1 回訪問する（`visited` チェックがこれを保証する）。頂点 $u$ を訪問するたびに $\deg(u)$ 個の隣接頂点を反復する。合計すると：

$$
\sum_{u \in V} \deg(u) = 2|E|
$$

$O(V)$ の初期化を加えると：

$$
T(V, E) = O(V + E)
$$

これは[BFS](../bfs/)と一致する：どちらのアルゴリズムも少なくとも一度すべての頂点と辺を見なければならない。

## まとめ

- **DFS** は再帰または明示的スタックを使って、バックトラックする前にできる限り深く探索する。
- **発見時刻** $d[u]$ は $u$ に最初に入ったときに記録され、**完了時刻** $f[u]$ は部分木が完全に探索されたときに記録される。
- **括弧定理**：任意の 2 頂点について、$[d, f]$ 区間は完全に入れ子になるか完全に素かのどちらかだ — 部分的に重なることはない。
- **閉路検出**：有向グラフに閉路が存在するのは、DFS が後退辺（オープンな祖先への辺）を見つけた場合のみだ。
- **トポロジカルソート**：完了時刻の順序でリストの先頭に頂点を追加すると、DAG の有効なトポロジカル順序付けが得られる。
- 実行時間は $O(V + E)$：各頂点は 1 回処理され、各辺は最大 2 回調べられる。
