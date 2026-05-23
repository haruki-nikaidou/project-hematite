---
title: Moments
summary: "The k-th moment of a random variable X is E[X^k], and the k-th central moment is E[(X − E[X])^k]. This checkpoint defines raw and central moments, recovers mean and variance as the first moment and second central moment, surveys skewness and kurtosis as standardised third and fourth central moments, and explains in what sense moments characterise a distribution (and when they fail to)."
prerequisites:
  - essential/math/probability/expectation
aliases: []
tags:
  - Probability
  - Expectation
updated: 2026-05-22
---

The mean and variance give you the centre and spread of a distribution. But two very different distributions can share the same mean and variance — a symmetric bell curve and a sharply skewed one, for instance. **Moments** are a systematic way to extract more detailed shape information, one order at a time.

## Raw moments

The **$k$-th raw moment** (or **$k$-th moment about the origin**) of a random variable $X$ is

$$
\mu'_k \coloneqq E[X^k], \quad k = 0, 1, 2, \ldots,
$$

provided the expectation is finite. The zeroth moment is always $\mu'_0 = E[1] = 1$. The first moment is $\mu'_1 = E[X] = \mu$, the mean.

## Central moments

The **$k$-th central moment** is the $k$-th moment about the mean:

$$
\mu_k \coloneqq E\bigl[(X - \mu)^k\bigr], \quad k = 0, 1, 2, \ldots
$$

The first two central moments are:

- $\mu_0 = 1$.
- $\mu_1 = E[X - \mu] = 0$ (the mean of the centred variable is zero).
- $\mu_2 = E[(X - \mu)^2] = \operatorname{Var}(X)$, the variance.

Central moments are translation-invariant: replacing $X$ by $X + c$ leaves all $\mu_k$ ($k \geq 2$) unchanged. This makes them the natural measures of shape.

## Converting between raw and central moments

The **binomial theorem** gives the relationship. Expanding $(X - \mu)^k$:

$$
\mu_k = \sum_{j=0}^{k} \binom{k}{j} \mu'_j \, (-\mu)^{k-j}.
$$

The first few conversions:

$$
\mu_2 = \mu'_2 - (\mu'_1)^2,
$$

$$
\mu_3 = \mu'_3 - 3\mu'_2 \mu'_1 + 2(\mu'_1)^3,
$$

$$
\mu_4 = \mu'_4 - 4\mu'_3 \mu'_1 + 6\mu'_2 (\mu'_1)^2 - 3(\mu'_1)^4.
$$

These formulas are useful when computing moments from the raw expectation $E[X^k]$ is easier than from $E[(X - \mu)^k]$.

## Standardised moments: skewness and kurtosis

To make central moments **dimensionless** and **scale-invariant**, divide by an appropriate power of the standard deviation $\sigma = \sqrt{\mu_2}$.

### Skewness

The **skewness** is the standardised third central moment:

$$
\gamma_1 \coloneqq \frac{\mu_3}{\sigma^3} = \frac{E[(X-\mu)^3]}{(E[(X-\mu)^2])^{3/2}}.
$$

- $\gamma_1 = 0$ for symmetric distributions (the third central moment vanishes by symmetry).
- $\gamma_1 > 0$ indicates a **right-skewed** (positively skewed) distribution: the right tail is longer — there are occasional very large values pulling the mean above the median.
- $\gamma_1 < 0$ indicates a **left-skewed** distribution.

**Example.** The exponential distribution $\operatorname{Exp}(\lambda)$ has mean $1/\lambda$, variance $1/\lambda^2$, and $E[(X-1/\lambda)^3] = 2/\lambda^3$, so $\gamma_1 = 2 > 0$ — it is right-skewed, which matches the long right tail visible in its density.

### Kurtosis and excess kurtosis

The **kurtosis** is the standardised fourth central moment:

$$
\gamma_2 \coloneqq \frac{\mu_4}{\sigma^4} = \frac{E[(X-\mu)^4]}{(E[(X-\mu)^2])^2}.
$$

For the standard normal distribution, $\gamma_2 = 3$. The **excess kurtosis** (also called **kurtosis** in many statistics packages) is

$$
\kappa \coloneqq \gamma_2 - 3.
$$

- $\kappa = 0$ (**mesokurtic**): tails behave like a normal distribution. The normal is the reference.
- $\kappa > 0$ (**leptokurtic**): heavier tails than normal — extreme values are more probable. The $t$-distribution and Cauchy distribution are leptokurtic.
- $\kappa < 0$ (**platykurtic**): lighter tails — extreme values are less likely than in a normal. The uniform distribution has $\kappa = -6/5$.

Kurtosis measures **tail heaviness**, not "peakedness" as is sometimes stated — the two properties are not equivalent.

## Do moments determine the distribution?

A natural question is whether the sequence of moments $(\mu'_1, \mu'_2, \mu'_3, \ldots)$ uniquely determines the distribution.

**When yes: the moment problem.** If all moments exist and the **Carleman condition** holds,

$$
\sum_{k=1}^{\infty} (\mu'_{2k})^{-1/(2k)} = +\infty,
$$

then the moments uniquely determine the distribution. The normal, Poisson, binomial, and exponential distributions all satisfy this condition.

**When no.** The **log-normal distribution** is the canonical counterexample: there exist infinitely many distinct distributions with the same moment sequence as a given log-normal. The Carleman condition fails for the log-normal because its moments grow too fast ($\mu'_k \sim e^{k^2/2}$).

In practice this means: when fitting a model via moments (method of moments), you should check that the moment problem has a unique solution for your distribution class.

## Existence of moments

Not all distributions have all moments. The **Cauchy distribution** has undefined mean and undefined variance — its tails decay as $|x|^{-2}$, which is too slow for $\int |x| \, f(x) \, dx$ to converge. In general, the $k$-th moment exists when the tails decay at least as fast as $|x|^{-(k+1+\varepsilon)}$ for some $\varepsilon > 0$.

A useful hierarchy: if the $k$-th moment is finite, all moments of order $j < k$ are also finite, by Jensen's inequality applied to the concave function $t \mapsto t^{j/k}$ on $[0, \infty)$.

## Summary

- The **$k$-th raw moment** is $\mu'_k = E[X^k]$; the **$k$-th central moment** is $\mu_k = E[(X - E[X])^k]$.
- Mean = $\mu'_1$; Variance = $\mu_2 = \mu'_2 - (\mu'_1)^2$.
- **Skewness** $\gamma_1 = \mu_3 / \sigma^3$ measures asymmetry; $\gamma_1 > 0$ is right-skewed.
- **Excess kurtosis** $\kappa = \mu_4/\sigma^4 - 3$ measures tail heaviness relative to the normal; $\kappa > 0$ means heavier tails.
- Moments **uniquely determine** the distribution when the Carleman condition holds; the log-normal shows this can fail when moments grow very fast.
- The Cauchy distribution has no finite moments — tail decay must be fast enough for $E[|X|^k]$ to converge.

