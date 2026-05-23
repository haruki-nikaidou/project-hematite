---
title: The Probability Axioms
summary: "A probability space is a measure space (Ω, ℱ, P) in which the measure P assigns mass 1 to the whole sample space. This checkpoint states Kolmogorov's three axioms — non-negativity, normalisation, and countable additivity — derives the immediate consequences (monotonicity, inclusion–exclusion, continuity from below and above), and shows that probability is just measure theory with a unit total mass constraint."
prerequisites:
  - essential/math/probability/sample_space
  - basis/math/measure/sigma_algebra
aliases: []
tags:
  - Probability
  - Measure Theory
updated: 2026-05-22
---

Now that you have the vocabulary of sample spaces and events, the next step is to assign numbers to events in a coherent way. Kolmogorov's 1933 axioms do exactly this: they are the minimal conditions that make probability a useful calculus of uncertainty.

## The three axioms

**Definition.** A **probability space** is a triple $(\Omega, \mathcal{F}, P)$ where $\Omega$ is the sample space, $\mathcal{F}$ is a [σ-algebra](../../basis/math/measure/sigma_algebra/) of events on $\Omega$, and $P : \mathcal{F} \to \mathbb{R}$ is a function satisfying:

1. **Non-negativity.** $P(A) \geq 0$ for all $A \in \mathcal{F}$.
2. **Normalisation.** $P(\Omega) = 1$.
3. **Countable additivity ($\sigma$-additivity).** For any sequence of pairwise disjoint events $A_1, A_2, \ldots \in \mathcal{F}$,

$$
P\!\left(\bigcup_{n=1}^{\infty} A_n\right) = \sum_{n=1}^{\infty} P(A_n).
$$

Such a function $P$ is called a **probability measure**. Notice that a probability space is simply a **measure space** in which the measure has total mass $1$: $P(\Omega) = 1$. Every theorem about measures applies directly to probability.

## Immediate consequences

The three axioms alone imply a rich set of properties.

### Probability of the impossible event

Taking the empty disjoint union with $A_n = \emptyset$ for all $n$:

$$
P(\emptyset) = P\!\left(\bigcup_{n=1}^{\infty} \emptyset\right) = \sum_{n=1}^{\infty} P(\emptyset),
$$

which forces $P(\emptyset) = 0$.

### Finite additivity

For two disjoint events $A$ and $B$, set $A_1 = A$, $A_2 = B$, $A_n = \emptyset$ for $n \geq 3$. Then $\sigma$-additivity gives $P(A \cup B) = P(A) + P(B)$.

### Complement rule

Since $A$ and $A^c$ are disjoint and $A \cup A^c = \Omega$:

$$
P(A^c) = 1 - P(A).
$$

### Monotonicity

If $A \subseteq B$, write $B = A \cup (B \setminus A)$ as a disjoint union. Then

$$
P(B) = P(A) + P(B \setminus A) \geq P(A).
$$

In particular $P(A) \leq P(\Omega) = 1$ for every event $A$.

### Inclusion–exclusion

For two events:

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B). \tag{1}
$$

*Proof.* Write $A \cup B = A \cup (B \setminus A)$ disjointly, so $P(A \cup B) = P(A) + P(B \setminus A)$. Write $B = (A \cap B) \cup (B \setminus A)$ disjointly, so $P(B \setminus A) = P(B) - P(A \cap B)$. Combine.

The generalisation to $n$ events is the **inclusion–exclusion principle**:

$$
P\!\left(\bigcup_{k=1}^n A_k\right) = \sum_k P(A_k) - \sum_{k < \ell} P(A_k \cap A_\ell) + \sum_{k < \ell < m} P(A_k \cap A_\ell \cap A_m) - \cdots + (-1)^{n+1} P(A_1 \cap \cdots \cap A_n).
$$

### Union bound (Boole's inequality)

A simpler upper bound drops the intersection terms:

$$
P\!\left(\bigcup_{n=1}^{\infty} A_n\right) \leq \sum_{n=1}^{\infty} P(A_n).
$$

This follows from inclusion–exclusion by discarding the negative terms. It is invaluable in asymptotic arguments: if you can show $\sum_n P(A_n) \to 0$, you know $P(\bigcup A_n) \to 0$ as well.

## Continuity of probability

Probability is continuous with respect to monotone limits of events, just as the Lebesgue integral is continuous with respect to monotone limits of functions.

### Continuity from below

If $A_1 \subseteq A_2 \subseteq \cdots$ is an increasing sequence of events with $\bigcup_{n=1}^\infty A_n = A$, then

$$
P(A_n) \;\nearrow\; P(A) \quad \text{as } n \to \infty.
$$

*Proof.* Write $A = A_1 \cup (A_2 \setminus A_1) \cup (A_3 \setminus A_2) \cup \cdots$ as a disjoint union of "rings". By $\sigma$-additivity:

$$
P(A) = P(A_1) + \sum_{k=1}^\infty P(A_{k+1} \setminus A_k) = \lim_{n\to\infty} P(A_n).
$$

### Continuity from above

If $B_1 \supseteq B_2 \supseteq \cdots$ is a decreasing sequence with $\bigcap_{n=1}^\infty B_n = B$, then

$$
P(B_n) \;\searrow\; P(B) \quad \text{as } n \to \infty,
$$

provided $P(B_1) < \infty$ (which here is automatic since $P(B_1) \leq 1$). The proof applies continuity from below to the complements.

These continuity properties are essential for proving theorems about limits: the Borel–Cantelli lemmas, the strong law of large numbers, and many results in stochastic processes all rely on them.

## Probability is measure theory

A probability measure is a measure with total mass $1$. This means the entire machinery of the Lebesgue integral — linearity, monotone convergence, dominated convergence, Fatou's lemma, Fubini's theorem — carries over intact. When you write $E[X] = \int_\Omega X \, dP$, the integral is the Lebesgue integral you already know, applied to the measure $P$.

The only genuinely new feature is the normalisation $P(\Omega) = 1$, which enables probabilistic interpretations: $P(A)$ is the long-run fraction of experiments in which event $A$ occurs (frequentist), or your degree of belief that $A$ will occur (Bayesian). The mathematics is the same in either case.

## Summary

- A **probability space** $(\Omega, \mathcal{F}, P)$ consists of a sample space, a $\sigma$-algebra, and a probability measure satisfying the three Kolmogorov axioms: non-negativity, normalisation ($P(\Omega) = 1$), and $\sigma$-additivity.
- Immediate consequences: $P(\emptyset) = 0$; $P(A^c) = 1 - P(A)$; monotonicity ($A \subseteq B \Rightarrow P(A) \leq P(B)$); inclusion–exclusion; the union bound.
- **Continuity from below and above**: $P$ is continuous with respect to monotone limits of events, which is $\sigma$-additivity applied to nested sequences.
- A probability measure is just a measure with total mass $1$: all Lebesgue integration theorems hold for expectations out of the box.

