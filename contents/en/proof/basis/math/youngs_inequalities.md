---
title: Young's Inequality
summary: "Proves Young's inequality ab ≤ aᵖ/p + bᵍ/q for non-negative a, b and conjugate exponents 1/p + 1/q = 1, p, q > 1, by applying the convexity of exp combined with Jensen's inequality."
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/functions/log
  - basis/math/calculus/differential/jensons_inequality
aliases: []
tags:
  - Proof
  - Inequalities
updated: 2026-05-20
---

Young's inequality is the small lever that moves a surprising amount of analysis: it turns a *product* of two numbers into a *sum* of their powers, and that single trade is exactly what you need to bootstrap [Hölder's inequality](../holders_inequalities/) and, through it, [Minkowski's inequality](../minkowskis_inequalities/). The proof is one line of [convexity](../../../../basis/math/calculus/differential/jensons_inequality/) once you set it up correctly.

## Conjugate exponents

Two real numbers $p, q > 1$ are **conjugate exponents** when

$$
\frac{1}{p} + \frac{1}{q} = 1.
$$

Equivalently, $q = \dfrac{p}{p-1}$. The pair $(2, 2)$ is conjugate to itself; $(1, \infty)$ is the limiting case usually treated separately. The defining identity says $1/p$ and $1/q$ are weights that sum to $1$ — that is what lets us read the proof as a convex combination.

## The theorem

**Theorem (Young's Inequality).** Let $p, q > 1$ be conjugate exponents and let $a, b \geq 0$. Then

$$
ab \;\leq\; \frac{a^p}{p} + \frac{b^q}{q}, \tag{1}
$$

with equality if and only if $a^p = b^q$.

## Proof via convexity of the exponential

If $a = 0$ or $b = 0$ the left side is $0$ and the right side is non-negative, so $(1)$ holds. Assume therefore $a, b > 0$.

The key is the [exponential function](../../../../basis/math/analysis/functions/exp/): it is convex on all of $\mathbb{R}$, so the two-point case of [Jensen's inequality](../../../../basis/math/calculus/differential/jensons_inequality/) gives, for any reals $x, y$ and weights $1/p, 1/q$ summing to $1$,

$$
\exp\!\left(\frac{1}{p}\,x + \frac{1}{q}\,y\right) \;\leq\; \frac{1}{p}\,e^{x} + \frac{1}{q}\,e^{y}. \tag{2}
$$

Now choose the inputs so the exponentials become $a^p$ and $b^q$. Using the [logarithm](../../../../basis/math/analysis/functions/log/), set

$$
x \coloneqq p \ln a, \qquad y \coloneqq q \ln b.
$$

Then $e^{x} = a^{p}$ and $e^{y} = b^{q}$, while the argument on the left of $(2)$ collapses:

$$
\frac{1}{p}\,x + \frac{1}{q}\,y \;=\; \ln a + \ln b \;=\; \ln(ab),
$$

so $\exp\!\big(\tfrac{1}{p}x + \tfrac{1}{q}y\big) = ab$. Substituting into $(2)$ yields exactly

$$
ab \;\leq\; \frac{a^p}{p} + \frac{b^q}{q}. \quad \square
$$

## The equality case

The exponential is *strictly* convex, so $(2)$ is an equality if and only if its two inputs coincide: $x = y$, i.e. $p \ln a = q \ln b$. Exponentiating, this is $a^p = b^q$. Hence equality in $(1)$ holds precisely when $a^p = b^q$.

## Summary

- **Conjugate exponents** $p, q > 1$ satisfy $1/p + 1/q = 1$; the two reciprocals act as weights summing to $1$.
- **Young's inequality**: $ab \leq \dfrac{a^p}{p} + \dfrac{b^q}{q}$ for $a, b \geq 0$.
- **Proof**: write $ab = \exp(\tfrac{1}{p}\cdot p\ln a + \tfrac{1}{q}\cdot q\ln b)$ and apply convexity of $\exp$ — a single use of the two-point Jensen inequality.
- **Equality** holds iff $a^p = b^q$, because $\exp$ is strictly convex.
- This inequality is the engine behind [Hölder's inequality](../holders_inequalities/).
