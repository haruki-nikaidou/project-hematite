---
title: Rolle's Theorem
summary: "If f is continuous on [a, b], differentiable on (a, b), and f(a) = f(b), then there is some c ∈ (a, b) with f′(c) = 0. This checkpoint proves Rolle's theorem by combining the extreme value theorem with Fermat's lemma and uses it to count roots of polynomials."
prerequisites:
  - basis/math/calculus/differential/fermat_lemma
  - basis/math/calculus/continuous_function/extreme_value_theorem
aliases: []
tags:
  - Calculus
  - Mean Value Theorems
updated: 2026-05-20
---

Throw a ball straight up. Whatever height it starts and ends at, if it returns to the same height it must momentarily have zero velocity somewhere in between. Rolle's Theorem is the mathematical version of this observation.

## Statement

**Rolle's Theorem.** Let $f : [a, b] \to \mathbb{R}$. If

1. $f$ is [continuous](../continuous_function/continuous/) on $[a, b]$,
2. $f$ is [differentiable](../differentiable_function/) on the open interval $(a, b)$, and
3. $f(a) = f(b)$,

then there exists $c \in (a, b)$ such that $f'(c) = 0$.

## Proof

By the [Extreme Value Theorem](../continuous_function/extreme_value_theorem/), $f$ attains both a maximum $M$ and a minimum $m$ on $[a, b]$.

**Case 1: $M = m$.** The function is constant on $[a, b]$, so $f'(x) = 0$ for every $x \in (a, b)$. Any $c \in (a, b)$ works.

**Case 2: $M > m$.** At least one extremal value is different from $f(a) = f(b)$. For concreteness, suppose $M > f(a)$ (the argument for $m < f(a)$ is symmetric). The maximum $M$ is attained at some $x_{\max} \in [a, b]$. Since $f(x_{\max}) = M > f(a) = f(b)$, the point $x_{\max}$ cannot be either endpoint, so $x_{\max} \in (a, b)$ — an interior local maximum. By [Fermat's Lemma](../fermat_lemma/), $f'(x_{\max}) = 0$. Set $c \coloneqq x_{\max}$. $\square$

## Geometric meaning

Rolle's Theorem guarantees a **horizontal tangent** somewhere between two points at equal height. The conclusion is existence — not uniqueness. There may be many such points, or exactly one.

**Example.** $f(x) = \sin x$ on $[0, \pi]$: $f(0) = f(\pi) = 0$, and $f'(x) = \cos x = 0$ at $c = \pi/2$. Unique in this case.

**Example.** $f(x) = x^2(x-1)^2$ on $[0, 1]$: $f(0) = f(1) = 0$. Computing $f'(x) = 2x(x-1)(2x-1)$ gives zeros at $x = 0$, $x = 1/2$, and $x = 1$. The interior zero is $c = 1/2$.

## Counting roots

Rolle's Theorem limits how fast roots can accumulate.

**Corollary.** Between any two distinct roots of a differentiable function there is at least one root of its derivative.

**Proof.** If $f(a) = f(b) = 0$ with $a < b$, apply Rolle's Theorem directly to obtain $c \in (a, b)$ with $f'(c) = 0$. $\square$

**Application: a polynomial has at most $n$ real roots.** A polynomial $p$ of degree $n$ has at most $n$ roots. Rolle's Theorem gives an independent check: $p'$ has degree $n-1$, hence at most $n-1$ roots, hence $p$ has at most $n$ roots (one more interval than $p'$ can provide a zero in).

## Summary

- **Rolle's Theorem**: if $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then $f'(c) = 0$ for some $c \in (a, b)$.
- **Proof**: the EVT supplies an interior extremum (unless $f$ is constant); Fermat's Lemma makes its derivative zero.
- **Between any two roots** of $f$ there is a root of $f'$.
- The theorem asserts existence but not uniqueness of $c$.