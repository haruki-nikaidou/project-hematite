---
title: Continuous Function
summary: "A function is continuous at a point if its limit there equals its value there. This checkpoint defines continuity at a point and on a set, proves the algebra of continuous functions, and establishes that every elementary function is continuous on its domain."
prerequisites:
  - basis/math/calculus/continuous_function/limit_of_function
  - basis/math/calculus/continuous_function/local_properties
aliases: []
tags:
  - Calculus
  - Continuity
updated: 2026-05-20
---

[Limits](../limit_of_function/) tell you what a function *approaches* at a point. Continuity asks whether the function *arrives* — whether the limit equals the actual value. Intuitively, a function is continuous if small changes in input produce only small changes in output, with no sudden jumps or gaps.

## Continuity at a point

**Definition.** A function $f : D \to \mathbb{R}$ is **continuous at $a \in D$** if

$$
\lim_{x \to a} f(x) = f(a).
$$

This packages three conditions into one: (1) $f(a)$ is defined, (2) $\lim_{x \to a} f(x)$ exists, and (3) the limit equals $f(a)$.

In ε–δ terms, $f$ is continuous at $a$ if and only if for every $\varepsilon > 0$ there exists $\delta > 0$ such that

$$
x \in D \text{ and } |x - a| < \delta \implies |f(x) - f(a)| < \varepsilon.
$$

Notice that unlike the limit definition, $x$ is now allowed to equal $a$ — the condition still holds trivially there.

If $a$ is an **isolated point** of $D$ — some neighborhood of $a$ contains no other point of $D$ — then $f$ is automatically continuous at $a$, because the limit condition is vacuously satisfied.

## Continuity on a set

**Definition.** $f$ is **continuous on $S \subseteq D$** if it is continuous at every point of $S$. When $S = D$, one says simply that $f$ is **continuous**.

For functions defined on a closed interval $[a, b]$, continuity at the endpoints is interpreted one-sidedly: $\lim_{x \to a^+} f(x) = f(a)$ and $\lim_{x \to b^-} f(x) = f(b)$.

## Algebra of continuous functions

The [arithmetic of limits](../local_properties/) carries over immediately.

**Theorem.** If $f$ and $g$ are continuous at $a$, then so are:
- $f + g$, $f - g$, $f \cdot g$
- $f / g$, provided $g(a) \neq 0$
- $c \cdot f$ for any constant $c$

*Proof.* For $f + g$: since $\lim_{x \to a} f(x) = f(a)$ and $\lim_{x \to a} g(x) = g(a)$, the limit sum rule gives $\lim_{x \to a}(f + g)(x) = f(a) + g(a) = (f + g)(a)$. The remaining cases follow analogously from the corresponding limit rules. $\square$

### Composition

**Theorem.** If $g$ is continuous at $a$ and $f$ is continuous at $g(a)$, then $f \circ g$ is continuous at $a$.

*Proof.* Let $\varepsilon > 0$. Continuity of $f$ at $g(a)$ gives $\eta > 0$ such that $|y - g(a)| < \eta$ implies $|f(y) - f(g(a))| < \varepsilon$. Continuity of $g$ at $a$ gives $\delta > 0$ such that $|x - a| < \delta$ implies $|g(x) - g(a)| < \eta$. Combining: $|x - a| < \delta$ implies $|f(g(x)) - f(g(a))| < \varepsilon$. $\square$

## Elementary functions are continuous

Every [elementary function](../../../analysis/functions/elementary_function/) is continuous on its natural domain.

| Function | Continuous on |
|----------|---------------|
| Polynomials | $\mathbb{R}$ |
| Rational $p/q$ | $\{x : q(x) \neq 0\}$ |
| $e^x$ | $\mathbb{R}$ |
| $\ln x$ | $(0, \infty)$ |
| $\sin x$, $\cos x$ | $\mathbb{R}$ |
| $\tan x$ | $\{x : \cos x \neq 0\}$ |

Polynomials are continuous because $\lim_{x \to a} x = a$ and [limit arithmetic](../local_properties/) extends this to all monomials and then all polynomials. Each other elementary function is proved continuous using its specific definition or series expansion; compositions preserve continuity by the theorem above.

This means you can evaluate limits of elementary expressions simply by substituting the point, as long as the function is defined there.

## Discontinuities

When $f$ fails to be continuous at $a$, the failure is classified by what *does* happen:

| Type | Behavior |
|------|---------|
| Removable | $\lim_{x \to a} f(x)$ exists but $\neq f(a)$, or $f(a)$ is undefined |
| Jump | Both one-sided limits exist but differ: $\lim_{x \to a^-} f(x) \neq \lim_{x \to a^+} f(x)$ |
| Essential | At least one one-sided limit does not exist (or is $\pm\infty$) |

A removable discontinuity can be fixed by redefining $f(a) \coloneqq \lim_{x \to a} f(x)$. Jump and essential discontinuities cannot be patched this way.

## Summary

- $f$ is **continuous at $a$** if $\lim_{x \to a} f(x) = f(a)$ — the limit exists and matches the function value.
- **Continuous on a set** means continuous at every point of that set.
- Sums, differences, products, quotients (nonzero denominator), and **compositions** of continuous functions are continuous.
- Every elementary function is **continuous on its natural domain**; limits of elementary expressions are computed by direct substitution.
- Discontinuities are removable, jump, or essential — only removable discontinuities can be fixed by redefining the function value.
