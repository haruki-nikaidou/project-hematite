---
title: Covariance and Correlation
summary: "The covariance Cov(X, Y) = E[(X − E[X])(Y − E[Y])] measures the joint linear variability of two random variables, and its standardised form ρ(X, Y) = Cov(X, Y) / (σ_X σ_Y) is the Pearson correlation coefficient lying in [−1, 1]. This checkpoint derives the bilinearity of covariance, the variance-of-a-sum identity Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y), the Cauchy–Schwarz bound for correlation, and warns that zero covariance does not imply independence."
prerequisites:
  - essential/math/probability/2d_random_variables/jointly_distributed
  - essential/math/probability/variance
aliases: []
tags:
  - Probability
  - Random Variables
  - Expectation
updated: 2026-05-22
---

Two random variables can be independent, positively aligned, or negatively aligned. [Variance](../variance/) tells you how spread out a single variable is around its mean; **covariance** captures how much two variables move together. Its normalised form, the **Pearson correlation coefficient**, removes units and confines the answer to $[-1, 1]$, making distributions with very different scales comparable.

## Definition

Let $X$ and $Y$ be random variables with finite second moments: $E[X^2] < \infty$ and $E[Y^2] < \infty$. Set $\mu_X \coloneqq E[X]$ and $\mu_Y \coloneqq E[Y]$. The **covariance** of $X$ and $Y$ is

$$
\operatorname{Cov}(X, Y) \coloneqq E\bigl[(X - \mu_X)(Y - \mu_Y)\bigr].
$$

When $X$ and $Y$ tend to exceed their means simultaneously, the product $(X - \mu_X)(Y - \mu_Y)$ is typically positive, so $\operatorname{Cov}(X,Y) > 0$. When one tends to be above its mean as the other is below, the product is typically negative. Note that $\operatorname{Cov}(X, X) = E[(X - \mu_X)^2] = \operatorname{Var}(X)$, so covariance generalises variance.

## Computational formula

Expanding the product and applying linearity of expectation gives a formula that avoids centring the variables first:

$$
\operatorname{Cov}(X, Y) = E[XY] - E[X]\, E[Y]. \tag{1}
$$

*Proof.*

$$
E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - \mu_X E[Y] - \mu_Y E[X] + \mu_X \mu_Y = E[XY] - \mu_X \mu_Y.
$$

**Consequence of independence.** If $X$ and $Y$ are [independent](../independent/), then $E[XY] = E[X] E[Y]$, so formula $(1)$ gives $\operatorname{Cov}(X, Y) = 0$. The converse is false — see the counterexample below.

## Bilinearity and symmetry

**Theorem.** Covariance is symmetric and bilinear:

$$
\operatorname{Cov}(X, Y) = \operatorname{Cov}(Y, X), \tag{2}
$$

$$
\operatorname{Cov}(aX + bZ,\, Y) = a\, \operatorname{Cov}(X, Y) + b\, \operatorname{Cov}(Z, Y) \quad \text{for } a, b \in \mathbb{R}. \tag{3}
$$

Adding a constant does not affect covariance: $\operatorname{Cov}(X + c, Y) = \operatorname{Cov}(X, Y)$ for any $c \in \mathbb{R}$.

*Proof of (3).* By the computational formula $(1)$:

$$
\operatorname{Cov}(aX + bZ, Y) = E[(aX + bZ)Y] - E[aX + bZ]\,E[Y] = a\bigl(E[XY] - E[X]E[Y]\bigr) + b\bigl(E[ZY] - E[Z]E[Y]\bigr).
$$

Bilinearity in both arguments together means covariance is a **positive semi-definite bilinear form** on the space of square-integrable random variables: it is symmetric and satisfies $\operatorname{Cov}(X, X) = \operatorname{Var}(X) \geq 0$.

## Variance of a sum

The most immediate application of bilinearity is the **variance-of-a-sum identity**:

$$
\operatorname{Var}(X + Y) = \operatorname{Var}(X) + 2\operatorname{Cov}(X, Y) + \operatorname{Var}(Y). \tag{4}
$$

*Proof.* Expand $\operatorname{Var}(X + Y) = \operatorname{Cov}(X+Y,\, X+Y)$ by bilinearity:

