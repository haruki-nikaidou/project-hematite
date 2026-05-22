---
title: Additivity of the Integral
summary: "If f is Riemann integrable on [a, b] and c ∈ (a, b), then f is integrable on [a, c] and [c, b], and the integrals satisfy ∫_a^b f = ∫_a^c f + ∫_c^b f. This checkpoint proves additivity from Darboux sums, extends it consistently to oriented intervals via the convention ∫_a^b f = −∫_b^a f, and uses it to introduce the integral with variable upper limit F(x) = ∫_a^x f(t) dt — the bridge to the Newton–Leibniz formula."
prerequisites:
  - basis/math/calculus/riemann_integral/def
aliases: []
tags:
  - Calculus
  - Integration
updated: 2026-05-22
---

Suppose you want to integrate a function defined by two different formulas on two pieces of an interval — a ramp that flattens halfway through, say. The integral over the whole interval is just the sum of the integrals over the two pieces. This is **additivity**, and it turns out to be both easy to prove from first principles and far-reaching in its consequences: it underlies the variable-upper-limit function that connects the integral to differentiation.

## Why additivity matters

Many functions in practice are **piecewise-defined**: they obey different formulas on different sub-intervals. Without additivity you would need a single formula to integrate over the entire domain; with it, you can break the domain at every junction point, integrate each piece, and add the results. Additivity also lets you subtract integrals: $\int_c^b f = \int_a^b f - \int_a^c f$, which is essential for estimating tails and for isolating contributions from sub-regions.

## Formal statement and proof

**Theorem (Additivity).** Let $f$ be [Riemann integrable](../def/) on $[a, b]$, and let $c \in (a, b)$. Then $f$ is integrable on both $[a, c]$ and $[c, b]$, and

$$
\int_a^b f(x)\,dx \;=\; \int_a^c f(x)\,dx \;+\; \int_c^b f(x)\,dx.
$$

**Proof.** Recall that $f$ is integrable on $[a, b]$ if and only if for every $\varepsilon > 0$ there exists a partition $P$ of $[a, b]$ with $U(f, P) - L(f, P) < \varepsilon$, where $U$ and $L$ denote the upper and lower **Darboux sums**.

**Step 1 — refining a partition by inserting $c$.**
Let $P$ be any partition of $[a, b]$, and let $P^* = P \cup \{c\}$ be the partition obtained by inserting the point $c$. If $c$ already belongs to $P$ then $P^* = P$. Otherwise $c$ falls in the interior of some sub-interval $[x_{k-1}, x_k]$ of $P$, which gets split into $[x_{k-1}, c]$ and $[c, x_k]$. For the upper sum, the supremum over the original interval satisfies

$$
M_k \;=\; \sup_{[x_{k-1},x_k]} f \;\geq\; \sup_{[x_{k-1},c]} f \quad\text{and}\quad M_k \;\geq\; \sup_{[c,x_k]} f,
$$

so replacing $M_k(x_k - x_{k-1})$ with two smaller (or equal) terms can only decrease the upper sum: $U(f, P^*) \leq U(f, P)$. By the analogous argument for infima, $L(f, P^*) \geq L(f, P)$. Therefore

$$
U(f, P^*) - L(f, P^*) \;\leq\; U(f, P) - L(f, P).
$$

**Step 2 — integrability on sub-intervals.**
Since $f$ is integrable on $[a, b]$, for any $\varepsilon > 0$ pick $P$ with $U(f,P) - L(f,P) < \varepsilon$. Refine to $P^*$ as above, and set $P_1 \coloneqq P^* \cap [a, c]$ and $P_2 \coloneqq P^* \cap [c, b]$. The Darboux sums split:

$$
U(f, P^*) = U(f, P_1) + U(f, P_2), \qquad L(f, P^*) = L(f, P_1) + L(f, P_2).
$$

Since each term is non-negative,

$$
U(f, P_1) - L(f, P_1) \;\leq\; U(f, P^*) - L(f, P^*) < \varepsilon,
$$

and the same holds for $P_2$. As $\varepsilon > 0$ was arbitrary, $f$ is integrable on $[a, c]$ and on $[c, b]$.

**Step 3 — the sum formula.**
Denote $I \coloneqq \int_a^b f$, $I_1 \coloneqq \int_a^c f$, $I_2 \coloneqq \int_c^b f$. For any partition $P^*$ of $[a,b]$ containing $c$:

$$
L(f, P_1) + L(f, P_2) \;\leq\; I_1 + I_2 \;\leq\; U(f, P_1) + U(f, P_2).
$$

