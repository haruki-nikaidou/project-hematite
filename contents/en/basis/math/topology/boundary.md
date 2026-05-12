---
title: Boundary (Topology)
summary: "Defines the boundary of a set in a topological space as the points belonging to the closure of both the set and its complement, establishes the canonical three-way partition of the space, and explores how open, closed, and clopen sets are characterised by their boundaries."
prerequisites: 
  - basis/math/topology/closure
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

Stand on the shoreline of an island: you are neither in the ocean nor on dry land — you are on the boundary between the two. Every open neighbourhood around you reaches both the sea and the shore. The **boundary** of a set makes this geometric picture precise for any topological space. It is where the set and its complement cannot be separated by any open set.

## Definition

Let $(X, \tau)$ be a [topological space](../topology_space/) and $A \subseteq X$. The **boundary** of $A$, written $\partial A$ (or $\operatorname{bd}(A)$ or $\operatorname{Fr}(A)$), is defined as

$$
\partial A \coloneqq \overline{A} \cap \overline{X \setminus A}. \tag{1}
$$

It is the set of points that belong to both the [closure](../closure/) of $A$ and the closure of the complement of $A$.

By the neighbourhood characterisation of closure (a point $x$ is in $\overline{B}$ iff every open set around $x$ meets $B$), you can unpack $(1)$ into a direct condition: $x \in \partial A$ if and only if

$$
\forall\, U \in \tau,\quad x \in U \implies U \cap A \neq \varnothing \text{ and } U \cap (X \setminus A) \neq \varnothing. \tag{2}
$$

In words: every open neighbourhood of a boundary point touches both $A$ and its complement. You cannot "separate" $x$ from either side.

## The partition theorem

The three concepts — interior, boundary, and *exterior* — carve $X$ into three mutually disjoint pieces. Define the **exterior** of $A$ as $\operatorname{ext}(A) \coloneqq \operatorname{int}(X \setminus A)$ — the interior of the complement.

**Theorem (partition of $X$).** For any $A \subseteq X$:

$$
X = \operatorname{int}(A) \cup \partial A \cup \operatorname{ext}(A), \tag{3}
$$

and these three sets are pairwise disjoint.

*Why this holds.* The [interior](../interior/) and exterior are disjoint open sets. A point is in $\operatorname{int}(A)$ if it has a neighbourhood inside $A$, in $\operatorname{ext}(A)$ if it has a neighbourhood inside $X \setminus A$, and in $\partial A$ if no neighbourhood fits entirely on either side. Every point of $X$ falls into exactly one of these three cases.

Equivalently, using the closure–interior duality $\overline{A} = X \setminus \operatorname{int}(X \setminus A)$:

$$
\overline{A} = \operatorname{int}(A) \cup \partial A \tag{4}
$$

(the closure is the interior together with the boundary), and the split is disjoint.

## Examples

### Standard topology on $\mathbb{R}$

- $\partial (0, 1) = \{0, 1\}$. The closure is $[0,1]$; the closure of the complement $(−\infty, 0] \cup [1, +\infty)$ is itself; their intersection is $\{0, 1\}$.
- $\partial [0, 1] = \{0, 1\}$ as well. The set and its complement $(−\infty, 0) \cup (1, +\infty)$ have the same boundary regardless of whether endpoints are included.
- $\partial \mathbb{Q} = \mathbb{R}$. Rationals and irrationals are both dense in $\mathbb{R}$, so $\overline{\mathbb{Q}} = \mathbb{R}$ and $\overline{\mathbb{R} \setminus \mathbb{Q}} = \mathbb{R}$; their intersection is all of $\mathbb{R}$.
- $\partial \mathbb{R} = \varnothing$. There is no complement; $X \setminus X = \varnothing$, whose closure is $\varnothing$.

### Discrete topology

In the discrete topology every set is both open and closed, so $\overline{A} = A$ and $\overline{X \setminus A} = X \setminus A$. Their intersection is $A \cap (X \setminus A) = \varnothing$. Every set has empty boundary in the discrete topology.

