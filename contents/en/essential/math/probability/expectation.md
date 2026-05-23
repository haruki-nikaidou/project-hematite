---
title: Expectation
summary: "The expectation of a random variable X is its Lebesgue integral against the underlying probability measure, E[X] = ∫ X dP, equivalently ∫ x dF(x) in terms of the distribution. This checkpoint defines E[X] for discrete and absolutely continuous variables, establishes the linearity E[aX + bY] = aE[X] + bE[Y], and proves the law of the unconscious statistician E[g(X)] = ∫ g(x) dF(x)."
prerequisites:
  - essential/math/probability/random_variables/concept
aliases: []
tags:
  - Probability
  - Expectation
updated: 2026-05-22
---

The **expectation** (or **expected value**, or **mean**) of a random variable is its probability-weighted average. For a die roll you might compute $\frac{1}{6}(1 + 2 + 3 + 4 + 5 + 6) = 3.5$ — that is expectation for a uniform discrete variable. The measure-theoretic definition unifies this with the continuous case and gives a framework in which all the expected algebraic rules are provable theorems.

## Definition

Let $(\Omega, \mathcal{F}, P)$ be a probability space and $X : \Omega \to \mathbb{R}$ a random variable. The **expectation** of $X$ is its Lebesgue integral against $P$:

$$
E[X] \coloneqq \int_\Omega X(\omega) \, dP(\omega),
$$

provided the integral exists (i.e.\ $\int_\Omega |X| \, dP < \infty$; then $X$ is called **integrable**). By the change-of-variables formula for push-forward measures, this equals the integral against the distribution $P_X$:

$$
E[X] = \int_{\mathbb{R}} x \, dP_X(x) = \int_{\mathbb{R}} x \, dF_X(x),
$$

where $F_X$ is the CDF of $X$ and the last integral is a Lebesgue–Stieltjes integral.

### Discrete case

If $X$ is discrete with support $\{x_1, x_2, \ldots\}$ and $P(X = x_k) = p_k$, then

$$
E[X] = \sum_{k} x_k \, p_k,
$$

provided $\sum_k |x_k| p_k < \infty$.

### Absolutely continuous case

If $X$ has probability density function $f_X$, then

$$
E[X] = \int_{-\infty}^{+\infty} x \, f_X(x) \, dx,
$$

provided $\int_{-\infty}^{+\infty} |x| f_X(x) \, dx < \infty$.

Both formulas are specialisations of the single Lebesgue integral $\int x \, dP_X(x)$ — the discrete case integrates against a sum of point masses, the continuous case against a Lebesgue-absolutely-continuous measure.

## Linearity of expectation

**Theorem.** For any integrable random variables $X, Y$ and constants $a, b \in \mathbb{R}$:

$$
E[aX + bY] = a \, E[X] + b \, E[Y]. \tag{1}
$$

*Proof.* Linearity of the Lebesgue integral: $\int (aX + bY) \, dP = a \int X \, dP + b \int Y \, dP$.

Linearity holds without any assumption of independence. This is one of the most powerful tools in probability: you can always decompose a complicated random variable into simpler parts and add expectations.

**Example.** For $S_n = X_1 + X_2 + \cdots + X_n$ where each $X_i$ has the same mean $\mu$:

$$
E[S_n] = E[X_1] + E[X_2] + \cdots + E[X_n] = n\mu,
$$

regardless of whether $X_1, \ldots, X_n$ are independent, correlated, or even identically distributed.

## Law of the unconscious statistician (LOTUS)

Computing $E[g(X)]$ for a function $g : \mathbb{R} \to \mathbb{R}$ does not require knowing the distribution of $g(X)$ explicitly.

**Theorem (LOTUS).** If $X$ is a random variable with distribution $P_X$ and $g : \mathbb{R} \to \mathbb{R}$ is measurable, then

$$
E[g(X)] = \int_{\mathbb{R}} g(x) \, dP_X(x).
$$

In the discrete case this is $\sum_k g(x_k) p_k$, and in the absolutely continuous case $\int_{-\infty}^{+\infty} g(x) f_X(x) \, dx$.

*Proof sketch.* $g(X)$ is the composition of measurable maps $\Omega \xrightarrow{X} \mathbb{R} \xrightarrow{g} \mathbb{R}$, so it is a random variable. Its expectation is $\int_\Omega g(X(\omega)) \, dP(\omega)$. Applying the push-forward change-of-variables formula converts the integral over $\Omega$ to an integral over $\mathbb{R}$ against $P_X$.

**Example.** For $X \sim \operatorname{Uniform}(0, 1)$ with density $f_X(x) = 1$:

$$
E[X^2] = \int_0^1 x^2 \cdot 1 \, dx = \frac{1}{3}.
$$

## Expectation of non-negative random variables

For a non-negative random variable $X \geq 0$, the expectation always exists (possibly as $+\infty$):

$$
E[X] = \int_0^{\infty} P(X > t) \, dt. \tag{2}
$$

This layer-cake formula converts a one-dimensional integral over $\mathbb{R}$ into an integral over $[0, \infty)$ of survival probabilities. It is especially useful when $P(X > t)$ has a simple form.

*Proof sketch.* By Tonelli's theorem:

$$
\int_0^\infty P(X > t) \, dt = \int_0^\infty \int_\Omega \mathbf{1}_{X(\omega) > t} \, dP(\omega) \, dt = \int_\Omega \int_0^\infty \mathbf{1}_{t < X(\omega)} \, dt \, dP(\omega) = \int_\Omega X(\omega) \, dP(\omega) = E[X].
$$

## Jensen's inequality

For a **convex** function $\varphi : \mathbb{R} \to \mathbb{R}$ and an integrable random variable $X$:

$$
\varphi(E[X]) \leq E[\varphi(X)]. \tag{3}
$$

For a **concave** function the inequality reverses. This is one of the most-used inequalities in probability and statistics.

**Examples.**

- $\varphi(x) = x^2$ is convex, so $(E[X])^2 \leq E[X^2]$, or equivalently $\operatorname{Var}(X) = E[X^2] - (E[X])^2 \geq 0$.
- $\varphi(x) = e^x$ is convex, so $e^{E[X]} \leq E[e^X]$.
- $\varphi(x) = \ln x$ is concave on $(0, \infty)$, so $E[\ln X] \leq \ln E[X]$.

## Summary

- The **expectation** $E[X] = \int_\Omega X \, dP = \int_{\mathbb{R}} x \, dF_X(x)$ is the Lebesgue integral of $X$ against the probability measure; it exists when $\int |X| \, dP < \infty$.
- Discrete: $E[X] = \sum_k x_k p_k$. Absolutely continuous: $E[X] = \int x f(x) \, dx$. Both are special cases of the same integral.
- **Linearity**: $E[aX + bY] = aE[X] + bE[Y]$ holds without any independence assumption.
- **LOTUS**: $E[g(X)] = \int g(x) \, dP_X(x)$ — integrate $g$ against the distribution of $X$, not of $g(X)$.
- **Layer-cake formula**: for $X \geq 0$, $E[X] = \int_0^\infty P(X > t) \, dt$.
- **Jensen's inequality**: $\varphi(E[X]) \leq E[\varphi(X)]$ for convex $\varphi$.

