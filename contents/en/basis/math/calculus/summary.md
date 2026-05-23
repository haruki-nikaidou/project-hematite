---
title: Calculus, in Summary
summary: "A retrospective on single-variable calculus: how the three pillars — limit-of-a-function, the derivative, and the Riemann integral — interlock through the Newton–Leibniz formula, and how the mean value theorems on both the differential and integral sides drive every concrete computation. This checkpoint surveys the path from limits and continuity through differentiation and Taylor expansion to definite, indefinite, and improper integrals, and signals where each pillar is generalised next — convexity into convex analysis, the Riemann integral into the Lebesgue integral."
prerequisites:
  - basis/math/calculus/differential/tylors_formula
  - basis/math/calculus/differential/lhopitals_role
  - basis/math/calculus/differential/conditions_of_function_be_convex
  - basis/math/calculus/differential/jensons_inequality
  - basis/math/calculus/differential/dif_inv_function
  - basis/math/calculus/riemann_integral/improper_integral_convergence
  - basis/math/calculus/riemann_integral/change_var_in_integral
  - basis/math/calculus/riemann_integral/riemann_integrable_functions
aliases: []
tags:
  - Calculus
updated: 2026-05-22
---

Single-variable calculus is built on three pillars — the **limit**, the **derivative**, and the **Riemann integral** — and the whole subject becomes coherent once you see how they fit together. This checkpoint steps back from the individual theorems and draws the map: which ideas rest on which, what connects the two sides, and where each pillar is taken further once you leave this course.

## The three pillars

### Limits and continuity

Every other concept in calculus is defined as a limit. The derivative is the limit of a difference quotient; the Riemann integral is the limit of Riemann sums; convergence of improper integrals is a limit of proper integrals. The limit is therefore the foundational layer, and everything in the DAG above it depends on it silently.

**Continuity** is the first structural property that limits let you express: $f$ is continuous at $x_0$ when $\lim_{x \to x_0} f(x) = f(x_0)$. Continuous functions on closed bounded intervals have strong properties — they attain their maximum and minimum (Extreme Value Theorem) and hit every value in between (Intermediate Value Theorem). These two facts are used repeatedly in proofs across the rest of the subject.

### The derivative

The **derivative** $f'(x_0)$ is the slope of the tangent line to $f$ at $x_0$, defined by the limit

$$
f'(x_0) \;\coloneqq\; \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}.
$$

Differentiability implies continuity but is strictly stronger. The mechanics of differentiation — sum, product, quotient, and chain rules — reduce any elementary function to repeated applications of a short table of known derivatives. The [derivative of the inverse function](./differential/dif_inv_function/) rule $(f^{-1})'(y) = 1/f'(f^{-1}(y))$ extends this table to logarithms and inverse trigonometric functions.

Higher-order derivatives $f^{(n)}$ describe curvature, convexity, and oscillation. They are the inputs to [Taylor's formula](./differential/tylors_formula/).

### The Riemann integral

The **Riemann integral** $\int_a^b f(x)\,dx$ is defined for bounded functions on closed intervals via upper and lower Darboux sums: $f$ is integrable when the infimum of upper sums equals the supremum of lower sums. Two large classes of functions are [Riemann integrable](./riemann_integral/riemann_integrable_functions/): monotonic functions, and functions with at most finitely many discontinuities. Continuous functions are always integrable; the Dirichlet function (rational/irrational indicator) is the canonical counterexample that is not.

## How the pillars interlock: the fundamental theorem

The deepest result in elementary calculus is the **Newton–Leibniz formula**:

$$
\int_a^b f(x)\,dx \;=\; G(b) - G(a),
$$

where $G$ is any primitive (antiderivative) of $f$, i.e., $G' = f$. This formula has two logically separate halves:

1. **FTC1**: if $f$ is continuous on $[a,b]$, then $F(x) \coloneqq \int_a^x f(t)\,dt$ is differentiable and $F'(x) = f(x)$.
2. **FTC2**: if $G$ is any primitive of $f$, then $\int_a^b f = G(b) - G(a)$.

FTC1 says differentiation and integration are inverse operations. FTC2 converts the problem of computing a definite integral — a limit of sums — into the algebraic task of finding an antiderivative. Without this bridge the two pillars would be isolated; with it, skill on one side immediately transfers to the other.

## The mean value theorem family

A single idea — comparing a function to a secant slope — runs through nearly every non-trivial theorem on the differential side.

**Rolle's Theorem** is the base case: if $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a) = f(b)$, then $f'(c) = 0$ for some $c \in (a,b)$.

**Lagrange's MVT** generalises it: $f(b) - f(a) = f'(c)(b-a)$ for some $c \in (a,b)$. This is used to prove the monotonicity test (positive derivative implies increasing), the "constant function has zero derivative" direction, and — at the heart of Taylor's formula — the Lagrange remainder.

**Cauchy's MVT** is the ratio version: $\frac{f(b)-f(a)}{g(b)-g(a)} = \frac{f'(c)}{g'(c)}$ for some $c$. It is the key step in proving [L'Hôpital's rule](./differential/lhopitals_role/) for $0/0$ indeterminate forms.

On the integral side, the **mean value theorem for integrals** says $\int_a^b f = f(\xi)(b-a)$ for some $\xi \in [a,b]$. This is what FTC1 uses to identify the limit of the difference quotient of $F(x) = \int_a^x f$.

So the two MVT families — differential and integral — are not parallel developments; they are the workhorses that make the Newton–Leibniz formula provable.

## Differentiation in depth: convexity and Taylor expansions

### Convexity

A function is **convex** on an interval when every chord lies above or on the graph. The [differential characterisation](./differential/conditions_of_function_be_convex/) turns this geometric condition into an analytic one: $f$ is convex iff $f'$ is non-decreasing, equivalently (for twice-differentiable $f$) iff $f'' \geq 0$ everywhere. Convexity therefore does not require knowledge of the second derivative; it connects directly to the monotonicity of $f'$, which Lagrange's MVT already controls.

[Jensen's inequality](./differential/jensons_inequality/) is the finite-point generalisation: for convex $f$ and non-negative weights $\lambda_i$ summing to $1$,

$$
f\!\left(\sum_i \lambda_i x_i\right) \;\leq\; \sum_i \lambda_i f(x_i).
$$

This single inequality underlies dozens of classical inequalities (AM-GM, Hölder, …). In machine learning it appears in the derivation of the EM algorithm and in variational bounds.

### Taylor's formula

[Taylor's formula](./differential/tylors_formula/) says that an $(n+1)$-times differentiable function equals its degree-$n$ Taylor polynomial plus an explicit remainder:

$$
f(x) \;=\; \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x-x_0)^k \;+\; \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}.
$$

The Lagrange form of the remainder comes from applying Rolle's theorem to an auxiliary function, so Taylor is a direct descendant of the MVT family. Its two main uses are: error-bounded polynomial approximation, and the mechanical evaluation of indeterminate limits (as a cleaner alternative to repeated L'Hôpital).

