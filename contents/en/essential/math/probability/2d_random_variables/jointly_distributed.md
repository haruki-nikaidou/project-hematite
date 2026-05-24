---
title: Jointly Distributed Random Variables
summary: "A pair (X, Y) of random variables on the same probability space induces a joint distribution on ℝ²; the marginals are recovered by integrating out the other coordinate. This checkpoint defines joint CDF, joint PMF, and joint density, derives the marginal formulas from the joint law, and explains why the joint distribution carries strictly more information than the marginals alone."
prerequisites:
  - essential/math/probability/random_variables/concept
aliases: []
tags:
  - Probability
  - Random Variables
updated: 2026-05-22
---

When you have a single [random variable](../concept/) $X$, its distribution tells you the probability of any event of the form $\{X \in B\}$. But two random variables $X$ and $Y$ defined on the same probability space can be **correlated** in ways their individual distributions never reveal — knowing $X$ can change what you expect from $Y$. To capture this, you need their **joint distribution**: the probability measure that $(X, Y)$ induces together on $\mathbb{R}^2$.

## Joint distribution and joint CDF

Let $X, Y : \Omega \to \mathbb{R}$ be random variables on the same probability space $(\Omega, \mathcal{F}, P)$. The pair $(X, Y)$ is naturally viewed as a single random vector taking values in $\mathbb{R}^2$. Its **joint distribution** is the push-forward measure $P_{(X,Y)}$ on $(\mathbb{R}^2, \mathcal{B}(\mathbb{R}^2))$:

$$
P_{(X,Y)}(A) \coloneqq P\bigl(\{\omega : (X(\omega), Y(\omega)) \in A\}\bigr), \quad A \in \mathcal{B}(\mathbb{R}^2).
$$

The **joint cumulative distribution function (joint CDF)** is

$$
F_{X,Y}(x, y) \coloneqq P(X \leq x,\, Y \leq y), \quad (x, y) \in \mathbb{R}^2.
$$

It is non-decreasing in each argument, right-continuous in each argument, tends to $0$ when either argument goes to $-\infty$, and tends to $1$ as both arguments go to $+\infty$. The probability of a rectangle $(a, b] \times (c, d]$ is recovered by inclusion-exclusion:

$$
P(a < X \leq b,\, c < Y \leq d) = F_{X,Y}(b, d) - F_{X,Y}(a, d) - F_{X,Y}(b, c) + F_{X,Y}(a, c).
$$

## Discrete case: joint PMF

$(X, Y)$ is **jointly discrete** if there is a countable set $S \subseteq \mathbb{R}^2$ such that $P((X,Y) \in S) = 1$. The **joint probability mass function (joint PMF)** is

$$
p_{X,Y}(x, y) \coloneqq P(X = x,\, Y = y).
$$

It satisfies $p_{X,Y}(x,y) \geq 0$ for all $(x,y)$ and

$$
\sum_{(x,y) \in S} p_{X,Y}(x, y) = 1.
$$

**Example.** Roll two fair dice independently. Let $X$ be the result of the first die and $Y$ the result of the second. The joint PMF is $p_{X,Y}(i, j) = \frac{1}{36}$ for $i, j \in \{1, \ldots, 6\}$ and $0$ otherwise.

## Absolutely continuous case: joint PDF

$(X, Y)$ is **jointly absolutely continuous** if there exists a non-negative measurable function $f_{X,Y} : \mathbb{R}^2 \to [0, \infty)$ such that for every Borel set $A \subseteq \mathbb{R}^2$:

$$
P\bigl((X, Y) \in A\bigr) = \iint_A f_{X,Y}(x, y) \, dx \, dy.
$$

The function $f_{X,Y}$ is the **joint probability density function (joint PDF)**. It satisfies

$$
\iint_{\mathbb{R}^2} f_{X,Y}(x, y) \, dx \, dy = 1.
$$

The joint CDF is recovered by integration:

$$
F_{X,Y}(x, y) = \int_{-\infty}^{x} \int_{-\infty}^{y} f_{X,Y}(s, t) \, dt \, ds,
$$

and when $f_{X,Y}$ is continuous, $\dfrac{\partial^2}{\partial x \, \partial y} F_{X,Y}(x,y) = f_{X,Y}(x, y)$.

**Example.** The **uniform distribution on the unit square** has joint PDF $f_{X,Y}(x, y) = 1$ for $(x, y) \in [0,1]^2$ and $0$ elsewhere. Then $P(X \leq \tfrac{1}{2},\, Y \leq \tfrac{1}{2}) = \tfrac{1}{4}$.

## Marginal distributions

Given the joint distribution, you can recover the distribution of each variable individually by **integrating out** (or summing out) the other variable. These are called the **marginal distributions**.

### Discrete case

$$
p_X(x) = P(X = x) = \sum_{y} p_{X,Y}(x, y), \qquad p_Y(y) = P(Y = y) = \sum_{x} p_{X,Y}(x, y).
$$

### Absolutely continuous case

$$
f_X(x) = \int_{-\infty}^{+\infty} f_{X,Y}(x, y) \, dy, \qquad f_Y(y) = \int_{-\infty}^{+\infty} f_{X,Y}(x, y) \, dx.
$$

The marginal CDF satisfies $F_X(x) = \lim_{y \to +\infty} F_{X,Y}(x, y)$, consistent with both formulas.

## Expectation of functions of two variables

For a jointly absolutely continuous pair $(X, Y)$ with joint PDF $f_{X,Y}$, the expectation of a measurable function $g$ is

$$
E[g(X, Y)] = \iint_{\mathbb{R}^2} g(x, y)\, f_{X,Y}(x, y)\, dx\, dy,
$$

provided the integral converges absolutely. In the discrete case, replace the integral with $\sum_{(x,y) \in S} g(x,y)\, p_{X,Y}(x,y)$. This is the two-variable extension of LOTUS from [Expectation](../expectation/).

## The joint carries more information than the marginals

Knowing both marginal distributions $P_X$ and $P_Y$ does **not** determine the joint distribution $P_{(X,Y)}$.

**Counterexample.** Let $U \sim \operatorname{Uniform}(0, 1)$ and define two pairs:

- **Pair 1**: $(X_1, Y_1) = (U, U)$ — both variables are always equal.
- **Pair 2**: $(X_2, Y_2) = (U, 1 - U)$ — knowing one determines the other exactly.

Both $X_1, X_2$ and $Y_1, Y_2$ have the same $\operatorname{Uniform}(0,1)$ marginal distribution. Yet the joint distributions are completely different: $P(X_1 = Y_1) = 1$ while $P(X_2 + Y_2 = 1) = 1$. The joint law encodes the **dependence structure** — information the marginals throw away.

## Summary

- The **joint distribution** of $(X,Y)$ is the push-forward measure $P_{(X,Y)}$ on $\mathbb{R}^2$; the **joint CDF** is $F_{X,Y}(x,y) = P(X \leq x, Y \leq y)$.
- For jointly discrete $(X,Y)$: the **joint PMF** $p_{X,Y}(x,y) = P(X=x, Y=y)$ sums to $1$; marginals are obtained by summing over the other variable.
- For jointly absolutely continuous $(X,Y)$: the **joint PDF** $f_{X,Y}$ integrates to $1$; marginals are obtained by integrating out the other variable: $f_X(x) = \int f_{X,Y}(x,y)\,dy$.
- $E[g(X,Y)] = \iint g\, f_{X,Y}\,dx\,dy$ (continuously) or $\sum g\, p_{X,Y}$ (discretely).
- The joint distribution is strictly richer than the pair of marginals: different joint laws can share identical marginals.
