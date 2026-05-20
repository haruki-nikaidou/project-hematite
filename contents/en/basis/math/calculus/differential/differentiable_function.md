---
title: Differentiable Function
summary: "A function is differentiable on an interval if it has a derivative at every point of the interval, giving rise to the derivative function f′. This checkpoint formalises that idea, contrasts pointwise and global differentiability, and surveys functions that are continuous but not differentiable."
prerequisites:
  - basis/math/calculus/differential/dif_at_point
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

A single derivative at one point is useful, but you usually want to differentiate a function across its entire domain. This checkpoint defines what it means for a function to be **differentiable on an interval** and introduces the derivative as a function in its own right.

## The derivative function

Let $f$ be defined on an open interval $I$. If $f$ is [differentiable at every point $x \in I$](./dif_at_point/), the rule $x \mapsto f'(x)$ defines a new function, the **derivative function** of $f$, also written $f'$, $\dfrac{df}{dx}$, or $Df$.

**Definition.** $f$ is **differentiable on $I$** if $f'(x)$ exists for every $x \in I$.

## Differentiability on closed intervals

For a closed interval $[a, b]$, differentiability at the endpoints uses one-sided limits: $f$ is differentiable on $[a, b]$ if it is differentiable on $(a, b)$ and both $f'_+(a)$ and $f'_-(b)$ exist.

## Higher-order derivatives

If $f'$ is itself differentiable, its derivative $(f')' \eqqcolon f''$ is the **second derivative** of $f$. Inductively, the $n$-th derivative $f^{(n)}$ is defined whenever $f^{(n-1)}$ is differentiable. In Leibniz notation: $\dfrac{d^n f}{dx^n}$.

A function with $n$ continuous derivatives is called **$C^n$**. A function with derivatives of all orders is called **$C^\infty$** or **smooth**.

## Continuous but not differentiable

[Differentiability implies continuity](./dif_at_point/), so every differentiable function is continuous. The converse fails.

**Example 1 — corner:** $f(x) = |x|$ is continuous everywhere. At $x_0 = 0$ the right derivative is $+1$ and the left is $-1$, so $f'(0)$ does not exist.

**Example 2 — cusp:** $f(x) = x^{2/3}$ is continuous at $0$, but $\dfrac{f(h)-f(0)}{h} = h^{-1/3} \to \pm\infty$; the derivative does not exist.

**Example 3 — differentiable with discontinuous derivative:** $f(x) = x^2 \sin(1/x)$ for $x \neq 0$ and $f(0) = 0$ is differentiable everywhere (at $0$ by the squeeze theorem), but $f'$ is discontinuous at $0$.

## Summary

- $f$ is **differentiable on $I$** if $f'(x)$ exists for every $x \in I$, yielding the **derivative function** $f'$.
- Closed-interval differentiability uses one-sided limits at the endpoints.
- The $n$-th derivative $f^{(n)}$ is defined iteratively; $C^\infty$ functions have all orders.
- Continuity is necessary but not sufficient for differentiability.
