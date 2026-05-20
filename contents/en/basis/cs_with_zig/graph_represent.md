---
title: Represent Graph in Zig
summary: "The adjacency matrix and the adjacency list store the same graph with opposing trade-offs: the matrix gives O(1) edge lookup but uses O(n²) space, while the list uses O(n+m) space but makes neighbor enumeration proportional to the actual degree. You will implement both in Zig and learn when each is the right choice."
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

[Graph](/en/cp/basis/data_structure/graph/) defined what a graph *is*. Now the question is how to store one in memory. This is not an academic concern — the representation you choose determines which operations are fast and which are slow, and that directly affects algorithm performance.

The two canonical representations are the **adjacency matrix** and the **adjacency list**. A third option using a [hash map](/en/cp/basis/cs_with_zig/hashmap/) is useful for sparse graphs where you need fast edge lookups. All three represent the same mathematical object; they differ only in how memory is organized.

Throughout this checkpoint, assume the graph has $n$ vertices labeled $0, 1, \ldots, n-1$ and $m$ edges. The example graph used throughout is:

```text
0 ──── 1
│      │
2 ──── 3
```

with $n = 4$ vertices and $m = 4$ edges: $(0,1)$, $(0,2)$, $(1,3)$, $(2,3)$.

## Adjacency matrix

An **adjacency matrix** is an $n \times n$ two-dimensional array. The entry at row $u$, column $v$ tells you whether the edge $(u, v)$ exists.

- **Unweighted graph**: entry is `true` if the edge exists, `false` otherwise.
- **Weighted graph**: entry is the edge weight; a sentinel value (often `0` or the maximum integer) signals "no edge."

For the example graph, the matrix looks like this:

```text
     0      1      2      3
0 [ false, true,  true,  false ]
1 [ true,  false, false, true  ]
2 [ true,  false, false, true  ]
3 [ false, true,  true,  false ]
```

Because the graph is undirected, the matrix is symmetric: entry $(u, v)$ always equals entry $(v, u)$.

### Implementation in Zig

A two-dimensional matrix maps naturally to a flat `[]bool` slice. Row $u$ starts at index $u \times n$, so entry $(u, v)$ lives at index $u \times n + v$:

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    const matrix = try allocator.alloc(bool, n * n);
    defer allocator.free(matrix);
    @memset(matrix, false);  // start with no edges

    // add an undirected edge between u and v
    const addEdge = struct {
        fn f(mat: []bool, cols: usize, u: usize, v: usize) void {
            mat[u * cols + v] = true;
            mat[v * cols + u] = true;  // undirected: both directions
        }
    }.f;

    addEdge(matrix, n, 0, 1);
    addEdge(matrix, n, 0, 2);
    addEdge(matrix, n, 1, 3);
    addEdge(matrix, n, 2, 3);

    // O(1) edge check
    std.debug.print("edge (0,1): {}\n", .{matrix[0 * n + 1]}); // true
    std.debug.print("edge (0,3): {}\n", .{matrix[0 * n + 3]}); // false

    // enumerate neighbors of vertex 1: must scan the entire row — O(n)
    std.debug.print("neighbors of 1: ", .{});
    for (0..n) |v| {
        if (matrix[1 * n + v]) std.debug.print("{} ", .{v}); // 0 3
    }
    std.debug.print("\n", .{});
}
```

`@memset(matrix, false)` zeroes out the entire allocation, setting every edge to absent before you start adding the real ones.

### Trade-offs

**Edge lookup is $O(1)$.** Does the edge $(u, v)$ exist? One array read at index $u \times n + v$.

**Enumerating neighbors is $O(n)$.** To find all vertices adjacent to $u$, you must scan the entire row — $n$ entries — even if $u$ has only two neighbors.

**Space is $O(n^2)$.** A graph with 1,000 vertices requires a $1{,}000 \times 1{,}000$ matrix — one million entries — regardless of how many edges actually exist.

The adjacency matrix shines for **dense graphs**, where $m$ is close to $n^2$. When almost every pair of vertices is connected, the $O(n^2)$ memory is not wasted, and $O(1)$ edge lookup is valuable.

## Adjacency list

An **adjacency list** stores one list of neighbors for each vertex. It only allocates memory proportional to the edges that actually exist, making it far more efficient for sparse graphs.

```text
vertex 0 → [1, 2]
vertex 1 → [0, 3]
vertex 2 → [0, 3]
vertex 3 → [1, 2]
```

### Implementing with ArrayList

Zig's `std.ArrayList(T)` is a growable array — similar to a heap-allocated slice that can expand as you append elements. You call `append(value)` to add an item and access the current contents through `list.items`:

```zig
var list = std.ArrayList(usize).init(allocator);
defer list.deinit();
try list.append(42);
try list.append(7);
// list.items is now the slice [42, 7]
```

For the adjacency list, create one `ArrayList(usize)` per vertex, then append neighbor indices as you add edges:

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const n: usize = 4;

    // one growable list of neighbors per vertex
    const adj = try allocator.alloc(std.ArrayList(usize), n);
    defer allocator.free(adj);

    for (adj) |*list| list.* = std.ArrayList(usize).init(allocator);
    defer for (adj) |*list| list.deinit();

    const addEdge = struct {
        fn f(a: []std.ArrayList(usize), u: usize, v: usize) !void {
            try a[u].append(v);
            try a[v].append(u);  // undirected
        }
    }.f;

    try addEdge(adj, 0, 1);
    try addEdge(adj, 0, 2);
    try addEdge(adj, 1, 3);
    try addEdge(adj, 2, 3);

    // enumerate neighbors of vertex 1: O(deg(1)), visits only actual neighbors
    std.debug.print("neighbors of 1: ", .{});
    for (adj[1].items) |v| std.debug.print("{} ", .{v}); // 0 3
    std.debug.print("\n", .{});

    // edge check: O(deg(u)) — scan the list for v
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

### Trade-offs

**Enumerating neighbors is $O(\deg(u))$.** Iterating over `adj[u].items` visits only the actual neighbors of $u$ — no wasted work scanning absent edges.

**Edge lookup is $O(\deg(u))$.** Checking whether $(u, v)$ is present requires scanning the neighbor list of $u$ linearly.

**Space is $O(n + m)$.** You store $n$ lists holding a total of $2m$ entries (each undirected edge appears in two lists). For a sparse graph with $m \ll n^2$, this is drastically less memory than the $n^2$ matrix.

The adjacency list is the right choice for **sparse graphs** — and most real-world graphs are sparse. Road networks, social networks, and dependency graphs all have $m$ much smaller than $n^2$.

## Adjacency map

When you need $O(1)$ average edge lookup *and* $O(\deg(u))$ neighbor enumeration on a sparse graph, replace each neighbor list with a [hash map](/en/cp/basis/cs_with_zig/hashmap/). Store a `std.AutoHashMap(usize, void)` per vertex — the key is the neighbor, and the value is `void` (no data, just presence). For weighted graphs, use `std.AutoHashMap(usize, f64)` and store the weight.

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

    // add undirected edge
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

    // O(1) average edge lookup
    std.debug.print("edge (0,1): {}\n", .{adj[0].contains(1)}); // true
    std.debug.print("edge (0,3): {}\n", .{adj[0].contains(3)}); // false

    // O(deg(u)) neighbor enumeration
    std.debug.print("neighbors of 1: ", .{});
    var it = adj[1].keyIterator();
    while (it.next()) |k| std.debug.print("{} ", .{k.*});
    std.debug.print("\n", .{});
}
```

