---
title: Finite-dimensional Vector Space
summary: "An introduction to vector spaces — the algebraic structures built around addition and scaling — with a focus on finite-dimensional spaces, bases, and dimension."
prerequisites: 
  - elementry/math/linear
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-08
---

Most of the mathematics behind computer graphics, machine learning, and physics simulations happens inside a **vector space**. Before you can work with matrices, transformations, or gradients, you need to understand the stage they perform on. That stage is a vector space.

## Vectors: beyond arrows

You have probably seen vectors drawn as arrows. That picture is helpful for intuition, but the real idea is more general. A **vector** is any object that you can add to another vector and scale by a number — as long as those two operations obey a specific list of rules. The collection of all such vectors is called a **vector space**.

Under this definition, arrows in the plane are vectors. So are ordered lists of numbers. In more advanced settings, even functions and polynomials can be vectors. What ties them all together is the same short list of rules.

## The formal definition

A **vector space** over the real numbers $\mathbb{R}$ is a set $V$ equipped with two operations:

- **Vector addition**: for any $\mathbf{u}, \mathbf{v} \in V$, their sum $\mathbf{u} + \mathbf{v} \in V$.
- **Scalar multiplication**: for any $c \in \mathbb{R}$ and $\mathbf{v} \in V$, the product $c\mathbf{v} \in V$.

These operations must satisfy eight axioms for all $\mathbf{u}, \mathbf{v}, \mathbf{w} \in V$ and $a, b \in \mathbb{R}$:

| # | Name | Rule |
|---|------|------|
| 1 | Associativity of addition | $(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$ |
| 2 | Commutativity of addition | $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$ |
| 3 | Additive identity | There exists $\mathbf{0} \in V$ with $\mathbf{v} + \mathbf{0} = \mathbf{v}$ |
| 4 | Additive inverse | There exists $-\mathbf{v} \in V$ with $\mathbf{v} + (-\mathbf{v}) = \mathbf{0}$ |
| 5 | Multiplicative identity | $1 \cdot \mathbf{v} = \mathbf{v}$ |
| 6 | Associativity of scalar mult. | $a(b\mathbf{v}) = (ab)\mathbf{v}$ |
| 7 | Distributivity over vector addition | $a(\mathbf{u} + \mathbf{v}) = a\mathbf{u} + a\mathbf{v}$ |
| 8 | Distributivity over scalar addition | $(a + b)\mathbf{v} = a\mathbf{v} + b\mathbf{v}$ |

Every rule here is something you already take for granted with ordinary numbers. The point of listing them explicitly is that they are the *only* things you need — once you confirm these eight hold for any set and its operations, all the machinery of linear algebra comes along for free.

## The canonical example: $\mathbb{R}^n$

The most important vector space for a beginner is $\mathbb{R}^n$ — the set of all ordered $n$-tuples of real numbers:

$$
\mathbf{v} = (v_1,\ v_2,\ \ldots,\ v_n), \quad v_i \in \mathbb{R}
$$

Addition and scalar multiplication are defined component-wise:

$$
\mathbf{u} + \mathbf{v} \coloneqq (u_1 + v_1,\ u_2 + v_2,\ \ldots,\ u_n + v_n)
$$

$$
c\mathbf{v} \coloneqq (cv_1,\ cv_2,\ \ldots,\ cv_n)
$$

The zero vector is $\mathbf{0} = (0, 0, \ldots, 0)$, and the additive inverse of $\mathbf{v}$ is $-\mathbf{v} = (-v_1, \ldots, -v_n)$. Checking all eight axioms for these definitions is a good exercise that makes the abstract rules feel concrete.

When $n = 2$ you recover the familiar 2-D plane; when $n = 3$, ordinary 3-D space. Nothing in the definition stops you from going higher.

## Span, basis, and dimension

### Span

Given a set of vectors $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ in a vector space $V$, their **span** is the set of all [linear combinations](../linear/) you can form from them:

$$
\operatorname{span}\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}
\coloneqq \{\, c_1\mathbf{v}_1 + \cdots + c_k\mathbf{v}_k \mid c_1, \ldots, c_k \in \mathbb{R} \,\}
$$

If the span equals all of $V$, then $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ **spans** $V$ — every vector in the space can be built from these vectors.

### Linear independence

A set of vectors is **linearly independent** if none of them can be written as a linear combination of the others. Equivalently, the only solution to:

$$
c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_k\mathbf{v}_k = \mathbf{0}
$$

is $c_1 = c_2 = \cdots = c_k = 0$. If any $c_i$ can be non-zero, the set is **linearly dependent** — it contains redundancy.

### Basis and dimension

A **basis** of $V$ is a set of vectors that is both linearly independent *and* spans $V$. Think of it as the smallest set from which every vector in $V$ can be assembled exactly once.

A remarkable fact: every basis of a given vector space has exactly the same number of vectors. That number is called the **dimension** of $V$, written $\dim(V)$.

For $\mathbb{R}^n$, the **standard basis** is:

$$
\mathbf{e}_1 = (1, 0, \ldots, 0),\quad
\mathbf{e}_2 = (0, 1, \ldots, 0),\quad \ldots,\quad
\mathbf{e}_n = (0, 0, \ldots, 1)
$$

This basis contains $n$ vectors, so $\dim(\mathbb{R}^n) = n$. Any vector $(v_1, \ldots, v_n)$ decomposes as:

$$
\mathbf{v} = v_1\mathbf{e}_1 + v_2\mathbf{e}_2 + \cdots + v_n\mathbf{e}_n
$$

The coordinates $v_1, \ldots, v_n$ are exactly the coefficients of $\mathbf{v}$ in the standard basis.

### Finite-dimensional

A vector space is **finite-dimensional** if it has a finite basis — equivalently, if $\dim(V) < \infty$. All of $\mathbb{R}^n$ for concrete values of $n$ are finite-dimensional. Spaces of functions are typically infinite-dimensional, but those come later.

## Subspaces

A **subspace** of $V$ is a non-empty subset $W \subseteq V$ that is itself a vector space under the same operations. You don't need to recheck all eight axioms — you only need three:

1. $\mathbf{0} \in W$
2. $\mathbf{u} + \mathbf{v} \in W$ for all $\mathbf{u}, \mathbf{v} \in W$ (closed under addition)
3. $c\mathbf{v} \in W$ for all $c \in \mathbb{R}$, $\mathbf{v} \in W$ (closed under scalar multiplication)

The remaining axioms are inherited automatically from $V$.

Some examples in $\mathbb{R}^3$: the origin $\{\mathbf{0}\}$ (dimension 0), any line through the origin (dimension 1), any plane through the origin (dimension 2), and $\mathbb{R}^3$ itself (dimension 3) are all subspaces. Notice the requirement "through the origin" — a plane that misses the origin does not contain $\mathbf{0}$ and fails condition 1.

## Summary

- A **vector space** over $\mathbb{R}$ is a set with addition and scalar multiplication satisfying eight axioms.
- $\mathbb{R}^n$ — ordered $n$-tuples with component-wise operations — is the prototypical example; $\dim(\mathbb{R}^n) = n$.
- The **span** of a set is all linear combinations you can form from it.
- A set is **linearly independent** if no vector in it is a linear combination of the others.
- A **basis** is a linearly independent spanning set; all bases of $V$ have the same size, called the **dimension**.
- A **subspace** is a subset closed under addition, scalar multiplication, and containing $\mathbf{0}$.
- **Finite-dimensional** means the space has a finite basis.
