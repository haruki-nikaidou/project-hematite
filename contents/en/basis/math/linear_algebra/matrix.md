---
title: Matrix
summary: "Introduces matrices as rectangular arrays that represent collections of vectors, covers their basic operations, and shows how the set of all m×n matrices itself forms a vector space."
prerequisites: 
  - elementry/math/vector_space
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

Whenever you need to store, transform, or transmit structured data — a grayscale image, a system of prices, the forces acting on a structure — you are almost certainly using a matrix. Matrices are the computational workhorse of linear algebra: they make abstract ideas concrete and give you something you can actually calculate with.

## What is a matrix?

An **$m \times n$ matrix** over a field $F$ is a rectangular array with $m$ rows and $n$ columns whose entries come from $F$. You write it as:

$$
A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix}
$$

The entry in row $i$ and column $j$ is called $a_{ij}$, or equivalently $(A)_{ij}$. The pair $(m, n)$ is the **shape** (or **dimensions**) of the matrix. When $m = n$ the matrix is called a **square matrix** of **order** $n$.

Two matrices are equal if and only if they have the same shape and every corresponding entry is equal.

### Special cases: vectors as matrices

A **column vector** is an $m \times 1$ matrix — a single column of $m$ entries. A **row vector** is a $1 \times n$ matrix — a single row of $n$ entries. You have already seen column vectors as elements of $F^m$ in the prerequisite on [vector spaces](../../../../../elementry/math/vector_space/); a matrix is just a side-by-side arrangement of several such columns (or, if you prefer, a stacked arrangement of several rows).

## Adding matrices and scaling them

**Matrix addition** is defined entry-wise. If $A$ and $B$ are both $m \times n$ matrices then their sum $A + B$ is the $m \times n$ matrix with

$$(A + B)_{ij} = a_{ij} + b_{ij}.$$

You simply add corresponding entries. If $A$ and $B$ have different shapes, their sum is not defined.

**Scalar multiplication** by $c \in F$ scales every entry:

$$(cA)_{ij} = c \cdot a_{ij}.$$

These two operations are exactly the pointwise operations you would perform on the individual entries, extended to the whole array simultaneously.

## The vector space of matrices

Because addition and scalar multiplication act entry-by-entry, the set of all $m \times n$ matrices over $F$ — written $M_{m,n}(F)$ — inherits the full structure of a vector space. The **zero matrix** $O$ (all entries equal to zero) plays the role of the zero vector, and every axiom (associativity, distributivity, etc.) follows immediately from the corresponding axiom in $F$.

This means you can do everything to matrices that you can do to vectors: take linear combinations, talk about linear independence, span, and bases. In fact, the $mn$ matrices $E_{ij}$ that have a $1$ in position $(i,j)$ and zeros everywhere else form a basis of $M_{m,n}(F)$, so $\dim M_{m,n}(F) = mn$.

## The transpose

The **transpose** of a matrix $A \in M_{m,n}(F)$ is the matrix $A^\top \in M_{n,m}(F)$ whose $(i,j)$ entry is

$$(A^\top)_{ij} = a_{ji}.$$

In plain language: you flip the matrix across its main diagonal, turning rows into columns and columns into rows. For example:

$$
\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}^\top = \begin{pmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{pmatrix}.
$$

Transposition satisfies $(A^\top)^\top = A$ and $(A + B)^\top = A^\top + B^\top$. A square matrix with $A^\top = A$ is called **symmetric**.

## The identity matrix

The **identity matrix** $I_n$ is the square $n \times n$ matrix with $1$s on the main diagonal and $0$s everywhere else:

$$
I_n = \begin{pmatrix} 1 & 0 & \cdots & 0 \\ 0 & 1 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 1 \end{pmatrix}.
$$

Its entry at position $(i,j)$ is the **Kronecker delta** $\delta_{ij}$, which equals $1$ if $i = j$ and $0$ otherwise. When you multiply any conformable matrix by $I_n$, the matrix is unchanged — the identity matrix acts as the multiplicative identity for matrix multiplication, which is developed in [Linear Map](../linear_map/).

## Matrices as encodings of linear maps

A matrix is not just a storage format. As you will see in [Linear Map](../linear_map/), every matrix $A \in M_{m,n}(F)$ encodes a specific linear function from $F^n$ to $F^m$, and every linear function between finite-dimensional spaces can be written as a matrix once you fix bases. This connection is the reason matrices are so central to linear algebra.

## Summary

- An $m \times n$ **matrix** over $F$ is a rectangular array of entries $a_{ij} \in F$.
- **Column vectors** and **row vectors** are the special cases $m \times 1$ and $1 \times n$.
- **Matrix addition** and **scalar multiplication** work entry-wise; together they make $M_{m,n}(F)$ a vector space of dimension $mn$.
- The **transpose** $A^\top$ swaps rows and columns: $(A^\top)_{ij} = a_{ji}$.
- The **identity matrix** $I_n$ has $1$s on the diagonal and acts as a multiplicative identity.
- Matrices encode linear maps — the connection is made precise in [Linear Map](../linear_map/).
