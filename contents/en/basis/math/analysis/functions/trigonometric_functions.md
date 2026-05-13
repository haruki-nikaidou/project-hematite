---
title: Trigonometric Functions
summary: "Defines sine and cosine rigorously as power series, derives their derivatives, the Pythagorean identity, and the addition formulas, uses these to define π analytically, and introduces the full family of trigonometric functions with their derivatives."
prerequisites:
  - basis/math/analysis/functions/exp
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

Angles, oscillations, and rotations all involve the same pair of functions — **sine** and **cosine**. At the basis level these are most cleanly defined as specific power series, in direct parallel to how $\exp$ was defined in [Exponential Functions](../exp/). This approach avoids any appeal to geometry and gives you precise formulas for derivatives, identities, and even the definition of $\pi$ — all from first principles.

## Power series definitions

Recall from [Exponential Functions](../exp/) that $\exp(x) = \sum_{k=0}^{\infty} x^k/k!$ converges absolutely for every $x \in \mathbb{R}$. Define two new functions by splitting this series into its even-indexed and odd-indexed terms, each with alternating signs:

$$
\cos x \;\coloneqq\; \sum_{k=0}^{\infty} \frac{(-1)^k\,x^{2k}}{(2k)!}
= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots \tag{1}
$$

$$
\sin x \;\coloneqq\; \sum_{k=0}^{\infty} \frac{(-1)^k\,x^{2k+1}}{(2k+1)!}
= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots \tag{2}
$$

Both series converge absolutely for all $x \in \mathbb{R}$: the ratio test gives a ratio $|x|^2\!/\bigl((2k+1)(2k+2)\bigr) \to 0$ as $k \to \infty$, so convergence is absolute and uniform on every bounded interval. Uniform convergence justifies differentiating the series term-by-term.

At $x = 0$: the constant term of the cosine series is $1$ and all other terms vanish, giving $\cos(0) = 1$. The sine series starts with $x$, so $\sin(0) = 0$.

## Motivation: Euler's formula

Why these particular series? Substitute $ix$ (where $i^2 = -1$) formally into the exponential series:

$$
\exp(ix) = \sum_{k=0}^{\infty} \frac{(ix)^k}{k!}.
$$

Separating even and odd powers, and using $i^{2m} = (-1)^m$ and $i^{2m+1} = i(-1)^m$, the real part is exactly the cosine series $(1)$ and the imaginary part is $i$ times the sine series $(2)$. This yields **Euler's formula**:

$$
\exp(ix) = \cos x + i\sin x. \tag{3}
$$

At the basis level, treat $(3)$ as a motivating insight rather than a fully rigorous statement (a complete treatment requires extending $\exp$ to the complex numbers). The formula makes the connection between exponentials and trigonometry vivid and will let you derive the addition formulas below in a single line.

The special case $x = \pi$ gives **Euler's identity** $\exp(i\pi) + 1 = 0$, once $\pi$ is defined — which you will do shortly.

## Derivatives

Differentiate the series $(1)$ and $(2)$ term-by-term:

$$
\frac{d}{dx}\cos x
= \sum_{k=1}^{\infty} \frac{(-1)^k \cdot 2k \cdot x^{2k-1}}{(2k)!}
= -\sum_{j=0}^{\infty} \frac{(-1)^j\,x^{2j+1}}{(2j+1)!}
= -\sin x,
$$

$$
\frac{d}{dx}\sin x
= \sum_{k=0}^{\infty} \frac{(-1)^k(2k+1)x^{2k}}{(2k+1)!}
= \sum_{k=0}^{\infty} \frac{(-1)^k\,x^{2k}}{(2k)!}
= \cos x.
$$

In summary:

$$
(\cos x)' = -\sin x, \qquad (\sin x)' = \cos x. \tag{4}
$$

Applying $(4)$ twice: $(\cos x)'' = -\cos x$ and $(\sin x)'' = -\sin x$. Both functions therefore satisfy the **simple harmonic oscillator equation** $y'' + y = 0$.

## The Pythagorean identity

**Theorem.** For all $x \in \mathbb{R}$:

$$
\cos^2 x + \sin^2 x = 1. \tag{5}
$$

*Proof.* Let $f(x) \coloneqq \cos^2 x + \sin^2 x$. Differentiate using $(4)$:

