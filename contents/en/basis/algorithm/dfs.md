---
title: Depth-First Search
summary: "Depth-first search explores a graph by going as deep as possible from each vertex before backtracking. This checkpoint develops both recursive and explicit-stack formulations, traces the discovery and finishing times that drive applications like cycle detection and topological sort, and analyses its O(V+E) running time."
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

[BFS](../bfs/) answers "what is the shortest path?" by exploring layer by layer. **Depth-first search** (DFS) asks a different question: "what is the overall structure of the graph?" — and it answers by diving as deep as possible before coming back up. The timestamps DFS records along the way make it the engine behind cycle detection, topological sort, and more.

## How DFS explores a graph

Starting from a vertex $u$, DFS immediately recurses into the first unvisited neighbor, then into that vertex's first unvisited neighbor, and so on. Only when a vertex has no more unvisited neighbors does it **backtrack** to the caller and try the next option. The exploration unfolds like reading a book: you go deep into one chapter before returning to the table of contents.

DFS attaches two **timestamps** to every vertex:

- **Discovery time** $d[u]$: the moment $u$ is first entered.
- **Finish time** $f[u]$: the moment $u$'s subtree is fully explored and control returns to the caller.

Here is a trace on the example graph from [Represent Graph in Zig](../../cs_with_zig/graph_represent/), with adjacency lists 0→[1,2], 1→[0,3], 2→[0,3], 3→[1,2]:

```text
0 ──── 1
│      │
2 ──── 3
```

```text
call dfs(0)         d[0] = 1
  call dfs(1)       d[1] = 2
    0 is visited — skip
    call dfs(3)     d[3] = 3
      1 is visited — skip
      call dfs(2)   d[2] = 4
        0 is visited — skip
        3 is visited — skip
      return        f[2] = 5
    return          f[3] = 6
  return            f[1] = 7
  2 is visited — skip
return              f[0] = 8
```

The intervals $[d[u], f[u]]$ — here $[1,8]$, $[2,7]$, $[3,6]$, $[4,5]$ — satisfy the **parenthesis theorem**: for any two vertices $u$ and $v$, their intervals are either fully nested or completely disjoint. They can never partially overlap.

## Recursive DFS

The recursive implementation is the most direct translation of the concept. A `State` struct holds all mutable fields so the recursive method can update them:

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

    // Outer loop handles disconnected graphs: start a new DFS from every
    // unvisited vertex so no component is missed.
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

## Iterative DFS with an explicit stack

[Recursion](../../cs_with_zig/recursive/) is natural for DFS, but a graph with millions of vertices will overflow the [call stack](../../cs_with_zig/calling_stack/). Replacing the implicit call stack with an explicit [stack](../../data_structure/stack/) eliminates the limit.

The key difference: the explicit stack holds vertices *to be processed*, not vertices *currently open*. This means finish times are not computed without extra bookkeeping, but simple reachability and visit order work fine:

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

    // ArrayList used as a stack: append to push, pop to remove the last element.
    var stack = std.ArrayList(usize).init(allocator);
    defer stack.deinit();

    for (0..n) |start| {
        if (visited[start]) continue;
        try stack.append(start);

        while (stack.items.len > 0) {
            const u = stack.pop();
            if (visited[u]) continue;  // pushed by multiple predecessors before processing
            visited[u] = true;
            std.debug.print("visit {}\n", .{u});

            for (adj[u].items) |v| {
                if (!visited[v]) try stack.append(v);
            }
        }
    }
}
```

The guard `if (visited[u]) continue` is necessary because the same vertex can be pushed onto the stack by multiple predecessors before it is ever popped. Vertices are marked visited at pop time (not push time), so the same vertex may appear in the stack more than once. The guard ensures it is processed only once.

## Discovery and finish times: why they matter

The $[d[u], f[u]]$ intervals give DFS-based algorithms their power.

### Cycle detection

When DFS encounters an edge $(u, v)$ where $v$ is already open — discovered but not yet finished — it means $v$ is an ancestor of $u$ in the current call chain. This is a **back edge**, and back edges mean cycles.

In a **directed** graph: a cycle exists if and only if DFS finds a back edge. Formally, a back edge $(u, v)$ satisfies $d[v] < d[u] < f[u] < f[v]$ — $v$'s interval contains $u$'s.

In an **undirected** graph: every edge is traversed in both directions, so the edge back to the direct parent of $u$ in the DFS tree is always "back" in a trivial sense. A real cycle exists when DFS finds an edge to an ancestor that is *not* the direct parent.

### Topological sort

A **topological ordering** of a directed acyclic graph (DAG) arranges all vertices in a line such that for every directed edge $u \to v$, $u$ appears before $v$.

DFS produces a topological ordering for free: when a vertex's `fin` time is recorded, prepend it to the output list. A vertex finishes *after* all vertices reachable from it finish, so it belongs *earlier* in the ordering. Processing the output list from first prepended to last gives a valid topological order.

## Running time

DFS visits each vertex exactly once (the `visited` check ensures this). Each visit to $u$ iterates over $\deg(u)$ neighbors. Summing:

$$
\sum_{u \in V} \deg(u) = 2|E|
$$

Adding the $O(V)$ initialisation:

$$
T(V, E) = O(V + E)
$$

This matches [BFS](../bfs/): both algorithms must look at every vertex and every edge at least once.

## Summary

- **DFS** explores a graph by going as deep as possible before backtracking, using either recursion or an explicit stack.
- The **discovery time** $d[u]$ is recorded when $u$ is first entered; the **finish time** $f[u]$ is recorded when its subtree is fully explored.
- The **parenthesis theorem**: for any two vertices, their $[d, f]$ intervals are either fully nested or completely disjoint — they never partially overlap.
- **Cycle detection**: a directed graph has a cycle if and only if DFS finds a back edge (an edge to an open ancestor).
- **Topological sort**: prepending vertices to a list in order of finish time produces a valid topological ordering of a DAG.
- Running time is $O(V + E)$: each vertex is processed once, and each edge is examined at most twice.
