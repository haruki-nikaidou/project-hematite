---
title: Bayes' Formula
summary: "Bayes' formula inverts a conditional probability: given P(B | A_i) for each cell A_i of a partition and the prior probabilities P(A_i), the posterior P(A_i | B) is P(B | A_i) P(A_i) / Σ_j P(B | A_j) P(A_j). This checkpoint derives the formula from the multiplication rule and the law of total probability, frames it as the foundation of Bayesian inference (prior × likelihood ∝ posterior), and works through the canonical diagnostic-test example to show how base rates dominate intuitively surprising answers."
prerequisites:
  - essential/math/probability/conditional/conditional_pr
aliases: []
tags:
  - Probability
  - Conditional Probability
updated: 2026-05-22
---

The multiplication rule gives $P(A \cap B) = P(A \mid B) P(B) = P(B \mid A) P(A)$. Bayes' formula exploits this symmetry to **invert** a conditional probability: given how likely observed data $B$ is under each hypothesis $A_i$, it computes how likely each hypothesis is given the data.

## Setup

Let $\{A_1, A_2, \ldots\}$ be a countable partition of $\Omega$ with each $P(A_i) > 0$. Think of the $A_i$ as competing hypotheses. You know:

- The **prior probabilities** $P(A_i)$ — your uncertainty before observing $B$.
- The **likelihoods** $P(B \mid A_i)$ — how probable the observation $B$ is under each hypothesis.

Bayes' formula computes the **posterior probabilities** $P(A_i \mid B)$ — your updated uncertainty after observing $B$.

## Derivation

Applying the multiplication rule to $A_i \cap B$ in two ways:

$$
P(B \mid A_i) \, P(A_i) = P(A_i \cap B) = P(A_i \mid B) \, P(B).
$$

Solving for $P(A_i \mid B)$ and substituting the [law of total probability](../conditional_pr/) for $P(B)$:

$$
P(A_i \mid B) = \frac{P(B \mid A_i) \, P(A_i)}{P(B)} = \frac{P(B \mid A_i) \, P(A_i)}{\displaystyle\sum_j P(B \mid A_j) \, P(A_j)}. \tag{1}
$$

This is **Bayes' formula**. The denominator is the normalising constant that makes the posteriors $P(A_i \mid B)$ sum to $1$.

## Bayesian interpretation

Equation $(1)$ is often read as the proportionality

$$
\text{posterior} \;\propto\; \text{likelihood} \times \text{prior},
$$

or: to update from prior to posterior, multiply each hypothesis's prior probability by how well it predicts the observed data $B$, then renormalise. The denominator $P(B)$ — called the **marginal likelihood** or **evidence** — is the same for all hypotheses, so it affects only the scale.

This proportionality is the foundation of **Bayesian inference**: a prior belief over a parameter, multiplied by the likelihood of observed data under that parameter, yields a posterior belief. As data accumulate, the posterior concentrates around the true parameter regardless of the prior (under regularity conditions).

## The diagnostic test example

A disease affects 1% of a population. A diagnostic test has:

- **Sensitivity** $P(+ \mid D) = 0.99$ (true positive rate).
- **Specificity** $P(- \mid D^c) = 0.99$, i.e.\ false positive rate $P(+ \mid D^c) = 0.01$.

A randomly chosen person tests positive. What is the probability they actually have the disease?

Applying Bayes' formula with $\{D, D^c\}$ as the partition:

$$
P(D \mid +) = \frac{P(+ \mid D) \, P(D)}{P(+ \mid D) \, P(D) + P(+ \mid D^c) \, P(D^c)} = \frac{0.99 \times 0.01}{0.99 \times 0.01 + 0.01 \times 0.99} = \frac{0.0099}{0.0198} = 50\%.
$$

A 99%-accurate test gives only a 50% posterior for a disease with 1% prevalence. The reason: true positives ($0.99\% \approx 1\%$ of the population) and false positives ($0.01 \times 99\% \approx 1\%$) are equally common when the disease is rare, so the prior $P(D) = 0.01$ cancels. The base rate carries enormous weight when it is far from 50%.

Raising the prevalence to 10% (a high-risk sub-population):

$$
P(D \mid +) = \frac{0.99 \times 0.10}{0.99 \times 0.10 + 0.01 \times 0.90} = \frac{0.099}{0.108} \approx 91.7\%.
$$

The same test is far more informative in the high-risk group because the prior is less extreme.

## Summary

- **Bayes' formula**: $P(A_i \mid B) = P(B \mid A_i) P(A_i) \,/\, \sum_j P(B \mid A_j) P(A_j)$ — derived from the multiplication rule applied symmetrically and the law of total probability.
- **Bayesian read**: posterior $\propto$ likelihood $\times$ prior; the denominator $P(B)$ is a normalising constant shared by all hypotheses.
- **Base-rate sensitivity**: a highly accurate test can still give a modest posterior when the prior (prevalence) is very small — the key lesson of the diagnostic example.
