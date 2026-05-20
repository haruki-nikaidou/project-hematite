---
title: Tangent Line
summary: "The tangent line to a curve at a point is the limit of secant lines as the second point slides toward the first. This checkpoint develops that limit geometrically, sets up the slope formula (f(x+h)−f(x))/h, and previews how its limit becomes the derivative."
prerequisites:
  - basis/math/calculus/continuous_function/continuous
  - basis/math/analysis/functions/polynomial_functions
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

How do you draw the line that just *touches* a curve at a single point without crossing it? This intuitive question is surprisingly deep — the answer requires a limit, and that limit is the seed from which the entire theory of differential calculus grows.

## The secant slope

Pick a point $(x_0, f(x_0))$ on the graph of $f$. A **secant line** through that point and a nearby point $(x_0 + h, f(x_0 + h))$ has slope

$$
m_h \;=\; \frac{f(x_0 + h) - f(x_0)}{h}.
$$

The expression $\dfrac{f(x_0 + h) - f(x_0)}{h}$ is called the **difference quotient** of $f$ at $x_0$ with increment $h$.

As you take $h$ closer and closer to zero, the second point slides along the curve toward the first, and the secant line rotates. If this process converges to a unique limiting line, that limiting line is the **tangent line** at $(x_0, f(x_0))$.

## The tangent line as a limit

**Definition.** If the limit

$$
m \;=\; \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h} \tag{1}
$$

exists and is finite, the **tangent line** to the graph of $f$ at $x_0$ is the line through $(x_0, f(x_0))$ with slope $m$:

$$
y \;=\; f(x_0) + m(x - x_0).
$$

When the limit $(1)$ does not exist (or is infinite), the curve has no tangent line at that point in the usual sense.

## Example: the parabola $f(x) = x^2$

At $x_0 = 2$:

$$
m_h \;=\; \frac{(2+h)^2 - 4}{h} \;=\; \frac{4 + 4h + h^2 - 4}{h} \;=\; 4 + h.
$$

As $h \to 0$, $m_h \to 4$. The tangent line at $(2, 4)$ is $y = 4x - 4$.

## Example: the square root $f(x) = \sqrt{x}$

At $x_0 > 0$, rationalise the numerator:

$$
m_h \;=\; \frac{\sqrt{x_0 + h} - \sqrt{x_0}}{h} \;=\; \frac{1}{\sqrt{x_0 + h} + \sqrt{x_0}}.
$$

As $h \to 0$, $m_h \to \dfrac{1}{2\sqrt{x_0}}$.

## Corners and vertical tangents

Not every curve has a tangent line at every point. The function $f(x) = |x|$ has a **corner** at $x_0 = 0$: the secant slope from the left approaches $-1$ and from the right approaches $+1$, so the limit $(1)$ does not exist. The function $f(x) = x^{1/3}$ has a **vertical tangent** at $0$: the difference quotient grows without bound.

These failure modes motivate the formal definition of the derivative in the next checkpoint.

## Summary

- The **secant slope** through $(x_0, f(x_0))$ and $(x_0+h, f(x_0+h))$ is $\dfrac{f(x_0+h)-f(x_0)}{h}$.
- The **tangent line** at $x_0$ exists when this limit converges to a finite number $m$, and its equation is $y = f(x_0) + m(x - x_0)$.
- A **corner** or **vertical tangent** prevents the limit from existing in the usual sense.
