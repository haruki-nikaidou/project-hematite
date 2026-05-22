---
title: Primitives (Antiderivatives)
summary: "A primitive of f on an interval I is a differentiable function F with F'(x) = f(x) for every x ∈ I; any two primitives of the same f differ by a constant. This checkpoint defines the primitive, proves the 'differs by a constant' theorem from Lagrange's mean value theorem, introduces the indefinite-integral notation ∫ f(x) dx = F(x) + C, and explains the difference in nature between the indefinite integral (a family of functions) and the definite integral (a number)."
prerequisites:
  - basis/math/calculus/differential/differentiable_function
  - basis/math/calculus/differential/lagranges_finite-increment_theorem
aliases: []
tags:
  - Calculus
  - Integration
  - Differentiation
updated: 2026-05-22
---

Differentiation takes a function and produces its rate of change. Primitives reverse the process: you are given a rate of change and asked to reconstruct the original function. This inverse problem is the starting point for integration theory, and it arises naturally whenever you compute distance from velocity, displacement from acceleration, or a quantity from its known rate of growth.

## Definition

**Definition.** Let $f$ be defined on an interval $I \subseteq \mathbb{R}$. A [differentiable function](../../differential/differentiable_function/) $F : I \to \mathbb{R}$ is called a **primitive** (or **antiderivative**) of $f$ on $I$ if

$$
F'(x) = f(x) \quad \text{for every } x \in I.
$$

