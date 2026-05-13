---
title: Inverse Trigonometric Functions
summary: "Defines the six inverse trigonometric functions by restricting each trigonometric function to an interval where it becomes injective, and derives their derivatives using the inverse function theorem along with key identities such as arcsin x + arccos x = π/2."
prerequisites:
  - basis/math/analysis/functions/trigonometric_functions
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

You already know from [Trigonometric Functions](../trigonometric_functions/) that $\sin$, $\cos$, and $\tan$ each map an angle to a ratio. The natural inverse question is: given a ratio, which angle produced it? Answering it requires **inverse trigonometric functions** — but there is a catch. Because sine and cosine are periodic, they repeat every $2\pi$ and are therefore **not injective** on all of $\mathbb{R}$; a function with repeated outputs cannot be inverted globally. The standard remedy is to **restrict** each function to a smaller domain where it is strictly monotone and hence injective, and then invert it there.

## Arcsine

On the interval $\left[-\dfrac{\pi}{2},\ \dfrac{\pi}{2}\right]$, the sine function is strictly increasing from $-1$ to $1$ — every value in $[-1, 1]$ is achieved exactly once. This restriction is injective, so it has an inverse.

**Arcsine** is defined as

$$
\arcsin : [-1,\ 1] \to \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right],
$$

where $\arcsin x$ is the unique angle $\theta \in \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$ satisfying $\sin\theta = x$.

The inverse relationship yields two composition identities:

$$
\sin(\arcsin x) = x \quad \text{for all } x \in [-1,\ 1],
$$

$$
\arcsin(\sin\theta) = \theta \quad \text{for all } \theta \in \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right].
$$

The second identity holds only on the restricted interval. Outside it, $\arcsin(\sin\theta)$ gives the representative of $\theta$ inside $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$, not $\theta$ itself.

### Derivative of arcsine

Let $\theta = \arcsin x$, so $x = \sin\theta$ with $\theta \in \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$. Differentiating both sides with respect to $x$:

$$
1 = \cos\theta \cdot \frac{d\theta}{dx}.
$$

On $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$, cosine is non-negative, so $\cos\theta = \sqrt{1 - \sin^2\theta} = \sqrt{1 - x^2}$. Solving for $\dfrac{d\theta}{dx}$:

$$
\arcsin'(x) = \frac{1}{\sqrt{1 - x^2}}, \qquad x \in (-1,\ 1).
$$

The derivative is undefined at the endpoints $x = \pm 1$, where the graph of $\arcsin$ has a vertical tangent.

## Arccosine

On the interval $[0, \pi]$, the cosine function is strictly decreasing from $1$ to $-1$. The restriction is injective.

**Arccosine** is defined as

$$
\arccos : [-1,\ 1] \to [0,\ \pi],
$$

where $\arccos x$ is the unique angle $\theta \in [0, \pi]$ satisfying $\cos\theta = x$.

### Derivative of arccosine

Let $\theta = \arccos x$, so $x = \cos\theta$. Differentiating with respect to $x$ gives $1 = -\sin\theta \cdot \dfrac{d\theta}{dx}$. On $[0, \pi]$, sine is non-negative, so $\sin\theta = \sqrt{1 - \cos^2\theta} = \sqrt{1 - x^2}$. Solving:

$$
\arccos'(x) = -\frac{1}{\sqrt{1 - x^2}}, \qquad x \in (-1,\ 1).
$$

The negative sign reflects the fact that $\arccos$ is strictly decreasing.

### The arcsin–arccos identity

For all $x \in [-1, 1]$:

$$
\arcsin x + \arccos x = \frac{\pi}{2}.
$$

*Proof.* Let $\alpha = \arcsin x$, so $\sin\alpha = x$ and $\alpha \in \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$. Then

$$
\cos\!\left(\frac{\pi}{2} - \alpha\right) = \sin\alpha = x,
$$

and $\dfrac{\pi}{2} - \alpha \in [0, \pi]$. By the uniqueness in the definition of $\arccos$, it follows that $\arccos x = \dfrac{\pi}{2} - \alpha$, which rearranges to the claimed identity. $\square$

This identity lets you convert between $\arcsin$ and $\arccos$ without any recomputation, and it also explains why their derivatives are negatives of each other.

## Arctangent

On the open interval $\left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$, the tangent function is strictly increasing and takes every real value exactly once. (The endpoints are excluded because $\tan$ is undefined there.)

**Arctangent** is defined as

$$
\arctan : \mathbb{R} \to \left(-\frac{\pi}{2},\ \frac{\pi}{2}\right),
$$

