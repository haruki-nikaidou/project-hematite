---
title: Lagrange's Mean Value Theorem
summary: "Lagrange's finite increment theorem (the Mean Value Theorem) states that for f continuous on [a, b] and differentiable on (a, b), there exists c ∈ (a, b) with f(b) − f(a) = f′(c)(b − a). This checkpoint proves it by applying Rolle's theorem to an auxiliary function and derives the standard corollaries."
prerequisites:
  - basis/math/calculus/differential/rolles_theorem
aliases: []
tags:
  - Calculus
  - Mean Value Theorems
updated: 2026-05-20
---

Drive 120 km in two hours. Your average speed was 60 km/h. At some instant during the trip, the speedometer must have read exactly 60 km/h. Lagrange's Mean Value Theorem is this fact stated for any differentiable function.

## Statement

**Theorem (Mean Value Theorem / Lagrange's Finite Increment Theorem).** Let $f : [a, b] \to \mathbb{R}$. If

1. $f$ is continuous on $[a, b]$, and
2. $f$ is differentiable on $(a, b)$,

then there exists $c \in (a, b)$ such that

$$
f(b) - f(a) \;=\; f'(c)\,(b - a). \tag{1}
$$

## Proof

The idea is to subtract from $f$ the linear function whose graph is the secant line through $(a, f(a))$ and $(b, f(b))$, turning the problem into one where Rolle's theorem applies.

Define the auxiliary function

$$
g(x) \;\coloneqq\; f(x) - f(a) - \frac{f(b)-f(a)}{b-a}(x - a).
$$

Then:
- $g$ is continuous on $[a, b]$ and differentiable on $(a, b)$ (inherited from $f$).
- $g(a) = 0$ and $g(b) = f(b) - f(a) - (f(b)-f(a)) = 0$.

By [Rolle's Theorem](../rolles_theorem/), there exists $c \in (a, b)$ with $g'(c) = 0$. Computing:

$$
g'(x) \;=\; f'(x) - \frac{f(b)-f(a)}{b-a},
$$

so $g'(c) = 0$ gives $f'(c) = \dfrac{f(b)-f(a)}{b-a}$, which is exactly $(1)$. $\square$

## Geometric meaning

The right-hand side of $(1)$ is the slope of the secant line through $(a, f(a))$ and $(b, f(b))$. The theorem says the tangent line at some interior point is **parallel** to that secant. In other words, the instantaneous rate of change equals the average rate of change at some point.

## Corollaries

### Constant functions

**Corollary.** If $f'(x) = 0$ for all $x \in (a, b)$, then $f$ is constant on $[a, b]$.

**Proof.** For any $x \in [a, b]$, apply the MVT to $[a, x]$: $f(x) - f(a) = f'(c)(x - a) = 0$, so $f(x) = f(a)$. $\square$

### Monotone functions

**Corollary.** If $f'(x) > 0$ for all $x \in (a, b)$, then $f$ is strictly increasing on $[a, b]$.

**Proof.** For $a \leq x_1 < x_2 \leq b$, apply the MVT to $[x_1, x_2]$: $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) > 0$. $\square$

The analogue with $f' < 0$ gives strict decrease; $f' \geq 0$ (or $\leq 0$) gives non-strict monotonicity.

### Lipschitz bound

**Corollary.** If $|f'(x)| \leq M$ for all $x \in (a, b)$, then $|f(x_2) - f(x_1)| \leq M|x_2 - x_1|$ for all $x_1, x_2 \in [a, b]$.

This is the **Lipschitz condition** with constant $M$, widely used to control approximation errors.

## Summary

- **Mean Value Theorem**: if $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then $f(b) - f(a) = f'(c)(b-a)$ for some $c \in (a,b)$.
- **Proof**: apply Rolle's theorem to $g(x) = f(x) - \text{(secant line)}$.
- **Corollaries**: zero derivative → constant; positive derivative → strictly increasing; bounded derivative → Lipschitz.
- The theorem links global change $f(b)-f(a)$ to a local quantity $f'(c)$, making it the workhorse for proving properties of differentiable functions.
