---
title: L'Hôpital's Rule
summary: "L'Hôpital's rule lets you compute limits of 0/0 and ∞/∞ indeterminate forms by replacing f/g with f′/g′. This checkpoint proves the rule via Cauchy's mean value theorem and demonstrates how each indeterminate form can be reduced to it."
prerequisites:
  - basis/math/calculus/differential/cauchys_finite-increment_theorem
aliases: []
tags:
  - Calculus
  - Limit
updated: 2026-05-21
---

When numerator and denominator of a fraction both tend to zero — or both blow up — you cannot read the limit off by substitution. These are **indeterminate forms**, and they appear constantly in analysis. L'Hôpital's rule gives you a clean escape: replace the fraction by the ratio of the derivatives and try again.

## Indeterminate forms

A limit $\lim_{x \to a} \frac{f(x)}{g(x)}$ is *indeterminate* when naive substitution produces a meaningless expression such as $\frac{0}{0}$ or $\frac{\infty}{\infty}$. The value of the limit depends on how fast each part approaches its limit, and L'Hôpital's rule extracts exactly that information via derivatives.

## Statement

**Theorem (L'Hôpital's Rule).** Let $f$ and $g$ be differentiable on a deleted neighbourhood of $a$ (where $a \in \mathbb{R}$ or $a = \pm\infty$). Suppose

1. $g'(x) \neq 0$ near $a$, and
2. the limit is of the form $\tfrac{0}{0}$ — meaning $\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$ — or of the form $\tfrac{\infty}{\infty}$ — meaning $\lim_{x \to a} |g(x)| = \infty$.

If

$$
\lim_{x \to a} \frac{f'(x)}{g'(x)} \;=\; L \quad (L \in \mathbb{R} \cup \{+\infty,\, -\infty\}), \tag{1}
$$

then

$$
\lim_{x \to a} \frac{f(x)}{g(x)} \;=\; L. \tag{2}
$$

The rule applies equally to one-sided limits ($x \to a^+$ or $x \to a^-$).

## Proof for the $\tfrac{0}{0}$ case

Assume $\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$. Extend $f$ and $g$ to $a$ by setting $f(a) = g(a) = 0$; continuity at $a$ is preserved.

