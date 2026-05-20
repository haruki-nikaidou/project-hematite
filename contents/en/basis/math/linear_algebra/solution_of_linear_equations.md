---
title: Structure of Solutions of Linear Equations
summary: "Classifies the solution set of Ax = b using rank: no solution when rank(A) ≠ rank([A|b]), a unique solution when both ranks equal the number of unknowns, and an affine subspace of solutions otherwise. This checkpoint ties Gauss-Jordan elimination to the rank-nullity theorem to give a complete picture."
prerequisites:
  - basis/math/linear_algebra/linear_equations
  - basis/math/linear_algebra/gauss_jordan_elimination
  - basis/math/linear_algebra/rank_nullity_theorem
  - basis/math/linear_algebra/dimension
aliases: []
tags:
  - Linear Algebra
updated: 2026-05-20
---

[Gauss-Jordan elimination](../gauss_jordan_elimination/) classifies the solutions of $Ax = b$ through pivots and free columns. Rank — a single number — encodes the same information more compactly: comparing $\text{rank}(A)$ to $\text{rank}([A \mid b])$ tells you whether solutions exist, and comparing $\text{rank}(A)$ to $n$ tells you whether there is exactly one. When solutions do exist, they form an **affine subspace** — a translate of $\ker(A)$ — whose dimension the [rank-nullity theorem](../rank_nullity_theorem/) pins down exactly.

## Rank of the augmented matrix

The augmented matrix $[A \mid b]$ has the same $m$ rows as $A$ but one extra column. When you row-reduce it, the RREF of $[A \mid b]$ can have at most one more pivot than the RREF of $A$, and only if that extra pivot lands in the final (appended) column. So:

$$\text{rank}([A \mid b]) = \begin{cases} \text{rank}(A) & \text{if } b \in \text{col}(A), \\ \text{rank}(A) + 1 & \text{if } b \notin \text{col}(A). \end{cases}$$

The condition $b \in \text{col}(A)$ is exactly the condition that $Ax = b$ has a solution, which makes the observation above more than an accident.

## Consistency criterion

**Theorem**: The system $Ax = b$ is consistent (has at least one solution) if and only if

$$\text{rank}(A) = \text{rank}([A \mid b]).$$

**Proof**: Reduce $[A \mid b]$ to RREF, obtaining $[R \mid c]$. The system is inconsistent if and only if some row of $[R \mid c]$ has the form $(0\; 0\; \cdots\; 0 \mid 1)$ — a pivot appearing in the last column. Such a row adds a pivot to $[A \mid b]$ that does not come from $A$, so $\text{rank}([A \mid b]) = \text{rank}(A) + 1$. Conversely, if no such row appears, the RREF of $[A \mid b]$ has exactly the same pivots as the RREF of $A$, so $\text{rank}([A \mid b]) = \text{rank}(A)$ and the system is consistent. $\square$

## Uniqueness criterion

Now assume the system is consistent: $\text{rank}(A) = \text{rank}([A \mid b]) = r$. The RREF of $A$ has $r$ pivot columns and $n - r$ free columns. Each free column produces a free variable, and each free variable contributes one dimension of freedom to the solution set. Therefore:

- If $\text{rank}(A) = n$: there are no free variables, so the solution is **unique**.
- If $\text{rank}(A) < n$: there are $n - \text{rank}(A) > 0$ free variables, so there are **infinitely many** solutions.

## The complete classification

| Condition | Outcome |
|-----------|---------|
| $\text{rank}(A) < \text{rank}([A \mid b])$ | No solution |
| $\text{rank}(A) = \text{rank}([A \mid b]) = n$ | Unique solution |
| $\text{rank}(A) = \text{rank}([A \mid b]) < n$ | Infinitely many solutions |

These three cases are exhaustive. Every system falls into exactly one of them.

## The affine subspace structure

When $Ax = b$ is consistent, the full solution set has a clean geometric form.

**Theorem**: Let $x_p$ be any particular solution to $Ax = b$. The complete solution set is

$$\{x \in F^n : Ax = b\} = x_p + \ker(A) \coloneqq \{x_p + h : h \in \ker(A)\}.$$

