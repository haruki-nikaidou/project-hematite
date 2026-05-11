---
title: Introduce to Set
summary: "A precise introduction to sets — the universal language of mathematics — covering notation, membership, subsets, core operations, and cardinality."
prerequisites: []
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

Sets are the foundation on which almost all of modern mathematics is built. Functions, sequences, probability spaces, even the natural numbers themselves — all of these are ultimately defined in terms of sets. Before you can read or write serious mathematics, you need to be fluent with sets.

## What is a set?

A **set** is an unordered collection of distinct objects. The objects it contains are called its **elements** (or **members**).

The most direct way to describe a set is to list its elements inside curly braces:

$$
A = \{1,\; 2,\; 3\}
$$

Two things to keep in mind:

- **Order doesn't matter.** $\{1, 2, 3\}$ and $\{3, 1, 2\}$ are the same set.
- **Repetition is ignored.** $\{1, 1, 2, 3\}$ is the same set as $\{1, 2, 3\}$.

## Membership

The symbol $\in$ means "is an element of." Its negation $\notin$ means "is not an element of."

$$
2 \in \{1, 2, 3\} \qquad 5 \notin \{1, 2, 3\}
$$

## Standard number sets

Certain sets of numbers appear so often that they have reserved symbols:

| Symbol | Name | Elements |
|--------|------|----------|
| $\mathbb{N}$ | Natural numbers | $0, 1, 2, 3, \dots$ |
| $\mathbb{Z}$ | Integers | $\dots, -2, -1, 0, 1, 2, \dots$ |
| $\mathbb{Q}$ | Rational numbers | $\tfrac{1}{2},\; -\tfrac{3}{4},\; 7,\; \dots$ |
| $\mathbb{R}$ | Real numbers | $\pi,\; \sqrt{2},\; -1.5,\; \dots$ |
| $\mathbb{C}$ | Complex numbers | $1 + 2i,\; -i,\; \dots$ |

> **Convention:** Whether $0 \in \mathbb{N}$ varies by author. In this series, $0$ is a natural number.

## Set-builder notation

Listing elements works for small sets, but most interesting sets are too large — or infinite — to list explicitly. **Set-builder notation** lets you describe a set by a property its elements must satisfy:

$$
\{x \in \mathbb{R} \mid x > 0\}
$$

Read this as: "the set of all $x$ in $\mathbb{R}$ such that $x > 0$" — the positive reals. The vertical bar $\mid$ stands for "such that." You will also see a colon used in its place: $\{x \in \mathbb{R} : x > 0\}$.

More generally:

$$
\{x \in S \mid P(x)\}
$$

denotes the subset of $S$ consisting of all elements for which the predicate $P$ holds.

## The empty set

The **empty set** $\emptyset$ (also written $\{\}$) is the unique set that contains no elements. For every object $x$, you have $x \notin \emptyset$.

The empty set plays the same structural role in set theory that $0$ plays in arithmetic.

## Subsets

A set $A$ is a **subset** of $B$, written $A \subseteq B$, when every element of $A$ is also an element of $B$:

$$
A \subseteq B \;\coloneqq\; \forall x,\quad x \in A \;\Rightarrow\; x \in B
$$

If $A \subseteq B$ but $A \neq B$, then $A$ is a **proper subset** of $B$, written $A \subsetneq B$.

A few facts worth memorizing:
- $\emptyset \subseteq A$ for every set $A$.
- $A \subseteq A$ for every set $A$.
- $\mathbb{N} \subsetneq \mathbb{Z} \subsetneq \mathbb{Q} \subsetneq \mathbb{R} \subsetneq \mathbb{C}$.

## Set equality

Two sets are **equal** when they contain exactly the same elements. The standard way to prove $A = B$ is to show mutual containment:

$$
A = B \;\iff\; A \subseteq B \;\text{ and }\; B \subseteq A
$$

This means sets are fully determined by their elements alone — it does not matter how you wrote down the set.

## Core set operations

Given sets $A$ and $B$, you can form new sets using the following operations.

### Union

The **union** $A \cup B$ collects every element that belongs to $A$, to $B$, or to both:

$$
A \cup B \;\coloneqq\; \{x \mid x \in A \text{ or } x \in B\}
$$

### Intersection

The **intersection** $A \cap B$ keeps only elements that belong to *both* $A$ and $B$:

$$
A \cap B \;\coloneqq\; \{x \mid x \in A \text{ and } x \in B\}
$$

When $A \cap B = \emptyset$, the sets are called **disjoint**.

### Set difference

The **difference** $A \setminus B$ (read: "$A$ minus $B$") contains elements of $A$ that are not in $B$:

$$
A \setminus B \;\coloneqq\; \{x \mid x \in A \text{ and } x \notin B\}
$$

### Complement

When all sets under discussion sit inside a fixed **universal set** $U$, the **complement** of $A$ is everything in $U$ that is not in $A$:

$$
A^c \;\coloneqq\; U \setminus A \;=\; \{x \in U \mid x \notin A\}
$$

## Cardinality

The **cardinality** of a finite set $A$, written $|A|$, is the number of elements it contains:

$$
|\{a, b, c\}| = 3, \qquad |\emptyset| = 0
$$

For infinite sets — like $\mathbb{N}$ or $\mathbb{R}$ — cardinality still makes sense, but requires more care. You will encounter the full theory of infinite cardinality in later checkpoints.

## Summary

- A **set** is an unordered collection of distinct objects; write it as $\{a, b, c\}$ or with set-builder notation $\{x \in S \mid P(x)\}$.
- $x \in A$ means $x$ belongs to $A$; $x \notin A$ means it does not.
- The **empty set** $\emptyset$ has no elements and is a subset of every set.
- $A \subseteq B$ iff every element of $A$ is in $B$; $A = B$ iff $A \subseteq B$ and $B \subseteq A$.
- Core operations: **union** ($A \cup B$), **intersection** ($A \cap B$), **difference** ($A \setminus B$), **complement** ($A^c$).
- The **cardinality** $|A|$ counts how many elements a set has.
