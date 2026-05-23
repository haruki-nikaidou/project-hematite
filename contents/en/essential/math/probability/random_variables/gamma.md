---
title: Gamma Distribution
summary: "The Gamma distribution with shape α > 0 and rate λ > 0 has density f(x) = λ^α x^(α−1) e^(−λx) / Γ(α) on (0, ∞), where Γ is the gamma function. This checkpoint defines the distribution, shows that a sum of α independent Exponential(λ) random variables is Gamma(α, λ) for integer α, and works through the mean α/λ and variance α/λ²."
prerequisites:
  - essential/math/probability/random_variables/exponential
aliases: []
tags:
  - Probability
  - Random Variables
  - Distributions
updated: 2026-05-22
---

Suppose events occur in a Poisson process at rate $\lambda$ and you want to know how long until the $\alpha$-th event arrives. The waiting time for the first event is [Exponential](../exponential/); the waiting time for the $\alpha$-th event follows the **Gamma distribution**, a two-parameter family that generalises the Exponential to arbitrary numbers of events.

## The gamma function

Before defining the distribution, recall the **gamma function** $\Gamma : (0, \infty) \to (0, \infty)$:

$$
\Gamma(\alpha) \coloneqq \int_0^{\infty} t^{\alpha - 1} e^{-t}\, dt.
$$

Two key properties make $\Gamma$ the right normalising constant:

**Recursion.** Integration by parts gives $\Gamma(\alpha + 1) = \alpha\,\Gamma(\alpha)$ for all $\alpha > 0$.

**Integer values.** Combined with $\Gamma(1) = \int_0^\infty e^{-t}\,dt = 1$, the recursion yields

$$
\Gamma(n) = (n-1)! \quad \text{for every positive integer } n.
$$

**Half-integer.** A celebrated result gives $\Gamma(1/2) = \sqrt{\pi}$, so $\Gamma$ extends the factorial to non-integer arguments.

## Definition

Let $\alpha > 0$ be the **shape parameter** and $\lambda > 0$ be the **rate parameter**. A random variable $X$ follows a Gamma distribution, written $X \sim \operatorname{Gamma}(\alpha, \lambda)$, if its **probability density function** is

$$
f(x) \coloneqq \frac{\lambda^\alpha}{\Gamma(\alpha)}\, x^{\alpha-1} e^{-\lambda x}, \quad x > 0.
$$

When $\alpha = 1$ this reduces to $f(x) = \lambda e^{-\lambda x}$, recovering $\operatorname{Exp}(\lambda)$. Large $\alpha$ shifts probability mass toward larger values, reflecting a longer wait for more events.

### Verification that $f$ is a valid PDF

Non-negativity is immediate. For the integral, substitute $u \coloneqq \lambda x$ (so $x = u/\lambda$, $dx = du/\lambda$):

$$
\int_0^{\infty} \frac{\lambda^\alpha}{\Gamma(\alpha)}\, x^{\alpha-1} e^{-\lambda x}\, dx = \frac{\lambda^\alpha}{\Gamma(\alpha)} \int_0^{\infty} \left(\frac{u}{\lambda}\right)^{\alpha-1} e^{-u} \frac{du}{\lambda} = \frac{1}{\Gamma(\alpha)} \int_0^{\infty} u^{\alpha-1} e^{-u}\, du = \frac{\Gamma(\alpha)}{\Gamma(\alpha)} = 1.
$$

## Sum of exponential random variables

The most concrete way to understand the Gamma distribution is through its relationship to the Exponential. For **integer** $\alpha = n$:

**Theorem.** If $X_1, X_2, \ldots, X_n$ are independent with $X_i \sim \operatorname{Exp}(\lambda)$, then

$$
S_n \coloneqq X_1 + X_2 + \cdots + X_n \sim \operatorname{Gamma}(n, \lambda).
$$

**Proof via moment generating functions.** The MGF of $X_i \sim \operatorname{Exp}(\lambda)$ is

$$
M_{X_i}(t) = E[e^{tX_i}] = \frac{\lambda}{\lambda - t}, \quad t < \lambda.
$$

Since the $X_i$ are independent, the MGF of their sum factors:

$$
M_{S_n}(t) = \prod_{i=1}^n M_{X_i}(t) = \left(\frac{\lambda}{\lambda - t}\right)^n.
$$

