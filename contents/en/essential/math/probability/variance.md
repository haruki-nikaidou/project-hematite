---
title: Variance
summary: "The variance Var(X) = E[(X − E[X])²] measures the average squared deviation of X from its mean, and is the simplest non-trivial statistic of spread. This checkpoint derives the computational form Var(X) = E[X²] − (E[X])², proves the scaling rule Var(aX + b) = a² Var(X), and discusses why variance — not standard deviation — is the algebraically natural quantity even though only the standard deviation σ = √Var(X) has the same units as X."
prerequisites:
  - essential/math/probability/expectation
aliases: []
tags:
  - Probability
  - Expectation
updated: 2026-05-22
---

[Expectation](../expectation/) tells you where the distribution is centred. Variance tells you how spread out it is around that centre — how much a typical observation deviates from the mean. It is the simplest second-order property of a distribution, and it underlies everything from the standard error of an estimator to the volatility of a financial instrument.

## Definition

Let $X$ be a random variable with finite expectation $\mu \coloneqq E[X]$. The **variance** of $X$ is

$$
\operatorname{Var}(X) \coloneqq E\bigl[(X - \mu)^2\bigr].
$$

It is the expected squared deviation of $X$ from its mean. Since $(X - \mu)^2 \geq 0$, the variance is always non-negative: $\operatorname{Var}(X) \geq 0$.

The **standard deviation** is

$$
\sigma_X \coloneqq \sqrt{\operatorname{Var}(X)},
$$

which has the same physical units as $X$ itself. Variance is the more algebraically convenient quantity, but standard deviation is what you report in practice.

## The computational formula

Expanding the square and applying linearity of expectation gives a formula that avoids computing $\mu$ first:

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2. \tag{1}
$$

*Proof.*

$$
\operatorname{Var}(X) = E\bigl[(X - \mu)^2\bigr] = E[X^2 - 2\mu X + \mu^2] = E[X^2] - 2\mu E[X] + \mu^2 = E[X^2] - 2\mu^2 + \mu^2 = E[X^2] - \mu^2.
$$

Formula $(1)$ is the standard computational shortcut: you only need to compute $E[X]$ and $E[X^2]$.

**Example.** For $X \sim \operatorname{Uniform}(a, b)$ with density $f(x) = \frac{1}{b-a}$ on $[a,b]$:

$$
E[X] = \frac{a+b}{2}, \qquad E[X^2] = \frac{a^2 + ab + b^2}{3},
$$

so

$$
\operatorname{Var}(X) = \frac{a^2 + ab + b^2}{3} - \frac{(a+b)^2}{4} = \frac{(b-a)^2}{12}.
$$

## Scaling and shift rules

**Theorem.** For constants $a, b \in \mathbb{R}$:

$$
\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X). \tag{2}
$$

*Proof.* Let $Y = aX + b$. Then $E[Y] = aE[X] + b$, so $Y - E[Y] = a(X - E[X])$. Therefore:

$$
\operatorname{Var}(Y) = E\bigl[(Y - E[Y])^2\bigr] = E\bigl[a^2 (X - E[X])^2\bigr] = a^2 \operatorname{Var}(X).
$$

Two observations:
- **Shifts don't affect variance.** Adding a constant $b$ moves the distribution but doesn't change its spread.
- **Scaling squares.** Multiplying $X$ by $a$ multiplies the standard deviation by $|a|$ and the variance by $a^2$.

Equivalently, $\sigma_{aX+b} = |a| \sigma_X$.

## Variance is not linear

Unlike expectation, variance is not linear: $\operatorname{Var}(X + Y) \neq \operatorname{Var}(X) + \operatorname{Var}(Y)$ in general. The correct formula involves the **covariance**:

$$
\operatorname{Var}(X + Y) = \operatorname{Var}(X) + 2\operatorname{Cov}(X, Y) + \operatorname{Var}(Y).
$$

When $X$ and $Y$ are **independent**, $\operatorname{Cov}(X, Y) = 0$ (proved in [Independence of Random Variables](../2d_random_variables/independent/)), so independence does give additivity:

$$
\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) \quad \text{when } X, Y \text{ independent.}
$$

More generally, for $n$ independent variables:

$$
\operatorname{Var}(X_1 + \cdots + X_n) = \operatorname{Var}(X_1) + \cdots + \operatorname{Var}(X_n).
$$

## Chebyshev's inequality

Variance bounds the probability of large deviations from the mean. **Chebyshev's inequality** states: for any $k > 0$,

$$
P\bigl(|X - \mu| \geq k\sigma\bigr) \leq \frac{1}{k^2}. \tag{3}
$$

More generally, for any $\varepsilon > 0$:

$$
P\bigl(|X - \mu| \geq \varepsilon\bigr) \leq \frac{\operatorname{Var}(X)}{\varepsilon^2}.
$$

*Proof.* By Markov's inequality applied to the non-negative random variable $(X - \mu)^2$:

$$
P\bigl((X - \mu)^2 \geq \varepsilon^2\bigr) \leq \frac{E[(X-\mu)^2]}{\varepsilon^2} = \frac{\operatorname{Var}(X)}{\varepsilon^2}.
$$

Chebyshev's inequality is weak (it holds for any distribution) but universally applicable. It is the key tool in proving the **weak law of large numbers**: if $X_1, X_2, \ldots$ are i.i.d.\ with mean $\mu$ and finite variance, then $\overline{X}_n = \frac{1}{n}\sum_{k=1}^n X_k$ converges in probability to $\mu$.

*Quick proof.* $E[\overline{X}_n] = \mu$ and $\operatorname{Var}(\overline{X}_n) = \frac{\operatorname{Var}(X_1)}{n} \to 0$ by independence and the scaling rule. Chebyshev gives $P(|\overline{X}_n - \mu| \geq \varepsilon) \leq \frac{\operatorname{Var}(X_1)}{n\varepsilon^2} \to 0$.

## Why variance rather than mean absolute deviation?

Variance squares the deviation. An alternative spread measure is the **mean absolute deviation** $E[|X - \mu|]$. Both capture spread, but variance has three practical advantages:

1. **Algebra.** The variance of a sum of independent variables is the sum of variances (as above). The analogous result for mean absolute deviation fails.
2. **Smoothness.** The function $x \mapsto x^2$ is everywhere differentiable; $x \mapsto |x|$ is not differentiable at $0$. Variance appears naturally in calculus-based derivations (ordinary least squares, Fisher information, etc.).
3. **Completeness.** Variance extends to the covariance matrix for multivariate distributions, which mean absolute deviation cannot.

The cost is interpretability: $\sigma^2$ has units of $(\text{units of } X)^2$, which is why standard deviation $\sigma$ is always reported alongside variance.

## Summary

- $\operatorname{Var}(X) \coloneqq E[(X - E[X])^2] \geq 0$ measures average squared spread around the mean.
- **Computational formula**: $\operatorname{Var}(X) = E[X^2] - (E[X])^2$.
- **Scaling rule**: $\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X)$; shifts do not affect variance.
- **Independence additivity**: $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$ when $X, Y$ are independent.
- **Chebyshev's inequality**: $P(|X - \mu| \geq \varepsilon) \leq \operatorname{Var}(X) / \varepsilon^2$ — a universal (though weak) tail bound.
- Variance is algebraically natural (additive under independence, smooth); standard deviation $\sigma = \sqrt{\operatorname{Var}(X)}$ is what you report because it matches the units of $X$.

