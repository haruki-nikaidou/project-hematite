---
title: σ-Algebra
summary: "A σ-algebra is a collection of subsets that is closed under complement and countable union — the natural domain on which a measure can be defined. This checkpoint states the axioms, works through the Borel σ-algebra as the canonical example, and explains why countable (rather than finite) closure is the right strength."
prerequisites:
  - basis/math/measure/introduce_to_measure
  - basis/math/analysis/set/countable
aliases: []
tags:
  - Measure Theory
updated: 2026-05-20
---

[Introduction to Measure](../introduce_to_measure/) showed that you cannot assign a length to every subset of $\mathbb{R}$. The σ-algebra is the answer to the question: *which* subsets should you include? It is the precise structure that makes a measure possible.

## The definition

Let $X$ be any set. A **σ-algebra** (sigma-algebra) on $X$ is a collection $\mathcal{F}$ of subsets of $X$ satisfying three axioms:

1. $X \in \mathcal{F}$ — the whole space is measurable.
2. If $E \in \mathcal{F}$, then $E^c \coloneqq X \setminus E \in \mathcal{F}$ — closed under **complement**.
3. If $E_1, E_2, E_3, \ldots \in \mathcal{F}$, then $\bigcup_{k=1}^{\infty} E_k \in \mathcal{F}$ — closed under **countable union**.

A set $E \in \mathcal{F}$ is called **$\mathcal{F}$-measurable** (or just measurable when $\mathcal{F}$ is understood). The pair $(X, \mathcal{F})$ is called a **measurable space**.

### Immediate consequences

From the three axioms you can derive several more closure properties without any extra work.

**Empty set.** $X \in \mathcal{F}$ by axiom 1, so $\emptyset = X^c \in \mathcal{F}$ by axiom 2.

**Countable intersection.** If $E_1, E_2, \ldots \in \mathcal{F}$, then by De Morgan's law:

$$
\bigcap_{k=1}^{\infty} E_k
  = \left(\bigcup_{k=1}^{\infty} E_k^c\right)^c. \tag{1}
$$

Each $E_k^c \in \mathcal{F}$ by axiom 2; the union belongs to $\mathcal{F}$ by axiom 3; taking the complement once more gives $\bigcap_k E_k \in \mathcal{F}$ by axiom 2. So σ-algebras are also closed under countable intersection.

**Set difference.** $E \setminus F = E \cap F^c \in \mathcal{F}$ for any $E, F \in \mathcal{F}$, by combining the intersection result with axiom 2.

## Why "countable" is the right strength

Axiom 3 uses *countable* unions, not just finite ones. This is deliberate.

- **Finite closure alone is too weak.** You need to talk about limits of sets — for example, the open sets $\{(a_k, b_k)\}$ whose union approaches a closed interval as $k \to \infty$. A collection closed under only finitely many operations cannot handle such limits.
- **Uncountable closure is too strong.** If you demanded closure under *all* unions, every sub-collection of the power set would force the entire power set into $\mathcal{F}$. The only σ-algebra on $\mathbb{R}$ closed under arbitrary unions is $2^{\mathbb{R}}$ — which, as the Vitali set shows, includes non-measurable sets and cannot support Lebesgue measure.

Countable closure threads the needle: it is rich enough to handle all the analytic constructions you need (limits, intersections of open covers, …) while still excluding the problematic sets.

## Three canonical examples

### The trivial σ-algebras

The smallest σ-algebra on $X$ is $\{\emptyset, X\}$. Check: $X^c = \emptyset \in \mathcal{F}$, and any countable union of $\emptyset$'s and $X$'s is either $\emptyset$ or $X$.

The largest σ-algebra on $X$ is the **power set** $2^X$ — all subsets of $X$. This satisfies all three axioms trivially, but it is too large to support a useful measure when $X = \mathbb{R}$.

### The Borel σ-algebra on $\mathbb{R}$

The **Borel σ-algebra** $\mathcal{B}(\mathbb{R})$ is the *smallest* σ-algebra on $\mathbb{R}$ that contains every open interval $(a, b)$. More formally, it is the intersection of all σ-algebras that contain the open intervals:

$$
\mathcal{B}(\mathbb{R}) \;\coloneqq\; \bigcap \{\mathcal{F} : \mathcal{F} \text{ is a σ-algebra and } (a,b) \in \mathcal{F} \text{ for all } a < b\}. \tag{2}
$$

An intersection of σ-algebras is always a σ-algebra — check: if every $\mathcal{F}$ in the intersection contains $E$, then every $\mathcal{F}$ also contains $E^c$ (by axiom 2 for each), so $E^c$ lies in the intersection; similarly for countable unions. The definition $(2)$ is therefore well-formed.

Sets that belong to $\mathcal{B}(\mathbb{R})$ are called **Borel sets**. Because $\mathcal{B}(\mathbb{R})$ is closed under countable union and intersection:
- Every open set is Borel (as a countable union of open intervals — recall that every open set in $\mathbb{R}$ decomposes into countably many disjoint open intervals).
- Every closed set is Borel (complement of open).
- Every $F_\sigma$ (countable union of closed sets) and every $G_\delta$ (countable intersection of open sets) is Borel.
- All the "everyday" subsets of $\mathbb{R}$ — singletons, intervals, countable sets, polynomial zero sets — are Borel.

The Vitali set is *not* Borel; it lies outside $\mathcal{B}(\mathbb{R})$ entirely.

## Generating a σ-algebra

You saw above that an intersection of σ-algebras is a σ-algebra. This gives a clean way to build new σ-algebras from scratch.

**Definition.** Let $\mathcal{A}$ be any collection of subsets of $X$. The **σ-algebra generated by $\mathcal{A}$**, written $\sigma(\mathcal{A})$, is the smallest σ-algebra containing every set in $\mathcal{A}$:

$$
\sigma(\mathcal{A}) \;\coloneqq\; \bigcap \{\mathcal{F} : \mathcal{F} \text{ is a σ-algebra and } \mathcal{A} \subseteq \mathcal{F}\}.
$$

The Borel σ-algebra is precisely $\sigma(\{(a,b) : a < b\})$.

Note that $\sigma(\mathcal{A})$ is not the set of all finite unions and intersections of sets in $\mathcal{A}$ — you must also close under *countable* operations, which may require transfinitely many steps to reach all of $\sigma(\mathcal{A})$.

## Summary

- A **σ-algebra** $\mathcal{F}$ on $X$ is a collection of subsets closed under: containing $X$, taking complements, and taking countable unions — axioms 1–3 above.
- From these axioms, $\mathcal{F}$ is also closed under $\emptyset$, countable intersections (equation $(1)$), and set differences.
- **Countable** closure is the right strength: finite is too weak for analytic limits; uncountable forces in non-measurable sets.
- The **trivial σ-algebras** $\{\emptyset, X\}$ and $2^X$ are the smallest and largest.
- The **Borel σ-algebra** $\mathcal{B}(\mathbb{R})$, defined in $(2)$, is generated by the open intervals and contains all open, closed, $F_\sigma$, $G_\delta$, and "everyday" sets.
- The **σ-algebra generated** by a collection $\mathcal{A}$ is the smallest σ-algebra containing $\mathcal{A}$; it is formed by intersecting all σ-algebras that contain $\mathcal{A}$.
- Next up: [Outer Measure](../outer_measure/), which assigns a preliminary "size" to every subset of $\mathbb{R}$ before restricting to the measurable ones.
