---
title: Linear Subspace
summary: "Defines a linear subspace as a subset of a vector space that is closed under addition and scalar multiplication, gives the key characterization theorem, and identifies the important examples that appear throughout linear algebra."
prerequisites: 
  - basis/math/linear_algebra/linear_span
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

Not every subset of a vector space is itself a vector space. A random subset can fail to contain the zero vector, or it can "escape" the subset when you add two of its elements. **Linear subspaces** are the subsets that preserve the vector space structure — and they appear naturally everywhere in linear algebra: as kernels, as images, as solution sets of homogeneous systems.

## Definition

Let $V$ be a vector space over a field $F$. A non-empty subset $W \subseteq V$ is a **linear subspace** (also simply called a **subspace**) of $V$ if it satisfies all three of the following conditions:

1. $\mathbf{0} \in W$ &ensp;(the zero vector belongs to $W$)
2. $u, v \in W \implies u + v \in W$ &ensp;(closed under addition)
3. $u \in W,\ c \in F \implies cu \in W$ &ensp;(closed under scalar multiplication)

When these hold, $W$ is a vector space in its own right, using the same operations as $V$. All the vector space axioms — associativity, distributivity, etc. — are inherited automatically from $V$, because $W$'s elements and operations are simply those of $V$ restricted to $W$. The three conditions above are the only ones you need to verify.

## The subspace criterion

Conditions 2 and 3 together say that $W$ is closed under all linear combinations. This leads to a compact test:

**Subspace criterion**: A non-empty subset $W \subseteq V$ is a subspace of $V$ if and only if

$$u, v \in W \text{ and } c, d \in F \implies cu + dv \in W.$$

**(Closed under all linear combinations.)**

The condition also implies $\mathbf{0} \in W$ without needing to check it separately: since $W$ is non-empty, there exists some $u \in W$; taking $c = 0$ gives $0 \cdot u = \mathbf{0} \in W$. So you only need to verify that $W$ is non-empty and closed under linear combinations.

## Examples

### The trivial subspace

$W = \{\mathbf{0}\}$ is the smallest possible subspace of any vector space. It contains only the zero vector. It clearly satisfies all three conditions.

### The whole space

$W = V$ itself is trivially a subspace — it is the largest.

### Lines and planes through the origin in $\mathbb{R}^3$

- Any **line through the origin** in $\mathbb{R}^3$ — a set of the form $\{t\,v : t \in \mathbb{R}\}$ for a fixed nonzero $v$ — is a one-dimensional subspace.
- Any **plane through the origin** in $\mathbb{R}^3$ — a set of the form $\{s\,u + t\,v : s, t \in \mathbb{R}\}$ for linearly independent $u, v$ — is a two-dimensional subspace.

Notice the requirement "through the origin": a line or plane that does not pass through the origin is **not** a subspace (it does not contain $\mathbf{0}$).

### Solution sets of homogeneous systems

If $A \in M_{m,n}(F)$, the solution set of the homogeneous system $Ax = \mathbf{0}$ is a subspace of $F^n$. Check: $A\mathbf{0} = \mathbf{0}$ (zero is a solution); if $Ax = \mathbf{0}$ and $Ay = \mathbf{0}$ then $A(x+y) = \mathbf{0}$; if $Ax = \mathbf{0}$ then $A(cx) = c(Ax) = \mathbf{0}$. This subspace is the **kernel** of $A$, developed in [Kernel](../kernel/).

## Non-example

A line in $\mathbb{R}^2$ that does not pass through the origin, say $\{(x, y) : y = x + 1\}$, is not a subspace: it does not contain $(0, 0)$, and adding two points on it gives $(0, 0) + (1, 2) = (1, 2)$ — wait, more concretely: $(1, 2) + (2, 3) = (3, 5)$ lies on the line, but $2 \cdot (1, 2) = (2, 4)$ does not lie on $y = x + 1$. The closure conditions fail.

## Spans and bases

From [Linear Span](../linear_span/), the span of any subset $S \subseteq V$ is automatically a subspace — the smallest subspace containing $S$. This gives a rich supply of subspaces from any set of vectors.

## Bases of a subspace

A **basis** of a subspace $W$ is a subset $\mathcal{B} \subseteq W$ that is:

1. **Linearly independent** (as defined in [Linearly Dependent](../linearly_dependent/)).
2. **Spanning**: $\text{span}(\mathcal{B}) = W$.

A basis is a "minimal spanning set" and simultaneously a "maximal independent set" inside $W$. The number of elements in any basis of $W$ is always the same — this common number is the **dimension** of $W$, written $\dim W$.

## Summary

- A **subspace** $W \subseteq V$ is a non-empty subset closed under addition and scalar multiplication; equivalently, closed under all linear combinations $cu + dv$.
- Being non-empty and closed under linear combinations automatically ensures $\mathbf{0} \in W$ and all vector space axioms.
- Key examples: $\{\mathbf{0}\}$, $V$ itself, lines/planes through the origin, and solution sets of homogeneous systems.
- A subset that does not contain $\mathbf{0}$ (such as a shifted affine subspace) is **not** a subspace.
- The **span** of any set $S$ ([Linear Span](../linear_span/)) is the smallest subspace containing $S$.
- A **basis** of $W$ is a linearly independent spanning set; its size is $\dim W$.
