---
title: Sample Space and Events
summary: "A sample space Ω is the set of all possible outcomes of a random experiment, and an event is a subset of Ω. This checkpoint fixes the vocabulary — outcome, sample space, event, elementary event, complement, union, intersection — and shows how set-theoretic operations on events mirror logical operations on propositions."
prerequisites:
  - essential/math/probability/intro
aliases: []
tags:
  - Probability
updated: 2026-05-22
---

Before assigning numbers to uncertainty, you need a precise language for describing what can happen. That language is set theory: the set of all possible outcomes, its subsets, and the operations that combine them.

## Sample space

A **random experiment** is any process whose outcome cannot be predicted with certainty in advance. The **sample space** $\Omega$ is the set of all possible outcomes of the experiment.

**Examples.**

| Experiment | Sample space $\Omega$ |
|------------|----------------------|
| Flip a single coin | $\{H, T\}$ |
| Roll a six-sided die | $\{1, 2, 3, 4, 5, 6\}$ |
| Count packets arriving at a router in one second | $\{0, 1, 2, 3, \ldots\} = \mathbb{N}_0$ |
| Measure the lifetime of a light bulb (hours) | $[0, \infty)$ |
| Record the coordinates of a uniformly random point in the unit square | $[0,1]^2$ |

Each element $\omega \in \Omega$ is called an **outcome** or an **elementary event**. The sample space can be finite, countably infinite, or uncountably infinite.

## Events

An **event** is a subset $A \subseteq \Omega$ — a collection of outcomes. You say that event $A$ **occurs** if the actual outcome $\omega$ of the experiment belongs to $A$, i.e.\ $\omega \in A$.

**Example.** For the die roll $\Omega = \{1,2,3,4,5,6\}$:
- "Roll an even number": $A = \{2, 4, 6\}$.
- "Roll at least five": $B = \{5, 6\}$.
- "Roll a one": $C = \{1\}$ (an elementary event as a set).

The empty set $\emptyset$ is the **impossible event** — it can never occur. The whole sample space $\Omega$ is the **certain event** — it always occurs.

## Set operations on events

Set operations translate directly into logical operations on events.

### Complement

The **complement** $A^c = \Omega \setminus A$ is the event "$A$ does not occur". It contains all outcomes not in $A$.

$$
A^c \coloneqq \{\omega \in \Omega : \omega \notin A\}.
$$

### Union

The **union** $A \cup B$ is the event "$A$ or $B$ (or both) occurs". It contains all outcomes in at least one of the two events.

$$
A \cup B \coloneqq \{\omega \in \Omega : \omega \in A \text{ or } \omega \in B\}.
$$

More generally, $\bigcup_{n=1}^\infty A_n$ is the event that at least one of $A_1, A_2, \ldots$ occurs.

### Intersection

The **intersection** $A \cap B$ is the event "$A$ and $B$ both occur". It contains outcomes common to both.

$$
A \cap B \coloneqq \{\omega \in \Omega : \omega \in A \text{ and } \omega \in B\}.
$$

If $A \cap B = \emptyset$, the events are **mutually exclusive** (disjoint): they cannot both occur in the same experiment.

### Difference and symmetric difference

The **difference** $A \setminus B = A \cap B^c$ is the event "$A$ occurs but $B$ does not". The **symmetric difference** $A \triangle B = (A \setminus B) \cup (B \setminus A)$ is the event "exactly one of $A$, $B$ occurs".

## De Morgan's laws

De Morgan's laws translate between complement–union and complement–intersection:

$$
(A \cup B)^c = A^c \cap B^c, \qquad (A \cap B)^c = A^c \cup B^c.
$$

In words: "neither $A$ nor $B$" is the same as "not $A$ and not $B$", and "not both $A$ and $B$" is the same as "not $A$ or not $B$". These identities extend to countable collections:

$$
\Bigl(\bigcup_{n=1}^\infty A_n\Bigr)^c = \bigcap_{n=1}^\infty A_n^c, \qquad \Bigl(\bigcap_{n=1}^\infty A_n\Bigr)^c = \bigcup_{n=1}^\infty A_n^c.
$$

## Sequences of events: limsup and liminf

For an infinite sequence of events $A_1, A_2, \ldots$, two derived events capture long-run behaviour:

$$
\limsup_{n\to\infty} A_n \coloneqq \bigcap_{n=1}^\infty \bigcup_{k=n}^\infty A_k
$$

is the event "$A_n$ occurs **infinitely often**" (abbreviated **i.o.**): for every $n$, some $A_k$ with $k \geq n$ occurs.

$$
\liminf_{n\to\infty} A_n \coloneqq \bigcup_{n=1}^\infty \bigcap_{k=n}^\infty A_k
$$

is the event "$A_n$ occurs **all but finitely often**": from some point on, every $A_k$ occurs. The inclusion $\liminf A_n \subseteq \limsup A_n$ always holds.

These set-theoretic definitions are the foundation of the **Borel–Cantelli lemmas**, which translate convergence of $\sum_n P(A_n)$ into almost-sure results about whether infinitely many $A_n$ occur.

## Why not every subset can be an event

For a finite or countably infinite sample space, you can safely declare every subset of $\Omega$ an event. For uncountable sample spaces such as $\Omega = \mathbb{R}$, assigning consistent probabilities to *all* $2^{|\mathbb{R}|}$ subsets leads to a contradiction (Vitali's theorem shows such subsets exist). The resolution is to restrict attention to a **$\sigma$-algebra** $\mathcal{F} \subseteq 2^\Omega$ — a collection of subsets closed under complement and countable union — and only call elements of $\mathcal{F}$ events. The full treatment of $\sigma$-algebras is in [The Probability Axioms](../pr_axioms/).

## Summary

- The **sample space** $\Omega$ is the set of all possible outcomes; each $\omega \in \Omega$ is an outcome.
- An **event** is a subset $A \subseteq \Omega$; event $A$ occurs if the outcome $\omega \in A$.
- The empty set $\emptyset$ is the impossible event; $\Omega$ is the certain event; two events with $A \cap B = \emptyset$ are **mutually exclusive**.
- **Complement** ($A^c$), **union** ($A \cup B$), and **intersection** ($A \cap B$) correspond to "not", "or", and "and" in logic.
- **De Morgan's laws** convert between unions and intersections under complementation.
- The **limsup** of a sequence of events is the event that infinitely many of them occur; the **liminf** is the event that all but finitely many occur.
- For uncountable $\Omega$, not every subset can be an event — only members of a chosen $\sigma$-algebra $\mathcal{F}$.

