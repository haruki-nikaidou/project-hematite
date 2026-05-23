---
title: Binomial Distribution
summary: "The Binomial distribution counts the number of successes in n independent Bernoulli(p) trials, with PMF P(X = k) = C(n,k) p^k (1−p)^(n−k). This checkpoint derives the PMF from the Bernoulli building blocks, computes the mean np and variance np(1−p), and exhibits the additive structure: the sum of independent Binomials with the same p is again Binomial."
prerequisites:
  - essential/math/probability/random_variables/bernoulli
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

When an experiment consists of repeating the same binary trial many times — flipping a coin, testing manufactured parts, sampling survey responses — the natural question is: how many successes occur? The Binomial distribution answers exactly this question.

## Setup

Fix an integer $n \ge 1$ and a probability $p \in [0, 1]$. Perform $n$ **independent** [Bernoulli(p)](../bernoulli/) trials and let $X$ count the total number of successes. Formally, let $X_1, X_2, \ldots, X_n$ be independent with each $X_i \sim \text{Bernoulli}(p)$; then

$$
X \coloneqq X_1 + X_2 + \cdots + X_n.
$$

We write $X \sim \text{Binomial}(n, p)$, or $X \sim \text{Bin}(n, p)$.

## PMF derivation

$X$ takes values in $\{0, 1, \ldots, n\}$. To find $P(X = k)$, count all ways the $n$ trials can yield exactly $k$ successes.

**Combinatorial argument.** Any particular sequence of $k$ successes and $n - k$ failures occurs with probability $p^k (1-p)^{n-k}$ (by independence). The number of such sequences — choosing which $k$ of the $n$ positions are successes — is $\binom{n}{k}$. Summing over all sequences gives the **probability mass function (PMF)**:

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \qquad k = 0, 1, \ldots, n.
$$

This is a valid PMF because $\sum_{k=0}^{n} \binom{n}{k} p^k (1-p)^{n-k} = (p + (1-p))^n = 1$ by the Binomial theorem.

## Mean

Linearity of expectation lets us avoid any direct computation from the PMF. Using the representation $X = \sum_{i=1}^n X_i$ and the fact that $E[X_i] = p$ for each [Bernoulli indicator](../bernoulli/):

$$
E[X] = \sum_{i=1}^n E[X_i] = np.
$$

No independence is required — linearity holds unconditionally.

## Variance

Independence of the $X_i$ is needed here. Because the indicators are independent, their variances add:

$$
\text{Var}(X) = \sum_{i=1}^n \text{Var}(X_i) = n \cdot p(1-p) = np(1-p).
$$

## Additive property

**Theorem.** If $X \sim \text{Bin}(m, p)$ and $Y \sim \text{Bin}(n, p)$ are independent, then

$$
X + Y \sim \text{Bin}(m + n,\, p).
$$

**Proof via MGFs.** The MGF of $X \sim \text{Bin}(m, p)$ is obtained by multiplying $m$ independent Bernoulli MGFs:

$$
M_X(t) = \bigl((1-p) + pe^t\bigr)^m.
$$

Similarly $M_Y(t) = ((1-p) + pe^t)^n$. Because $X$ and $Y$ are independent, the MGF of their sum factors:

$$
M_{X+Y}(t) = M_X(t) \cdot M_Y(t) = \bigl((1-p) + pe^t\bigr)^{m+n},
$$

which is the MGF of $\text{Bin}(m+n, p)$. Since the MGF uniquely determines the distribution, the result follows. $\square$

**Intuition.** Running $m$ independent Bernoulli trials followed by $n$ more independent Bernoulli trials — all with the same $p$ — is indistinguishable from running $m + n$ trials in one go.

## Summary

- $X \sim \text{Bin}(n, p)$ counts successes in $n$ independent [Bernoulli(p)](../bernoulli/) trials.
- PMF: $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$ for $k = 0, 1, \ldots, n$.
- Mean: $E[X] = np$ (by linearity of expectation).
- Variance: $\text{Var}(X) = np(1-p)$ (by independence of indicators).
- MGF: $M(t) = ((1-p) + pe^t)^n$.
- Additive: the sum of independent $\text{Bin}(m, p)$ and $\text{Bin}(n, p)$ is $\text{Bin}(m+n, p)$.
