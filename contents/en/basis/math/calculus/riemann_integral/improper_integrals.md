---
title: Improper Integrals
summary: "The Riemann integral is defined on bounded intervals for bounded functions; improper integrals extend it to unbounded intervals (∫_a^∞ f) and to functions unbounded near an endpoint (∫_a^b f with f blowing up at b) by taking a limit of proper integrals. This checkpoint defines both kinds of improper integrals, distinguishes convergence from divergence, and works through canonical examples: ∫_1^∞ x^(−p) dx, ∫_0^1 x^(−p) dx, and the gamma integral ∫_0^∞ e^(−x) x^(s−1) dx."
prerequisites:
  - basis/math/calculus/riemann_integral/additive
  - basis/math/calculus/continuous_function/limit_of_function
aliases: []
tags:
  - Calculus
  - Integration
  - Improper Integrals
updated: 2026-05-22
---

The Riemann integral as you defined it requires both the domain and the function to be bounded. Yet the most important integrals in analysis — total probability, Fourier transforms, the Laplace transform, potential wells in physics — almost always involve either an infinite interval or a function that blows up somewhere. Improper integrals give you a rigorous way to handle both situations by reducing them to a limit of proper Riemann integrals. When that limit exists and is finite the integral **converges**; otherwise it **diverges**.

## Why extend the integral?

A few canonical problems make the need clear.

**Total probability.** The standard normal density $\frac{1}{\sqrt{2\pi}} e^{-x^2/2}$ is defined on all of $\mathbb{R}$. Saying that the total probability equals $1$ means

$$
\frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-x^2/2}\,dx = 1,
$$

which requires integrating over an unbounded domain.

**Fourier transforms.** The Fourier transform $\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i \xi x}\,dx$ is the backbone of signal processing and PDE theory. It lives on $\mathbb{R}$.

**Power singularities.** The function $x^{-1/2}$ is not bounded on $(0, 1]$ yet its integral from $0$ to $1$ ought to equal $2$ by any reasonable reckoning. Making "any reasonable reckoning" precise is exactly what a Type 2 improper integral does.

## Type 1: unbounded interval

**Definition.** Let $f$ be Riemann integrable on $[a, b]$ for every $b > a$. The **improper integral** over $[a, \infty)$ is

$$
\int_a^{\infty} f(x)\,dx \;\coloneqq\; \lim_{b \to \infty} \int_a^b f(x)\,dx.
$$

If this limit exists and is finite, the integral **converges** to that value. Otherwise it **diverges**.

Similarly, for an integral extending to $-\infty$:

$$
\int_{-\infty}^{b} f(x)\,dx \;\coloneqq\; \lim_{a \to -\infty} \int_a^b f(x)\,dx.
$$

For a doubly infinite integral, pick any convenient intermediate point $c$ and define

$$
\int_{-\infty}^{\infty} f(x)\,dx \;\coloneqq\; \int_{-\infty}^c f(x)\,dx \;+\; \int_c^{\infty} f(x)\,dx,
$$

requiring **both** halves to converge independently. (If you allow the two limits to be taken simultaneously you get the **Cauchy principal value**, a weaker notion that we do not use here.)

### Worked example: the $p$-integral on $[1, \infty)$

Consider $\int_1^{\infty} x^{-p}\,dx$ for a real parameter $p$.

**Case $p \neq 1$.** For $b > 1$,

$$
\int_1^b x^{-p}\,dx = \left[\frac{x^{1-p}}{1-p}\right]_1^b = \frac{b^{1-p} - 1}{1-p}.
$$

As $b \to \infty$:

- If $p > 1$ then $1 - p < 0$, so $b^{1-p} \to 0$, and the limit is $\dfrac{0 - 1}{1-p} = \dfrac{1}{p-1}$.
- If $p < 1$ then $1 - p > 0$, so $b^{1-p} \to \infty$: the integral diverges.

**Case $p = 1$.** $\int_1^b x^{-1}\,dx = \ln b \to \infty$: diverges.

**Conclusion.**

$$
\int_1^{\infty} x^{-p}\,dx \;=\; \frac{1}{p-1} \quad (p > 1), \qquad \text{diverges} \quad (p \le 1).
$$

This single family already explains why the harmonic series diverges while $\sum n^{-2}$ converges — the integral test connects series to this exact threshold.

## Type 2: unbounded function

**Definition.** Suppose $f$ is Riemann integrable on $[a, b - \varepsilon]$ for every $\varepsilon \in (0, b - a)$, but is unbounded (or undefined) near $b$. Define

$$
\int_a^b f(x)\,dx \;\coloneqq\; \lim_{\varepsilon \to 0^+} \int_a^{b-\varepsilon} f(x)\,dx.
$$

If the limit exists and is finite the integral converges; otherwise it diverges.

If instead $f$ blows up at the left endpoint $a$, define

$$
\int_a^b f(x)\,dx \;\coloneqq\; \lim_{\varepsilon \to 0^+} \int_{a+\varepsilon}^b f(x)\,dx.
$$

If the singularity is at an interior point $c \in (a, b)$, split:

$$
\int_a^b f(x)\,dx \;\coloneqq\; \int_a^c f(x)\,dx + \int_c^b f(x)\,dx,
$$

requiring both pieces to converge.

### Worked example: the $p$-integral on $[0, 1]$

