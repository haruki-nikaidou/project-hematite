---
title: Mean Value Theorem for Integrals
summary: "If f is continuous on [a, b], there exists ξ ∈ [a, b] with ∫_a^b f(x) dx = f(ξ) (b − a) — the integral equals the value at some intermediate point times the interval length. This checkpoint proves the theorem by combining the monotonicity bound m(b − a) ≤ ∫ f ≤ M(b − a) with the Intermediate Value Theorem, presents the weighted form ∫ f g = f(ξ) ∫ g for non-negative weight g, and interprets the result geometrically as 'average value of f on [a, b]'."
prerequisites:
  - basis/math/calculus/riemann_integral/monotonicity_of_integral
  - basis/math/calculus/continuous_function/intermediate_value_theorem
aliases: []
tags:
  - Calculus
  - Integration
  - Mean Value Theorems
updated: 2026-05-22
---

If you drive for two hours and cover 120 km, your average speed was 60 km/h. At some instant you were travelling at exactly that average. The integral version of this fact says: the average value of a continuous function is actually attained at some point in the interval. This is the **Mean Value Theorem for integrals**, and it is the key ingredient in proving that the variable-upper-limit function is differentiable.

## Statement

**Theorem (Mean Value Theorem for Integrals).** Let $f : [a, b] \to \mathbb{R}$ be [continuous](../../continuous_function/continuous/). Then there exists $\xi \in [a, b]$ such that

$$
\int_a^b f(x)\,dx \;=\; f(\xi)\,(b - a).
$$

Equivalently, the **average value** of $f$ on $[a, b]$, defined as $\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$, is attained by $f$ at some interior point.

## Proof

Since $f$ is continuous on the closed bounded interval $[a, b]$, it attains its minimum $m \coloneqq \min_{[a,b]} f$ and its maximum $M \coloneqq \max_{[a,b]} f$ (by the Extreme Value Theorem). By [monotonicity of the integral](../monotonicity_of_integral/), comparing $f$ with the constant functions $m$ and $M$ gives

$$
m(b - a) \;\leq\; \int_a^b f(x)\,dx \;\leq\; M(b - a).
$$

Dividing by $b - a > 0$:

$$
m \;\leq\; \frac{1}{b-a}\int_a^b f(x)\,dx \;\leq\; M.
$$

The quantity $\mu \coloneqq \dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$ lies between the minimum and maximum values of $f$ on $[a, b]$. Since $f$ is continuous on $[a, b]$, the [Intermediate Value Theorem](../../continuous_function/intermediate_value_theorem/) guarantees the existence of $\xi \in [a, b]$ with $f(\xi) = \mu$. Multiplying both sides by $(b - a)$ gives the result. $\square$

## The weighted version

A more general form replaces the length $b - a$ with a non-negative weight function.

**Theorem (Weighted Mean Value Theorem for Integrals).** Let $f : [a, b] \to \mathbb{R}$ be continuous and let $g : [a, b] \to \mathbb{R}$ be integrable with $g(x) \geq 0$ for all $x \in [a, b]$. Then there exists $\xi \in [a, b]$ such that

$$
\int_a^b f(x)\,g(x)\,dx \;=\; f(\xi)\int_a^b g(x)\,dx.
$$

**Proof.** Again let $m = \min_{[a,b]} f$ and $M = \max_{[a,b]} f$. Since $g \geq 0$ and $m \leq f \leq M$, monotonicity gives

$$
m \int_a^b g(x)\,dx \;\leq\; \int_a^b f(x)\,g(x)\,dx \;\leq\; M \int_a^b g(x)\,dx.
$$

**Case 1:** $\int_a^b g = 0$. Then the left integral is also $0$ (since $0 \leq \int fg \leq 0$), so the equation $\int fg = f(\xi) \cdot 0$ holds for any $\xi$. Take $\xi = a$.

**Case 2:** $\int_a^b g > 0$. Divide the inequality by $\int_a^b g$ to get

$$
m \;\leq\; \frac{\displaystyle\int_a^b f(x)\,g(x)\,dx}{\displaystyle\int_a^b g(x)\,dx} \;\leq\; M.
$$

By the IVT (same argument as before) there exists $\xi \in [a, b]$ with $f(\xi)$ equal to that ratio. $\square$

The unweighted theorem is the special case $g \equiv 1$.

## Geometric interpretation: average value

Define the **average value** of $f$ on $[a, b]$ to be

$$
\langle f \rangle \;\coloneqq\; \frac{1}{b - a}\int_a^b f(x)\,dx.
$$

Geometrically, $\langle f \rangle$ is the height of the rectangle with base $[a, b]$ whose area equals $\int_a^b f$. The Mean Value Theorem says this rectangle has the same area as the region under the curve: the curve's height at $\xi$ equals the rectangle's height. Put differently, a continuous function must pass through its own average.

This interpretation is useful for **estimation**: if you know $f$ is bounded between $m$ and $M$ on $[a, b]$, then

$$
m \;\leq\; \langle f \rangle \;\leq\; M,
$$

bounding the integral without computing it exactly.

## Worked example

**Problem.** Show that $\displaystyle\int_0^1 e^{-x^2}\,dx \in \bigl(e^{-1},\, 1\bigr)$.

**Solution.** The function $f(x) = e^{-x^2}$ is continuous and strictly decreasing on $[0,1]$, with $f(0) = 1$ and $f(1) = e^{-1}$. By monotonicity of the integral,

$$
e^{-1} \cdot 1 \;\leq\; \int_0^1 e^{-x^2}\,dx \;\leq\; 1 \cdot 1,
$$

so the integral lies in $[e^{-1}, 1]$. Since $f$ is strictly decreasing and not constant, the inequalities are strict:

$$
\int_0^1 e^{-x^2}\,dx \;\in\; \bigl(e^{-1},\, 1\bigr).
$$

The Mean Value Theorem guarantees that $e^{-\xi^2} = \int_0^1 e^{-x^2}\,dx$ for some $\xi \in (0, 1)$ — there is a specific $x$-value whose function value equals the average, even though we cannot find it in closed form.

**Numerical check.** The integral is approximately $0.7468$, which indeed lies in $(e^{-1}, 1) \approx (0.368, 1)$.

## Summary

- **Mean Value Theorem for integrals**: if $f$ is continuous on $[a, b]$, then $\displaystyle\int_a^b f(x)\,dx = f(\xi)(b-a)$ for some $\xi \in [a, b]$.
- **Proof**: the bounds $m(b-a) \leq \int f \leq M(b-a)$ from monotonicity, combined with the IVT for continuous functions, guarantee that the average value is attained.
- **Weighted version**: if $g \geq 0$ is integrable, then $\int fg = f(\xi)\int g$ for some $\xi \in [a, b]$.
- **Average value**: $\langle f \rangle = \frac{1}{b-a}\int_a^b f$ is the height of the equal-area rectangle; the theorem says $f(\xi) = \langle f \rangle$ at some $\xi$.
- The theorem is used directly in the proof of the Newton–Leibniz formula to bound the difference quotient of the variable-upper-limit function.
