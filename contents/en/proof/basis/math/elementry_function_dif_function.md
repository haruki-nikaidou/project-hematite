---
title: Differentiation of Elementary Functions
summary: ""
prerequisites:
  - basis/math/analysis/functions/elementary_function
  - basis/math/calculus/differential/basic_roles_of_dif
  - basis/math/calculus/differential/chain_rule
  - basis/math/calculus/differential/dif_inv_function
aliases: []
tags:
  - Proof
  - Differentiation
  - Elementary Function
updated: 2026-05-20
---

Every [elementary function](../../../../basis/math/analysis/functions/elementary_function/) is differentiable wherever it is defined, and its derivative is again elementary. This checkpoint collects the proofs: starting from two fundamental limits, you can derive the derivatives of the exponential, logarithm, all trigonometric and inverse trigonometric functions, and all hyperbolic and inverse hyperbolic functions.

## Two foundational limits

All the proofs below rest on two limits.

**Lemma 1.** $\displaystyle\lim_{h \to 0} \frac{e^h - 1}{h} = 1$.

*Proof.* Substitute $u = e^h - 1$, so $h = \ln(1+u)$ and $u \to 0$ as $h \to 0$:

$$
\frac{e^h - 1}{h} \;=\; \frac{u}{\ln(1+u)}.
$$

From the inequality $\dfrac{x}{1+x} \leq \ln(1+x) \leq x$ (valid for $x > -1$), dividing by $u > 0$:

$$
\frac{1}{1+u} \;\leq\; \frac{\ln(1+u)}{u} \;\leq\; 1.
$$

As $u \to 0^+$, the left side $\to 1$, so by the squeeze theorem $\ln(1+u)/u \to 1$. The same holds for $u \to 0^-$ by symmetry. Therefore $\dfrac{u}{\ln(1+u)} \to 1$. $\square$

**Lemma 2.** $\displaystyle\lim_{h \to 0} \frac{\sin h}{h} = 1$.

*Proof.* For $0 < h < \pi/2$, compare areas in a unit circle:

$$
\tfrac{1}{2}\sin h \;\leq\; \tfrac{h}{2} \;\leq\; \tfrac{1}{2}\tan h.
$$

Dividing by $\tfrac{1}{2}\sin h > 0$ and inverting:

$$
\cos h \;\leq\; \frac{\sin h}{h} \;\leq\; 1.
$$

As $h \to 0^+$, $\cos h \to 1$, so by the squeeze theorem $\sin h / h \to 1$. The case $h \to 0^-$ follows from $\sin(-h)/(-h) = \sin h/h$. $\square$

From Lemma 2 we also derive $\displaystyle\lim_{h \to 0}\frac{\cos h - 1}{h} = 0$, since

$$
\frac{\cos h - 1}{h} \;=\; -\frac{\sin(h/2)}{h/2} \cdot \sin(h/2) \;\to\; -1 \cdot 0 \;=\; 0.
$$

## Derivatives of the exponential and logarithm

### Natural exponential

$$
\frac{d}{dx}(e^x) \;=\; e^x.
$$

*Proof.* By Lemma 1:

$$
\lim_{h\to 0}\frac{e^{x+h}-e^x}{h} \;=\; e^x \lim_{h\to 0}\frac{e^h-1}{h} \;=\; e^x. \;\square
$$

### General exponential

For $a > 0$, $a \neq 1$, write $a^x = e^{x\ln a}$ and apply the chain rule:

$$
\frac{d}{dx}(a^x) \;=\; e^{x\ln a} \cdot \ln a \;=\; a^x \ln a.
$$

### Natural logarithm

Applying the [inverse function rule](../../../../basis/math/calculus/differential/dif_inv_function/) to $e^x$:

$$
\frac{d}{dx}(\ln x) \;=\; \frac{1}{e^{\ln x}} \;=\; \frac{1}{x}, \quad x > 0.
$$

### General power $x^\alpha$

For $x > 0$ and $\alpha \in \mathbb{R}$, write $x^\alpha = e^{\alpha \ln x}$ and apply the chain rule:

$$
\frac{d}{dx}(x^\alpha) \;=\; e^{\alpha\ln x} \cdot \frac{\alpha}{x} \;=\; \alpha x^{\alpha - 1}.
$$

This extends the integer power rule to all real exponents.

### General logarithm

By the change-of-base formula $\log_a x = \ln x / \ln a$:

$$
\frac{d}{dx}(\log_a x) \;=\; \frac{1}{x \ln a}.
$$

## Derivatives of trigonometric functions

### Sine

$$
\frac{d}{dx}(\sin x) \;=\; \cos x.
$$

*Proof.* Using the addition formula $\sin(x+h) = \sin x \cos h + \cos x \sin h$:

$$
\frac{\sin(x+h)-\sin x}{h} \;=\; \sin x \cdot \frac{\cos h - 1}{h} + \cos x \cdot \frac{\sin h}{h}.
$$

As $h \to 0$: $(\cos h - 1)/h \to 0$ and $(\sin h)/h \to 1$ by the lemmas, so the limit is $\cos x$. $\square$

### Cosine

$$
\frac{d}{dx}(\cos x) \;=\; -\sin x.
$$

*Proof.* Using $\cos(x+h) = \cos x \cos h - \sin x \sin h$:

$$
\frac{\cos(x+h)-\cos x}{h} \;=\; \cos x \cdot \frac{\cos h-1}{h} - \sin x \cdot \frac{\sin h}{h} \;\to\; -\sin x. \;\square
$$

