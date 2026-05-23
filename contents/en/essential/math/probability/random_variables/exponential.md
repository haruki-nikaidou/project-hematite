---
title: Exponential Distribution
summary: "The Exponential distribution with rate λ has density f(x) = λ e^(−λx) for x ≥ 0 and is the unique absolutely continuous distribution on [0, ∞) with the memorylessness property. This checkpoint constructs the distribution, computes its mean 1/λ and variance 1/λ², and identifies it as the continuous-time analogue of the Geometric distribution and the inter-arrival law of a Poisson process."
prerequisites:
  - essential/math/probability/random_variables/concept
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

How long must you wait for a bus that arrives completely at random? Or for a radioactive atom to decay? In each case the waiting time has no memory of the past — the distribution that captures this behaviour is the **Exponential distribution**.

## Definition

Let $\lambda > 0$ be the **rate parameter**. A [random variable](../concept/) $X$ follows an Exponential distribution with rate $\lambda$, written $X \sim \operatorname{Exp}(\lambda)$, if its **probability density function (PDF)** is

$$
f(x) \coloneqq \begin{cases} \lambda e^{-\lambda x} & x \geq 0, \\ 0 & x < 0. \end{cases}
$$

The parameter $\lambda$ represents the average number of events per unit time; its reciprocal $1/\lambda$ is the average waiting time.

### Verification that $f$ is a valid PDF

A valid PDF must be non-negative and integrate to 1. Non-negativity is immediate since $\lambda > 0$ and $e^{-\lambda x} > 0$. For the integral,

$$
\int_{-\infty}^{\infty} f(x)\, dx = \int_0^{\infty} \lambda e^{-\lambda x}\, dx = \lambda \cdot \left[-\frac{1}{\lambda} e^{-\lambda x}\right]_0^{\infty} = \lambda \cdot \frac{1}{\lambda} = 1.
$$

## Cumulative distribution function

Integrating the PDF gives the **cumulative distribution function (CDF)**:

$$
F(x) \coloneqq P(X \leq x) = \begin{cases} 1 - e^{-\lambda x} & x \geq 0, \\ 0 & x < 0. \end{cases}
$$

Equivalently, the **survival function** is $P(X > x) = e^{-\lambda x}$ for $x \geq 0$.

## Mean

The **mean** (expected value) of $X \sim \operatorname{Exp}(\lambda)$ is derived by integration by parts. Using $u = x$ and $dv = \lambda e^{-\lambda x}\,dx$, so $du = dx$ and $v = -e^{-\lambda x}$:

$$
E[X] = \int_0^{\infty} x \lambda e^{-\lambda x}\, dx = \Bigl[-x e^{-\lambda x}\Bigr]_0^{\infty} + \int_0^{\infty} e^{-\lambda x}\, dx.
$$

The boundary term vanishes (since $x e^{-\lambda x} \to 0$ as $x \to \infty$), and the remaining integral gives

$$
E[X] = \int_0^{\infty} e^{-\lambda x}\, dx = \frac{1}{\lambda}.
$$

## Variance

To find $\operatorname{Var}(X) = E[X^2] - (E[X])^2$, compute $E[X^2]$ via integration by parts twice (or by differentiating the moment generating function). Applying integration by parts with $u = x^2$ and $dv = \lambda e^{-\lambda x}\,dx$:

$$
E[X^2] = \int_0^{\infty} x^2 \lambda e^{-\lambda x}\, dx = \Bigl[-x^2 e^{-\lambda x}\Bigr]_0^{\infty} + \int_0^{\infty} 2x e^{-\lambda x}\, dx = \frac{2}{\lambda} E[X] = \frac{2}{\lambda^2}.
$$

Therefore

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2 = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}.
$$

The standard deviation equals the mean: $\sigma = 1/\lambda$.

## Memorylessness

The most distinctive property of the Exponential distribution is **memorylessness**: for all $s, t \geq 0$,

$$
P(X > s + t \mid X > s) = P(X > t).
$$

**Proof.** By the definition of conditional probability and the survival function:

$$
P(X > s + t \mid X > s) = \frac{P(X > s + t)}{P(X > s)} = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t). \quad \square
$$

Informally: if you have already waited $s$ units of time with no event, the remaining waiting time has exactly the same distribution as if you had just started. The past waiting time is irrelevant.

### Uniqueness

The Exponential distribution is the **unique absolutely continuous distribution on $[0, \infty)$** with the memorylessness property. Any non-negative continuous random variable satisfying $P(X > s+t \mid X > s) = P(X > t)$ for all $s, t \geq 0$ must be $\operatorname{Exp}(\lambda)$ for some $\lambda > 0$.

This makes the Exponential distribution the continuous-time analogue of the Geometric distribution, which is the unique discrete distribution on $\{0, 1, 2, \ldots\}$ with the memorylessness property.

## Connection to the Poisson process

In a **Poisson process** with rate $\lambda$, events occur randomly in continuous time such that the number of events in any interval of length $t$ follows a Poisson distribution with mean $\lambda t$. The **inter-arrival times** — the waiting times between consecutive events — are independent and each distributed as $\operatorname{Exp}(\lambda)$.

This connection is fundamental: the Exponential distribution is the continuous-time building block for the Poisson process, just as the Geometric distribution is the discrete-time building block for Bernoulli trials.

## Summary

- $X \sim \operatorname{Exp}(\lambda)$ has PDF $f(x) = \lambda e^{-\lambda x}$ for $x \geq 0$ and rate parameter $\lambda > 0$.
- CDF: $F(x) = 1 - e^{-\lambda x}$ for $x \geq 0$.
- Mean: $E[X] = 1/\lambda$.
- Variance: $\operatorname{Var}(X) = 1/\lambda^2$; standard deviation equals the mean.
- Memorylessness: $P(X > s+t \mid X > s) = P(X > t)$; the Exponential is the unique continuous distribution on $[0, \infty)$ with this property.
- Inter-arrival times of a Poisson process with rate $\lambda$ are independent $\operatorname{Exp}(\lambda)$ random variables.
