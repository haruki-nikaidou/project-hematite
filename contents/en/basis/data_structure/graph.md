---
title: Graph
summary: "A graph is a set of vertices connected by edges, giving a flexible structure for modeling networks, dependencies, and relationships. You will learn directed and undirected graphs, weighted edges, paths, cycles, and key graph families like trees and DAGs."
prerequisites:
  - basis/data_structure/array
  - basis/data_structure/linked_list
  - basis/cs_with_zig/pointer
aliases: []
tags:
  - Data Structures
  - Graph Theory
updated: 2026-05-20
---

[Linked List](/en/cp/basis/data_structure/linked_list/) connects nodes in a single chain — each node knows only its immediate successor. But many real problems have richer relationships than a chain: a road network where intersections branch in every direction, a build system where each job depends on several others, or a social network where any person can know any other. A **graph** is the structure that models all of these, and it sits at the heart of some of the most important algorithms in computer science.

## What a graph is

A **graph** $G$ consists of two sets:

- $V$ — a set of **vertices** (also called *nodes*), representing the things you are modeling.
- $E$ — a set of **edges**, each connecting a pair of vertices, representing relationships between them.

We write $G = (V, E)$.

As a concrete example, consider four cities and the roads that connect them:

$$
V = \{A, B, C, D\}
$$
$$
E = \{(A, B),\; (A, C),\; (B, D),\; (C, D)\}
$$

```text
A ──── B
│      │
C ──── D
```

The number of vertices is written $|V|$, and the number of edges $|E|$. These two quantities dominate every graph algorithm's time and space complexity.

## Directed and undirected graphs

In the city example above, every road runs in both directions — if you can drive from $A$ to $B$, you can also drive from $B$ to $A$. This is an **undirected graph**: each edge is a symmetric connection, and the pair $(u, v)$ is the same edge as $(v, u)$.

A **directed graph** (also called a *digraph*) assigns a direction to each edge. The edge $(u, v)$ means "from $u$ to $v$" only — the reverse direction $(v, u)$ is a separate edge that may or may not exist.

```text
Undirected:        Directed:
  A ─── B            A ──► B
  │     │            │
  C ─── D            ▼
                     C ──► D
```

Directed graphs model one-way streets, task dependencies, data pipelines, and any other relationship where direction matters.

## Weighted and unweighted graphs

So far, edges are either present or absent. A **weighted graph** attaches a numeric **weight** to each edge — a distance, a cost, a capacity, or any other measurement relevant to the problem.

```text
    5        2
A ───── B ───── D
│               │
│  3            │ 1
│               │
C ──────────────┘
         4
```

If you want the shortest driving route between two cities, edge weights are distances. If you want the cheapest flight path, they are ticket prices. An **unweighted** graph can be treated as a weighted graph where every edge has weight 1.

## Degree

The **degree** of a vertex counts the edges attached to it.

- In an **undirected graph**, the degree of vertex $v$ — written $\deg(v)$ — is the number of edges incident to $v$.
- In a **directed graph**, degree splits into two:
  - **in-degree**: edges *pointing into* $v$.
  - **out-degree**: edges *pointing out of* $v$.

A vertex with degree 0 is called **isolated** — it has no neighbors.

The sum of all degrees always equals $2|E|$ in an undirected graph, because each edge contributes one to the degree of each of its two endpoints.

## Paths and cycles

A **path** from vertex $s$ to vertex $t$ is a sequence of vertices

$$
s = v_0,\; v_1,\; v_2,\; \ldots,\; v_k = t
$$

such that each consecutive pair $(v_i, v_{i+1})$ is an edge in $E$. The **length** of the path is $k$ — the number of edges traversed.

A **cycle** is a path that starts and ends at the same vertex and uses at least one edge. A graph with no cycles is called **acyclic**.

```text
Path from A to D:  A → B → D    (length 2)
Cycle:             A → B → D → C → A    (length 4)
```

Cycles matter because many algorithms that work correctly on acyclic graphs fail or produce wrong answers when cycles are present.

## Connectivity

An undirected graph is **connected** if there is a path between every pair of vertices — you can reach any vertex from any starting point. If some vertices are unreachable from others, the graph is **disconnected**. Each maximal connected subgraph is called a **connected component**.

For directed graphs the concept splits into two strengths:

- **Strongly connected**: for every pair of vertices $u$ and $v$, there is a directed path from $u$ to $v$ *and* from $v$ to $u$.
- **Weakly connected**: the underlying undirected graph (ignoring edge directions) is connected.

## Trees

A **tree** is a connected, undirected, acyclic graph. Several equivalent characterizations all describe the same thing:

- Any tree on $n$ vertices has exactly $n - 1$ edges.
- There is exactly one simple path between any two vertices.
- Adding any edge creates a cycle; removing any edge disconnects the graph.

```text
       A
      / \
     B   C
    / \
   D   E
```

The [linked list](/en/cp/basis/data_structure/linked_list/) you already know is a degenerate tree — a path graph where every non-leaf has exactly one child. Trees are everywhere in computing: file systems, parse trees, binary search trees, heaps.

## DAGs

A **directed acyclic graph** (DAG) is a directed graph with no directed cycles. Following any edge always takes you "forward" — you can never return to a vertex you have already visited.

DAGs are the natural representation for **dependency relationships**: build systems (compile this file before linking), spreadsheet formulas (evaluate this cell before the one that references it), and course prerequisites (finish this topic before the next). The checkpoint graph for this very site is a DAG — each checkpoint lists prerequisites, and the build validates that no cycle exists.

```text
compile_a ──►
compile_b ──► link ──► package
compile_c ──►
```

Because a DAG has no cycles, you can always find a **topological order** — a linear ordering of vertices such that every edge points from an earlier vertex to a later one. This ordering is how build systems determine what to compile first.

## Representing a graph in memory

Knowing what a graph *is* and knowing how to *store* one are different questions. The two canonical representations — the **adjacency matrix** and the **adjacency list** — each store the same graph differently, with opposing trade-offs for space and for the speed of common operations. [Represent Graph in Zig](/en/cp/basis/cs_with_zig/graph_represent/) covers both with complete Zig implementations.

## Summary

- A **graph** $G = (V, E)$ is a set of **vertices** and a set of **edges** connecting pairs of them.
- An **undirected** graph has symmetric edges; a **directed** graph (digraph) gives each edge a direction.
- A **weighted** graph assigns a numeric weight to each edge; an unweighted graph treats all edges as equal.
- The **degree** of a vertex counts its incident edges (split into in-degree and out-degree for directed graphs).
- A **path** is a sequence of vertices connected by edges; a **cycle** is a path that returns to its starting vertex.
- A **connected** graph has a path between every pair of vertices.
- A **tree** is a connected, acyclic, undirected graph with exactly $|V| - 1$ edges.
- A **DAG** (directed acyclic graph) has no directed cycles and always admits a topological ordering — making it the natural home for dependency relationships.
