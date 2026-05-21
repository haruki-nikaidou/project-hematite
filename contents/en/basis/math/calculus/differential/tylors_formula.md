---
title: Taylor's Formula
summary: "Taylor's formula approximates an n-times differentiable function near x₀ by a degree-n polynomial whose coefficients are scaled derivatives of f at x₀, with an explicit remainder term. This checkpoint proves Taylor's formula with the Lagrange form of the remainder and shows how it underlies the power-series expansions of the elementary functions."
prerequisites:
  - basis/math/calculus/differential/higher_order_dif
  - basis/math/calculus/differential/lagranges_finite-increment_theorem
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

The [Mean Value Theorem](../lagranges_finite-increment_theorem/) says $f(x) = f(x_0) + f'(c)(x - x_0)$ for some unknown $c$ between $x$ and $x_0$. This is a linear approximation with an imprecise remainder. Taylor's Formula pushes the idea to all orders: approximate $f$ by a degree-$n$ polynomial and express the leftover error explicitly.

## The Taylor polynomial

**Definition.** The **Taylor polynomial of degree $n$ of $f$ at $x_0$** is

$$
P_n(x) \;\coloneqq\; \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}\,(x - x_0)^k
= f(x_0) + f'(x_0)(x-x_0) + \frac{f''(x_0)}{2!}(x-x_0)^2 + \cdots + \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n.
$$

The coefficients $\dfrac{f^{(k)}(x_0)}{k!}$ are the unique values that make $P_n^{(k)}(x_0) = f^{(k)}(x_0)$ for $k = 0, 1, \ldots, n$: the polynomial matches $f$ and all its derivatives up to order $n$ at $x_0$.

## Taylor's formula with the Lagrange remainder

**Theorem (Taylor's Formula).** Let $f$ be $(n+1)$-times differentiable on an open interval containing $x_0$ and $x$. Then

$$
f(x) \;=\; P_n(x) \;+\; R_n(x), \tag{1}
$$

where the **Lagrange remainder** is

$$
R_n(x) \;=\; \frac{f^{(n+1)}(\xi)}{(n+1)!}\,(x - x_0)^{n+1} \tag{2}
$$

for some $\xi$ strictly between $x_0$ and $x$.

## Proof

Fix $x \neq x_0$ and let $J$ be the closed interval with endpoints $x_0$ and $x$. Define

$$
F(t) \;\coloneqq\; f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}(x - t)^k, \qquad G(t) \;\coloneqq\; (x - t)^{n+1}.
$$

Both are continuous on $J$ and differentiable on the interior of $J$. Observe:
- $F(x) = 0$ and $G(x) = 0$.
- $F(x_0) = f(x) - P_n(x)$ and $G(x_0) = (x - x_0)^{n+1} \neq 0$.

**Telescoping derivative of $F$.** Differentiating using the [product rule](../basic_roles_of_dif/) on each term $\tfrac{f^{(k)}(t)}{k!}(x-t)^k$:

$$
\frac{d}{dt}\left[\frac{f^{(k)}(t)}{k!}(x-t)^k\right]
= \frac{f^{(k+1)}(t)}{k!}(x-t)^k \;-\; \frac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}.
$$

Summing from $k = 0$ to $n$, the sum telescopes — each term $\tfrac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}$ cancels with the $k \mapsto k-1$ instance of the first part — leaving only the $k = n$ term of the first summand:

$$
F'(t) \;=\; -\frac{f^{(n+1)}(t)}{n!}(x - t)^n, \qquad G'(t) \;=\; -(n+1)(x-t)^n.
$$

**Applying Rolle's theorem.** Form the auxiliary function

$$
\phi(t) \;\coloneqq\; F(t) - \frac{F(x_0)}{G(x_0)}\,G(t).
$$

