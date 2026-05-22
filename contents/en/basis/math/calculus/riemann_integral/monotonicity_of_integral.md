---
title: Monotonicity of the Integral
summary: "If f, g are integrable on [a, b] and f ≤ g pointwise, then ∫_a^b f ≤ ∫_a^b g. This checkpoint proves monotonicity from the definition of Darboux sums, derives the standard estimate |∫_a^b f| ≤ ∫_a^b |f|, and obtains the bound m(b − a) ≤ ∫_a^b f ≤ M(b − a) for any bounds m ≤ f ≤ M — the ingredients of the integral mean value theorem."
prerequisites:
  - basis/math/calculus/riemann_integral/def
aliases: []
tags:
  - Calculus
  - Integration
updated: 2026-05-22
---

Once you have the integral as a limit of Darboux sums, the first order of business is to understand what you can *do* with it. One of the most useful facts is also the most intuitive: if one function lies above another, its integral is larger. This single property — **monotonicity** — is the source of almost every estimate involving integrals.

## Monotonicity

**Theorem.** Let $f, g: [a,b] \to \mathbb{R}$ be Riemann integrable. If $f(x) \le g(x)$ for all $x \in [a,b]$, then

$$
\int_a^b f(x)\,dx \;\le\; \int_a^b g(x)\,dx.
$$

**Proof.** For any partition $P$, every upper Darboux sum satisfies $U(f, P) \le U(g, P)$ because $\sup_{[x_{i-1},x_i]} f \le \sup_{[x_{i-1},x_i]} g$. Taking the infimum over all partitions gives $\int_a^b f \le \overline{\int_a^b} g = \int_a^b g$. (An identical argument works with lower sums.) $\square$

## Linearity of the integral

As a companion to monotonicity, the integral is **linear**: if $f$ and $g$ are integrable and $\alpha, \beta \in \mathbb{R}$, then $\alpha f + \beta g$ is integrable and

$$
\int_a^b (\alpha f + \beta g) = \alpha \int_a^b f + \beta \int_a^b g.
$$

This follows from the definition: linearity of sums passes through the supremum/infimum to the integral.

## The absolute-value estimate

**Corollary.** If $f$ is integrable on $[a,b]$, then $|f|$ is also integrable and

$$
\left|\int_a^b f(x)\,dx\right| \;\le\; \int_a^b |f(x)|\,dx.
$$

**Proof.** From $-|f(x)| \le f(x) \le |f(x)|$, apply monotonicity twice:

$$
-\int_a^b |f| \;\le\; \int_a^b f \;\le\; \int_a^b |f|.
$$

This is equivalent to $|\int_a^b f| \le \int_a^b |f|$. (Integrability of $|f|$ follows because the oscillation of $|f|$ on any interval is $\le$ the oscillation of $f$, so the Darboux criterion carries over.) $\square$

This estimate is the integral analogue of the triangle inequality for sums $|\sum a_i| \le \sum |a_i|$.

## Bounds via pointwise estimates

**Corollary.** If $f$ is integrable and $m \le f(x) \le M$ for all $x \in [a,b]$, then

$$
m(b-a) \;\le\; \int_a^b f(x)\,dx \;\le\; M(b-a). \tag{1}
$$

**Proof.** Apply monotonicity to $m \le f \le M$: since the integral of the constant $m$ over $[a,b]$ is $m(b-a)$, and similarly for $M$. $\square$

The bounds $(1)$ are the key ingredient in the [mean value theorem for integrals](../mean_value_theorem/): squeeze $\int f / (b-a)$ between $m$ and $M$ and apply the Intermediate Value Theorem.

## A worked estimate

How large can $\int_0^1 e^{-x^2}\,dx$ be? The integrand satisfies $e^{-1} \le e^{-x^2} \le 1$ on $[0,1]$ (since $0 \le x^2 \le 1$), so $(1)$ gives immediately:

$$
e^{-1} \;\le\; \int_0^1 e^{-x^2}\,dx \;\le\; 1.
$$

The exact value ($\frac{\sqrt\pi}{2}\,\mathrm{erf}(1) \approx 0.747$) requires more work, but the bound comes for free from monotonicity.

## Summary

- **Monotonicity**: $f \le g$ pointwise implies $\int f \le \int g$.
- **Linearity**: $\int (\alpha f + \beta g) = \alpha \int f + \beta \int g$.
- **Absolute-value estimate**: $|\int_a^b f| \le \int_a^b |f|$ — the integral version of the triangle inequality.
- **Bound**: if $m \le f \le M$ everywhere, then $m(b-a) \le \int_a^b f \le M(b-a)$.
- These properties combine to give all the standard estimates used in analysis.