**Proof**:
- ($\supseteq$) For any $h \in \ker(A)$: $A(x_p + h) = Ax_p + Ah = b + \mathbf{0} = b$, so $x_p + h$ is a solution.
- ($\subseteq$) For any solution $x$: $A(x - x_p) = Ax - Ax_p = b - b = \mathbf{0}$, so $x - x_p \in \ker(A)$, meaning $x = x_p + (x - x_p) \in x_p + \ker(A)$. $\square$

The set $x_p + \ker(A)$ is called an **affine subspace** of $F^n$ — a translate of the linear subspace $\ker(A)$, shifted by the particular solution $x_p$. It is itself a linear subspace only when $x_p = \mathbf{0}$, i.e., when $b = \mathbf{0}$.

### Dimension of the solution set

By the rank-nullity theorem, $\text{nullity}(A) = n - \text{rank}(A)$. Since $x_p + \ker(A)$ is a translate of $\ker(A)$, it has the same dimension as $\ker(A)$: namely $n - \text{rank}(A)$.

| $\text{rank}(A)$ | $\text{nullity}(A)$ | Shape of solution set |
|---|---|---|
| $n$ | $0$ | A single point |
| $n - 1$ | $1$ | A line through $x_p$ |
| $n - k$ | $k$ | A $k$-dimensional affine flat through $x_p$ |

## Worked example

Solve $Ax = b$ where

$$A = \begin{pmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{pmatrix}, \qquad b = \begin{pmatrix} 3 \\ 6 \end{pmatrix}.$$

**Step 1: Check consistency.** Row-reduce the augmented matrix:

$$\begin{pmatrix} 1 & 2 & -1 & 3 \\ 2 & 4 & -2 & 6 \end{pmatrix} \xrightarrow{R_2 \leftarrow R_2 - 2R_1} \begin{pmatrix} 1 & 2 & -1 & 3 \\ 0 & 0 & 0 & 0 \end{pmatrix}.$$

This is RREF. The single pivot is in column 1, so $\text{rank}(A) = 1$ and $\text{rank}([A \mid b]) = 1$. They agree: the system is consistent.

**Step 2: Count free variables.** With $n = 3$ and $\text{rank}(A) = 1$, there are $3 - 1 = 2$ free variables ($x_2$ and $x_3$). The solution set is a 2-dimensional affine subspace.

**Step 3: Find a particular solution.** Set the free variables to zero: $x_2 = 0$, $x_3 = 0$. Then $x_1 = 3$, giving

$$x_p = \begin{pmatrix} 3 \\ 0 \\ 0 \end{pmatrix}.$$

**Step 4: Find a basis for $\ker(A)$.** From the RREF, $x_1 = -2x_2 + x_3$. Assigning parameters $x_2 = s$ and $x_3 = t$:

$$\ker(A) = \text{span}\!\left\{ \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix},\; \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \right\}.$$

**Step 5: Write the complete solution set.** By the affine subspace theorem:

$$x = \begin{pmatrix} 3 \\ 0 \\ 0 \end{pmatrix} + s\begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix} + t\begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \qquad s, t \in F.$$

This is a 2-dimensional affine plane inside $F^3$ passing through $x_p$.

**What if instead $b = (3, 7)^\top$?** Applying $R_2 \leftarrow R_2 - 2R_1$ yields $(0, 0, 0 \mid 1)$ — a pivot in the last column. Now $\text{rank}([A \mid b]) = 2 \ne 1 = \text{rank}(A)$, so the system has no solution.

## Summary

- **Consistency criterion**: $Ax = b$ is consistent if and only if $\text{rank}(A) = \text{rank}([A \mid b])$.
- **Uniqueness criterion**: A consistent system has a unique solution if and only if $\text{rank}(A) = n$.
- **Three cases**: $\text{rank}(A) < \text{rank}([A \mid b])$ means no solution; $\text{rank}(A) = n$ means a unique solution; $\text{rank}(A) < n$ (with consistency) means infinitely many.
- **Affine subspace theorem**: The full solution set of a consistent system is $x_p + \ker(A)$ for any particular solution $x_p$ — a translate of the kernel.
- **Dimension**: The solution set has dimension $\text{nullity}(A) = n - \text{rank}(A)$, by the rank-nullity theorem.
