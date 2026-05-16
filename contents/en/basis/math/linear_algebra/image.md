---
title: Image & Rank
summary: "Defines the image of a linear map as the set of all reachable output vectors, proves it is a subspace of the codomain, identifies it with the column space of a matrix, and introduces rank as its dimension."
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/linear_subspace
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

While the kernel captures what a linear map destroys — the inputs it sends to zero — the image captures what it creates: the full collection of outputs the map can possibly produce. Knowing the image tells you which target vectors are reachable, and its dimension, the rank, measures how much of the codomain the map actually fills.

## Definition

For a linear map $T: V \to W$, the **image** (also called the **range**) of $T$ is the set of all outputs that $T$ can produce:

$$\text{im}(T) \coloneqq \{T(v) : v \in V\} = \{w \in W : \exists\, v \in V \text{ such that } T(v) = w\}.$$

The image lives in the **codomain** $W$. A vector $w \in W$ belongs to $\text{im}(T)$ if and only if the equation $T(v) = w$ has at least one solution $v \in V$.

## The image is a subspace

**Claim**: $\text{im}(T)$ is a [linear subspace](../linear_subspace/) of $W$.

**Proof**: Since $T(\mathbf{0}_V) = \mathbf{0}_W$, we have $\mathbf{0}_W \in \text{im}(T)$. Take any $w_1, w_2 \in \text{im}(T)$ and any $c, d \in F$. There exist $v_1, v_2 \in V$ with $T(v_1) = w_1$ and $T(v_2) = w_2$. By linearity,

$$c w_1 + d w_2 = c\,T(v_1) + d\,T(v_2) = T(cv_1 + dv_2) \in \text{im}(T).$$

So $\text{im}(T)$ is closed under linear combinations, hence a subspace. $\square$

## The column space

For a matrix $A \in M_{m,n}(F)$, write $A = [a_1 \mid a_2 \mid \cdots \mid a_n]$ where $a_j \in F^m$ are the columns of $A$. The image of the corresponding map $T_A(x) = Ax$ is

$$\text{im}(A) = \{Ax : x \in F^n\}.$$

Every product $Ax$ is a linear combination of the columns of $A$:

$$Ax = x_1\,a_1 + x_2\,a_2 + \cdots + x_n\,a_n.$$

So the image of $A$ is exactly the span of its columns. This subspace of $F^m$ is called the **column space** of $A$, often written $\text{col}(A)$:

$$\text{col}(A) = \text{span}(a_1, a_2, \ldots, a_n).$$

A vector $b \in F^m$ belongs to $\text{col}(A)$ if and only if the system $Ax = b$ has at least one solution — which is precisely the consistency condition discussed in [Linear Equations](../linear_equations/).

## Surjectivity

The map $T: V \to W$ is **surjective** (onto) if and only if $\text{im}(T) = W$ — every vector in $W$ is reachable. For a matrix $A \in M_{m,n}(F)$, surjectivity means the column space fills all of $F^m$, which happens exactly when the RREF of $A$ has a pivot in every row.

## Rank

The **rank** of a linear map $T$ is the dimension of its image:

$$\text{rank}(T) \coloneqq \dim(\text{im}(T)).$$

For a matrix, $\text{rank}(A)$ equals the number of pivot rows in the RREF of $A$, which is also the number of linearly independent columns of $A$.

An important theorem (whose proof uses the RREF argument) states that the rank of a matrix equals both the dimension of its **column space** and the dimension of its **row space** (the span of its rows). In symbols: the number of linearly independent columns always equals the number of linearly independent rows.

## Computing the image and rank

To find $\text{im}(A)$ and $\text{rank}(A)$, apply [Gauss-Jordan elimination](../gauss_jordan_elimination/) to $A$:

1. Reduce $A$ to RREF.
2. Count the pivots — this number is $\text{rank}(A)$.
3. The **pivot columns** of $A$ (the original columns, before row reduction, whose positions correspond to pivot positions in the RREF) form a basis for $\text{col}(A)$.

**Important**: use the pivot columns from the **original** matrix $A$, not from the RREF, because row operations change the column vectors but preserve which columns are pivot columns.

### Worked example

Let

$$A = \begin{pmatrix} 1 & 2 & 1 \\ 2 & 4 & 3 \\ 1 & 2 & 2 \end{pmatrix}.$$

Apply Gauss-Jordan. $R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - R_1$:

$$\begin{pmatrix} 1 & 2 & 1 \\ 0 & 0 & 1 \\ 0 & 0 & 1 \end{pmatrix}.$$

$R_3 \leftarrow R_3 - R_2$:

$$\begin{pmatrix} 1 & 2 & 1 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

$R_1 \leftarrow R_1 - R_2$ (backward sweep):

$$\begin{pmatrix} 1 & 2 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

This is RREF. There are **2 pivots** (columns 1 and 3), so $\text{rank}(A) = 2$. The first and third columns of the **original** $A$ form a basis for $\text{col}(A)$:

$$\text{col}(A) = \text{span}\!\left\{ \begin{pmatrix}1\\2\\1\end{pmatrix},\ \begin{pmatrix}1\\3\\2\end{pmatrix} \right\}.$$

## Summary

- The **image** $\text{im}(T) = \{T(v) : v \in V\}$ is always a subspace of the codomain $W$.
- For a matrix $A$, the image equals the **column space** $\text{col}(A) = \text{span}(a_1, \ldots, a_n)$, and $Ax = b$ is consistent if and only if $b \in \text{col}(A)$.
- $T$ is **surjective** if and only if $\text{im}(T) = W$ (every output is reachable).
- The **rank** $\text{rank}(T) = \dim(\text{im}(T))$ equals the number of pivots in the RREF of $A$.
- Pivot columns of the **original** matrix form a basis for the column space.
- The rank equals the dimension of both the column space and the row space.
