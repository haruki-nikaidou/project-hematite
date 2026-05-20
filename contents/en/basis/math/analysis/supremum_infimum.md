---
title: Supremum & Infimum
summary: "Defines the supremum (least upper bound) and infimum (greatest lower bound) of a subset of ℝ, establishes the least upper bound property as the completeness of ℝ, and derives key consequences including the Archimedean property."
prerequisites:
  - basis/math/analysis/real_number_a
aliases: []
tags: ["Analysis", "Real Numbers"]
updated: 2026-05-20
---

You know that $\mathbb{R}$ is complete — every Cauchy sequence converges. But completeness has an equivalent face that is often more convenient in practice: every non-empty set of reals that is bounded above has a *smallest* upper bound. That bound is called the **supremum**, and its mirror image for lower bounds is the **infimum**. These two concepts underpin the entire structure of real analysis.

## Bounds

Let $S \subseteq \mathbb{R}$ be a non-empty set.

A number $M \in \mathbb{R}$ is an **upper bound** of $S$ if

$$
\forall s \in S,\quad s \leq M.
$$

A number $m \in \mathbb{R}$ is a **lower bound** of $S$ if

$$
\forall s \in S,\quad m \leq s.
$$

If $S$ has at least one upper bound it is **bounded above**; if it has at least one lower bound it is **bounded below**. A set that is bounded above *and* below is simply called **bounded**.

Note that bounds are not unique. If $M$ is an upper bound of $S$, so is $M + 1$, $M + 100$, and any larger number. The interesting object is the *tightest* bound.

## Supremum and infimum

The **supremum** of $S$, written $\sup S$, is the least upper bound of $S$: it is an upper bound of $S$ and is $\leq$ every other upper bound of $S$.

Unpacking the definition: $\sup S = \alpha$ means

1. $\forall s \in S,\; s \leq \alpha$ (upper bound), and
2. $\forall \varepsilon > 0,\; \exists\, s \in S \text{ such that } s > \alpha - \varepsilon$ (no smaller upper bound works).

Condition 2 is the characteristic property of the supremum: you cannot lower $\alpha$ by even $\varepsilon$ without losing the upper-bound property.

The **infimum** of $S$, written $\inf S$, is the greatest lower bound of $S$: it is a lower bound of $S$ and is $\geq$ every other lower bound. Dually, $\inf S = \beta$ means

1. $\forall s \in S,\; \beta \leq s$, and
2. $\forall \varepsilon > 0,\; \exists\, s \in S \text{ such that } s < \beta + \varepsilon$.

Both $\sup S$ and $\inf S$ are unique when they exist: if $\alpha$ and $\alpha'$ are both least upper bounds then $\alpha \leq \alpha'$ and $\alpha' \leq \alpha$, so $\alpha = \alpha'$.

## The least upper bound property

The existence of $\sup S$ is not automatic — it depends on the number system. In $\mathbb{Q}$, the set $\{q \in \mathbb{Q} : q^2 < 2\}$ is bounded above (by $2$, for instance) yet has no supremum in $\mathbb{Q}$, because $\sqrt{2} \notin \mathbb{Q}$.

In $\mathbb{R}$, the situation is perfect:

> **Theorem (Least Upper Bound Property).** Every non-empty subset of $\mathbb{R}$ that is bounded above has a supremum in $\mathbb{R}$.

*Proof sketch.* Because $\mathbb{R}$ is [complete](../real_number_a/), every Cauchy sequence of reals converges in $\mathbb{R}$. From completeness one can show: for a non-empty $S$ bounded above, consider the binary search sequence that tightens an interval $[a_n, b_n]$ where $a_n \in S$ (or near $S$) and $b_n$ is always an upper bound. The interval lengths shrink to zero, so the endpoints form Cauchy sequences converging to a common limit, which is the supremum. $\square$

By symmetry (negate all elements), every non-empty subset bounded below has an infimum in $\mathbb{R}$.

The least upper bound property is logically equivalent to the completeness of $\mathbb{R}$: either can be taken as the defining axiom and the other derived. Together they express the same fact — $\mathbb{R}$ has no holes.

## Examples

### Closed interval $[a, b]$

$$
\sup [a, b] = b, \qquad \inf [a, b] = a.
$$

Both bounds are attained: $b \in [a, b]$ and $a \in [a, b]$.