The `{}` in `put(v, {})` is the zero-size value for `void` — it takes no space and signals "this key exists."

The adjacency map pays a higher constant-factor overhead (one hash map per vertex, with its associated bookkeeping) in exchange for $O(1)$ average edge checks. Whether that trade-off is worth it depends on how frequently your algorithm queries individual edges.

## Choosing a representation

| | Adjacency matrix | Adjacency list | Adjacency map |
|---|---|---|---|
| Edge check $(u, v)$ | $O(1)$ | $O(\deg(u))$ | $O(1)$ avg |
| List neighbors of $u$ | $O(n)$ | $O(\deg(u))$ | $O(\deg(u))$ |
| Space | $O(n^2)$ | $O(n + m)$ | $O(n + m)$ |
| Best for | Dense graphs | Sparse graphs | Sparse + frequent edge checks |
| Constant factor overhead | Low | Low | High |

The rule of thumb:

- If the graph is **dense** ($m \approx n^2$), use the **adjacency matrix**.
- If the graph is **sparse** ($m \ll n^2$), use the **adjacency list**.
- If you need $O(1)$ edge checks on a sparse graph, consider the **adjacency map** — but only if profiling shows the list's linear scan is a real bottleneck.

Almost every real-world graph is sparse. The most important graph algorithms — BFS, DFS, Dijkstra's shortest path, topological sort — are all designed with the adjacency list in mind, and their complexity analyses assume $O(\deg(u))$ neighbor iteration.

## Summary

- An **adjacency matrix** is a flat `[]bool` slice of size $n \times n$; entry $(u, v)$ is at index $u \times n + v$. Edge check: $O(1)$; enumerate neighbors: $O(n)$; space: $O(n^2)$.
- An **adjacency list** is a `[]std.ArrayList(usize)` — one growable list per vertex. Edge check: $O(\deg(u))$; enumerate neighbors: $O(\deg(u))$; space: $O(n + m)$.
- An **adjacency map** is a `[]std.AutoHashMap(usize, void)` — one hash map per vertex. Edge check: $O(1)$ average; enumerate neighbors: $O(\deg(u))$; space: $O(n + m)$ with higher constant-factor overhead.
- Use the **adjacency matrix** for dense graphs; use the **adjacency list** for sparse graphs (the common case); use the **adjacency map** only when you need fast edge checks on a sparse graph.
- For undirected graphs, every edge $(u, v)$ must be recorded in both directions.
