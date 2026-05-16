---
title: Linearly Dependent
summary: "Defines linear dependence and independence for a set of vectors, explains what it means geometrically for vectors to carry redundant information, and connects independence to the uniqueness of solutions of a homogeneous system."
prerequisites: 
  - basis/math/linear_algebra/linear_equations
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

If you have a collection of vectors, how do you know whether any of them is "redundant" — expressible as a combination of the others? Linear dependence gives you the precise language to answer this question, and it turns out the answer is always equivalent to solving a homogeneous linear system.

## Linear combinations

A **linear combination** of vectors $v_1, \ldots, v_k \in V$ over a field $F$ is any expression of the form

$$c_1 v_1 + c_2 v_2 + \cdots + c_k v_k, \qquad c_1, \ldots, c_k \in F.$$

The scalars $c_1, \ldots, c_k$ are called the **coefficients** of the combination. Linear combinations are the building blocks of everything in linear algebra — every span, every subspace, every matrix-vector product is ultimately a linear combination in disguise.

## Linear dependence and independence

The set $\{v_1, \ldots, v_k\} \subseteq V$ is **linearly dependent** if there exist scalars $c_1, \ldots, c_k \in F$, **not all zero**, such that

$$c_1 v_1 + c_2 v_2 + \cdots + c_k v_k = \mathbf{0}. \tag{1}$$

Equation (1) with at least one $c_i \ne 0$ is called a **nontrivial linear relation** among the vectors.

Conversely, the set is **linearly independent** if the only solution to (1) is the **trivial relation** $c_1 = c_2 = \cdots = c_k = 0$. Equivalently, no vector in the set can be written as a linear combination of the others — each one carries genuinely new information.

The empty set $\emptyset$ is linearly independent by convention.

## Connection to homogeneous linear systems

Form the matrix $A = [v_1 \mid v_2 \mid \cdots \mid v_k]$ whose columns are the vectors (written as column vectors in some basis). Then the equation (1) is exactly the homogeneous system $Ax = \mathbf{0}$ where $x = (c_1, \ldots, c_k)^\top$.

This gives a direct computational criterion:

$$\{v_1, \ldots, v_k\} \text{ is linearly dependent} \iff Ax = \mathbf{0} \text{ has a nontrivial solution} \iff \text{RREF}(A) \text{ has at least one free column}.$$

To check whether a set of vectors is linearly independent, apply [Gauss-Jordan elimination](../gauss_jordan_elimination/) to the matrix of columns. If you get a free variable, the set is dependent; if every column is a pivot column, the set is independent.

## Geometric intuition

In $\mathbb{R}^2$:
- Two nonzero vectors are **linearly dependent** if and only if one is a scalar multiple of the other — they are **collinear** (pointing along the same line through the origin).
- Two vectors are **linearly independent** if and only if they are not collinear, i.e., they point in genuinely different directions and together span all of $\mathbb{R}^2$.

In $\mathbb{R}^3$:
- Three vectors are **linearly dependent** if and only if they are all **coplanar** (they all lie in some common plane through the origin). In this case, one of them is a linear combination of the other two.
- Three vectors are **linearly independent** if and only if they span all of $\mathbb{R}^3$ — they point in three genuinely different directions.

## Special cases

**Any set containing $\mathbf{0}$ is linearly dependent.** If $v_1 = \mathbf{0}$, take $c_1 = 1$ and all other coefficients zero: $1 \cdot \mathbf{0} + 0 \cdot v_2 + \cdots + 0 \cdot v_k = \mathbf{0}$. This is a nontrivial relation. Intuitively, the zero vector carries no directional information.

**A single nonzero vector is always linearly independent.** The equation $c_1 v_1 = \mathbf{0}$ with $v_1 \ne \mathbf{0}$ forces $c_1 = 0$ in any field.

**More vectors than the dimension of the space.** If you have more than $\dim V$ vectors in $V$, they are automatically linearly dependent — there are not enough "independent directions" to accommodate all of them.

## Why it matters

Linear independence is a prerequisite for the notion of a **basis**: a linearly independent spanning set. If a spanning set has redundant vectors (i.e., some are linearly dependent on the rest), you can remove those redundant ones without losing any of the span. The minimal spanning sets — and the maximal independent sets — are exactly the bases, which are developed in [Linear Subspace](../linear_subspace/).

## Summary

- A **linear combination** is a sum $c_1 v_1 + \cdots + c_k v_k$ with arbitrary scalar coefficients.
- $\{v_1, \ldots, v_k\}$ is **linearly dependent** if a nontrivial linear combination equals $\mathbf{0}$; it is **linearly independent** if only the trivial combination equals $\mathbf{0}$.
- Dependence is equivalent to the homogeneous system $Ax = \mathbf{0}$ (with columns $v_i$) having a nontrivial solution, which happens exactly when the RREF of $A$ has a free column.
- Geometrically: dependent vectors are collinear (in $\mathbb{R}^2$) or coplanar (in $\mathbb{R}^3$).
- Any set containing $\mathbf{0}$ is dependent; a single nonzero vector is always independent.
