---
title: Chain Rule
summary: "The chain rule expresses the derivative of a composition: (f ∘ g)′(x) = f′(g(x)) · g′(x). This checkpoint proves the rule from the definition of the derivative, handles the subtle case where g′(x) = 0, and shows how it lets you differentiate any composition of differentiable functions."
prerequisites:
  - basis/math/calculus/differential/differentiable_function
  - basis/math/calculus/differential/basic_roles_of_dif
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

The [basic rules](./basic_roles_of_dif/) handle arithmetic combinations of functions, but they do not tell you how to differentiate a *composition* like $(x^3+1)^{100}$ or $\sin(x^2)$. The **chain rule** fills that gap: it expresses the derivative of $f \circ g$ in terms of the individual derivatives of $f$ and $g$.

## Statement

**Theorem (Chain rule).** Let $g$ be differentiable at $x$ and $f$ be differentiable at $g(x)$. Then $h \coloneqq f \circ g$ is differentiable at $x$ and

$$
h'(x) \;=\; f'(g(x)) \cdot g'(x). \tag{1}
$$

In Leibniz notation, with $u = g(x)$ and $y = f(u)$:

$$
\frac{dy}{dx} \;=\; \frac{dy}{du} \cdot \frac{du}{dx}.
$$

## Proof

The naive cancellation $\dfrac{f(g(x+k))-f(g(x))}{k} = \dfrac{f(g(x+k))-f(g(x))}{g(x+k)-g(x)} \cdot \dfrac{g(x+k)-g(x)}{k}$ fails when $g(x+k) = g(x)$ for some nonzero $k$ (the first factor is then $0/0$). The following **auxiliary-function argument** handles this case cleanly.

**Proof.** Define $\phi$ by

$$
\phi(u) \;=\; \begin{cases} \dfrac{f(u) - f(g(x))}{u - g(x)} & u \neq g(x), \\[6pt] f'(g(x)) & u = g(x). \end{cases}
$$

Since $f$ is differentiable at $g(x)$, $\phi$ is continuous at $g(x)$.

For any $k \neq 0$, setting $u = g(x+k)$:

$$
f(g(x+k)) - f(g(x)) \;=\; \phi(g(x+k)) \cdot \bigl(g(x+k) - g(x)\bigr),
$$

which holds whether or not $g(x+k) = g(x)$ (both sides are $0$ when equal). Dividing by $k$:

$$
\frac{f(g(x+k)) - f(g(x))}{k} \;=\; \phi(g(x+k)) \cdot \frac{g(x+k) - g(x)}{k}.
$$

As $k \to 0$: the right factor converges to $g'(x)$; since $g$ is continuous at $x$, $g(x+k) \to g(x)$, so $\phi(g(x+k)) \to \phi(g(x)) = f'(g(x))$. Therefore $(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$. $\square$

## Examples

### Power of a polynomial

$$
\bigl((x^3+1)^5\bigr)' \;=\; 5(x^3+1)^4 \cdot 3x^2 \;=\; 15x^2(x^3+1)^4.
$$

### Linear substitution

$$
\bigl((2x+1)^{100}\bigr)' \;=\; 100(2x+1)^{99} \cdot 2 \;=\; 200(2x+1)^{99}.
$$

### Abstract composition

If $f$ is differentiable and $g(x) = f(x^2 + 3x)$, then $g'(x) = f'(x^2+3x)\cdot(2x+3)$.

## Summary

- **Chain rule**: $(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$.
- The proof uses an auxiliary function $\phi$ to avoid division by zero when $g(x+k) = g(x)$.
- In Leibniz notation: $\dfrac{dy}{dx} = \dfrac{dy}{du} \cdot \dfrac{du}{dx}$.
