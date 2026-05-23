---
title: Convolution of Distributions
summary: "The distribution of the sum X + Y of two independent random variables is the convolution of their distributions. This checkpoint derives the convolution formula — (f_X * f_Y)(z) = ∫ f_X(x) f_Y(z − x) dx for densities, and the analogous sum for PMFs — applies it to compute Binomial(m, p) + Binomial(n, p) = Binomial(m + n, p), Poisson(λ) + Poisson(μ) = Poisson(λ + μ), and N(μ_1, σ_1²) + N(μ_2, σ_2²) = N(μ_1 + μ_2, σ_1² + σ_2²), and connects the convolution operation to the multiplicative behaviour of moment generating functions."
prerequisites:
  - essential/math/probability/2d_random_variables/independent
  - essential/math/probability/random_variables/ralationship_of_all_above
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

When you add two independent random variables, what distribution does the sum have? The answer is the **convolution** of their distributions — a mathematical operation that combines two measures by sliding one over the other. Convolution explains why Binomials add, Poissons add, and Normals add, and it is the bridge between the algebra of distributions and the algebra of moment generating functions.

## The convolution formula

Let $X$ and $Y$ be [independent](../2d_random_variables/independent/) random variables and let $Z = X + Y$.

### Absolutely continuous case

If $X$ and $Y$ have densities $f_X$ and $f_Y$, then $Z$ has density

$$
f_Z(z) = (f_X * f_Y)(z) \coloneqq \int_{-\infty}^{+\infty} f_X(x) \, f_Y(z - x) \, dx. \tag{1}
$$

*Derivation.* The joint density of $(X, Y)$ factors as $f_{X,Y}(x, y) = f_X(x) f_Y(y)$ by independence. The event $\{Z \leq z\}$ is $\{X + Y \leq z\}$. Integrating over this region:

$$
F_Z(z) = P(X + Y \leq z) = \int_{-\infty}^{+\infty} \int_{-\infty}^{z-x} f_X(x) f_Y(y) \, dy \, dx = \int_{-\infty}^{+\infty} f_X(x) F_Y(z - x) \, dx.
$$

Differentiating with respect to $z$ gives formula $(1)$.

### Discrete case

If $X$ and $Y$ take values in $\mathbb{Z}$ (or a common countable set) with PMFs $p_X$ and $p_Y$, then $Z = X + Y$ has PMF

$$
p_Z(n) = (p_X * p_Y)(n) \coloneqq \sum_{k=-\infty}^{+\infty} p_X(k) \, p_Y(n - k). \tag{2}
$$

This is the discrete analogue of $(1)$: instead of integrating, you sum over all ways to split $n$ into $k$ (from $X$) and $n - k$ (from $Y$).

## Convolution is commutative and associative

The convolution operation on measures (or functions) satisfies:

$$
f_X * f_Y = f_Y * f_X \qquad \text{(commutative)}
$$

$$
(f_X * f_Y) * f_Z = f_X * (f_Y * f_Z) \qquad \text{(associative)}.
$$

Commutativity is clear from the symmetry $X + Y = Y + X$. Associativity means the distribution of a sum of three (or more) independent variables can be computed by convolving any two first.

## Key examples

### Binomial sums

If $X \sim \operatorname{Bin}(m, p)$ and $Y \sim \operatorname{Bin}(n, p)$ are independent, then $X + Y \sim \operatorname{Bin}(m+n, p)$.

*Proof via convolution.* The PMF of $\operatorname{Bin}(m, p)$ is $p_X(k) = \binom{m}{k} p^k (1-p)^{m-k}$. Convolving:

$$
p_Z(r) = \sum_{k=0}^{r} \binom{m}{k} p^k (1-p)^{m-k} \cdot \binom{n}{r-k} p^{r-k} (1-p)^{n-(r-k)} = p^r (1-p)^{m+n-r} \sum_{k=0}^r \binom{m}{k}\binom{n}{r-k}.
$$

The Vandermonde convolution identity $\sum_{k=0}^r \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}$ gives $p_Z(r) = \binom{m+n}{r} p^r (1-p)^{m+n-r}$, the $\operatorname{Bin}(m+n,p)$ PMF.

This also follows immediately from the interpretation: $\operatorname{Bin}(m, p)$ is the count of successes in $m$ independent Bernoulli trials, and combining $m$ and $n$ independent trials gives $m+n$ trials.

### Poisson sums

If $X \sim \operatorname{Poisson}(\lambda)$ and $Y \sim \operatorname{Poisson}(\mu)$ are independent, then $X + Y \sim \operatorname{Poisson}(\lambda + \mu)$.

