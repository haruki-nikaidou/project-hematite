---
title: Limits of Sequences
summary: "Defines the limit of a sequence in a metric space, proves that limits are unique, and explores the equivalent neighborhood characterization."
prerequisites: 
  - elementry/math/metric_space
  - basis/math/analysis/neighbourhood
aliases: []
tags: ["Analysis"]
updated: 2026-05-11
---

A sequence in a metric space is an infinite list of points that may — or may not — home in on some target. **Convergence** makes the intuition of "homing in" precise using the metric.

## Sequences in a metric space

Let $(X, d)$ be a metric space. A **sequence** in $X$ is a function $\mathbb{N} \to X$, written $(x_n)_{n \in \mathbb{N}}$ or simply $(x_n)$. Each $x_n \in X$ is the $n$-th **term** of the sequence.

When $X = \mathbb{R}$ with $d(x, y) = |x - y|$, this is the familiar setting of real sequences. But the same definition runs equally well in $\mathbb{R}^k$, in function spaces, or in any other metric space — the distance $d$ does all the work.

## Definition of convergence

A sequence $(x_n)$ in $(X, d)$ **converges** to a point $L \in X$ if for every $\varepsilon > 0$ there exists $N \in \mathbb{N}$ such that

$$
n \geq N \implies d(x_n,\, L) < \varepsilon. \tag{1}
$$

When this holds, $L$ is the **limit** of the sequence, and you write

$$
\lim_{n \to \infty} x_n = L \qquad \text{or} \qquad x_n \to L \text{ as } n \to \infty.
$$

Unpacking condition $(1)$: you challenge the sequence with any tolerance $\varepsilon > 0$, however small. The sequence must eventually enter the open ball $B(L, \varepsilon)$ and *stay there* — meaning from some index $N$ onward, every single term $x_n$ is within distance $\varepsilon$ of $L$. If the sequence passes this test for every $\varepsilon$, it converges to $L$.

A sequence that converges to some limit is **convergent**; one that does not is **divergent**.

## Neighborhood characterization

Condition $(1)$ can be restated cleanly in terms of [neighborhoods](../neighbourhood/):

> A sequence $(x_n)$ converges to $L$ if and only if every [neighborhood](../neighbourhood/) of $L$ contains all but finitely many terms of the sequence.

*Why these are equivalent.* If $N$ is a neighborhood of $L$, it contains some open ball $B(L, \varepsilon)$. By $(1)$, every term $x_n$ with $n \geq N$ lies in $B(L, \varepsilon) \subseteq \mathcal{N}$, so at most the first $N - 1$ terms can lie outside $\mathcal{N}$ — finitely many. Conversely, given any $\varepsilon > 0$, the ball $B(L, \varepsilon)$ is itself a neighborhood of $L$, so by assumption it contains all but finitely many terms; calling the largest excluded index $N - 1$ recovers condition $(1)$.

The neighborhood form is often more convenient in abstract proofs, because you don't have to produce an explicit $\varepsilon$.

## Uniqueness of limits

**Theorem.** If a sequence $(x_n)$ in a metric space converges, its limit is unique.

*Proof.* Suppose $x_n \to L$ and $x_n \to L'$. Fix any $\varepsilon > 0$. Choose $N_1$ so that $d(x_n, L) < \varepsilon / 2$ for all $n \geq N_1$, and $N_2$ so that $d(x_n, L') < \varepsilon / 2$ for all $n \geq N_2$. For any $n \geq \max(N_1, N_2)$, the triangle inequality gives

$$
d(L, L') \leq d(L, x_n) + d(x_n, L') < \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon.
$$

Since $\varepsilon > 0$ was arbitrary and $d(L, L') \geq 0$, we conclude $d(L, L') = 0$, hence $L = L'$. $\square$

Uniqueness is what justifies writing $\lim_{n \to \infty} x_n = L$ — treating the limit as *the* limit, not merely *a* limit.

## Examples

**Constant sequence.** If $x_n = c$ for all $n$, then $d(x_n, c) = 0 < \varepsilon$ for every $n$ and every $\varepsilon > 0$, so $x_n \to c$.

**Sequence in $\mathbb{R}^2$.** Let $x_n = (1/n,\, 1/n^2) \in \mathbb{R}^2$ with the Euclidean metric. Then

$$
d\!\left(x_n,\, (0,0)\right) = \sqrt{\frac{1}{n^2} + \frac{1}{n^4}} \leq \frac{1}{n} + \frac{1}{n^2}.
$$

The right-hand side tends to $0$, so $x_n \to (0, 0)$.

**Discrete metric.** In a space with the discrete metric, $d(x_n, L) < \varepsilon$ for $\varepsilon \leq 1$ forces $x_n = L$. Therefore a sequence converges to $L$ if and only if it is *eventually constant* at $L$ — that is, $x_n = L$ for all sufficiently large $n$.

This last example shows that "convergence" can look very different depending on the metric, even on the same underlying set.

## Summary

- A sequence $(x_n)$ **converges to $L$** in $(X, d)$ if for every $\varepsilon > 0$, all but finitely many terms lie inside the ball $B(L, \varepsilon)$.
- Equivalently, every [neighborhood](../neighbourhood/) of $L$ contains all but finitely many terms.
- The limit, when it exists, is **unique** — proved via the triangle inequality.
- The definition works in any metric space; nothing about it is special to $\mathbb{R}$.
