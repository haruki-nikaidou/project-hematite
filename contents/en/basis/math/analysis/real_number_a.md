---
title: Real Number (By Rational Number Closure)
summary: "Defines the real numbers by closing up the gaps in the rationals: Cauchy sequences of rationals are grouped into equivalence classes to form R, the unique complete ordered field in which Q is dense."
prerequisites: 
  - basis/math/topology/closure
  - basis/math/analysis/limit
  - elementry/math/rational_numbers
aliases: []
tags: ["Numbers", "Analysis"]
updated: 2026-05-12
---

Every sequence of rational approximations to $\sqrt{2}$ gets arbitrarily close to the "right answer" but never lands on one. The [rational numbers](../../../../elementry/math/rational_numbers/) $\mathbb{Q}$ have a hole exactly there — and holes everywhere else an irrational should be. The real numbers $\mathbb{R}$ are what you get by sealing every hole: forming the **closure** of $\mathbb{Q}$.

## The gap problem in $\mathbb{Q}$

Consider the sequence

$$
1,\; 1.4,\; 1.41,\; 1.414,\; 1.4142,\;\ldots
$$

whose $n$-th term is the decimal expansion of $\sqrt{2}$ truncated after $n$ digits. Every term is rational, and the terms cluster tighter and tighter — yet no rational number is their limit. It can be shown that no fraction $p/q$ satisfies $(p/q)^2 = 2$, so $\sqrt{2} \notin \mathbb{Q}$ and the sequence has no home in $\mathbb{Q}$.

The same phenomenon occurs for $\sqrt{3}$, $\pi$, $e$, and countless other targets: you can zero in on them with rationals but never arrive. To build a number system where every such sequence has a home, you need a precise way to say "converging to something" before you know what that something is.

## Cauchy sequences: converging without a named destination

The [limit definition](../limit/) asks you to name the limit $L$ upfront. When $L$ is the missing number you are trying to construct, that is not possible. Instead, use a condition on the terms alone.

A sequence $(q_n)$ of rationals is a **Cauchy sequence** if for every $\varepsilon > 0$ there exists $N \in \mathbb{N}$ such that

$$
m,\; n \geq N \implies |q_m - q_n| < \varepsilon. \tag{1}
$$

Where convergence asks "do the terms eventually stay close to a fixed point $L$?", Cauchiness asks only "do the terms eventually stay close to *each other*?" — no external target required.

**Fact.** Every convergent sequence is Cauchy. *Proof sketch:* if $q_n \to L$, then for large $m$ and $n$ both $|q_m - L|$ and $|q_n - L|$ are small; the triangle inequality gives $|q_m - q_n| \leq |q_m - L| + |L - q_n|$, which is also small. $\square$

The converse fails in $\mathbb{Q}$: the sequence $1, 1.4, 1.41, \ldots$ is Cauchy yet converges to nothing in $\mathbb{Q}$. The rationals are *not complete*.

## The guiding idea: $\mathbb{R} = \overline{\mathbb{Q}}$

From [Closure](../../topology/closure/) you know that the closure $\overline{A}$ of a set $A$ equals $A$ together with all its accumulation points. In a metric space, $x$ is an accumulation point of $A$ when some sequence in $A$ converges to $x$.

Closing $\mathbb{Q}$ means adjoining every point that some sequence of rationals converges to. The aspiration is

$$
\mathbb{R} \;\coloneqq\; \overline{\mathbb{Q}}. \tag{2}
$$

There is a subtlety: to take a closure you need an ambient space to take it in, but that ambient space is what you are trying to build. The way out is to construct $\mathbb{R}$ concretely from Cauchy sequences and then verify that $(2)$ holds afterwards.

## Constructing $\mathbb{R}$

### Equivalence classes of Cauchy sequences

Let $\mathcal{C}$ be the set of all Cauchy sequences in $\mathbb{Q}$. Declare two sequences $(p_n), (q_n) \in \mathcal{C}$ **equivalent**, written $(p_n) \sim (q_n)$, when

$$
|p_n - q_n| \to 0 \quad \text{as } n \to \infty. \tag{3}
$$

Intuitively: they are aiming at the same target. Condition $(3)$ is an equivalence relation (it is reflexive, symmetric, and transitive — check each), so it partitions $\mathcal{C}$ into disjoint equivalence classes. Define

$$
\mathbb{R} \;\coloneqq\; \mathcal{C}/{\sim}.
$$

Each class $[(q_n)]$ represents the unique "intended limit" that all sequences in it share. The class of $1, 1.4, 1.41, \ldots$ is what we will call $\sqrt{2}$. The class of the constant sequence $(3, 3, 3, \ldots)$ is the rational $3$.

### Embedding $\mathbb{Q}$ into $\mathbb{R}$

Send each rational $q$ to the class of the constant sequence:

$$
\iota \colon \mathbb{Q} \to \mathbb{R}, \quad q \;\mapsto\; [(q,\, q,\, q,\, \ldots)].
$$

