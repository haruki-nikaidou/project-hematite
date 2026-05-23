---
title: Relationships Between Common Distributions
summary: "The standard distributions are not independent objects; they sit inside a tight web of structural and limiting relationships. This checkpoint maps out both kinds: structurally, Bernoulli is the n = 1 Binomial, the Geometric is the discrete analogue of the Exponential, and the Exponential is the α = 1 Gamma; in the limit, Binomial(n, λ/n) → Poisson, sums of Exponential(λ) are Gamma(α, λ), and standardised sums of any finite-variance distribution converge to Normal."
prerequisites:
  - essential/math/probability/random_variables/binomial
  - essential/math/probability/random_variables/geometric
  - essential/math/probability/random_variables/poisson
  - essential/math/probability/random_variables/gamma
  - essential/math/probability/random_variables/normal
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

The seven distributions studied in this series — [Bernoulli](../bernoulli/), [Binomial](../binomial/), [Geometric](../geometric/), [Poisson](../poisson/), [Exponential](../exponential/), [Gamma](../gamma/), and [Normal](../normal/) — were not invented independently. They are members of a single family, connected by structural containment and asymptotic limits. Understanding these connections turns a collection of formulas into a coherent picture.

## Structural (exact) relationships

Structural relationships hold for every value of the parameters, not just in some limiting regime.

### Bernoulli is Binomial($1$, $p$)

A [Bernoulli($p$)](../bernoulli/) trial is the simplest possible case of the [Binomial](../binomial/): it is a Binomial with $n = 1$. If $X \sim \operatorname{Bernoulli}(p)$, then $X \sim \operatorname{Bin}(1, p)$ — both are defined by $P(X = 1) = p$, $P(X = 0) = 1-p$.

### Binomial as a sum of Bernoulli indicators

More generally, $\operatorname{Bin}(n, p)$ is built directly from Bernoulli building blocks. If $X_1, X_2, \ldots, X_n$ are independent with each $X_i \sim \operatorname{Bernoulli}(p)$, then

$$
X \coloneqq X_1 + X_2 + \cdots + X_n \sim \operatorname{Bin}(n, p).
$$

This is the very definition of the Binomial distribution, and it makes the mean $np$ and variance $np(1-p)$ immediate via linearity and independence.

### Geometric as repeated Bernoulli trials

The [Geometric distribution](../geometric/) arises when you repeat independent $\operatorname{Bernoulli}(p)$ trials and ask: how many trials until the first success? The geometry of the PMF $P(X = k) = (1-p)^{k-1}p$ is a direct consequence of the independence of successive Bernoulli trials.

### Exponential as the continuous analogue of Geometric

The [Exponential distribution](../exponential/) and the Geometric distribution are the only distributions on their respective domains ($[0, \infty)$ and $\{1, 2, 3, \ldots\}$) with the **memorylessness property**:

$$
P(X > s + t \mid X > s) = P(X > t).
$$

The Geometric models waiting times in discrete time (number of trials); the Exponential models waiting times in continuous time (elapsed duration). They are structurally identical — the Exponential is the continuous-time limit of the Geometric as the trial duration shrinks to zero while $p \to 0$ proportionally.

### Exponential is Gamma($1$, $\lambda$)

The [Gamma distribution](../gamma/) with shape $\alpha > 0$ and rate $\lambda > 0$ has density

$$
f(x) = \frac{\lambda^\alpha x^{\alpha-1} e^{-\lambda x}}{\Gamma(\alpha)}, \qquad x > 0.
$$

Setting $\alpha = 1$ and using $\Gamma(1) = 1$ gives $f(x) = \lambda e^{-\lambda x}$, which is exactly $\operatorname{Exp}(\lambda)$. The Exponential is therefore the special case $\operatorname{Gamma}(1, \lambda)$.

### Gamma($\alpha$, $\lambda$) as a sum of Exponentials

For integer $\alpha$, the relationship goes further. If $X_1, X_2, \ldots, X_\alpha$ are independent with each $X_i \sim \operatorname{Exp}(\lambda)$, then

$$
X_1 + X_2 + \cdots + X_\alpha \sim \operatorname{Gamma}(\alpha, \lambda).
$$

This can be verified by multiplying moment generating functions: the MGF of $\operatorname{Exp}(\lambda)$ is $(\lambda/(\lambda - t))^1$, so the sum of $\alpha$ independent copies has MGF $(\lambda/(\lambda - t))^\alpha$, which is the MGF of $\operatorname{Gamma}(\alpha, \lambda)$.

**Intuition.** In a Poisson process with rate $\lambda$, the $\alpha$-th event arrives after exactly $\alpha$ independent Exponential waiting times. The Gamma distribution captures the total waiting time until the $\alpha$-th arrival.

## Limiting relationships

Limiting relationships describe how one distribution approximates another as a parameter grows large.

### Binomial($n$, $\lambda/n$) $\to$ Poisson($\lambda$) as $n \to \infty$

The **Poisson limit theorem** (or law of rare events) states: if $p = \lambda/n$ and $n \to \infty$ with $\lambda$ fixed, then for each $k = 0, 1, 2, \ldots$,

$$
\binom{n}{k} \left(\frac{\lambda}{n}\right)^k \left(1 - \frac{\lambda}{n}\right)^{n-k} \;\longrightarrow\; \frac{\lambda^k e^{-\lambda}}{k!} = P(\operatorname{Poisson}(\lambda) = k).
$$

**Sketch.** The leading factor $\binom{n}{k}/n^k \to 1/k!$, the term $(\lambda/n)^k$ contributes $\lambda^k/n^k$, and $(1 - \lambda/n)^n \to e^{-\lambda}$. Combining gives the Poisson PMF.

