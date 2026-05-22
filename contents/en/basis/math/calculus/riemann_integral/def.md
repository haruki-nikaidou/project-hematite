---
title: Definition of the Riemann Integral
summary: "The Riemann integral of a bounded function on [a, b] is defined as the common limit of upper and lower Darboux sums over progressively finer partitions, when those limits agree. This checkpoint sets up partitions, upper and lower sums, and Riemann integrability, and shows that every continuous function on a closed interval is integrable."
prerequisites:
  - basis/math/calculus/continuous_function/continuous
  - basis/math/analysis/limit
aliases: []
tags:
  - Calculus
  - Integration
updated: 2026-05-20
---

You already know how to find areas of simple shapes — rectangles, triangles, circles. But what is the area under the curve $y = x^2$ from $0$ to $1$? No geometric formula applies directly. The **Riemann integral** is the answer: it defines "area under a curve" as a limit of increasingly fine rectangular approximations, and does so in a way that is precise enough to prove theorems.

## Partitions and Darboux sums

Let $f: [a, b] \to \mathbb{R}$ be a **bounded** function. A **partition** of $[a, b]$ is a finite sequence

$$
P = \{a = x_0 < x_1 < x_2 < \cdots < x_n = b\}.
$$

On each subinterval $[x_{i-1}, x_i]$, $f$ is bounded, so its supremum and infimum exist:

$$
M_i \coloneqq \sup_{x \in [x_{i-1},\, x_i]} f(x), \qquad m_i \coloneqq \inf_{x \in [x_{i-1},\, x_i]} f(x).
$$

The **upper Darboux sum** and **lower Darboux sum** of $f$ over $P$ are:

$$
U(f, P) \coloneqq \sum_{i=1}^{n} M_i\,(x_i - x_{i-1}), \qquad L(f, P) \coloneqq \sum_{i=1}^{n} m_i\,(x_i - x_{i-1}).
$$

Geometrically, $U(f,P)$ is the total area of rectangles that lie *above* the graph, and $L(f,P)$ is the total area of rectangles that lie *below* it. Since $m_i \le M_i$ for every $i$, you always have $L(f,P) \le U(f,P)$.

### Refining a partition

A partition $Q$ is a **refinement** of $P$ if $P \subseteq Q$ (every boundary point of $P$ is also in $Q$). Adding points can only lower the upper sum and raise the lower sum:

$$
P \subseteq Q \implies L(f, P) \le L(f, Q) \le U(f, Q) \le U(f, P).
$$

A consequence is that every lower sum is at most every upper sum, even for *different* partitions: if $P_1$ and $P_2$ are any two partitions, then $L(f, P_1) \le U(f, P_2)$.

## Upper and lower integrals

Because the set of all lower sums is bounded above (by any upper sum), its supremum exists in $\mathbb{R}$. Likewise, the infimum of all upper sums exists. These define the **lower integral** and **upper integral** of $f$:

$$
\underline{\int_a^b} f \;\coloneqq\; \sup_P L(f, P), \qquad \overline{\int_a^b} f \;\coloneqq\; \inf_P U(f, P).
$$

Since every lower sum is $\le$ every upper sum, you always have $\underline{\int} f \le \overline{\int} f$.

## Riemann integrability

A bounded function $f: [a, b] \to \mathbb{R}$ is **Riemann integrable** if the upper and lower integrals agree:

$$
\underline{\int_a^b} f \;=\; \overline{\int_a^b} f.
$$

When they do, their common value is called the **Riemann integral** of $f$ on $[a, b]$, written

$$
\int_a^b f(x)\,dx \;=\; \int_a^b f.
$$

### The Darboux criterion

A practical reformulation: $f$ is Riemann integrable if and only if for every $\varepsilon > 0$ there exists a partition $P$ with

$$
U(f, P) - L(f, P) \;<\; \varepsilon. \tag{1}
$$

This is the working tool for most integrability proofs.

### Equivalent Riemann sum definition

