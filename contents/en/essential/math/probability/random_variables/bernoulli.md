---
title: Bernoulli Distribution
summary: "The Bernoulli distribution models a single binary trial: X = 1 with probability p and X = 0 with probability 1 − p. This checkpoint defines the distribution, computes its mean and variance, and frames it as the atomic building block from which Binomial, Geometric, and many other discrete distributions are constructed."
prerequisites:
  - essential/math/probability/random_variables/concept
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

The Bernoulli distribution is the simplest non-trivial [random variable](../concept/): a single binary trial that either succeeds or fails. Every more complex discrete distribution — Binomial, Geometric, Negative Binomial — is built directly on top of it.

## Definition

A random variable $X$ follows a **Bernoulli distribution** with parameter $p \in [0, 1]$, written $X \sim \text{Bernoulli}(p)$, if it takes only the values $0$ and $1$ with

$$
P(X = 1) = p, \qquad P(X = 0) = 1 - p.
$$

The value $1$ is conventionally called **success** and $0$ is called **failure**. The single parameter $p$ is the **success probability**.

### PMF in closed form

The two cases can be combined into a single formula:

$$
P(X = k) = p^k (1-p)^{1-k}, \qquad k \in \{0, 1\}.
$$

### CDF

The cumulative distribution function is piecewise constant:

$$
F(x) \coloneqq P(X \le x) = \begin{cases} 0 & x < 0, \\ 1 - p & 0 \le x < 1, \\ 1 & x \ge 1. \end{cases}
$$

## Mean

The **expected value** of $X$ follows directly from the definition of expectation for a discrete random variable:

$$
E[X] = 0 \cdot P(X = 0) + 1 \cdot P(X = 1) = 0 \cdot (1-p) + 1 \cdot p = p.
$$

So $E[X] = p$: the mean is simply the success probability.

## Variance

To compute $\text{Var}(X) = E[X^2] - (E[X])^2$, first note that because $X \in \{0, 1\}$ we have $X^2 = X$, so $E[X^2] = E[X] = p$. Therefore

$$
\text{Var}(X) = p - p^2 = p(1-p).
$$

The variance is maximised at $p = \tfrac{1}{2}$ (maximum uncertainty) and collapses to zero at $p = 0$ or $p = 1$ (the outcome is certain).

## Moment generating function

The **moment generating function (MGF)** of $X$ is

$$
M(t) \coloneqq E[e^{tX}] = e^{t \cdot 0}(1-p) + e^{t \cdot 1} p = (1 - p) + p e^t.
$$

This compact expression makes it straightforward to derive the MGF of the Binomial distribution by multiplying $n$ independent copies.

## Summary

- $X \sim \text{Bernoulli}(p)$ models a single binary trial with success probability $p \in [0,1]$.
- PMF: $P(X = k) = p^k(1-p)^{1-k}$ for $k \in \{0,1\}$.
- Mean: $E[X] = p$.
- Variance: $\text{Var}(X) = p(1-p)$, maximised at $p = \tfrac{1}{2}$.
- MGF: $M(t) = (1-p) + pe^t$.
- The Bernoulli distribution is the atomic building block for the Binomial, Geometric, and Negative Binomial distributions.
