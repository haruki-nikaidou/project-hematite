---
title: Cauchy's Mean Value Theorem
summary: "Cauchy's generalised mean value theorem states that for f, g continuous on [a, b] and differentiable on (a, b) with g′ nonzero on (a, b), there exists c with (f(b) − f(a))·g′(c) = (g(b) − g(a))·f′(c). This checkpoint derives it from Lagrange's MVT applied to a clever auxiliary function."
prerequisites:
  - basis/math/calculus/differential/lagranges_finite-increment_theorem
aliases: []
tags:
  - Calculus
  - Mean Value Theorems
updated: 2026-05-21
---

Suppose you record both position and fuel consumption as you drive from city $A$ to city $B$. At some moment during the trip, the ratio of your instantaneous speed to your instantaneous fuel-burn rate must equal the ratio of total distance to total fuel used. Cauchy's theorem is the precise form of this observation: it handles two functions varying together and compares their rates of change in tandem.

## Statement

**Theorem (Cauchy's Mean Value Theorem).** Let $f, g : [a, b] \to \mathbb{R}$. If

1. $f$ and $g$ are continuous on $[a, b]$,
2. $f$ and $g$ are differentiable on $(a, b)$, and
3. $g'(x) \neq 0$ for all $x \in (a, b)$,

then there exists $c \in (a, b)$ such that

$$
\frac{f(b) - f(a)}{g(b) - g(a)} \;=\; \frac{f'(c)}{g'(c)}. \tag{1}
$$

**Note.** Condition 3 implies $g(b) \neq g(a)$: if $g(b) = g(a)$, then [Lagrange's MVT](../lagranges_finite-increment_theorem/) applied to $g$ would give some interior point where $g' = 0$, contradicting condition 3. So the left side of $(1)$ is well-defined.

## Proof

The trick is to build a single auxiliary function whose boundary values coincide, then apply [Lagrange's MVT](../lagranges_finite-increment_theorem/).

Define

$$
h(x) \;\coloneqq\; [f(b) - f(a)]\,g(x) \;-\; [g(b) - g(a)]\,f(x).
$$

Since $f$ and $g$ are continuous on $[a, b]$ and differentiable on $(a, b)$, so is $h$. Compute:

$$
h(a) = [f(b)-f(a)]\,g(a) - [g(b)-g(a)]\,f(a),
$$
$$
h(b) = [f(b)-f(a)]\,g(b) - [g(b)-g(a)]\,f(b).
$$

Their difference is

$$
h(b) - h(a) = [f(b)-f(a)][g(b)-g(a)] - [g(b)-g(a)][f(b)-f(a)] = 0,
$$

so $h(a) = h(b)$. By Lagrange's MVT applied to $h$, there exists $c \in (a, b)$ with $h'(c)(b-a) = h(b) - h(a) = 0$, hence $h'(c) = 0$. Differentiating $h$:

$$
h'(x) = [f(b) - f(a)]\,g'(x) - [g(b) - g(a)]\,f'(x).
$$

Setting $h'(c) = 0$ gives $[f(b)-f(a)]\,g'(c) = [g(b)-g(a)]\,f'(c)$. Dividing by $g'(c) \neq 0$ and $g(b)-g(a) \neq 0$ yields $(1)$. $\square$

## Relation to Lagrange's theorem

Set $g(x) = x$. Then $g'(x) = 1$ and $g(b) - g(a) = b - a$, so $(1)$ becomes

$$
\frac{f(b) - f(a)}{b - a} \;=\; f'(c),
$$

which is exactly [Lagrange's MVT](../lagranges_finite-increment_theorem/). Cauchy's theorem is the strict generalisation: every instance of Lagrange's theorem is a special case, obtained by taking the second function to be the identity.

## Parametric interpretation

When $x$ is a parameter tracing a curve $(g(x),\, f(x))$ for $x \in [a, b]$, the slope of the chord from $(g(a), f(a))$ to $(g(b), f(b))$ is $\frac{f(b)-f(a)}{g(b)-g(a)}$. Theorem $(1)$ says the tangent to the curve at the parameter value $c$ has the same slope $f'(c)/g'(c)$. It is the Mean Value Theorem for parametric curves.

## Summary

- **Cauchy's theorem**: if $f, g$ are continuous on $[a,b]$, differentiable on $(a,b)$, and $g' \neq 0$ on $(a,b)$, then there exists $c \in (a,b)$ with $\dfrac{f(b)-f(a)}{g(b)-g(a)} = \dfrac{f'(c)}{g'(c)}$.
- **Proof**: define $h(x) = [f(b)-f(a)]\,g(x) - [g(b)-g(a)]\,f(x)$; it satisfies $h(a) = h(b)$, so Lagrange's MVT gives a zero of $h'$.
- **Lagrange's MVT** is the special case $g(x) = x$.
- For parametric curves, the theorem says the tangent slope equals the chord slope at some interior parameter value.
