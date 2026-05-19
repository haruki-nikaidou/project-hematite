---
title: Row and Column Spaces
summary: "Defines the row space and column space of a matrix as spans of its rows and columns, shows how row reduction gives bases for both, proves that their dimensions always agree, and introduces rank as this common value."
prerequisites: 
  - basis/math/linear_algebra/matrix
  - basis/math/linear_algebra/linear_span
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-19
---

Every matrix stores two natural families of vectors: its rows and its columns. The span of the rows and the span of the columns are both important subspaces, and they encode which linear systems are solvable and how much "reach" the matrix has. The surprising fact — not obvious at first glance — is that these two spans, living in completely different spaces, always have the same dimension.

## Row space and column space

For an $m \times n$ matrix $A$ over a field $F$, write $r_1, \ldots, r_m \in F^n$ for its row vectors and $c_1, \ldots, c_n \in F^m$ for its column vectors.

- The **row space** of $A$ is $\text{row}(A) \coloneqq \text{span}(r_1, \ldots, r_m) \subseteq F^n$.
- The **column space** of $A$ is $\text{col}(A) \coloneqq \text{span}(c_1, \ldots, c_n) \subseteq F^m$.

Both are [linear subspaces](../linear_subspace/) of their respective ambient spaces, because the span of any set of vectors is always a subspace. Note the different homes: the row space lives in $F^n$ (as many coordinates as columns), while the column space lives in $F^m$ (as many coordinates as rows).

## What the column space tells you

The product $Ax$ is a linear combination of the columns of $A$:

$$Ax = x_1\,c_1 + x_2\,c_2 + \cdots + x_n\,c_n.$$

So as $x$ ranges over all of $F^n$, $Ax$ ranges over all of $\text{col}(A)$. This gives a clean solvability criterion:

$$Ax = b \text{ has a solution} \iff b \in \text{col}(A).$$

If $b$ is outside the column space, the system is inconsistent — no combination of the columns can produce $b$.

## Row operations preserve the row space

The key tool for computing with row and column spaces is Gauss-Jordan elimination. Here is how it interacts with each space.

Every elementary row operation (swap two rows; multiply a row by a nonzero scalar; add a multiple of one row to another) replaces the set of rows with a new set whose spans are identical. Why? Because each operation is invertible and produces rows that are linear combinations of the old rows — and the old rows are recoverable as linear combinations of the new ones. Since the span only depends on what linear combinations are achievable, the span does not change.

**Consequence**: The row space is invariant under row operations. In particular, the nonzero rows of the reduced row echelon form (RREF) of $A$ form a basis for $\text{row}(A)$ — they span the same space and are clearly linearly independent (each has a leading 1 in a column where all other nonzero rows have 0).

## Row operations do not preserve the column space

Row operations do change the column vectors. Adding $c$ times row $i$ to row $j$ changes all entries in row $j$, which changes every column simultaneously. So you cannot read off a basis for $\text{col}(A)$ from the RREF columns.

What row operations do preserve is the **linear dependence relations** among columns: if a column is a linear combination of others before reduction, the same relation holds after, and vice versa. This means the **positions** of pivot columns are reliable — the pivot columns of $A$ are a basis for $\text{col}(A)$ — but you must take those columns from the **original** matrix $A$, not from the RREF.

## Worked example

Find bases for the row space and column space of

$$A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 1 & 2 \end{pmatrix}.$$

Apply Gauss-Jordan elimination. $R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - R_1$:

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & -1 & -1 \end{pmatrix}.$$

Swap $R_2$ and $R_3$, then $R_2 \leftarrow -R_2$:

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

Back-substitute: $R_1 \leftarrow R_1 - 2R_2$:

$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

**Row space**: The nonzero rows of the RREF are $(1, 0, 1)$ and $(0, 1, 1)$. These form a basis for $\text{row}(A) \subseteq F^3$.

**Column space**: Pivot columns are columns 1 and 2 (where the leading 1s appear). Take those columns from the **original** $A$:

$$\text{col}(A) = \text{span}\!\left\{\begin{pmatrix}1\\2\\1\end{pmatrix},\ \begin{pmatrix}2\\4\\1\end{pmatrix}\right\} \subseteq F^3.$$

## Row rank equals column rank

In the example, both the row space and the column space have dimension 2. This is not a coincidence.

**Theorem**: $\dim(\text{row}(A)) = \dim(\text{col}(A))$ for any matrix $A$.

**Proof**: In the RREF of $A$, every pivot corresponds to a nonzero row (contributing to the row space) and a pivot column (contributing to the column space). The number of pivots is the same count in both cases. Since the nonzero rows of the RREF are a basis for $\text{row}(A)$ and the pivot columns of $A$ are a basis for $\text{col}(A)$, both dimensions equal the number of pivots. $\square$

## Rank

This common dimension is the **rank** of $A$:

$$\text{rank}(A) \coloneqq \dim(\text{row}(A)) = \dim(\text{col}(A)) = \text{(number of pivots in the RREF of } A). \tag{1}$$

The rank measures how much of the matrix is genuinely independent — how many linearly independent rows (equivalently, columns) $A$ has. For an $m \times n$ matrix, $\text{rank}(A) \le \min(m, n)$, since neither the row space (dimension $\le m$) nor the column space (dimension $\le n$) can exceed its ambient space.

The relationship between rank, nullity, and the structure of solutions is made precise in the [Rank-Nullity Theorem](../rank_nullity_theorem/).

## Summary

- The **row space** $\text{row}(A) = \text{span}(r_1, \ldots, r_m) \subseteq F^n$ and the **column space** $\text{col}(A) = \text{span}(c_1, \ldots, c_n) \subseteq F^m$ are both linear subspaces.
- The system $Ax = b$ is consistent if and only if $b \in \text{col}(A)$.
- Row operations **preserve the row space**: a basis is given by the nonzero rows of the RREF.
- Row operations **do not preserve the column space**: a basis uses the pivot columns of the **original** matrix $A$.
- **Row rank equals column rank**: $\dim(\text{row}(A)) = \dim(\text{col}(A))$.
- The **rank** $\text{rank}(A)$ is this common value, equal to the number of pivots in the RREF.
