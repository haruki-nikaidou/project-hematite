---
title: Convergence of Improper Integrals
summary: "Convergence tests for improper integrals mirror those for infinite series. This checkpoint develops the comparison test, the limit comparison test, the Cauchy convergence criterion, and the Abel–Dirichlet tests for oscillatory integrals such as ∫_1^∞ (sin x) / x dx; defines absolute versus conditional convergence; and uses the second mean value theorem to handle the trickier oscillatory cases."
prerequisites:
  - basis/math/calculus/riemann_integral/improper_integrals
  - basis/math/calculus/riemann_integral/second_mean_value_theorem_integral
aliases: []
tags:
  - Calculus
  - Integration
  - Improper Integrals
updated: 2026-05-22
---

In [Improper Integrals](../improper_integrals/) you learned to define $\int_a^\infty f$ as a limit of proper integrals and to classify it as convergent or divergent. For many functions, computing the limit directly is hard or impossible. What you need are tests — criteria that let you decide convergence without evaluating the limit explicitly, much as you use comparison tests for infinite series rather than summing them term by term. This checkpoint develops those tests, organized from the simplest (comparison) to the subtlest (Abel–Dirichlet for oscillatory integrands).

## The Cauchy convergence criterion

The foundational criterion is the direct analogue of the Cauchy criterion for sequences.

**Theorem (Cauchy criterion).** The improper integral $\int_a^\infty f(x)\,dx$ converges if and only if for every $\varepsilon > 0$ there exists $A \ge a$ such that for all $B > A$,

$$
\left|\int_A^B f(x)\,dx\right| < \varepsilon.
$$

*Proof sketch.* Define $F(t) = \int_a^t f(x)\,dx$. The integral converges iff $\lim_{t \to \infty} F(t)$ exists, iff $F$ satisfies the Cauchy condition for convergence of limits: $|F(B) - F(A)| < \varepsilon$ for large $A, B$. But $F(B) - F(A) = \int_A^B f$, so this is exactly the stated condition. $\square$

The Cauchy criterion is particularly useful for oscillatory integrals, where you need to show a tail is small without knowing the limiting value.

## The comparison test

When $f$ is non-negative, monotonicity of the integral makes a direct comparison available.

**Theorem (comparison test).** Let $0 \le f(x) \le g(x)$ for all $x \ge a$.

- If $\int_a^\infty g(x)\,dx$ converges, then $\int_a^\infty f(x)\,dx$ converges and $\int_a^\infty f \le \int_a^\infty g$.
- If $\int_a^\infty f(x)\,dx$ diverges, then $\int_a^\infty g(x)\,dx$ diverges.

*Proof.* Since $f \ge 0$, the function $F(t) = \int_a^t f$ is increasing. If $\int g$ converges, then $F(t) \le \int_a^t g \le \int_a^\infty g < \infty$ for all $t$. An increasing bounded function has a finite limit, so $\int f$ converges. The divergence direction follows by contrapositive. $\square$

**Example.** For $x \ge 1$ the inequality $e^{-x^2} \le e^{-x}$ holds (since $x^2 \ge x$). Because $\int_1^\infty e^{-x}\,dx = e^{-1}$ converges, the comparison test gives $\int_1^\infty e^{-x^2}\,dx < \infty$.

## The limit comparison test

Sometimes you cannot bound $f$ directly by a simpler function, but you can compare their asymptotic sizes.

**Theorem (limit comparison test).** Let $f(x), g(x) > 0$ for $x \ge a$ and suppose

$$
\lim_{x \to \infty} \frac{f(x)}{g(x)} = L, \quad 0 < L < \infty.
$$

Then $\int_a^\infty f$ converges if and only if $\int_a^\infty g$ converges.

*Proof.* Since $f/g \to L$, there exists $A$ such that for $x \ge A$,

$$
\frac{L}{2} \le \frac{f(x)}{g(x)} \le 2L,
$$

that is, $\frac{L}{2}\,g(x) \le f(x) \le 2L\,g(x)$. The ordinary comparison test applied on $[A, \infty)$ then gives the equivalence. $\square$

**Example.** Compare $f(x) = \frac{1}{x^2 + 1}$ with $g(x) = x^{-2}$. Then $f(x)/g(x) = x^2/(x^2+1) \to 1$. Since $\int_1^\infty x^{-2}\,dx$ converges (the $p$-integral with $p = 2 > 1$), the integral $\int_1^\infty \frac{dx}{x^2+1}$ also converges.

**Boundary case $L = 0$ or $L = \infty$.** If $L = 0$, then $f = o(g)$: convergence of $\int g$ implies convergence of $\int f$, but the converse need not hold. If $L = \infty$, the roles reverse.

## Absolute versus conditional convergence

**Definition.** The integral $\int_a^\infty f(x)\,dx$ is **absolutely convergent** if $\int_a^\infty |f(x)|\,dx$ converges. It is **conditionally convergent** if $\int_a^\infty f$ converges but $\int_a^\infty |f|$ diverges.

**Proposition.** Absolute convergence implies convergence.

*Proof.* By the Cauchy criterion and the triangle inequality:

$$
\left|\int_A^B f\right| \le \int_A^B |f|.
$$

If $\int |f|$ converges, then $\int_A^B |f|$ can be made arbitrarily small for large $A$, and the same bound applies to $|\int_A^B f|$. $\square$

