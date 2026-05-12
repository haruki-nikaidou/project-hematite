---
title: Neighborhood
summary: "Defines neighborhoods of a point in a metric space and shows how they generalize open balls into a flexible, radius-free language for closeness."
prerequisites: 
  - basis/math/analysis/ball
aliases: []
tags: ["Analysis"]
updated: 2026-05-11
---

An [open ball](../ball/) gives you a specific zone around a point with a chosen radius. In practice, you often don't care about the exact radius — you just need *some* zone to exist. **Neighborhoods** capture that weaker, more flexible idea.

## Definition

Let $(X, d)$ be a metric space and let $x \in X$. A set $N \subseteq X$ is called a **neighborhood** of $x$ if there exists some $r > 0$ such that

$$
B(x, r) \subseteq N.
$$

In words: $N$ is a neighborhood of $x$ whenever you can fit an open ball centered at $x$ entirely inside $N$. The set $N$ may be larger, oddly shaped, or even equal to $X$ — it just must contain *at least one* open ball around $x$.

### Examples in $\mathbb{R}$

- $(-1, 1)$ **is** a neighborhood of $0$, because $B(0, 0.5) = (-0.5, 0.5) \subseteq (-1, 1)$.
- $[-1, 1]$ **is** a neighborhood of $0$ (same reason — the closed interval contains the open ball).
- $[-1, 1]$ **is not** a neighborhood of $1$, because any ball $B(1, r)$ contains points greater than $1$, which lie outside $[-1, 1]$.
- $\{0\}$ **is not** a neighborhood of $0$, because no open ball of positive radius around $0$ fits inside a single point.

## Open balls are neighborhoods of their center

Every open ball $B(x, r)$ is a neighborhood of $x$: taking $s = r$, you have $B(x, r) \subseteq B(x, r)$, so the definition is satisfied immediately. Open balls are, in this sense, the simplest neighborhoods — every neighborhood of $x$ must contain one, and every open ball centered at $x$ is itself one.

## Neighborhoods and open sets

Neighborhoods give a clean, point-centric description of open sets:

> A set $U \subseteq X$ is **open** if and only if it is a neighborhood of each of its points.

This equivalence is sometimes taken as the *definition* of an open set. It shows that neighborhoods are not just shorthand — they capture the essence of openness.

## Why use neighborhoods instead of open balls?

When you write a proof, spelling out an explicit radius is often unnecessary and clutters the argument. Neighborhoods let you say "let $N$ be a neighborhood of $x$" and reason about the *existence* of closeness without fixing a number. This pays off especially in the definition of [limits](../limit/), where the neighborhood characterization is often cleaner than the $\varepsilon$-$\delta$ form.

As a concrete illustration: both of the following say the same thing, but the second is often easier to work with in abstract arguments.

> **$\varepsilon$-form.** For every $\varepsilon > 0$, there exists $N$ such that $n \geq N \implies d(x_n, L) < \varepsilon$.
>
> **Neighborhood form.** Every neighborhood of $L$ contains all but finitely many terms of $(x_n)$.

## Summary

- A **neighborhood** of $x$ is any set $N$ that contains an open ball $B(x, r)$ for some $r > 0$.
- Every open ball centered at $x$ is a neighborhood of $x$.
- A set is open if and only if it is a neighborhood of every point it contains.
- Neighborhoods provide a flexible, radius-free vocabulary for proximity — useful whenever the exact radius doesn't matter.
