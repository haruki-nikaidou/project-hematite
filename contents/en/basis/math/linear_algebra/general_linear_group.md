---
title: General Linear Group
summary: "Shows that invertible n×n matrices form a group under multiplication, introduces GL(n, F) and its coordinate-free version GL(V), and explores key substructures including the special linear group SL(n, F)."
prerequisites: 
  - basis/math/linear_algebra/invertiable_matrix
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/dimension
  - basis/math/abstract_algebra/group
aliases: []
tags: ["Linear Algebra", "Abstract Algebra"]
updated: 2026-05-19
---

You now know what invertible matrices are and how to work with them. A natural next question is: what structure do all invertible matrices form together? The answer is a [group](../../abstract_algebra/group/) — the **general linear group**. It is the algebraic home of every invertible linear transformation, and it appears throughout mathematics wherever symmetry and reversibility play a role.

## Why invertible matrices form a group

From [Invertible Matrix](../invertiable_matrix/), you have four key facts about invertible $n \times n$ matrices over a field $F$:

1. The product of two invertible matrices is invertible: $(AB)^{-1} = B^{-1}A^{-1}$.
2. The identity matrix $I_n$ is invertible.
3. Matrix multiplication is associative.
4. Every invertible matrix $A$ has an inverse $A^{-1}$, which is also invertible.

These are exactly the four group axioms — closure, identity, associativity, and inverses. So the set of all invertible $n \times n$ matrices is a group.

## Definition

> **Definition.** The **general linear group** $\text{GL}(n, F)$ is the set of all invertible $n \times n$ matrices over $F$, with matrix multiplication as the group operation:
>
> $$\text{GL}(n, F) \coloneqq \{ A \in M_{n,n}(F) \mid A \text{ is invertible} \}.$$

Let's verify the axioms explicitly:

| Axiom | Verification |
|---|---|
| Closure | $A, B$ invertible $\Rightarrow$ $(AB)^{-1} = B^{-1}A^{-1}$ exists, so $AB \in \text{GL}(n,F)$ |
| Associativity | Matrix multiplication is associative |
| Identity | $I_n \cdot I_n = I_n$, so $I_n \in \text{GL}(n, F)$ |
| Inverses | For every $A \in \text{GL}(n,F)$, the matrix $A^{-1}$ exists and is also in $\text{GL}(n,F)$ |

## Not abelian for $n \geq 2$

Unlike the integers under addition, $\text{GL}(n, F)$ is **not abelian** for $n \geq 2$: matrix multiplication does not generally commute. A concrete counterexample over $\mathbb{R}$:

$$
A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}, \qquad B = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}.
$$

$$
AB = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}, \qquad BA = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}.
$$

Since $AB \ne BA$, the group is non-abelian. This non-commutativity reflects the fact that applying two transformations in different orders generally produces different results.

The one exception is $n = 1$: $\text{GL}(1, F) = \{(c) \mid c \ne 0\} \cong F^\times$, the multiplicative group of nonzero scalars in $F$, which is abelian.

## The coordinate-free version: GL(V)

The definition of $\text{GL}(n, F)$ depends on choosing a basis for $F^n$ (coordinates). There is a basis-independent version. Given any finite-dimensional vector space $V$ over $F$, define

$$
\text{GL}(V) \coloneqq \{ T: V \to V \mid T \text{ is a bijective linear map} \},
$$

with function composition as the group operation. A bijective linear map from $V$ to itself is called a **linear automorphism** of $V$.

Once you fix a basis of $V$, every linear automorphism is represented by an invertible matrix, giving a group isomorphism

$$
\text{GL}(V) \cong \text{GL}(n, F), \qquad n = \dim V.
$$

Different bases give different isomorphisms, but they are all equivalent in structure. So $\text{GL}(n, F)$ is a concrete, coordinate-based description of the abstract symmetry group of $V$: it captures all the ways you can bijectively rearrange $V$ while respecting its linear structure.

## Special cases

**$\text{GL}(n, \mathbb{R})$**: the group of invertible real matrices. Geometrically, elements are invertible linear transformations of $\mathbb{R}^n$ — those that are "volume-nonzero" and do not collapse $\mathbb{R}^n$ to a lower-dimensional subspace.

**$\text{GL}(n, \mathbb{C})$**: the complex analogue. Because $\mathbb{C}$ is algebraically closed, this group has even richer structure than the real case and plays a central role in representation theory.

**$\text{GL}(n, \mathbb{F}_q)$** over a finite field with $q$ elements: $\text{GL}(n, \mathbb{F}_q)$ is a *finite* group. Counting the invertible matrices is the same as counting ordered bases of $\mathbb{F}_q^n$:

$$
|\text{GL}(n, \mathbb{F}_q)| = \prod_{k=0}^{n-1}(q^n - q^k). \tag{1}
$$

The factor $(q^n - q^k)$ counts the choices for the $(k+1)$-th column: it must be outside the span of the previous $k$ columns (which span a $k$-dimensional subspace of size $q^k$).

## A distinguished subgroup: SL(n, F)

Inside $\text{GL}(n, F)$ sits an important subgroup. The **special linear group** is

$$
\text{SL}(n, F) \coloneqq \{ A \in \text{GL}(n, F) \mid \det(A) = 1 \}.
$$

It is a subgroup because the determinant is multiplicative — $\det(AB) = \det(A)\det(B)$ — and $\det(I_n) = 1$, $\det(A^{-1}) = \det(A)^{-1}$. So $\text{SL}(n, F)$ is closed under multiplication and inverses, and contains the identity.

Over $\mathbb{R}$: matrices in $\text{SL}(n, \mathbb{R})$ are exactly those invertible transformations that preserve signed $n$-dimensional volume. Rotations in $\mathbb{R}^2$ and $\mathbb{R}^3$ are examples: they preserve orientation and volume, so $\det = 1$.

The full group $\text{GL}(n, F)$ allows any nonzero determinant; $\text{SL}(n, F)$ is the "volume-preserving" piece inside it.

## Summary

- The **general linear group** $\text{GL}(n, F)$ is the group of all invertible $n \times n$ matrices over $F$ under matrix multiplication.
- All four group axioms hold: closure from $(AB)^{-1} = B^{-1}A^{-1}$; identity $I_n$; associativity of matrix multiplication; inverses are matrix inverses.
- $\text{GL}(n, F)$ is **non-abelian** for $n \geq 2$; for $n = 1$ it reduces to the multiplicative group $F^\times$.
- The coordinate-free version $\text{GL}(V)$ is the group of linear automorphisms of $V$; a basis choice gives $\text{GL}(V) \cong \text{GL}(\dim V, F)$.
- $|\text{GL}(n, \mathbb{F}_q)| = \prod_{k=0}^{n-1}(q^n - q^k)$ when $F$ is a finite field with $q$ elements.
- The **special linear group** $\text{SL}(n, F) = \{A \in \text{GL}(n,F) \mid \det(A) = 1\}$ is a subgroup of $\text{GL}(n,F)$, consisting of the volume-preserving transformations.
