---
title: Extreme Value Theorem
summary: "A continuous function on a closed bounded interval attains both a maximum and a minimum. This checkpoint proves the extreme value theorem using boundedness arguments, and explains why dropping any hypothesis — continuity, closedness, or boundedness — destroys the conclusion."
prerequisites:
  - basis/math/calculus/continuous_function/continuous
aliases: []
tags:
  - Calculus
  - Continuity
updated: 2026-05-20
---

A plane takes off, climbs, cruises, descends, and lands. The altitude is a continuous function of time on a closed interval. It must reach both a highest point and a lowest point somewhere during the flight. The Extreme Value Theorem says this is always true — not just for aircraft, but for any continuous function on a closed bounded interval.

## Statement

**Theorem (Extreme Value Theorem, EVT).** If $f : [a, b] \to \mathbb{R}$ is [continuous](../continuous/), then $f$ attains its maximum and minimum on $[a, b]$: there exist $x_{\max}, x_{\min} \in [a, b]$ such that

$$
f(x_{\min}) \leq f(x) \leq f(x_{\max}) \quad \text{for all } x \in [a, b].
$$

## Proof

The proof has two stages: first show $f$ is bounded above, then show the supremum is actually attained.

### Stage 1: $f$ is bounded above

Suppose for contradiction that $f$ is not bounded above on $[a, b]$. Then for each $n \in \mathbb{N}$ there exists $x_n \in [a, b]$ with $f(x_n) > n$. The sequence $(x_n)$ lies in the bounded interval $[a, b]$, so by the **Bolzano–Weierstrass theorem** it has a convergent subsequence $(x_{n_k})$ with $x_{n_k} \to c \in [a, b]$.

Since $f$ is continuous at $c$:

$$
\lim_{k \to \infty} f(x_{n_k}) = f(c).
$$

But $f(x_{n_k}) > n_k \to \infty$, contradicting convergence to the finite value $f(c)$. Therefore $f$ is bounded above.

By the same argument applied to $-f$, the function $f$ is also bounded below.

### Stage 2: $f$ attains its supremum

Let $M \coloneqq \sup_{x \in [a,b]} f(x)$, which is finite by Stage 1. By the definition of supremum, for each $n \in \mathbb{N}$ there exists $y_n \in [a, b]$ with

$$
M - \frac{1}{n} < f(y_n) \leq M.
$$

By Bolzano–Weierstrass, $(y_n)$ has a convergent subsequence $y_{n_k} \to x_{\max} \in [a, b]$. Continuity gives

$$
f(x_{\max}) = \lim_{k \to \infty} f(y_{n_k}) = M.
$$

So $f$ attains its maximum at $x_{\max}$. The minimum follows by applying the argument to $-f$. $\square$

## Why each hypothesis is necessary

All three hypotheses — continuity, closedness, and boundedness of the interval — are essential. Remove any one and the conclusion can fail.

### Without continuity (discontinuous function on $[0,1]$)

Define

$$
f(x) \coloneqq \begin{cases} x & x \in (0, 1] \\ 0.5 & x = 0. \end{cases}
$$

Then $\sup_{x \in [0,1]} f(x) = 1$, but $f(x) = 1$ has no solution in $[0, 1]$ — the supremum is not attained.

### Without closedness (open interval)

The function $f(x) = x$ on the open interval $(0, 1)$ is continuous, but $\sup f = 1$ and $\inf f = 0$ are never attained — neither endpoint belongs to the domain.

### Without boundedness (unbounded interval)

The function $f(x) = x$ on $[0, \infty)$ is continuous on a closed (but unbounded) set, and it is not bounded above, so no maximum exists.

## The image of $[a, b]$ is a closed interval

The EVT says $f$ attains a minimum $m$ and maximum $M$. Combined with the [Intermediate Value Theorem](../intermediate_value_theorem/) — which guarantees $f$ hits every value strictly between any two values it takes — the image of $f$ on $[a, b]$ is exactly the closed interval $[m, M]$.

## Summary

- **Extreme Value Theorem**: a [continuous](../continuous/) function on a closed bounded interval $[a, b]$ attains both a maximum value and a minimum value.
- **Proof idea**: near-supremum points form a sequence in $[a, b]$; Bolzano–Weierstrass extracts a convergent subsequence; continuity forces its limit to equal the supremum.
- **All three hypotheses are sharp**: dropping continuity, closedness, or boundedness each gives a counterexample where no extremum is attained.
- **Corollary**: the image $f([a, b])$ is the closed interval $[\min f,\, \max f]$, by the EVT and the [Intermediate Value Theorem](../intermediate_value_theorem/) together.
