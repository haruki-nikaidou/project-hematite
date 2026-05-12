---
title: Accumulation point
summary: "Defines accumulation points (limit points) of a set in a topological space — points that every open neighbourhood of which touches the set at some point other than itself — and examines how topology determines which points qualify."
prerequisites: 
  - basis/math/topology/topology_space
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

In calculus you have probably seen sequences converge to a limit, or functions approach a value as their argument gets close to some point. Both ideas hinge on the same question: is every neighbourhood of a given point "touched" by a set, no matter how small the neighbourhood is? **Accumulation points** capture exactly this notion for any topological space, without reference to distances or sequences.

## The definition

Let $(X, \tau)$ be a [topological space](../topology_space/) and let $A \subseteq X$. A point $x \in X$ is an **accumulation point** of $A$ — also called a **limit point** or **cluster point** of $A$ — if every open set containing $x$ intersects $A$ in at least one point *other than* $x$ itself:

$$
\forall\, U \in \tau,\quad x \in U \implies (U \setminus \{x\}) \cap A \neq \varnothing. \tag{1}
$$

Two things are worth noticing immediately:

- $x$ does **not** have to belong to $A$. It is a point of the *ambient space* $X$ that "sees" $A$ in every direction.
- The clause "$\setminus \{x\}$" is deliberate: we exclude $x$ itself from the requirement. Without it, every point of $A$ would trivially qualify (any open set $U \ni x$ satisfies $U \cap A \ni x$). The interesting question is whether $A$ is "dense around $x$" in every open neighbourhood.

## Examples

### The real line

Work in $\mathbb{R}$ with the standard metric topology, where open sets are unions of open intervals.

- Every point of $[0, 1]$ is an accumulation point of the open interval $(0, 1)$. For any $x \in [0, 1]$ and any open set $U \ni x$, $U$ contains a whole open interval around $x$, which must meet $(0, 1)$ in infinitely many points other than $x$.
- The point $0$ is an accumulation point of $\{1/n : n \in \mathbb{N}^+\}$: every open interval $(-\varepsilon, \varepsilon)$ around $0$ contains $1/n$ for all sufficiently large $n$.
- No point of $\mathbb{Z}$ is an accumulation point of $\mathbb{Z}$ itself. Each integer $n$ has a neighbourhood $(n - \tfrac{1}{2}, n + \tfrac{1}{2})$ that contains no other integer.

### Finite sets

Let $X = \mathbb{R}$ (standard topology) and $A = \{1, 2, 3\}$. No point of $X$ is an accumulation point of $A$. For any $x \in X$, the open interval of radius $\tfrac{1}{2} \min_{a \in A} |x - a|$ around $x$ (using $\min = +\infty$ if $x \notin A$) contains no element of $A \setminus \{x\}$. Finite sets in a metric space have no accumulation points.

### Discrete topology

In the **discrete topology** on any set $X$, every singleton $\{x\}$ is open. For any $A \subseteq X$ and any candidate $x$, taking $U = \{x\}$ gives $(U \setminus \{x\}) \cap A = \varnothing$, so condition $(1)$ fails. The discrete topology has **no accumulation points** for any set.

This makes intuitive sense: in the discrete topology "every point stands alone," so there is no notion of approaching from nearby.

### Indiscrete topology

In the **indiscrete topology** on $X$ (only $\varnothing$ and $X$ are open), the only open set containing $x$ is $X$ itself. For any non-empty $A$ and any $x \in X$, $(X \setminus \{x\}) \cap A$ is non-empty whenever $A \not\subseteq \{x\}$. So every point of $X$ is an accumulation point of every set $A$ with $|A| \geq 2$.

## Isolated points

A point $x \in A$ that is *not* an accumulation point of $A$ is called an **isolated point** of $A$: some open set $U$ containing $x$ satisfies $(U \setminus \{x\}) \cap A = \varnothing$, meaning $x$ is the only element of $A$ in $U$.

Isolated points and accumulation points of $A$ are mutually exclusive among points of $A$: every $x \in A$ is either isolated or an accumulation point. A set with no isolated points is called **perfect** (when it also equals its derived set — see [Derived Set](../derived_set/)).

## How topology shapes accumulation points

The same set $A$ can have completely different accumulation points depending on the topology:

- In the standard topology on $\mathbb{R}$, the set $\{0\} \cup \{1/n : n \geq 1\}$ has $0$ as its only accumulation point.
- In a topology where only $\varnothing$ and $\mathbb{R}$ are open, every point of $\mathbb{R}$ is an accumulation point of any infinite set.
- In a topology where $\{0\}$ is open, $0$ is no longer an accumulation point of $\{1/n : n \geq 1\}$.

This flexibility — the same underlying set with different accumulation points in different topologies — is why the abstract definition is so powerful. You choose the topology to suit the problem, and the accumulation points follow.

## Connection to convergence

In a metric space, $x$ is an accumulation point of $A$ if and only if there exists a sequence $(a_n)$ in $A \setminus \{x\}$ converging to $x$. In a general topological space, however, sequences are not always enough to detect accumulation points; you may need **nets** or **filters** for that purpose, which go beyond the scope of this checkpoint.

## Summary

- A point $x \in X$ is an **accumulation point** (limit point, cluster point) of $A \subseteq X$ when every open set containing $x$ meets $A$ at some point other than $x$.
- $x$ need not belong to $A$: accumulation points are determined by the surrounding topology, not just by membership in $A$.
- In the **discrete topology**, no set has accumulation points. In the **indiscrete topology**, every point is an accumulation point of every large enough set.
- Points of $A$ that are not accumulation points of $A$ are called **isolated points**.
- Different topologies on the same set produce different accumulation points for the same subset.
- The collection of all accumulation points of $A$ forms the **[derived set](../derived_set/)** $A'$, and the relationship $A' \subseteq A$ is equivalent to $A$ being closed.
