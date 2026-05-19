---
title: LU Decomposition
summary: "Explains how to factor a square matrix into a lower-triangular and an upper-triangular matrix using Gaussian elimination, and how this factorization makes solving linear systems with multiple right-hand sides dramatically faster."
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/gauss_jordan_elimination
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-19
---

Suppose you need to solve $Ax = b$ not just once, but for a hundred different right-hand sides $b$. Running Gauss-Jordan elimination from scratch each time wastes work, because all of that effort depends only on $A$ — not on $b$. **LU decomposition** packages the work that depends on $A$ into two triangular matrices, so each new right-hand side costs only a cheap triangular solve.

## What LU decomposition is

Given a square matrix $A$, an **LU decomposition** is a factorization

$$
A = LU \tag{1}
$$

where:

- $L$ is a **lower-triangular** matrix with $1$s on the diagonal (all entries above the diagonal are $0$).
- $U$ is an **upper-triangular** matrix (all entries below the diagonal are $0$).

The name comes from **L**ower and **U**pper. As an example, for a $3 \times 3$ matrix the shape looks like:

$$
\underbrace{\begin{pmatrix} 1 & 0 & 0 \\ \ell_{21} & 1 & 0 \\ \ell_{31} & \ell_{32} & 1 \end{pmatrix}}_{L}
\underbrace{\begin{pmatrix} u_{11} & u_{12} & u_{13} \\ 0 & u_{22} & u_{23} \\ 0 & 0 & u_{33} \end{pmatrix}}_{U}
= A.
$$

## How Gaussian elimination produces LU

You already know that the forward sweep of [Gauss-Jordan elimination](../gauss_jordan_elimination/) clears entries below each pivot using row replacement operations: $R_i \leftarrow R_i - m_{ij} R_j$, where $m_{ij} = a_{ij} / a_{jj}$ is the **multiplier**. Watch what this does to $A$.

Each row replacement $R_i \leftarrow R_i - m_{ij} R_j$ can be written as left-multiplication by an **elementary matrix** $E_{ij}$. After all the forward-sweep operations, you have

$$
E_k \cdots E_2 E_1 \, A = U,
$$

where $U$ is the row echelon form you obtained (without the scaling step — here we keep the pivots as-is rather than normalizing to $1$). Solving for $A$:

$$
A = E_1^{-1} E_2^{-1} \cdots E_k^{-1} \, U = L \, U.
$$

The product $L = E_1^{-1} \cdots E_k^{-1}$ turns out to be lower-triangular with $1$s on the diagonal, because:

- The inverse of a row-replacement matrix $E_{ij}$ (which subtracts $m_{ij}$ times row $j$ from row $i$) is just the matrix that *adds* $m_{ij}$ times row $j$ to row $i$ — still lower-triangular.
- When multipliers only go from a later row to an earlier row (which is exactly what forward elimination does), their product is also lower-triangular.

The remarkable consequence: **the multipliers $m_{ij}$ are the entries of $L$ below the diagonal.** You get both factors as a byproduct of elimination, with no extra computation.

## The LU algorithm

Here is the algorithm explicitly for an $n \times n$ matrix $A$. It overwrites $A$ in place: the upper triangle (including the diagonal) becomes $U$, and the strictly lower triangle stores the multipliers that form $L$.

```
for j = 1 to n-1:          # pivot column
    for i = j+1 to n:      # rows below the pivot
        m = A[i][j] / A[j][j]
        A[i][j] = m        # store multiplier (becomes L)
        for k = j+1 to n:
            A[i][k] -= m * A[j][k]
        # A[i][j+1..n] is now updated (becomes U in that row)
```

After this, read off $L$ by taking the strictly lower-triangular part of the modified $A$ with $1$s inserted on the diagonal, and read off $U$ as the upper-triangular part.

## A worked example

Decompose:

$$
A = \begin{pmatrix} 2 & 1 & 1 \\ 4 & 3 & 3 \\ 8 & 7 & 9 \end{pmatrix}.
$$

**Step 1** — eliminate below the first pivot $a_{11} = 2$.

Multipliers: $m_{21} = 4/2 = 2$, $m_{31} = 8/2 = 4$.

$$
R_2 \leftarrow R_2 - 2R_1, \quad R_3 \leftarrow R_3 - 4R_1:
$$

$$
\begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 3 & 5 \end{pmatrix}.
$$

