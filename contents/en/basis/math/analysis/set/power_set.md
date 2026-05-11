---
title: Power Set
summary: "An introduction to power sets — the set of all subsets of a given set — covering notation, explicit construction, and the key result that a set with n elements has exactly 2ⁿ subsets."
prerequisites: 
  - basis/math/analysis/set/set_intro
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

Every set carries a hidden companion: the set of all its subsets. This companion is called the power set, and it is always strictly larger than the original set — even for infinite ones. Power sets appear in combinatorics, logic, topology, and computer science, so understanding them early pays dividends across many subjects.

## Definition

Let $A$ be a set. The **power set** of $A$, written $\mathcal{P}(A)$, is the set whose elements are exactly the subsets of $A$:

$$
\mathcal{P}(A) \;\coloneqq\; \{S \mid S \subseteq A\}.
$$

The elements of $\mathcal{P}(A)$ are themselves sets — this is what makes the power set feel unusual at first. Two subsets are always guaranteed to be in $\mathcal{P}(A)$ for any $A$:

- $\emptyset \in \mathcal{P}(A)$, because the empty set is a subset of every set.
- $A \in \mathcal{P}(A)$, because $A$ is always a subset of itself.

## Building the power set step by step

Let $A = \{1, 2, 3\}$. You can enumerate all subsets by grouping them by size:

| Size | Subsets |
|------|---------|
| 0 | $\emptyset$ |
| 1 | $\{1\}$, $\{2\}$, $\{3\}$ |
| 2 | $\{1,2\}$, $\{1,3\}$, $\{2,3\}$ |
| 3 | $\{1,2,3\}$ |

Therefore:

$$
\mathcal{P}(\{1,2,3\}) = \bigl\{
  \emptyset,\;
  \{1\},\; \{2\},\; \{3\},\;
  \{1,2\},\; \{1,3\},\; \{2,3\},\;
  \{1,2,3\}
\bigr\}.
$$

Count the elements: there are $8$ of them.

## Cardinality of the power set

For a finite set $A$ with $|A| = n$ elements,

$$
|\mathcal{P}(A)| = 2^n. \tag{1}
$$

**Why $2^n$?** For each of the $n$ elements in $A$, you face a binary choice: include it in the subset or leave it out. The total number of distinct ways to make all $n$ choices is

$$
\underbrace{2 \times 2 \times \cdots \times 2}_{n \text{ factors}} = 2^n.
$$

This is why $\mathcal{P}(A)$ is also written $2^A$.

**Checking the example.** $|\{1,2,3\}| = 3$, so $|\mathcal{P}(\{1,2,3\})| = 2^3 = 8$. That matches the eight subsets listed above.

A few small cases worth knowing:

| $|A|$ | $|\mathcal{P}(A)|$ | Example |
|-------|--------------------|---------|
| $0$ | $1$ | $\mathcal{P}(\emptyset) = \{\emptyset\}$ |
| $1$ | $2$ | $\mathcal{P}(\{a\}) = \{\emptyset, \{a\}\}$ |
| $2$ | $4$ | $\mathcal{P}(\{a,b\}) = \{\emptyset, \{a\}, \{b\}, \{a,b\}\}$ |
| $3$ | $8$ | (as above) |
| $10$ | $1024$ | — |

Notice that $\mathcal{P}(\emptyset) = \{\emptyset\}$ has exactly one element (the empty set itself), not zero.

## The binary string viewpoint

Each subset $S \subseteq A$ corresponds to a **characteristic function** that marks which elements of $A$ are in $S$:

$$
\mathbf{1}_S \colon A \to \{0, 1\}, \quad
a \mapsto \begin{cases} 1 & a \in S \\ 0 & a \notin S \end{cases}
$$

For $A = \{1, 2, 3\}$, ordering the elements as $(a_1, a_2, a_3) = (1, 2, 3)$ gives a bijection between $\mathcal{P}(A)$ and binary strings of length 3:

| Subset | Binary string $(a_1, a_2, a_3)$ |
|--------|--------------------------------|
| $\emptyset$ | $(0,\;0,\;0)$ |
| $\{1\}$ | $(1,\;0,\;0)$ |
| $\{2\}$ | $(0,\;1,\;0)$ |
| $\{3\}$ | $(0,\;0,\;1)$ |
| $\{1,2\}$ | $(1,\;1,\;0)$ |
| $\{1,3\}$ | $(1,\;0,\;1)$ |
| $\{2,3\}$ | $(0,\;1,\;1)$ |
| $\{1,2,3\}$ | $(1,\;1,\;1)$ |

There are exactly $2^3 = 8$ binary strings of length 3, which independently confirms equation $(1)$.

This bijection $\mathcal{P}(A) \cong \{0,1\}^A$ is the deeper reason for the notation $2^A$: $2$ is the set $\{0, 1\}$, and $\{0,1\}^A$ is the set of all maps from $A$ to $\{0,1\}$.

## Power sets of infinite sets

For infinite sets, equation $(1)$ no longer applies directly — but the spirit survives. **Cantor's theorem** states that for *any* set $A$, there is no surjection from $A$ onto $\mathcal{P}(A)$. In particular:

$$
|A| < |\mathcal{P}(A)|
$$

in the sense that there is an injection $A \hookrightarrow \mathcal{P}(A)$ (send each $a$ to $\{a\}$) but no bijection. The power set is always strictly larger than the original set, even when both are infinite.

## Summary

- The **power set** $\mathcal{P}(A)$ is the set of all subsets of $A$; its elements are sets.
- It always contains $\emptyset$ and $A$ itself.
- For a finite set, $|\mathcal{P}(A)| = 2^{|A|}$ — one subset per binary choice of inclusion.
- Each subset corresponds to a binary string of length $|A|$, giving a bijection $\mathcal{P}(A) \cong \{0,1\}^A$; hence the alternative notation $2^A$.
- **Cantor's theorem**: for any set $A$, $\mathcal{P}(A)$ is strictly larger than $A$ — there is no surjection $A \twoheadrightarrow \mathcal{P}(A)$.