$$
f'(x) = 2\cos x \cdot (-\sin x) + 2\sin x \cdot \cos x = 0.
$$

So $f$ is constant on $\mathbb{R}$. Evaluating at $x = 0$:

$$
f(0) = \cos^2(0) + \sin^2(0) = 1^2 + 0^2 = 1.
$$

Therefore $f(x) = 1$ for all $x$. $\square$

The **Pythagorean identity** $(5)$ is the source of almost every trigonometric manipulation you will encounter. One immediate consequence: $|\cos x| \leq 1$ and $|\sin x| \leq 1$ for all $x$.

## Addition formulas

**Theorem.** For all $x, y \in \mathbb{R}$:

$$
\cos(x + y) = \cos x \cos y - \sin x \sin y, \tag{6}
$$

$$
\sin(x + y) = \sin x \cos y + \cos x \sin y. \tag{7}
$$

*Proof using Euler's formula.* Multiply the two complex exponentials:

$$
\exp(i(x + y)) = \exp(ix)\exp(iy) = (\cos x + i\sin x)(\cos y + i\sin y).
$$

Expanding the right side:

$$
= (\cos x\cos y - \sin x\sin y) + i(\sin x\cos y + \cos x\sin y).
$$

The left side equals $\cos(x+y) + i\sin(x+y)$ by $(3)$. Equating real and imaginary parts gives $(6)$ and $(7)$. $\square$

Setting $y = x$ in $(6)$ gives the **double-angle formula** $\cos(2x) = \cos^2 x - \sin^2 x$. Combined with the Pythagorean identity $(5)$, this also gives $\cos(2x) = 2\cos^2 x - 1 = 1 - 2\sin^2 x$.

## Defining $\pi$

The cosine series $(1)$ gives $\cos(0) = 1 > 0$. You can show that $\cos(2) < 0$ by examining the alternating partial sums: grouping consecutive pairs shows every partial sum from the second term onward is negative when $x = 2$, and a careful estimate gives $\cos(2) < -\tfrac{1}{3}$.

Since $\cos$ is continuous (its series converges uniformly), the **Intermediate Value Theorem** guarantees at least one zero of $\cos$ in the interval $(0, 2)$.

**Definition.** $\boldsymbol{\pi}$ is defined as twice the smallest positive zero of $\cos$:

$$
\pi \;\coloneqq\; 2\cdot\min\{\,x > 0 \mid \cos x = 0\,\}. \tag{8}
$$

From this definition, $\cos(\pi/2) = 0$. Applying the Pythagorean identity $(5)$ at $x = \pi/2$ forces $\sin^2(\pi/2) = 1$. Because $\sin$ is positive on $(0,\,\pi/2)$ — its derivative there equals $\cos > 0$, and $\sin(0) = 0$ — you get $\sin(\pi/2) = 1$.

Using the addition formulas $(6)$ and $(7)$ with $y = \pi/2$:

$$
\cos\!\left(x + \frac{\pi}{2}\right) = -\sin x, \qquad
\sin\!\left(x + \frac{\pi}{2}\right) = \cos x.
$$

Applying this shift twice gives $\cos(x + \pi) = -\cos x$ and $\sin(x + \pi) = -\sin x$, and one more application gives periodicity.

## Periodicity

**Theorem.** For all $x \in \mathbb{R}$:

$$
\cos(x + 2\pi) = \cos x, \qquad \sin(x + 2\pi) = \sin x. \tag{9}
$$

*Proof.* Apply $\cos(x + \pi) = -\cos x$ twice:

$$
\cos(x + 2\pi) = \cos\bigl((x+\pi)+\pi\bigr) = -\cos(x+\pi) = -(-\cos x) = \cos x,
$$

and similarly for $\sin$. $\square$

In fact $2\pi$ is the *minimal* period of both functions, though proving this requires confirming that $\cos$ has no positive zeros smaller than $\pi/2$.

## Values at special angles

The definitions and identities you have developed so far pin down the values at the standard angles:

| $x$ | $\cos x$ | $\sin x$ |
|-----|----------|----------|
| $0$ | $1$ | $0$ |
| $\pi/6$ | $\sqrt{3}/2$ | $1/2$ |
| $\pi/4$ | $1/\sqrt{2}$ | $1/\sqrt{2}$ |
| $\pi/3$ | $1/2$ | $\sqrt{3}/2$ |
| $\pi/2$ | $0$ | $1$ |
| $\pi$ | $-1$ | $0$ |

