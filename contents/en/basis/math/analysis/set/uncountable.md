---
title: Uncountable Set
summary: "A set is uncountable if it is infinite and admits no bijection with ℕ — no listing can exhaust it. This checkpoint proves ℝ is uncountable via Cantor's decimal diagonal argument, establishes |𝒫(ℕ)| = |ℝ| using the Cantor–Bernstein–Schroeder theorem, and places the continuum in the infinite hierarchy of cardinalities."
prerequisites: 
  - basis/math/analysis/set/cantors_theorem
  - basis/math/analysis/set/countable
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

The [Countable Set](../countable/) checkpoint showed that $\mathbb{Z}$, $\mathbb{Q}$, and even $\mathbb{N} \times \mathbb{N}$ are all countably infinite — you can always find a clever bijection with $\mathbb{N}$. Then [Cantor's theorem](../cantors_theorem/) proved that $\mathcal{P}(\mathbb{N})$ is *strictly* larger. This checkpoint makes that gap concrete: you will see a direct proof that the real numbers cannot be listed at all, and you will pin down exactly how large $|\mathbb{R}|$ is.

## What uncountable means

[Countable sets](../countable/) are either finite or in bijection with $\mathbb{N}$. A set $A$ is **uncountable** if it is infinite and *not* countable — that is, no bijection $\mathbb{N} \to A$ exists.

The consequence is stark: there is no list $a_0, a_1, a_2, \ldots$ that contains every element of $A$. You can try every imaginable enumeration strategy, and some elements will always slip through. [Cantor's theorem](../cantors_theorem/) already showed $|\mathbb{N}| < |\mathcal{P}(\mathbb{N})|$, so $\mathcal{P}(\mathbb{N})$ is a first candidate. The real question is which everyday sets are uncountable.

## The real numbers are uncountable

The most important uncountable set is $\mathbb{R}$. Rather than attack it directly, start with the open interval $(0,1)$, which is easier to work with and already exactly as large as $\mathbb{R}$.

> **Why $(0,1)$ and $\mathbb{R}$ have the same size.** The map $x \mapsto \tan\!\bigl(\pi(x - \tfrac{1}{2})\bigr)$ is a bijection $(0,1) \to \mathbb{R}$, so $|(0,1)| = |\mathbb{R}|$.

**Theorem.** $(0,1)$ is uncountable.

**Proof.** Suppose, for contradiction, that $(0,1)$ is countable. Then you could arrange every element into an infinite list $r_0, r_1, r_2, \ldots$ that misses nothing. Write each $r_i$ as a decimal expansion:

$$
r_i \;=\; 0\,.\,d_{i0}\;d_{i1}\;d_{i2}\;\cdots
$$

where each digit $d_{ij} \in \{0, 1, \ldots, 9\}$. Arrange the digits into an infinite matrix — one row per real, one column per decimal position:

|          | pos. $0$          | pos. $1$          | pos. $2$          | pos. $3$          | $\cdots$ |
|----------|:-----------------:|:-----------------:|:-----------------:|:-----------------:|:--------:|
| $r_0$    | $\mathbf{d_{00}}$ | $d_{01}$          | $d_{02}$          | $d_{03}$          |          |
| $r_1$    | $d_{10}$          | $\mathbf{d_{11}}$ | $d_{12}$          | $d_{13}$          |          |
| $r_2$    | $d_{20}$          | $d_{21}$          | $\mathbf{d_{22}}$ | $d_{23}$          |          |
| $r_3$    | $d_{30}$          | $d_{31}$          | $d_{32}$          | $\mathbf{d_{33}}$ |          |
| $\vdots$ |                   |                   |                   |                   | $\ddots$ |

The bold diagonal entries $d_{00}, d_{11}, d_{22}, \ldots$ each record the digit that $r_n$ places at position $n$. Now construct a new real $s = 0\,.\,s_0\;s_1\;s_2\;\cdots$ by *changing* every diagonal digit:

$$
s_n \;\coloneqq\;
\begin{cases}
1 & \text{if } d_{nn} \neq 1, \\
2 & \text{if } d_{nn} = 1.
\end{cases}
\tag{1}
$$

Every digit $s_n$ lies in $\{1, 2\}$, so $s \in (0, 1)$. But for each $n$, rule $(1)$ guarantees $s_n \neq d_{nn}$, which means $s$ and $r_n$ differ at position $n$, so $s \neq r_n$. Therefore $s$ is a real in $(0,1)$ that appears nowhere in the list $r_0, r_1, r_2, \ldots$ — contradicting the assumption that the list was complete. $\square$

> **Why use 1 and 2?** Choosing $s_n \in \{1, 2\}$ dodges a subtle trap: the decimals $0.0\overline{9}$ and $0.1000\ldots$ name the *same* real. Digits drawn from $\{1,2\}$ never lead to such collisions, so $s$ has a unique decimal expansion and the proof is airtight.

The structure of this argument matches the diagonal set in [Cantor's theorem](../cantors_theorem/) exactly: define an object that *disagrees with the $n$-th candidate at the $n$-th coordinate*, for every $n$. There, set membership was flipped; here, a decimal digit is changed. The same self-defeating logic applies in both cases.

## Cardinality of the continuum

Now that you know $\mathbb{R}$ is uncountable, give its cardinality a name. The **cardinality of the continuum** is:

$$
\mathfrak{c} \;\coloneqq\; |\mathbb{R}|.
$$

[Cantor's theorem](../cantors_theorem/) promised that $|\mathcal{P}(\mathbb{N})| = |\mathbb{R}|$. The proof needs two injections — one in each direction — and a theorem that converts them into a bijection.

### Injecting the power set into the real line

The [Power Set](../power_set/) checkpoint showed that each subset $S \subseteq \mathbb{N}$ has a **characteristic function** $\chi_S \colon \mathbb{N} \to \{0,1\}$ where $\chi_S(n) = 1$ iff $n \in S$. Use this to define:

$$
\varphi(S) \;\coloneqq\; \sum_{n \in S} 3^{-(n+1)}.
$$

The value $\varphi(S)$ is the real whose base-3 (ternary) expansion is $0\,.\,\chi_S(0)\;\chi_S(1)\;\chi_S(2)\;\cdots$, using only the ternary digits 0 and 1. To see that $\varphi$ is injective, suppose $S \neq T$ and let $k$ be the smallest index in their symmetric difference $S \mathbin{\triangle} T$ — say $k \in S$ and $k \notin T$. Then:

$$
\varphi(S) - \varphi(T)
\;\geq\; 3^{-(k+1)} - \sum_{n > k} 3^{-(n+1)}
\;=\; 3^{-(k+1)} - \frac{1}{2 \cdot 3^{k+1}}
\;=\; \frac{1}{2 \cdot 3^{k+1}}
\;>\; 0,
$$

so $\varphi(S) \neq \varphi(T)$. The injection $\varphi \colon \mathcal{P}(\mathbb{N}) \hookrightarrow [0,1]$ gives:

$$
|\mathcal{P}(\mathbb{N})| \;\leq\; |[0,1]| \;=\; \mathfrak{c}.
$$

### Injecting the real line into the power set

Every $x \in (0,1)$ has a binary expansion $x = 0\,.\,b_0\;b_1\;b_2\;\cdots$ with $b_n \in \{0,1\}$. (The finitely many **dyadic rationals** — those of the form $m/2^k$ — have two binary expansions; choose the non-terminating one for each.) Define:

$$
\psi(x) \;\coloneqq\; \{n \in \mathbb{N} \mid b_n = 1\}.
$$

Two distinct reals in $(0,1)$ with distinct chosen expansions differ at some position, so they map to different subsets of $\mathbb{N}$. The injection $\psi \colon (0,1) \hookrightarrow \mathcal{P}(\mathbb{N})$ gives:

$$
\mathfrak{c} \;=\; |(0,1)| \;\leq\; |\mathcal{P}(\mathbb{N})|.
$$

### Applying Cantor–Bernstein–Schroeder

You now have injections in both directions. The following theorem — stated here without proof — converts them into a bijection:

**Theorem (Cantor–Bernstein–Schroeder).** If there exist injections $A \hookrightarrow B$ and $B \hookrightarrow A$, then $|A| = |B|$.

Applying this to $\varphi$ and $\psi$, which together witness $|\mathcal{P}(\mathbb{N})| \leq \mathfrak{c}$ and $\mathfrak{c} \leq |\mathcal{P}(\mathbb{N})|$:

$$
|\mathcal{P}(\mathbb{N})| \;=\; |\mathbb{R}| \;=\; \mathfrak{c}. \tag{2}
$$

This is the equality promised in [Cantor's theorem](../cantors_theorem/): the power set of the natural numbers is exactly as large as the real line.

**The notation $2^{\aleph_0}$.** Write $\aleph_0 \coloneqq |\mathbb{N}|$ for the cardinality of the naturals. The [Power Set](../power_set/) checkpoint established $|\mathcal{P}(A)| = 2^{|A|}$ for finite sets; the same exponential notation extends to infinite cardinals, so $|\mathcal{P}(\mathbb{N})| = 2^{\aleph_0}$. Equation $(2)$ then reads:

$$
\mathfrak{c} \;=\; 2^{\aleph_0},
$$

a satisfying echo of the finite formula.

## Many familiar sets share the same uncountable size

Not just $\mathbb{R}$, but many sets you already know carry cardinality $\mathfrak{c}$:

| Set | Argument |
|-----|----------|
| $(0,1)$ | $x \mapsto \tan(\pi(x - \tfrac{1}{2}))$ bijects $(0,1) \to \mathbb{R}$ |
| $[0,1]$ | Inject into $\mathbb{R}$ and back; Cantor–Bernstein–Schroeder gives equality |
| $\mathbb{R}$ | Definition of $\mathfrak{c}$ |
| $\mathbb{R}^n$ (any $n \geq 1$) | Interleave the decimal digits of all $n$ coordinates to encode a single real |
| $\mathbb{C}$ | $\mathbb{C} \cong \mathbb{R}^2$, so $|\mathbb{C}| = |\mathbb{R}^2| = \mathfrak{c}$ |
| $\mathcal{P}(\mathbb{N})$ | Equation $(2)$ |

The striking lesson: adding dimensions, passing to complex numbers, or taking the power set of $\mathbb{N}$ does not grow the cardinality beyond $\mathfrak{c}$.

## The hierarchy beyond the continuum

[Cantor's theorem](../cantors_theorem/) applies to *any* set, including $\mathbb{R}$. Starting from equation $(2)$ and applying $|\cdot| < |\mathcal{P}(\cdot)|$ at each step gives a strictly ascending chain:

$$
|\mathbb{N}|
\;<\; |\mathbb{R}| \;=\; |\mathcal{P}(\mathbb{N})|
\;<\; |\mathcal{P}(\mathbb{R})|
\;<\; \bigl|\mathcal{P}(\mathcal{P}(\mathbb{R}))\bigr|
\;<\; \cdots
$$

There is no largest cardinality. The power-set operation always produces a strictly larger infinity, so infinity comes in infinitely many distinct sizes.

### The Continuum Hypothesis

A natural question arises: does any set $A$ have cardinality *strictly between* $|\mathbb{N}|$ and $|\mathbb{R}|$? This is the **Continuum Hypothesis** (CH):

> **Continuum Hypothesis.** There is no set $A$ satisfying $|\mathbb{N}| < |A| < |\mathbb{R}|$.

CH turns out to be *independent* of ZFC — the standard axioms of set theory. Gödel (1940) proved that assuming CH produces no contradiction with ZFC; Cohen (1963) proved that assuming its negation also produces no contradiction. You can neither prove nor disprove CH from the ZFC axioms alone. This was one of the first landmark examples of an important mathematical statement that is provably undecidable within the standard foundations.

## Summary

- A set is **uncountable** if it is infinite and has no bijection with $\mathbb{N}$: no listing $a_0, a_1, a_2, \ldots$ can exhaust it.
- **Cantor's diagonal argument**, applied to decimal expansions, proves $(0,1)$ — and hence $\mathbb{R}$ — is uncountable: the diagonal real $s$ defined by rule $(1)$ differs from every $r_n$ at position $n$, defeating any claimed listing.
- The diagonal idea mirrors [Cantor's theorem](../cantors_theorem/): design an object that disagrees with every listed candidate at the matching coordinate — there, a set membership bit; here, a decimal digit.
- The **cardinality of the continuum** is $\mathfrak{c} \coloneqq |\mathbb{R}| = 2^{\aleph_0}$, where $\aleph_0 \coloneqq |\mathbb{N}|$.
- Two injections — $\mathcal{P}(\mathbb{N}) \hookrightarrow [0,1]$ via a ternary encoding and $(0,1) \hookrightarrow \mathcal{P}(\mathbb{N})$ via binary expansion — combine with the **Cantor–Bernstein–Schroeder theorem** to establish $|\mathcal{P}(\mathbb{N})| = \mathfrak{c}$ (equation $(2)$).
- Many sets share cardinality $\mathfrak{c}$: $(0,1)$, $[0,1]$, $\mathbb{R}^n$ for any $n \geq 1$, $\mathbb{C}$, and $\mathcal{P}(\mathbb{N})$.
- Applying Cantor's theorem to $\mathbb{R}$ continues the tower: $|\mathbb{N}| < |\mathbb{R}| < |\mathcal{P}(\mathbb{R})| < |\mathcal{P}(\mathcal{P}(\mathbb{R}))| < \cdots$, so there are infinitely many distinct infinite cardinalities.
- The **Continuum Hypothesis** — whether any set has cardinality strictly between $|\mathbb{N}|$ and $|\mathbb{R}|$ — is independent of ZFC, as Gödel (1940) and Cohen (1963) proved.
