---
title: ZFC Set Theory
summary: "A precise tour of the ten axioms of ZFC — the standard foundation of modern mathematics — explaining why naïve set theory fails, how each axiom fixes a specific gap, and how all of mathematics is built from the empty set up."
prerequisites: 
  - basis/math/analysis/set/set_intro
  - basis/math/analysis/set/well_order
  - basis/math/analysis/set/power_set
aliases: []
tags: ["Set Theory"]
updated: 2026-05-11
---

You have been using sets as if they were unproblematic ever since the [introduction to sets](../set_intro/): write some elements inside curly braces, form subsets, take unions. For everyday mathematics, this works fine. But it breaks down the moment you ask a deceptively simple question: *can a set be an element of itself?*

Answering that question with unrestricted set-formation leads directly to a contradiction — not a subtle one, but a one-line logical explosion. **Zermelo–Fraenkel set theory with the Axiom of Choice**, universally abbreviated **ZFC**, is the response mathematics settled on. Today ZFC is the standard foundation on which virtually all of mathematics rests.

## The trouble with naïve set theory

In **naïve set theory**, a set is any collection you can describe by a property. For any predicate $\varphi(x)$, you can freely form

$$
\{x \mid \varphi(x)\}.
$$

This unlimited freedom is called the **unrestricted comprehension** principle. It is inconsistent.

**Russell's paradox** (1901) is the simplest proof of this. Define

$$
R \;\coloneqq\; \{x \mid x \notin x\}.
$$

$R$ is supposed to collect every set that is *not* a member of itself. Now ask: is $R \in R$?

- If $R \in R$, then $R$ satisfies the defining condition $x \notin x$, so $R \notin R$. Contradiction.
- If $R \notin R$, then $R$ does *not* satisfy $x \notin x$, which means $R \in R$. Contradiction.

There is no consistent answer. $R$ cannot exist, which means unrestricted comprehension is broken.

## The axiomatic approach

The fix is to replace unlimited freedom with a small, carefully chosen list of **axioms** — basic statements declared true — and derive everything else from them. Axioms must be:

