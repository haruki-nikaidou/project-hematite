---
title: Normal Distribution
summary: "The Normal (Gaussian) distribution N(μ, σ²) has density f(x) = (2πσ²)^(−1/2) exp(−(x − μ)² / 2σ²) on ℝ. This checkpoint defines the standard and general Normal, verifies that the density integrates to one (the classical √(2π) computation), computes its mean μ and variance σ², and explains why the Normal is the limiting distribution of standardised sums via the Central Limit Theorem."
prerequisites:
  - essential/math/probability/random_variables/concept
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

Measure almost any naturally occurring quantity — adult heights, measurement errors, test scores, the average of many independent observations — and the same bell-shaped curve keeps appearing. The **Normal distribution** (also called the **Gaussian distribution**) is the universal distribution of averages, and understanding it is essential to virtually every branch of applied mathematics and statistics.

## The Gaussian integral

Before defining the Normal distribution, we need one classical result: the integral

$$
I \coloneqq \int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}.
$$

**Proof via polar coordinates.** Consider $I^2$:

$$
I^2 = \left(\int_{-\infty}^{\infty} e^{-x^2}\, dx\right)\!\left(\int_{-\infty}^{\infty} e^{-y^2}\, dy\right) = \iint_{\mathbb{R}^2} e^{-(x^2 + y^2)}\, dx\, dy.
$$

Convert to polar coordinates $x = r\cos\theta$, $y = r\sin\theta$, with $r \geq 0$ and $\theta \in [0, 2\pi)$. The Jacobian is $r$, and $x^2 + y^2 = r^2$:

$$
I^2 = \int_0^{2\pi}\int_0^{\infty} e^{-r^2} r\, dr\, d\theta = 2\pi \int_0^{\infty} r e^{-r^2}\, dr.
$$

Substitute $u = r^2$, $du = 2r\, dr$:

$$
I^2 = 2\pi \int_0^{\infty} \frac{1}{2} e^{-u}\, du = \pi \cdot \bigl[-e^{-u}\bigr]_0^{\infty} = \pi.
$$

Since $I > 0$, we conclude $I = \sqrt{\pi}$. $\square$

A useful rescaled form follows immediately: substituting $x = t/\sqrt{2}$ gives

$$
\int_{-\infty}^{\infty} e^{-t^2/2}\, dt = \sqrt{2\pi}.
$$

## Standard Normal distribution

The **standard Normal distribution** $Z \sim N(0, 1)$ has **probability density function (PDF)**

$$
\varphi(x) \coloneqq \frac{1}{\sqrt{2\pi}}\, e^{-x^2/2}, \qquad x \in \mathbb{R}.
$$

### Verification that $\varphi$ integrates to 1

$$
\int_{-\infty}^{\infty} \varphi(x)\, dx = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-x^2/2}\, dx = \frac{1}{\sqrt{2\pi}} \cdot \sqrt{2\pi} = 1,
$$

using the Gaussian integral result above. The factor $1/\sqrt{2\pi}$ is precisely the normalising constant.

## General Normal distribution

Let $\mu \in \mathbb{R}$ be a **location parameter** (mean) and $\sigma^2 > 0$ be a **scale parameter** (variance). A [random variable](../concept/) $X$ follows a Normal distribution with mean $\mu$ and variance $\sigma^2$, written $X \sim N(\mu, \sigma^2)$, if

$$
X \coloneqq \mu + \sigma Z, \qquad Z \sim N(0, 1).
$$

Equivalently, $X$ has PDF

$$
f(x) \coloneqq \frac{1}{\sqrt{2\pi\sigma^2}}\,\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \qquad x \in \mathbb{R}.
$$

**Verification.** Substituting $z = (x - \mu)/\sigma$ transforms the integral $\int_{-\infty}^\infty f(x)\,dx$ into $\int_{-\infty}^\infty \varphi(z)\,dz = 1$.

The parameter $\sigma \coloneqq \sqrt{\sigma^2}$ is the **standard deviation**.

## Mean

$$
E[X] = E[\mu + \sigma Z] = \mu + \sigma E[Z].
$$

By the symmetry of $\varphi$ about zero, $E[Z] = 0$ (the integrand $x \varphi(x)$ is an odd function). Therefore

