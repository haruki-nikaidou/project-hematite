---
title: Interior (Topology)
summary: "Defines the interior of a set in a topological space as the largest open subset it contains, and explores how interior points capture what it means to be 'strictly inside' a set."
prerequisites: 
  - basis/math/topology/topology_space
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

When you think of the interval $(0, 1)$ in the real line, every point feels "safely inside" — you can move a little in either direction and stay in the interval. The endpoint $0$ of $[0, 1]$, by contrast, sits right on the edge: every neighbourhood straddles the boundary. The **interior** makes this intuition precise for any topological space, with no mention of distance.

## Interior points

Let $(X, \tau)$ be a [topological space](../topology_space/) and let $A \subseteq X$. A point $x \in X$ is an **interior point** of $A$ if there exists an open set $U \in \tau$ with

$$
x \in U \subseteq A. \tag{1}
$$

In words: $x$ is an interior point of $A$ when some open neighbourhood of $x$ fits entirely inside $A$. Note that $x$ must itself belong to $A$ (since $x \in U \subseteq A$), so only points of $A$ can be interior points of $A$.

## The interior of a set

The **interior** of $A$, written $\operatorname{int}(A)$ (or $A^\circ$), is the set of all interior points of $A$:

$$
\operatorname{int}(A) \coloneqq \{ x \in X : \exists\, U \in \tau,\ x \in U \subseteq A \}. \tag{2}
$$

There is an equivalent, and often more useful, description: $\operatorname{int}(A)$ is the **largest open subset** of $A$, meaning the union of *all* open sets contained in $A$:

$$
\operatorname{int}(A) = \bigcup \{ U \in \tau : U \subseteq A \}. \tag{3}
$$

To see why these agree, note that any open set $U \subseteq A$ contributes all of its points to the union in $(3)$, making them interior points by $(1)$. Conversely, every interior point $x$ witnesses an open set $U \ni x$ with $U \subseteq A$, so $x$ is captured in the union. Since $\tau$ is closed under arbitrary unions (axiom T2), the union in $(3)$ is itself open.

## Examples

### Standard topology on $\mathbb{R}$

With the standard metric topology on $\mathbb{R}$:

- $\operatorname{int}\bigl((0, 1)\bigr) = (0, 1)$ — an open interval is its own interior.
- $\operatorname{int}\bigl([0, 1]\bigr) = (0, 1)$ — the endpoints $0$ and $1$ are stripped away, since no open interval around them lies entirely in $[0, 1]$.
- $\operatorname{int}\bigl([0, 1)\bigr) = (0, 1)$ — same reasoning; $0$ is on the edge.
- $\operatorname{int}(\mathbb{Q}) = \varnothing$ — every open interval contains irrationals, so no open set is contained in $\mathbb{Q}$.
- $\operatorname{int}(\mathbb{R}) = \mathbb{R}$ — the whole space is open.

### Discrete topology

In the **discrete topology** on any set $X$ (where every subset is open), every singleton $\{x\}$ is open. For any $A \subseteq X$ and any $x \in A$, the open set $\{x\}$ satisfies $x \in \{x\} \subseteq A$, so every point of $A$ is an interior point:

$$
\operatorname{int}(A) = A \quad \text{(discrete topology)}.
$$

### Indiscrete topology

In the **indiscrete topology** on $X$ with $|X| > 1$ (only $\varnothing$ and $X$ are open), the only non-empty open set is $X$ itself. An open set $U \subseteq A$ must satisfy $U \in \{\varnothing, X\}$, so the only possibility with $U \subseteq A$ is $U = \varnothing$ (unless $A = X$):

$$
\operatorname{int}(A) = \begin{cases} X & \text{if } A = X, \\ \varnothing & \text{otherwise.} \end{cases}
$$

## Properties of the interior

Let $(X, \tau)$ be a topological space and $A, B \subseteq X$.

- **$\operatorname{int}(A)$ is open**, and $\operatorname{int}(A) \subseteq A$. (Follows directly from $(3)$.)
- **$A$ is open if and only if $A = \operatorname{int}(A)$.** If $A$ is open it is one of the sets in the union $(3)$, so $A \subseteq \operatorname{int}(A)$; combined with $\operatorname{int}(A) \subseteq A$ we get equality.
- **Idempotent:** $\operatorname{int}(\operatorname{int}(A)) = \operatorname{int}(A)$. Since $\operatorname{int}(A)$ is already open, its interior is itself.
- **Monotone:** if $A \subseteq B$ then $\operatorname{int}(A) \subseteq \operatorname{int}(B)$.
- **Intersection:** $\operatorname{int}(A \cap B) = \operatorname{int}(A) \cap \operatorname{int}(B)$.
- **Union (one direction only):** $\operatorname{int}(A) \cup \operatorname{int}(B) \subseteq \operatorname{int}(A \cup B)$. Equality does not hold in general: in $\mathbb{R}$, $\operatorname{int}([0,1]) \cup \operatorname{int}([1,2]) = (0,1) \cup (1,2)$, which misses $1$, while $\operatorname{int}([0,1] \cup [1,2]) = \operatorname{int}([0,2]) = (0,2)$.

## The dual perspective: closure

The interior and [closure](../closure/) are dual to each other via complementation:

$$
\operatorname{int}(A) = X \setminus \overline{X \setminus A}, \tag{4}
$$

where $\overline{B}$ denotes the closure of $B$. You can read this as: the interior of $A$ consists of those points that are *not* in the closure of the complement. This duality is fundamental — results about interiors and results about closures translate into each other by taking complements.

## Summary

- A point $x$ is an **interior point** of $A$ when some open set $U$ satisfies $x \in U \subseteq A$.
- The **interior** $\operatorname{int}(A)$ is the set of all interior points of $A$, equivalently the largest open subset of $A$.
- $A$ is open if and only if $A = \operatorname{int}(A)$.
- The interior operator is **idempotent** and **monotone**, distributes over finite intersections, and only partially distributes over unions.
- In the discrete topology every set equals its own interior; in the indiscrete topology only $\varnothing$ and $X$ do.
- The interior is dual to the closure via $\operatorname{int}(A) = X \setminus \overline{X \setminus A}$.