For $x \neq a$ in a deleted neighbourhood of $a$, apply [Cauchy's Mean Value Theorem](../cauchys_finite-increment_theorem/) to $f$ and $g$ on the closed interval with endpoints $a$ and $x$:

$$
\frac{f(x)}{g(x)} \;=\; \frac{f(x) - f(a)}{g(x) - g(a)} \;=\; \frac{f'(c_x)}{g'(c_x)},
$$

where $c_x$ lies strictly between $a$ and $x$. As $x \to a$, the intermediate point $c_x \to a$ as well (by the squeeze $|c_x - a| < |x - a|$). Therefore:

$$
\lim_{x \to a} \frac{f(x)}{g(x)} \;=\; \lim_{x \to a} \frac{f'(c_x)}{g'(c_x)} \;=\; \lim_{c \to a} \frac{f'(c)}{g'(c)} \;=\; L. \quad \square
$$

The $\tfrac{\infty}{\infty}$ case uses a more delicate application of Cauchy's theorem — fixing a reference point and controlling the tail — but leads to the same conclusion under the same hypotheses.

## Reducing other indeterminate forms

Every indeterminate form other than $\tfrac{0}{0}$ and $\tfrac{\infty}{\infty}$ can be rewritten algebraically until one of those two appears.

### $0 \cdot \infty$

If $\lim f(x) = 0$ and $\lim g(x) = \infty$, write

$$
f(x)\,g(x) \;=\; \frac{f(x)}{1/g(x)} \;\;\text{(form }\tfrac{0}{0}\text{)} \qquad\text{or}\qquad \frac{g(x)}{1/f(x)} \;\;\text{(form }\tfrac{\infty}{\infty}\text{)}.
$$

Choose whichever rewriting leads to simpler derivatives.

### $\infty - \infty$

If $\lim f(x) = \lim g(x) = \infty$, combine into a single fraction using a common denominator appropriate to the expression. The result is a $\tfrac{0}{0}$ or $\tfrac{\infty}{\infty}$ form.

### $0^0$, $\infty^0$, $1^\infty$

If the limit $\lim h(x)^{k(x)}$ has one of these forms, take the natural logarithm:

$$
\ln\!\bigl(h(x)^{k(x)}\bigr) \;=\; k(x)\ln h(x).
$$

This is a $0 \cdot \infty$ form, which then reduces further. Once you find $\lim k(x)\ln h(x) = M$, the original limit is $e^M$.

## Examples

**Example 1 ($\tfrac{0}{0}$).** $\displaystyle\lim_{x \to 0} \dfrac{\sin x}{x}$.

Both numerator and denominator vanish at $0$. Apply L'Hôpital:

$$
\lim_{x \to 0} \frac{\sin x}{x} \;=\; \lim_{x \to 0} \frac{\cos x}{1} \;=\; 1.
$$

**Example 2 ($\tfrac{\infty}{\infty}$, iterated).** $\displaystyle\lim_{x \to \infty} \dfrac{x^n}{e^x}$ for fixed $n \in \mathbb{N}$.

Apply L'Hôpital $n$ times. Each application reduces the power of the numerator by one:

$$
\lim_{x \to \infty} \frac{x^n}{e^x} \;=\; \lim_{x \to \infty} \frac{n\,x^{n-1}}{e^x} \;=\; \cdots \;=\; \lim_{x \to \infty} \frac{n!}{e^x} \;=\; 0.
$$

Every polynomial is eventually dominated by the exponential.

**Example 3 ($1^\infty$).** $\displaystyle\lim_{x \to \infty} \!\left(1 + \dfrac{1}{x}\right)^{\!x}$.

Let $L$ denote the limit. Taking the logarithm converts the form to $0 \cdot \infty$:

$$
\ln L \;=\; \lim_{x \to \infty} x\ln\!\!\left(1 + \frac{1}{x}\right) \;=\; \lim_{x \to \infty} \frac{\ln(1 + 1/x)}{1/x} \quad \left(\text{form } \frac{0}{0}\right).
$$

Apply L'Hôpital (differentiating numerator and denominator with respect to $x$):

$$
\lim_{x \to \infty} \frac{\dfrac{-1/x^2}{1 + 1/x}}{-1/x^2} \;=\; \lim_{x \to \infty} \frac{1}{1 + 1/x} \;=\; 1,
$$

so $\ln L = 1$ and $L = e$.

## When the rule does not apply

L'Hôpital's rule **requires** $\lim f'(x)/g'(x)$ to exist. If $f'/g'$ oscillates without converging, the rule gives no information about $f/g$ — which may still have a perfectly good limit. A standard example is

$$
\lim_{x \to \infty} \frac{x + \sin x}{x}:
$$

$f'/g' = 1 + \cos x$ oscillates between $0$ and $2$, yet $f/g = 1 + (\sin x)/x \to 1$.

## Summary

- **L'Hôpital's rule**: if $f/g$ is a $\tfrac{0}{0}$ or $\tfrac{\infty}{\infty}$ indeterminate form at $a$ and $\lim f'/g'$ exists, then $\lim f/g = \lim f'/g'$.
- **Proof** ($\tfrac{0}{0}$ case): Cauchy's MVT gives $f(x)/g(x) = f'(c_x)/g'(c_x)$ for $c_x$ squeezed between $a$ and $x$; as $x \to a$ so does $c_x$.
- **Other indeterminate forms** reduce algebraically: $0\cdot\infty$ via a single fraction; $\infty - \infty$ by a common denominator; $0^0$, $\infty^0$, $1^\infty$ by taking a logarithm.
- The rule is silent when $\lim f'/g'$ does not exist; absence of that limit does not imply $\lim f/g$ fails.
