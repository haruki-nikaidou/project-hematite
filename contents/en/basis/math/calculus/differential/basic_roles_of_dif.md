---
title: Basic Rules of Differentiation
summary: "Derives the linearity, product, and quotient rules from the definition of the derivative, and uses them to compute derivatives of polynomials and rational functions without falling back on first principles."
prerequisites:
  - basis/math/calculus/differential/differentiable_function
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

Once you can compute a derivative from the limit definition, the goal is to avoid repeating that calculation for every new function. The three rules below — **linearity**, the **product rule**, and the **quotient rule** — let you differentiate any polynomial or rational function by inspection.

## Linearity

**Theorem.** If $f$ and $g$ are differentiable at $x$, and $c \in \mathbb{R}$, then

$$
(cf + g)'(x) \;=\; c\,f'(x) + g'(x).
$$

**Proof.** By definition,

$$
\lim_{h\to 0}\frac{(cf+g)(x+h)-(cf+g)(x)}{h} \;=\; \lim_{h\to 0}\left[c\cdot\frac{f(x+h)-f(x)}{h} + \frac{g(x+h)-g(x)}{h}\right].
$$

Both difference quotients converge, so the sum of limits equals the limit of the sum: $c f'(x) + g'(x)$. $\square$

## Product rule

**Theorem.** If $f$ and $g$ are differentiable at $x$, then

$$
(fg)'(x) \;=\; f'(x)\,g(x) + f(x)\,g'(x).
$$

**Proof.** Add and subtract $f(x)g(x+h)$ in the numerator:

$$
\frac{f(x+h)g(x+h) - f(x)g(x)}{h} \;=\; \frac{f(x+h)-f(x)}{h}\cdot g(x+h) \;+\; f(x)\cdot\frac{g(x+h)-g(x)}{h}.
$$

As $h \to 0$: the first term converges to $f'(x) \cdot g(x)$ (using continuity of $g$ at $x$, which follows from differentiability), and the second to $f(x) \cdot g'(x)$. $\square$

## Quotient rule

**Theorem.** If $f$ and $g$ are differentiable at $x$ and $g(x) \neq 0$, then

$$
\left(\frac{f}{g}\right)'(x) \;=\; \frac{f'(x)\,g(x) - f(x)\,g'(x)}{g(x)^2}.
$$

**Proof.** First derive the **reciprocal rule** for $1/g$. With $\delta$ in place of $h$:

$$
\frac{\tfrac{1}{g(x+\delta)}-\tfrac{1}{g(x)}}{\delta} \;=\; -\frac{g(x+\delta)-g(x)}{\delta}\cdot\frac{1}{g(x+\delta)\,g(x)}.
$$

As $\delta \to 0$, this converges to $-g'(x)/g(x)^2$ (since $g(x+\delta) \to g(x) \neq 0$). Then apply the product rule to $f \cdot (1/g)$:

$$
\left(\frac{f}{g}\right)' = f' \cdot \frac{1}{g} + f \cdot \left(-\frac{g'}{g^2}\right) = \frac{f'g - fg'}{g^2}. \;\square
$$

## Applications

### Polynomials

From linearity and $(x^n)' = nx^{n-1}$:

$$
\left(a_n x^n + \cdots + a_1 x + a_0\right)' \;=\; n a_n x^{n-1} + \cdots + a_1.
$$

### Rational functions

$$
\frac{d}{dx}\left(\frac{x^2+1}{x-1}\right) \;=\; \frac{2x(x-1)-(x^2+1)}{(x-1)^2} \;=\; \frac{x^2-2x-1}{(x-1)^2}.
$$

## Summary

- **Linearity**: $(cf+g)' = cf' + g'$.
- **Product rule**: $(fg)' = f'g + fg'$.
- **Quotient rule**: $(f/g)' = (f'g - fg')/g^2$.
- All three follow from the limit definition via elementary limit arithmetic.
- Every polynomial and rational function is differentiable wherever defined.
