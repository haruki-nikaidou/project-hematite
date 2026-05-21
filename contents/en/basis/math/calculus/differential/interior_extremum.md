---
title: Interior Extremum
summary: "A point x₀ in the interior of the domain is a local maximum (resp. minimum) if f(x) ≤ f(x₀) (resp. ≥) on a neighbourhood of x₀. This checkpoint formalises the definitions and contrasts strict vs. non-strict, interior vs. boundary, and local vs. global extrema."
prerequisites:
  - basis/math/calculus/continuous_function/local_properties
aliases: []
tags:
  - Calculus
  - Extrema
updated: 2026-05-20
---

When you sketch the graph of a function and mark the "peaks" and "valleys", you are locating its **local extrema**. Before you can prove any theorem about them — such as Fermat's Lemma — you need precise definitions that distinguish local from global, interior from boundary, and strict from non-strict.

## Local maximum and minimum

Let $f$ be defined on a set $D \subseteq \mathbb{R}$ and let $x_0 \in D$.

**Definition.** $x_0$ is a **local maximum** of $f$ if there exists $\delta > 0$ such that

$$
f(x) \leq f(x_0) \quad \text{for all } x \in D \text{ with } |x - x_0| < \delta.
$$

If the inequality is strict ($f(x) < f(x_0)$ for $x \neq x_0$), $x_0$ is a **strict local maximum**.

A **local minimum** and **strict local minimum** are defined symmetrically by reversing the inequality. The term **local extremum** covers both cases.

## Interior vs. boundary extrema

The definitions above apply equally to interior points and boundary points of $D$. However, most theorems about extrema — including Fermat's Lemma — require $x_0$ to be in the **interior** of $D$, meaning there exists $\delta > 0$ such that $(x_0 - \delta, x_0 + \delta) \subseteq D$.

**Why the distinction matters.** At a boundary point, the function is only compared with values on one side. For example, $f(x) = x$ on $[0, 1]$ has a local minimum at $x_0 = 0$ and a local maximum at $x_0 = 1$, even though $f' = 1 \neq 0$ at both endpoints. A stationarity condition like $f'(x_0) = 0$ can only hold at interior points.

## Local vs. global extrema

A **global maximum** (also called an absolute maximum) is a point $x_0 \in D$ where $f(x_0) \geq f(x)$ for all $x \in D$ — not just nearby. Every global extremum is a local extremum, but not conversely.

**Example.** For $f(x) = \sin x$ on $\mathbb{R}$: every point where $\sin x = 1$ is both a local and a global maximum, while points where $\sin x = -1$ are both local and global minima. There is no other local extremum because $\sin x$ oscillates to arbitrarily large values of $x$ in each direction.

**Example.** For $f(x) = x^3 - 3x$ on $\mathbb{R}$: $x = -1$ is a local maximum with $f(-1) = 2$, and $x = 1$ is a local minimum with $f(1) = -2$. Neither is a global extremum since $f(x) \to \pm\infty$ as $x \to \pm\infty$.

## Characterisation via local properties

A point $x_0 \in \operatorname{int}(D)$ is a local maximum of $f$ if and only if $f - f(x_0)$ is [non-positive in some neighbourhood](../continuous_function/local_properties/) of $x_0$. This reformulation connects directly to the sign-analysis of the difference quotient used in [Fermat's Lemma](../fermat_lemma/).

## Summary

- $x_0$ is a **local maximum** if $f(x) \leq f(x_0)$ for all $x$ near $x_0$ (within $D$); **strict** if the inequality is sharp for $x \neq x_0$.
- **Interior** extrema lie in the open interior of the domain; **boundary** extrema do not.
- Every global extremum is a local extremum; the converse fails.
- Theorems that derive conditions from $f'(x_0) = 0$ require the extremum to be interior and $f$ to be differentiable there.