You can also define the integral via **Riemann sums** directly. For a partition $P$ and a choice of **sample points** $\xi_i \in [x_{i-1}, x_i]$, the Riemann sum is

$$
S(f, P, \boldsymbol\xi) \;\coloneqq\; \sum_{i=1}^n f(\xi_i)\,(x_i - x_{i-1}).
$$

The **mesh** of $P$ is $\|P\| \coloneqq \max_i(x_i - x_{i-1})$. Then $f$ is Riemann integrable with value $I$ if and only if: for every $\varepsilon > 0$ there exists $\delta > 0$ such that $\|P\| < \delta$ implies $|S(f,P,\boldsymbol\xi) - I| < \varepsilon$ for *every* choice of sample points.

The Darboux and Riemann-sum formulations are equivalent; the Darboux approach tends to be cleaner for proofs.

## Every continuous function is integrable

**Theorem.** If $f: [a, b] \to \mathbb{R}$ is continuous, then $f$ is Riemann integrable.

**Proof.** A continuous function on a closed bounded interval is **uniformly continuous**: for every $\varepsilon > 0$ there exists $\delta > 0$ such that $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon/(b-a)$.

Given $\varepsilon > 0$, choose $\delta$ as above and let $P$ be any partition with mesh $\|P\| < \delta$. On each subinterval $[x_{i-1}, x_i]$, the oscillation satisfies

$$
M_i - m_i \;\le\; \frac{\varepsilon}{b-a},
$$

because any two points in $[x_{i-1}, x_i]$ are within distance $\delta$ of each other. Therefore

$$
U(f,P) - L(f,P) \;=\; \sum_{i=1}^n (M_i - m_i)(x_i - x_{i-1}) \;\le\; \frac{\varepsilon}{b-a} \cdot (b-a) \;=\; \varepsilon.
$$

By the Darboux criterion $(1)$, $f$ is integrable. $\square$

## Worked example: $\int_0^1 x^2\,dx$

Take $f(x) = x^2$ and the uniform partition $P_n = \{0, \tfrac{1}{n}, \tfrac{2}{n}, \ldots, 1\}$. Since $f$ is increasing on $[0,1]$:

$$
M_i = \left(\frac{i}{n}\right)^2, \qquad m_i = \left(\frac{i-1}{n}\right)^2, \qquad \Delta x_i = \frac{1}{n}.
$$

The upper and lower sums are:

$$
U(f, P_n) = \frac{1}{n} \sum_{i=1}^n \frac{i^2}{n^2} = \frac{1}{n^3} \cdot \frac{n(n+1)(2n+1)}{6} = \frac{(n+1)(2n+1)}{6n^2},
$$

$$
L(f, P_n) = \frac{1}{n} \sum_{i=0}^{n-1} \frac{i^2}{n^2} = \frac{(n-1)(2n-1)}{6n^2}.
$$

Their difference is $U - L = \frac{(n+1)(2n+1) - (n-1)(2n-1)}{6n^2} = \frac{6n}{6n^2} = \frac{1}{n} \to 0$. So the Darboux criterion is satisfied. Both sums converge to $\frac{1}{3}$, confirming

$$
\int_0^1 x^2\,dx \;=\; \frac{1}{3}.
$$

## Summary

- A **partition** of $[a,b]$ divides it into subintervals; **Darboux sums** $L(f,P)$ and $U(f,P)$ bound the "area under $f$" from below and above.
- The **lower integral** $\underline{\int} f$ and **upper integral** $\overline{\int} f$ are the supremum and infimum of all lower and upper sums, respectively.
- $f$ is **Riemann integrable** when $\underline{\int} f = \overline{\int} f$; the common value is $\int_a^b f$.
- **Darboux criterion**: $f$ is integrable iff for every $\varepsilon > 0$ some partition achieves $U(f,P) - L(f,P) < \varepsilon$.
- Every **continuous** function on $[a,b]$ is integrable, by uniform continuity.