### Tangent and cotangent

By the quotient rule applied to $\tan x = \sin x / \cos x$ and $\cot x = \cos x / \sin x$:

$$
\frac{d}{dx}(\tan x) \;=\; \frac{\cos^2 x + \sin^2 x}{\cos^2 x} \;=\; \sec^2 x, \qquad x \neq \tfrac{\pi}{2}+n\pi,
$$

$$
\frac{d}{dx}(\cot x) \;=\; -\csc^2 x, \qquad x \neq n\pi.
$$

## Derivatives of inverse trigonometric functions

All four follow from the [inverse function rule](../../../../basis/math/calculus/differential/dif_inv_function/) and Pythagorean identities.

| Function | Domain | Derivative |
|---|---|---|
| $\arcsin x$ | $(-1,1)$ | $\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arccos x$ | $(-1,1)$ | $\dfrac{-1}{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\mathbb{R}$ | $\dfrac{1}{1+x^2}$ |
| $\text{arccot}\, x$ | $\mathbb{R}$ | $\dfrac{-1}{1+x^2}$ |

The last entry: $(\cot x)' = -\csc^2 x = -(1+\cot^2 x)$, so at $x = \cot t$ the inverse function rule gives $(\text{arccot}\, x)' = -1/(1+x^2)$.

## Derivatives of hyperbolic functions

Recall $\sinh x = \dfrac{e^x-e^{-x}}{2}$ and $\cosh x = \dfrac{e^x+e^{-x}}{2}$. Differentiating term by term using $(e^x)' = e^x$ and $(e^{-x})' = -e^{-x}$:

$$
\frac{d}{dx}(\sinh x) \;=\; \cosh x, \qquad \frac{d}{dx}(\cosh x) \;=\; \sinh x.
$$

By the quotient rule on $\tanh x = \sinh x / \cosh x$:

$$
\frac{d}{dx}(\tanh x) \;=\; \frac{\cosh^2 x - \sinh^2 x}{\cosh^2 x} \;=\; \text{sech}^2 x.
$$

Similarly, $(\text{coth}\, x)' = -\text{csch}^2 x$ for $x \neq 0$.

## Derivatives of inverse hyperbolic functions

The logarithmic representations of inverse hyperbolic functions make their derivatives easy to compute.

**Arsinh.** Since $\text{arsinh}\, x = \ln(x+\sqrt{x^2+1})$:

$$
(\text{arsinh}\, x)' \;=\; \frac{1+\tfrac{x}{\sqrt{x^2+1}}}{x+\sqrt{x^2+1}} \;=\; \frac{\sqrt{x^2+1}+x}{(x+\sqrt{x^2+1})\sqrt{x^2+1}} \;=\; \frac{1}{\sqrt{x^2+1}}.
$$

**Arcosh.** For $x > 1$, $\text{arcosh}\, x = \ln(x+\sqrt{x^2-1})$:

$$
(\text{arcosh}\, x)' \;=\; \frac{1+\tfrac{x}{\sqrt{x^2-1}}}{x+\sqrt{x^2-1}} \;=\; \frac{1}{\sqrt{x^2-1}}.
$$

**Artanh.** For $|x| < 1$, $\text{artanh}\, x = \tfrac{1}{2}\ln\tfrac{1+x}{1-x}$:

$$
(\text{artanh}\, x)' \;=\; \tfrac{1}{2}\left(\frac{1}{1+x}+\frac{1}{1-x}\right) \;=\; \frac{1}{1-x^2}.
$$

## Summary

| Function | Derivative | Domain |
|---|---|---|
| $e^x$ | $e^x$ | $\mathbb{R}$ |
| $a^x$ | $a^x \ln a$ | $\mathbb{R}$ |
| $\ln x$ | $1/x$ | $x>0$ |
| $\log_a x$ | $1/(x\ln a)$ | $x>0$ |
| $x^\alpha$ | $\alpha x^{\alpha-1}$ | $x>0$ |
| $\sin x$ | $\cos x$ | $\mathbb{R}$ |
| $\cos x$ | $-\sin x$ | $\mathbb{R}$ |
| $\tan x$ | $\sec^2 x$ | $x\neq\pi/2+n\pi$ |
| $\cot x$ | $-\csc^2 x$ | $x\neq n\pi$ |
| $\arcsin x$ | $1/\sqrt{1-x^2}$ | $(-1,1)$ |
| $\arccos x$ | $-1/\sqrt{1-x^2}$ | $(-1,1)$ |
| $\arctan x$ | $1/(1+x^2)$ | $\mathbb{R}$ |
| $\text{arccot}\, x$ | $-1/(1+x^2)$ | $\mathbb{R}$ |
| $\sinh x$ | $\cosh x$ | $\mathbb{R}$ |
| $\cosh x$ | $\sinh x$ | $\mathbb{R}$ |
| $\tanh x$ | $\text{sech}^2 x$ | $\mathbb{R}$ |
| $\text{coth}\, x$ | $-\text{csch}^2 x$ | $x\neq 0$ |
| $\text{arsinh}\, x$ | $1/\sqrt{x^2+1}$ | $\mathbb{R}$ |
| $\text{arcosh}\, x$ | $1/\sqrt{x^2-1}$ | $x>1$ |
| $\text{artanh}\, x$ | $1/(1-x^2)$ | $\lvert x\rvert<1$ |