## Integration in depth: computation and extension

### Definite integrals and the substitution and integration-by-parts rules

Two integration techniques transform definite integrals into solvable forms. The [change of variables](./riemann_integral/change_var_in_integral/) rule

$$
\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt \;=\; \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx
$$

follows by differentiating a composite primitive via the chain rule, then applying Newton–Leibniz. Integration by parts,

$$
\int_a^b u\,v'\,dx \;=\; \bigl[uv\bigr]_a^b - \int_a^b u'\,v\,dx,
$$

follows from the product rule the same way. Both are therefore corollaries of FTC2 applied to a cleverly chosen primitive.

### Improper integrals

When the interval is unbounded or the integrand blows up at an endpoint, $\int_a^b f$ is defined as a limit of proper integrals. [Convergence tests](./riemann_integral/improper_integral_convergence/) for improper integrals mirror convergence tests for series: comparison, limit comparison, and the Abel–Dirichlet criterion for oscillatory integrands. The Abel–Dirichlet tests use the second mean value theorem for integrals to control the oscillating part.

## Where each pillar leads next

Single-variable calculus is a foundation, not a destination.

**Convexity → convex analysis.** Jensen's inequality and the differential convexity criteria are the entry point to convex analysis, which studies optimisation over convex sets and functions. The subdifferential replaces the derivative for non-smooth convex functions; duality theory generalises the tangent-line characterisation of convexity.

**The Riemann integral → the Lebesgue integral.** The Riemann integral is limited: it requires the set of discontinuities to be "small" (measure zero, by Lebesgue's criterion), and it does not interact well with pointwise limits of functions. The Lebesgue integral measures area by horizontal slices rather than vertical ones, admits a vastly larger class of integrable functions, and has far cleaner limit theorems (monotone convergence, dominated convergence). The Riemann integral is the right tool for computation; the Lebesgue integral is the right tool for analysis.

## Summary

- **Limit** is the common language: derivative, integral, continuity, and improper integrals are all defined as limits.
- **Continuity on $[a,b]$** gives you the Extreme Value Theorem (attains min/max) and the Intermediate Value Theorem (hits every value in between); both are used silently across the subject.
- **The derivative** is defined by the difference-quotient limit; differentiation rules (product, chain, inverse) reduce any elementary function to a known table.
- **The Riemann integral** is the common limit of upper and lower Darboux sums; monotonic and piecewise-continuous functions are integrable; the Dirichlet function is not.
- **Newton–Leibniz** (the Fundamental Theorem) bridges the two sides: $F'(x) = f(x)$ when $F$ is the variable-upper-limit integral; $\int_a^b f = G(b) - G(a)$ for any primitive $G$.
- **The MVT family** (Rolle → Lagrange → Cauchy → Taylor; MVT for integrals) drives virtually every non-trivial proof on both sides.
- **Taylor's formula** approximates $f$ by a degree-$n$ polynomial with a Lagrange remainder controlled by $f^{(n+1)}$; standard series for $e^x$, $\sin x$, $\cos x$, $\ln(1+x)$ follow by sending $n \to \infty$.
- **Convexity** is characterised by $f'' \geq 0$; **Jensen's inequality** extends it to finite weighted sums, opening the door to convex analysis.
- **[Change of variables](./riemann_integral/change_var_in_integral/)** and **integration by parts** are both corollaries of FTC2 applied to composite or product primitives.
- **[Improper integrals](./riemann_integral/improper_integral_convergence/)** are limits of proper ones; convergence tests mirror series tests, with Abel–Dirichlet handling oscillatory cases via the second MVT for integrals.
- The natural extensions are **convex analysis** (from convexity and Jensen) and the **Lebesgue integral** (from Riemann integration), which is needed for rigorous probability and functional analysis.
