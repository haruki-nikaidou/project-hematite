---
title: Derivative of the Inverse Function
summary: "If f is differentiable and strictly monotonic with f′(x) ≠ 0, then its inverse is differentiable and (f⁻¹)′(y) = 1 / f′(f⁻¹(y)). This checkpoint proves the inverse function differentiation formula and uses it to compute the derivatives of log and the inverse trigonometric functions."
prerequisites:
  - basis/math/calculus/differential/chain_rule
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

If you know how to differentiate $f$, can you immediately differentiate its inverse $f^{-1}$? The answer is yes, provided $f'$ is nonzero. This gives an efficient shortcut for the derivatives of $\ln x$, $\arcsin x$, $\arctan x$, and all other inverse functions.

## The inverse function differentiation formula

**Theorem.** Let $f$ be continuous and strictly monotonic on an open interval $I$, differentiable on $I$, with $f'(x) \neq 0$ for all $x \in I$. Then $f^{-1}$ is differentiable on $f(I)$ and

$$
(f^{-1})'(y) \;=\; \frac{1}{f'(f^{-1}(y))}. \tag{1}
$$

**Proof.** Fix $y_0 = f(x_0) \in f(I)$ and let $y = f(x)$ with $y \neq y_0$. Then $x \neq x_0$, and

$$
\frac{f^{-1}(y) - f^{-1}(y_0)}{y - y_0} \;=\; \frac{x - x_0}{f(x) - f(x_0)}.
$$

As $y \to y_0$, continuity of $f^{-1}$ (which follows from strict monotonicity and continuity of $f$) gives $x = f^{-1}(y) \to x_0$. Since $f'(x_0) \neq 0$,

$$
\lim_{y \to y_0}\frac{x - x_0}{f(x) - f(x_0)} \;=\; \frac{1}{f'(x_0)} \;=\; \frac{1}{f'(f^{-1}(y_0))}. \;\square
$$

In Leibniz notation: if $y = f(x)$, then $\dfrac{dx}{dy} = \dfrac{1}{\,\dfrac{dy}{dx}\,}$.

## Derivative of $\ln x$

Let $f(x) = e^x$, so $f^{-1}(y) = \ln y$. Since $f'(x) = e^x \neq 0$, formula $(1)$ gives

$$
(\ln y)' \;=\; \frac{1}{e^{\ln y}} \;=\; \frac{1}{y}.
$$

That is, $\dfrac{d}{dx}(\ln x) = \dfrac{1}{x}$ for $x > 0$.

## Derivatives of inverse trigonometric functions

### Arcsine

Restrict $f(x) = \sin x$ to $[-\pi/2, \pi/2]$. Then $f^{-1}(y) = \arcsin y$ for $y \in (-1,1)$, and $f'(x) = \cos x > 0$ on the open interval. At $x = \arcsin y$: $\cos x = \sqrt{1-\sin^2 x} = \sqrt{1-y^2}$, so

$$
(\arcsin y)' \;=\; \frac{1}{\sqrt{1-y^2}}.
$$

### Arccosine

Restrict $f(x) = \cos x$ to $[0,\pi]$, so $f^{-1}(y) = \arccos y$ and $f'(x) = -\sin x < 0$ on $(0,\pi)$. At $x = \arccos y$: $\sin x = \sqrt{1-y^2}$, so

$$
(\arccos y)' \;=\; \frac{-1}{\sqrt{1-y^2}}.
$$

Note: $(\arcsin x)' + (\arccos x)' = 0$, consistent with the identity $\arcsin x + \arccos x = \pi/2$.

### Arctangent

Restrict $f(x) = \tan x$ to $(-\pi/2, \pi/2)$. Then $f'(x) = 1 + \tan^2 x = 1 + y^2$ at $y = \tan x$, so

$$
(\arctan y)' \;=\; \frac{1}{1+y^2}.
$$

## Summary

- **Inverse function rule**: $(f^{-1})'(y) = \dfrac{1}{f'(f^{-1}(y))}$ whenever $f$ is strictly monotonic and $f' \neq 0$.
- $(\ln x)' = 1/x$, derived as the inverse of $(e^x)' = e^x$.
- $(\arcsin x)' = 1/\sqrt{1-x^2}$, $\;(\arccos x)' = -1/\sqrt{1-x^2}$, $\;(\arctan x)' = 1/(1+x^2)$.