But the outer expressions equal $L(f, P^*)$ and $U(f, P^*)$ respectively, and both converge to $I$ as the mesh of $P^*$ shrinks. Hence $I_1 + I_2 = I$. $\square$

## Orientation convention and signed integrals

The Darboux definition implicitly assumes $a < b$. To handle all orderings uniformly, adopt the conventions

$$
\int_a^a f(x)\,dx \;\coloneqq\; 0, \qquad \int_b^a f(x)\,dx \;\coloneqq\; -\int_a^b f(x)\,dx \quad (a < b).
$$

With these in place, the additivity formula $\int_a^b f = \int_a^c f + \int_c^b f$ holds for **any** ordering of $a$, $b$, $c$ on the real line. To see why, consider the case $c < a < b$:

$$
\int_a^b f \;=\; \int_c^b f - \int_c^a f \;=\; \int_c^b f + \int_a^c f,
$$

which is just the original additivity formula with the roles of $c$ and $a$ swapped. All other cases follow similarly. The sign conventions ensure you can freely insert or remove intermediate limits without tracking which endpoint is larger.

## The variable-upper-limit function

Fix a base point $a$ in the domain of integration, and define

$$
F(x) \;\coloneqq\; \int_a^x f(t)\,dt
$$

for all $x$ in the interval $[a, b]$. This is the **variable-upper-limit function** of $f$ based at $a$ (also called the **integral function**).

**Well-definedness.** By additivity applied to $[a, x] \subset [a, b]$, integrability of $f$ on $[a, b]$ implies integrability on $[a, x]$ for every $x \in [a, b]$. Hence $F(x)$ is a well-defined real number for each such $x$.

**Change of base point.** If you replace $a$ by another base point $a'$, the resulting function $F_{a'}(x) = \int_{a'}^x f(t)\,dt$ satisfies

$$
F_{a'}(x) \;=\; F(x) \;-\; \underbrace{F(a')}_{\text{constant}} \;=\; F(x) + C.
$$

Changing the base point shifts $F$ by a constant. This is the first hint of why **primitives are unique only up to an additive constant** — a theme developed fully in the [Primitives](../primitive/) checkpoint.

The function $F$ is the crucial bridge to the Newton–Leibniz formula: when $f$ is continuous, $F$ is differentiable with $F'(x) = f(x)$, which means $F$ is a primitive of $f$.

## Worked example: piecewise linear function

Consider the tent function

$$
f(x) \;=\; \begin{cases} x & 0 \leq x \leq 1, \\ 2 - x & 1 < x \leq 2. \end{cases}
$$

It rises linearly from $0$ to $1$ on $[0,1]$, then falls back to $0$ on $[1,2]$. Apply additivity at $c = 1$:

$$
\int_0^2 f(x)\,dx \;=\; \int_0^1 x\,dx \;+\; \int_1^2 (2-x)\,dx.
$$

The graph of each piece is a right triangle with base $1$ and height $1$, so each integral equals $\tfrac{1}{2}(1)(1) = \tfrac{1}{2}$. Therefore

$$
\int_0^2 f(x)\,dx \;=\; \frac{1}{2} + \frac{1}{2} \;=\; 1.
$$

Now use the variable-upper-limit function to trace how the accumulated area grows. For $x \in [0,1]$,

$$
F(x) = \int_0^x t\,dt = \frac{x^2}{2}.
$$

For $x \in [1,2]$, split at $1$:

$$
F(x) = \int_0^1 t\,dt + \int_1^x (2-t)\,dt = \frac{1}{2} + \left[2t - \frac{t^2}{2}\right]_1^x = \frac{1}{2} + 2x - \frac{x^2}{2} - \frac{3}{2} = 2x - \frac{x^2}{2} - 1.
$$

You can check that $F(0) = 0$, $F(1) = \tfrac{1}{2}$, and $F(2) = 1$, consistent with the areas computed above.

## Summary

- **Additivity**: if $f$ is integrable on $[a, b]$ and $c \in (a, b)$, then $f$ is integrable on $[a, c]$ and $[c, b]$, and $\int_a^b f = \int_a^c f + \int_c^b f$.
- **Proof**: insert $c$ into any partition (this cannot increase $U - L$), split sums exactly at $c$, then pass to the limit.
- **Orientation conventions**: $\int_a^a f \coloneqq 0$ and $\int_b^a f \coloneqq -\int_a^b f$ make additivity valid for all orderings of $a, b, c$.
- **Variable-upper-limit function**: $F(x) \coloneqq \int_a^x f(t)\,dt$ is well-defined on $[a, b]$; changing the base point shifts $F$ by a constant.
- $F$ is the bridge to the Newton–Leibniz formula: for continuous $f$, $F'(x) = f(x)$.
