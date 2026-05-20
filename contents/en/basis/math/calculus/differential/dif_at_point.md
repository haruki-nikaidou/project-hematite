---
title: Derivative at a Point
summary: "The derivative of f at x₀ is the limit of the difference quotient (f(x₀+h)−f(x₀))/h as h → 0. This checkpoint gives the precise ε–δ definition, computes derivatives from first principles, and shows that differentiability at a point implies continuity there."
prerequisites:
  - basis/math/calculus/continuous_function/limit_of_function
  - basis/math/calculus/differential/tangent_line
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

The [tangent line](./tangent_line/) at a point captures the *instantaneous slope* of a function. This checkpoint makes that intuition precise: the **derivative** of $f$ at a point $x_0$ is the limit of the difference quotient, and the formal definition gives it a firm foundation.

## Definition

**Definition.** Let $f$ be defined on an open interval containing $x_0$. The **derivative of $f$ at $x_0$**, written $f'(x_0)$, is

$$
f'(x_0) \;=\; \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}, \tag{1}
$$

provided this limit exists and is finite. When it does, $f$ is said to be **differentiable at $x_0$**.

Equivalently, via the substitution $x = x_0 + h$:

$$
f'(x_0) \;=\; \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}.
$$

The notations $\dfrac{df}{dx}\big|_{x=x_0}$ and $\dfrac{d}{dx}f(x)\big|_{x=x_0}$ are also standard.

## Computing from first principles

### Power function $f(x) = x^n$, $n \in \mathbb{N}$

By the binomial theorem,

$$
\frac{(x_0+h)^n - x_0^n}{h} \;=\; n x_0^{n-1} + \binom{n}{2} x_0^{n-2} h + \cdots + h^{n-1}.
$$

Every term except the first contains a factor of $h$, so as $h \to 0$ the quotient converges to $nx_0^{n-1}$:

$$
\frac{d}{dx}(x^n) \;=\; n x^{n-1}.
$$

### Constant function $f(x) = c$

The difference quotient is $\dfrac{c - c}{h} = 0$ for all $h \neq 0$, so $f'(x_0) = 0$.

## Differentiability implies continuity

**Theorem.** If $f$ is differentiable at $x_0$, then $f$ is continuous at $x_0$.

**Proof.** Write $f(x_0 + h) - f(x_0) = \dfrac{f(x_0+h)-f(x_0)}{h} \cdot h$. The first factor converges to $f'(x_0)$ and the second to $0$. By the product rule for limits,

$$
\lim_{h \to 0}\bigl[f(x_0+h) - f(x_0)\bigr] \;=\; f'(x_0) \cdot 0 \;=\; 0,
$$

so $\lim_{h\to 0} f(x_0+h) = f(x_0)$. $\square$

The converse fails: $f(x) = |x|$ is continuous at $0$ but is not differentiable there — the left and right difference quotients approach $-1$ and $+1$ respectively.

## One-sided derivatives

**Definition.** The **right derivative** and **left derivative** at $x_0$ are

$$
f'_+(x_0) \;=\; \lim_{h \to 0^+}\frac{f(x_0+h)-f(x_0)}{h}, \qquad f'_-(x_0) \;=\; \lim_{h \to 0^-}\frac{f(x_0+h)-f(x_0)}{h}.
$$

The two-sided derivative $f'(x_0)$ exists if and only if both one-sided derivatives exist and are equal.

## Summary

- $f'(x_0) = \lim_{h\to 0}\dfrac{f(x_0+h)-f(x_0)}{h}$; if this limit exists, $f$ is **differentiable at $x_0$**.
- $(x^n)' = nx^{n-1}$, derived from the binomial theorem.
- **Differentiability implies continuity**, but not vice versa.
- $f'(x_0)$ exists if and only if $f'_+(x_0)$ and $f'_-(x_0)$ both exist and are equal.
