---
title: Carathéodory's Measurability Criterion
summary: "Carathéodory's criterion picks out the sets on which an outer measure becomes a true (countably additive) measure: E is measurable when it splits every test set additively. This checkpoint states the criterion, proves that the measurable sets form a σ-algebra, and shows that the restricted outer measure is a complete measure."
prerequisites:
  - basis/math/measure/outer_measure
aliases: []
tags:
  - Measure Theory
updated: 2026-05-20
---

[Outer measure](../outer_measure/) gives every subset of $\mathbb{R}$ a size, but it is only sub-additive. The problem is that some "bad" sets leak measure across boundaries in a way that makes additivity fail. Constantin Carathéodory's insight (1914) was to characterise the "good" sets — the measurable ones — by a single geometric condition: a set $E$ is measurable precisely when it **perfectly splits** every test set $A$ into two non-overlapping pieces.

## The criterion

Let $\mu^*$ be an outer measure on a set $X$ (see [Outer Measure](../outer_measure/) for the abstract definition). A set $E \subseteq X$ is **Carathéodory-measurable** (or simply *measurable*) with respect to $\mu^*$ if

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c) \qquad \text{for every } A \subseteq X. \tag{1}
$$

The set $A$ in $(1)$ is called the **test set**. You are asking: does $E$ divide $A$ into two pieces whose outer measures add up exactly to $\mu^*(A)$?

Because $A = (A \cap E) \cup (A \cap E^c)$ and the two pieces are disjoint, sub-additivity always gives

$$
\mu^*(A) \leq \mu^*(A \cap E) + \mu^*(A \cap E^c).
$$

So the content of criterion $(1)$ is really the reverse inequality:

$$
\mu^*(A) \geq \mu^*(A \cap E) + \mu^*(A \cap E^c). \tag{1'}
$$

In words: $E$ does not "create" extra measure when it cuts $A$ in two.

**Remark.** The criterion is symmetric in $E$ and $E^c$: if $E$ satisfies $(1)$, so does $E^c$ (just swap the roles). So measurability is preserved under complementation.

## The measurable sets form a σ-algebra

Let $\mathcal{M}$ denote the collection of all $\mu^*$-measurable sets. You will now verify that $\mathcal{M}$ satisfies all three σ-algebra axioms.

**Axiom 1: $X \in \mathcal{M}$.**
For any test set $A$: $A \cap X = A$ and $A \cap X^c = A \cap \emptyset = \emptyset$, so $\mu^*(A \cap X) + \mu^*(A \cap X^c) = \mu^*(A) + 0 = \mu^*(A)$. ✓

**Axiom 2: Closed under complement.**
Already observed above: criterion $(1)$ is symmetric in $E$ and $E^c$. ✓

**Axiom 3: Closed under countable union.**
This is the heart of the argument. Here is the key step.

*Finite unions first.* Suppose $E, F \in \mathcal{M}$. You want to show $E \cup F \in \mathcal{M}$. For any test set $A$, use the measurability of $E$ with test set $A$ and then the measurability of $F$ with test set $A \cap E^c$:

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c)
$$
$$
\mu^*(A \cap E^c) = \mu^*(A \cap E^c \cap F) + \mu^*(A \cap E^c \cap F^c).
$$

Note $E^c \cap F^c = (E \cup F)^c$, so

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c \cap F) + \mu^*(A \cap (E \cup F)^c). \tag{2}
$$

Since $A \cap (E \cup F) = (A \cap E) \cup (A \cap E^c \cap F)$ and these are disjoint, sub-additivity gives $\mu^*(A \cap (E \cup F)) \leq \mu^*(A \cap E) + \mu^*(A \cap E^c \cap F)$. Substituting into $(2)$:

$$
\mu^*(A) \geq \mu^*(A \cap (E \cup F)) + \mu^*(A \cap (E \cup F)^c),
$$

which (combined with sub-additivity in the other direction) proves $E \cup F \in \mathcal{M}$. By induction, $\mathcal{M}$ is closed under finite unions.