Two distinct rationals give inequivalent constant sequences, so $\iota$ is injective: $\mathbb{Q}$ sits inside $\mathbb{R}$ without collision. From now on, identify each $q \in \mathbb{Q}$ with $\iota(q) \in \mathbb{R}$, writing $\mathbb{Q} \subset \mathbb{R}$.

### Arithmetic and order

Operations are defined term-wise on representatives:

$$
[(p_n)] + [(q_n)] \;\coloneqq\; [(p_n + q_n)],
\qquad
[(p_n)] \cdot [(q_n)] \;\coloneqq\; [(p_n \cdot q_n)]. \tag{4}
$$

Both are well-defined: term-wise sums and products of Cauchy sequences are Cauchy, and swapping a representative for an equivalent one does not change the resulting class. Division is defined similarly, excluding the class of sequences whose terms tend to $0$. With these operations, $\mathbb{R}$ is a **field** extending $\mathbb{Q}$.

Declare $[(p_n)] < [(q_n)]$ when $q_n - p_n \geq \delta$ for some fixed $\delta > 0$ and all sufficiently large $n$. This makes $\mathbb{R}$ an **ordered field**, with the order extending that of $\mathbb{Q}$.

### The metric on $\mathbb{R}$

Set $|[(q_n)]| \coloneqq [(|q_n|)]$ and $d(x, y) \coloneqq |x - y|$. This gives $\mathbb{R}$ a metric space structure that extends the one on $\mathbb{Q}$.

## Key properties of $\mathbb{R}$

### $\mathbb{Q}$ is dense: $\overline{\mathbb{Q}} = \mathbb{R}$

**Theorem.** Every real number is the limit of a sequence of rationals.

*Proof.* Let $x = [(q_n)] \in \mathbb{R}$. Embed each rational $q_n$ into $\mathbb{R}$ via $\iota$ and regard it as an element of $\mathbb{R}$. Fix $\varepsilon > 0$. The Cauchy condition $(1)$ gives $N \in \mathbb{N}$ such that $|q_m - q_n| < \varepsilon$ for all $m, n \geq N$. For any fixed $n \geq N$, the real number $|x - q_n| = [(|q_m - q_n|)_m]$ satisfies $|q_m - q_n| < \varepsilon$ for every $m \geq N$, so — by the order on $\mathbb{R}$ — $|x - q_n| \leq \varepsilon$. Since $\varepsilon$ was arbitrary, $q_n \to x$. Since $x$ was arbitrary, every real is a limit of rationals, and $\overline{\mathbb{Q}} = \mathbb{R}$. $\square$

This confirms $(2)$: the construction delivers exactly the closure of $\mathbb{Q}$ we aimed for.

### Completeness

**Theorem.** Every Cauchy sequence in $\mathbb{R}$ converges in $\mathbb{R}$.

*Proof sketch.* Let $(x_k)$ be a Cauchy sequence in $\mathbb{R}$. By density, choose a rational $r_k$ with $|r_k - x_k| < 1/k$ for each $k$. The sequence $(r_k)$ is Cauchy in $\mathbb{Q}$:

$$
|r_j - r_k| \;\leq\; |r_j - x_j| + |x_j - x_k| + |x_k - r_k| \;<\; \frac{1}{j} + |x_j - x_k| + \frac{1}{k},
$$

which is small for large $j$ and $k$ since $(x_k)$ is Cauchy. Define $x \coloneqq [(r_k)] \in \mathbb{R}$. Then $|x_k - x| \leq |x_k - r_k| + |r_k - x| < 1/k + |r_k - x|$, and $r_k \to x$ by density applied to the sequence $(r_k)$, so $x_k \to x$. $\square$

Completeness is the payoff of the whole construction: every Cauchy sequence in $\mathbb{R}$ converges in $\mathbb{R}$, with no holes remaining.

### Uniqueness

Up to isomorphism of ordered fields, $\mathbb{R}$ is the **unique** complete ordered field. Any other construction — Dedekind cuts, for instance — produces the same mathematical object, related to this one by an order-preserving field isomorphism. This is why different approaches to defining the reals are interchangeable in practice.

## Summary

- $\mathbb{Q}$ has **holes**: Cauchy sequences of rationals need not converge within $\mathbb{Q}$.
- A **Cauchy sequence** $(q_n)$ satisfies $|q_m - q_n| \to 0$ as $m, n \to \infty$ — internal clustering with no external target.
- The real numbers $\mathbb{R} = \mathcal{C}/{\sim}$ are **equivalence classes** of Cauchy sequences in $\mathbb{Q}$, where two sequences are equivalent when their term-wise difference tends to $0$.
- $\mathbb{Q}$ is **dense** in $\mathbb{R}$: $\overline{\mathbb{Q}} = \mathbb{R}$, so every real number is the limit of a sequence of rationals — exactly the closure $(2)$ we set out to achieve.
- $\mathbb{R}$ is **complete**: every Cauchy sequence of reals converges in $\mathbb{R}$.
- Together, these properties make $\mathbb{R}$ the unique **complete ordered field** up to isomorphism.
