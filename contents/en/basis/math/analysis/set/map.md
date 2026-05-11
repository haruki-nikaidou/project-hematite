---
title: Map
summary: "An introduction to maps between sets, covering domain, codomain, image, preimage, injectivity, surjectivity, bijectivity, composition, and inverse maps."
prerequisites: 
  - basis/math/analysis/set/set_intro
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

A map is the precise mathematical name for a rule that sends each element of one set to exactly one element of another. Every function you write in a programming language is a map in this sense. Getting comfortable with the formal definition — and the vocabulary around it — unlocks a large part of modern mathematics.

## Definition

Let $A$ and $B$ be sets. A **map** $f$ from $A$ to $B$, written

$$
f \colon A \to B,
$$

is a rule that assigns to every element $a \in A$ exactly one element $f(a) \in B$.

- $A$ is the **domain** of $f$.
- $B$ is the **codomain** of $f$.
- $f(a)$ is the **image** of $a$ under $f$ (also called the *value* of $f$ at $a$).

The notation $a \mapsto f(a)$ (read: "$a$ maps to $f(a)$") specifies what $f$ does to a single element. A complete map specification combines both:

$$
f \colon A \to B, \quad a \mapsto f(a).
$$

**Example.** The squaring map on the integers:

$$
f \colon \mathbb{Z} \to \mathbb{Z}, \quad n \mapsto n^2.
$$

Here $f(3) = 9$, $f(-2) = 4$, $f(0) = 0$.

> **Terminology note.** The words *map*, *function*, and *mapping* are used interchangeably in most of mathematics. In analysis, "function" often implicitly carries a notion of continuity, while "map" is the neutral general term.

## Image and preimage of sets

You can extend a map from individual elements to whole subsets.

The **image** of a subset $S \subseteq A$ under $f$ is the set of all values $f$ produces on $S$:

$$
f(S) \;\coloneqq\; \{f(a) \mid a \in S\} \;\subseteq\; B.
$$

The image of the entire domain, $f(A)$, is called the **range** of $f$. The range is always a subset of the codomain — but it need not equal the codomain.

The **preimage** (or **inverse image**) of a subset $T \subseteq B$ is the set of all elements in $A$ that map into $T$:

$$
f^{-1}(T) \;\coloneqq\; \{a \in A \mid f(a) \in T\} \;\subseteq\; A.
$$

Note that $f^{-1}(T)$ is well-defined for any map $f$ — it does not require $f$ to have an inverse.

## Injective, surjective, bijective

These three adjectives classify how a map relates its domain to its codomain.

### Injective (one-to-one)

A map $f \colon A \to B$ is **injective** when distinct inputs always produce distinct outputs:

$$
f(a_1) = f(a_2) \;\Rightarrow\; a_1 = a_2. \tag{1}
$$

Equivalently (the contrapositive): $a_1 \neq a_2 \Rightarrow f(a_1) \neq f(a_2)$.

An injective map embeds $A$ inside $B$ without collisions.

**Example.** $f \colon \mathbb{Z} \to \mathbb{Z},\; n \mapsto 2n$ is injective: if $2n_1 = 2n_2$ then $n_1 = n_2$.

**Non-example.** $g \colon \mathbb{Z} \to \mathbb{Z},\; n \mapsto n^2$ is *not* injective: $g(2) = g(-2) = 4$ but $2 \neq -2$.

### Surjective (onto)

A map $f \colon A \to B$ is **surjective** when every element of $B$ is hit by at least one element of $A$:

$$
\forall b \in B,\;\exists a \in A \text{ such that } f(a) = b. \tag{2}
$$

Equivalently, the range equals the entire codomain: $f(A) = B$.

**Example.** $f \colon \mathbb{Z} \to \mathbb{Z},\; n \mapsto n + 1$ is surjective: for any $b \in \mathbb{Z}$, take $a = b - 1$.

**Non-example.** $g \colon \mathbb{Z} \to \mathbb{Z},\; n \mapsto 2n$ is *not* surjective: $1$ is never in the range, since $2n = 1$ has no integer solution.

### Bijective

A map that is both injective and surjective is **bijective**. A bijection pairs every element of $A$ with exactly one element of $B$, with no element of $B$ left out and none doubled up.

Bijections are the correct notion of "same size" between sets. Two sets $A$ and $B$ have the same cardinality if and only if there exists a bijection $f \colon A \to B$. This definition works even for infinite sets.

## The identity map

For any set $A$, the **identity map** $\mathrm{id}_A \colon A \to A$ is defined by

$$
\mathrm{id}_A(a) \;\coloneqq\; a \quad \text{for all } a \in A.
$$

It is trivially bijective and serves as the neutral element for composition.

## Composition

Given maps $f \colon A \to B$ and $g \colon B \to C$, their **composition** $g \circ f \colon A \to C$ is defined by

$$
(g \circ f)(a) \;\coloneqq\; g(f(a)).
$$

The notation reads right-to-left: apply $f$ first, then $g$. The types must align — the codomain of $f$ must equal the domain of $g$.

Composition satisfies:
- **Associativity:** $(h \circ g) \circ f = h \circ (g \circ f)$ whenever the types match.
- **Identity laws:** $f \circ \mathrm{id}_A = f$ and $\mathrm{id}_B \circ f = f$.

Compositions of injections are injective; compositions of surjections are surjective; compositions of bijections are bijective.

## Inverse map

If $f \colon A \to B$ is bijective, its **inverse** $f^{-1} \colon B \to A$ is the unique map satisfying

$$
f^{-1} \circ f = \mathrm{id}_A \qquad \text{and} \qquad f \circ f^{-1} = \mathrm{id}_B.
$$

Concretely, $f^{-1}(b)$ is the unique element $a \in A$ with $f(a) = b$.

A map has an inverse if and only if it is bijective. This is why bijections are also called **invertible maps**.

## Summary

- A **map** $f \colon A \to B$ assigns each element of the **domain** $A$ exactly one element in the **codomain** $B$.
- $f(a) \in B$ is the **image** of $a$; the set $f(A)$ is the **range** of $f$ (a subset of the codomain).
- $f^{-1}(T)$ is the **preimage** of $T \subseteq B$ and is defined for any map.
- **Injective** $(1)$: distinct inputs give distinct outputs — no collisions.
- **Surjective** $(2)$: every element of the codomain is hit — the range fills $B$.
- **Bijective**: both; the map is invertible and witnesses that $|A| = |B|$.
- **Composition** $g \circ f$ applies $f$ then $g$; it is associative and respects injectivity/surjectivity/bijectivity.
- A bijection has a unique **inverse** $f^{-1} \colon B \to A$.
