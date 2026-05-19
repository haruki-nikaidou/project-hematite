---
title: Field
summary: "A field is a commutative ring in which every non-zero element has a multiplicative inverse — division is always possible. This article defines fields, surveys the key examples, and introduces the concept of characteristic."
prerequisites: 
  - basis/math/abstract_algebra/ring
aliases: []
tags: ["Abstract Algebra", "Field Theory"]
updated: 2026-05-19
---

A [ring](./ring/) lets you add, subtract, and multiply freely, but not always divide. A **field** is a ring that closes this gap: every non-zero element can be inverted, so division is always available. The rationals $\mathbb{Q}$, reals $\mathbb{R}$, and complex numbers $\mathbb{C}$ are the fields you likely know best, but they are far from the only ones.

## The extra ingredient: multiplicative inverses

Recall that in a ring $(R, +, \cdot)$, the multiplicative operation only forms a monoid — inverses are not required. In the integers $\mathbb{Z}$, the element $2$ has no multiplicative inverse: there is no integer $x$ with $2x = 1$.

A field simply demands that every *non-zero* element has such an inverse. The zero element is excluded because $0 \cdot x = 0$ for any $x$ (as shown for rings), so no $x$ can satisfy $0 \cdot x = 1$.

## Definition

> **Definition.** A **field** is a commutative ring $(F, +, \cdot)$ such that $(F \setminus \{0\},\, \cdot,\, 1)$ is a group. In other words, every non-zero element $a \in F$ has a multiplicative inverse $a^{-1} \in F$ satisfying $a \cdot a^{-1} = 1$.

Spelling out all axioms, a field satisfies:

| Operation | Structure required |
|-----------|--------------------|
| $(F, +, 0)$ | Abelian group |
| $(F \setminus \{0\}, \cdot, 1)$ | Abelian group |
| $+$ and $\cdot$ | Both distributive laws hold |

Commutativity of multiplication is built into the definition: a field is always a commutative ring.

## Examples

**Rational numbers $\mathbb{Q}$.** For any $\frac{p}{q} \neq 0$, the inverse is $\frac{q}{p}$. Addition and multiplication of fractions are both commutative. $(\mathbb{Q}, +, \cdot)$ is a field.

**Real numbers $\mathbb{R}$.** Every non-zero real $a$ has inverse $\frac{1}{a}$. $(\mathbb{R}, +, \cdot)$ is a field.

**Complex numbers $\mathbb{C}$.** For $a + bi \neq 0$, the inverse is $\frac{a - bi}{a^2 + b^2}$. $(\mathbb{C}, +, \cdot)$ is a field.

**Integers modulo a prime $\mathbb{Z}/p\mathbb{Z}$.** Fix a prime $p$. The set $\{0, 1, \ldots, p-1\}$ with addition and multiplication performed modulo $p$ is a field. For example, in $\mathbb{Z}/5\mathbb{Z}$, the inverse of $2$ is $3$ because $2 \cdot 3 = 6 \equiv 1 \pmod{5}$. This is a **finite field**, also written $\mathbb{F}_p$.

**Non-example — integers $\mathbb{Z}$.** $\mathbb{Z}$ is a ring but not a field: $2$ has no integer inverse.

**Non-example — polynomials $\mathbb{R}[x]$.** The polynomial $x$ has no polynomial inverse: there is no polynomial $f$ with $x \cdot f(x) = 1$.

## Characteristic

Every field has a property called its **characteristic**, which captures how many times you must add the identity $1$ to itself before reaching $0$.

Formally, the **characteristic** of $F$ is the smallest positive integer $n$ such that

$$
\underbrace{1 + 1 + \cdots + 1}_{n} = 0 \tag{1}
$$

If no such $n$ exists, the characteristic is defined to be $0$.

The characteristic of a field is always either $0$ or a prime number. This is not an accident: if $n = ab$ with $1 \leq a, b < n$ both satisfied (1), then $(a \cdot 1)(b \cdot 1) = 0$ in the field, which would mean a product of two non-zero elements equals zero — impossible in a field because non-zero elements have inverses and can never multiply to zero.

| Field | Characteristic |
|-------|---------------|
| $\mathbb{Q}$ | $0$ |
| $\mathbb{R}$ | $0$ |
| $\mathbb{C}$ | $0$ |
| $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$ | $p$ |

Fields of characteristic $0$ contain a copy of $\mathbb{Q}$; fields of characteristic $p$ contain a copy of $\mathbb{F}_p$.

## Division as an operation

In a field, you can define division for any non-zero denominator:

$$
\frac{a}{b} \coloneqq a \cdot b^{-1} \qquad (b \neq 0) \tag{2}
$$

This makes fields the natural setting for solving linear equations: the equation $ax = b$ with $a \neq 0$ has the unique solution $x = a^{-1} \cdot b$. The existence and uniqueness of this solution both depend on the multiplicative inverse.

This is why linear algebra is typically built over a field: the ability to divide is what makes Gaussian elimination, determinants, and the rank-nullity theorem work cleanly.

## Summary

- A **field** is a commutative ring where every non-zero element has a multiplicative inverse, making division always possible (except by zero).
- The field axioms require two abelian groups — $(F, +, 0)$ and $(F \setminus \{0\}, \cdot, 1)$ — connected by distributivity.
- Key examples of infinite fields: $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$.
- Key examples of finite fields: $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$ for any prime $p$.
- The **characteristic** of a field is the smallest $n$ with $\underbrace{1 + \cdots + 1}_{n} = 0$; it is always $0$ or a prime.
- Fields are the right setting for linear algebra: division is what makes linear equations always solvable when the coefficient is non-zero.
