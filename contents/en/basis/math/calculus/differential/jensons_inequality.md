---
title: Jensen's Inequality
summary: "If f is convex on an interval and x₁, ..., xₙ lie in the interval with non-negative weights λᵢ summing to 1, then f(∑ λᵢxᵢ) ≤ ∑ λᵢf(xᵢ). This checkpoint proves Jensen's inequality by induction on n from the two-point definition of convexity, and identifies the equality case for strictly convex f."
prerequisites:
  - basis/math/calculus/differential/convex
aliases: []
tags:
  - Calculus
  - Convexity
  - Inequalities
updated: 2026-05-20
---

The [definition of convexity](../convex/) says that a weighted average of two inputs maps to a value at most the weighted average of the outputs. Jensen's inequality extends this from two points to any finite number of points — and it does so by the simplest possible argument: induction.

## The theorem

**Theorem (Jensen's Inequality).** Let $I \subseteq \mathbb{R}$ be an interval, $f : I \to \mathbb{R}$ convex, $n \geq 1$. Suppose $x_1, \ldots, x_n \in I$ and $\lambda_1, \ldots, \lambda_n \geq 0$ with $\sum_{i=1}^n \lambda_i = 1$. Then

$$
f\!\left(\sum_{i=1}^{n} \lambda_i x_i\right) \;\leq\; \sum_{i=1}^{n} \lambda_i f(x_i). \tag{1}
$$

The left side applies $f$ to the weighted average of the $x_i$; the right side is the weighted average of the function values.

## Proof by induction

**Base case $n = 1$.** Both sides equal $f(x_1)$. $\checkmark$

**Base case $n = 2$.** This is exactly the definition of convexity:
$f(\lambda_1 x_1 + \lambda_2 x_2) \leq \lambda_1 f(x_1) + \lambda_2 f(x_2)$ with $\lambda_1 + \lambda_2 = 1$. $\checkmark$

**Inductive step.** Assume $(1)$ holds for some $n \geq 2$; we prove it for $n + 1$.

Let $x_1, \ldots, x_{n+1} \in I$ and $\lambda_1, \ldots, \lambda_{n+1} \geq 0$ with $\sum_{i=1}^{n+1} \lambda_i = 1$.

If $\lambda_{n+1} = 1$ then all other weights are zero and both sides equal $f(x_{n+1})$. So assume $\lambda_{n+1} < 1$, meaning $\mu \coloneqq 1 - \lambda_{n+1} > 0$.

Define $\mu_i \coloneqq \lambda_i / \mu$ for $i = 1, \ldots, n$. Then $\mu_i \geq 0$ and $\sum_{i=1}^n \mu_i = 1$, so $z \coloneqq \sum_{i=1}^n \mu_i x_i \in I$ (an interval is closed under convex combinations). Rewrite the left side:

$$
\sum_{i=1}^{n+1} \lambda_i x_i \;=\; \mu z + \lambda_{n+1} x_{n+1},
\qquad \mu + \lambda_{n+1} = 1.
$$

Apply the two-point convexity inequality (base case $n = 2$) to $z$ and $x_{n+1}$ with weights $\mu$ and $\lambda_{n+1}$:

$$
f\!\left(\sum_{i=1}^{n+1} \lambda_i x_i\right)
= f(\mu z + \lambda_{n+1} x_{n+1})
\leq \mu f(z) + \lambda_{n+1} f(x_{n+1}).
$$

Apply the inductive hypothesis to $z = \sum_{i=1}^n \mu_i x_i$ with weights $\mu_i$:

$$
f(z) \;\leq\; \sum_{i=1}^n \mu_i f(x_i).
$$

Combining, and substituting $\mu_i = \lambda_i / \mu$:

$$
f\!\left(\sum_{i=1}^{n+1} \lambda_i x_i\right)
\;\leq\; \mu \sum_{i=1}^n \frac{\lambda_i}{\mu} f(x_i) + \lambda_{n+1} f(x_{n+1})
\;=\; \sum_{i=1}^{n+1} \lambda_i f(x_i). \quad \square
$$

## Equality case

**Proposition.** If $f$ is *strictly* convex and $\lambda_i > 0$ for all $i$, then equality holds in $(1)$ if and only if $x_1 = x_2 = \cdots = x_n$.

*Proof sketch.* In the inductive step the two-point inequality is strict unless $z = x_{n+1}$, and the inductive hypothesis is strict unless all $x_1, \ldots, x_n$ are equal. Chasing through the induction shows that any strict step forces strict inequality in the conclusion. $\square$

## Applications

**Arithmetic–geometric mean inequality.** Take $f(t) = -\ln t$ (strictly convex on $(0, \infty)$) and uniform weights $\lambda_i = 1/n$:

$$
-\ln\!\left(\frac{x_1 + \cdots + x_n}{n}\right) \;\leq\; \frac{-\ln x_1 - \cdots - \ln x_n}{n} \;=\; -\ln\!\left(x_1 \cdots x_n\right)^{1/n}.
$$

Negating and exponentiating recovers the AM–GM inequality:

$$
\frac{x_1 + \cdots + x_n}{n} \;\geq\; (x_1 \cdots x_n)^{1/n}.
$$

**Log-sum inequality.** Take $f(t) = t \ln t$ (convex on $(0,\infty)$); Jensen's inequality underlies the nonnegativity of KL divergence in information theory.

## Summary

- **Jensen's Inequality**: for convex $f$ and weights $\lambda_i \geq 0$ summing to $1$,
  $$f\!\left(\sum \lambda_i x_i\right) \leq \sum \lambda_i f(x_i).$$
- **Proof**: induction on $n$; the base case $n = 2$ is the definition of convexity; the inductive step peels off the last point and applies the two-point inequality.
- **Equality**: when $f$ is strictly convex and all weights are positive, equality holds iff all $x_i$ are equal.
- **AM–GM** is a direct corollary: apply Jensen to $f = -\ln$ with uniform weights.
