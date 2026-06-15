---
title: Hölder's Inequality
summary: "Proves Hölder's inequality |∑ aᵢbᵢ| ≤ (∑ |aᵢ|ᵖ)^{1/p} (∑ |bᵢ|ᵍ)^{1/q} for conjugate exponents 1/p + 1/q = 1 with p, q > 1, by normalising the sequences and applying Young's inequality termwise."
prerequisites:
  - proof/basis/math/youngs_inequalities
aliases: []
tags:
  - Proof
  - Inequalities
updated: 2026-05-20
---

Hölder's inequality is the workhorse bound for pairing two sequences: it controls the sum of products $\sum a_i b_i$ by the separate "sizes" of the two sequences, measured in conjugate $\ell^p$ and $\ell^q$ norms. Taking $p = q = 2$ recovers the Cauchy–Schwarz inequality, and the general case is what makes [Minkowski's inequality](../minkowskis_inequalities/) — the triangle inequality for $\ell^p$ — provable. Everything reduces to applying [Young's inequality](../youngs_inequalities/) one term at a time.

## The theorem

**Theorem (Hölder's Inequality).** Let $p, q > 1$ be conjugate exponents, $\dfrac{1}{p} + \dfrac{1}{q} = 1$, and let $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$ be real (or complex) numbers. Then

$$
\sum_{i=1}^{n} |a_i b_i| \;\leq\; \left(\sum_{i=1}^{n} |a_i|^{p}\right)^{1/p} \left(\sum_{i=1}^{n} |b_i|^{q}\right)^{1/q}. \tag{1}
$$

Since $\big|\sum_i a_i b_i\big| \leq \sum_i |a_i b_i|$, the same bound controls the modulus of the inner product.

## The idea: normalise, then apply Young termwise

[Young's inequality](../youngs_inequalities/) bounds a single product $ab$ by $a^p/p + b^q/q$. Summing that over $i$ would give $\sum |a_i b_i| \leq \tfrac{1}{p}\sum|a_i|^p + \tfrac{1}{q}\sum|b_i|^q$ — close, but the right side is a *sum* of the two norms rather than their *product*. The fix is to rescale each sequence to have unit norm first, where the sum-of-powers collapses to $1$, and then undo the scaling.

## Proof

Write

$$
A \coloneqq \left(\sum_{i=1}^{n} |a_i|^{p}\right)^{1/p}, \qquad
B \coloneqq \left(\sum_{i=1}^{n} |b_i|^{q}\right)^{1/q}.
$$

**Degenerate case.** If $A = 0$ then every $a_i = 0$, so the left side of $(1)$ is $0$ and the inequality holds trivially; likewise if $B = 0$. Assume from now on $A, B > 0$.

**Normalise.** Define the rescaled quantities

$$
\alpha_i \coloneqq \frac{|a_i|}{A}, \qquad \beta_i \coloneqq \frac{|b_i|}{B}.
$$

By construction they have unit $p$- and $q$-norms:

$$
\sum_{i=1}^{n} \alpha_i^{p} \;=\; \frac{1}{A^{p}}\sum_{i=1}^{n} |a_i|^{p} \;=\; 1,
\qquad
\sum_{i=1}^{n} \beta_i^{q} \;=\; \frac{1}{B^{q}}\sum_{i=1}^{n} |b_i|^{q} \;=\; 1. \tag{2}
$$

**Apply Young termwise.** For each $i$, Young's inequality applied to the non-negative numbers $\alpha_i, \beta_i$ gives

$$
\alpha_i \beta_i \;\leq\; \frac{\alpha_i^{p}}{p} + \frac{\beta_i^{q}}{q}.
$$

Sum over $i = 1, \ldots, n$ and use $(2)$:

$$
\sum_{i=1}^{n} \alpha_i \beta_i
\;\leq\; \frac{1}{p}\sum_{i=1}^{n}\alpha_i^{p} + \frac{1}{q}\sum_{i=1}^{n}\beta_i^{q}
\;=\; \frac{1}{p} + \frac{1}{q}
\;=\; 1.
$$

**Undo the scaling.** The left side is $\dfrac{1}{AB}\sum_i |a_i b_i|$, so multiplying through by $AB$ gives

$$
\sum_{i=1}^{n} |a_i b_i| \;\leq\; AB \;=\; \left(\sum_{i=1}^{n} |a_i|^{p}\right)^{1/p}\left(\sum_{i=1}^{n} |b_i|^{q}\right)^{1/q}. \quad \square
$$

## Cauchy–Schwarz as a special case

Setting $p = q = 2$ (which are conjugate, since $\tfrac{1}{2} + \tfrac{1}{2} = 1$) turns $(1)$ into

$$
\sum_{i=1}^{n} |a_i b_i| \;\leq\; \left(\sum_{i=1}^{n} a_i^{2}\right)^{1/2}\left(\sum_{i=1}^{n} b_i^{2}\right)^{1/2},
$$

the Cauchy–Schwarz inequality. Hölder is thus its one-parameter generalisation.

## Summary

- **Hölder's inequality**: for conjugate $p, q$, $\sum_i |a_i b_i| \leq \big(\sum_i |a_i|^p\big)^{1/p}\big(\sum_i |b_i|^q\big)^{1/q}$.
- **Proof in three moves**: rescale each sequence to unit norm, apply [Young's inequality](../youngs_inequalities/) to each term, then multiply the scaling factors back in.
- **Why normalisation matters**: at unit norm the sums of powers become $1/p$ and $1/q$, which add to exactly $1$.
- **Cauchy–Schwarz** is the case $p = q = 2$.
- Hölder is the key ingredient in the proof of [Minkowski's inequality](../minkowskis_inequalities/).
