---
title: Classes of Riemann-Integrable Functions
summary: "Beyond continuous functions, two large classes of bounded functions on a closed interval are Riemann integrable: monotonic functions, and functions with only finitely many discontinuities (more generally, with discontinuities forming a set of measure zero — Lebesgue's criterion). This checkpoint proves integrability of monotonic and piecewise-continuous functions, states Lebesgue's characterisation in terms of the set of discontinuities, and exhibits a bounded function (the Dirichlet function) that fails to be Riemann integrable."
prerequisites:
  - basis/math/calculus/riemann_integral/def
aliases: []
tags:
  - Calculus
  - Integration
updated: 2026-05-22
---

The [definition of the Riemann integral](../def/) requires $U(f,P) - L(f,P) < \varepsilon$ for some partition $P$. Continuous functions pass this test by uniform continuity. But continuity is far from necessary — many functions with jumps or infinitely many oscillations are still integrable. This checkpoint identifies the two most important classes beyond continuous functions, and pinpoints one simple function that is *not* integrable.

## Recap: the Darboux criterion

$f: [a,b] \to \mathbb{R}$ bounded is Riemann integrable iff for every $\varepsilon > 0$ there exists a partition $P$ with

$$
U(f, P) - L(f, P) < \varepsilon.
$$

The key quantity is the **oscillation** on each subinterval: $\omega_i \coloneqq M_i - m_i \ge 0$, so $U - L = \sum \omega_i \Delta x_i$. To make $U - L$ small you need to make either the oscillations or the subinterval widths small.

## Monotonic functions are integrable

**Theorem.** If $f: [a,b] \to \mathbb{R}$ is monotone (increasing or decreasing), then $f$ is Riemann integrable.

**Proof (for $f$ increasing).** On any subinterval $[x_{i-1}, x_i]$, the supremum and infimum are just the endpoint values:

$$
M_i = f(x_i), \qquad m_i = f(x_{i-1}), \qquad \omega_i = f(x_i) - f(x_{i-1}).
$$

For the uniform partition $P_n$ with $\Delta x_i = (b-a)/n$:

$$
U(f, P_n) - L(f, P_n) = \frac{b-a}{n} \sum_{i=1}^n \bigl(f(x_i) - f(x_{i-1})\bigr) = \frac{(b-a)(f(b) - f(a))}{n}.
$$

This telescopes to a single factor, and choosing $n > (b-a)(f(b)-f(a))/\varepsilon$ makes it less than $\varepsilon$. $\square$

The bound does not depend on *how* $f$ is monotone — it could have infinitely many jump discontinuities — only on its total variation $f(b) - f(a)$.

## Piecewise-continuous functions are integrable

A function $f$ is **piecewise continuous** on $[a,b]$ if there are finitely many points $a = c_0 < c_1 < \cdots < c_k = b$ such that $f$ is continuous on each open interval $(c_{j-1}, c_j)$ and has finite one-sided limits at each $c_j$.

**Theorem.** Every piecewise-continuous bounded function on $[a,b]$ is Riemann integrable.

**Proof sketch.** Include each discontinuity point $c_j$ in the partition. On subintervals not containing a $c_j$, $f$ is continuous, so the oscillation can be made arbitrarily small by refining. Near each $c_j$, enclose it in a tiny interval of width $\delta$; the contribution to $U - L$ from those intervals is at most $2\|f\|_\infty \cdot k\delta$, which goes to zero as $\delta \to 0$. Combining gives the Darboux criterion. $\square$

## The Dirichlet function is not integrable

Define the **Dirichlet function**:

$$
D(x) \coloneqq \begin{cases} 1 & x \in \mathbb{Q}, \\ 0 & x \notin \mathbb{Q}. \end{cases}
$$

$D$ is bounded on $[0,1]$, but it is not Riemann integrable. On *every* subinterval $[x_{i-1}, x_i]$, both rationals and irrationals are dense, so $M_i = 1$ and $m_i = 0$ for every $i$ and every partition $P$. Therefore

$$
U(D, P) = \sum_i 1 \cdot \Delta x_i = 1, \qquad L(D, P) = \sum_i 0 \cdot \Delta x_i = 0,
$$

for *every* partition. The upper and lower integrals are $1$ and $0$ respectively — they never agree. So $D$ is not Riemann integrable.

## Lebesgue's criterion

The precise characterisation of Riemann-integrable functions uses the concept of a **set of measure zero**: a set $E \subseteq [a,b]$ has **measure zero** if for every $\varepsilon > 0$ it can be covered by countably many intervals whose total length is less than $\varepsilon$.

**Lebesgue's theorem.** A bounded function $f: [a,b] \to \mathbb{R}$ is Riemann integrable if and only if the set of its discontinuities has measure zero.

The proof is beyond the current prerequisites, but the statement unifies the examples above:
- Continuous functions: no discontinuities, measure zero trivially.
- Monotonic functions: at most countably many jump discontinuities, hence measure zero.
- Piecewise-continuous functions: finitely many discontinuities, measure zero.
- Dirichlet function: discontinuous everywhere, so the discontinuity set $[0,1]$ has measure $1 \neq 0$.

## Summary

- **Darboux criterion**: $f$ is integrable iff oscillations $\omega_i = M_i - m_i$ can be made uniformly small.
- **Monotonic functions** are integrable: the telescoping bound $(b-a)(f(b)-f(a))/n \to 0$ regardless of how many jumps $f$ has.
- **Piecewise-continuous functions** are integrable: isolate discontinuities in tiny intervals; continuity handles the rest.
- The **Dirichlet function** $D = \mathbf{1}_\mathbb{Q}$ is *not* integrable: upper sum is always $1$, lower sum always $0$.
- **Lebesgue's criterion**: a bounded function is Riemann integrable iff its set of discontinuities has measure zero.
