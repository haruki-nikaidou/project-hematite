---
title: Countable Set
summary: "An introduction to countable sets — explaining how bijections define cardinality for infinite sets, formally defining countability, and building intuition through explicit examples including the integers and rationals."
prerequisites: 
  - basis/math/analysis/set/set_intro
  - elementry/math/peano_axioms
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

[set_intro](../set_intro/) showed you that the **cardinality** $|A|$ of a finite set counts its elements. But what does "size" even mean for $\mathbb{N}$, $\mathbb{Z}$, or $\mathbb{Q}$ — sets that go on forever? Remarkably, not all infinite sets are the same size. Countability is the first — and most concrete — tool for measuring and comparing infinite sets.

## Comparing sizes with bijections

To compare two sets you need a way to match their elements up — without counting. That idea is captured by two special kinds of maps. (A full treatment of maps lives in [Maps](../map/); here we introduce just enough to get started.)

A **map** $f \colon A \to B$ assigns each element $a \in A$ exactly one element $f(a) \in B$. A map is **injective** (or *one-to-one*, written $f \colon A \hookrightarrow B$) when distinct inputs always yield distinct outputs:

$$
f(a_1) = f(a_2) \;\Rightarrow\; a_1 = a_2.
$$

Think of an injection as an embedding: every element of $A$ gets its own unique slot in $B$, with no two elements of $A$ sharing a slot.

A map is **bijective** when it is injective *and* every element of $B$ is the image of exactly one element of $A$. A **bijection** is a perfect one-to-one pairing between $A$ and $B$, with nothing left over on either side.

Bijections give us a definition of equal cardinality that works for any two sets, finite or infinite:

$$
|A| = |B| \;\coloneqq\; \exists \text{ a bijection } f \colon A \to B. \tag{1}
$$

For finite sets, $(1)$ agrees with ordinary counting. The surprise is that $(1)$ can produce genuinely counterintuitive results for infinite sets — results you'll unpack in the rest of this article.

## What it means to be countable

Recall from [Peano axioms](/en/cp/elementry/math/peano_axioms/) that the natural numbers $\mathbb{N} = \{0, 1, 2, 3, \ldots\}$ are built from a successor function. We use $\mathbb{N}$ as the yardstick for infinite sets.

A set $A$ is **finite** with cardinality $n$ (for some $n \in \mathbb{N}$) when there is a bijection $A \to \{0, 1, \ldots, n-1\}$. This matches the cardinality from [set_intro](../set_intro/).

A set $A$ is **countably infinite** when there exists a bijection

$$
f \colon \mathbb{N} \to A. \tag{2}
$$

A bijection $(2)$ is exactly a complete, non-repeating listing of every element of $A$:

$$
a_0 \;\coloneqq\; f(0), \quad
a_1 \;\coloneqq\; f(1), \quad
a_2 \;\coloneqq\; f(2), \quad \ldots
$$

Every element appears exactly once. So *countably infinite* literally means: you can arrange all elements into an infinite sequence $a_0, a_1, a_2, \ldots$ indexed by $\mathbb{N}$.

A set is **countable** if it is either finite or countably infinite. A set that is not countable is **uncountable** — you'll meet the first concrete example in [Uncountable Sets](../uncountable/).

There is a convenient equivalent formulation that is often easier to apply:

> **Proposition.** A non-empty set $A$ is countable if and only if there exists an injection $A \hookrightarrow \mathbb{N}$.

*Why this works.* If $A$ is countably infinite, the inverse of the bijection $\mathbb{N} \to A$ is itself a bijection — and in particular an injection — $A \hookrightarrow \mathbb{N}$. If $A$ is finite with cardinality $n$, compose the bijection $A \to \{0, \ldots, n-1\}$ with the inclusion $\{0, \ldots, n-1\} \hookrightarrow \mathbb{N}$. Conversely, given any injection $g \colon A \hookrightarrow \mathbb{N}$, list the elements of $g(A)$ in increasing order; that ordering produces a bijection from $\mathbb{N}$ (or a finite initial segment) to $A$.

## Examples of countable sets

### $\mathbb{N}$ itself

The identity map $\mathrm{id} \colon \mathbb{N} \to \mathbb{N}$, $n \mapsto n$, is trivially a bijection. So $\mathbb{N}$ is countably infinite by definition — the baseline case.

### The integers $\mathbb{Z}$

At first glance $\mathbb{Z} = \{\ldots, -2, -1, 0, 1, 2, \ldots\}$ looks "twice as big" as $\mathbb{N}$ because it stretches in both directions. Define the interleaving map

$$
f \colon \mathbb{N} \to \mathbb{Z}, \qquad
f(n) \;\coloneqq\;
\begin{cases}
\phantom{-}n/2 & \text{if } n \text{ is even,} \\[4pt]
-(n+1)/2 & \text{if } n \text{ is odd.}
\end{cases}
\tag{3}
$$

This weaves through the non-negative and negative integers alternately:

