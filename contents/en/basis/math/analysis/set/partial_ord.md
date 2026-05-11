---
title: Partial Order
summary: "Introduces partial orders — reflexive, antisymmetric, and transitive binary relations — covering key examples such as divisibility and set inclusion, Hasse diagrams, and the distinctions between minimal, maximal, least, and greatest elements."
prerequisites: 
  - basis/math/analysis/set/set_intro
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

When you sort a list of numbers from smallest to largest, you are relying on an ordering. But ordering ideas are far more general: you can order subsets by inclusion, tasks by dependency, or integers by divisibility. The abstract structure behind all of these is the **partial order** — a precise mathematical notion of "comes before or is equal to" that even allows some pairs of elements to be incomparable.

## Binary relations

Before defining an order, you need a way to talk about relationships between elements of a set. The key ingredient is the **Cartesian product**.

Given sets $A$ and $B$, their **Cartesian product** $A \times B$ is the set of all ordered pairs $(a, b)$ with $a \in A$ and $b \in B$:

$$
A \times B \;\coloneqq\; \{(a, b) \mid a \in A,\; b \in B\}
$$

For example, $\{1, 2\} \times \{x, y\} = \{(1,x),\,(1,y),\,(2,x),\,(2,y)\}$.

A **binary relation** on a set $S$ is any subset $R \subseteq S \times S$. When $(a, b) \in R$, you say "*$a$ is related to $b$*" and write $a \mathbin{R} b$. The relation describes which ordered pairs are "related" by whatever rule $R$ encodes.

Familiar examples:
- The usual $\leq$ on $\mathbb{Z}$: the pair $(2, 5)$ belongs to the relation because $2 \leq 5$.
- Divisibility on $\mathbb{N}$: $a \mid b$ means $\exists\, k \in \mathbb{N}$ such that $b = k \cdot a$.
- Set inclusion on a power set: the pair $(\{1\}, \{1, 2\})$ belongs to the relation because $\{1\} \subseteq \{1, 2\}$.

## Three key properties

Not all binary relations are orders. An ordering relation must satisfy three structural conditions.

**Reflexivity.** Every element is related to itself:

$$
\forall a \in S,\quad a \leq a
$$

**Antisymmetry.** If $a \leq b$ and $b \leq a$, then $a$ and $b$ must be equal:

$$
\forall a, b \in S,\quad a \leq b \;\text{ and }\; b \leq a \;\Longrightarrow\; a = b
$$

This rules out cycles: two distinct elements cannot each be "below" the other simultaneously.

**Transitivity.** If $a \leq b$ and $b \leq c$, then $a \leq c$:

$$
\forall a, b, c \in S,\quad a \leq b \;\text{ and }\; b \leq c \;\Longrightarrow\; a \leq c
$$

This captures the idea that the ordering "propagates" through chains of comparisons.

## Definition of a partial order

A **partial order** on $S$ is a binary relation $\leq$ on $S$ that is reflexive, antisymmetric, and transitive. The pair $(S, \leq)$ is called a **partially ordered set**, or **poset**.

The symbol $\leq$ is conventional, but any binary relation satisfying these three axioms is a partial order, regardless of the notation used.

### Strict partial order

From any partial order $\leq$, you get a companion **strict partial order** $<$ defined by:

$$
a < b \;\coloneqq\; a \leq b \;\text{ and }\; a \neq b
$$

The strict version is **irreflexive** ($a \not< a$ for all $a$) and **asymmetric** ($a < b \Rightarrow b \not< a$). Either version determines the other, so you can specify a partial order by giving either $\leq$ or $<$.

## Examples

### Integers under $\leq$

$(\mathbb{Z}, \leq)$ is the most familiar partial order. Reflexivity ($n \leq n$), antisymmetry (if $m \leq n$ and $n \leq m$ then $m = n$), and transitivity (if $m \leq n$ and $n \leq p$ then $m \leq p$) all hold. In this example, every pair of integers is comparable: given any $m, n \in \mathbb{Z}$, either $m \leq n$ or $n \leq m$.

### Power sets under inclusion

Let $A$ be any set and let $\mathcal{P}(A)$ denote its **power set** — the set of all subsets of $A$. Then $(\mathcal{P}(A), \subseteq)$ is a partial order.