For $\pi/4$: the addition formula with $x = y = \pi/4$ and $\cos(\pi/2) = 0$ gives $\cos^2(\pi/4) = \sin^2(\pi/4)$; combined with $(5)$, both equal $1/\sqrt{2}$.

For $\pi/3$: the double-angle formula gives $\cos(2\pi/3) = 2\cos^2(\pi/3) - 1$. Because $\cos(2\pi/3) = \cos(\pi - \pi/3) = -\cos(\pi/3)$ (a consequence of $\cos(x+\pi) = -\cos x$), solving $-\cos(\pi/3) = 2\cos^2(\pi/3) - 1$ yields $\cos(\pi/3) = 1/2$ and then $\sin(\pi/3) = \sqrt{3}/2$ from $(5)$.

## Other trigonometric functions

Four more functions are defined as ratios and reciprocals of sine and cosine.

**Tangent:**

$$
\tan x \;\coloneqq\; \frac{\sin x}{\cos x}, \qquad \cos x \neq 0.
$$

The domain of $\tan$ is $\mathbb{R} \setminus \{\pi/2 + k\pi \mid k \in \mathbb{Z}\}$ and its minimal period is $\pi$.

**Cotangent:**

$$
\cot x \;\coloneqq\; \frac{\cos x}{\sin x}, \qquad \sin x \neq 0.
$$

**Secant** and **cosecant** are the reciprocals:

$$
\sec x \;\coloneqq\; \frac{1}{\cos x}, \qquad \csc x \;\coloneqq\; \frac{1}{\sin x}.
$$

### Derivatives of $\tan$ and $\cot$

Apply the quotient rule, then use the Pythagorean identity $(5)$:

$$
(\tan x)' = \frac{\cos x \cdot \cos x - \sin x \cdot (-\sin x)}{\cos^2 x}
= \frac{\cos^2 x + \sin^2 x}{\cos^2 x}
= \frac{1}{\cos^2 x} = \sec^2 x. \tag{10}
$$

$$
(\cot x)' = \frac{-\sin x \cdot \sin x - \cos x \cdot \cos x}{\sin^2 x}
= -\frac{\cos^2 x + \sin^2 x}{\sin^2 x}
= -\frac{1}{\sin^2 x} = -\csc^2 x. \tag{11}
$$

The inverse trigonometric functions — $\arcsin$, $\arccos$, $\arctan$ — are defined and studied in [Inverse Trigonometric Functions](../inv_trigonometric_functions/).

## Summary

- **Cosine** and **sine** are defined by the absolutely convergent power series $(1)$ and $(2)$; at $x = 0$, $\cos(0) = 1$ and $\sin(0) = 0$.
- **Euler's formula** $\exp(ix) = \cos x + i\sin x$ arises by separating real and imaginary parts of the exponential series after substituting $ix$.
- **Derivatives:** $(\cos x)' = -\sin x$ and $(\sin x)' = \cos x$; both functions satisfy $y'' + y = 0$.
- **Pythagorean identity:** $\cos^2 x + \sin^2 x = 1$, proved by showing the derivative of the left side is $0$ and evaluating at $x = 0$.
- **Addition formulas** $(6)$ and $(7)$ are derived by expanding $\exp(ix)\exp(iy) = \exp(i(x+y))$.
- **$\pi$** is defined as twice the smallest positive zero of $\cos$; its existence follows from the Intermediate Value Theorem applied to the continuous function $\cos$.
- **Periodicity:** $\cos$ and $\sin$ each have period $2\pi$.
- **Key values:** $\cos(\pi/2) = 0$, $\sin(\pi/2) = 1$, $\cos(\pi) = -1$, $\sin(\pi) = 0$, $\cos(\pi/4) = \sin(\pi/4) = 1/\sqrt{2}$, $\cos(\pi/3) = 1/2$, $\sin(\pi/3) = \sqrt{3}/2$.
- $\tan x = \sin x/\cos x$ with $(\tan x)' = \sec^2 x$; $\cot x = \cos x/\sin x$ with $(\cot x)' = -\csc^2 x$.
