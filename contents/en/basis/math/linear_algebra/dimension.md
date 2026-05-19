---
title: Dimension & Rank
summary: "Proves that all bases of a finite-dimensional vector space have the same size, defines dimension as this invariant, explores dimensions of common spaces, and connects rank to dimension."
prerequisites: 
  - basis/math/linear_algebra/linear_subspace
  - basis/math/linear_algebra/row_column_spaces
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-19
---

When you choose a basis for a subspace, you have many options — there are infinitely many valid bases for most spaces. But no matter which basis you pick, you always count the same number of vectors. This invariant is the **dimension**, and it is the most fundamental numerical property of a vector space. The entire theory of rank and the rank-nullity theorem rest on this single fact.

## Finite-dimensional spaces

A vector space $V$ is **finite-dimensional** if there exists a finite set of vectors that spans $V$. All of $F^n$, all matrix spaces $M_{m,n}(F)$, and every subspace of a finite-dimensional space are finite-dimensional. A space with no finite spanning set — such as the space of all polynomials over $F$ — is **infinite-dimensional**.

This checkpoint focuses entirely on finite-dimensional spaces.

## All bases have the same size

[Linear Subspace](../linear_subspace/) introduced bases and stated without proof that all bases of a space have equal size. Here is why that is true.

**Lemma (replacement)**: If $\{v_1, \ldots, v_n\}$ spans $V$ and $\{u_1, \ldots, u_m\}$ is linearly independent in $V$, then $m \le n$.

*Proof sketch*: You can replace vectors in the spanning set one at a time with vectors from the independent set while maintaining a spanning set at each step. After at most $n$ replacements, the spanning set is exhausted. Because the $u_i$ are independent, none can be "used up" before all $n$ replacement slots are filled — so $m \le n$. $\square$

**Theorem**: Any two bases of a finite-dimensional vector space $V$ have the same number of elements.

*Proof*: Let $\mathcal{B} = \{b_1, \ldots, b_n\}$ and $\mathcal{C} = \{c_1, \ldots, c_m\}$ be two bases of $V$. Since $\mathcal{B}$ spans $V$ and $\mathcal{C}$ is linearly independent, the lemma gives $m \le n$. Since $\mathcal{C}$ spans $V$ and $\mathcal{B}$ is linearly independent, the same argument gives $n \le m$. Therefore $m = n$. $\square$

## Definition of dimension

Because every basis has the same size, the following is well-defined:

The **dimension** of a finite-dimensional vector space $V$, written $\dim V$ (or $\dim_F V$ to emphasize the field), is the number of vectors in any basis of $V$.

By convention, the trivial space has $\dim\{\mathbf{0}\} = 0$, taking the empty set as its basis.

## Dimensions of common spaces

| Space | Standard basis | Dimension |
|---|---|---|
| $F^n$ | Standard unit vectors $e_1, \ldots, e_n$ | $n$ |
| $M_{m,n}(F)$ | Matrices $E_{ij}$ (one $1$, rest $0$s) | $mn$ |
| $F[x]_{\le d}$ (polynomials of degree $\le d$) | $1, x, x^2, \ldots, x^d$ | $d+1$ |
| $\{\mathbf{0}\}$ | $\emptyset$ | $0$ |

The dimension tells you how many independent parameters are needed to describe every element of the space: an element of $F^n$ needs $n$ coordinates, a polynomial of degree $\le d$ needs $d+1$ coefficients, and so on.

## Dimension and subspaces

Let $W$ be a subspace of a finite-dimensional space $V$. Then $W$ is also finite-dimensional, and:

1. $\dim W \le \dim V$.
2. $\dim W = \dim V$ if and only if $W = V$.

Point 2 gives a useful shortcut: to prove that a subspace $W$ equals all of $V$, it suffices to find $\dim V$ linearly independent vectors inside $W$. If $W$ contains a linearly independent set of the right size, it must be all of $V$.

### Extending and reducing bases

Two practical facts follow from the replacement lemma:

- Any **linearly independent** set in $V$ can be extended to a basis of $V$ (by adding vectors one at a time).
- Any **spanning** set of $V$ can be reduced to a basis of $V$ (by removing redundant vectors one at a time).

Together these say: a basis is both a minimal spanning set and a maximal linearly independent set inside $V$.

## Rank as a dimension

The **rank** of a matrix $A$, introduced in [Row and Column Spaces](../row_column_spaces/), is exactly a dimension:

$$\text{rank}(A) = \dim(\text{row}(A)) = \dim(\text{col}(A)).$$

The **nullity** of $A$ is the dimension of its kernel — the solution set of the homogeneous system $Ax = \mathbf{0}$:

$$\text{nullity}(A) = \dim(\ker(A)).$$

For an $m \times n$ matrix $A$, these two quantities are related by the [Rank-Nullity Theorem](../rank_nullity_theorem/):

$$\text{rank}(A) + \text{nullity}(A) = n. \tag{1}$$

Every column of $A$ is either a pivot column (contributing $1$ to the rank) or a free column (contributing $1$ to the nullity). The $n$ columns are partitioned between the two, with no column counted twice and no column left out.

## Summary

- A vector space is **finite-dimensional** if it has a finite spanning set.
- **All bases of a finite-dimensional space have the same number of elements** — this follows from the replacement lemma applied in both directions.
- The **dimension** $\dim V$ is this common basis size: $\dim F^n = n$, $\dim M_{m,n}(F) = mn$, $\dim\{\mathbf{0}\} = 0$.
- For a subspace $W \subseteq V$: $\dim W \le \dim V$, with equality if and only if $W = V$.
- Any linearly independent set in $V$ extends to a basis; any spanning set of $V$ reduces to a basis.
- **Rank** and **nullity** are dimensions: $\text{rank}(A) = \dim(\text{col}(A)) = \dim(\text{row}(A))$ and $\text{nullity}(A) = \dim(\ker(A))$, with $\text{rank}(A) + \text{nullity}(A) = n$.
