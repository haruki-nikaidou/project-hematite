---
title: The Newton–Leibniz Formula
summary: "The fundamental theorem of calculus has two halves: for f continuous on [a, b], the function F(x) = ∫_a^x f(t) dt is differentiable with F'(x) = f(x); and for any primitive G of f, ∫_a^b f(x) dx = G(b) − G(a). This checkpoint proves both halves — the first by applying the integral mean value theorem to the difference quotient, the second by combining the first with the 'primitives differ by a constant' lemma — and shows how Newton–Leibniz reduces evaluating integrals to finding antiderivatives."
prerequisites:
  - basis/math/calculus/riemann_integral/primitive
  - basis/math/calculus/riemann_integral/mean_value_theorem
  - basis/math/calculus/riemann_integral/additive
aliases: []
tags:
  - Calculus
  - Integration
updated: 2026-05-22
---

Before the **Newton–Leibniz formula** was understood, computing a definite integral $\int_a^b f(x)\,dx$ meant forming Riemann sums, taking a limit, and somehow identifying what that limit equalled — a process that had to be carried out from scratch for every new integrand. The formula, also called the **Fundamental Theorem of Calculus**, cuts through all of that: it says that integration and differentiation are inverse operations, so to evaluate $\int_a^b f(x)\,dx$ you only need to find a function whose derivative is $f$, then subtract its values at the endpoints. This single observation transforms pages of limit arguments into a one-line computation.

The theorem has two logically distinct halves. The first half shows that the integral with a variable upper limit is itself differentiable; the second half shows how any primitive (antiderivative) can be used to evaluate the integral. Together they form the deepest result in elementary calculus.

## Part 1: the integral with a variable upper limit is a primitive

Let $f$ be continuous on $[a, b]$. Because $f$ is continuous it is Riemann integrable on every subinterval, so the expression

$$
F(x) \coloneqq \int_a^x f(t)\,dt, \qquad x \in [a, b],
$$

is well defined. We call $F$ the **integral with variable upper limit**, and the claim is that $F$ is differentiable with $F'(x) = f(x)$ at every point of $[a, b]$.

### Proof of Part 1

Fix $x \in (a, b)$ and let $h \neq 0$ be small enough so that $x + h \in [a, b]$. By the [additivity of the integral](../additive/),

$$
F(x + h) - F(x) = \int_a^{x+h} f(t)\,dt - \int_a^x f(t)\,dt = \int_x^{x+h} f(t)\,dt.
$$

Dividing by $h$ gives the difference quotient

$$
\frac{F(x+h) - F(x)}{h} = \frac{1}{h}\int_x^{x+h} f(t)\,dt.
$$

Because $f$ is continuous on the interval between $x$ and $x+h$, the [mean value theorem for integrals](../mean_value_theorem/) guarantees the existence of a point $\xi_h$ between $x$ and $x + h$ such that

$$
\int_x^{x+h} f(t)\,dt = f(\xi_h)\cdot h.
$$

Substituting back,

$$
\frac{F(x+h) - F(x)}{h} = f(\xi_h).
$$

As $h \to 0$ the point $\xi_h$ is squeezed between $x$ and $x + h$, so $\xi_h \to x$. By continuity of $f$,

$$
f(\xi_h) \to f(x).
$$

Therefore the difference quotient converges to $f(x)$, which is exactly the definition of differentiability:

$$
F'(x) = f(x). \qquad \square
$$

The same argument applies at the endpoints $a$ and $b$ using one-sided limits. Part 1 tells you that every continuous function has a primitive, and it exhibits one explicitly: the integral with variable upper limit.

## Part 2: evaluating a definite integral via any primitive

**Part 2** of the Newton–Leibniz formula says that if $G$ is *any* primitive of $f$ on $[a, b]$ — that is, $G'(x) = f(x)$ for all $x \in [a, b]$ — then

$$
\int_a^b f(x)\,dx = G(b) - G(a).
$$

### Proof of Part 2

