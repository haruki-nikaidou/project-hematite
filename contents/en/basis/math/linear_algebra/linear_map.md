---
title: Linear Map & Matrix Multiplication
summary: "Defines linear maps as structure-preserving functions between vector spaces, shows how every linear map is represented by a matrix, and explains why matrix multiplication is exactly the composition of linear maps."
prerequisites: 
  - basis/math/linear_algebra/matrix
  - elementry/math/linear
  - elementry/math/semigroup_monoid
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

A matrix is not just a grid of numbers to be stored and retrieved — it encodes a function between vector spaces. Understanding this connection is the heart of linear algebra: every question about matrices is really a question about structure-preserving functions, and every such function can be captured by a matrix.

## Linear maps

A **linear map** (also called a **linear transformation**) is a function $T: V \to W$ between vector spaces over a field $F$ that respects the vector space operations. Precisely, $T$ is linear if for all $u, v \in V$ and all $c \in F$:

1. $T(u + v) = T(u) + T(v)$ &ensp;(**additivity**)
2. $T(cu) = c \cdot T(u)$ &ensp;(**homogeneity**)

These two conditions together are called **linearity**. They can be combined into the single equivalent condition: for all $u, v \in V$ and all $c, d \in F$,

$$T(cu + dv) = c\,T(u) + d\,T(v).$$

In other words, $T$ preserves linear combinations. A map that satisfies linearity "plays nicely" with the structure of the vector spaces on both sides.

### Immediate consequences

Two important properties follow at once from linearity:

- $T(\mathbf{0}_V) = \mathbf{0}_W$. (Set $c = 0$ in homogeneity.)
- $T(-v) = -T(v)$. (Apply homogeneity with $c = -1$.)

A linear map must always send the zero vector to the zero vector; if you find a function $T$ with $T(\mathbf{0}) \ne \mathbf{0}$, it is not linear.

### Examples

- **Scaling**: $T: \mathbb{R} \to \mathbb{R}$, $T(x) = cx$ for a fixed constant $c$ — scaling by $c$ is linear.
- **Rotation in $\mathbb{R}^2$**: rotating every vector by a fixed angle $\theta$ is a linear map on $\mathbb{R}^2$.
- **Projection**: $T: \mathbb{R}^3 \to \mathbb{R}^3$ defined by $T(x, y, z) = (x, y, 0)$ is linear — it projects onto the $xy$-plane.
- **The zero map**: $T(v) = \mathbf{0}$ for all $v$ is trivially linear.

## Representing a linear map by a matrix

Fix a basis $\mathcal{B} = \{e_1, \ldots, e_n\}$ of $V$ and a basis $\mathcal{C} = \{f_1, \ldots, f_m\}$ of $W$. Because $T$ is linear, the entire map is determined by where it sends the basis vectors. Every $v \in V$ can be written uniquely as $v = \sum_{j=1}^n x_j e_j$, and then

$$T(v) = \sum_{j=1}^n x_j\, T(e_j).$$

So knowing $T(e_1), \ldots, T(e_n)$ is enough to know $T$ on all of $V$. Write each image $T(e_j)$ in coordinates with respect to the basis of $W$:

$$T(e_j) = \sum_{i=1}^m a_{ij}\, f_i.$$

The **matrix of $T$** (with respect to $\mathcal{B}$ and $\mathcal{C}$) is the $m \times n$ matrix $A$ whose $j$-th column is the coordinate vector of $T(e_j)$. The entry $a_{ij}$ sits in row $i$, column $j$.

### Matrices as linear maps

Conversely, every $m \times n$ matrix $A$ over $F$ defines a linear map $T_A: F^n \to F^m$ by

$$T_A(x) \coloneqq Ax, \quad x \in F^n,$$

where $x$ is treated as a column vector. The $i$-th entry of $Ax$ is $\sum_{j=1}^n a_{ij} x_j$ — the dot product of the $i$-th row of $A$ with $x$. You can verify that $T_A$ satisfies linearity directly from this formula.

## Matrix multiplication as composition

Suppose you have two linear maps:

$$T: U \to V \quad \text{with matrix } A, \qquad S: V \to W \quad \text{with matrix } B.$$

Their **composition** $S \circ T: U \to W$ is also a linear map. What is its matrix?

If $A$ is $n \times p$ (so $T: F^p \to F^n$) and $B$ is $m \times n$ (so $S: F^n \to F^m$), then the matrix of $S \circ T$ is the $m \times p$ matrix $BA$, where

$$(BA)_{ij} \coloneqq \sum_{k=1}^{n} b_{ik}\, a_{kj}. \tag{1}$$

This is the definition of **matrix multiplication**. You compute the $(i,j)$ entry of $BA$ by taking the dot product of the $i$-th row of $B$ with the $j$-th column of $A$. Notice the order: the matrix of $S \circ T$ is $BA$, not $AB$ — the rightmost matrix corresponds to the map applied first.

For this product to be defined, the number of columns of $B$ must equal the number of rows of $A$ (both equal $n$ above, the dimension of the intermediate space $V$).

### Non-commutativity

Matrix multiplication is **not commutative** in general: even when both products $AB$ and $BA$ are defined and have the same shape (which requires $A$ and $B$ to both be square of the same size), you typically have $AB \ne BA$. This reflects the fact that performing two transformations in different orders usually gives different results.

### Associativity

Matrix multiplication is **associative**: $(AB)C = A(BC)$ whenever the dimensions are compatible. This follows from the associativity of function composition: $(S \circ T) \circ U = S \circ (T \circ U)$.

## The vector space of linear maps

The set of all linear maps from $V$ to $W$, written $\mathcal{L}(V, W)$, is itself a vector space. You define addition and scalar multiplication pointwise:

- $(S + T)(v) \coloneqq S(v) + T(v)$
- $(cT)(v) \coloneqq c\,T(v)$

Both operations produce linear maps, and all vector space axioms hold. Under the correspondence between linear maps and matrices (once bases are fixed), $\mathcal{L}(V, W)$ is isomorphic to $M_{m,n}(F)$.

## Summary

- A **linear map** $T: V \to W$ satisfies $T(cu + dv) = cT(u) + dT(v)$ for all vectors and scalars.
- It always sends $\mathbf{0}_V$ to $\mathbf{0}_W$, and its behavior is entirely determined by where it sends a basis.
- Every linear map between finite-dimensional spaces has a **matrix representation**: the columns are the images of basis vectors expressed in coordinates.
- Conversely, every matrix $A$ defines a linear map via $x \mapsto Ax$.
- **Matrix multiplication** $(BA)_{ij} = \sum_k b_{ik} a_{kj}$ corresponds exactly to the **composition** of linear maps — apply $A$ first, then $B$.
- Matrix multiplication is associative but **not commutative** in general.
- $\mathcal{L}(V, W)$ is a vector space under pointwise operations, isomorphic to $M_{m,n}(F)$.
