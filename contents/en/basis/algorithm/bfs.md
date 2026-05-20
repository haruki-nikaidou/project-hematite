---
title: Breadth-First Search
summary: "Breadth-first search explores a graph layer by layer from a chosen source, visiting all vertices at distance k before any at distance k+1. This checkpoint develops BFS using a queue, proves it computes shortest-path distances in unweighted graphs, and analyses its O(V+E) running time."
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

Finding the shortest route on a map, computing degrees of separation in a social network, and crawling links on the web all reduce to the same problem: explore a graph in order of distance from a starting point. **Breadth-first search** (BFS) is the algorithm that does exactly this, and it runs in time proportional to the size of the graph.

## How BFS explores a graph

Starting from a chosen **source** vertex $s$, BFS fans out layer by layer. It first visits every vertex reachable in one edge from $s$, then every vertex reachable in two edges, and so on. The algorithm never steps to distance $k+1$ until it has finished all vertices at distance $k$.

A [queue](../../data_structure/queue/) enforces this layer-by-layer discipline. Vertices are added to the back when discovered and removed from the front when processed, so earlier-discovered (closer) vertices are always handled first. To avoid revisiting vertices in a graph with cycles, BFS records a **distance** for each vertex the moment it is enqueued. A vertex with a recorded distance will never be enqueued again.

Here is a trace on a small example graph:

```text
0 ──── 1
│      │
2 ──── 3
```

BFS from source $s = 0$:

| Step | Process | Discover | Queue after | dist updated |
|------|---------|----------|-------------|--------------|
| Init | — | 0 | [0] | d[0]=0 |
| 1 | 0 | 1, 2 | [1, 2] | d[1]=1, d[2]=1 |
| 2 | 1 | 3 | [2, 3] | d[3]=2 |
| 3 | 2 | (1 and 3 already seen) | [3] | — |
| 4 | 3 | (1 and 2 already seen) | [] | — |

After BFS completes, the distances from vertex 0 are:

$$
d[0] = 0, \quad d[1] = 1, \quad d[2] = 1, \quad d[3] = 2
$$

These are the true shortest-path distances in this unweighted graph.

## The algorithm

BFS maintains a distance array $d$ initialised to $\infty$ for every vertex except $d[s] = 0$. At each step it dequeues the front vertex $u$ and examines each neighbor $v$. If $d[v]$ is still $\infty$, the vertex has not been reached yet: set $d[v] = d[u] + 1$ and enqueue $v$.

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

The check `d[v] == ∞` doubles as the visited check. Once a vertex has a finite distance it cannot be enqueued again.

## Implementing BFS in Zig

The implementation uses the [adjacency list](../../cs_with_zig/graph_represent/) as the graph representation. For the queue, an `ArrayList` with a `head` index works cleanly: `append` adds to the back, and advancing `head` removes from the front.

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    // Build the adjacency list for the example graph.
    const adj = try allocator.alloc(std.ArrayList(usize), n);
    defer allocator.free(adj);
    for (adj) |*list| list.* = std.ArrayList(usize).init(allocator);
    defer for (adj) |*list| list.deinit();

    const edges = [_][2]usize{ .{ 0, 1 }, .{ 0, 2 }, .{ 1, 3 }, .{ 2, 3 } };
    for (edges) |e| {
        try adj[e[0]].append(e[1]);
        try adj[e[1]].append(e[0]);
    }

    // BFS from source vertex 0.
    const dist = try allocator.alloc(usize, n);
    defer allocator.free(dist);
    @memset(dist, std.math.maxInt(usize));  // ∞

    // ArrayList used as a queue: head is the index of the front element.
    var queue = std.ArrayList(usize).init(allocator);
    defer queue.deinit();
    var head: usize = 0;

    dist[0] = 0;
    try queue.append(0);

    while (head < queue.items.len) {
        const u = queue.items[head];
        head += 1;

        for (adj[u].items) |v| {
            if (dist[v] == std.math.maxInt(usize)) {  // not yet reached
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

The `queue` array grows to the right via `append` and is consumed from the left via `head`. Every vertex is appended exactly once, so the total space for the queue is $O(V)$.

## Why BFS finds shortest paths

The following invariant holds throughout the algorithm:

> When a vertex $v$ is enqueued, $d[v]$ equals the length of the shortest path from $s$ to $v$.

**Base case**: $d[s] = 0$ and the empty path from $s$ to $s$ has length 0. ✓

**Inductive step**: assume every vertex currently in the queue has its correct distance. When BFS dequeues $u$ and finds a neighbor $v$ with $d[v] = \infty$, it sets $d[v] = d[u] + 1$. Could there be a shorter path? Any path to $v$ must pass through some vertex $w$ adjacent to $v$. If $d[w] < d[u]$, then $w$ was enqueued before $u$ — BFS processes closer vertices first — so $w$ was already processed. But then $v$ would have been reached when processing $w$, contradicting $d[v] = \infty$. Therefore $d[u] + 1$ is the true shortest distance.

By induction, every distance BFS assigns is correct.

## Running time

BFS enqueues each vertex at most once, since only vertices with $d[v] = \infty$ are enqueued. Each time a vertex $u$ is dequeued, the algorithm iterates over all $\deg(u)$ neighbors. Summing over all vertices:

$$
\sum_{u \in V} \deg(u) = 2|E|
$$

because each undirected edge $(u, v)$ contributes to $\deg(u)$ and $\deg(v)$ equally. Adding the $O(V)$ initialisation cost:

$$
T(V, E) = O(V + E)
$$

This is optimal: any algorithm that must inspect every vertex and every edge cannot do better than $\Theta(V + E)$.

## Summary

- **BFS** explores a graph layer by layer from a source $s$, visiting all vertices at distance $k$ before any at distance $k+1$.
- A **queue** enforces the layer-by-layer order; a vertex is marked reached (assigned a finite distance) at the moment of enqueue, preventing duplicates.
- BFS computes **shortest-path distances** in unweighted graphs: the distance assigned when a vertex is first reached is provably the minimum.
- Running time is $O(V + E)$: each vertex is enqueued once, and each edge is examined at most twice.
- Use an adjacency list so that neighbor iteration costs $O(\deg(u))$ per vertex rather than $O(V)$.
