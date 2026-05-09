---
title: Metric Space
summary: "A gentle introduction to metric spaces — the mathematical framework for talking about distance in any setting — and the four simple rules that make a distance function well-behaved."
prerequisites: []
aliases: []
tags: ["Topology"]
updated: 2026-05-09
---

Imagine you're navigating a city, ranking songs by how similar they sound, or comparing two strings of text character by character. In every one of these situations you're doing the same thing underneath: **measuring distance**. A **metric space** is the mathematical way of capturing that idea precisely — in any context at all, not just physical space.

## Why "distance" needs rules

You already have a strong intuition for what distance should mean. Without thinking about it, you expect:

- Distance is never a negative number.
- Two things that are the same point have zero distance between them — and that is the *only* way to get zero distance.
- The distance from A to B is the same as from B to A.
- Stopping at a midpoint C can never make your journey shorter than going directly from A to B.

These four expectations are not just common sense about city blocks. They turn out to be the *only* rules you need to make any notion of "closeness" work in a consistent, useful way. The whole theory of metric spaces is built on them.

## The formal definition

A **metric space** is a pair $(X, d)$ where:

- $X$ is any non-empty set — the collection of "points" in your space, and
- $d : X \times X \to \mathbb{R}$ is a function called a **metric** (or **distance function**), mapping every pair of points to a real number.

The metric $d$ must satisfy these four rules for every $x, y, z \in X$:

**Rule 1 — Non-negativity.**

$$
d(x, y) \geq 0 \tag{1}
$$

Distance is never negative. You can't be "minus three metres" away from something.

**Rule 2 — Identity of indiscernibles.**

$$
d(x, y) = 0 \iff x = y \tag{2}
$$

The distance is zero *exactly when* the two points are the same. Any two distinct points must have a strictly positive distance between them.

**Rule 3 — Symmetry.**

$$
d(x, y) = d(y, x) \tag{3}
$$

Distance is a two-way street. The distance from $x$ to $y$ equals the distance from $y$ to $x$. This feels obvious for physical space, but when you invent new metrics for exotic spaces you'll still need to check it explicitly.

**Rule 4 — Triangle inequality.**

$$
d(x, z) \leq d(x, y) + d(y, z) \tag{4}
$$

Any detour through a third point $y$ is at least as long as the direct route from $x$ to $z$. This is the rule that keeps distance from behaving in absurd, inconsistent ways.

Any function satisfying all four rules earns the name **metric**.

## Three concrete examples

### The real line

Let $X = \mathbb{R}$ (all real numbers). Define:

$$
d(x, y) \coloneqq |x - y|
$$

This is the absolute difference between two numbers. You can check all four rules:

1. $|x - y| \geq 0$ — absolute values are never negative. ✓  
2. $|x - y| = 0$ exactly when $x = y$. ✓  
3. $|x - y| = |y - x|$. ✓  
4. $|x - z| \leq |x - y| + |y - z|$ — the standard triangle inequality for absolute values. ✓  

So $(\mathbb{R},\, |\cdot - \cdot|)$ is a metric space. This is probably the most familiar metric of all.

### The Euclidean plane

Let $X = \mathbb{R}^2$ (all pairs of real numbers, representing points on a flat plane). Define:

$$
d\!\left((x_1, x_2),\, (y_1, y_2)\right)
\coloneqq \sqrt{(x_1 - y_1)^2 + (x_2 - y_2)^2}
$$

This is the Pythagorean formula for straight-line distance. You've certainly used it before; it's called the **Euclidean metric**, and $(\mathbb{R}^2, d)$ with this metric is **Euclidean space**.

### The discrete metric

Here is a less obvious example. Take *any* non-empty set $X$ and define:

$$
d(x, y) \coloneqq
\begin{cases}
0 & \text{if } x = y \\
1 & \text{if } x \neq y
\end{cases}
$$

Every pair of distinct points is at distance exactly $1$, regardless of what the points actually are. It sounds silly, but it satisfies all four rules — you can verify each one — so it genuinely qualifies as a metric. The **discrete metric** is useful for modelling spaces where the only meaningful question is "same or different?".

## Why the abstraction pays off

You might wonder: why go to all this trouble? Why not just use the Euclidean metric and move on?

The answer is that the abstraction lets you prove things *once* and have them automatically apply everywhere. Consider the idea of a sequence of points getting closer and closer to some limit. In a metric space you can define this precisely:

> A sequence $x_1, x_2, x_3, \ldots$ **converges** to a point $L$ if, for every $\varepsilon > 0$, there exists $N$ such that $d(x_n, L) < \varepsilon$ for all $n > N$.

In plain language: eventually all the points in the sequence are within any distance $\varepsilon$ you choose. Because the definition only uses $d$, it works equally well for:

- sequences of numbers on the real line,
- sequences of points in the Euclidean plane,
- sequences of strings under an edit-distance metric,
- sequences of functions under a maximum-difference metric,
- and infinitely many other settings.

You prove a convergence theorem once, using only the four rules, and immediately get a result in every metric space that exists or will ever be invented.

## Summary

- A **metric space** $(X, d)$ is a set $X$ together with a distance function $d$ satisfying four rules: non-negativity $(1)$, identity of indiscernibles $(2)$, symmetry $(3)$, and the triangle inequality $(4)$.
- The **real line** with $d(x, y) = |x - y|$, the **Euclidean plane** with the Pythagorean formula, and the **discrete metric** are all valid metric spaces — very different settings, all built on the same four rules.
- Abstract distance lets you define important concepts like **convergence** once and apply them across every metric space at the same time.
- Metric spaces are one of the fundamental building blocks of topology and mathematical analysis.
