---
title: Second Mean Value Theorem for Integrals
summary: "If g is monotonic on [a, b] and f is integrable, there exists ξ ∈ [a, b] with ∫_a^b f(x) g(x) dx = g(a) ∫_a^ξ f(x) dx + g(b) ∫_ξ^b f(x) dx — Bonnet's form of the second mean value theorem. This checkpoint derives the theorem by an Abel-summation argument that pairs naturally with integration by parts, presents the special cases for g non-negative monotone, and uses it to establish convergence of oscillatory integrals such as ∫_1^∞ (sin x) / x dx."
prerequisites:
  - basis/math/calculus/riemann_integral/mean_value_theorem
  - basis/math/calculus/riemann_integral/integration_by_parts
aliases: []
tags:
  - Calculus
  - Integration
  - Mean Value Theorems
updated: 2026-05-22
---

The [first mean value theorem for integrals](../mean_value_theorem/) says that if $f$ is continuous on $[a, b]$, there is a point $\xi$ where $\int_a^b f = f(\xi)(b - a)$. But what if you want to integrate a product $f(x) g(x)$ and $g$ is only **monotonic**, not continuous? The second mean value theorem — known in this form as **Bonnet's theorem** — handles exactly that case. Instead of factoring $g$ out as a single number, it gives a split formula: the integral equals $g(a)$ times an integral over $[a, \xi]$ plus $g(b)$ times an integral over $[\xi, b]$. The idea behind the proof is a continuous analogue of Abel summation, combined with integration by parts.

## Statement: Bonnet's form

**Theorem (Second Mean Value Theorem for Integrals).** Let $g$ be monotone decreasing on $[a, b]$ and let $f$ be Riemann integrable on $[a, b]$. Then there exists $\xi \in [a, b]$ such that

$$
\int_a^b f(x)\,g(x)\,dx \;=\; g(a) \int_a^\xi f(x)\,dx \;+\; g(b) \int_\xi^b f(x)\,dx.
$$

The statement for monotone **increasing** $g$ follows by replacing $g$ with $-g$.

## Motivation: the discrete analogue (Abel summation)

Before proving the continuous theorem it is instructive to see the discrete version, called **Abel summation** (also Abel's summation formula). Given sequences $(a_k)$ and $(b_k)$ with partial sums $A_k = \sum_{j=1}^k a_j$, one has

$$
\sum_{k=1}^n a_k b_k \;=\; A_n b_n \;-\; \sum_{k=1}^{n-1} A_k (b_{k+1} - b_k).
$$

This is the discrete analogue of integration by parts: one "integrates" the $a_k$ sequence into running totals $A_k$, then "differentiates" the $b_k$ sequence into differences. If $b_k$ is decreasing, the differences $b_{k+1} - b_k \le 0$ have a definite sign, which lets you bound the sum by the extreme values of $A_k$. Exactly the same structure works in the continuous setting.

## Proof

**Step 1: integration by parts.** Define $G(x) \coloneqq \int_a^x f(t)\,dt$, the antiderivative of $f$ starting at $a$. Integration by parts gives

$$
\int_a^b f(x)\,g(x)\,dx = \int_a^b G'(x)\,g(x)\,dx = \bigl[G(x)\,g(x)\bigr]_a^b - \int_a^b G(x)\,g'(x)\,dx.
$$

Since $G(a) = 0$, the boundary term simplifies to $G(b)\,g(b)$. Writing $G(b) = \int_a^b f$:

$$
\int_a^b f(x)\,g(x)\,dx = g(b)\int_a^b f(x)\,dx - \int_a^b G(x)\,g'(x)\,dx. \tag{$*$}
$$

**Step 2: apply the first MVT to $-\int G\,g'$.** Because $g$ is decreasing and differentiable (we assume for now), $g'(x) \le 0$, so $-g'(x) \ge 0$. The function $-g'$ is a non-negative integrable weight. By the first mean value theorem in its weighted form (see [Mean Value Theorem for Integrals](../mean_value_theorem/)), there exists $\xi \in [a, b]$ such that

$$
-\int_a^b G(x)\,g'(x)\,dx = G(\xi) \cdot \left(-\int_a^b g'(x)\,dx\right) = G(\xi)\,\bigl(g(a) - g(b)\bigr).
$$

**Step 3: collect.** Substituting back into $(*)$:

