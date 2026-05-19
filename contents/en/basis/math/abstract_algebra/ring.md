---
title: Ring
summary: "A ring is a set equipped with two operations — addition and multiplication — linked by distributivity. This article defines rings, explores concrete examples, and distinguishes commutative from non-commutative rings."
prerequisites: 
  - basis/math/abstract_algebra/group
aliases: []
tags: ["Abstract Algebra", "Ring Theory"]
updated: 2026-05-19
---

Numbers support two operations, not one. You add them and you multiply them, and multiplication distributes over addition: $a(b + c) = ab + ac$. A **ring** is the algebraic structure that captures exactly this two-operation arrangement, stripped of everything that is specific to numbers.

## Two operations, one set

Everything you have seen so far — [semigroups, monoids](../../../../elementry/math/semigroup_monoid/), [groups](./group/) — involves one binary operation on a set. A ring layers a second operation on top of the same set and imposes a rule connecting the two.

The two operations are called **addition** (written $+$) and **multiplication** (written $\cdot$ or by juxtaposition). Their names are chosen by analogy with ordinary arithmetic, but the operations themselves can be anything satisfying the axioms below.

## Definition

> **Definition.** A **ring** is a triple $(R, +, \cdot)$ where $R$ is a set and $+$, $\cdot$ are binary operations on $R$ satisfying:
>
> 1. $(R, +, 0)$ is an **abelian group** (with identity element $0$, called the *additive identity*).
> 2. $(R, \cdot, 1)$ is a **monoid** (with identity element $1$, called the *multiplicative identity*).
> 3. Multiplication distributes over addition: for all $a, b, c \in R$,
>
> $$
> a \cdot (b + c) = a \cdot b + a \cdot c \tag{1}
> $$
>
> $$
> (a + b) \cdot c = a \cdot c + b \cdot c \tag{2}
> $$

Breaking this down:

- The addition operation forms an **abelian group**: you can add, subtract (using additive inverses, written $-a$), and the order of addition never matters.
- The multiplication operation forms a **monoid**: you can multiply, there is a multiplicative identity $1$, and multiplication is associative — but multiplication does *not* need to have inverses.
- **Distributivity** is the bridge between the two operations. Without it, addition and multiplication would be two independent, unrelated monoids on the same set.

## Examples

**Integers.** $(\mathbb{Z}, +, \cdot)$ is the prototypical ring. Addition forms an abelian group with identity $0$ and inverses $-n$. Multiplication is associative with identity $1$. Distributivity holds by basic arithmetic.

**Real numbers.** $(\mathbb{R}, +, \cdot)$ is a ring. In fact it has more structure — every non-zero element has a multiplicative inverse — but it is a ring as a baseline.

**Polynomials.** Let $\mathbb{R}[x]$ denote the set of all polynomials in one variable with real coefficients. You can add two polynomials term by term and multiply them by the standard rule. The zero polynomial is the additive identity and the constant polynomial $1$ is the multiplicative identity. So $(\mathbb{R}[x], +, \cdot)$ is a ring.

**Square matrices.** Let $M_n(\mathbb{R})$ be the set of all $n \times n$ real matrices. Matrix addition is component-wise (abelian group), matrix multiplication is associative with the identity matrix $I_n$ as identity (monoid), and matrix multiplication distributes over addition. So $(M_n(\mathbb{R}), +, \cdot)$ is a ring.

## Commutativity is not guaranteed

In all the examples above, integers and polynomials satisfy $a \cdot b = b \cdot a$ — multiplication is commutative. But the matrix ring $M_n(\mathbb{R})$ does not: in general, $AB \neq BA$.

A ring where $a \cdot b = b \cdot a$ holds for all elements is called a **commutative ring**. The integers $\mathbb{Z}$ and the polynomials $\mathbb{R}[x]$ are commutative rings. The matrix ring $M_n(\mathbb{R})$ for $n \geq 2$ is non-commutative.

The axioms for a ring only require that addition commutes, not multiplication. When working in a non-commutative ring, the two distributive laws (1) and (2) are both needed precisely because left-multiplying and right-multiplying can give different results.

## What about division?

A ring does not require multiplicative inverses. In $\mathbb{Z}$, the integer $2$ has no multiplicative inverse (since $\frac{1}{2} \notin \mathbb{Z}$). Division is not always possible in a ring.

This is intentional. Rings model settings where you can add, subtract, and multiply freely, but cannot always divide. Polynomials are a perfect illustration: you can add, subtract, and multiply polynomials freely, but dividing one polynomial by another may not yield a polynomial.

When you need division too, you restrict to the richer structure called a [field](./field/).

## Zero annihilates everything

One consequence of the axioms is that multiplying any element by the additive identity $0$ always gives $0$:

$$
a \cdot 0 = 0 \qquad \text{for all } a \in R \tag{3}
$$

This follows from distributivity: $a \cdot 0 = a \cdot (0 + 0) = a \cdot 0 + a \cdot 0$. Subtracting $a \cdot 0$ from both sides gives $0 = a \cdot 0$. This property is not an additional axiom — it is a *theorem* derived from the three axioms above.

## Summary

- A **ring** $(R, +, \cdot)$ is a set with two binary operations: addition (forming an abelian group) and multiplication (forming a monoid), connected by the distributive laws.
- Rings allow free addition, subtraction, and multiplication, but do not require division.
- A ring is **commutative** if $a \cdot b = b \cdot a$ for all elements; integers and polynomials are commutative, matrices are generally not.
- The multiplicative identity $1$ and additive identity $0$ are distinct provided the ring has more than one element.
- Multiplying any element by $0$ yields $0$ — a theorem, not an axiom.
- When every non-zero element also has a multiplicative inverse, the ring gains enough structure to support division and becomes a [field](./field/).