One can verify that $\operatorname{Gamma}(n, \lambda)$ has the same MGF (by computing $E[e^{tX}]$ via the substitution $u = (\lambda - t)x$), and since the MGF uniquely determines the distribution, $S_n \sim \operatorname{Gamma}(n, \lambda)$. $\square$

In the Poisson process interpretation: $S_n$ is the time of the $n$-th arrival, and the theorem confirms it is $\operatorname{Gamma}(n, \lambda)$.

## Mean

The mean of $X \sim \operatorname{Gamma}(\alpha, \lambda)$ can be read off from the recursion of $\Gamma$:

$$
E[X] = \int_0^{\infty} x \cdot \frac{\lambda^\alpha}{\Gamma(\alpha)}\, x^{\alpha-1} e^{-\lambda x}\, dx = \frac{\lambda^\alpha}{\Gamma(\alpha)} \int_0^{\infty} x^{\alpha} e^{-\lambda x}\, dx.
$$

Substitute $u = \lambda x$ to obtain $\int_0^\infty x^\alpha e^{-\lambda x}\,dx = \Gamma(\alpha+1)/\lambda^{\alpha+1}$, so

$$
E[X] = \frac{\lambda^\alpha}{\Gamma(\alpha)} \cdot \frac{\Gamma(\alpha+1)}{\lambda^{\alpha+1}} = \frac{\Gamma(\alpha+1)}{\lambda\,\Gamma(\alpha)} = \frac{\alpha\,\Gamma(\alpha)}{\lambda\,\Gamma(\alpha)} = \frac{\alpha}{\lambda}.
$$

For integer $\alpha = n$ this matches the intuition: the expected waiting time for $n$ independent $\operatorname{Exp}(\lambda)$ events is $n \cdot (1/\lambda)$.

## Variance

Similarly, compute $E[X^2]$ by the same substitution:

$$
E[X^2] = \frac{\lambda^\alpha}{\Gamma(\alpha)} \cdot \frac{\Gamma(\alpha+2)}{\lambda^{\alpha+2}} = \frac{\alpha(\alpha+1)}{\lambda^2}.
$$

Therefore

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2 = \frac{\alpha(\alpha+1)}{\lambda^2} - \frac{\alpha^2}{\lambda^2} = \frac{\alpha}{\lambda^2}.
$$

## Additive property

A consequence of the MGF argument above is the **additive property**: if $X_1 \sim \operatorname{Gamma}(\alpha_1, \lambda)$ and $X_2 \sim \operatorname{Gamma}(\alpha_2, \lambda)$ are independent with the **same rate**, then

$$
X_1 + X_2 \sim \operatorname{Gamma}(\alpha_1 + \alpha_2,\, \lambda).
$$

The shapes add while the rate is preserved. This is consistent with the sum-of-exponentials interpretation: pooling $\alpha_1$ and $\alpha_2$ i.i.d. $\operatorname{Exp}(\lambda)$ waiting times yields a $\operatorname{Gamma}(\alpha_1 + \alpha_2, \lambda)$ waiting time. Note that the additive property fails if the two rates differ.

## Summary

- The gamma function $\Gamma(\alpha) = \int_0^\infty t^{\alpha-1} e^{-t}\,dt$ satisfies $\Gamma(\alpha+1) = \alpha\,\Gamma(\alpha)$ and $\Gamma(n) = (n-1)!$ for positive integers $n$.
- $X \sim \operatorname{Gamma}(\alpha, \lambda)$ has PDF $f(x) = \lambda^\alpha x^{\alpha-1} e^{-\lambda x} / \Gamma(\alpha)$ for $x > 0$, with shape $\alpha > 0$ and rate $\lambda > 0$.
- For integer $\alpha = n$: a sum of $n$ independent $\operatorname{Exp}(\lambda)$ variables is $\operatorname{Gamma}(n, \lambda)$.
- Mean: $E[X] = \alpha/\lambda$.
- Variance: $\operatorname{Var}(X) = \alpha/\lambda^2$.
- Additive property: independent $\operatorname{Gamma}(\alpha_1, \lambda)$ and $\operatorname{Gamma}(\alpha_2, \lambda)$ sum to $\operatorname{Gamma}(\alpha_1 + \alpha_2, \lambda)$.