Then $\phi(x_0) = 0$ and $\phi(x) = F(x) - \tfrac{F(x_0)}{G(x_0)} \cdot 0 = 0$. By [Rolle's Theorem](../rolles_theorem/), there exists $\xi$ strictly between $x_0$ and $x$ with $\phi'(\xi) = 0$:

$$
F'(\xi) - \frac{F(x_0)}{G(x_0)}\,G'(\xi) = 0.
$$

Since $\xi \neq x$ we have $(x - \xi)^n \neq 0$, so substituting $F'$ and $G'$:

$$
-\frac{f^{(n+1)}(\xi)}{n!}(x-\xi)^n + \frac{F(x_0)}{G(x_0)}(n+1)(x-\xi)^n = 0
\;\;\Longrightarrow\;\;
\frac{F(x_0)}{G(x_0)} = \frac{f^{(n+1)}(\xi)}{(n+1)!}.
$$

Multiplying through by $G(x_0) = (x-x_0)^{n+1}$ gives $F(x_0) = R_n(x)$ with the form in $(2)$. $\square$

## Standard Maclaurin expansions

When $x_0 = 0$ the formula is called a **Maclaurin expansion**. The following hold for all $x \in \mathbb{R}$ (sending $n \to \infty$ and verifying $R_n \to 0$):

$$
e^x \;=\; \sum_{k=0}^{\infty} \frac{x^k}{k!} \;=\; 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

$$
\sin x \;=\; \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k+1)!} x^{2k+1} \;=\; x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots
$$

$$
\cos x \;=\; \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!} x^{2k} \;=\; 1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots
$$

$$
\ln(1+x) \;=\; \sum_{k=1}^{\infty} \frac{(-1)^{k-1}}{k} x^k \;=\; x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots \quad (-1 < x \leq 1)
$$

$$
(1+x)^\alpha \;=\; \sum_{k=0}^{\infty} \binom{\alpha}{k} x^k \;=\; 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \cdots \quad (|x| < 1)
$$

where the generalised binomial coefficient is $\binom{\alpha}{k} \coloneqq \dfrac{\alpha(\alpha-1)\cdots(\alpha-k+1)}{k!}$.

## Using the remainder to estimate error

The Lagrange form $(2)$ gives a concrete error bound. If $|f^{(n+1)}(t)| \leq M$ for all $t$ between $x_0$ and $x$, then

$$
|R_n(x)| \;\leq\; \frac{M}{(n+1)!}\,|x - x_0|^{n+1}.
$$

**Example.** Approximate $e^{0.1}$ using $P_3$ at $x_0 = 0$.

$$
P_3(0.1) \;=\; 1 + 0.1 + \frac{0.01}{2} + \frac{0.001}{6} \;\approx\; 1.10516\overline{6}.
$$

The remainder satisfies $|R_3(0.1)| \leq \dfrac{e^{0.1}}{4!}(0.1)^4 < \dfrac{3}{24} \cdot 10^{-4} \approx 1.25 \times 10^{-5}$. The approximation is accurate to five decimal places.

## Limit computations

Taylor's Formula makes indeterminate limits mechanical. To compute $\lim_{x \to 0} \dfrac{\sin x - x}{x^3}$, expand $\sin x = x - \dfrac{x^3}{6} + O(x^5)$:

$$
\frac{\sin x - x}{x^3} \;=\; \frac{-x^3/6 + O(x^5)}{x^3} \;\to\; -\frac{1}{6}.
$$

## Summary

- The **Taylor polynomial** $P_n$ of degree $n$ at $x_0$ matches $f$ and all its derivatives up to order $n$ at $x_0$.
- **Taylor's Formula**: $f(x) = P_n(x) + R_n(x)$ with the **Lagrange remainder** $R_n(x) = \dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$ for some $\xi$ between $x_0$ and $x$.
- **Proof idea**: define an auxiliary function whose value at $x_0$ is the remainder; apply the Cauchy MVT to cancel all but the top-order derivative term.
- The Lagrange remainder gives a bound $|R_n(x)| \leq \dfrac{M}{(n+1)!}|x-x_0|^{n+1}$ when $|f^{(n+1)}| \leq M$.
- Standard power series for $e^x$, $\sin x$, $\cos x$, $\ln(1+x)$, and $(1+x)^\alpha$ follow by letting $n \to \infty$.
