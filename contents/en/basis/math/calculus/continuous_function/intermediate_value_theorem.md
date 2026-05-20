---
title: Intermediate Value Theorem
summary: "If f is continuous on [a, b] and y lies between f(a) and f(b), then there exists c ∈ [a, b] with f(c) = y. This checkpoint proves the theorem using the completeness of ℝ, and applies it to root-finding and existence proofs."
prerequisites:
  - basis/math/calculus/continuous_function/continuous
aliases: []
tags:
  - Calculus
  - Continuity
updated: 2026-05-20
---

If a temperature sensor reads 10°C at dawn and 24°C at noon, it must have read exactly 17°C at some moment in between — assuming the temperature changed continuously. The Intermediate Value Theorem formalises this everyday observation and turns it into a tool for proving existence of roots and fixed points without ever computing them explicitly.

## Statement

**Theorem (Intermediate Value Theorem, IVT).** Let $f : [a, b] \to \mathbb{R}$ be [continuous](../continuous/). If $y$ is any value strictly between $f(a)$ and $f(b)$, then there exists $c \in (a, b)$ such that $f(c) = y$.

An equivalent formulation useful in practice: if $f(a)$ and $f(b)$ have **opposite signs** (i.e.\ $f(a) \cdot f(b) < 0$), then $f$ has a root in $(a, b)$.

## Proof via bisection

Without loss of generality, assume $f(a) < y < f(b)$.

Define a sequence of nested intervals $[a_n, b_n]$ by **bisection**, starting with $[a_0, b_0] = [a, b]$:

- Let $m_n \coloneqq \dfrac{a_n + b_n}{2}$ be the midpoint.
- If $f(m_n) < y$, set $[a_{n+1}, b_{n+1}] \coloneqq [m_n, b_n]$.
- If $f(m_n) \geq y$, set $[a_{n+1}, b_{n+1}] \coloneqq [a_n, m_n]$.

By construction, $f(a_n) < y \leq f(b_n)$ at every step, and the interval length satisfies

$$
b_n - a_n = \frac{b - a}{2^n} \;\to\; 0.
$$

The **completeness of $\mathbb{R}$** (nested interval property) guarantees a unique point $c \in \bigcap_{n=0}^{\infty} [a_n, b_n]$.

Since $a_n \leq c \leq b_n$ and $b_n - a_n \to 0$, both $a_n \to c$ and $b_n \to c$. Continuity of $f$ then gives $f(a_n) \to f(c)$ and $f(b_n) \to f(c)$. Because $f(a_n) < y$ for all $n$, taking the limit gives $f(c) \leq y$. Because $f(b_n) \geq y$ for all $n$, taking the limit gives $f(c) \geq y$. Therefore $f(c) = y$. $\square$

## Applications

### Root-finding for polynomials

Every odd-degree real polynomial has at least one real root. A degree-$(2k+1)$ polynomial $p$ satisfies $p(x) \to +\infty$ as $x \to +\infty$ and $p(x) \to -\infty$ as $x \to -\infty$, so for large enough $R > 0$, $p(-R) < 0 < p(R)$. The IVT gives a root in $(-R, R)$.

**Example.** The polynomial $p(x) = x^3 - 2$ is continuous, satisfies $p(0) = -2 < 0$ and $p(2) = 6 > 0$. By the IVT there exists $c \in (0, 2)$ with $c^3 = 2$ — this is the existence proof for $\sqrt[3]{2}$.

### Fixed-point existence

**Corollary (Brouwer in one dimension).** Every continuous $f : [0, 1] \to [0, 1]$ has a **fixed point**: some $c \in [0, 1]$ with $f(c) = c$.

*Proof.* Define $g(x) \coloneqq f(x) - x$. Since $f$ maps $[0,1]$ into $[0,1]$, we have $g(0) = f(0) \geq 0$ and $g(1) = f(1) - 1 \leq 0$. If either is zero, then $0$ or $1$ is a fixed point. Otherwise $g(0) > 0 > g(1)$, and the IVT gives $c \in (0, 1)$ with $g(c) = 0$, i.e.\ $f(c) = c$. $\square$

### The bisection algorithm

The proof is constructive: each step halves the interval containing a crossing point. After $n$ steps the root is located to within $(b - a)/2^n$. This is the **bisection method** — one of the most reliable root-finding algorithms in numerical computing, with guaranteed linear convergence.

```python
def bisect(f, a, b, tol=1e-9):
    assert f(a) * f(b) < 0, "f must have opposite signs at a and b"
    while (b - a) / 2 > tol:
        m = (a + b) / 2
        if f(m) == 0:
            return m
        elif f(a) * f(m) < 0:
            b = m
        else:
            a = m
    return (a + b) / 2
```

## Summary

- **Intermediate Value Theorem**: a [continuous](../continuous/) $f$ on $[a, b]$ takes every value between $f(a)$ and $f(b)$.
- **Proof**: bisect the interval at each step, maintaining opposite signs at the endpoints; completeness of $\mathbb{R}$ pins down a crossing point, and continuity forces it to equal $y$.
- **Root-finding**: every odd-degree polynomial has a real root; specific roots like $\sqrt[3]{2}$ exist by applying the IVT to $x^3 - 2$.
- **Fixed points**: every continuous self-map of $[0, 1]$ has a fixed point — proved by applying the IVT to $f(x) - x$.
- **Bisection method**: the proof is algorithmic — repeated halving locates any root to precision $\varepsilon$ in $O(\log(1/\varepsilon))$ steps.