The converse fails. The integral $\int_1^\infty \frac{\sin x}{x}\,dx$ is conditionally convergent: it converges (shown below) but $\int_1^\infty \frac{|\sin x|}{x}\,dx = \infty$ (shown at the end of this checkpoint).

## The Abel–Dirichlet tests

For oscillatory integrals where absolute convergence fails, two tests handle the most common situations. Both are continuous analogues of the corresponding tests for series.

### Dirichlet's test

**Theorem (Dirichlet's test).** Suppose:
1. $F(x) \coloneqq \int_a^x f(t)\,dt$ is **bounded**: there exists $M$ such that $|F(x)| \le M$ for all $x \ge a$.
2. $g$ is **monotone decreasing** to $0$: $g(x) \to 0$ as $x \to \infty$.

Then $\int_a^\infty f(x)\,g(x)\,dx$ converges.

*Proof.* Apply Bonnet's theorem (the [second mean value theorem](../second_mean_value_theorem_integral/)) on $[A, B]$: there exists $\xi \in [A, B]$ with

$$
\int_A^B f(x)\,g(x)\,dx = g(A)\int_A^\xi f(x)\,dx + g(B)\int_\xi^B f(x)\,dx.
$$

Now $\int_A^\xi f = F(\xi) - F(A)$, so $|\int_A^\xi f| \le 2M$, and similarly $|\int_\xi^B f| \le 2M$. Therefore

$$
\left|\int_A^B f(x)\,g(x)\,dx\right| \le 2M\,g(A) + 2M\,g(B) \le 4M\,g(A).
$$

Since $g(A) \to 0$ as $A \to \infty$, the Cauchy criterion is satisfied. $\square$

### Abel's test

**Theorem (Abel's test).** Suppose:
1. $\int_a^\infty f(x)\,dx$ **converges**.
2. $g$ is **monotone** and **bounded** on $[a, \infty)$.

Then $\int_a^\infty f(x)\,g(x)\,dx$ converges.

*Proof.* Since $g$ is monotone and bounded, it has a finite limit $L = \lim_{x \to \infty} g(x)$. Write $g = (g - L) + L$. The function $g - L$ is monotone tending to $0$, and $L$ is a constant. Therefore

$$
\int_a^\infty f g = L \int_a^\infty f + \int_a^\infty f\,(g - L).
$$

The first integral converges by hypothesis. The second converges by Dirichlet's test applied to $f$ and $g - L$ (whose antiderivative $F(x) = \int_a^x f$ is bounded because $\int_a^\infty f$ converges, by the Cauchy criterion). $\square$

## Worked examples

### $\int_1^\infty \frac{\sin x}{x}\,dx$ converges (Dirichlet)

Set $f(x) = \sin x$ and $g(x) = 1/x$. The antiderivative $F(x) = -\cos x + \cos 1$ satisfies $|F(x)| \le 2$ for all $x$, and $g(x) = 1/x \searrow 0$. By Dirichlet's test, $\int_1^\infty \frac{\sin x}{x}\,dx$ converges.

### $\int_1^\infty \frac{\sin x}{x^2}\,dx$ converges absolutely

For all $x$, $\left|\frac{\sin x}{x^2}\right| \le \frac{1}{x^2}$. Since $\int_1^\infty x^{-2}\,dx$ converges ($p = 2 > 1$), the comparison test gives absolute convergence.

### $\int_1^\infty \frac{dx}{x}$ diverges

This is the $p = 1$ case of the Type 1 $p$-integral from [Improper Integrals](../improper_integrals/). Since $\ln b \to \infty$, the integral diverges.

### $\int_1^\infty \frac{|\sin x|}{x}\,dx$ diverges

On each interval $[k\pi, (k+1)\pi]$, $|\sin x| \ge 0$ and $\int_{k\pi}^{(k+1)\pi} |\sin x|\,dx = 2$. Since $\frac{1}{x} \ge \frac{1}{(k+1)\pi}$ on this interval,

$$
\int_{k\pi}^{(k+1)\pi} \frac{|\sin x|}{x}\,dx \ge \frac{2}{(k+1)\pi}.
$$

The right side is the general term of a divergent series ($\sum 1/(k+1)$ diverges), so by the comparison test the integral diverges. This confirms that $\int_1^\infty \frac{\sin x}{x}\,dx$ is conditionally but not absolutely convergent.

## Summary

- **Cauchy criterion**: $\int_a^\infty f$ converges iff $|\int_A^B f|$ can be made arbitrarily small for all $B > A$ sufficiently large.
- **Comparison test**: for $0 \le f \le g$, convergence of $\int g$ implies convergence of $\int f$; divergence of $\int f$ implies divergence of $\int g$.
- **Limit comparison test**: if $f, g > 0$ and $f/g \to L \in (0, \infty)$, then $\int f$ and $\int g$ converge or diverge together.
- **Absolute convergence** ($\int |f| < \infty$) implies convergence; the converse fails.
- **Dirichlet's test**: bounded $F(x) = \int_a^x f$ plus $g \searrow 0$ guarantees $\int fg$ converges.
- **Abel's test**: convergent $\int f$ plus monotone bounded $g$ guarantees $\int fg$ converges.
- $\int_1^\infty \frac{\sin x}{x}\,dx$ converges conditionally (Dirichlet); $\int_1^\infty \frac{\sin x}{x^2}\,dx$ converges absolutely (comparison); $\int_1^\infty \frac{dx}{x}$ and $\int_1^\infty \frac{|\sin x|}{x}\,dx$ both diverge.