Consider $\int_0^1 x^{-p}\,dx$ for $p > 0$. (The singularity is at $x = 0$.)

**Case $p \neq 1$.** For $\varepsilon > 0$,

$$
\int_\varepsilon^1 x^{-p}\,dx = \left[\frac{x^{1-p}}{1-p}\right]_\varepsilon^1 = \frac{1 - \varepsilon^{1-p}}{1-p}.
$$

As $\varepsilon \to 0^+$:

- If $p < 1$ then $1 - p > 0$, so $\varepsilon^{1-p} \to 0$, and the limit is $\dfrac{1}{1-p}$.
- If $p > 1$ then $1 - p < 0$, so $\varepsilon^{1-p} \to \infty$: diverges.

**Case $p = 1$.** $\int_\varepsilon^1 x^{-1}\,dx = -\ln \varepsilon \to \infty$: diverges.

**Conclusion.**

$$
\int_0^1 x^{-p}\,dx \;=\; \frac{1}{1-p} \quad (0 < p < 1), \qquad \text{diverges} \quad (p \ge 1).
$$

Notice the exact complementarity with the Type 1 result: the threshold flips from $p > 1$ to $p < 1$.

## Mixed type: both singularities at once

Sometimes an integral has an unbounded integrand and an unbounded domain simultaneously. In that case you split at a convenient interior point and handle each piece separately. For example, to define $\int_0^\infty x^{-p}\,dx$ you would write

$$
\int_0^\infty x^{-p}\,dx = \int_0^1 x^{-p}\,dx + \int_1^\infty x^{-p}\,dx.
$$

For $p < 1$ the first piece converges and for $p > 1$ the second piece converges, but there is no $p$ that makes both pieces converge simultaneously — so $\int_0^\infty x^{-p}\,dx$ diverges for every $p$. This is a simple but important case: even if each half separately has a good regime, the regimes may not overlap.

## The Gamma function

The most important improper integral in analysis is the **Gamma function**:

$$
\Gamma(s) \;\coloneqq\; \int_0^{\infty} e^{-x} x^{s-1}\,dx, \quad s > 0.
$$

This is a mixed-type integral: near $x = 0$ the factor $x^{s-1}$ may blow up (when $s < 1$), and the upper limit is $\infty$. Splitting at $x = 1$, the two pieces are handled by the estimates above together with the rapid decay of $e^{-x}$.

**Convergence near $0$.** For small $x > 0$, $e^{-x} \le 1$, so $e^{-x} x^{s-1} \le x^{s-1}$. We just showed $\int_0^1 x^{s-1}\,dx$ converges for $s > 0$, so the left piece converges absolutely.

**Convergence at $\infty$.** For large $x$, exponential decay dominates any power: $e^{-x} x^{s-1} \le C_s e^{-x/2}$ for a constant $C_s$ depending on $s$. Since $\int_1^\infty e^{-x/2}\,dx$ converges, so does the right piece.

### The functional equation

The Gamma function satisfies the **functional equation**

$$
\Gamma(s+1) = s\,\Gamma(s), \quad s > 0.
$$

**Proof.** Integrate $\int_0^\infty e^{-x} x^s\,dx$ by parts, taking $u = x^s$ and $dv = e^{-x}\,dx$:

$$
\Gamma(s+1) = \int_0^\infty e^{-x} x^s\,dx = \left[-e^{-x} x^s\right]_0^\infty + s \int_0^\infty e^{-x} x^{s-1}\,dx.
$$

The boundary term vanishes: at $x = 0$ we have $x^s = 0$, and at $x \to \infty$ the exponential decay forces $e^{-x} x^s \to 0$. The remaining integral is exactly $\Gamma(s)$, giving $\Gamma(s+1) = s\,\Gamma(s)$. $\square$

**Base case.** $\Gamma(1) = \int_0^\infty e^{-x}\,dx = 1$. By the functional equation, $\Gamma(2) = 1 \cdot \Gamma(1) = 1$, $\Gamma(3) = 2$, and by induction $\Gamma(n+1) = n!$ for every non-negative integer $n$. The Gamma function is the unique (suitably regular) extension of the factorial to positive real numbers.

## Summary

- **Type 1 improper integral**: $\int_a^\infty f \coloneqq \lim_{b \to \infty} \int_a^b f$. It converges when the limit exists and is finite.
- **Type 2 improper integral**: $\int_a^b f \coloneqq \lim_{\varepsilon \to 0^+} \int_a^{b-\varepsilon} f$ when $f$ blows up at $b$. Analogous definitions cover singularities at $a$ or at interior points.
- The $p$-integral $\int_1^\infty x^{-p}\,dx$ converges if and only if $p > 1$, with value $\frac{1}{p-1}$.
- The $p$-integral $\int_0^1 x^{-p}\,dx$ converges if and only if $p < 1$, with value $\frac{1}{1-p}$.
- For a doubly infinite integral $\int_{-\infty}^\infty f$, both halves must converge independently.
- Mixed-type integrals are split into pieces; convergence requires every piece to converge.
- The **Gamma function** $\Gamma(s) = \int_0^\infty e^{-x} x^{s-1}\,dx$ converges for all $s > 0$ and satisfies $\Gamma(s+1) = s\,\Gamma(s)$, extending the factorial.