### Indiscrete topology

Only $\varnothing$ and $X$ are closed. For a non-empty proper subset $A \subsetneq X$, both $\overline{A} = X$ and $\overline{X \setminus A} = X$. So $\partial A = X \cap X = X$. The entire space is the boundary of every proper non-empty subset — an extreme case reflecting how coarse the indiscrete topology is.

## Properties

Let $(X, \tau)$ be a topological space and $A \subseteq X$.

- **$\partial A$ is closed.** It is the intersection of two closed sets: $\partial A = \overline{A} \cap \overline{X \setminus A}$.
- **Symmetry:** $\partial A = \partial(X \setminus A)$. The boundary is the same for a set and its complement — the shoreline belongs to neither the sea nor the land.
- **Decomposition:** $\overline{A} = \operatorname{int}(A) \sqcup \partial A$ (disjoint union), from equation $(4)$.
- **Boundary of boundary:** $\partial(\partial A) \subseteq \partial A$. The boundary of a closed set is contained in that set; since $\partial A$ is closed, its boundary is a subset of itself.
- **Interior and boundary are disjoint:** $\operatorname{int}(A) \cap \partial A = \varnothing$. An interior point has a neighbourhood inside $A$, which separates it from $X \setminus A$.

## Open, closed, and clopen sets via the boundary

The boundary gives particularly clean characterisations of the three special types of sets.

**Theorem.** Let $A \subseteq X$. Then:

1. $A$ is **open** if and only if $A \cap \partial A = \varnothing$ (the boundary lies entirely in the complement of $A$).
2. $A$ is **closed** if and only if $\partial A \subseteq A$ (the boundary lies inside $A$).
3. $A$ is **clopen** (both open and closed) if and only if $\partial A = \varnothing$.

*Why this is true.*

1. If $A$ is open then $A = \operatorname{int}(A)$, which is disjoint from $\partial A$.  Conversely if $A \cap \partial A = \varnothing$ then no point of $A$ is in $\overline{X \setminus A}$, so every point of $A$ has a neighbourhood inside $A$, making $A$ open.

2. $A$ is closed iff $\overline{A} = A$. Since $\overline{A} = \operatorname{int}(A) \cup \partial A$ and $\operatorname{int}(A) \subseteq A$, equality $\overline{A} = A$ holds iff $\partial A \subseteq A$.

3. Combine (1) and (2): clopen requires $A \cap \partial A = \varnothing$ and $\partial A \subseteq A$, which together force $\partial A = \varnothing$.

This last point is particularly useful: **in a connected topological space, only $\varnothing$ and $X$ have empty boundary**, because those are the only clopen sets. Boundary emptiness is thus a witness to disconnection.

## The boundary formula in coordinates

In $\mathbb{R}^n$ with the standard topology, you can think of the boundary of a set as its "topological skin" — the set of points where an infinitesimally small ball always straddles the set and its complement. This matches the geometric intuition: the boundary of a disk is its circle, the boundary of a cube is its six faces. In abstract topology, this intuition generalises to arbitrary spaces with no geometry at all.

## Summary

- The **boundary** $\partial A \coloneqq \overline{A} \cap \overline{X \setminus A}$ consists of all points every neighbourhood of which meets both $A$ and $X \setminus A$.
- $\partial A$ is always a **closed set**, and $\partial A = \partial(X \setminus A)$ (boundary is symmetric).
- The space $X$ partitions as $\operatorname{int}(A) \sqcup \partial A \sqcup \operatorname{ext}(A)$; the closure satisfies $\overline{A} = \operatorname{int}(A) \sqcup \partial A$.
- $A$ is open iff $\partial A \cap A = \varnothing$; closed iff $\partial A \subseteq A$; clopen iff $\partial A = \varnothing$.
- In a **connected** space, only $\varnothing$ and $X$ have empty boundary.
- In the discrete topology every set has empty boundary; in the indiscrete topology every proper non-empty subset has boundary equal to all of $X$.