We already know from Part 1 that $F(x) = \int_a^x f(t)\,dt$ is a primitive of $f$. Since $G$ is also a primitive of $f$, the difference $G - F$ satisfies

$$
(G - F)'(x) = G'(x) - F'(x) = f(x) - f(x) = 0
$$

for all $x \in [a, b]$. By the theorem that [primitives differ by a constant](../primitive/) (which follows from Lagrange's mean value theorem), a function with zero derivative on an interval is constant. So there exists $C \in \mathbb{R}$ with

$$
G(x) = F(x) + C \quad \text{for all } x \in [a, b].
$$

Evaluate at both endpoints. At $x = a$:

$$
G(a) = F(a) + C = \int_a^a f(t)\,dt + C = 0 + C = C.
$$

At $x = b$:

$$
G(b) = F(b) + C = \int_a^b f(t)\,dt + C.
$$

Subtracting the first equation from the second:

$$
G(b) - G(a) = \int_a^b f(t)\,dt. \qquad \square
$$

## The bracket notation

It is standard to write

$$
\bigl[G(x)\bigr]_a^b \coloneqq G(b) - G(a).
$$

This notation is compact and reduces the risk of sign errors. With it, the Newton–Leibniz formula reads

$$
\int_a^b f(x)\,dx = \bigl[G(x)\bigr]_a^b,
$$

where $G$ is any primitive of $f$. You may add an arbitrary constant to $G$ without affecting the result, since the constant cancels in $G(b) - G(a)$; this is why the choice of primitive does not matter.

## Worked examples

### Example 1: $\int_0^1 x^2\,dx$

A primitive of $f(x) = x^2$ is $G(x) = \dfrac{x^3}{3}$. Applying Newton–Leibniz:

$$
\int_0^1 x^2\,dx = \left[\frac{x^3}{3}\right]_0^1 = \frac{1^3}{3} - \frac{0^3}{3} = \frac{1}{3}.
$$

### Example 2: $\int_0^\pi \sin x\,dx$

A primitive of $\sin x$ is $-\cos x$. Therefore

$$
\int_0^\pi \sin x\,dx = \bigl[-\cos x\bigr]_0^\pi = (-\cos\pi) - (-\cos 0) = 1 + 1 = 2.
$$

Geometrically, the result $2$ is the area of one arch of the sine curve above the $x$-axis, which is a satisfying sanity check.

### Example 3: $\int_1^e \frac{1}{x}\,dx$

A primitive of $\dfrac{1}{x}$ on $(0, \infty)$ is $\ln x$. Therefore

$$
\int_1^e \frac{1}{x}\,dx = \bigl[\ln x\bigr]_1^e = \ln e - \ln 1 = 1 - 0 = 1.
$$

This confirms the geometric meaning of $e$: it is precisely the number for which the area under $y = 1/x$ from $1$ to $e$ equals $1$.

## Summary

- **Part 1 (FTC1)**: If $f$ is continuous on $[a, b]$, then $F(x) \coloneqq \int_a^x f(t)\,dt$ is differentiable and $F'(x) = f(x)$. In particular, every continuous function has a primitive.
- **Part 2 (FTC2)**: If $G$ is any primitive of $f$ on $[a, b]$, then $\int_a^b f(x)\,dx = G(b) - G(a) = \bigl[G(x)\bigr]_a^b$.
- The proof of Part 1 uses the [mean value theorem for integrals](../mean_value_theorem/) to identify the limit of the difference quotient with $f(x)$.
- The proof of Part 2 uses the fact that two primitives of the same function differ by a constant (from the [primitives checkpoint](../primitive/)), then evaluates that constant by plugging in $x = a$.
- The **bracket notation** $\bigl[G(x)\bigr]_a^b = G(b) - G(a)$ is a compact shorthand for the evaluation step.
- The formula completely decouples the two problems that initially seemed inseparable: computing areas (definite integrals) and finding antiderivatives (primitives). To integrate, you only need to differentiate backwards.
