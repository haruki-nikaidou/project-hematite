---
title: Properties of Determinant
summary: "Develops the key properties of the determinant: Laplace expansion along any row or column, how row operations change det, the transpose identity, multiplicativity, the adjugate-based inverse formula, and Cramer's rule."
prerequisites: 
  - basis/math/linear_algebra/determinant
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-19
---

The [determinant](../determinant/) was defined via expansion along the first row. That definition is logically complete but computationally expensive — expanding an $n \times n$ matrix naively requires $n!$ multiplications. This article develops the properties that make determinants tractable: expansion along any row or column, the way row operations interact with det, and the identity $\det(AB) = \det(A)\det(B)$. It ends with two classical applications: the adjugate-based inverse formula and Cramer's rule.

## Laplace expansion along any row or column

The definition in [Determinant](../determinant/) expanded along row 1. The same value emerges from any row or column.

**Theorem (Laplace expansion)**: For any $i \in \{1, \ldots, n\}$,

$$\det(A) = \sum_{j=1}^{n} (-1)^{i+j}\, a_{ij}\, \det(A_{ij}), \tag{1}$$

and for any $j \in \{1, \ldots, n\}$,

$$\det(A) = \sum_{i=1}^{n} (-1)^{i+j}\, a_{ij}\, \det(A_{ij}). \tag{2}$$

Here $A_{ij}$ is the $(n-1) \times (n-1)$ minor obtained by deleting row $i$ and column $j$, and $C_{ij} \coloneqq (-1)^{i+j} \det(A_{ij})$ is the **$(i,j)$ cofactor**.

In practice: expand along the row or column with the most zeros — each zero term contributes nothing and shrinks the work significantly.

### Worked example

$$A = \begin{pmatrix} 0 & 1 & 0 \\ 2 & 3 & 4 \\ 5 & 6 & 7 \end{pmatrix}.$$

Expanding along row 1, only the $a_{12} = 1$ term is nonzero:

$$\det(A) = (-1)^{1+2} \cdot 1 \cdot \det\!\begin{pmatrix}2 & 4 \\ 5 & 7\end{pmatrix} = -1 \cdot (14 - 20) = 6.$$

## Transpose

$$\det(A^\top) = \det(A). \tag{3}$$

Because the determinant is unchanged by transposition, any statement about rows holds equally for columns. In particular, column-expansion (equation (2)) follows from row-expansion (equation (1)) applied to $A^\top$, and every row-operation rule below has an exact column analogue.

## The effect of row operations on det

Row operations — the building blocks of [Gauss-Jordan elimination](../gauss_jordan_elimination/) — interact with the determinant in a clean way:

| Row operation | Effect on $\det(A)$ |
|---|---|
| Swap two rows | Multiplies $\det$ by $-1$ |
| Multiply row $i$ by scalar $c \ne 0$ | Multiplies $\det$ by $c$ |
| Add a scalar multiple of one row to another | $\det$ unchanged |

These three rules turn Gaussian elimination into an efficient determinant algorithm. Apply Gaussian elimination to $A$ (using only row swaps and row additions — no row scaling), tracking the number of swaps $s$. The result is an upper triangular matrix $U$. Since the determinant of a triangular matrix is the product of its diagonal entries,

$$\det(A) = (-1)^{s}\, \prod_{i=1}^{n} u_{ii}. \tag{4}$$

This computes $\det(A)$ in $O(n^3)$ operations — the same cost as the elimination itself.

### Connection to invertibility

$A$ is invertible exactly when Gaussian elimination produces a nonzero entry on every diagonal of $U$, i.e., $\prod_i u_{ii} \ne 0$. By (4), this is equivalent to $\det(A) \ne 0$ — consistent with the criterion established in [Determinant](../determinant/).

## Multiplicativity

$$\det(AB) = \det(A)\,\det(B). \tag{5}$$

The determinant is a **multiplicative homomorphism** from $n \times n$ matrices to the field $F$. Several immediate consequences follow:

