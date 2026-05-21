---
title: Higher-Order Derivatives
summary: "If the derivative f′ of f is itself differentiable, its derivative f″ is the second derivative — and the process continues to f⁽ⁿ⁾. This checkpoint defines higher-order derivatives, introduces the spaces Cⁿ and C∞ of n-times and infinitely differentiable functions, and surveys Leibniz's rule for higher derivatives of a product."
prerequisites:
  - basis/math/calculus/differential/differentiable_function
  - basis/math/calculus/differential/basic_roles_of_dif
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

You know what the [derivative](../differentiable_function/) $f'$ measures — instantaneous rate of change. But $f'$ is itself a function, and you can ask whether *it* has a derivative. Repeating the process produces higher-order derivatives that encode curvature, jerk, and the coefficients of Taylor polynomials.

## Inductive definition

**Definition.** The **$n$-th derivative** $f^{(n)}$ is defined inductively:

$$
f^{(0)} \coloneqq f, \qquad f^{(n)} \coloneqq \bigl(f^{(n-1)}\bigr)' \quad \text{for } n \geq 1,
$$

whenever each derivative in the chain exists.

Common notations:

| Order | Prime notation | Leibniz notation |
|-------|---------------|-----------------|
| 1st | $f'$ | $\dfrac{df}{dx}$ |
| 2nd | $f''$ | $\dfrac{d^2f}{dx^2}$ |
| 3rd | $f'''$ | $\dfrac{d^3f}{dx^3}$ |
| $n$-th | $f^{(n)}$ | $\dfrac{d^nf}{dx^n}$ |

## The spaces $C^n$ and $C^\infty$

If $f^{(n)}$ exists and is continuous on an interval $I$, we say $f \in C^n(I)$ (read "$f$ is $C^n$" or "$f$ is $n$-times continuously differentiable"). The space $C^0(I)$ is just the continuous functions; $C^1(I)$ adds a continuous derivative; and so on.

A function with derivatives of all orders is **smooth** and belongs to $C^\infty(I)$.

$$
C^\infty \;\subsetneq\; \cdots \;\subsetneq\; C^2 \;\subsetneq\; C^1 \;\subsetneq\; C^0.
$$

Each inclusion is strict: there exist $C^n$ functions that are not $C^{n+1}$.

**Example.** $f(x) = |x|^{3}$ is $C^2$ on $\mathbb{R}$ (since $f'' = 6|x|$ is continuous) but not $C^3$ (since $f'''(0)$ does not exist).

## Examples of higher derivatives

For a polynomial $p(x) = a_n x^n + \cdots + a_0$:

$$
p^{(k)}(x) \;=\; \frac{n!}{(n-k)!} a_n x^{n-k} + \cdots \quad (k \leq n), \qquad p^{(k)} \equiv 0 \quad (k > n).
$$

For the exponential $e^x$: $(e^x)^{(n)} = e^x$ for all $n$.

For $\sin x$ and $\cos x$ the derivatives cycle with period 4:

$$
(\sin x)^{(n)} = \sin\!\left(x + \tfrac{n\pi}{2}\right), \qquad (\cos x)^{(n)} = \cos\!\left(x + \tfrac{n\pi}{2}\right).
$$

## Leibniz's rule

The [product rule](../basic_roles_of_dif/) $(fg)' = f'g + fg'$ generalises to all orders. The pattern mirrors the binomial theorem.

**Theorem (Leibniz's rule).** If $f$ and $g$ are $n$-times differentiable, then

$$
(fg)^{(n)} \;=\; \sum_{k=0}^{n} \binom{n}{k} f^{(k)}\, g^{(n-k)}.
$$

**Proof by induction.** The base case $n = 1$ is the product rule. Assuming the formula holds for $n$, differentiate both sides and use the product rule on each term $f^{(k)} g^{(n-k)}$; the binomial recurrence $\binom{n}{k-1} + \binom{n}{k} = \binom{n+1}{k}$ then reassembles the sum into the formula for $n+1$. $\square$

**Example.** $(x^2 e^x)'' = (x^2)'' e^x + 2(x^2)' e^x + x^2 e^x = 2e^x + 4xe^x + x^2 e^x = (x^2 + 4x + 2)e^x$.

## Summary

- The **$n$-th derivative** $f^{(n)}$ is defined inductively as the derivative of $f^{(n-1)}$.
- $f \in C^n$ means $f^{(n)}$ exists and is continuous; $f \in C^\infty$ means all orders exist.
- Polynomials eventually differentiate to zero; $e^x$, $\sin x$, $\cos x$ are $C^\infty$ with closed-form $n$-th derivatives.
- **Leibniz's rule**: $(fg)^{(n)} = \sum_{k=0}^n \binom{n}{k} f^{(k)} g^{(n-k)}$, a direct analogue of the binomial theorem.