where $\arctan x$ is the unique angle $\theta \in \left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$ satisfying $\tan\theta = x$.

Unlike $\arcsin$ and $\arccos$, the domain of $\arctan$ is all of $\mathbb{R}$. The output is bounded, however, so the function has two horizontal asymptotes:

$$
\lim_{x \to +\infty} \arctan x = \frac{\pi}{2}, \qquad \lim_{x \to -\infty} \arctan x = -\frac{\pi}{2}.
$$

### Derivative of arctangent

Let $\theta = \arctan x$, so $\tan\theta = x$. Differentiating with respect to $x$:

$$
\sec^2\!\theta \cdot \frac{d\theta}{dx} = 1.
$$

Using the Pythagorean identity $\sec^2\theta = 1 + \tan^2\theta = 1 + x^2$:

$$
\arctan'(x) = \frac{1}{1 + x^2}, \qquad x \in \mathbb{R}.
$$

This is defined for all real $x$ and is always positive, confirming that $\arctan$ is strictly increasing on its entire domain.

## Other inverse trigonometric functions

The remaining three inverse trigonometric functions are obtained by restricting $\cot$, $\sec$, and $\csc$ to standard intervals of injectivity.

**Arccotangent** is the inverse of $\cot$ restricted to $(0, \pi)$:

$$
\operatorname{arccot} : \mathbb{R} \to (0,\ \pi).
$$

**Arcsecant** is the inverse of $\sec$ restricted to $[0, \pi] \setminus \left\{\dfrac{\pi}{2}\right\}$:

$$
\operatorname{arcsec} : (-\infty, -1] \cup [1, +\infty) \to [0,\ \pi] \setminus \left\{\frac{\pi}{2}\right\}.
$$

**Arccosecant** is the inverse of $\csc$ restricted to $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right] \setminus \{0\}$:

$$
\operatorname{arccsc} : (-\infty, -1] \cup [1, +\infty) \to \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right] \setminus \{0\}.
$$

These three arise less often in practice. When you encounter them, they can usually be rewritten in terms of $\arcsin$, $\arccos$, or $\arctan$.

## Table of derivatives

The derivatives of all six inverse trigonometric functions, collected for reference:

| Function | Derivative | Domain of derivative |
|---|---|---|
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ | $(-1,\ 1)$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ | $(-1,\ 1)$ |
| $\arctan x$ | $\dfrac{1}{1+x^2}$ | $\mathbb{R}$ |
| $\operatorname{arccot} x$ | $-\dfrac{1}{1+x^2}$ | $\mathbb{R}$ |
| $\operatorname{arcsec} x$ | $\dfrac{1}{|x|\sqrt{x^2-1}}$ | $|x| > 1$ |
| $\operatorname{arccsc} x$ | $-\dfrac{1}{|x|\sqrt{x^2-1}}$ | $|x| > 1$ |

Notice the pattern: in each pair, $\arcsin$ and $\arccos$, $\arctan$ and $\operatorname{arccot}$, $\operatorname{arcsec}$ and $\operatorname{arccsc}$, the derivatives are negatives of each other. This reflects the complementary identities $\arcsin x + \arccos x = \dfrac{\pi}{2}$ and $\arctan x + \operatorname{arccot} x = \dfrac{\pi}{2}$.

## Summary

- Because $\sin$, $\cos$, and $\tan$ are not injective on all of $\mathbb{R}$, their inverses require **restricting** to a carefully chosen interval of strict monotonicity.
- **Arcsine**: $\arcsin : [-1, 1] \to \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$, with derivative $\dfrac{1}{\sqrt{1-x^2}}$ on $(-1, 1)$.
- **Arccosine**: $\arccos : [-1, 1] \to [0, \pi]$, with derivative $-\dfrac{1}{\sqrt{1-x^2}}$ on $(-1, 1)$; satisfies the identity $\arcsin x + \arccos x = \dfrac{\pi}{2}$.
- **Arctangent**: $\arctan : \mathbb{R} \to \left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$, with derivative $\dfrac{1}{1+x^2}$ on $\mathbb{R}$; has horizontal asymptotes $\pm\dfrac{\pi}{2}$.
- The three additional inverses $\operatorname{arccot}$, $\operatorname{arcsec}$, $\operatorname{arccsc}$ follow the same pattern with analogous restricted domains.
- All six derivatives are derived via the **inverse function theorem** (differentiate the defining identity $f(\theta) = x$ with respect to $x$) and result in algebraic expressions, even though the original trigonometric functions are transcendental.
