---
title: Asymptotic Notations
summary: "Big-O, big-Ω, and big-Θ are the language used to talk about how a function grows as its input gets large. This checkpoint defines each notation precisely, contrasts upper, lower, and tight bounds, and shows how they let you compare algorithms without worrying about hardware or constants."
prerequisites:
  - basis/algorithm/intro
  - basis/math/analysis/limit
aliases: []
tags:
  - Algorithms
  - Asymptotic Analysis
updated: 2026-05-20
---

You want to say that binary search is "faster" than linear search. But faster on what hardware? With what compiler settings? For inputs of what size? To make comparisons that hold regardless of machine, language, and constant factors, you need a precise language for describing *growth rates* — and that language is **asymptotic notation**.

This checkpoint defines the three core notations — $O$, $\Omega$, and $\Theta$ — from first principles, and shows how they let you classify algorithms by the shape of their scaling behavior rather than their absolute performance.

## The core idea: bounding a function

Let $T(n)$ be the number of operations an algorithm performs on an input of size $n$. You rarely know the exact formula for $T(n)$ — it depends on constant factors that vary between machines and implementations. What you *can* determine is the **shape** of $T$: whether it grows like $n$, like $n^2$, like $\log n$, or like $2^n$.

Asymptotic notation captures that shape by asking: what simpler function $g(n)$ can you use to **bound** $T(n)$ from above, from below, or both — at least for all sufficiently large $n$?

The phrase "for sufficiently large $n$" is essential. You are not making a claim about small inputs, where constant factors dominate. You are describing what happens as $n \to \infty$, which is what determines long-run scalability.

## Big-O: upper bounds

**Big-O notation** expresses that a function is bounded above by a multiple of another function, eventually.

**Definition.** $f(n) = O(g(n))$ if and only if there exist constants $c > 0$ and $n_0 \geq 0$ such that

$$
f(n) \leq c \cdot g(n) \quad \text{for all } n \geq n_0.
\tag{1}
$$

In plain language: $f$ grows *no faster than* $g$, up to a constant multiple. The constants $c$ and $n_0$ act as witnesses — you just need them to exist, not to be small.

**Example.** Show that $3n^2 + 5n + 1 = O(n^2)$.

You need $c$ and $n_0$ such that $3n^2 + 5n + 1 \leq c \cdot n^2$ for all $n \geq n_0$. For $n \geq 1$, each of $5n$ and $1$ is at most $n^2$, so:

$$
3n^2 + 5n + 1 \leq 3n^2 + 5n^2 + n^2 = 9n^2.
$$

Taking $c = 9$ and $n_0 = 1$ satisfies the definition. Therefore $3n^2 + 5n + 1 = O(n^2)$.

One subtlety: $3n^2 + 5n + 1 = O(n^3)$ is also true by the definition — $n^3$ is an upper bound too. But $O(n^2)$ is the *tightest* upper bound, and that is always the one worth reporting.

## Big-Ω: lower bounds

**Big-Ω notation** is the mirror of big-O: it expresses that a function is bounded *below* by a multiple of another function.

**Definition.** $f(n) = \Omega(g(n))$ if and only if there exist constants $c > 0$ and $n_0 \geq 0$ such that

$$
f(n) \geq c \cdot g(n) \quad \text{for all } n \geq n_0.
\tag{2}
$$

In plain language: $f$ grows *at least as fast as* $g$, up to a constant multiple.

**Example.** Show that $3n^2 + 5n + 1 = \Omega(n^2)$.

For all $n \geq 0$: $3n^2 + 5n + 1 \geq 3n^2$. Taking $c = 3$ and $n_0 = 0$ satisfies the definition.

Big-Ω is used to express *lower bounds on algorithms*: "any algorithm for this problem must perform at least $\Omega(n \log n)$ comparisons" means no algorithm can sort faster than $n \log n$ in the comparison model.

## Big-Θ: tight bounds

When a function is simultaneously $O(g)$ and $\Omega(g)$, it is bounded above *and* below by multiples of $g$ — it grows at exactly the same rate as $g$, up to constants.

**Definition.** $f(n) = \Theta(g(n))$ if and only if

$$
f(n) = O(g(n)) \quad \text{and} \quad f(n) = \Omega(g(n)).
\tag{3}
$$

Equivalently, there exist constants $c_1, c_2 > 0$ and $n_0 \geq 0$ such that

$$
c_1 \cdot g(n) \leq f(n) \leq c_2 \cdot g(n) \quad \text{for all } n \geq n_0.
$$

**Example.** $3n^2 + 5n + 1 = \Theta(n^2)$, as the two earlier proofs together establish.