**Interpretation.** When many independent trials each have a very small success probability, but the expected total number of successes $np = \lambda$ stays fixed, the count of successes is approximately Poisson. This is the regime of rare but possible events.

### Poisson is infinitely divisible

The [Poisson distribution](../poisson/) has a natural additive structure. If $X \sim \operatorname{Poisson}(\lambda_1)$ and $Y \sim \operatorname{Poisson}(\lambda_2)$ are independent, then

$$
X + Y \sim \operatorname{Poisson}(\lambda_1 + \lambda_2).
$$

This follows directly from the MGF: $M_X(t) = e^{\lambda_1(e^t - 1)}$ and $M_Y(t) = e^{\lambda_2(e^t - 1)}$, so $M_{X+Y}(t) = e^{(\lambda_1 + \lambda_2)(e^t - 1)}$.

Conversely, any $\operatorname{Poisson}(\lambda)$ variable can be decomposed into the sum of independent $\operatorname{Poisson}(\lambda/n)$ variables for any $n$. This **infinite divisibility** mirrors the fact that a Poisson process can always be split into finer and finer independent sub-processes.

### Central Limit Theorem: normalised Binomial $\to$ Normal

By the Central Limit Theorem, the standardised Binomial converges to the standard Normal. If $X \sim \operatorname{Bin}(n, p)$, then $E[X] = np$ and $\operatorname{Var}(X) = np(1-p)$, so

$$
\frac{X - np}{\sqrt{np(1-p)}} \;\xrightarrow{d}\; N(0,1) \quad \text{as } n \to \infty.
$$

This is a direct application of the CLT: $X$ is the sum of $n$ i.i.d. $\operatorname{Bernoulli}(p)$ variables, each with mean $p$ and variance $p(1-p)$.

### Gamma($\alpha$, $\lambda$) $\to$ Normal as $\alpha \to \infty$

Because $\operatorname{Gamma}(\alpha, \lambda)$ is the sum of $\alpha$ independent $\operatorname{Exp}(\lambda)$ variables (each with mean $1/\lambda$ and variance $1/\lambda^2$), the CLT applies directly. The standardised Gamma

$$
\frac{\operatorname{Gamma}(\alpha, \lambda) - \alpha/\lambda}{\sqrt{\alpha}/\lambda} \;\xrightarrow{d}\; N(0,1) \quad \text{as } \alpha \to \infty.
$$

For large $\alpha$, the Gamma distribution is well approximated by $N(\alpha/\lambda,\, \alpha/\lambda^2)$.

## A map of the family

All seven distributions form a directed graph of relationships. Reading it as a graph with edges labelled "is a special case of", "is a sum of", or "converges to":

- **Bernoulli $\to$ Binomial** (structural): $\operatorname{Bin}(n, p)$ is the sum of $n$ i.i.d. $\operatorname{Bernoulli}(p)$ variables; $\operatorname{Bernoulli}(p) = \operatorname{Bin}(1, p)$.
- **Binomial $\to$ Poisson** (limiting): $\operatorname{Bin}(n, \lambda/n) \to \operatorname{Poisson}(\lambda)$ as $n \to \infty$.
- **Binomial $\to$ Normal** (limiting via CLT): the standardised $\operatorname{Bin}(n, p)$ converges to $N(0,1)$.
- **Bernoulli $\to$ Geometric** (structural): the Geometric counts repeated Bernoulli trials until the first success.
- **Geometric $\to$ Exponential** (continuous analogue / limit): the Exponential is the continuous-time version of the Geometric, sharing the memorylessness property.
- **Exponential $\to$ Gamma** (structural): $\operatorname{Gamma}(\alpha, \lambda)$ is the sum of $\alpha$ i.i.d. $\operatorname{Exp}(\lambda)$ variables; $\operatorname{Exp}(\lambda) = \operatorname{Gamma}(1, \lambda)$.
- **Gamma $\to$ Normal** (limiting via CLT): the standardised $\operatorname{Gamma}(\alpha, \lambda)$ converges to $N(0,1)$ as $\alpha \to \infty$.

Two separate paths lead from Bernoulli to Normal: the direct path through Binomial and CLT, and the path through Geometric, Exponential, Gamma, and CLT. Both converge at the same fixed point — the Normal distribution, which is the universal attractor of standardised sums.

## Summary

- **Bernoulli is $\operatorname{Bin}(1, p)$**; $\operatorname{Bin}(n, p)$ is the sum of $n$ i.i.d. Bernoulli variables (structural).
- **Geometric** models first-success time in repeated Bernoulli trials (structural); it is the discrete analogue of the Exponential via shared memorylessness.
- **Exponential is $\operatorname{Gamma}(1, \lambda)$**; $\operatorname{Gamma}(\alpha, \lambda)$ is the sum of $\alpha$ i.i.d. $\operatorname{Exp}(\lambda)$ variables for integer $\alpha$ (structural).
- **$\operatorname{Bin}(n, \lambda/n) \to \operatorname{Poisson}(\lambda)$** as $n \to \infty$ (Poisson limit theorem).
- **Poisson is infinitely divisible**: $\operatorname{Poisson}(\lambda_1 + \lambda_2)$ equals the sum of independent $\operatorname{Poisson}(\lambda_1)$ and $\operatorname{Poisson}(\lambda_2)$.
- **Standardised Binomial and Gamma both converge to $N(0,1)$** by the CLT, since each is a sum of i.i.d. finite-variance variables.
- The Normal distribution is the universal limiting distribution for standardised sums — the fixed point reached by two separate paths through the family.