- $\det(I_n) = 1$, so if $A$ is invertible then $1 = \det(A)\det(A^{-1})$, giving $\det(A^{-1}) = 1/\det(A)$.
- $\det(A^k) = \det(A)^k$ for any non-negative integer $k$.
- $\det(A_1 A_2 \cdots A_k) = \det(A_1)\det(A_2)\cdots\det(A_k)$.

Note that (5) does **not** extend to sums: $\det(A + B) \ne \det(A) + \det(B)$ in general.

## Adjugate matrix

The **cofactor matrix** of $A$ is the $n \times n$ matrix whose $(i,j)$ entry is the cofactor $C_{ij} = (-1)^{i+j}\det(A_{ij})$.

The **adjugate** (also called the **classical adjoint**) of $A$ is the transpose of the cofactor matrix:

$$\operatorname{adj}(A)_{ij} \coloneqq C_{ji} = (-1)^{i+j}\det(A_{ji}). \tag{6}$$

**Theorem**:

$$A \cdot \operatorname{adj}(A) = \operatorname{adj}(A) \cdot A = \det(A)\, I_n. \tag{7}$$

The proof follows by writing out the $(i,k)$ entry of $A \cdot \operatorname{adj}(A)$ as $\sum_j a_{ij} C_{kj}$: when $i = k$ this is the cofactor expansion of $\det(A)$ along row $i$; when $i \ne k$ it equals zero because it computes the determinant of a matrix with two identical rows.

When $\det(A) \ne 0$, dividing both sides by $\det(A)$ gives an explicit inverse formula:

$$A^{-1} = \frac{1}{\det(A)}\operatorname{adj}(A). \tag{8}$$

For large $n$ this is $O(n^4)$ — slower than Gaussian elimination. It is most useful for $2 \times 2$ and $3 \times 3$ matrices by hand, or in theoretical arguments.

### The 2×2 case

For $A = \begin{pmatrix}a & b \\ c & d\end{pmatrix}$ with $\det(A) = ad - bc \ne 0$:

$$A^{-1} = \frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}.$$

Swap the diagonal entries, negate the off-diagonal entries, and divide by the determinant.

## Cramer's rule

Let $A$ be an invertible $n \times n$ matrix and $b \in F^n$. The unique solution of $Ax = b$ has components

$$x_i = \frac{\det(A_i(b))}{\det(A)}, \qquad i = 1, \ldots, n, \tag{9}$$

where $A_i(b)$ is the matrix obtained from $A$ by replacing its $i$-th column with $b$.

**Why it works**: From $x = A^{-1}b = \frac{1}{\det(A)}\operatorname{adj}(A)\,b$, the $i$-th component is $\frac{1}{\det(A)}$ times the dot product of the $i$-th row of $\operatorname{adj}(A)$ with $b$. Expanding that dot product as a cofactor expansion along column $i$ of $A$ (with $b$ inserted) gives exactly $\det(A_i(b))$.

Like the adjugate formula, Cramer's rule is $O(n^4)$ and is impractical for large systems. It is mainly used for $n \le 3$ by hand and in theoretical proofs (such as showing that the solution of an integer linear system has a rational — or integer — representation).

## Summary

- **Laplace expansion** works along any row or column (equations (1) and (2)); choose the one with the most zeros to minimize work.
- **Transpose**: $\det(A^\top) = \det(A)$, so every row result has an exact column analogue.
- **Row operations** affect det predictably: swapping two rows flips the sign; scaling a row by $c$ scales det by $c$; adding a multiple of one row to another leaves det unchanged.
- **Gaussian elimination** gives an $O(n^3)$ algorithm: reduce $A$ to upper triangular $U$, then $\det(A) = (-1)^{\text{swaps}} \prod_i u_{ii}$.
- **Multiplicativity**: $\det(AB) = \det(A)\det(B)$; in particular $\det(A^{-1}) = 1/\det(A)$.
- **Adjugate**: $A^{-1} = \frac{1}{\det(A)}\operatorname{adj}(A)$, an explicit but $O(n^4)$ formula, mainly useful for small matrices or theoretical work.
- **Cramer's rule**: $x_i = \det(A_i(b))/\det(A)$, a closed-form solution for $Ax = b$, practical for $n \le 3$ or theoretical arguments.
