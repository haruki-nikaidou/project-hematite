---
title: Minkowski's Inequality
summary: "Proves Minkowski's inequality (∑ |aᵢ + bᵢ|ᵖ)^{1/p} ≤ (∑ |aᵢ|ᵖ)^{1/p} + (∑ |bᵢ|ᵖ)^{1/p} for p ≥ 1, the triangle inequality for the ℓᵖ norm, by splitting |aᵢ + bᵢ|ᵖ = |aᵢ + bᵢ|·|aᵢ + bᵢ|^{p−1} and applying Hölder's inequality to each piece."
prerequisites:
  - proof/basis/math/holders_inequalities
aliases: []
tags:
  - Proof
  - Inequalities
updated: 2026-05-20
---

For the $\ell^p$ norm to deserve the name *norm*, it must satisfy the triangle inequality: the length of a sum is at most the sum of the lengths. That statement is Minkowski's inequality, and it is the property that makes $\ell^p$ a genuine normed space. The proof is a clever splitting followed by a single application of [Hölder's inequality](../holders_inequalities/).

## The theorem

For $p \geq 1$, write the $\ell^p$ norm of a finite sequence as $\|a\|_p \coloneqq \big(\sum_i |a_i|^p\big)^{1/p}$.

**Theorem (Minkowski's Inequality).** Let $p \geq 1$ and let $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$ be real (or complex) numbers. Then

$$
\left(\sum_{i=1}^{n} |a_i + b_i|^{p}\right)^{1/p}
\;\leq\;
\left(\sum_{i=1}^{n} |a_i|^{p}\right)^{1/p}
+
\left(\sum_{i=1}^{n} |b_i|^{p}\right)^{1/p},
\tag{1}
$$

that is, $\|a + b\|_p \leq \|a\|_p + \|b\|_p$.

## The two easy exponents

**Case $p = 1$.** Inequality $(1)$ is just the ordinary triangle inequality summed termwise: $|a_i + b_i| \leq |a_i| + |b_i|$, so $\sum_i |a_i + b_i| \leq \sum_i |a_i| + \sum_i |b_i|$.

So assume $p > 1$ for the rest, and let $q = \dfrac{p}{p-1}$ be its conjugate exponent, so that $(p-1)q = p$ and $\dfrac{1}{p} + \dfrac{1}{q} = 1$.

## Proof for $p > 1$: split, then apply Hölder

Let $S \coloneqq \sum_{i=1}^{n} |a_i + b_i|^{p}$. If $S = 0$ both sides of $(1)$ are zero, so assume $S > 0$.

**Split the power.** Write one factor of $|a_i + b_i|$ off the front and bound it with the triangle inequality $|a_i + b_i| \leq |a_i| + |b_i|$:

$$
|a_i + b_i|^{p}
= |a_i + b_i|\,\cdot\,|a_i + b_i|^{p-1}
\;\leq\;
|a_i|\,|a_i + b_i|^{p-1} + |b_i|\,|a_i + b_i|^{p-1}.
$$

Summing over $i$,

$$
S \;\leq\;
\underbrace{\sum_{i=1}^{n} |a_i|\,|a_i + b_i|^{p-1}}_{(\mathrm{I})}
\;+\;
\underbrace{\sum_{i=1}^{n} |b_i|\,|a_i + b_i|^{p-1}}_{(\mathrm{II})}.
\tag{2}
$$

**Apply Hölder to each piece.** Treat $(\mathrm{I})$ as the pairing of the sequence $(|a_i|)$ with $(|a_i + b_i|^{p-1})$ and apply [Hölder's inequality](../holders_inequalities/) with exponents $p$ and $q$:

$$
(\mathrm{I})
\;\leq\;
\left(\sum_{i=1}^{n} |a_i|^{p}\right)^{1/p}
\left(\sum_{i=1}^{n} |a_i + b_i|^{(p-1)q}\right)^{1/q}.
$$

Because $(p-1)q = p$, the second factor is $\big(\sum_i |a_i + b_i|^{p}\big)^{1/q} = S^{1/q}$. Hence

$$
(\mathrm{I}) \;\leq\; \|a\|_p \, S^{1/q},
\qquad\text{and likewise}\qquad
(\mathrm{II}) \;\leq\; \|b\|_p \, S^{1/q}.
$$

**Combine.** Substituting both bounds into $(2)$,

$$
S \;\leq\; \big(\|a\|_p + \|b\|_p\big)\, S^{1/q}.
$$

Since $S > 0$, divide both sides by $S^{1/q}$. Using $1 - \dfrac{1}{q} = \dfrac{1}{p}$,

$$
S^{1/p} = S^{\,1 - 1/q} \;\leq\; \|a\|_p + \|b\|_p,
$$

which is exactly $(1)$. $\square$

## Why this matters

Minkowski's inequality is the **triangle inequality** for the $\ell^p$ norm. Together with the easy facts $\|a\|_p \geq 0$ (with equality only for the zero sequence) and $\|\lambda a\|_p = |\lambda|\,\|a\|_p$, it certifies that $\|\cdot\|_p$ is a genuine norm — and therefore that $\ell^p$ is a normed vector space for every $p \geq 1$. The same argument, with sums replaced by integrals, gives Minkowski's inequality for $L^p$ function spaces.

## Summary

- **Minkowski's inequality**: $\|a + b\|_p \leq \|a\|_p + \|b\|_p$ for $p \geq 1$ — the triangle inequality for the $\ell^p$ norm.
- **Case $p = 1$** is the termwise triangle inequality; the work is in $p > 1$.
- **Proof for $p > 1$**: split $|a_i + b_i|^p = |a_i + b_i|\cdot|a_i + b_i|^{p-1}$, bound the first factor by $|a_i| + |b_i|$, and apply [Hölder's inequality](../holders_inequalities/) to each resulting sum; the exponent identity $(p-1)q = p$ makes the leftover factor collapse to $S^{1/q}$.
- **Consequence**: $\|\cdot\|_p$ is a norm, so $\ell^p$ (and $L^p$) are normed spaces.