*Proof via convolution.*

$$
p_Z(n) = \sum_{k=0}^{n} \frac{e^{-\lambda}\lambda^k}{k!} \cdot \frac{e^{-\mu}\mu^{n-k}}{(n-k)!} = \frac{e^{-(\lambda+\mu)}}{n!} \sum_{k=0}^{n} \binom{n}{k} \lambda^k \mu^{n-k} = \frac{e^{-(\lambda+\mu)}(\lambda+\mu)^n}{n!},
$$

which is $\operatorname{Poisson}(\lambda + \mu)$.

### Normal sums

If $X \sim \operatorname{N}(\mu_1, \sigma_1^2)$ and $Y \sim \operatorname{N}(\mu_2, \sigma_2^2)$ are independent, then $X + Y \sim \operatorname{N}(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$.

The density-level convolution integral can be done by completing the square, but it is more elegant via MGFs (see below). The key point is that **the normal family is closed under convolution** — a sum of independent normals is normal, with means and variances adding separately.

### Gamma sums

If $X \sim \operatorname{Gamma}(\alpha, \lambda)$ and $Y \sim \operatorname{Gamma}(\beta, \lambda)$ are independent (same rate $\lambda$), then $X + Y \sim \operatorname{Gamma}(\alpha + \beta, \lambda)$.

This follows from the representation of $\operatorname{Gamma}(\alpha, \lambda)$ as a sum of $\alpha$ independent $\operatorname{Exp}(\lambda)$ variables (for integer $\alpha$), and extends to non-integer $\alpha$ by the MGF argument.

## Connection to moment generating functions

The multiplicative property of MGFs is the algebraic reflection of convolution. For independent $X$ and $Y$:

$$
M_{X+Y}(t) = M_X(t) \cdot M_Y(t).
$$

This holds because: density-level convolution $(f_X * f_Y)(z)$ corresponds exactly to the product $\hat{f}_X(t) \cdot \hat{f}_Y(t)$ of their Laplace transforms (with $s = -t$). The MGF *is* the (two-sided) Laplace transform of the distribution, so multiplication of MGFs corresponds to convolution of distributions.

This connection is why the MGF is the sharpest tool for computing distributions of sums. Instead of evaluating the convolution integral directly, you:

1. Compute $M_X(t)$ and $M_Y(t)$.
2. Multiply: $M_Z(t) = M_X(t) \cdot M_Y(t)$.
3. Identify: if $M_Z$ matches a known MGF, you know the distribution of $Z$.

The three examples above (Binomial, Poisson, Normal) all follow immediately from this approach, since each distribution's MGF is known in closed form.

## Convolution of more than two variables

For $n$ independent variables $X_1, \ldots, X_n$, the distribution of $S_n = X_1 + \cdots + X_n$ is the $n$-fold convolution $f_{X_1} * f_{X_2} * \cdots * f_{X_n}$. Its MGF is $\prod_{k=1}^n M_{X_k}(t)$. When all $X_k$ are identically distributed with MGF $M(t)$, the MGF of $S_n$ is $M(t)^n$.

The **central limit theorem** is the asymptotic statement about this $n$-fold convolution: after standardisation, $M(t)^n$ converges (under mild conditions) to $e^{t^2/2}$, the MGF of the standard normal.

## Summary

- For independent $X, Y$, the distribution of $Z = X + Y$ is the **convolution** of their distributions: $f_Z = f_X * f_Y$ (density integral) or $p_Z(n) = \sum_k p_X(k) p_Y(n-k)$ (PMF sum).
- **Closure results**: $\operatorname{Bin}(m,p) + \operatorname{Bin}(n,p) = \operatorname{Bin}(m+n,p)$; $\operatorname{Poisson}(\lambda) + \operatorname{Poisson}(\mu) = \operatorname{Poisson}(\lambda+\mu)$; $\operatorname{N}(\mu_1,\sigma_1^2) + \operatorname{N}(\mu_2,\sigma_2^2) = \operatorname{N}(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$; $\operatorname{Gamma}(\alpha,\lambda) + \operatorname{Gamma}(\beta,\lambda) = \operatorname{Gamma}(\alpha+\beta,\lambda)$.
- Convolution corresponds to **multiplication of MGFs**: $M_{X+Y} = M_X \cdot M_Y$, since MGFs are Laplace transforms of distributions.
- The MGF approach — compute, multiply, identify — is usually faster than evaluating the convolution integral directly.
- The $n$-fold convolution of i.i.d.\ variables converges (after standardisation) to the normal distribution by the central limit theorem.

