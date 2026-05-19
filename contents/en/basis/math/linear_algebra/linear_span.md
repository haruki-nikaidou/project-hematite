---
title: Linear Span
summary: "Defines the span of a set of vectors as the collection of all their linear combinations, proves it is always the smallest subspace containing the set, and introduces spanning sets as the foundation for bases."
prerequisites: 
  - basis/math/linear_algebra/linearly_dependent
  - basis/math/abstract_algebra/field
  - elementry/math/vector_space
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-19
---

Given a handful of vectors, what can you build from them using only addition and scalar multiplication? The answer — the set of all possible outputs — is the **span**. Span is the central construction of linear algebra: every subspace, every basis, every row space and column space is ultimately described as the span of something.

## Definition

Let $V$ be a vector space over a field $F$, and let $S \subseteq V$ be any subset. The **span** of $S$ is the set of all [linear combinations](../linearly_dependent/) of elements of $S$:

$$\text{span}(S) \coloneqq \bigl\{ c_1 v_1 + \cdots + c_k v_k : k \ge 0,\ v_1, \ldots, v_k \in S,\ c_1, \ldots, c_k \in F \bigr\}. \tag{1}$$

Two boundary cases:
- $\text{span}(\emptyset) = \{\mathbf{0}\}$ by convention: a sum of zero vectors is the empty sum, which equals $\mathbf{0}$.
- $\text{span}(\{v\}) = \{cv : c \in F\}$, the line through the origin in the direction of $v$.

## Examples

**Span in $\mathbb{R}^2$.** Let $e_1 = (1, 0)$ and $e_2 = (0, 1)$.
- $\text{span}(\{e_1\}) = \{(c, 0) : c \in \mathbb{R}\}$ — the $x$-axis.
- $\text{span}(\{e_1, e_2\}) = \{(c_1, c_2) : c_1, c_2 \in \mathbb{R}\} = \mathbb{R}^2$ — the whole plane.
- $\text{span}(\{(1,0), (2,0)\}) = \{(c,0) : c \in \mathbb{R}\}$ — still just the $x$-axis, because $(2,0)$ is already a multiple of $(1,0)$ and contributes nothing new.

**Span in $\mathbb{R}^3$.** Let $u = (1, 0, 0)$ and $v = (0, 1, 0)$.
- $\text{span}(\{u, v\}) = \{(c_1, c_2, 0) : c_1, c_2 \in \mathbb{R}\}$ — the $xy$-plane.
- Adding $w = (0, 0, 1)$: $\text{span}(\{u, v, w\}) = \mathbb{R}^3$.
- Adding $(1, 1, 0)$ instead: $\text{span}(\{u, v, (1,1,0)\}) = \text{span}(\{u,v\})$ — still just the $xy$-plane, since $(1,1,0) = u + v$.

The pattern: a redundant vector (one that is already a linear combination of the others) does not enlarge the span.

## The span is always a subspace

**Theorem**: For any $S \subseteq V$, the set $\text{span}(S)$ is a subspace of $V$.

*Proof.* $\text{span}(S)$ is non-empty ($\mathbf{0} \in \text{span}(S)$ via the empty combination). If $x = c_1 v_1 + \cdots + c_k v_k$ and $y = d_1 w_1 + \cdots + d_l w_l$ are two elements of $\text{span}(S)$, and $a, b \in F$, then

$$ax + by = ac_1 v_1 + \cdots + ac_k v_k + bd_1 w_1 + \cdots + bd_l w_l$$

is again a linear combination of elements of $S$, so $ax + by \in \text{span}(S)$. $\square$

Moreover, $\text{span}(S)$ is the **smallest** subspace of $V$ containing $S$: any subspace $W$ that contains $S$ must be closed under linear combinations, so it must contain every element of $\text{span}(S)$. In symbols:

$$\text{span}(S) = \bigcap \{W \subseteq V : W \text{ is a subspace and } S \subseteq W\}. \tag{2}$$

## Spanning sets

A subset $S \subseteq V$ **spans** $V$ (or is a **spanning set** for $V$) if $\text{span}(S) = V$ — that is, every vector in $V$ can be expressed as a linear combination of vectors in $S$.

**Example**: $\{(1,0),(0,1)\}$ spans $\mathbb{R}^2$. So does $\{(1,0),(0,1),(1,1)\}$ — but the third vector is redundant. And $\{(1,0)\}$ alone does not span $\mathbb{R}^2$.

A spanning set can be reduced: if any vector in $S$ is a linear combination of the others, it can be removed without changing $\text{span}(S)$. Repeating this process yields a minimal spanning set — one in which no vector is redundant — which is exactly what [Linear Subspace](../linear_subspace/) calls a **basis**.

## Why span is the right notion

Span answers the reachability question: which vectors are in the "reach" of a given set? This question appears in every corner of linear algebra:
- Is a vector $b$ in the column space of $A$? Equivalently, is $b \in \text{span}(\text{columns of } A)$?
- Does a set of vectors cover all of $V$? Equivalently, does it span $V$?
- What is the smallest subspace containing a given set? Its span.

## Summary

- $\text{span}(S)$ is the set of all linear combinations of elements of $S$; by convention, $\text{span}(\emptyset) = \{\mathbf{0}\}$.
- $\text{span}(S)$ is always a subspace of $V$, and it is the smallest subspace containing $S$.
- A redundant vector — one that is already a linear combination of the others — does not change the span.
- $S$ **spans** $V$ if $\text{span}(S) = V$. Removing all redundancies from a spanning set yields a basis.
