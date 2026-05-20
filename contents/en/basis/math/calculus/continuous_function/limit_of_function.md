---
title: Limit of a Function
summary: "The limit of a function describes the value f(x) approaches as x approaches a point. This checkpoint gives both the ε–δ and sequential characterisations, proves they are equivalent, and uses them to compute limits of typical real functions."
prerequisites:
  - basis/math/analysis/limit
  - basis/math/analysis/functions/elementary_function
aliases: []
tags:
  - Calculus
  - Limit
updated: 2026-05-20
---

You already know how [sequences converge](../../../analysis/limit/) in a metric space — a sequence $(x_n)$ converges to $L$ if its terms eventually land arbitrarily close to $L$. Functions are different: $f(x)$ is defined for *all* real $x$ near a point, not just a discrete list of them. The **limit of a function** captures what value $f(x)$ approaches as $x$ moves continuously toward a target, without requiring $f$ to be defined at that target or to agree with the limiting value there.

## The ε–δ definition

Let $f$ be a real-valued function defined on some set $D \subseteq \mathbb{R}$, and let $a$ be a **limit point** of $D$ — meaning every neighborhood of $a$ contains a point of $D$ other than $a$ itself. A real number $L$ is the **limit of $f$ at $a$** if for every $\varepsilon > 0$ there exists $\delta > 0$ such that

$$
0 < |x - a| < \delta \text{ and } x \in D \implies |f(x) - L| < \varepsilon.
$$

When this holds, you write

$$
\lim_{x \to a} f(x) = L \qquad \text{or} \qquad f(x) \to L \text{ as } x \to a.
$$

The condition $0 < |x - a| < \delta$ says that $x$ is within distance $\delta$ of $a$, but **not equal to $a$**. The behavior of $f$ at $a$ itself is irrelevant to the limit — $f$ might not even be defined there.

### What ε–δ is actually saying

Given a tolerance $\varepsilon > 0$, you must produce a radius $\delta > 0$ such that whenever $x$ is within distance $\delta$ of $a$ (and $x \neq a$), the output $f(x)$ is within distance $\varepsilon$ of $L$. The smaller you make the tolerance, the tighter the radius may need to be. The limit exists if this challenge can always be met.

## The sequential characterization

There is an equivalent formulation in terms of sequences, which is often easier to use in proofs.

**Theorem.** $\lim_{x \to a} f(x) = L$ if and only if for every sequence $(x_n)$ in $D \setminus \{a\}$ with $x_n \to a$, one has $f(x_n) \to L$.

*Proof.*

($\Rightarrow$) Suppose the ε–δ condition holds. Let $(x_n)$ be any sequence in $D \setminus \{a\}$ with $x_n \to a$. Given $\varepsilon > 0$, choose $\delta$ from the ε–δ definition. Since $x_n \to a$, there exists $N$ such that $|x_n - a| < \delta$ for all $n \geq N$. Since also $x_n \neq a$, the ε–δ condition gives $|f(x_n) - L| < \varepsilon$ for all $n \geq N$. So $f(x_n) \to L$.

($\Leftarrow$) Suppose the ε–δ condition fails. Then there exists $\varepsilon > 0$ such that for every $\delta > 0$ there is some $x \in D \setminus \{a\}$ with $|x - a| < \delta$ but $|f(x) - L| \geq \varepsilon$. Choosing $\delta = 1/n$ at each step produces a sequence $(x_n)$ in $D \setminus \{a\}$ with $x_n \to a$ but $|f(x_n) - L| \geq \varepsilon$ for all $n$, so $f(x_n) \not\to L$. $\square$

The sequential form is particularly useful for proving a limit *does not* exist: find two sequences approaching $a$ along which $f$ tends to different values.

## Uniqueness

If the limit of $f$ at $a$ exists, it is **unique**. The proof is immediate from the sequential characterization: if $f(x) \to L$ and $f(x) \to L'$, then for any sequence $x_n \to a$ with $x_n \neq a$, both $f(x_n) \to L$ and $f(x_n) \to L'$, so $L = L'$ by uniqueness of sequence limits.

## One-sided limits

Sometimes $f$ approaches different values depending on the direction of approach. The **left-hand limit** is

$$
\lim_{x \to a^-} f(x) \coloneqq L
$$

if for every $\varepsilon > 0$ there exists $\delta > 0$ such that $-\delta < x - a < 0$ implies $|f(x) - L| < \varepsilon$. The **right-hand limit** $\lim_{x \to a^+} f(x)$ is defined symmetrically.

The two-sided limit exists and equals $L$ if and only if both one-sided limits exist and equal $L$.

## Computing limits

### Polynomials and rational functions

For any polynomial $p$ and any $a \in \mathbb{R}$:

$$
\lim_{x \to a} p(x) = p(a).
$$

This follows from $\lim_{x \to a} x = a$ and the arithmetic rules for limits proved in [Local Properties of Limits](../local_properties/). For a rational function $r = p/q$ with $q(a) \neq 0$, the quotient rule gives $\lim_{x \to a} r(x) = r(a)$.

When $q(a) = 0$ but $p(a) = 0$ as well, you may be able to cancel a common factor before taking the limit.

### A fundamental trigonometric limit

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1.
$$

The standard geometric proof shows $\cos x < \dfrac{\sin x}{x} < 1$ for $0 < |x| < \pi/2$. Since $\cos x \to 1$ as $x \to 0$, the [squeeze theorem](../local_properties/) forces the middle expression to $1$ as well.

## Summary

- The **ε–δ definition**: $\lim_{x \to a} f(x) = L$ means for every $\varepsilon > 0$ there exists $\delta > 0$ such that $0 < |x - a| < \delta$ implies $|f(x) - L| < \varepsilon$. The value (or existence) of $f$ at $a$ itself is irrelevant.
- **Sequential characterization**: $\lim_{x \to a} f(x) = L$ if and only if $f(x_n) \to L$ for every sequence $x_n \to a$ with $x_n \neq a$. Both characterizations are equivalent.
- The **two-sided limit** exists iff both one-sided limits exist and agree.
- Limits of polynomials and rational functions (with nonzero denominator) equal the function value at the point; the squeeze theorem handles many other cases.
