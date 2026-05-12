---
title: Cantor's Theorem
summary: "Cantor's theorem proves that for any set A, its power set P(A) is always strictly larger — even when both are infinite. This checkpoint covers the diagonal argument behind the proof and the infinite tower of cardinalities that follows."
prerequisites: 
  - basis/math/analysis/set/power_set
  - basis/math/analysis/set/map
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

Every set you can think of — no matter how large, finite or infinite — has a power set that is strictly larger than itself. This is **Cantor's theorem**, and its proof is one of the most elegant in all of mathematics: a single self-referential construction called the *diagonal set* defeats every candidate surjection at once. The result also opens a door that mathematicians did not know existed: there are infinitely many distinct sizes of infinity.

## What Cantor's theorem says

**Cantor's Theorem.** For any set $A$, there is no surjection from $A$ onto $\mathcal{P}(A)$. Equivalently,

$$
|A| < |\mathcal{P}(A)|. \tag{1}
$$

Recall from [Maps](../map/) that $|A| < |B|$ means there is an injection $A \hookrightarrow B$ but no bijection — and therefore no surjection — $A \twoheadrightarrow B$. Cantor's theorem has two parts that together establish $(1)$:

- **The easy direction**: an explicit injection from $A$ into $\mathcal{P}(A)$ (giving $|A| \leq |\mathcal{P}(A)|$).
- **The hard direction**: a proof that no surjection from $A$ onto $\mathcal{P}(A)$ can exist (ruling out equality).

### The easy direction: injecting A into P(A)

Define the **singleton map**:

$$
\iota \colon A \to \mathcal{P}(A), \quad a \mapsto \{a\}.
$$

This sends each element to the singleton set containing it. If $\iota(a_1) = \iota(a_2)$, then $\{a_1\} = \{a_2\}$, which forces $a_1 = a_2$. So $\iota$ is injective, and therefore $|A| \leq |\mathcal{P}(A)|$.

## The diagonal argument

The proof that no surjection can exist uses a technique called the **diagonal argument**. You build a subset $D \subseteq A$ that *any* candidate surjection must miss — not just some specific bad choice of $f$, but every $f$ imaginable.

**Proof.** Suppose, for contradiction, that $f \colon A \to \mathcal{P}(A)$ is surjective. Define the **diagonal set**:

$$
D \;\coloneqq\; \{x \in A \mid x \notin f(x)\}. \tag{2}
$$

Since $D \subseteq A$, we have $D \in \mathcal{P}(A)$. Because $f$ is assumed to be surjective, some element of $A$ must map to $D$. Call it $d$:

$$
f(d) = D.
$$

Now ask: is $d$ a member of $D$?

- **If $d \in D$:** then by the definition $(2)$ of $D$, we need $d \notin f(d)$. But $f(d) = D$, so $d \notin D$. Contradiction.
- **If $d \notin D$:** then by the definition $(2)$ of $D$, we need $d \in f(d)$. But $f(d) = D$, so $d \in D$. Contradiction.

Both cases lead to a contradiction. The assumption that $f$ is surjective must be false. $\square$

## Why the diagonal set works

The definition $D = \{x \in A \mid x \notin f(x)\}$ is crafted so that $D$ *disagrees* with $f(x)$ on the membership of $x$, for every single $x \in A$:

$$
x \in D \;\iff\; x \notin f(x). \tag{3}
$$

This means $D \neq f(x)$ for any $x$: the two sets differ on whether $x$ belongs. Since $D$ differs from every set in the range of $f$, it cannot be in the range. A surjection must hit everything in $\mathcal{P}(A)$ — but $D$ escapes.

### The matrix picture

If you could list $A$'s elements as $a_0, a_1, a_2, \ldots$, you can picture $f$ as an infinite membership table, where cell $(i, j)$ records whether $a_j \in f(a_i)$:

|          | $a_0$ | $a_1$ | $a_2$ | $\cdots$ |
|----------|:-----:|:-----:|:-----:|:--------:|
| $f(a_0)$ | **?** |       |       |          |
| $f(a_1)$ |       | **?** |       |          |
| $f(a_2)$ |       |       | **?** |          |
| $\vdots$ |       |       |       | $\ddots$ |

The bold diagonal entries answer "$a_i \in f(a_i)$?" for each $i$. The diagonal set $D$ is built by *flipping every diagonal entry*: include $a_i$ in $D$ exactly when the $i$-th diagonal entry says "no." The resulting row differs from row $i$ in column $a_i$, for every $i$ — so $D$ matches no row in the table.

The argument works for any set $A$, countable or not. The matrix is just a visualization device; the formal proof in the previous section requires no listing of elements.

## An infinite tower of cardinalities

For finite sets, equation $(1)$ reduces to $n < 2^n$, which holds for all $n \geq 0$. The theorem becomes far more surprising when applied to infinite sets.

Apply $(1)$ to $\mathbb{N}$, then to $\mathcal{P}(\mathbb{N})$, and keep going:

$$
|\mathbb{N}|
\;<\; |\mathcal{P}(\mathbb{N})|
\;<\; \bigl|\mathcal{P}(\mathcal{P}(\mathbb{N}))\bigr|
\;<\; \cdots
$$

This is a strictly ascending chain of infinite cardinalities that never terminates. There is no "largest" infinity — the power set operation always produces a strictly larger one. Infinity, it turns out, comes in many different sizes.

A notable special case connects back to analysis: $|\mathcal{P}(\mathbb{N})| = |\mathbb{R}|$. This means the real numbers are strictly larger than the natural numbers. You will see a direct proof of this in the [Uncountable Set](../uncountable/) checkpoint.

## Summary

- **Cantor's theorem** $(1)$ states that for any set $A$, there is no surjection from $A$ onto $\mathcal{P}(A)$, so $|A| < |\mathcal{P}(A)|$.
- The **easy direction** is the singleton injection $a \mapsto \{a\}$, which shows $|A| \leq |\mathcal{P}(A)|$.
- The **diagonal argument** defines $D = \{x \in A \mid x \notin f(x)\}$, a subset of $A$ that lies outside the range of every candidate surjection $f \colon A \to \mathcal{P}(A)$.
- $D$ escapes the range of $f$ because it disagrees with $f(x)$ on the membership of $x$, for every $x \in A$.
- Applying the theorem repeatedly gives an infinite strictly ascending tower $|\mathbb{N}| < |\mathcal{P}(\mathbb{N})| < \cdots$: there are infinitely many distinct sizes of infinity.
- In particular, $|\mathcal{P}(\mathbb{N})| = |\mathbb{R}|$, so the real numbers form a strictly larger infinity than the natural numbers.