$$
\operatorname{Cov}(X+Y,\, X+Y) = \operatorname{Cov}(X,X) + 2\operatorname{Cov}(X,Y) + \operatorname{Cov}(Y,Y) = \operatorname{Var}(X) + 2\operatorname{Cov}(X,Y) + \operatorname{Var}(Y).
$$

More generally, for $S = X_1 + \cdots + X_n$:

$$
\operatorname{Var}(S) = \sum_{i=1}^n \operatorname{Var}(X_i) + 2\sum_{1 \leq i < j \leq n} \operatorname{Cov}(X_i, X_j). \tag{5}
$$

When all pairs are uncorrelated (in particular, when they are independent), the off-diagonal terms vanish and variance is additive. This is the result stated without proof in [Variance](../variance/).

## Pearson correlation coefficient

Covariance depends on the scales of $X$ and $Y$: multiplying $X$ by $2$ multiplies $\operatorname{Cov}(X,Y)$ by $2$. To get a scale-free measure, normalise by both standard deviations. The **Pearson correlation coefficient** is

$$
\rho(X, Y) \coloneqq \frac{\operatorname{Cov}(X, Y)}{\sigma_X \sigma_Y}, \tag{6}
$$

where $\sigma_X = \sqrt{\operatorname{Var}(X)} > 0$ and $\sigma_Y = \sqrt{\operatorname{Var}(Y)} > 0$.

**Theorem (Cauchy–Schwarz).** $\rho(X, Y) \in [-1, 1]$.

*Proof.* For any $t \in \mathbb{R}$, let $X' = X - \mu_X$ and $Y' = Y - \mu_Y$. Then:

$$
0 \leq \operatorname{Var}(tX' + Y') = t^2 \sigma_X^2 + 2t\operatorname{Cov}(X, Y) + \sigma_Y^2.
$$

This quadratic in $t$ is non-negative for all $t$, so its discriminant must be non-positive:

$$
4\operatorname{Cov}(X, Y)^2 - 4\sigma_X^2 \sigma_Y^2 \leq 0,
$$

giving $|\operatorname{Cov}(X,Y)| \leq \sigma_X \sigma_Y$, i.e.\ $|\rho(X,Y)| \leq 1$.

Equality $|\rho| = 1$ holds precisely when $\operatorname{Var}(tX' + Y') = 0$ for some $t$, i.e.\ when $Y' = -tX'$ almost surely, meaning $Y = aX + b$ for constants $a = -t \neq 0$ and $b = \mu_Y - a\mu_X$. The sign of $\rho$ matches the sign of $a$.

The Pearson coefficient measures **linear association**: $|\rho|$ close to $1$ means $Y$ is nearly a linear function of $X$, while $\rho = 0$ means no linear association (nonlinear dependence remains possible).

## Zero covariance does not imply independence

Independence implies zero covariance, but the converse fails.

**Counterexample.** Let $U \sim \operatorname{Uniform}(-1, 1)$ and set $V = U^2$. Since $U$ is symmetric around $0$, $E[U] = 0$ and $E[U^3] = 0$. Therefore:

$$
\operatorname{Cov}(U, V) = E[U \cdot U^2] - E[U]\,E[U^2] = E[U^3] - 0 = 0.
$$

Yet $V$ is completely determined by $U$, so the two variables are as far from independent as possible. Zero covariance only rules out **linear dependence**; nonlinear dependence is invisible to $\operatorname{Cov}$.

## Summary

- $\operatorname{Cov}(X, Y) \coloneqq E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]\,E[Y]$.
- **Symmetry and bilinearity**: covariance is a symmetric positive semi-definite bilinear form; $\operatorname{Cov}(X,X) = \operatorname{Var}(X)$.
- **Variance of a sum**: $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + 2\operatorname{Cov}(X,Y) + \operatorname{Var}(Y)$; additivity holds when variables are uncorrelated.
- Independence implies $\operatorname{Cov}(X,Y) = 0$; the converse fails — zero covariance only rules out linear dependence.
- **Pearson correlation**: $\rho(X,Y) = \operatorname{Cov}(X,Y) / (\sigma_X \sigma_Y) \in [-1, 1]$; equality $|\rho| = 1$ iff $Y = aX + b$ almost surely.
