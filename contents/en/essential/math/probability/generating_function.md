---
title: Moment Generating Function
summary: "The moment generating function M_X(t) = E[e^(tX)] encodes the moments of X as the coefficients of its Taylor expansion at t = 0: M_X^(k)(0) = E[X^k]. This checkpoint defines the MGF, computes it for the standard distributions, derives the multiplicative property M_{X+Y} = M_X · M_Y for independent X, Y, and discusses the existence and uniqueness conditions under which the MGF determines the distribution."
prerequisites:
  - essential/math/probability/moments
aliases: []
tags:
  - Probability
  - Expectation
updated: 2026-05-22
---

A generating function packages infinitely many numbers into a single analytic object. The **moment generating function** (MGF) packages all the [moments](../moments/) of a random variable into one power series. Because many useful distributions have simple MGFs, and because the MGF of a sum of independent variables is the product of their MGFs, the MGF is a powerful tool for computing distributions of sums and proving limit theorems.

## Definition

The **moment generating function** of a random variable $X$ is

$$
M_X(t) \coloneqq E\bigl[e^{tX}\bigr], \quad t \in \mathbb{R},
$$

defined for all $t$ in an open interval around $0$ where the expectation is finite. For a discrete distribution:

$$
M_X(t) = \sum_k e^{t x_k} p_k.
$$

For an absolutely continuous distribution:

$$
M_X(t) = \int_{-\infty}^{+\infty} e^{tx} f_X(x) \, dx.
$$

Both are the Laplace transform of the distribution (with $s = -t$).

## Recovering moments from the MGF

Expand $e^{tX}$ as a power series:

$$
e^{tX} = \sum_{k=0}^{\infty} \frac{(tX)^k}{k!} = \sum_{k=0}^{\infty} \frac{X^k}{k!} t^k.
$$

Taking expectations (justified by dominated convergence when $M_X(t)$ is finite near $0$):

