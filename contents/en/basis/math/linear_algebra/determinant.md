---
title: Determinant
summary: "Defines the determinant of a square matrix recursively via cofactor expansion, explains its geometric meaning as signed volume scaling, and establishes its connection to invertibility of linear maps."
prerequisites: 
  - basis/math/linear_algebra/matrix
  - basis/math/linear_algebra/linear_map
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-19
---

Every [linear map](../linear_map/) stretches, compresses, rotates, or reflects the space it acts on. The **determinant** captures the net effect in a single number: it is the signed factor by which the map scales volumes. If the determinant is 2, the map doubles every volume; if it is negative, the map also flips orientation; if it is 0, the map collapses space entirely — and the map becomes uninvertible.

## The 2×2 case

For a 2×2 matrix

$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix},$$

the **determinant** is

$$\det(A) = ad - bc. \tag{1}$$

The geometric meaning is immediate: the two columns of $A$ are vectors $\mathbf{u} = (a, c)^\top$ and $\mathbf{v} = (b, d)^\top$ in $\mathbb{R}^2$. The magnitude $|\det(A)| = |ad - bc|$ equals the **area of the parallelogram** spanned by $\mathbf{u}$ and $\mathbf{v}$.

The sign carries orientation information. If the columns go counterclockwise (standard orientation), $\det(A) > 0$; if they go clockwise (reversed orientation), $\det(A) < 0$; and $\det(A) = 0$ when the columns are linearly dependent — the parallelogram collapses to a line segment with zero area.

## The 3×3 case

Write

$$A = \begin{pmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{pmatrix}.$$

The determinant is

$$
\det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32})
        - a_{12}(a_{21}a_{33} - a_{23}a_{31})
        + a_{13}(a_{21}a_{32} - a_{22}a_{31}). \tag{2}
$$

Each parenthesized expression is itself a 2×2 determinant — the submatrix you get by deleting row 1 and the column of the corresponding entry. This "expansion along the first row" is the starting point for the general definition.

## The general definition

For an $n \times n$ matrix $A$ over a field $F$, the determinant is defined **recursively** by **cofactor expansion along row 1**:

$$\det(A) \coloneqq \sum_{j=1}^{n} (-1)^{1+j}\, a_{1j}\, \det(A_{1j}), \tag{3}$$

where $A_{ij}$ denotes the **$(i,j)$ minor** — the $(n-1) \times (n-1)$ submatrix obtained by deleting row $i$ and column $j$ from $A$. The scalar

$$C_{ij} \coloneqq (-1)^{i+j} \det(A_{ij})$$

is called the **$(i,j)$ cofactor** of $A$. The base case is $\det([a]) = a$ for a $1 \times 1$ matrix.

One of the key theorems, proved in [Properties of the Determinant](../properties_of_det/), is that expanding along *any* row or column gives the same value. This is far from obvious from the definition above but makes computing determinants much more flexible in practice.

## Geometric interpretation

In $\mathbb{R}^n$, $|\det(A)|$ is the **$n$-dimensional volume of the parallelepiped** spanned by the column vectors of $A$. In $\mathbb{R}^2$ this is area; in $\mathbb{R}^3$ it is volume in the usual sense.

The sign indicates orientation: $\det(A) > 0$ means the columns form a positively oriented basis (same handedness as the standard basis); $\det(A) < 0$ means orientation is reversed.

Because $\det(A)$ is the volume-scaling factor of the linear map $T_A(x) = Ax$, you have

$$\operatorname{Vol}(T_A(S)) = |\det(A)| \cdot \operatorname{Vol}(S)$$

for any bounded region $S \subseteq \mathbb{R}^n$. This identity is the foundation of the change-of-variables formula in multivariable integration.

## Determinant and invertibility

The most important single fact about determinants:

$$A \text{ is invertible} \iff \det(A) \ne 0. \tag{4}$$

If $\det(A) = 0$, the map $T_A$ collapses at least one dimension — volume becomes zero, so the map cannot be reversed. If $\det(A) \ne 0$, the map scales volumes by a nonzero factor and is therefore bijective, hence invertible. An explicit formula for $A^{-1}$ in terms of determinants is developed in [Properties of the Determinant](../properties_of_det/).

## Summary

- The **determinant** $\det(A)$ is a scalar assigned to every square matrix, defined recursively by cofactor expansion: $\det(A) = \sum_{j=1}^n (-1)^{1+j} a_{1j} \det(A_{1j})$.
- For $n = 1$: $\det([a]) = a$. For $n = 2$: $\det\!\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad - bc$.
- Geometrically, $|\det(A)|$ is the $n$-dimensional volume of the parallelepiped spanned by the columns of $A$; the sign records orientation.
- The linear map $T_A$ scales all volumes by $|\det(A)|$.
- $A$ is invertible if and only if $\det(A) \ne 0$.
- Practical computation and further properties — expansion along any row/column, row-operation rules, multiplicativity, the inverse formula, and Cramer's rule — are covered in [Properties of the Determinant](../properties_of_det/).
