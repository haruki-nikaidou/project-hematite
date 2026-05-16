---
title: Gauss-Jordan Elimination
summary: "Explains how to systematically reduce any matrix to reduced row echelon form using three elementary row operations, and why this process is the backbone of solving linear systems and computing ranks."
prerequisites: 
  - basis/math/linear_algebra/matrix
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

Suppose you have five equations in five unknowns. You could try guessing, or you could apply a systematic procedure that is guaranteed to either find the unique solution, describe all infinitely many solutions, or tell you there are none. Gauss-Jordan elimination is that procedure, and it works for any number of equations and unknowns.

## Elementary row operations

The key insight is that certain manipulations of the rows of a matrix do not change the solution set of the corresponding linear system. These are the three **elementary row operations**:

1. **Row swap**: interchange two rows, written $R_i \leftrightarrow R_j$.
2. **Row scaling**: multiply every entry of a row by a nonzero scalar $c \ne 0$, written $R_i \leftarrow c \cdot R_i$.
3. **Row replacement**: add a scalar multiple of one row to another, written $R_i \leftarrow R_i + c \cdot R_j$.

Each operation is reversible (its inverse is another elementary row operation of the same type), so applying any sequence of these operations produces an equivalent system — one with exactly the same solutions.

## Row echelon form

After applying a sequence of elementary row operations, you aim for a specific shape. A matrix is in **row echelon form (REF)** if:

- All zero rows (rows consisting entirely of zeros) are at the bottom.
- In each nonzero row, the first nonzero entry — called the **pivot** (or **leading entry**) — lies strictly to the right of the pivot in the row above it.

This gives the matrix a staircase shape when you trace the pivots from top-left to bottom-right.

## Reduced row echelon form

A matrix is in **reduced row echelon form (RREF)** if it satisfies all the REF conditions and, additionally:

- Every pivot equals exactly $1$.
- Every other entry in a pivot's column is $0$ (not just the entries below the pivot, but above it too).

RREF is the "cleanest" form: you can read off the solution to a linear system directly from it with no further arithmetic.

A fundamental theorem states that **every matrix has a unique RREF**. No matter which sequence of row operations you choose (as long as you follow the algorithm), you always arrive at the same reduced row echelon form.

## The elimination algorithm

The algorithm proceeds in two sweeps.

**Forward sweep (eliminate below each pivot):**
1. Find the leftmost column that has a nonzero entry anywhere in the current unprocessed rows.
2. If needed, swap rows so that a nonzero entry is at the top of that column (among the unprocessed rows).
3. Scale the current row so its leading entry becomes $1$.
4. Add appropriate multiples of this row to every row *below* it to make all entries below the pivot equal to $0$.
5. Move to the next row and repeat from step 1.

**Backward sweep (eliminate above each pivot):**
6. Working from the bottom pivot upward, add multiples of each pivot row to every row *above* it to make all entries above the pivot equal to $0$.

After both sweeps, every pivot is $1$ and every other entry in each pivot column is $0$ — you have reached RREF.

## A worked example

Solve the system:

$$
\begin{cases} x_1 + 2x_2 - x_3 = 1 \\ 2x_1 + 3x_2 + x_3 = 4 \\ -x_1 + x_2 + 2x_3 = 3 \end{cases}
$$

Write the augmented matrix $[A \mid b]$ and reduce it:

$$
\begin{pmatrix} 1 & 2 & -1 & 1 \\ 2 & 3 & 1 & 4 \\ -1 & 1 & 2 & 3 \end{pmatrix}
$$

$R_2 \leftarrow R_2 - 2R_1$, then $R_3 \leftarrow R_3 + R_1$:

$$
\begin{pmatrix} 1 & 2 & -1 & 1 \\ 0 & -1 & 3 & 2 \\ 0 & 3 & 1 & 4 \end{pmatrix}
$$

$R_2 \leftarrow -1 \cdot R_2$ (scale to make pivot $1$):

$$
\begin{pmatrix} 1 & 2 & -1 & 1 \\ 0 & 1 & -3 & -2 \\ 0 & 3 & 1 & 4 \end{pmatrix}
$$

$R_3 \leftarrow R_3 - 3R_2$:

$$
\begin{pmatrix} 1 & 2 & -1 & 1 \\ 0 & 1 & -3 & -2 \\ 0 & 0 & 10 & 10 \end{pmatrix}
$$

$R_3 \leftarrow \tfrac{1}{10} R_3$:

$$
\begin{pmatrix} 1 & 2 & -1 & 1 \\ 0 & 1 & -3 & -2 \\ 0 & 0 & 1 & 1 \end{pmatrix}
$$

Now the backward sweep. $R_2 \leftarrow R_2 + 3R_3$, then $R_1 \leftarrow R_1 + R_3$:

$$
\begin{pmatrix} 1 & 2 & 0 & 2 \\ 0 & 1 & 0 & 1 \\ 0 & 0 & 1 & 1 \end{pmatrix}
$$

$R_1 \leftarrow R_1 - 2R_2$:

$$
\begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 1 \\ 0 & 0 & 1 & 1 \end{pmatrix}
$$

This is RREF. Reading off: $x_1 = 0$, $x_2 = 1$, $x_3 = 1$. The system has a unique solution.

## Pivot columns and free variables

In the RREF of a matrix $A$, a column that contains a pivot is called a **pivot column**; all other columns of $A$ are **free columns**. The variables corresponding to free columns are called **free variables** — they can take any value in $F$, and every choice gives a valid solution. The variables corresponding to pivot columns are then determined by back-substitution.

When there are no free variables, the solution (if it exists) is unique. When there is at least one free variable, there are infinitely many solutions. This classification is explored further in [Linear Equations](../linear_equations/).

## Summary

- **Elementary row operations** (swap, scale, replacement) preserve the solution set of a linear system.
- **Row echelon form** (REF) has a staircase of pivots; **reduced row echelon form** (RREF) additionally normalizes every pivot to $1$ and clears all other entries in pivot columns.
- Every matrix has a **unique RREF**, regardless of the sequence of row operations used.
- The algorithm consists of a **forward sweep** (eliminate below pivots) followed by a **backward sweep** (eliminate above pivots).
- **Pivot columns** correspond to determined variables; **free columns** correspond to free variables that parametrize the solution set.