With $A = \{1, 2, 3\}$, consider the subsets $\{1, 2\}$ and $\{2, 3\}$: neither contains the other, so they are *incomparable* under $\subseteq$. This does not happen in $(\mathbb{Z}, \leq)$.

### Divisibility on positive integers

Define $a \mid b$ ("$a$ divides $b$") if there exists $k \in \mathbb{N}$ with $b = k \cdot a$. Then $(\mathbb{Z}_{>0},\; \mid)$ is a partial order:

- **Reflexivity:** $a \mid a$ since $a = 1 \cdot a$. ✓
- **Antisymmetry:** if $a \mid b$ and $b \mid a$ for positive integers, then $a = b$. ✓
- **Transitivity:** if $a \mid b$ and $b \mid c$, write $b = j \cdot a$ and $c = k \cdot b$; then $c = (kj) \cdot a$, so $a \mid c$. ✓

Yet $2$ and $3$ are incomparable: $2 \nmid 3$ and $3 \nmid 2$.

## Hasse diagrams

For finite posets, a **Hasse diagram** gives a concise visual summary:

- Draw each element as a labelled dot.
- Place $b$ *higher* than $a$ whenever $a < b$.
- Draw a line segment from $a$ upward to $b$ only when $a < b$ and there is no $c$ with $a < c < b$ (these are called *covering relations*).
- Omit lines that are already implied by transitivity.

For the divisibility order on $\{1, 2, 3, 6\}$, the diagram has $1$ at the bottom, $2$ and $3$ in the middle (each connected to $1$ by a line), and $6$ at the top (connected to $2$ and $3$). The line from $1$ to $6$ is left out because it follows from $1 < 2 < 6$ by transitivity.

## Comparable and incomparable elements

Two elements $a, b \in S$ are **comparable** if $a \leq b$ or $b \leq a$. They are **incomparable** if neither holds; this is sometimes written $a \parallel b$.

In $(\mathbb{Z}, \leq)$, every pair is comparable. In $(\mathcal{P}(\{1,2\}), \subseteq)$, the singletons $\{1\}$ and $\{2\}$ are incomparable. The word "partial" in "partial order" refers precisely to this: not every pair of elements needs to be comparable. When every pair *is* comparable, the result is a stronger notion — the total order, which you will meet in the next checkpoint.

## Minimal, maximal, least, and greatest elements

These four terms are easy to confuse; here are their precise meanings.

An element $m \in S$ is **minimal** if nothing in $S$ is strictly below it:

$$
\nexists\, a \in S \text{ with } a < m
$$

An element $M \in S$ is **maximal** if nothing in $S$ is strictly above it:

$$
\nexists\, a \in S \text{ with } M < a
$$

A **least element** (or **minimum**) of $S$ is an element $m_0$ below every other element:

$$
\forall a \in S,\quad m_0 \leq a
$$

A **greatest element** (or **maximum**) of $S$ is an element $M_0$ above every other element:

$$
\forall a \in S,\quad a \leq M_0
$$

> **Key distinction.** A least element is automatically minimal, but a minimal element need not be a least element. A poset can have several minimal elements with no least element among them.

**Example.** Consider divisibility on $S = \{2, 3, 6\}$. The elements $2$ and $3$ are both minimal (no element of $S$ divides either of them strictly), but there is no least element — $2$ and $3$ are incomparable, so neither is $\leq$ the other. The element $6$ is both maximal and the unique greatest element, since $2 \mid 6$ and $3 \mid 6$.

When a least element exists, it is unique by antisymmetry; the same applies to a greatest element.

## Summary

- The **Cartesian product** $A \times B = \{(a, b) \mid a \in A, b \in B\}$ packages ordered pairs. A **binary relation** on $S$ is any subset of $S \times S$.
- A **partial order** $\leq$ on $S$ is **reflexive**, **antisymmetric**, and **transitive**; the pair $(S, \leq)$ is a **poset**.
- The companion **strict partial order** $<$ is defined by $a < b \coloneqq a \leq b$ and $a \neq b$.
- Key examples: $(\mathbb{Z}, \leq)$, $(\mathcal{P}(A), \subseteq)$, and divisibility on positive integers.
- Elements can be **comparable** (one is $\leq$ the other) or **incomparable** (neither is).
- A **least (greatest)** element is $\leq$ ($\geq$) every element in $S$ and is unique; a **minimal (maximal)** element merely has nothing strictly below (above) it and need not be unique.
