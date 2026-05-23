---
title: Poisson Distribution
summary: "The Poisson distribution with rate λ assigns probability P(X = k) = e^(−λ) λ^k / k! and arises as the limit of Binomial(n, λ/n) as n → ∞. This checkpoint takes that limit explicitly, derives the mean and variance (both equal to λ), and motivates the Poisson as the canonical model for counts of rare independent events in a fixed window."
prerequisites:
  - essential/math/probability/random_variables/binomial
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

Radioactive decay events per second, typos per page, server requests per minute — whenever you count how many times a rare, independent event happens in a fixed window, the Poisson distribution is the natural model.

## The Poisson limit

The cleanest way to arrive at the Poisson PMF is to take a limit of the [Binomial distribution](../binomial/). Suppose you observe a process over a fixed window and expect a total of $\lambda > 0$ events on average. Divide the window into $n$ equal sub-intervals, each so short that at most one event can fall in it. The probability of an event in any one sub-interval is approximately $p = \lambda/n$, and all sub-intervals are independent.

The number of events is then $\operatorname{Bin}(n, \lambda/n)$. Fix $k$ and let $n \to \infty$:

$$
P(X = k) = \binom{n}{k}\left(\frac{\lambda}{n}\right)^k\left(1 - \frac{\lambda}{n}\right)^{n-k}.
$$

Expand each factor in turn.

**Binomial coefficient:**

$$
\binom{n}{k} = \frac{n(n-1)\cdots(n-k+1)}{k!} \to \frac{n^k}{k!} \quad \text{as } n \to \infty,
$$

because $k$ is fixed while $n$ grows, so each of the $k$ factors $(n - j)/n \to 1$.

**Power of $p$:**

$$
\left(\frac{\lambda}{n}\right)^k = \frac{\lambda^k}{n^k}.
$$

**Tail factor:**

$$
\left(1 - \frac{\lambda}{n}\right)^{n-k} = \left(1 - \frac{\lambda}{n}\right)^n \cdot \left(1 - \frac{\lambda}{n}\right)^{-k} \to e^{-\lambda} \cdot 1 = e^{-\lambda},
$$

using the standard limit $\lim_{n\to\infty}(1 - \lambda/n)^n = e^{-\lambda}$ and the fact that $(1 - \lambda/n)^{-k} \to 1$.

Putting it together:

$$
P(X = k) \to \frac{n^k}{k!} \cdot \frac{\lambda^k}{n^k} \cdot e^{-\lambda} = \frac{e^{-\lambda}\lambda^k}{k!}.
$$

## Definition

A random variable $X$ has the **Poisson distribution** with **rate** $\lambda > 0$, written $X \sim \operatorname{Poisson}(\lambda)$, if its PMF is:

$$
P(X = k) \coloneqq \frac{e^{-\lambda}\lambda^k}{k!}, \qquad k = 0, 1, 2, \ldots
$$

### Verification: the PMF sums to 1

$$
\sum_{k=0}^{\infty} \frac{e^{-\lambda}\lambda^k}{k!} = e^{-\lambda} \sum_{k=0}^{\infty} \frac{\lambda^k}{k!} = e^{-\lambda} \cdot e^{\lambda} = 1. \checkmark
$$

The series $\sum_{k=0}^{\infty} \lambda^k / k! = e^{\lambda}$ is the Taylor expansion of the exponential function.

## Mean: $E[X] = \lambda$

$$
E[X] = \sum_{k=0}^{\infty} k \, \frac{e^{-\lambda}\lambda^k}{k!}.
$$

The $k = 0$ term vanishes. For $k \geq 1$, cancel $k$ with $k!$:

$$
E[X] = e^{-\lambda} \sum_{k=1}^{\infty} \frac{\lambda^k}{(k-1)!} = e^{-\lambda} \cdot \lambda \sum_{j=0}^{\infty} \frac{\lambda^j}{j!} = e^{-\lambda} \cdot \lambda \cdot e^{\lambda} = \lambda.
$$

The mean equals the rate parameter — a reassuring sanity check given how $\lambda$ was defined.

## Variance: $\operatorname{Var}(X) = \lambda$

Compute $E[X(X-1)]$ first:

$$
E[X(X-1)] = \sum_{k=2}^{\infty} k(k-1)\frac{e^{-\lambda}\lambda^k}{k!} = e^{-\lambda}\lambda^2 \sum_{j=0}^{\infty}\frac{\lambda^j}{j!} = \lambda^2.
$$

Therefore $E[X^2] = E[X(X-1)] + E[X] = \lambda^2 + \lambda$, and:

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2 = (\lambda^2 + \lambda) - \lambda^2 = \lambda.
$$

Both the mean and the variance of a Poisson random variable equal $\lambda$. This equality is a useful diagnostic: if you observe count data and the sample mean and sample variance differ substantially, a Poisson model may not fit.

## Additive property

If $X \sim \operatorname{Poisson}(\lambda_1)$ and $Y \sim \operatorname{Poisson}(\lambda_2)$ are **independent**, then:

$$
X + Y \sim \operatorname{Poisson}(\lambda_1 + \lambda_2).
$$

**Proof.** By the convolution formula:

$$
P(X + Y = k) = \sum_{j=0}^{k} P(X = j)\,P(Y = k - j) = \sum_{j=0}^{k} \frac{e^{-\lambda_1}\lambda_1^j}{j!} \cdot \frac{e^{-\lambda_2}\lambda_2^{k-j}}{(k-j)!}.
$$

Factor out $e^{-(\lambda_1+\lambda_2)} / k!$ and apply the binomial theorem:

$$
P(X + Y = k) = \frac{e^{-(\lambda_1+\lambda_2)}}{k!} \sum_{j=0}^{k}\binom{k}{j}\lambda_1^j\lambda_2^{k-j} = \frac{e^{-(\lambda_1+\lambda_2)}(\lambda_1+\lambda_2)^k}{k!}. \qquad \square
$$

This additivity reflects the physical intuition: if events arrive from two independent Poisson processes with rates $\lambda_1$ and $\lambda_2$, the merged stream is Poisson with rate $\lambda_1 + \lambda_2$.

## Summary

- $X \sim \operatorname{Poisson}(\lambda)$ is the limit of $\operatorname{Bin}(n, \lambda/n)$ as $n \to \infty$, and models counts of rare independent events in a fixed window.
- **PMF:** $P(X = k) = e^{-\lambda}\lambda^k / k!$ for $k = 0, 1, 2, \ldots$
- **Mean and variance are both equal to $\lambda$.**
- **Additivity:** the sum of independent Poisson$(\lambda_1)$ and Poisson$(\lambda_2)$ variables is Poisson$(\lambda_1 + \lambda_2)$.
