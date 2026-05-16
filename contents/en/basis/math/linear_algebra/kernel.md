---
title: Kernel
summary: "Defines the kernel of a linear map as the set of all inputs that map to zero, proves it is a subspace, connects it to injectivity and the homogeneous linear system, and introduces nullity as its dimension."
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/linear_subspace
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

When a linear map sends a vector to zero, it is effectively erasing it — compressing it into nothing. The kernel collects all such vectors and reveals exactly how much "information" a map destroys. Understanding the kernel tells you whether a map can be inverted, and it gives the structure of the solution set of a linear system.

## Definition

For a linear map $T: V \to W$, the **kernel** (also called the **null space**) of $T$ is the set of all inputs that $T$ sends to zero:

$$\ker(T) \coloneqq \{v \in V : T(v) = \mathbf{0}_W\}.$$

The kernel lives in the **domain** $V$. It is always non-empty, because $T(\mathbf{0}_V) = \mathbf{0}_W$ by linearity, so $\mathbf{0}_V \in \ker(T)$ in every case.

## The kernel is a subspace

**Claim**: $\ker(T)$ is a [linear subspace](../linear_subspace/) of $V$.

**Proof**: We already know $\mathbf{0}_V \in \ker(T)$, so $\ker(T)$ is non-empty. Now take any $u, v \in \ker(T)$ and any $c, d \in F$. By linearity of $T$:

$$T(cu + dv) = c\,T(u) + d\,T(v) = c \cdot \mathbf{0}_W + d \cdot \mathbf{0}_W = \mathbf{0}_W.$$

So $cu + dv \in \ker(T)$. By the subspace criterion, $\ker(T)$ is a subspace. $\square$

## The kernel of a matrix

For a matrix $A \in M_{m,n}(F)$, the associated linear map is $T_A(x) = Ax$ (as defined in [Linear Map](../linear_map/)). Its kernel is

$$\ker(A) \coloneqq \{x \in F^n : Ax = \mathbf{0}\},$$

which is exactly the solution set of the homogeneous system $Ax = \mathbf{0}$ introduced in [Linear Equations](../linear_equations/).

## Computing the kernel

To find $\ker(A)$, apply [Gauss-Jordan elimination](../gauss_jordan_elimination/) to $A$ itself (not the augmented matrix — since the right-hand side is $\mathbf{0}$, it stays $\mathbf{0}$ throughout). In the RREF of $A$:

- Variables corresponding to **pivot columns** are basic variables; express them in terms of the free variables.
- Variables corresponding to **free columns** are free variables; assign each a parameter ($t_1, t_2, \ldots$).

Write the general solution as a linear combination of vectors (one for each free variable). Those vectors form a **basis of $\ker(A)$**.

### Worked example

Find $\ker(A)$ for

$$A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{pmatrix}.$$

Apply Gauss-Jordan: $R_2 \leftarrow R_2 - 2R_1$ gives

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{pmatrix}.$$

This is already RREF. Column 1 is the only pivot column; columns 2 and 3 are free. Set $x_2 = s$ and $x_3 = t$ freely. Then $x_1 = -2s - 3t$. The general solution is:

$$x = s \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} -3 \\ 0 \\ 1 \end{pmatrix}, \qquad s, t \in F.$$

So $\ker(A) = \text{span}\!\left\{ (-2, 1, 0)^\top,\, (-3, 0, 1)^\top \right\}$, a two-dimensional subspace of $F^3$.

## Injectivity

The kernel characterizes exactly when $T$ fails to be injective (one-to-one).

**Theorem**: $T: V \to W$ is injective $\iff$ $\ker(T) = \{\mathbf{0}_V\}$.

**Proof**: ($\Rightarrow$) If $T$ is injective and $T(v) = \mathbf{0}_W = T(\mathbf{0}_V)$, then $v = \mathbf{0}_V$. ($\Leftarrow$) Suppose $\ker(T) = \{\mathbf{0}_V\}$ and $T(u) = T(v)$. Then $T(u - v) = T(u) - T(v) = \mathbf{0}_W$, so $u - v \in \ker(T) = \{\mathbf{0}_V\}$, giving $u = v$. $\square$

Intuitively: a map is injective precisely when nothing "collides" at zero (or anywhere else). If the kernel is bigger than $\{\mathbf{0}_V\}$, then multiple distinct inputs land at the same output, and $T$ cannot be inverted.

For a matrix $A \in M_{n,n}(F)$ (square), injectivity is equivalent to the homogeneous system $Ax = \mathbf{0}$ having only the trivial solution — i.e., every column of $A$ is a pivot column in its RREF.

## Nullity

The **nullity** of $T$ is the dimension of its kernel:

$$\text{nullity}(T) \coloneqq \dim(\ker(T)).$$

For the example above, $\text{nullity}(A) = 2$. The nullity counts how many "dimensions of freedom" are in the kernel — how many linearly independent directions get collapsed to zero by $T$.

The relationship between nullity and the **rank** of $T$ (the dimension of the image) is made precise in the [Rank-Nullity Theorem](../rank_nullity_theorem/).

## Summary

- The **kernel** of $T: V \to W$ is $\ker(T) = \{v \in V : T(v) = \mathbf{0}_W\}$, always a subspace of $V$.
- For a matrix $A$, the kernel is the solution set of the homogeneous system $Ax = \mathbf{0}$.
- **Computing $\ker(A)$**: reduce $A$ to RREF, assign parameters to free variables, and write the solution as a linear combination of basis vectors.
- $T$ is **injective** if and only if $\ker(T) = \{\mathbf{0}_V\}$.
- The **nullity** is $\dim(\ker(T))$; it counts the dimensions that get collapsed to zero.
