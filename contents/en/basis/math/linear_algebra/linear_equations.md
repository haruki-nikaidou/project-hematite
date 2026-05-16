---
title: Linear Equations
summary: "Shows how a system of linear equations is compactly expressed as a matrix equation $Ax = b$, and uses Gauss-Jordan elimination on the augmented matrix to classify solutions as none, unique, or infinitely many."
prerequisites: 
  - basis/math/linear_algebra/matrix
  - basis/math/linear_algebra/gauss_jordan_elimination
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

Virtually every computational problem in science and engineering can be reduced to "find values satisfying these linear constraints." The temperature distribution in a heated rod, the currents in an electrical circuit, the prices that clear a market — all become systems of linear equations. The matrix form of a linear system is the lens that makes these problems tractable.

## Systems of linear equations

A **system of $m$ linear equations in $n$ unknowns** $x_1, \ldots, x_n$ over a field $F$ has the form:

$$
\begin{cases}
a_{11} x_1 + a_{12} x_2 + \cdots + a_{1n} x_n = b_1 \\
a_{21} x_1 + a_{22} x_2 + \cdots + a_{2n} x_n = b_2 \\
\quad \vdots \\
a_{m1} x_1 + a_{m2} x_2 + \cdots + a_{mn} x_n = b_m
\end{cases}
$$

where the **coefficients** $a_{ij} \in F$ and the **right-hand sides** $b_i \in F$ are given, and you want to find all tuples $(x_1, \ldots, x_n) \in F^n$ that satisfy all $m$ equations simultaneously. Such a tuple is called a **solution**, and the set of all solutions is the **solution set**.

## Matrix form: $Ax = b$

Packaging the coefficients, unknowns, and right-hand sides into matrices turns the system into the compact equation

$$Ax = b, \tag{1}$$

where:
- $A \in M_{m,n}(F)$ is the **coefficient matrix** with $(A)_{ij} = a_{ij}$,
- $x = (x_1, \ldots, x_n)^\top \in F^n$ is the **unknown vector** (a column vector),
- $b = (b_1, \ldots, b_m)^\top \in F^m$ is the **right-hand-side vector**.

The product $Ax$ gives back exactly the left-hand side of each equation. So solving the system is the same as finding all $x \in F^n$ for which $Ax$ equals $b$.

## The augmented matrix

Rather than manipulate the two sides of (1) separately, you combine them into a single matrix. The **augmented matrix** is

$$[A \mid b] \in M_{m,n+1}(F),$$

formed by appending $b$ as an extra column to the right of $A$. A vertical bar is drawn between the $n$-th and $(n+1)$-th columns as a visual reminder that the last column is the right-hand side.

Applying [Gauss-Jordan elimination](../gauss_jordan_elimination/) to $[A \mid b]$ performs exactly the elementary row operations needed to simplify the system, while keeping track of both sides at once. The operations do not change the solution set, so the RREF of $[A \mid b]$ gives an equivalent system from which solutions can be read off directly.

## Reading off solutions from RREF

After reducing $[A \mid b]$ to RREF, let $[R \mid c]$ be the result. The variables corresponding to pivot columns of $R$ are **basic variables** (their values are forced once you choose the free variables), and variables corresponding to free columns are **free variables** (they can take any value in $F$).

There are exactly three possible outcomes:

### Outcome 1: Inconsistent (no solution)

The RREF $[R \mid c]$ contains a row of the form

$$\begin{pmatrix} 0 & 0 & \cdots & 0 & \mid & 1 \end{pmatrix},$$

which represents the equation $0 = 1$. This is impossible, so the system has **no solution**. Geometrically, the hyperplanes defined by the equations do not share a common point.

### Outcome 2: Unique solution

The RREF has no all-zero rows in $A$ (each column of $R$ is a pivot column) and no pivot in the $b$-column. Every variable is a basic variable — there are no free variables. You can read off the unique values $x_1, \ldots, x_n$ directly from the last column of the RREF.

### Outcome 3: Infinitely many solutions

At least one column of $R$ is a free column (at least one free variable), and there is no pivot in the $b$-column. Each free variable can be set to an arbitrary value in $F$, producing a distinct solution. The complete solution set is a **particular solution** plus any element of the **kernel** of $A$ (see [Kernel](../kernel/)):

$$x = x_{\text{particular}} + x_{\text{homogeneous}}, \qquad x_{\text{homogeneous}} \in \ker(A).$$

The particular solution is any single $x$ that satisfies $Ax = b$; the kernel part accounts for all the "freedom."

## The homogeneous system

The special case $b = \mathbf{0}$ gives the **homogeneous system** $Ax = \mathbf{0}$. It is always consistent: $x = \mathbf{0}$ is always a solution (called the **trivial solution**). The solution set is exactly $\ker(A)$, the kernel of $A$.

If the homogeneous system has only the trivial solution, the coefficient matrix has no free columns (all columns are pivot columns). If it has nontrivial solutions, then there is at least one free column, and the kernel is more than just $\{\mathbf{0}\}$.

The homogeneous system plays a central role in understanding the structure of the solution set of the inhomogeneous system $Ax = b$: any two solutions of $Ax = b$ differ by an element of $\ker(A)$.

## Summary

- A system of $m$ linear equations in $n$ unknowns is compactly written as $Ax = b$ with $A \in M_{m,n}(F)$.
- The **augmented matrix** $[A \mid b]$ packages both sides; applying Gauss-Jordan to it reduces the system without changing its solution set.
- There are exactly three outcomes: **inconsistent** (a pivot appears in the $b$-column), **unique solution** (no free variables), or **infinitely many solutions** (at least one free variable).
- The **homogeneous system** $Ax = \mathbf{0}$ is always consistent; its solution set is $\ker(A)$, which is explored in [Kernel](../kernel/).
