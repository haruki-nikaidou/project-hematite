---
title: Outer Measure
summary: "An outer measure assigns a size to every subset of a space by taking the infimum of total lengths over countable open covers. This checkpoint defines outer measure, proves its monotonicity and countable sub-additivity, and shows why countable additivity fails in general — motivating the restriction to measurable sets."
prerequisites:
  - basis/math/measure/sigma_algebra
aliases: []
tags:
  - Measure Theory
updated: 2026-05-20
---

You want a function that assigns a "size" to every subset of $\mathbb{R}$. The [σ-algebra](../sigma_algebra/) told you *which* sets will ultimately be measurable, but before restricting to them you first build a preliminary size function — the **outer measure** — that is defined on *all* subsets. Its key virtue is that it is always well-defined; its key limitation is that it is only sub-additive, not fully additive. Fixing that limitation is exactly Carathéodory's job in the next checkpoint.

## The definition

The idea is to approximate the size of a set $E$ from the *outside* by covering it with open intervals and summing up their lengths. Taking the infimum over all countable covers gives the smallest possible total length needed to cover $E$.

**Definition.** For any set $E \subseteq \mathbb{R}$, the **Lebesgue outer measure** of $E$ is

$$
\lambda^*(E) \;\coloneqq\; \inf\!\left\{
  \sum_{k=1}^{\infty} (b_k - a_k)
  \;\middle|\;
  E \subseteq \bigcup_{k=1}^{\infty} (a_k, b_k)
\right\}, \tag{1}
$$

where the infimum is over all countable collections of open intervals $(a_k, b_k)$ covering $E$. If no finite bound exists, set $\lambda^*(E) = +\infty$.

A few notational notes:
- The intervals $(a_k, b_k)$ may overlap; $b_k - a_k$ is the length of the $k$-th interval.
- You are allowed to use the same interval more than once (though doing so only wastes coverage).
- A finite cover is a special case of a countable cover (pad with empty intervals).

The same construction works on $\mathbb{R}^n$ using $n$-dimensional boxes, or on any metric space using appropriate "elementary sets", but for now you work in $\mathbb{R}$.

## Three fundamental properties

### (i) Outer measure of the empty set is zero

$$
\lambda^*(\emptyset) = 0. \tag{2}
$$

For any $\varepsilon > 0$, cover $\emptyset$ with a single interval $(0, \varepsilon)$ of length $\varepsilon$. Taking $\varepsilon \to 0$ gives $\lambda^*(\emptyset) \leq 0$; since lengths are non-negative, $\lambda^*(\emptyset) = 0$.

### (ii) Monotonicity

If $A \subseteq B \subseteq \mathbb{R}$, then

$$
\lambda^*(A) \leq \lambda^*(B). \tag{3}
$$

Every countable cover of $B$ is also a countable cover of $A$. Taking the infimum over covers of $B$ therefore gives a number that is already at least as large as $\lambda^*(A)$.

### (iii) Countable sub-additivity

For any sequence of sets $E_1, E_2, E_3, \ldots \subseteq \mathbb{R}$,

$$
\lambda^*\!\left(\bigcup_{k=1}^{\infty} E_k\right) \;\leq\; \sum_{k=1}^{\infty} \lambda^*(E_k). \tag{4}
$$

*Proof sketch.* If any $\lambda^*(E_k) = +\infty$ the inequality is trivial. Otherwise, fix $\varepsilon > 0$. For each $k$, choose a countable cover of $E_k$ by open intervals with total length at most $\lambda^*(E_k) + \varepsilon/2^k$. The combined collection of all these intervals is a countable cover of $\bigcup_k E_k$, with total length at most

$$
\sum_{k=1}^{\infty}\!\left(\lambda^*(E_k) + \frac{\varepsilon}{2^k}\right)
= \sum_{k=1}^{\infty} \lambda^*(E_k) + \varepsilon.
$$

Since $\varepsilon$ is arbitrary, $(4)$ follows.

These three properties — normalization $(2)$, monotonicity $(3)$, and countable sub-additivity $(4)$ — are the defining axioms of an **outer measure** in the abstract sense. Any function $\mu^* \colon 2^X \to [0, +\infty]$ satisfying them on a set $X$ is called an outer measure on $X$.

## Outer measure agrees with length on intervals

A basic sanity check: for a bounded closed interval $[a, b]$,

$$
\lambda^*([a, b]) = b - a. \tag{5}
$$

**Upper bound.** Cover $[a, b]$ with the single interval $(a - \varepsilon, b + \varepsilon)$ to get $\lambda^*([a,b]) \leq b - a + 2\varepsilon$; take $\varepsilon \to 0$.

**Lower bound.** Any open cover of $[a, b]$ has a *finite* sub-cover (Heine–Borel). Summing the lengths of a finite cover of $[a, b]$ yields at least $b - a$ (a standard argument by induction on the number of overlapping intervals). Since every countable cover contains such a finite sub-cover, the infimum is at least $b - a$.

Together, $\lambda^*([a,b]) = b - a$. The same argument gives $\lambda^*((a,b)) = \lambda^*([a,b)) = b - a$ for open and half-open intervals.

## Why countable additivity fails

Outer measure satisfies sub-additivity $(4)$, but it does **not** satisfy countable additivity on all subsets. The Vitali set $V$ from [Introduction to Measure](../introduce_to_measure/) is the witness: the translates $V_q \coloneqq V + q$ (for $q \in \mathbb{Q} \cap [-1, 1]$) are pairwise disjoint, and

$$
[0,1] \;\subseteq\; \bigcup_{q \in \mathbb{Q} \cap [-1,1]} V_q \;\subseteq\; [-1, 2].
$$

Monotonicity gives $1 \leq \lambda^*\!\left(\bigcup_q V_q\right) \leq 3$. Since all $V_q$ are translates of $V$, they all have the same outer measure. If countable additivity held, the sum would be either $0$ (if $\lambda^*(V) = 0$) or $+\infty$ (if $\lambda^*(V) > 0$) — neither of which lies in $[1, 3]$. Contradiction.

The conclusion: outer measure is the best you can do on *all* subsets of $\mathbb{R}$. To obtain true additivity you must restrict to a suitable sub-collection — the measurable sets, identified by [Carathéodory's criterion](../measurable_criterion/).

## Summary

- The **Lebesgue outer measure** $\lambda^*(E)$ is defined in equation $(1)$ as the infimum of total interval lengths over countable open covers of $E$.
- It satisfies: $\lambda^*(\emptyset) = 0$ (equation $(2)$), **monotonicity** (equation $(3)$), and **countable sub-additivity** (equation $(4)$).
- These three properties are the abstract definition of an outer measure; $\lambda^*$ is an outer measure on $\mathbb{R}$.
- On intervals, $\lambda^*$ agrees with ordinary length — equation $(5)$.
- Countable additivity fails on all subsets: the Vitali set shows that no consistent, translation-invariant, countably additive measure can live on $2^{\mathbb{R}}$.
- The fix is [Carathéodory's criterion](../measurable_criterion/): identify which sets split every test set additively, and restrict $\lambda^*$ to those sets.
