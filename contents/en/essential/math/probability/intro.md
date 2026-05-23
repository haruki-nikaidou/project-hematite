---
title: Introduction to Probability
summary: "Modern probability is the study of measure spaces whose total mass is one — every probabilistic statement reduces to a statement about a measurable set, a measurable function, or an integral. This checkpoint motivates the measure-theoretic framework, surveys the road ahead (sample spaces, axioms, random variables, expectation, conditional structures, Markov chains), and explains why the Lebesgue integral is the right foundation."
prerequisites:
  - essential/math/integral_theory/lebesgue_integral
aliases: []
tags:
  - Probability
updated: 2026-05-22
---

You have seen how the Lebesgue integral unifies summation and Riemann integration under a single framework — measure theory gives a rigorous foundation for computing integrals over arbitrary spaces. Probability is precisely that framework, specialised to spaces of total mass one. When you flip a coin, roll a die, or model the time until a server crashes, you are specifying a measure on a set of possible outcomes and asking about its mass. The entire edifice of probability — random variables, independence, expectation, conditional distributions, limit theorems — is measure theory with the normalisation constraint $P(\Omega) = 1$.

This checkpoint sets the stage for the series ahead.

## Why measure theory?

Elementary probability courses define probability in terms of counting (finite sample spaces) or density functions (continuous random variables). Both work within their domain, but they break down at the edges:

- What is the probability that a randomly chosen real number in $[0, 1]$ is **rational**? The Riemann integral of the indicator $\mathbf{1}_{\mathbb{Q} \cap [0,1]}$ does not exist, but the Lebesgue integral gives $0$ immediately because $\mathbb{Q}$ is countable and hence has measure zero.
- What is the distribution of a random variable that is neither discrete nor absolutely continuous — for instance, a mixture of a point mass at $0$ and a uniform distribution on $(0, 1]$? Classical density-based formulas require special casing; the measure-theoretic framework handles it uniformly through the Lebesgue decomposition theorem.
- What does it mean to take expectation over an abstract space with no ordering or metric? The Lebesgue integral $\int_\Omega X \, dP$ is defined for any measurable function $X$ on any measure space $(\Omega, \mathcal{F}, P)$.

The measure-theoretic formulation does not just handle these pathological cases — it is the *only* framework robust enough to support the full machinery of modern probability (stochastic processes, martingale theory, large deviations, and more).

## The core objects

A **probability space** is a triple $(\Omega, \mathcal{F}, P)$:

- $\Omega$ is the **sample space**: the set of all possible outcomes. It can be finite, countably infinite, or uncountably infinite (e.g.\ $[0, 1]$ or $\mathbb{R}^n$).
- $\mathcal{F}$ is a **$\sigma$-algebra** on $\Omega$: a collection of subsets closed under complement and countable union, representing the events you are allowed to assign probability to.
- $P : \mathcal{F} \to [0, 1]$ is the **probability measure**: a $\sigma$-additive function with $P(\Omega) = 1$.

A **random variable** $X : \Omega \to \mathbb{R}$ is a measurable function — a bridge that turns abstract outcomes into numbers. Its **distribution** is the push-forward measure $P_X(B) = P(X^{-1}(B))$, a probability measure on $\mathbb{R}$.

The **expectation** of $X$ is the Lebesgue integral $E[X] = \int_\Omega X \, dP$, which specialises to $\sum_k x_k p_k$ for discrete distributions and $\int x \, f(x) \, dx$ for absolutely continuous ones — but it is defined and enjoys the same linearity and convergence theorems in full generality.

## The road ahead

The checkpoints in this series build the theory in the following order:

1. **[Sample spaces and events](../sample_space/)** — the vocabulary of $\Omega$, events, and set-theoretic operations.
2. **[The probability axioms](../pr_axioms/)** — Kolmogorov's three axioms and their immediate consequences.
3. **[Random variables](../random_variables/concept/)** — measurable functions, CDF, PMF, PDF, and the distribution as a push-forward measure.
4. **[Common distributions](../random_variables/bernoulli/)** — Bernoulli, Binomial, Geometric, Poisson, Exponential, Gamma, Normal.
5. **[Expectation](../expectation/)** — the Lebesgue integral as expectation, linearity, the law of the unconscious statistician.
6. **[Variance](../variance/)** and **[moments](../moments/)** — spread, skewness, kurtosis.
7. **[Moment generating functions](../generating_function/)** — encoding moments in a power series; uniqueness and independence.
8. **[Conditional probability](../conditional/conditional_pr/)** and **[conditional expectation](../conditional/conditional_exp/)** — updating beliefs; the tower property.
9. **[2D random variables](../2d_random_variables/jointly_distributed/)** — joint distributions, marginals, independence, covariance.
10. **[Convolution](../distribution_convolution/)** — the distribution of sums of independent random variables.
11. **[Markov chains](../markov_chain/concept/)** — processes with memoryless transitions; stationary distributions.

Each checkpoint is self-contained given its prerequisites, so you can navigate directly to whatever you need.

## Probability as specialised measure theory

The key insight is that probability introduces no genuinely new mathematics. Every theorem in probability is a theorem in measure theory applied to a space with $P(\Omega) = 1$. The Lebesgue dominated convergence theorem becomes the dominated convergence theorem for expectations. The Radon–Nikodym theorem becomes the existence of conditional densities. The product measure construction becomes the joint distribution of independent random variables.

What probability adds is **interpretation**: the measure $P(A)$ is the long-run frequency of event $A$ (frequentist reading) or the degree of belief in $A$ (Bayesian reading), and results like the law of large numbers and the central limit theorem connect the abstract formalism to observable phenomena.

You will see these connections made explicit at every step of the series.