When you have a $\Theta$ bound, you have a complete picture: the growth rate is pinned down, not just bounded from one side.

## Using limits to determine the notation

Since you are already comfortable with limits from [Limits](/en/cp/basis/math/analysis/limit/), there is a practical shortcut. For positive functions $f$ and $g$, compute:

$$
L = \lim_{n \to \infty} \frac{f(n)}{g(n)}.
$$

The value of $L$ tells you the relationship directly:

| $L$ | Relationship | Meaning |
|-----|-------------|---------|
| $L = 0$ | $f = o(g)$ | $f$ grows strictly slower than $g$ |
| $0 < L < \infty$ | $f = \Theta(g)$ | $f$ and $g$ grow at the same rate |
| $L = \infty$ | $f = \omega(g)$ | $f$ grows strictly faster than $g$ |

The lowercase notations $o$ (little-o) and $\omega$ (little-omega) are the **strict** versions of $O$ and $\Omega$: $f = o(g)$ means the ratio $f/g \to 0$, while $f = O(g)$ only requires the ratio to be *bounded*. Every $o$ relationship implies the corresponding $O$ relationship, but not vice versa.

**Example.** Is $\log n = O(n)$?

$$
\lim_{n \to \infty} \frac{\log n}{n} = 0,
$$

so $\log n = o(n)$, which implies $\log n = O(n)$. In fact $\log n$ grows strictly slower than $n$.

**Example.** Is $n^2 = O(n \log n)$?

$$
\lim_{n \to \infty} \frac{n^2}{n \log n} = \lim_{n \to \infty} \frac{n}{\log n} = \infty,
$$

so $n^2 = \omega(n \log n)$ — it grows strictly faster. Therefore $n^2 \neq O(n \log n)$.

## Common growth rates

The table below lists the classes you will encounter most often, from slowest to fastest growth:

| Notation | Name | Example |
|----------|------|---------|
| $O(1)$ | Constant | Array access by index |
| $O(\log n)$ | Logarithmic | Binary search |
| $O(n)$ | Linear | Scanning a list once |
| $O(n \log n)$ | Linearithmic | Merge sort |
| $O(n^2)$ | Quadratic | Comparing all pairs |
| $O(n^3)$ | Cubic | Naive matrix multiplication |
| $O(2^n)$ | Exponential | Brute-force subset search |
| $O(n!)$ | Factorial | Brute-force permutation |

These classes form a strict hierarchy under the $o$ relation:

$$
O(1) \subsetneq O(\log n) \subsetneq O(n) \subsetneq O(n \log n) \subsetneq O(n^2) \subsetneq O(2^n) \subsetneq O(n!).
$$

An algorithm with $O(n \log n)$ running time will always outperform an $O(n^2)$ algorithm on large enough inputs, regardless of the constant factors.

## Common misconceptions

**"Big-O gives the exact running time."** It does not. $O(n^2)$ says the running time is bounded by $c \cdot n^2$ for *some* constant $c$ — it says nothing about $c$'s size. An algorithm that does $10^9 \cdot n^2$ operations is $O(n^2)$, as is one that does $n^2$ operations. Big-O describes shape, not magnitude.

**"The algorithm with the smallest big-O is always fastest in practice."** Not for small inputs. An $O(n \log n)$ algorithm may be slower than an $O(n^2)$ one for small $n$ if the former has a much larger constant factor. Asymptotic analysis describes large-$n$ behavior; for small inputs, you need to measure.

**"$f = O(g)$ means $f \approx g$."** No. $O$ expresses an upper bound, not approximate equality. A constant function is $O(n^{100})$, but that tells you almost nothing useful. Always report the *tightest* bound you can establish.

## Summary

- **Big-O** ($f = O(g)$): $f$ is eventually bounded above by $c \cdot g$ for some constant $c$ — "$f$ grows no faster than $g$."
- **Big-Ω** ($f = \Omega(g)$): $f$ is eventually bounded below by $c \cdot g$ — "$f$ grows at least as fast as $g$."
- **Big-Θ** ($f = \Theta(g)$): both bounds hold — "$f$ and $g$ grow at the same rate, up to constants."
- The limit $\lim_{n \to \infty} f(n) / g(n)$ tells you the relationship directly: $0$ means $o$, finite and positive means $\Theta$, $\infty$ means $\omega$.
- The growth hierarchy from slow to fast: $O(1), O(\log n), O(n), O(n \log n), O(n^2), O(2^n), O(n!)$.
- Big-O is an upper bound on growth rate, not an approximation — it does not reveal constant factors or exact formulas.
