---
title: Local Properties of Limits
summary: "Limits behave well with arithmetic and order locally: if f and g have limits at a point, so do f±g, fg, and f/g (when the denominator is nonzero), and inequalities pass to the limit. This checkpoint proves these arithmetic and order theorems, the squeeze theorem, and the local sign-preservation property."
prerequisites:
  - basis/math/calculus/continuous_function/limit_of_function
aliases: []
tags:
  - Calculus
  - Limit
updated: 2026-05-20
---

Knowing that individual limits exist is only the beginning. In practice you build complex functions from simpler ones using addition, multiplication, division, and so on. The theorems here guarantee that limits respect all of these operations, so you can compute limits piece by piece rather than returning to ε–δ each time.

Throughout this checkpoint, $f$ and $g$ are real-valued functions defined on a set $D$ near $a$ (though not necessarily at $a$), with $\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} g(x) = M$.

## Arithmetic of limits

**Theorem.** Under the hypotheses above:

1. $\displaystyle\lim_{x \to a}(f \pm g)(x) = L \pm M$
2. $\displaystyle\lim_{x \to a}(f \cdot g)(x) = L \cdot M$
3. $\displaystyle\lim_{x \to a}\frac{f(x)}{g(x)} = \frac{L}{M}$, provided $M \neq 0$
4. $\displaystyle\lim_{x \to a}(c \cdot f)(x) = c \cdot L$ for any constant $c \in \mathbb{R}$

*Proof of (1).* Given $\varepsilon > 0$, choose $\delta_1$ so that $|f(x) - L| < \varepsilon/2$ for $0 < |x - a| < \delta_1$, and $\delta_2$ so that $|g(x) - M| < \varepsilon/2$ for $0 < |x - a| < \delta_2$. Then for $0 < |x - a| < \min(\delta_1, \delta_2)$:

$$
|(f \pm g)(x) - (L \pm M)| \leq |f(x) - L| + |g(x) - M| < \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon. \quad\square
$$

*Proof of (2).* Write

$$
f(x) g(x) - LM = f(x)(g(x) - M) + M(f(x) - L).
$$

For $x$ sufficiently close to $a$, $f$ is bounded: $|f(x)| \leq |L| + 1$. Since $g(x) \to M$ and $f(x) \to L$, both terms tend to zero. $\square$

The quotient rule (3) follows from (2) and the separate fact that $1/g(x) \to 1/M$ when $M \neq 0$, which is proved by a standard ε–δ argument using the bound $|g(x)| > |M|/2$ near $a$.

## The squeeze theorem

When you cannot compute a limit directly, trapping the function between two simpler bounds often works.

**Theorem (Squeeze / Sandwich theorem).** Suppose $h(x) \leq f(x) \leq k(x)$ for all $x \in D$ near $a$ (with $x \neq a$), and

$$
\lim_{x \to a} h(x) = \lim_{x \to a} k(x) = L.
$$

Then $\lim_{x \to a} f(x) = L$.

*Proof.* Given $\varepsilon > 0$, choose $\delta$ small enough so that $|h(x) - L| < \varepsilon$ and $|k(x) - L| < \varepsilon$ both hold for $0 < |x - a| < \delta$. Then

$$
L - \varepsilon < h(x) \leq f(x) \leq k(x) < L + \varepsilon,
$$

so $|f(x) - L| < \varepsilon$. $\square$

**Example.** For any function $b$ satisfying $|b(x)| \leq 1$,

$$
\lim_{x \to 0} x \cdot b(x) = 0,
$$

because $-|x| \leq x \cdot b(x) \leq |x|$ and $\lim_{x \to 0} |x| = 0$.

This is how $\lim_{x \to 0} x \sin(1/x) = 0$ is established: $\sin(1/x)$ oscillates wildly near $0$ but is always bounded by $1$, so the factor of $x$ forces the product to $0$.

## Order preservation

**Theorem.** If $f(x) \leq g(x)$ for all $x \in D$ near $a$ (with $x \neq a$), then $L \leq M$.

*Proof.* Suppose for contradiction that $L > M$. Set $\varepsilon = (L - M)/2 > 0$. For $x$ close enough to $a$, $f(x) > L - \varepsilon = (L + M)/2$ and $g(x) < M + \varepsilon = (L + M)/2$, giving $f(x) > g(x)$ — a contradiction. $\square$

Note that strict inequality $f(x) < g(x)$ does **not** guarantee strict inequality $L < M$ in the limit. For example, $f(x) = 0 < x^2 = g(x)$ for $x \neq 0$, yet both tend to $0$ as $x \to 0$.

## Local sign preservation

**Theorem.** If $L > 0$, then $f(x) > 0$ for all $x$ sufficiently close to $a$ with $x \neq a$. Symmetrically, if $L < 0$ then $f(x) < 0$ near $a$.

*Proof.* Take $\varepsilon = L/2 > 0$. Choose $\delta$ so that $|f(x) - L| < L/2$ for $0 < |x - a| < \delta$. Then $f(x) > L - L/2 = L/2 > 0$. $\square$

This theorem is used repeatedly when reasoning about sign changes and in the proof that the quotient of continuous functions is continuous wherever the denominator is nonzero.

## Summary

- **Limit arithmetic**: limits respect $+$, $-$, $\times$, $\div$ (when the denominator limit is nonzero), and scalar multiplication.
- **Squeeze theorem**: if $h \leq f \leq k$ near $a$ and $h, k$ share a common limit $L$, then $f \to L$ as well.
- **Order preservation**: $f(x) \leq g(x)$ near $a$ implies $\lim f \leq \lim g$; strict inequality at points does not imply strict inequality at the limit.
- **Local sign preservation**: a positive limit implies the function is positive in some deleted neighborhood of $a$.
