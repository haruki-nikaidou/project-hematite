---
title: Monotonicity Test
summary: "On an interval where f is differentiable, the sign of f′ determines whether f is increasing, decreasing, or constant. This checkpoint proves the monotonicity test using Lagrange's mean value theorem and connects strict monotonicity to invertibility."
prerequisites:
  - basis/math/calculus/differential/lagranges_finite-increment_theorem
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-21
---

If a car's speedometer reads positive throughout a journey, the car moved forward. If it reads negative, the car reversed. The monotonicity test is this observation applied to any differentiable function: the sign of $f'$ tells you whether $f$ climbs, falls, or stays flat on an interval.

## The theorem

**Theorem (Monotonicity Test).** Let $f$ be continuous on $[a, b]$ and differentiable on $(a, b)$.

1. If $f'(x) > 0$ for all $x \in (a, b)$, then $f$ is **strictly increasing** on $[a, b]$.
2. If $f'(x) < 0$ for all $x \in (a, b)$, then $f$ is **strictly decreasing** on $[a, b]$.
3. If $f'(x) = 0$ for all $x \in (a, b)$, then $f$ is **constant** on $[a, b]$.
4. If $f'(x) \geq 0$ for all $x \in (a, b)$, then $f$ is **non-decreasing** on $[a, b]$.
5. If $f'(x) \leq 0$ for all $x \in (a, b)$, then $f$ is **non-increasing** on $[a, b]$.

## Proof

All five cases follow from the same argument. Take $a \leq x_1 < x_2 \leq b$. By the [Mean Value Theorem](../lagranges_finite-increment_theorem/), there exists $c \in (x_1, x_2)$ such that

$$
f(x_2) - f(x_1) \;=\; f'(c)\,(x_2 - x_1).
$$

Since $x_2 - x_1 > 0$, the sign of $f(x_2) - f(x_1)$ equals the sign of $f'(c)$:

- $f'(c) > 0 \;\Rightarrow\; f(x_2) > f(x_1)$ (case 1).
- $f'(c) < 0 \;\Rightarrow\; f(x_2) < f(x_1)$ (case 2).
- $f'(c) = 0 \;\Rightarrow\; f(x_2) = f(x_1)$ (case 3).

Cases 4 and 5 follow identically with non-strict inequalities. $\square$

## Converse direction

The theorem does not reverse cleanly. $f$ can be strictly increasing while $f'$ vanishes at isolated points.

**Example.** $f(x) = x^3$ on $\mathbb{R}$: $f'(0) = 0$, yet $f$ is strictly increasing everywhere. Any $x_1 < x_2$ gives $x_1^3 < x_2^3$ directly.

The correct converse is: if $f$ is non-decreasing on $(a, b)$ and differentiable, then $f'(x) \geq 0$ — with equality allowed at some points.

## Finding intervals of monotonicity

In practice you use the test as follows. Given $f$ differentiable on an open interval:

1. Solve $f'(x) = 0$ and locate where $f'$ is undefined.
2. These points partition the domain into open intervals.
3. On each interval, check the sign of $f'$ at any sample point.
4. Apply the theorem to conclude increasing or decreasing.

**Example.** $f(x) = x^3 - 3x$.

$$
f'(x) = 3x^2 - 3 = 3(x-1)(x+1).
$$

$f'$ vanishes at $x = \pm 1$, giving three intervals:

| Interval | Sign of $f'$ | Behaviour of $f$ |
|----------|-------------|-----------------|
| $(-\infty, -1)$ | $+$ | strictly increasing |
| $(-1, 1)$ | $-$ | strictly decreasing |
| $(1, \infty)$ | $+$ | strictly increasing |

## Strict monotonicity and invertibility

A function that is strictly monotone on $[a, b]$ is injective: $x_1 \neq x_2$ implies $f(x_1) \neq f(x_2)$. Combined with continuity, it maps $[a, b]$ bijectively onto the interval $[f(a), f(b)]$ (or $[f(b), f(a)]$ if decreasing), and its inverse is again continuous and strictly monotone in the same direction.

This is the rigorous content behind "a strictly increasing function has an inverse." When you meet an inverse function in analysis, it is almost always because the original function satisfied the monotonicity test on the relevant domain.

## Summary

- **Positive derivative** on $(a, b)$ implies $f$ is strictly increasing on $[a, b]$; **negative derivative** implies strictly decreasing; **zero derivative** implies constant.
- **Proof**: apply the MVT to any pair $x_1 < x_2$; the sign of $f(x_2) - f(x_1)$ matches the sign of $f'(c)$.
- The converse is weaker: strict monotonicity allows $f' = 0$ at isolated points.
- To find monotone intervals: solve $f' = 0$, partition the domain, check the sign of $f'$ on each piece.
- Strictly monotone continuous functions are bijections onto their range and have continuous monotone inverses.
