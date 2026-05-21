---
title: Differential Conditions for Convexity
summary: "For a differentiable f, convexity on an interval is equivalent to f′ being monotonically increasing; for a twice differentiable f, equivalent to f″ ≥ 0. This checkpoint proves both conditions using Lagrange's MVT and the monotonicity test, and applies them to recognise convex functions at a glance."
prerequisites:
  - basis/math/calculus/differential/convex
  - basis/math/calculus/differential/higher_order_dif
  - basis/math/calculus/differential/monotonic
aliases: []
tags:
  - Calculus
  - Convexity
updated: 2026-05-21
---

The [chord definition of convexity](../convex/) is global: you must compare the function value at every convex combination to the corresponding chord height. Checking this for all pairs of points is impractical. Differentiability turns convexity into a local condition: one inequality on $f'$ or $f''$ at each point replaces the infinitely many chord comparisons.

## Condition 1: convexity via monotonicity of $f'$

**Theorem.** Let $f$ be differentiable on an open interval $I$. Then $f$ is convex on $I$ if and only if $f'$ is monotonically non-decreasing on $I$.

### Proof ($\Rightarrow$): convex $\Rightarrow$ $f'$ non-decreasing

Assume $f$ is convex on $I$. Take $x_1 < x_2$ in $I$; the goal is $f'(x_1) \leq f'(x_2)$.

Recall from the [convex checkpoint](../convex/) the equivalent **secant-slope characterisation**: for any $a < b < c$ in $I$,

$$
\frac{f(b) - f(a)}{b - a} \;\leq\; \frac{f(c) - f(b)}{c - b}. \tag{1}
$$

Apply $(1)$ with $a = x_1$, $b = x_2$, $c = x_2 + h$ for small $h > 0$:

$$
\frac{f(x_2) - f(x_1)}{x_2 - x_1} \;\leq\; \frac{f(x_2 + h) - f(x_2)}{h}.
$$

Taking $h \to 0^+$ on the right gives $f'(x_2)$.

Apply $(1)$ again with $a = x_1$, $b = x_1 + h$, $c = x_2$ for small $h > 0$:

$$
\frac{f(x_1 + h) - f(x_1)}{h} \;\leq\; \frac{f(x_2) - f(x_1 + h)}{x_2 - x_1 - h}.
$$

Taking $h \to 0^+$ on the left gives $f'(x_1)$, and the right side tends to $\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.

Chaining:

$$
f'(x_1) \;\leq\; \frac{f(x_2) - f(x_1)}{x_2 - x_1} \;\leq\; f'(x_2).
$$

So $f'(x_1) \leq f'(x_2)$. $\square$

### Proof ($\Leftarrow$): $f'$ non-decreasing $\Rightarrow$ convex

Assume $f'$ is non-decreasing on $I$. Take $x < y$ in $I$ and $\lambda \in (0, 1)$; set $z \coloneqq \lambda x + (1 - \lambda)y$, so $x < z < y$.

Note that $z - x = (1-\lambda)(y - x)$ and $y - z = \lambda(y - x)$.

By the [Mean Value Theorem](../lagranges_finite-increment_theorem/):

$$
f(z) - f(x) \;=\; f'(c_1)(z - x) \quad\text{for some } c_1 \in (x, z),
$$

$$
f(y) - f(z) \;=\; f'(c_2)(y - z) \quad\text{for some } c_2 \in (z, y).
$$

Since $c_1 < z < c_2$ and $f'$ is non-decreasing, $f'(c_1) \leq f'(c_2)$. Therefore:

$$
\frac{f(z) - f(x)}{z - x} \;=\; f'(c_1) \;\leq\; f'(c_2) \;=\; \frac{f(y) - f(z)}{y - z}.
$$

Substituting $z - x = (1-\lambda)(y-x)$ and $y - z = \lambda(y-x)$:

$$
\frac{f(z) - f(x)}{1 - \lambda} \;\leq\; \frac{f(y) - f(z)}{\lambda}.
$$

Multiply through by $\lambda(1-\lambda) > 0$:

$$
\lambda\bigl(f(z) - f(x)\bigr) \;\leq\; (1-\lambda)\bigl(f(y) - f(z)\bigr).
$$

Rearranging:

$$
\lambda f(z) - \lambda f(x) \;\leq\; (1-\lambda)f(y) - (1-\lambda)f(z),
$$

$$
f(z) \;\leq\; \lambda f(x) + (1-\lambda)f(y). \quad \square
$$

This is exactly the chord inequality, so $f$ is convex.

## Condition 2: convexity via the second derivative

**Theorem.** Let $f \in C^2(I)$. Then $f$ is convex on $I$ if and only if $f''(x) \geq 0$ for all $x \in I$.

**Proof.** By Condition 1, $f$ is convex on $I$ if and only if $f'$ is non-decreasing on $I$. By the [Monotonicity Test](../monotonic/) applied to $f'$, $f'$ is non-decreasing on $I$ if and only if $(f')' = f'' \geq 0$ on $I$. Chaining the two equivalences gives the result. $\square$

### Strict convexity

**Corollary.** If $f''(x) > 0$ for all $x \in I$, then $f$ is strictly convex on $I$.

**Proof.** Strictly positive $f''$ means $f'$ is strictly increasing (Monotonicity Test, case 1). In the $(\Leftarrow)$ proof above, $c_1 < c_2$ then forces $f'(c_1) < f'(c_2)$, so every inequality in the chain is strict, giving strict convexity. $\square$

The converse fails: $f(x) = x^4$ satisfies $f''(0) = 0$ yet is strictly convex — the condition $f'' > 0$ everywhere is sufficient but not necessary for strict convexity.

## Recognising convex functions

The second-derivative test makes convexity a matter of sign checking:

| Function | Domain | $f''$ | Convex? |
|----------|--------|-------|---------|
| $x^2$ | $\mathbb{R}$ | $2 > 0$ | Strictly convex |
| $x^4$ | $\mathbb{R}$ | $12x^2 \geq 0$ | Strictly convex (see note above) |
| $e^x$ | $\mathbb{R}$ | $e^x > 0$ | Strictly convex |
| $-\ln x$ | $(0, \infty)$ | $1/x^2 > 0$ | Strictly convex |
| $\ln x$ | $(0, \infty)$ | $-1/x^2 < 0$ | Strictly concave |
| $x^3$ | $\mathbb{R}$ | $6x$, changes sign | Neither convex nor concave |

For $f(x) = x^3$: $f''(x) > 0$ on $(0, \infty)$ and $f''(x) < 0$ on $(-\infty, 0)$, so $f$ is convex on $(0, \infty)$ and concave on $(-\infty, 0)$, but not on all of $\mathbb{R}$.

## Summary

- **Condition 1**: $f$ differentiable on $I$ is convex $\iff$ $f'$ is non-decreasing on $I$.
  - ($\Rightarrow$): The secant-slope property of convex functions squeezes $f'(x_1) \leq f'(x_2)$.
  - ($\Leftarrow$): MVT produces $c_1 < c_2$ with $f'(c_1) \leq f'(c_2)$, which algebraically yields the chord inequality.
- **Condition 2**: $f \in C^2(I)$ is convex $\iff$ $f'' \geq 0$ on $I$ (combining Condition 1 with the Monotonicity Test for $f'$).
- **Strict convexity**: $f'' > 0$ everywhere $\Rightarrow$ strictly convex; the converse can fail at isolated points.
- To check convexity in practice: compute $f''$ and determine its sign on the interval of interest.
