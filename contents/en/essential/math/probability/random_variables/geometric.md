---
title: Geometric Distribution
summary: "The Geometric distribution models the number of independent Bernoulli(p) trials needed to obtain the first success. This checkpoint derives the PMF P(X = k) = (1−p)^(k−1) p, computes the mean 1/p and variance (1−p)/p², and proves the memorylessness property that uniquely characterises the Geometric among discrete distributions on the positive integers."
prerequisites:
  - essential/math/probability/random_variables/bernoulli
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

How many times do you flip a coin before it comes up heads? That simple question — waiting for the first success in a sequence of independent trials — is exactly what the Geometric distribution answers.

## Setup: repeated Bernoulli trials

Recall that a [Bernoulli trial](../bernoulli/) is a single experiment with two outcomes: success (probability $p$) and failure (probability $1-p$), where $0 < p \leq 1$. Now repeat such a trial independently, over and over, until the first success appears.

Let $X$ be the **total number of trials** performed (including the final successful one). Then $X$ takes values in $\{1, 2, 3, \ldots\}$: it equals 1 if the very first trial succeeds, 2 if the first fails and the second succeeds, and so on.

We write $X \sim \operatorname{Geom}(p)$.

## PMF derivation

For $X = k$ to occur, the first $k-1$ trials must all be failures and the $k$-th must be a success. Because the trials are independent:

$$
P(X = k) = \underbrace{(1-p)^{k-1}}_{\text{$k-1$ failures}} \cdot \underbrace{p}_{\text{1 success}}, \qquad k = 1, 2, 3, \ldots
$$

This is the **probability mass function (PMF)** of the Geometric distribution.

### Verification: the PMF sums to 1

Sum over all possible values of $k$:

$$
\sum_{k=1}^{\infty} (1-p)^{k-1} p = p \sum_{j=0}^{\infty} (1-p)^{j}.
$$

The series $\sum_{j=0}^{\infty} r^j = \frac{1}{1-r}$ for $|r| < 1$. With $r = 1-p \in [0, 1)$:

$$
p \cdot \frac{1}{1-(1-p)} = p \cdot \frac{1}{p} = 1. \checkmark
$$

## Mean: $E[X] = 1/p$

Starting from the definition:

$$
E[X] = \sum_{k=1}^{\infty} k \, (1-p)^{k-1} p.
$$

Factor out $p$ and recognise the sum as the derivative of a geometric series. For $|r| < 1$:

$$
\sum_{k=1}^{\infty} k \, r^{k-1} = \frac{d}{dr} \sum_{k=1}^{\infty} r^k = \frac{d}{dr} \frac{r}{1-r} = \frac{1}{(1-r)^2}.
$$

Substituting $r = 1-p$:

$$
E[X] = p \cdot \frac{1}{(1-(1-p))^2} = p \cdot \frac{1}{p^2} = \frac{1}{p}.
$$

Intuitively, if each trial succeeds with probability $p$, you expect to need $1/p$ trials on average.

## Variance: $\operatorname{Var}(X) = (1-p)/p^2$

Use the identity $\operatorname{Var}(X) = E[X^2] - (E[X])^2$. To find $E[X^2]$, compute $E[X(X-1)]$ first (it involves one fewer power of $k$ to handle):

$$
E[X(X-1)] = \sum_{k=2}^{\infty} k(k-1)(1-p)^{k-1}p = p(1-p)\sum_{k=2}^{\infty} k(k-1)(1-p)^{k-2}.
$$

The sum $\sum_{k=2}^{\infty} k(k-1)r^{k-2} = \frac{d^2}{dr^2}\frac{r}{1-r} = \frac{2}{(1-r)^3}$, so with $r = 1-p$:

$$
E[X(X-1)] = p(1-p) \cdot \frac{2}{p^3} = \frac{2(1-p)}{p^2}.
$$

Therefore $E[X^2] = E[X(X-1)] + E[X] = \frac{2(1-p)}{p^2} + \frac{1}{p}$, and:

$$
\operatorname{Var}(X) = \frac{2(1-p)}{p^2} + \frac{1}{p} - \frac{1}{p^2} = \frac{2(1-p) + p - 1}{p^2} = \frac{1-p}{p^2}.
$$

## Memorylessness

The most striking property of the Geometric distribution is that it has **no memory of the past**. Formally, for any positive integers $m$ and $n$:

$$
P(X > m + n \mid X > m) = P(X > n).
$$

**Proof.** First compute the survival function. Since $P(X = k) = (1-p)^{k-1}p$:

$$
P(X > m) = \sum_{k=m+1}^{\infty}(1-p)^{k-1}p = (1-p)^m.
$$

Then by the definition of conditional probability:

$$
P(X > m+n \mid X > m) = \frac{P(X > m+n)}{P(X > m)} = \frac{(1-p)^{m+n}}{(1-p)^m} = (1-p)^n = P(X > n). \qquad \square
$$

In words: if you have already seen $m$ failures, the number of *additional* trials you need is distributed exactly the same as if you were starting fresh. The past failures give you no useful information about when the first success will arrive.

### Uniqueness of memorylessness

The Geometric distribution is the **only** discrete distribution on $\{1, 2, 3, \ldots\}$ that satisfies the memorylessness property. This is the discrete analogue of the fact that the Exponential distribution is the unique memoryless continuous distribution on the positive reals.

## Summary

- $X \sim \operatorname{Geom}(p)$ counts the number of independent $\operatorname{Bernoulli}(p)$ trials up to and including the first success.
- **PMF:** $P(X = k) = (1-p)^{k-1}p$ for $k = 1, 2, 3, \ldots$
- **Mean:** $E[X] = 1/p$.
- **Variance:** $\operatorname{Var}(X) = (1-p)/p^2$.
- **Memorylessness:** $P(X > m+n \mid X > m) = P(X > n)$; the Geometric is the unique discrete distribution on $\mathbb{N}^+$ with this property.