$$
M_X(t) = \sum_{k=0}^{\infty} \frac{E[X^k]}{k!} t^k = \sum_{k=0}^{\infty} \frac{\mu'_k}{k!} t^k. \tag{1}
$$

This shows that $M_X(t)$ is a power series in $t$ whose coefficients encode the raw moments. Differentiating $k$ times and evaluating at $t = 0$:

$$
M_X^{(k)}(0) = E[X^k] = \mu'_k. \tag{2}
$$

So the $k$-th moment is the $k$-th derivative of the MGF at zero. This is the defining property: **the MGF *generates* the moments**.

## MGFs of standard distributions

| Distribution | $M_X(t)$ | Domain |
|---|---|---|
| $\operatorname{Bernoulli}(p)$ | $(1-p) + pe^t$ | $t \in \mathbb{R}$ |
| $\operatorname{Bin}(n, p)$ | $(1-p+pe^t)^n$ | $t \in \mathbb{R}$ |
| $\operatorname{Poisson}(\lambda)$ | $\exp(\lambda(e^t - 1))$ | $t \in \mathbb{R}$ |
| $\operatorname{Exp}(\lambda)$ | $\dfrac{\lambda}{\lambda - t}$ | $t < \lambda$ |
| $\operatorname{Gamma}(\alpha, \lambda)$ | $\left(\dfrac{\lambda}{\lambda - t}\right)^\alpha$ | $t < \lambda$ |
| $\operatorname{N}(\mu, \sigma^2)$ | $\exp\!\left(\mu t + \tfrac{\sigma^2 t^2}{2}\right)$ | $t \in \mathbb{R}$ |

**Derivation for $\operatorname{N}(0,1)$.** With density $f(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$:

$$
M_X(t) = \int_{-\infty}^{+\infty} e^{tx} \cdot \frac{e^{-x^2/2}}{\sqrt{2\pi}} \, dx = \int_{-\infty}^{+\infty} \frac{e^{-(x-t)^2/2 + t^2/2}}{\sqrt{2\pi}} \, dx = e^{t^2/2} \int_{-\infty}^{+\infty} \frac{e^{-(x-t)^2/2}}{\sqrt{2\pi}} \, dx = e^{t^2/2},
$$

by completing the square and recognising the remaining integral as a Gaussian integrating to $1$.

## The multiplicative property for independent variables

**Theorem.** If $X$ and $Y$ are **independent** random variables with MGFs $M_X$ and $M_Y$, both finite on an open interval containing $0$, then the MGF of $X + Y$ is

$$
M_{X+Y}(t) = M_X(t) \cdot M_Y(t). \tag{3}
$$

*Proof.* By independence, $e^{tX}$ and $e^{tY}$ are also independent (they are measurable functions of $X$ and $Y$ respectively), so:

$$
M_{X+Y}(t) = E\bigl[e^{t(X+Y)}\bigr] = E\bigl[e^{tX} e^{tY}\bigr] = E\bigl[e^{tX}\bigr] \cdot E\bigl[e^{tY}\bigr] = M_X(t) \cdot M_Y(t).
$$

**Applications.** Property $(3)$ makes it easy to identify the distribution of a sum of independent variables by comparing MGFs:

- $X \sim \operatorname{Bin}(m,p)$, $Y \sim \operatorname{Bin}(n,p)$ independent: $M_{X+Y}(t) = (1-p+pe^t)^{m+n}$, so $X + Y \sim \operatorname{Bin}(m+n, p)$.
- $X \sim \operatorname{Poisson}(\lambda)$, $Y \sim \operatorname{Poisson}(\mu)$ independent: $M_{X+Y}(t) = e^{(\lambda+\mu)(e^t-1)}$, so $X + Y \sim \operatorname{Poisson}(\lambda + \mu)$.
- $X \sim \operatorname{N}(\mu_1, \sigma_1^2)$, $Y \sim \operatorname{N}(\mu_2, \sigma_2^2)$ independent: $M_{X+Y}(t) = e^{(\mu_1+\mu_2)t + (\sigma_1^2+\sigma_2^2)t^2/2}$, so $X + Y \sim \operatorname{N}(\mu_1+\mu_2, \sigma_1^2+\sigma_2^2)$.

## Uniqueness: the MGF determines the distribution

**Theorem.** If $M_X(t)$ is finite for all $t$ in some open interval $(-\delta, \delta)$ with $\delta > 0$, then $M_X$ uniquely determines the distribution of $X$.

More precisely: if $M_X(t) = M_Y(t)$ for all $t \in (-\delta, \delta)$, then $P_X = P_Y$ (the distributions are identical).

This is why you can safely identify distributions by their MGFs — the equality $M_{X+Y} = M_{\operatorname{N}(\mu_1+\mu_2, \sigma_1^2+\sigma_2^2)}$ in the calculation above really does imply that $X + Y$ is normal.

**The existence caveat.** The MGF need not exist (may be $+\infty$) for all $t \neq 0$. The Cauchy distribution has no MGF. The log-normal distribution has an MGF that is $+\infty$ for every $t > 0$. When the MGF does not exist in a neighbourhood of $0$, the moment sequence may not determine the distribution (the log-normal is the classic example). In such cases, the **characteristic function** $\varphi_X(t) = E[e^{itX}]$ (with $i = \sqrt{-1}$) always exists and always determines the distribution, making it the more general tool for theoretical work.

## Cumulants

The **cumulant generating function** is the logarithm of the MGF:

$$
K_X(t) \coloneqq \ln M_X(t) = \ln E[e^{tX}].
$$

Its derivatives at $0$ are the **cumulants** $\kappa_k \coloneqq K_X^{(k)}(0)$. The first two cumulants are the mean and variance:

$$
\kappa_1 = E[X] = \mu, \qquad \kappa_2 = \operatorname{Var}(X) = \sigma^2.
$$

For independent $X, Y$: $K_{X+Y}(t) = K_X(t) + K_Y(t)$, so cumulants **add** under independence, just like variances. This additivity makes cumulants particularly convenient in many calculations.

## Summary

- The **MGF** $M_X(t) = E[e^{tX}]$ encodes all moments as derivatives at $0$: $M_X^{(k)}(0) = E[X^k]$.
- **Standard MGFs**: Binomial $(1-p+pe^t)^n$; Poisson $e^{\lambda(e^t-1)}$; Exponential $\lambda/(\lambda-t)$; Normal $e^{\mu t + \sigma^2 t^2/2}$.
- **Multiplicative property**: $M_{X+Y} = M_X \cdot M_Y$ for independent $X, Y$ — this identifies distributions of sums.
- **Uniqueness**: when $M_X$ is finite near $0$, it uniquely determines the distribution of $X$.
- The MGF may not exist (e.g.\ Cauchy, log-normal); in such cases the characteristic function $E[e^{itX}]$ always exists and always determines the distribution.
- The **cumulant generating function** $\ln M_X(t)$ has derivatives at $0$ equal to the cumulants, which add under independence.