*Countable unions.* Let $E_1, E_2, \ldots \in \mathcal{M}$ be pairwise disjoint (the general case reduces to this by writing $\tilde{E}_k = E_k \setminus (E_1 \cup \cdots \cup E_{k-1})$, which remain in $\mathcal{M}$ by the closure properties already established). Set $S_n \coloneqq \bigsqcup_{k=1}^n E_k \in \mathcal{M}$. For any test set $A$ and each $n$:

$$
\mu^*(A \cap S_n) = \sum_{k=1}^{n} \mu^*(A \cap E_k). \tag{3}
$$

Equation $(3)$ follows by induction on $n$ using the measurability of $E_n$ with test set $A \cap S_n$. Now let $S \coloneqq \bigcup_k E_k$. Since $S_n \subseteq S$, monotonicity and $(3)$ give:

$$
\mu^*(A \cap S) \geq \mu^*(A \cap S_n) = \sum_{k=1}^{n} \mu^*(A \cap E_k).
$$

Taking $n \to \infty$ yields $\mu^*(A \cap S) \geq \sum_{k=1}^{\infty} \mu^*(A \cap E_k)$, so together with sub-additivity:

$$
\mu^*(A \cap S) = \sum_{k=1}^{\infty} \mu^*(A \cap E_k). \tag{4}
$$

Also $S^c \subseteq S_n^c$, so $\mu^*(A \cap S^c) \leq \mu^*(A \cap S_n^c)$. Using measurability of $S_n$:

$$
\mu^*(A \cap S_n) + \mu^*(A \cap S_n^c) = \mu^*(A),
$$

hence $\mu^*(A \cap S^c) \leq \mu^*(A) - \sum_{k=1}^n \mu^*(A \cap E_k)$ for every $n$. Combining with $(4)$:

$$
\mu^*(A) \geq \mu^*(A \cap S) + \mu^*(A \cap S^c),
$$

so $S \in \mathcal{M}$. **Conclusion:** $\mathcal{M}$ is a σ-algebra. ✓

## Countable additivity on $\mathcal{M}$

The real payoff of the above argument is equation $(4)$ applied with $A = X$:

$$
\mu^*\!\left(\bigsqcup_{k=1}^{\infty} E_k\right) = \sum_{k=1}^{\infty} \mu^*(E_k) \qquad \text{for pairwise disjoint } E_k \in \mathcal{M}. \tag{5}
$$

This is **countable additivity** — the defining property of a true measure. The restriction $\mu^* \restriction_{\mathcal{M}}$ therefore turns the outer measure into a genuine measure on the σ-algebra $\mathcal{M}$.

## Completeness

A measure space $(X, \mathcal{M}, \mu^*)$ is **complete** when every subset of a null set is measurable. Carathéodory's construction automatically delivers completeness.

**Proposition.** If $\mu^*(N) = 0$ and $A \subseteq N$, then $A \in \mathcal{M}$.

*Proof.* For any test set $T$: $T \cap A \subseteq N$, so $\mu^*(T \cap A) \leq \mu^*(N) = 0$. Also $T \supseteq T \cap A^c$, so $\mu^*(T \cap A^c) \leq \mu^*(T)$ by monotonicity. Thus $\mu^*(T \cap A) + \mu^*(T \cap A^c) \leq 0 + \mu^*(T) = \mu^*(T)$, and the reverse inequality holds by sub-additivity. So $A \in \mathcal{M}$.

This completeness is important in practice: it means you never need to worry about sub-sets of measure-zero sets "falling outside" the σ-algebra.

## Summary

- **Carathéodory's criterion** $(1)$ says $E$ is measurable when it splits every test set $A$ additively; the non-trivial content is the reverse inequality $(1')$.
- The collection $\mathcal{M}$ of all measurable sets is a **σ-algebra**: it contains $X$, is closed under complements (symmetry of the criterion), and is closed under countable unions (the finite-union argument extends by the limit argument above).
- On pairwise disjoint measurable sets, the outer measure satisfies **countable additivity** — equation $(5)$. This makes $\mu^*\restriction_{\mathcal{M}}$ a genuine measure.
- The resulting measure space is **complete**: every subset of a null set is measurable.
- Next: [Lebesgue Measure](../lebesgue_measure/) applies this machinery to $\mu^* = \lambda^*$ (the Lebesgue outer measure on $\mathbb{R}$) to produce the canonical notion of length.
