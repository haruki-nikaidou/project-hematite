---
title: Invertible Matrix
summary: "Defines invertible matrices as those whose linear transformation can be undone, characterizes invertibility through Gauss-Jordan elimination, and shows how to compute the inverse by augmenting with the identity."
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/gauss_jordan_elimination
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-19
---

The linear map $T_A$ encoded by a matrix $A$ transforms every vector $x$ into $Ax$. Can you always get back? An **invertible matrix** is exactly one where the answer is yes — the transformation can be perfectly undone.

## Definition

Let $A$ be an $n \times n$ square matrix over a field $F$. $A$ is **invertible** (also called *non-singular*) if there exists an $n \times n$ matrix $B$ such that

$$
AB = I_n \qquad \text{and} \qquad BA = I_n, \tag{1}
$$

where $I_n$ is the $n \times n$ identity matrix. The matrix $B$ is called the **inverse** of $A$ and is written $A^{-1}$.

A matrix that is not invertible is called **singular**.

Only square matrices can be invertible: a non-square $m \times n$ matrix with $m \ne n$ represents a map between spaces of different dimensions and cannot have a two-sided inverse of the same type.

## The inverse is unique

Suppose both $B$ and $C$ satisfy (1). Then:

$$
B = B I_n = B(AC) = (BA)C = I_n C = C.
$$

So $B = C$ — every invertible matrix has exactly one inverse. The notation $A^{-1}$ is unambiguous.

## Invertibility and linear maps

From [Linear Map & Matrix Multiplication](../linear_map/), you know that an $n \times n$ matrix $A$ represents a linear map $T_A: F^n \to F^n$. The conditions $AB = BA = I_n$ say that $T_B$ is both a left and right inverse of $T_A$ as a function. Therefore:

> $A$ is invertible if and only if $T_A: F^n \to F^n$ is a bijection.

When $T_A$ is bijective, its inverse function $T_A^{-1}$ is also linear, and its matrix is $A^{-1}$.

## Characterizing invertibility via Gauss-Jordan

From [Gauss-Jordan Elimination](../gauss_jordan_elimination/), you know that row-reducing a matrix either produces $n$ pivot columns (one per column) or leaves at least one free column. For a square $n \times n$ matrix, these two outcomes are mutually exclusive and exhaustive — there is no middle ground. This gives a complete characterization:

The following statements are all equivalent for an $n \times n$ matrix $A$ over $F$:

1. $A$ is invertible.
2. The RREF of $A$ is $I_n$.
3. $A$ has $n$ pivot columns.
4. The only solution to $Ax = \mathbf{0}$ is $x = \mathbf{0}$.
5. For every $b \in F^n$, the system $Ax = b$ has exactly one solution.
6. The columns of $A$ are linearly independent.

**Singular example.** For $B = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$: applying $R_2 \leftarrow R_2 - 2R_1$ gives $\begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix}$. The second column has no pivot, so $B$ is singular. The map $T_B$ collapses the entire plane onto a line — you cannot get back.

## Computing the inverse via Gauss-Jordan elimination

If $A$ is invertible, you can compute $A^{-1}$ by augmenting $A$ with the identity matrix and row-reducing the entire block:

$$
[A \mid I_n] \xrightarrow{\text{RREF}} [I_n \mid A^{-1}]. \tag{2}
$$

**Why this works.** Every elementary row operation is left-multiplication by an invertible elementary matrix. If the sequence of operations that reduces $A$ to $I_n$ corresponds to left-multiplication by $E$, then $EA = I_n$, so $E = A^{-1}$. Applying those same operations to $I_n$ gives $E I_n = E = A^{-1}$.

If the row reduction reaches a zero row on the left side, $A$ is singular and has no inverse.

**Example.** Compute $A^{-1}$ for $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$:

$$
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 3 & 4 & 0 & 1 \end{array}\right)
\xrightarrow{R_2 \leftarrow R_2 - 3R_1}
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & -2 & -3 & 1 \end{array}\right)
$$

$$
\xrightarrow{R_2 \leftarrow -\frac{1}{2}R_2}
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & 1 & \tfrac{3}{2} & -\tfrac{1}{2} \end{array}\right)
\xrightarrow{R_1 \leftarrow R_1 - 2R_2}
\left(\begin{array}{cc|cc} 1 & 0 & -2 & 1 \\ 0 & 1 & \tfrac{3}{2} & -\tfrac{1}{2} \end{array}\right)
$$

So $A^{-1} = \begin{pmatrix} -2 & 1 \\ \tfrac{3}{2} & -\tfrac{1}{2} \end{pmatrix}$. Verify: $AA^{-1} = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\begin{pmatrix} -2 & 1 \\ \tfrac{3}{2} & -\tfrac{1}{2} \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.

### The 2×2 shortcut

For $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ over $\mathbb{R}$, the formula simplifies to:

$$
A^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}, \tag{3}
$$

provided $ad - bc \ne 0$. The quantity $ad - bc$ is the **determinant** $\det(A)$; it is nonzero exactly when $A$ is invertible. For $3 \times 3$ and larger matrices, Gauss-Jordan is the systematic approach (see [Determinant](../determinant/) for the general story).

## Properties of the inverse

The following identities all follow directly from the definition $AA^{-1} = A^{-1}A = I_n$:

| Identity | Explanation |
|---|---|
| $(A^{-1})^{-1} = A$ | $A$ inverts $A^{-1}$ |
| $(AB)^{-1} = B^{-1}A^{-1}$ | Undoing composition reverses order |
| $(A^T)^{-1} = (A^{-1})^T$ | Transpose and inverse commute |
| $(cA)^{-1} = c^{-1}A^{-1}$ for $c \ne 0$ | Scaling inverts by the reciprocal |

The product rule $(AB)^{-1} = B^{-1}A^{-1}$ mirrors everyday reversibility: if you put on socks then shoes, undoing requires removing shoes first, then socks.

## Summary

- An $n \times n$ matrix $A$ is **invertible** if there exists $B$ with $AB = BA = I_n$; this $B$ is unique and written $A^{-1}$.
- Invertibility is equivalent to: the RREF of $A$ is $I_n$; $A$ has $n$ pivot columns; $Ax = \mathbf{0}$ has only the trivial solution; $Ax = b$ has a unique solution for every $b$.
- Compute $A^{-1}$ using Gauss-Jordan: row-reduce $[A \mid I_n]$ to $[I_n \mid A^{-1}]$.
- Key identities: $(A^{-1})^{-1} = A$, $(AB)^{-1} = B^{-1}A^{-1}$, $(A^T)^{-1} = (A^{-1})^T$.
- For $2 \times 2$ matrices: $A^{-1} = \frac{1}{\det(A)}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$ when $\det(A) = ad - bc \ne 0$.