| $n$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $\cdots$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $f(n)$ | $0$ | $-1$ | $1$ | $-2$ | $2$ | $-3$ | $3$ | $-4$ | $\cdots$ |

Every integer appears exactly once, so $f$ is a bijection and $|\mathbb{Z}| = |\mathbb{N}|$. The set of integers, despite spanning the whole number line in both directions, is no larger than the natural numbers.

### The product $\mathbb{N} \times \mathbb{N}$

The set $\mathbb{N} \times \mathbb{N} = \{(m, n) \mid m, n \in \mathbb{N}\}$ forms an infinite two-dimensional grid of pairs. A **diagonal traversal** visits every cell by grouping pairs along anti-diagonals where $m + n = k$:

$$
(0,0) \;\to\; (1,0) \;\to\; (0,1) \;\to\; (2,0) \;\to\; (1,1) \;\to\; (0,2) \;\to\; (3,0) \;\to\; \cdots
$$

The **Cantor pairing function** encodes this traversal in a closed formula:

$$
\pi \colon \mathbb{N} \times \mathbb{N} \to \mathbb{N}, \qquad
\pi(m, n) \;\coloneqq\; \frac{(m+n)(m+n+1)}{2} + m. \tag{4}
$$

The triangular-number term $\frac{(m+n)(m+n+1)}{2}$ counts all pairs on strictly earlier diagonals; adding $m$ gives the offset of $(m, n)$ within its own diagonal. You can verify that $\pi$ is a bijection, so $|\mathbb{N} \times \mathbb{N}| = |\mathbb{N}|$. Infinitely many infinite rows collapse into a single sequence.

### The rationals $\mathbb{Q}$

Arrange every positive fraction $p/q$ (with $p, q \geq 1$) in a grid: $p$ along one axis, $q$ along the other. Apply the same diagonal traversal as above, but skip any entry $(p, q)$ where $\gcd(p, q) > 1$ so that each rational appears in reduced form exactly once. Then prepend $0$ and interleave the negatives using the same trick as for $\mathbb{Z}$. Every rational number eventually appears in this listing, so $\mathbb{Q}$ is countably infinite — despite appearing far denser than $\mathbb{N}$ on the number line.

## Two key closure properties

### Subsets of countable sets are countable

**Theorem.** If $A$ is countable and $B \subseteq A$, then $B$ is countable.

*Intuition.* The inclusion map $\iota \colon B \hookrightarrow A$ is an injection. Composing it with the injection $A \hookrightarrow \mathbb{N}$ (which exists because $A$ is countable) gives an injection $B \hookrightarrow \mathbb{N}$, so $B$ is countable by the proposition above.

This theorem means that whenever you find a countable "container", every sub-collection inside it is automatically countable too.

### Countable unions of countable sets are countable

**Theorem.** If $A_0, A_1, A_2, \ldots$ is a countable family of countable sets, then $\bigcup_{k=0}^{\infty} A_k$ is also countable.

*Intuition.* List the elements of each $A_k$ in a row (padding finite rows if needed). The result is an infinite grid — one row per set — just like $\mathbb{N} \times \mathbb{N}$. Apply the diagonal traversal, skipping any element already seen to avoid repetition. Every element of $\bigcup_k A_k$ gets visited, so the union is countable.

A striking application: the **algebraic numbers** — roots of polynomials with integer coefficients — form a countable set. There are countably many such polynomials (each polynomial is a finite list of integer coefficients, and repeated application of the Cantor pairing function $(4)$ shows that finite lists of integers are countable), and each polynomial has only finitely many roots. So the algebraic numbers are a countable union of finite sets, hence countable.

## Summary

- The **cardinality equality** $|A| = |B|$ is defined by the existence of a bijection $A \to B$; this definition extends naturally from finite to infinite sets — see equation $(1)$.
- A **map** $f \colon A \to B$ is **injective** ($A \hookrightarrow B$) when distinct inputs give distinct outputs, and **bijective** when it is injective and every element of $B$ is hit exactly once. The full theory is in [Maps](../map/).
- A set is **countably infinite** when a bijection $\mathbb{N} \to A$ exists — equivalently, when its elements can be listed as $a_0, a_1, a_2, \ldots$ with no omissions and no repetitions.
- A set is **countable** if it is finite or countably infinite; it is **uncountable** otherwise.
- Equivalent test: a non-empty set $A$ is countable if and only if there exists an injection $A \hookrightarrow \mathbb{N}$.
- Canonical countable sets: $\mathbb{N}$ (trivial), $\mathbb{Z}$ (interleaving bijection $(3)$), $\mathbb{N} \times \mathbb{N}$ (Cantor pairing function $(4)$), and $\mathbb{Q}$ (diagonal traversal with skipping).
- **Subsets** of countable sets are countable; **countable unions** of countable sets are countable — the algebraic numbers are a notable consequence.
- Not every infinite set is countable. Head to [Uncountable Sets](../uncountable/) to see why $\mathbb{R}$ is strictly larger than $\mathbb{N}$.