### Open interval $(a, b)$

$$
\sup (a, b) = b, \qquad \inf (a, b) = a.
$$

Neither bound is attained: $b \notin (a, b)$ and $a \notin (a, b)$. The supremum exists in $\mathbb{R}$ even though no element of the set reaches it — the set approaches $b$ arbitrarily closely but never touches it.

### Harmonic sequence

Let $S = \left\{\dfrac{1}{n} : n \in \mathbb{N},\; n \geq 1\right\} = \left\{1,\, \tfrac{1}{2},\, \tfrac{1}{3},\, \ldots\right\}$.

$$
\sup S = 1 \in S, \qquad \inf S = 0 \notin S.
$$

The infimum $0$ is not achieved: every element $1/n > 0$, but for any $\varepsilon > 0$ you can choose $n > 1/\varepsilon$ to get $1/n < \varepsilon$, confirming $0$ is the greatest lower bound.

### Unbounded sets

The set $\mathbb{N}$ is bounded below ($\inf \mathbb{N} = 0$) but unbounded above: no finite $M$ is an upper bound, so $\sup \mathbb{N}$ does not exist in $\mathbb{R}$. It is conventional to write $\sup \mathbb{N} = +\infty$.

## Sup and inf in the set vs outside it

A key insight from the examples: the supremum of $S$ may or may not belong to $S$.

- $\sup S \in S$ if and only if $S$ has a **maximum** (greatest element).
- $\inf S \in S$ if and only if $S$ has a **minimum** (least element).

Every set has at most one maximum and one minimum; if either exists it equals the corresponding sup or inf. But a set can have a supremum without having a maximum — as $(a, b)$ illustrates.

## The Archimedean property

A classical consequence of the least upper bound property is:

> **Theorem (Archimedean property).** For every $x \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $n > x$.

*Proof.* Suppose for contradiction that some $x \in \mathbb{R}$ is an upper bound for $\mathbb{N}$. Then $\mathbb{N}$ is a non-empty bounded-above subset of $\mathbb{R}$, so by the LUB property it has a supremum $\alpha = \sup \mathbb{N}$. Since $\alpha - 1$ is not an upper bound of $\mathbb{N}$, there exists $n \in \mathbb{N}$ with $n > \alpha - 1$, i.e.\ $n + 1 > \alpha$. But $n + 1 \in \mathbb{N}$, contradicting $\alpha$ being an upper bound. $\square$

An equivalent formulation: for any $\varepsilon > 0$, there exists $n \in \mathbb{N}$ with $1/n < \varepsilon$. This is used constantly in analysis to show that quantities can be made arbitrarily small.

## Useful reformulations

The following are all equivalent to $\alpha = \sup S$, and each is useful in different proofs:

- $\alpha$ is an upper bound, and for every $\varepsilon > 0$ the interval $(\alpha - \varepsilon, \alpha]$ contains a point of $S$.
- $\alpha$ is an upper bound, and there is a sequence $(s_n)$ in $S$ with $s_n \to \alpha$.
- $\alpha = \min\{M \in \mathbb{R} : M \text{ is an upper bound of } S\}$.

The second reformulation — a sequence in $S$ converging to the supremum — is often the most useful in proofs, connecting the sup/inf language back to sequences and limits.

## Summary

- An **upper bound** of $S$ satisfies $s \leq M$ for all $s \in S$; a **lower bound** satisfies $m \leq s$ for all $s \in S$.
- The **supremum** $\sup S$ is the *least* upper bound; the **infimum** $\inf S$ is the *greatest* lower bound. Both are unique when they exist.
- The characterisation: $\alpha = \sup S$ iff $\alpha$ is an upper bound and for every $\varepsilon > 0$ some $s \in S$ satisfies $s > \alpha - \varepsilon$.
- The **least upper bound property**: every non-empty $S \subseteq \mathbb{R}$ bounded above has $\sup S \in \mathbb{R}$. This is equivalent to the completeness of $\mathbb{R}$.
- The supremum may or may not lie in $S$: $\sup S \in S$ iff $S$ has a maximum.
- The **Archimedean property** follows: for any $x \in \mathbb{R}$ there exists $n \in \mathbb{N}$ with $n > x$, so $\mathbb{N}$ is unbounded above and $1/n$ can be made arbitrarily small.
