---
title: Fermat's Lemma
summary: "If f is differentiable at an interior local extremum x₀, then f′(x₀) = 0. This checkpoint proves Fermat's Lemma from the sign of the difference quotient on each side, and explains why the converse fails and why the result needs the extremum to be interior."
prerequisites:
  - basis/math/calculus/differential/differentiable_function
  - basis/math/calculus/differential/interior_extremum
aliases: []
tags:
  - Calculus
  - Mean Value Theorems
updated: 2026-05-20
---

If a smooth hill has a peak, the slope must be zero at the top. Fermat's Lemma makes this intuition rigorous: at an interior local extremum, the tangent line is horizontal. This is the key ingredient in every mean-value theorem.

## Statement

**Fermat's Lemma.** Let $f$ be defined on an open interval containing $x_0$. If $x_0$ is a [local extremum](../interior_extremum/) of $f$ and $f$ is [differentiable](../differentiable_function/) at $x_0$, then

$$
f'(x_0) = 0.
$$

## Proof

Suppose $x_0$ is a local maximum (the minimum case is symmetric). By the definition of a local maximum, there exists $\delta > 0$ such that

$$
f(x) \leq f(x_0) \quad \text{for all } x \in (x_0 - \delta,\, x_0 + \delta).
$$

Consider the difference quotient $\dfrac{f(x_0 + h) - f(x_0)}{h}$ for small $h \neq 0$.

- For $h \in (0, \delta)$: $f(x_0 + h) - f(x_0) \leq 0$ and $h > 0$, so the quotient is $\leq 0$. Taking the limit $h \to 0^+$ gives $f'(x_0) \leq 0$.
- For $h \in (-\delta, 0)$: $f(x_0 + h) - f(x_0) \leq 0$ and $h < 0$, so the quotient is $\geq 0$. Taking the limit $h \to 0^-$ gives $f'(x_0) \geq 0$.

Since $f'(x_0)$ exists, both one-sided limits equal it. Therefore $f'(x_0) \leq 0$ and $f'(x_0) \geq 0$, which forces $f'(x_0) = 0$. $\square$

## Why the converse fails

The condition $f'(x_0) = 0$ does **not** guarantee a local extremum. A point where $f'(x_0) = 0$ is called a **stationary point** (or **critical point**), but it may be neither a maximum nor a minimum.

**Example.** For $f(x) = x^3$, we have $f'(0) = 0$, yet $x_0 = 0$ is not a local extremum: $f(x) < 0$ for $x < 0$ and $f(x) > 0$ for $x > 0$, so the function is strictly increasing through $0$.

## Why the extremum must be interior

Fermat's Lemma requires $x_0$ to be in the interior of the domain. At a **boundary point**, the function is only compared to values on one side, and the one-sided difference quotient need not be zero.

**Example.** $f(x) = x$ on $[0, 1]$ has a local minimum at $0$ and a local maximum at $1$. Yet $f'(0) = f'(1) = 1 \neq 0$.

## Summary

- **Fermat's Lemma**: if $f$ is differentiable at an interior local extremum $x_0$, then $f'(x_0) = 0$.
- **Proof idea**: the difference quotient is non-positive from the right and non-negative from the left, so both one-sided limits — and hence $f'(x_0)$ — equal zero.
- The converse fails: $f'(x_0) = 0$ is necessary but not sufficient for a local extremum.
- The result needs $x_0$ interior: at boundary extrema the derivative can be nonzero.
