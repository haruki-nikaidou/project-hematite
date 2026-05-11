---
title: Total Order
summary: "A total order extends partial order by requiring every pair of elements to be comparable, producing a single linear ranking with no incomparable pairs."
prerequisites: 
  - basis/math/analysis/set/partial_ord
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

In a [partial order](../partial_ord/), some pairs of elements can be incomparable — think of the subsets $\{1\}$ and $\{2\}$ sitting side by side with no inclusion between them. But the familiar ordering of numbers has no such gaps: given any two integers, you can always say which one is smaller. That stronger condition is a **total order**.

## The totality axiom

A [partial order](../partial_ord/) $(S, \leq)$ requires $\leq$ to be reflexive, antisymmetric, and transitive. A **total order** (also called a **linear order**) adds one more requirement:

$$
\forall a, b \in S,\quad a \leq b \;\text{ or }\; b \leq a \tag{Totality}
$$

Every pair of elements must be comparable — there are no incomparable pairs at all.

> **Note.** Totality implies reflexivity: setting $a = b$ gives $a \leq a$. So in some formulations you will see a total order defined as a relation satisfying only antisymmetry, transitivity, and totality; the reflexivity axiom follows for free.

## Definition

A pair $(S, \leq)$ is a **totally ordered set** (or **linearly ordered set**) when $\leq$ is a partial order that also satisfies (Totality).

### Law of trichotomy

An equivalent way to state totality (given antisymmetry and transitivity) is the **law of trichotomy**: for any two elements $a$ and $b$, exactly one of the three cases holds:

$$
a < b, \qquad a = b, \qquad \text{or} \qquad b < a \tag{Trichotomy}
$$

Trichotomy is often the most natural way to reason about total orders in practice: you branch your argument on these three mutually exclusive cases and handle each one separately.

## Examples

### Real numbers under $\leq$

$(\mathbb{R}, \leq)$ is the canonical total order. Given any $a, b \in \mathbb{R}$, exactly one of $a < b$, $a = b$, $b < a$ holds. The same totality applies to $(\mathbb{Q}, \leq)$, $(\mathbb{Z}, \leq)$, and $(\mathbb{N}, \leq)$.

### Lexicographic order on strings

Fix a totally ordered alphabet — say, the standard alphabetical order on letters. The **lexicographic order** on strings over that alphabet compares two strings character by character: find the first position where they differ and use the alphabet order there; if one string runs out of characters first, it comes before the other. For example:

$$
\text{"apple"} < \text{"apply"} < \text{"apt"}
$$

This gives a total order on any set of strings over the same alphabet, and it is the same order a dictionary uses.

### Linear extensions of partial orders

Given any finite poset, you can always extend it to a total order that is *consistent* with it: whenever $a \leq b$ in the original partial order, $a \leq b$ holds in the total order too. Such an extension is called a **linear extension**. This is useful in practice: if tasks have a dependency order (a partial order), you can always schedule them in a single linear sequence that respects all dependencies.

## Non-examples

### Divisibility on $\mathbb{N}$

As seen in [Partial Order](../partial_ord/), divisibility is not total: $2 \nmid 3$ and $3 \nmid 2$, so $2$ and $3$ are incomparable.

### Subset inclusion on a power set

$(\mathcal{P}(A), \subseteq)$ is not a total order for any set $A$ with $|A| \geq 2$: any two distinct singletons $\{a\}$ and $\{b\}$ (with $a \neq b$) are incomparable.

## Properties unique to total orders

The totality axiom unlocks structural properties that partial orders do not guarantee.

### Minimal and least elements coincide

In a general poset, a poset can have multiple minimal elements with no least element among them — the divisibility example on $\{2, 3, 6\}$ from [Partial Order](../partial_ord/) illustrates this. In a total order, the notions collapse: if $m$ is minimal (nothing is strictly below it), then for every $a \in S$, totality gives either $m \leq a$ or $a \leq m$; the latter would make $a < m$, contradicting minimality. Therefore $m \leq a$ for all $a \in S$, meaning $m$ is a least element.

**Consequence.** In a total order, there is at most one minimal element, and if it exists it is the unique least element. The same reasoning applies to maximal and greatest elements.

### Every non-empty finite totally ordered set has a unique min and max

You can find the minimum by starting with any element and repeatedly replacing it with a smaller one as you scan through the set. Totality ensures every comparison is decisive; finiteness ensures the scan terminates. The final candidate is the minimum. By symmetry, a maximum exists as well.

### Hasse diagrams of total orders are chains

In the Hasse diagram of a totally ordered set, every element has a unique predecessor and a unique successor (when they exist), so all elements line up in a single vertical chain with no branching. This linear shape is why total orders are also called *linear* orders.

## Summary

- A **total order** is a partial order with the extra **totality** axiom: every pair of elements is comparable.
- Equivalently, the **law of trichotomy** holds: for any $a$ and $b$, exactly one of $a < b$, $a = b$, $b < a$ is true.
- Key examples: $(\mathbb{R}, \leq)$, $(\mathbb{Z}, \leq)$, $(\mathbb{Q}, \leq)$, $(\mathbb{N}, \leq)$, and lexicographic order on strings.
- Divisibility on $\mathbb{N}$ and subset inclusion on power sets are **not** total orders.
- In a total order, minimal and least coincide; every non-empty finite totally ordered set has a unique minimum and maximum.