$$
E[X] = \mu.
$$

## Variance

We need $\operatorname{Var}(Z) = E[Z^2]$ for the standard Normal (since $E[Z] = 0$). Apply integration by parts with $u = x$ and $dv = x e^{-x^2/2}\,dx$, so $v = -e^{-x^2/2}$:

$$
E[Z^2] = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} x^2 e^{-x^2/2}\, dx = \frac{1}{\sqrt{2\pi}} \left(\Bigl[-x e^{-x^2/2}\Bigr]_{-\infty}^{\infty} + \int_{-\infty}^{\infty} e^{-x^2/2}\, dx\right).
$$

The boundary term vanishes since $x e^{-x^2/2} \to 0$ as $|x| \to \infty$. The remaining integral equals $\sqrt{2\pi}$, so

$$
E[Z^2] = \frac{1}{\sqrt{2\pi}} \cdot \sqrt{2\pi} = 1.
$$

Hence $\operatorname{Var}(Z) = 1$. For the general case, using $X = \mu + \sigma Z$ and independence:

$$
\operatorname{Var}(X) = \sigma^2 \operatorname{Var}(Z) = \sigma^2.
$$

## Affine stability

**Theorem.** If $X \sim N(\mu, \sigma^2)$ and $a, b \in \mathbb{R}$ with $a \neq 0$, then

$$
aX + b \sim N(a\mu + b,\; a^2\sigma^2).
$$

**Proof.** Write $X = \mu + \sigma Z$ with $Z \sim N(0,1)$. Then

$$
aX + b = a(\mu + \sigma Z) + b = (a\mu + b) + (a\sigma) Z.
$$

This is of the form $\mu' + \sigma' Z$ with $\mu' = a\mu + b$ and $\sigma' = a\sigma$, so $aX + b \sim N(a\mu + b,\, a^2\sigma^2)$. $\square$

**Corollary.** Any $X \sim N(\mu, \sigma^2)$ can be standardised: $(X - \mu)/\sigma \sim N(0, 1)$.

## Central Limit Theorem

The Normal distribution is not just one of many distributions — it is the universal limit of standardised sums. The **Central Limit Theorem (CLT)** makes this precise.

**Theorem (CLT).** Let $X_1, X_2, \ldots$ be independent and identically distributed (i.i.d.) random variables with mean $\mu$ and finite variance $\sigma^2 > 0$. Define the standardised sum

$$
Z_n \coloneqq \frac{(X_1 + X_2 + \cdots + X_n) - n\mu}{\sigma\sqrt{n}}.
$$

Then $Z_n \xrightarrow{d} N(0, 1)$ as $n \to \infty$: for every $z \in \mathbb{R}$,

$$
\lim_{n \to \infty} P(Z_n \leq z) = \Phi(z) \coloneqq \int_{-\infty}^{z} \varphi(t)\, dt.
$$

**Why this makes the Normal ubiquitous.** Any observed quantity that is the aggregate effect of many small, independent contributions — measurement noise, biological traits, financial returns — is well approximated by a Normal distribution, regardless of the shape of the individual contributing distributions. The CLT is the mathematical explanation for the bell curve's prevalence throughout science.

## Summary

- $Z \sim N(0,1)$ has PDF $\varphi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$; the normalising constant $1/\sqrt{2\pi}$ follows from the Gaussian integral $\int_{-\infty}^\infty e^{-t^2/2}\,dt = \sqrt{2\pi}$.
- $X \sim N(\mu, \sigma^2)$ has PDF $f(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\bigl(-(x-\mu)^2/(2\sigma^2)\bigr)$ and satisfies $X = \mu + \sigma Z$ with $Z \sim N(0,1)$.
- **Mean:** $E[X] = \mu$ (by symmetry of the standard Normal).
- **Variance:** $\operatorname{Var}(X) = \sigma^2$ (derived via integration by parts).
- **Affine stability:** $aX + b \sim N(a\mu + b, a^2\sigma^2)$; in particular $(X-\mu)/\sigma \sim N(0,1)$.
- **Central Limit Theorem:** the standardised sum of any $n$ i.i.d. finite-variance variables converges in distribution to $N(0,1)$, explaining the Normal's ubiquity.