**Examples.**
- $F(x) = \tfrac{x^3}{3}$ is a primitive of $f(x) = x^2$ on $\mathbb{R}$, since $\bigl(\tfrac{x^3}{3}\bigr)' = x^2$.
- $F(x) = \sin x$ is a primitive of $f(x) = \cos x$ on $\mathbb{R}$.
- $F(x) = \ln x$ is a primitive of $f(x) = \tfrac{1}{x}$ on $(0, \infty)$.
- The function $f(x) = \operatorname{sgn}(x)$ (the sign function) has no primitive on any interval containing $0$, because a derivative cannot have a jump discontinuity (by Darboux's theorem).

## Primitives differ by a constant

Once you have one primitive $F$, you get infinitely many: $F(x) + C$ is also a primitive for every constant $C \in \mathbb{R}$. The following theorem says these are the **only** primitives.

**Theorem.** If $F$ and $G$ are both primitives of $f$ on an interval $I$, then $G(x) - F(x) = C$ for some constant $C \in \mathbb{R}$.

**Proof.** Set $H \coloneqq G - F$. Then for every $x \in I$,

$$
H'(x) = G'(x) - F'(x) = f(x) - f(x) = 0.
$$

Apply [Lagrange's Mean Value Theorem](../../differential/lagranges_finite-increment_theorem/) to $H$ on any sub-interval $[x_1, x_2] \subset I$: there exists $c \in (x_1, x_2)$ with

$$
H(x_2) - H(x_1) = H'(c)(x_2 - x_1) = 0 \cdot (x_2 - x_1) = 0.
$$

Since $x_1, x_2 \in I$ were arbitrary, $H$ takes the same value at every two points of $I$, so $H$ is constant on $I$. $\square$

**Why the interval hypothesis matters.** On a disconnected domain (a union of two disjoint open intervals, say), a function with zero derivative need not be globally constant — it can take different constant values on each connected component. Primitives on disconnected domains are unique only up to one constant per component. This checkpoint assumes $I$ is an interval (connected).

## The indefinite integral

The notation for the family of all primitives of $f$ is the **indefinite integral**:

$$
\int f(x)\,dx \;\coloneqq\; F(x) + C,
$$

where $F$ is any one primitive of $f$ and $C \in \mathbb{R}$ is an arbitrary constant. The symbol $\int \cdots dx$ is read "the indefinite integral of … with respect to $x$".

The $+C$ is not optional decoration: it records the fact that there is a whole family of primitives, all differing by a constant. Dropping it would mean claiming a specific function rather than the general family.

## Indefinite vs. definite integral

These two uses of the integral sign refer to fundamentally different objects:

| | **Indefinite integral** $\int f(x)\,dx$ | **Definite integral** $\int_a^b f(x)\,dx$ |
|---|---|---|
| **Result** | A family of functions $F(x) + C$ | A real number |
| **Depends on** | The integrand $f$ and the variable $x$ | The integrand $f$ and the bounds $a, b$ |
| **Arbitrary constant** | Yes — $C$ is undetermined | No — the value is fixed |
| **Requires** | A primitive to exist | Riemann integrability of $f$ |

The Newton–Leibniz formula (proved in the next checkpoint) connects them: if $f$ is continuous and $F$ is any primitive of $f$, then $\int_a^b f(x)\,dx = F(b) - F(a)$.

## Basic table of primitives

The following primitives follow directly from differentiating the right-hand side. Each holds on an interval where the right-hand side is defined.

| $f(x)$ | $\int f(x)\,dx$ | Notes |
|---|---|---|
| $x^n$ ($n \neq -1$) | $\dfrac{x^{n+1}}{n+1} + C$ | All $n \in \mathbb{R}$, $x > 0$ if $n \notin \mathbb{Z}$ |
| $\dfrac{1}{x}$ | $\ln\lvert x\rvert + C$ | $x \neq 0$; one constant per sign of $x$ |
| $e^x$ | $e^x + C$ | |
| $\sin x$ | $-\cos x + C$ | |
| $\cos x$ | $\sin x + C$ | |
| $\dfrac{1}{1+x^2}$ | $\arctan x + C$ | |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x + C$ | $\lvert x\rvert < 1$ |
| $\sqrt{x}$ ($x > 0$) | $\dfrac{2}{3}x^{3/2} + C$ | special case of $x^n$ with $n = \frac{1}{2}$ |

You can verify each entry by differentiating the right-hand side. For instance, $(\ln\lvert x\rvert)' = \tfrac{1}{x}$ for $x \neq 0$, and $(-\cos x)' = \sin x$.

## Linearity of the indefinite integral

Because differentiation is linear, so is taking primitives.

**Theorem (Linearity).** If $F$ is a primitive of $f$ and $G$ is a primitive of $g$ on $I$, then for any constants $\alpha, \beta \in \mathbb{R}$,

$$
\int \bigl[\alpha f(x) + \beta g(x)\bigr]\,dx \;=\; \alpha F(x) + \beta G(x) + C.
$$

**Proof.** $(\alpha F + \beta G)' = \alpha F' + \beta G' = \alpha f + \beta g$. $\square$

**Example.** Compute $\displaystyle\int (3x^2 - 5\cos x)\,dx$.

By linearity and the table:

$$
\int (3x^2 - 5\cos x)\,dx \;=\; 3\cdot\frac{x^3}{3} - 5\sin x + C \;=\; x^3 - 5\sin x + C.
$$

**Example.** Compute $\displaystyle\int \frac{x^3 + 2\sqrt{x}}{x}\,dx$ for $x > 0$.

Simplify the integrand first:

$$
\frac{x^3 + 2\sqrt{x}}{x} = x^2 + \frac{2}{\sqrt{x}} = x^2 + 2x^{-1/2}.
$$

Then by linearity:

$$
\int \!\left(x^2 + 2x^{-1/2}\right)dx = \frac{x^3}{3} + 2\cdot\frac{x^{1/2}}{1/2} + C = \frac{x^3}{3} + 4\sqrt{x} + C.
$$

## Summary

- A **primitive** (antiderivative) of $f$ on an interval $I$ is a differentiable function $F$ with $F' = f$ on $I$.
- Any two primitives of $f$ on $I$ differ by a constant: if $F' = G' = f$, then $G = F + C$ for some $C \in \mathbb{R}$. This follows from Lagrange's MVT applied to $G - F$.
- The **indefinite integral** $\int f(x)\,dx \coloneqq F(x) + C$ denotes the entire family of primitives; the $+C$ is essential.
- The indefinite integral is a **family of functions**; the definite integral $\int_a^b f$ is a **number**. The Newton–Leibniz formula connects them.
- **Linearity**: $\int (\alpha f + \beta g)\,dx = \alpha \int f\,dx + \beta \int g\,dx$ (up to the constant).
- The standard table of primitives — powers, $e^x$, $\sin$, $\cos$, $1/x$, inverse trig — is built by reversing known differentiation formulas.
