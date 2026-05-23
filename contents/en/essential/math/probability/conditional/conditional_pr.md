---
title: Conditional Probability
summary: "The conditional probability of A given B is P(A | B) = P(A ∩ B) / P(B), defined whenever P(B) > 0. This checkpoint motivates the definition as the renormalised probability on the restricted sample space B, derives the multiplication rule P(A ∩ B) = P(A | B) P(B), and proves the law of total probability via a partition of Ω."
prerequisites:
  - essential/math/probability/pr_axioms
aliases: []
tags:
  - Probability
  - Conditional Probability
updated: 2026-05-22
---

When you learn that a randomly chosen patient is a smoker, the probability they develop lung cancer rises dramatically from the population baseline. **Conditional probability** is the mathematical tool for updating a probability when you receive partial information about which outcome occurred.

## Definition

Let $(\Omega, \mathcal{F}, P)$ be a probability space and $B \in \mathcal{F}$ an event with $P(B) > 0$. The **conditional probability of $A$ given $B$** is

$$
P(A \mid B) \coloneqq \frac{P(A \cap B)}{P(B)}.
$$

The intuition: conditioning on $B$ restricts the sample space from $\Omega$ to $B$. Within $B$, the relevant probability of $A$ is the fraction of $B$'s mass that falls in $A$, renormalised so that $P(B \mid B) = 1$.

## Renormalisation interpretation

For fixed $B$ with $P(B) > 0$, the function $Q(A) \coloneqq P(A \mid B)$ is itself a probability measure on $(\Omega, \mathcal{F})$:

- **Non-negativity.** $P(A \cap B) \geq 0$ and $P(B) > 0$, so $Q(A) \geq 0$.
- **Normalisation.** $Q(\Omega) = P(\Omega \cap B) / P(B) = 1$.
- **$\sigma$-additivity.** Follows directly from that of $P$.

So every theorem about probability measures applies to conditional probabilities with the same conditioning event — you have simply replaced the original measure with a new one concentrated on $B$.

## Multiplication rule

Rearranging the definition immediately gives the **multiplication rule**:

$$
P(A \cap B) = P(A \mid B) \, P(B). \tag{1}
$$

This extends to chains of events. For events $A_1, A_2, \ldots, A_n$ with $P(A_1 \cap \cdots \cap A_{n-1}) > 0$:

$$
P(A_1 \cap \cdots \cap A_n) = P(A_1) \, P(A_2 \mid A_1) \, P(A_3 \mid A_1 \cap A_2) \cdots P(A_n \mid A_1 \cap \cdots \cap A_{n-1}). \tag{2}
$$

*Proof.* Apply the multiplication rule iteratively: $P(A_1 \cap \cdots \cap A_n) = P(A_n \mid A_1 \cap \cdots \cap A_{n-1}) \cdot P(A_1 \cap \cdots \cap A_{n-1})$, then recurse.

**Example.** Draw cards without replacement from a standard 52-card deck. The probability that the first two draws are both aces is

$$
P(\text{ace}_1 \cap \text{ace}_2) = P(\text{ace}_1) \cdot P(\text{ace}_2 \mid \text{ace}_1) = \frac{4}{52} \cdot \frac{3}{51} = \frac{1}{221}.
$$

## Law of total probability

A **partition** of $\Omega$ is a collection $\{B_i\}_{i \in I}$ of pairwise disjoint events whose union is $\Omega$. If $\{B_1, B_2, \ldots\}$ is a countable partition with each $P(B_i) > 0$, then for any event $A$:

$$
P(A) = \sum_{i} P(A \mid B_i) \, P(B_i). \tag{3}
$$

*Proof.* Write $A = \bigcup_i (A \cap B_i)$ as a disjoint union. By $\sigma$-additivity and the multiplication rule:

$$
P(A) = \sum_i P(A \cap B_i) = \sum_i P(A \mid B_i) \, P(B_i).
$$

The law of total probability is the workhorse for computing "hard" unconditional probabilities: choose a partition on which $P(A \mid B_i)$ is easy to evaluate, then combine using the prior weights $P(B_i)$.

**Example.** A factory has two machines. Machine 1 produces 60% of output with a 2% defect rate; Machine 2 produces 40% with a 5% defect rate. Let $D$ be the event that a randomly chosen product is defective, and $M_1$, $M_2$ the events that it came from each machine. Then

$$
P(D) = P(D \mid M_1) \, P(M_1) + P(D \mid M_2) \, P(M_2) = 0.02 \times 0.6 + 0.05 \times 0.4 = 0.032.
$$

So 3.2% of all products are defective.

## Summary

- **Conditional probability**: $P(A \mid B) = P(A \cap B) / P(B)$ for $P(B) > 0$; it is the renormalised probability on the restricted sample space $B$, and itself satisfies the three Kolmogorov axioms.
- **Multiplication rule**: $P(A \cap B) = P(A \mid B) P(B)$, extending to chains of events via $P(A_1 \cap \cdots \cap A_n) = P(A_1) P(A_2 \mid A_1) \cdots P(A_n \mid A_1 \cap \cdots \cap A_{n-1})$.
- **Law of total probability**: for a countable partition $\{B_i\}$ of $\Omega$ with $P(B_i) > 0$, $P(A) = \sum_i P(A \mid B_i) P(B_i)$.
