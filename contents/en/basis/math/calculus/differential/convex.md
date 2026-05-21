---
title: Convex Function
summary: "A function on an interval is convex if every chord lies above the graph: f(λx + (1−λ)y) ≤ λf(x) + (1−λ)f(y) for all x, y in the interval and λ ∈ [0, 1]. This checkpoint formalises convexity, distinguishes strict from non-strict convexity, and surveys the elementary examples."
prerequisites:
  - basis/math/analysis/real_number_a
aliases: []
tags:
  - Calculus
  - Convexity
updated: 2026-05-20
---

Many inequalities in analysis and probability reduce to a single geometric observation: for a "bowl-shaped" function, the straight line between two points on the graph never dips below the graph itself. Formalising that observation gives you the notion of a convex function.

## The chord condition

Let $I \subseteq \mathbb{R}$ be an interval and $f : I \to \mathbb{R}$.

**Definition.** $f$ is **convex on $I$** if for every $x, y \in I$ and every $\lambda \in [0, 1]$,

$$
f\!\left(\lambda x + (1-\lambda)y\right) \;\leq\; \lambda f(x) + (1-\lambda)f(y). \tag{1}
$$

The point $\lambda x + (1-\lambda)y$ is a **convex combination** of $x$ and $y$: as $\lambda$ ranges over $[0,1]$ it traces the segment from $y$ to $x$. The right-hand side $\lambda f(x) + (1-\lambda)f(y)$ is the corresponding point on the **chord** from $(x, f(x))$ to $(y, f(y))$.

In words: the graph of $f$ lies at or below every chord.

## Strict convexity

**Definition.** $f$ is **strictly convex on $I$** if inequality $(1)$ is strict whenever $x \neq y$ and $\lambda \in (0, 1)$:

$$
f\!\left(\lambda x + (1-\lambda)y\right) \;<\; \lambda f(x) + (1-\lambda)f(y).
$$

Strict convexity rules out any flat portion of the graph lying on a chord. Every strictly convex function is convex, but not vice versa (the identity $f(x) = x$ is convex but not strictly convex).

## Concavity

$f$ is **(strictly) concave** if $-f$ is (strictly) convex, i.e. if the inequality in $(1)$ is reversed. Concave functions are "cap-shaped": every chord lies at or below the graph.

## Examples

| Function | Domain | Convex? | Strictly? |
|----------|--------|---------|-----------|
| $x^2$ | $\mathbb{R}$ | Yes | Yes |
| $e^x$ | $\mathbb{R}$ | Yes | Yes |
| $\|x\|$ | $\mathbb{R}$ | Yes | No (flat at $x = 0$ on the chord from $-a$ to $a$) |
| $\ln x$ | $(0, \infty)$ | No (concave) | — |
| $-x^2$ | $\mathbb{R}$ | No (concave) | — |
| $c$ (constant) | $\mathbb{R}$ | Yes | No |

**Verifying $x^2$.** For $\lambda \in [0,1]$ and $x, y \in \mathbb{R}$:

$$
(\lambda x + (1-\lambda)y)^2 \;\leq\; \lambda x^2 + (1-\lambda)y^2
$$

is equivalent to $\lambda(1-\lambda)(x-y)^2 \geq 0$, which holds for all $\lambda \in [0,1]$ and is strict when $x \neq y$ and $\lambda \in (0,1)$. So $x^2$ is strictly convex.

## Equivalent two-point form

Dividing both sides of $(1)$ by setting $t = \lambda$ and rearranging, convexity can also be read as: for any three points $x < z < y$ in $I$,

$$
\frac{f(z) - f(x)}{z - x} \;\leq\; \frac{f(y) - f(x)}{y - x} \;\leq\; \frac{f(y) - f(z)}{y - z}.
$$

Each fraction is the slope of a secant, so this says: the secant slopes from a fixed left point are non-decreasing as the right endpoint moves right. This monotone-slope property is fully equivalent to $(1)$ and is often the quickest way to check convexity from a graph.

## Summary

- $f$ is **convex** on $I$ if every chord from $(x, f(x))$ to $(y, f(y))$ lies at or above the graph: $f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda)f(y)$ for all $x, y \in I$, $\lambda \in [0,1]$.
- **Strict convexity** requires a strict inequality for $x \neq y$ and $\lambda \in (0,1)$.
- **Concavity** reverses the inequality; $f$ is concave iff $-f$ is convex.
- Standard examples: $x^2$ and $e^x$ are strictly convex; $\ln x$ is strictly concave.
