---
title: Introduction to Measure
summary: "Measure theory generalises length, area, and volume into a single notion that can assign a size to far stranger sets. This checkpoint motivates the problem of measuring sets, explains why naïve length on the rationals already breaks down, and previews how σ-algebras and outer measure fix it."
prerequisites:
  - basis/math/analysis/set/set_intro
  - basis/math/analysis/real_number_a
aliases: []
tags:
  - Measure Theory
updated: 2026-05-20
---

You already know that the interval $[a, b]$ has length $b - a$. But what is the "length" of the set of all rationals in $[0, 1]$? Or of a set built by an adversarial construction that avoids any obvious description? Measure theory is the branch of mathematics that answers these questions rigorously — and in doing so, it becomes the foundation of modern probability, integration, and analysis.

## Why naïve length is not enough

For a finite union of disjoint intervals, length is obvious: add up the lengths of the pieces. The trouble starts when you try to assign lengths to more exotic subsets of $\mathbb{R}$.

### The rational numbers have measure zero

The rationals $\mathbb{Q} \cap [0, 1]$ are **dense** in $[0, 1]$: between any two reals you can find a rational. Yet there are only countably many of them — as you saw in [Countable Set](/en/cp/basis/math/analysis/set/countable/). This tension is resolved by measure theory:

$$
\lambda(\mathbb{Q} \cap [0,1]) = 0. \tag{1}
$$

The intuition: arrange the rationals in a sequence $q_1, q_2, q_3, \ldots$ Cover $q_k$ with an open interval of length $\varepsilon / 2^k$. The union of all these intervals covers every rational in $[0,1]$, yet has total length at most

$$
\sum_{k=1}^{\infty} \frac{\varepsilon}{2^k} = \varepsilon.
$$

Since $\varepsilon$ can be made arbitrarily small, the rationals occupy zero length — even though they are everywhere.

### You cannot measure every subset

The real surprise is that there exist subsets of $\mathbb{R}$ to which you **cannot** consistently assign a length. The **Vitali set** is the canonical example. Partition $[0, 1]$ by the equivalence relation $x \sim y \iff x - y \in \mathbb{Q}$. By the Axiom of Choice, pick exactly one representative from each class to form a set $V$. If you try to assign $V$ a length $\lambda(V) \geq 0$, you run into a contradiction: the translates $V + q$ (for $q \in \mathbb{Q} \cap [-1, 1]$) are pairwise disjoint, their union covers $[0, 1]$, and — if length were countably additive — the total length would have to equal $1$ while each summand is the same number, which is impossible whether that number is $0$ or positive.

The lesson: **not every set can be measured**. Measure theory's first task is to identify which sets *can* be measured.

## What measure theory builds

The fix has two parts.

**First**, instead of trying to assign a size to every subset, you restrict attention to a carefully chosen family of subsets called a **σ-algebra** — a collection that is closed under complement and countable union, making it stable under all the set operations you actually need. The Vitali set lies outside this family.

**Second**, you define a function $\mu$ on the σ-algebra that assigns a non-negative number (possibly $+\infty$) to each measurable set. The key property is **countable additivity**: for pairwise disjoint measurable sets $E_1, E_2, \ldots$,

$$
\mu\!\left(\bigsqcup_{k=1}^{\infty} E_k\right) = \sum_{k=1}^{\infty} \mu(E_k). \tag{2}
$$

Together, a σ-algebra $\mathcal{F}$ on a set $X$ and a measure $\mu \colon \mathcal{F} \to [0, +\infty]$ satisfying $(2)$ form a **measure space** $(X, \mathcal{F}, \mu)$.

## The road ahead

In the next few checkpoints you will build the Lebesgue measure on $\mathbb{R}$ step by step:

1. **[σ-Algebra](../sigma_algebra/)** — the precise definition of the domain of a measure.
2. **[Outer Measure](../outer_measure/)** — a preliminary "size" defined on *all* subsets by covering with intervals; it is monotone and sub-additive but not fully additive.
3. **[Carathéodory's Criterion](../measurable_criterion/)** — the rule that picks out exactly the sets on which the outer measure becomes a true measure.
4. **[Lebesgue Measure](../lebesgue_measure/)** — the outer measure from step 2 restricted to the measurable sets from step 3, giving the definitive notion of length on $\mathbb{R}$.

## Summary

- The length of an interval is the starting point, but extending length to arbitrary subsets of $\mathbb{R}$ requires care.
- The rationals have measure zero despite being dense: a countable set can always be covered by intervals of arbitrarily small total length, as in equation $(1)$.
- The Vitali set shows that **not every subset of $\mathbb{R}$ can be assigned a consistent length**: the domain of a measure must be restricted.
- The solution is a **measure space** $(X, \mathcal{F}, \mu)$: a set $X$, a σ-algebra $\mathcal{F}$ of measurable subsets, and a countably additive function $\mu$ on $\mathcal{F}$ — see equation $(2)$.
- The Lebesgue measure, built in the next checkpoints, is the canonical example on $\mathbb{R}$.