- *Consistent*: they must not lead to contradictions (ZFC is believed to be consistent, though this cannot be proved inside ZFC itself — Gödel's incompleteness theorems forbid it).
- *Strong enough*: sufficient to reconstruct all of ordinary mathematics.

ZFC consists of **nine axioms** from Zermelo and Fraenkel — two of which are **axiom schemas**, meaning each stands for an infinite family of axioms, one per predicate — plus the **Axiom of Choice**.

## The nine ZF axioms

### Extensionality

**Two sets are equal when they have exactly the same elements.**

$$
\forall A\;\forall B\;\bigl(\forall x\;(x \in A \leftrightarrow x \in B)\bigr) \;\Rightarrow\; A = B
$$

You already know this principle from the [set introduction](../set_intro/): $\{1,2,3\} = \{3,1,2\}$ because both contain exactly $1$, $2$, and $3$, regardless of order. Extensionality makes this the *definition* of equality — a set is fully determined by its members, and by nothing else.

### Empty set

**There exists a set with no elements.**

$$
\exists A\;\forall x\;(x \notin A)
$$

Extensionality guarantees there is exactly one such set, which you denote $\emptyset$. Without this axiom, you could not even prove any set exists at all.

### Pairing

**For any two sets $a$ and $b$, there exists a set whose only elements are $a$ and $b$.**

$$
\forall a\;\forall b\;\exists A\;\forall x\;\bigl(x \in A \;\leftrightarrow\; x = a \;\lor\; x = b\bigr)
$$

This justifies writing **unordered pairs** $\{a, b\}$. As a special case, taking $a = b$ gives singletons $\{a\}$.

Pairing also lets you define **ordered pairs** without any new primitive. The Kuratowski encoding is:

$$
(a, b) \;\coloneqq\; \bigl\{\{a\},\;\{a, b\}\bigr\}.
$$

You can verify that $(a, b) = (c, d)$ if and only if $a = c$ and $b = d$, so the encoding correctly captures the notion of order. From ordered pairs you can build relations, functions, and Cartesian products — all inside ZFC.

### Union

**For any set $\mathcal{F}$ of sets, there exists a set containing exactly the elements of the elements of $\mathcal{F}$.**

$$
\forall \mathcal{F}\;\exists A\;\forall x\;\bigl(x \in A \;\leftrightarrow\; \exists F \in \mathcal{F},\; x \in F\bigr)
$$

The resulting set is the **union** $\bigcup \mathcal{F}$. When $\mathcal{F} = \{A, B\}$, this recovers the familiar $A \cup B$. The general form handles infinite families: $\bigcup \{A_1, A_2, A_3, \ldots\} = A_1 \cup A_2 \cup A_3 \cup \cdots$.

### Power set

**For any set $a$, there exists the set of all subsets of $a$.**

$$
\forall a\;\exists A\;\forall x\;\bigl(x \in A \;\leftrightarrow\; x \subseteq a\bigr)
$$

This is precisely the [power set](../power_set/) $\mathcal{P}(a)$. The power set axiom is what allows you to keep climbing to larger infinite sets: starting from $\mathbb{N}$, you can form $\mathcal{P}(\mathbb{N})$, then $\mathcal{P}(\mathcal{P}(\mathbb{N}))$, and so on — each strictly larger than the last by Cantor's theorem.

### Separation (schema)

**Given any set $a$ and any predicate $\varphi$, the subset of $a$ whose elements satisfy $\varphi$ exists.**

$$
\forall a\;\exists A\;\forall x\;\bigl(x \in A \;\leftrightarrow\; x \in a \;\land\; \varphi(x)\bigr)
$$

This is a *schema*: there is one axiom for every predicate $\varphi$ in the language of set theory, giving infinitely many axioms at once.

Separation is the safe replacement for unrestricted comprehension. You can form $\{x \in a \mid \varphi(x)\}$, but you must start from an *already-existing* set $a$. This blocks Russell's paradox: you can form $\{x \in a \mid x \notin x\}$ for any fixed set $a$, but there is no "set of all sets" to use as the starting point. The contradiction evaporates.

Set-builder notation $\{x \in S \mid P(x)\}$ from the introduction to sets is justified precisely by this axiom.

### Infinity

**There exists a set containing $\emptyset$ and closed under the operation $x \mapsto x \cup \{x\}$.**

$$
\exists A\;\Bigl(\emptyset \in A \;\land\; \forall x \in A,\; x \cup \{x\} \in A\Bigr)
$$

This is the axiom that guarantees infinite sets exist. The set $A$ must contain the following chain of sets:

$$
\emptyset,\quad
\{\emptyset\},\quad
\bigl\{\emptyset, \{\emptyset\}\bigr\},\quad
\bigl\{\emptyset, \{\emptyset\}, \{\emptyset,\{\emptyset\}\}\bigr\},\quad \ldots
$$

These are the **von Neumann natural numbers**: identify

$$
0 \coloneqq \emptyset, \qquad
1 \coloneqq \{0\}, \qquad
2 \coloneqq \{0,1\}, \qquad
3 \coloneqq \{0,1,2\}, \qquad \ldots
$$

so that every natural number *is* the set of all smaller natural numbers. The axiom of infinity is what lets you prove $\mathbb{N}$ exists as a completed set inside ZFC, rather than just as an informal notion.

### Replacement (schema)

**If $\varphi(x, y)$ defines a function on a set $a$ (each $x \in a$ corresponds to a unique $y$), then the image of $a$ under $\varphi$ is a set.**

$$
\forall a\;\Bigl[\bigl(\forall x \in a\;\exists!\, y\;\varphi(x,y)\bigr) \;\Rightarrow\; \exists B\;\forall y\;\bigl(y \in B \;\leftrightarrow\; \exists x \in a,\;\varphi(x,y)\bigr)\Bigr]
$$

Like Separation, Replacement is a schema — one instance per predicate $\varphi$.

Replacement says: the image of any set under a definable function is itself a set. This lets you build sets like $\{\omega, \omega+1, \omega+2, \ldots\}$ (where $\omega$ is the first infinite ordinal) that lie beyond the reach of the earlier axioms. Separation can only cut sets *down*; Replacement can map them to entirely new objects.

### Regularity (Foundation)

**Every non-empty set contains an element disjoint from it.**

$$
\forall A\;\bigl(A \neq \emptyset \;\Rightarrow\; \exists x \in A,\; x \cap A = \emptyset\bigr)
$$

Regularity rules out **circular membership**. If a set $a$ contained itself — $a \in a$ — then the singleton $\{a\}$ would violate regularity: its only element is $a$, but $a \cap \{a\} = \{a\} \neq \emptyset$. More generally, there can be no infinite chain $a_0 \ni a_1 \ni a_2 \ni \cdots$ descending forever.

In practice, you will almost never encounter sets that would violate regularity. Its main purpose is to tame the set-theoretic universe, making it amenable to proofs by **well-founded induction** on the membership relation $\in$.

## The Axiom of Choice

The nine ZF axioms above form the system **ZF**. Adding the **Axiom of Choice** (AC) gives the full system **ZFC**.

**For any family $\mathcal{F}$ of non-empty sets, there exists a function that picks one element from each member of $\mathcal{F}$.**

$$
\forall \mathcal{F}\;\Bigl[
  \bigl(\forall F \in \mathcal{F},\; F \neq \emptyset\bigr)
  \;\Rightarrow\;
  \exists f\colon\mathcal{F} \to \bigcup\mathcal{F},\;\;
  \forall F \in \mathcal{F},\; f(F) \in F
\Bigr]
$$

The function $f$ is called a **choice function** for $\mathcal{F}$.

For *finite* families, choosing one element from each set is trivial — you just do it one by one in finitely many steps. The axiom is needed for *infinite* families, where you cannot carry out infinitely many choices without a systematic rule. AC asserts such a function exists even when no explicit rule is available.

### Why AC stands apart

Kurt Gödel proved in 1938 that AC is *consistent* with ZF: you cannot derive a contradiction from ZF + AC as long as ZF itself is consistent. Paul Cohen proved in 1963 that AC is *independent* of ZF: you cannot prove AC from ZF alone either. Together, these results show that AC is a genuine additional assumption, not a consequence of the other nine axioms.

This independence is why mathematics texts sometimes mark theorems that require AC with a special symbol, and why some mathematicians deliberately work in ZF without AC to see how much breaks.

### Equivalents of AC

Within ZF, many principles turn out to be exactly as strong as AC — each implies and is implied by AC:

| Principle | Informal statement |
|-----------|-------------------|
| [Well-ordering theorem](../well_order/) | Every set can be well-ordered |
| Zorn's lemma | A partial order in which every chain has an upper bound has a maximal element |
| Tychonoff's theorem | Any product of compact topological spaces is compact |
| Every vector space has a basis | Every vector space (including infinite-dimensional ones) admits a Hamel basis |

You already saw the well-ordering theorem in the [well-order checkpoint](../well_order/). Of these equivalents, **Zorn's lemma** is the one you will encounter most often in algebra and analysis, even though its connection to "making choices" is less immediate on the surface.

## What ZFC constructs

Starting from the ten axioms and $\emptyset$, you can build all of standard mathematics in a systematic sequence:

1. **Natural numbers** — $\mathbb{N}$ via the von Neumann encoding from the Axiom of Infinity.
2. **Integers** — $\mathbb{Z}$ as equivalence classes of pairs $(a, b) \in \mathbb{N}^2$ representing $a - b$.
3. **Rationals** — $\mathbb{Q}$ as equivalence classes of pairs $(p, q) \in \mathbb{Z} \times (\mathbb{Z} \setminus \{0\})$ representing $p/q$.
4. **Reals** — $\mathbb{R}$ via Dedekind cuts (subsets of $\mathbb{Q}$) or equivalence classes of Cauchy sequences.
5. **Complex numbers** — $\mathbb{C}$ as pairs of reals with the appropriate operations.
6. **Functions and relations** — as sets of ordered Kuratowski pairs.
7. **Ordinals** — as canonical well-ordered sets representing every possible order type.
8. **Cardinals** — measuring the "size" of infinite sets, forming the hierarchy $\aleph_0 < \aleph_1 < \aleph_2 < \cdots$

Every mathematical object you are likely to encounter in analysis, algebra, topology, or computer science can be reduced — in principle — to a pure set built from $\emptyset$ using the ZFC axioms.

## Summary

- **Naïve set theory** is inconsistent: unrestricted comprehension leads to **Russell's paradox** ($R = \{x \mid x \notin x\}$ yields $R \in R \leftrightarrow R \notin R$).
- **ZFC** replaces unlimited freedom with ten explicit axioms: nine from Zermelo–Fraenkel plus the Axiom of Choice.
- **Extensionality** defines set equality by membership; **Empty Set** guarantees $\emptyset$ exists; **Pairing** builds $\{a, b\}$ and Kuratowski ordered pairs.
- **Union** collects elements of a family of sets; **Power Set** produces $\mathcal{P}(a)$ and enables climbing to larger infinities.
- **Separation** (schema) is the safe replacement for unrestricted comprehension — you can only carve subsets out of an *existing* set, blocking Russell's paradox.
- **Infinity** constructs $\mathbb{N}$ inside set theory via the von Neumann encoding $n = \{0, 1, \ldots, n-1\}$.
- **Replacement** (schema) maps sets to new sets under definable functions, reaching beyond what Separation alone can build.
- **Regularity** forbids circular membership chains and supports well-founded induction on $\in$.
- The **Axiom of Choice** asserts that choice functions exist for arbitrary families of non-empty sets. It is independent of ZF and equivalent to the well-ordering theorem and Zorn's lemma.
- From these ten axioms and $\emptyset$, all of standard mathematics — $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$, functions, ordinals, cardinals — can be constructed.
