---
title: Independence of Events
summary: "Two events A and B are independent when P(A ∩ B) = P(A) P(B) — equivalently, when P(A | B) = P(A) for events with P(B) > 0. This checkpoint defines independence of two events, generalises it to pairwise and mutual independence of arbitrary collections, illustrates with examples why pairwise independence is strictly weaker than mutual, and contrasts independence with the (similar-sounding but distinct) notion of being mutually exclusive."
prerequisites:
  - essential/math/probability/conditional/conditional_pr
aliases: []
tags:
  - Probability
  - Conditional Probability
  - Independence
updated: 2026-05-22
---

Knowing that it rained yesterday tells you something about whether the ground is wet today. But knowing that a fair coin landed heads on the first toss tells you nothing about the second toss. **Independence** formalises this "no information" condition.

## Definition

**Definition.** Events $A$ and $B$ are **independent** if

$$
P(A \cap B) = P(A) \, P(B). \tag{1}
$$

This definition is symmetric ($A$ independent of $B$ iff $B$ independent of $A$) and works even when $P(A) = 0$ or $P(B) = 0$, where the conditional-probability route would be undefined.

**Equivalence.** When $P(B) > 0$, independence $(1)$ is equivalent to

$$
P(A \mid B) = P(A). \tag{2}
$$

*Proof.* $P(A \mid B) = P(A \cap B) / P(B) = P(A) P(B) / P(B) = P(A)$.

So independence means that conditioning on $B$ carries no information about $A$: the [conditional probability](../conditional_pr/) $P(A \mid B)$ equals the unconditional $P(A)$.

## Independence and complements

If $A$ and $B$ are independent, then so are $A$ and $B^c$, $A^c$ and $B$, and $A^c$ and $B^c$.

*Proof (for $A$ and $B^c$).* Write $A = (A \cap B) \cup (A \cap B^c)$ as a disjoint union:

$$
P(A) = P(A \cap B) + P(A \cap B^c) = P(A) P(B) + P(A \cap B^c),
$$

so $P(A \cap B^c) = P(A)(1 - P(B)) = P(A) P(B^c)$. The cases $A^c \perp B$ and $A^c \perp B^c$ follow by symmetry.

## Collections of events

Independence of two events generalises to larger families in two non-equivalent ways.

**Pairwise independence.** Events $A_1, \ldots, A_n$ are **pairwise independent** if every pair satisfies $(1)$:

$$
P(A_i \cap A_j) = P(A_i) P(A_j) \quad \text{for all } i \neq j.
$$

**Mutual independence.** Events $A_1, \ldots, A_n$ are **mutually independent** (or **jointly independent**) if the product rule holds for every sub-collection:

$$
P\!\left(\bigcap_{i \in S} A_i\right) = \prod_{i \in S} P(A_i) \quad \text{for every } S \subseteq \{1, \ldots, n\},\ |S| \geq 2. \tag{3}
$$

Mutual independence requires $2^n - n - 1$ equations, not just $\binom{n}{2}$ pairwise ones. **Pairwise independence does not imply mutual independence.**

**Counterexample.** Flip two fair coins. Let $A$ = first coin heads, $B$ = second coin heads, $C$ = exactly one head. Each event has probability $\frac{1}{2}$, and one checks that every pair is independent (e.g.\ $P(A \cap B) = \frac{1}{4} = \frac{1}{2} \cdot \frac{1}{2}$). But

$$
P(A \cap B \cap C) = P(\text{both heads and exactly one head}) = 0 \neq \tfrac{1}{8} = P(A) P(B) P(C).
$$

The three events are pairwise but not mutually independent.

## Independence vs. mutual exclusivity

These two notions are easily confused but are almost opposite.

| | $P(A \cap B)$ | Meaning |
|---|---|---|
| **Mutually exclusive** | $= 0$ | They cannot both occur |
| **Independent** | $= P(A) P(B)$ | Knowing one tells you nothing about the other |

If $P(A) > 0$ and $P(B) > 0$, then $P(A) P(B) > 0$, so mutually exclusive events have $P(A \cap B) = 0 < P(A) P(B)$: they are **dependent**, not independent. The intuition: if $A$ and $B$ cannot both happen, then observing $A$ tells you with certainty that $B$ did not — the strongest possible dependence.

## Summary

- **Independence of two events**: $P(A \cap B) = P(A) P(B)$; equivalently $P(A \mid B) = P(A)$ when $P(B) > 0$.
- **Closed under complements**: if $A \perp B$, then $A \perp B^c$, $A^c \perp B$, and $A^c \perp B^c$.
- **Pairwise vs.\ mutual independence**: pairwise independence ($P(A_i \cap A_j) = P(A_i) P(A_j)$ for all $i \neq j$) does not imply mutual independence (the product rule for all sub-collections of size $\geq 2$).
- **Independence $\neq$ mutual exclusivity**: two events with positive probability cannot be both independent and mutually exclusive; mutually exclusive events with positive probability are necessarily dependent.
