---
title: Open and Closed Balls
summary: "Introduces open and closed balls in a metric space — the precise, distance-based zones that replace the intuitive notion of 'nearby points'."
prerequisites: 
  - elementry/math/metric_space
aliases: []
tags: ["Analysis"]
updated: 2026-05-11
---

When you work in a metric space, you need a precise way to describe all points that are "close" to some center. **Balls** give you exactly that — they are the metric-space analogue of intervals on the real line, and they show up in virtually every definition in analysis.

## Open balls

Let $(X, d)$ be a metric space, let $x \in X$, and let $r > 0$. The **open ball** centered at $x$ with radius $r$ is

$$
B(x, r) \coloneqq \{ y \in X : d(x, y) < r \}.
$$

Every point inside $B(x, r)$ is *strictly* less than $r$ away from the center. Points at distance exactly $r$ — the "boundary" — are excluded.

Here is what this looks like in a few concrete spaces:

- **$\mathbb{R}$ with $d(x, y) = |x - y|$.**  $B(a, r)$ is the open interval $(a - r,\, a + r)$.
- **$\mathbb{R}^2$ with the Euclidean metric.**  $B(x, r)$ is the open disk of radius $r$ — the interior of a circle, without the circle itself.
- **Discrete metric** ($d(x, y) = 0$ if $x = y$, else $d(x, y) = 1$):
  - For $r \leq 1$: $B(x, r) = \{x\}$ — only the center qualifies.
  - For $r > 1$: $B(x, r) = X$ — every point qualifies.

The discrete example is a useful reminder: the "shape" of a ball is determined entirely by the metric, not by any geometric picture you may have in mind.

## Closed balls

The **closed ball** centered at $x$ with radius $r \geq 0$ is

$$
\bar{B}(x, r) \coloneqq \{ y \in X : d(x, y) \leq r \}.
$$

The only change from the open ball is $\leq$ instead of $<$: points at distance exactly $r$ are now included.

In $\mathbb{R}$, $\bar{B}(a, r) = [a - r,\, a + r]$ — the closed interval.

### Comparing the two

| | Open ball $B(x, r)$ | Closed ball $\bar{B}(x, r)$ |
|---|---|---|
| Boundary | Excluded | Included |
| Condition | $d(x, y) < r$ | $d(x, y) \leq r$ |
| Analogue in $\mathbb{R}$ | $(a-r,\, a+r)$ | $[a-r,\, a+r]$ |

The containment $B(x, r) \subseteq \bar{B}(x, r)$ always holds. In familiar spaces like $\mathbb{R}^n$, the closed ball is the topological closure of the open ball — but this need not hold in every metric space.

## Punctured balls

Occasionally you will see the **punctured open ball**

$$
\dot{B}(x, r) \coloneqq B(x, r) \setminus \{x\} = \{ y \in X : 0 < d(x, y) < r \},
$$

which excludes the center itself. This comes up naturally when defining limits, where you care about points approaching $x$ but not $x$ itself.

## Why balls matter

Almost every fundamental concept in analysis — open sets, convergence, continuity, compactness — is defined using balls. When you encounter a definition that says "there exists $\varepsilon > 0$ such that…", you are almost certainly looking at a ball in disguise. Getting comfortable with balls now makes every subsequent definition feel natural.

## Summary

- An **open ball** $B(x, r)$ contains all points at distance *strictly less than* $r$ from center $x$.
- A **closed ball** $\bar{B}(x, r)$ additionally includes points at distance *exactly* $r$.
- The shape of a ball depends entirely on the metric; it need not look "round".
- A **punctured ball** $\dot{B}(x, r)$ excludes the center and appears in the definition of limits.
- Balls are the primary tool for making "closeness" precise in any metric space.
