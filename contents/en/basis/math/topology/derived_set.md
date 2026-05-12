---
title: Derived Set
summary: "Introduces the derived set of a subset of a topological space — the collection of all its accumulation points — and shows how it characterises closedness and forms the bridge to the closure operator."
prerequisites: 
  - basis/math/topology/accumulation_point
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

You already know what an [accumulation point](../accumulation_point/) of a set is: a point that every open neighbourhood of reaches back into the set. Collecting *all* accumulation points of $A$ into a single set gives you the **derived set**, a compact package of the "limit behavior" of $A$ that turns out to be exactly the right tool for characterising closedness and building the closure.

## Definition

Let $(X, \tau)$ be a [topological space](../topology_space/) and $A \subseteq X$. The **derived set** of $A$, written $A'$, is the set of all accumulation points of $A$:

$$
A' \coloneqq \{ x \in X : \forall\, U \in \tau,\ x \in U \implies (U \setminus \{x\}) \cap A \neq \varnothing \}. \tag{1}
$$

The derived set is a subset of $X$, but it need not be a subset of $A$, and $A$ need not be a subset of $A'$.

## Examples

### Standard topology on $\mathbb{R}$

- Let $A = (0, 1)$. Then $A' = [0, 1]$: every point in $[0,1]$ is touched by $(0,1)$ in every open neighbourhood, including the endpoints $0$ and $1$ even though they are not in $A$.
- Let $A = \{1/n : n \in \mathbb{N}^+\}$. Then $A' = \{0\}$: the only accumulation point is $0$, and $0 \notin A$.
- Let $A = \mathbb{Q}$. Then $A' = \mathbb{R}$: every real number is approachable by rationals.
- Let $A = \mathbb{Z}$. Then $A' = \varnothing$: every integer is isolated (it has a neighbourhood containing no other integer).

### Discrete topology

In the discrete topology, every singleton is open, so no point can be an accumulation point of any set. Thus $A' = \varnothing$ for every $A \subseteq X$.

### Finite-complement topology on $\mathbb{R}$ (Zariski-like)

In the **finite-complement topology** on $\mathbb{R}$ — where a set is open iff its complement is finite — the open sets are large. For any infinite set $A$ and any $x \in \mathbb{R}$, every open set $U \ni x$ has finite complement, so $U$ contains all but finitely many points of $\mathbb{R}$, and in particular $(U \setminus \{x\}) \cap A$ is infinite. Thus $A' = \mathbb{R}$ for every infinite $A$.

## Properties

Let $(X, \tau)$ be a topological space and $A, B \subseteq X$.

- **Monotone:** if $A \subseteq B$ then $A' \subseteq B'$. (More points in $B$ can only help fill open neighbourhoods.)
- **Union:** $(A \cup B)' = A' \cup B'$. Every accumulation point of $A \cup B$ is an accumulation point of $A$ or $B$ (or both).
- **Intersection:** $(A \cap B)' \subseteq A' \cap B'$, but equality need not hold.
- **Derived set of the derived set:** $A'' \subseteq A \cup A'$, where $A'' = (A')'$ is the derived set of the derived set. This inclusion says that accumulation points of accumulation points of $A$ are themselves either in $A$ or accumulation points of $A$.
- **$A'$ is closed** (proved below).

### The derived set is closed

To see that $A'$ is always a closed set, you need to show that its complement $X \setminus A'$ is open.

Take any point $y \notin A'$. Since $y$ is not an accumulation point of $A$, there exists an open set $V \ni y$ with $(V \setminus \{y\}) \cap A = \varnothing$ — that is, $V \cap A \subseteq \{y\}$.

Now take any point $z \in V$ with $z \neq y$. You want to show $z \notin A'$, i.e., $z$ is not an accumulation point of $A$. The open set $V$ is a neighbourhood of $z$ (since $V$ is open and $z \in V$), and $(V \setminus \{z\}) \cap A \subseteq (V \cap A) \setminus \{z\} \subseteq \{y\} \setminus \{z\} = \varnothing$ (since $z \neq y$). So $z \notin A'$.

This shows every $y \notin A'$ has an open neighbourhood $V \ni y$ contained in $X \setminus A'$, so $X \setminus A'$ is open and $A'$ is closed.

## Derived set and closedness

The derived set gives a clean characterisation of closed sets — arguably its most important application:

> **Theorem.** A set $A \subseteq X$ is closed if and only if $A' \subseteq A$.

*Proof sketch.* ($\Rightarrow$) Suppose $A$ is closed, so $X \setminus A$ is open. If $x \notin A$ then $X \setminus A$ is an open set containing $x$ with $(X \setminus A) \cap A = \varnothing$, so $x$ is not an accumulation point of $A$. Hence $A' \subseteq A$.

($\Leftarrow$) Suppose $A' \subseteq A$. Take any $y \notin A$; then $y \notin A'$, so there exists open $U \ni y$ with $U \cap A \subseteq \{y\}$. Since $y \notin A$, this gives $U \cap A = \varnothing$, i.e., $U \subseteq X \setminus A$. So every point of $X \setminus A$ has an open neighbourhood inside $X \setminus A$, making $X \setminus A$ open and $A$ closed. $\square$

In plain language: $A$ is closed exactly when it already "contains all its own limit behavior" — all the points that $A$ accumulates to are already in $A$.

## From derived set to closure

The derived set is the key ingredient in the formula for the **[closure](../closure/)** of $A$:

$$
\overline{A} = A \cup A'. \tag{2}
$$

The closure $\overline{A}$ is the smallest closed set containing $A$. Formula $(2)$ says you get it by adjoining to $A$ exactly those points outside $A$ that $A$ accumulates to. You can verify that $A \cup A'$ is closed using the theorem above: $(A \cup A')' = A' \cup A'' \subseteq A' \cup (A \cup A') = A \cup A'$, confirming $A \cup A'$ contains its own derived set.

## Iterating the derived set (Cantor–Bendixson)

Cantor first introduced the derived set precisely because *iterating* it reveals structure. Starting from $A$, form $A' = A^{(1)}$, then $A'' = A^{(2)}$, and so on. For subsets of $\mathbb{R}$, this sequence eventually stabilises (possibly at $\varnothing$) after countably many steps. The **Cantor–Bendixson theorem** uses this to decompose any closed subset of $\mathbb{R}$ into a perfect set and a countable set, a result with deep consequences in descriptive set theory.

## Summary

- The **derived set** $A'$ is the collection of all accumulation points of $A$.
- $A'$ need not be a subset of $A$, and $A$ need not be a subset of $A'$.
- $A'$ is always a **closed set**.
- $A$ is closed if and only if $A' \subseteq A$.
- The **closure** satisfies $\overline{A} = A \cup A'$: you close up a set by adjoining its derived set.
- The derived set is monotone and distributes over unions; iterating it reveals deep structural information (Cantor–Bendixson).