$$
\int_a^b f(x)\,g(x)\,dx = g(b)\int_a^b f(x)\,dx + G(\xi)\,\bigl(g(a) - g(b)\bigr).
$$

Rewrite using $\int_a^b f = \int_a^\xi f + \int_\xi^b f$ and $G(\xi) = \int_a^\xi f$:

$$
= g(b)\left(\int_a^\xi f + \int_\xi^b f\right) + \int_a^\xi f\,(g(a) - g(b))
= g(a)\int_a^\xi f(x)\,dx + g(b)\int_\xi^b f(x)\,dx. \quad \square
$$

*Remark.* The proof above assumed $g$ is differentiable. For merely monotone $g$, the argument is completed using a Riemann–Stieltjes integration by parts or by approximating $g$ by smooth monotone functions; the conclusion is the same.

## Special case: non-negative decreasing weight

If $g \ge 0$ and decreasing, then $g(b) \ge 0$, and the formula simplifies. Since the split formula holds, and $g(b) \ge 0$, one can in fact take $g(b) = 0$ as a limiting case when $g(b) = 0$. More directly, when you only know $g \ge 0$ and decreasing, you can state:

**Corollary.** If $g \ge 0$ is decreasing on $[a, b]$ and $f$ is integrable, there exists $\xi \in [a, b]$ with

$$
\int_a^b f(x)\,g(x)\,dx \;=\; g(a)\int_a^\xi f(x)\,dx.
$$

*Proof.* In the full Bonnet formula, $g(b) \ge 0$ and $\int_\xi^b f$ is bounded. When $g(b) = 0$ the second term vanishes identically. For the general non-negative decreasing case, the proof is obtained by applying Bonnet to $h = g - g(b) \ge 0$ (which has $h(b) = 0$) and absorbing the $g(b)\int_a^b f$ remainder. $\square$

This corollary is sometimes what textbooks call the second mean value theorem; Bonnet's form is the sharper version that retains the $g(b)$ term.

## Application: convergence of $\int_1^\infty \frac{\sin x}{x}\,dx$

The integral $\int_1^\infty \frac{\sin x}{x}\,dx$ is not absolutely convergent (we will show this in the [Convergence of Improper Integrals](../improper_integral_convergence/) checkpoint), yet it does converge. Bonnet's theorem is the key tool.

**Claim.** For all $1 \le A < B$,

$$
\left|\int_A^B \frac{\sin x}{x}\,dx\right| \;\le\; \frac{4}{A}.
$$

**Proof.** Apply Bonnet's theorem on $[A, B]$ with $f(x) = \sin x$ and $g(x) = 1/x$ (which is positive and decreasing). There exists $\xi \in [A, B]$ such that

$$
\int_A^B \frac{\sin x}{x}\,dx = \frac{1}{A}\int_A^\xi \sin x\,dx + \frac{1}{B}\int_\xi^B \sin x\,dx.
$$

For any interval $[u, v]$, $|\int_u^v \sin x\,dx| = |\cos u - \cos v| \le 2$. Therefore

$$
\left|\int_A^B \frac{\sin x}{x}\,dx\right| \;\le\; \frac{1}{A} \cdot 2 + \frac{1}{B} \cdot 2 \;\le\; \frac{2}{A} + \frac{2}{A} = \frac{4}{A}.
$$

Since the right side tends to $0$ as $A \to \infty$, the **Cauchy criterion** for improper integrals (developed in the next checkpoint) confirms convergence. $\square$

This is a prototype argument: whenever $g$ is monotone tending to $0$ and the "oscillating part" $f$ has bounded antiderivative, Bonnet supplies the key estimate.

## Summary

- The **second mean value theorem (Bonnet's form)** states: if $g$ is monotone decreasing and $f$ is integrable on $[a, b]$, there exists $\xi \in [a, b]$ with $\int_a^b fg = g(a)\int_a^\xi f + g(b)\int_\xi^b f$.
- The proof integrates $\int fg$ by parts, writing $F(x) = \int_a^x f$, and then applies the first MVT to the resulting integral $-\int F g'$ (which has a non-negative weight $-g' \ge 0$).
- If $g \ge 0$ and decreasing, the formula simplifies to $\int_a^b fg = g(a)\int_a^\xi f$ for some $\xi$.
- Bonnet's theorem is the key ingredient for proving convergence of oscillatory integrals such as $\int_1^\infty \frac{\sin x}{x}\,dx$, where absolute convergence fails but monotone decay of $1/x$ tames the oscillation.