**Step 2** — eliminate below the second pivot $a_{22} = 1$.

Multiplier: $m_{32} = 3/1 = 3$.

$$
R_3 \leftarrow R_3 - 3R_2:
$$

$$
\begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{pmatrix} = U.
$$

Collecting the multipliers into $L$:

$$
L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 4 & 3 & 1 \end{pmatrix}, \qquad U = \begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{pmatrix}.
$$

You can verify: $LU = A$.

## Using LU to solve $Ax = b$

Once you have $A = LU$, solving $Ax = b$ becomes solving two **triangular systems** in sequence.

$$
Ax = b \;\Longleftrightarrow\; L\underbrace{(Ux)}_{\displaystyle y} = b \;\Longleftrightarrow\; \begin{cases} Ly = b \\ Ux = y \end{cases}
$$

**Forward substitution** — solve $Ly = b$ for $y$.

Because $L$ is lower-triangular with $1$s on the diagonal, you can solve row by row from top to bottom:

$$
y_i = b_i - \sum_{j=1}^{i-1} \ell_{ij}\, y_j, \quad i = 1, \ldots, n.
$$

**Back substitution** — solve $Ux = y$ for $x$.

Because $U$ is upper-triangular, you work from the bottom row upward:

$$
x_i = \frac{1}{u_{ii}}\!\left(y_i - \sum_{j=i+1}^{n} u_{ij}\, x_j\right), \quad i = n, \ldots, 1.
$$

Each triangular solve costs $O(n^2)$ operations. The initial factorization costs $O(n^3)$. If you need to solve $Ax = b$ for $k$ different right-hand sides, the total cost is $O(n^3 + kn^2)$ instead of $O(kn^3)$ — a huge saving when $k$ is large.

### Continuing the example

Solve $Ax = b$ for $b = (4, 10, 26)^T$ using the $L$ and $U$ above.

**Forward substitution** ($Ly = b$):

$$
y_1 = 4,
$$
$$
y_2 = 10 - 2 \cdot 4 = 2,
$$
$$
y_3 = 26 - 4 \cdot 4 - 3 \cdot 2 = 4.
$$

**Back substitution** ($Ux = y$):

$$
x_3 = 4/2 = 2,
$$
$$
x_2 = (2 - 1 \cdot 2)/1 = 0,
$$
$$
x_1 = (4 - 1 \cdot 0 - 1 \cdot 2)/2 = 1.
$$

So $x = (1, 0, 2)^T$. Check: $Ax = (2+0+2,\; 4+0+6,\; 8+0+18)^T = (4, 10, 26)^T$. ✓

## When LU decomposition exists

LU decomposition (without any row swaps) exists and is unique when all **leading principal submatrices** of $A$ are nonsingular — equivalently, when every pivot encountered during elimination is nonzero. Formally, $A$ must satisfy $\det(A_{k}) \ne 0$ for $k = 1, \ldots, n-1$, where $A_k$ is the top-left $k \times k$ submatrix.

When a zero pivot is encountered before the process finishes, you need to permute rows to bring a nonzero entry to the pivot position. This leads to **PLU decomposition**:

$$
PA = LU, \tag{2}
$$

where $P$ is a **permutation matrix** (a matrix whose rows are a reordering of the identity's rows). Every nonsingular matrix has a PLU decomposition. In practice, even when a zero pivot is not encountered, choosing the largest available entry as the pivot (**partial pivoting**) improves numerical stability, so real-world implementations always compute $PA = LU$.

## Summary

- **LU decomposition** factorizes a square matrix as $A = LU$, where $L$ is lower-triangular with $1$s on the diagonal and $U$ is upper-triangular.
- The factorization is a byproduct of Gaussian elimination: $U$ is the row echelon form produced by the forward sweep, and the **multipliers** fill in $L$ below the diagonal.
- To solve $Ax = b$, substitute $A = LU$ and solve two triangular systems: $Ly = b$ by **forward substitution**, then $Ux = y$ by **back substitution**, each costing $O(n^2)$.
- The upfront $O(n^3)$ factorization pays off whenever the same $A$ is reused with multiple right-hand sides.
- LU without pivoting requires all leading principal submatrices to be nonsingular; in general, **PLU decomposition** handles arbitrary nonsingular matrices and is preferred in practice for numerical stability.
