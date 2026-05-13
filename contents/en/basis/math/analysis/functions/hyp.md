---
title: Hyperbolic Functions and Their Inverses
summary: "Defines the hyperbolic functions sinh, cosh, and tanh from the exponential function, establishes their fundamental identity, addition formulas, and derivatives, then derives the inverse hyperbolic functions as closed-form logarithmic expressions."
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/functions/log
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

Just as the pair $(\cos\theta, \sin\theta)$ traces the unit circle $x^2 + y^2 = 1$ as $\theta$ varies, the **hyperbolic functions** parametrize the unit hyperbola $x^2 - y^2 = 1$: the point $(\cosh t, \sinh t)$ lies on that hyperbola for every real $t$. Beyond the geometric picture, they arise naturally as solutions to the differential equation $y'' = y$, describe the shape of a hanging cable (the *catenary*), and appear in special relativity through Lorentz boosts. Unlike their trigonometric counterparts, they are not periodic — they are built directly from the [exponential function](../exp/).

## Definitions

**Hyperbolic cosine** and **hyperbolic sine** are defined by

$$
\cosh x \coloneqq \frac{e^x + e^{-x}}{2}, \qquad \sinh x \coloneqq \frac{e^x - e^{-x}}{2}. \tag{1}
$$

You can think of $\cosh x$ as the *even part* and $\sinh x$ as the *odd part* of the exponential, since $e^x = \cosh x + \sinh x$ and $e^{-x} = \cosh x - \sinh x$.

The remaining four hyperbolic functions are defined as ratios built from these two:

$$
\tanh x \coloneqq \frac{\sinh x}{\cosh x}, \qquad
\operatorname{coth} x \coloneqq \frac{\cosh x}{\sinh x},
$$

$$
\operatorname{sech} x \coloneqq \frac{1}{\cosh x}, \qquad
\operatorname{csch} x \coloneqq \frac{1}{\sinh x}.
$$

Note that $\operatorname{coth} x$ and $\operatorname{csch} x$ are undefined at $x = 0$, where $\sinh 0 = 0$.

## Fundamental identity

The central algebraic relation among the hyperbolic functions is

$$
\cosh^2 x - \sinh^2 x = 1.
$$

*Derivation.* Substituting from definitions (1):

$$
\cosh^2 x - \sinh^2 x
= \left(\frac{e^x + e^{-x}}{2}\right)^{\!2} - \left(\frac{e^x - e^{-x}}{2}\right)^{\!2}
= \frac{(e^x + e^{-x})^2 - (e^x - e^{-x})^2}{4}.
$$

Using the algebraic identity $(a + b)^2 - (a - b)^2 = 4ab$ with $a = e^x$ and $b = e^{-x}$, the numerator becomes $4e^x e^{-x} = 4e^0 = 4$. Dividing by $4$ gives $1$. $\square$

This mirrors the circular identity $\cos^2\theta + \sin^2\theta = 1$, and it confirms that $(\cosh t,\, \sinh t)$ satisfies $x^2 - y^2 = 1$ for every real $t$.

## Addition formulas

For all real $x$ and $y$:

$$
\cosh(x + y) = \cosh x \cosh y + \sinh x \sinh y,
$$

$$
\sinh(x + y) = \sinh x \cosh y + \cosh x \sinh y.
$$

You can verify these by substituting definitions (1) and expanding. Compare with the circular formulas $\cos(x+y) = \cos x\cos y - \sin x\sin y$ and $\sin(x+y) = \sin x\cos y + \cos x\sin y$: the $\cosh$ addition formula has a $+$ sign where the cosine formula has a $-$. This sign flip is a direct consequence of the sign difference in the fundamental identity ($\cosh^2 - \sinh^2 = 1$ versus $\cos^2 + \sin^2 = 1$).

## Derivatives

Differentiating definitions (1) term by term with respect to $x$:

$$
(\cosh x)' = \frac{e^x - e^{-x}}{2} = \sinh x,
\qquad
(\sinh x)' = \frac{e^x + e^{-x}}{2} = \cosh x.
$$

So $\sinh$ and $\cosh$ are each other's derivatives — they swap, in contrast to $\sin$ and $\cos$, which alternate with a sign change under each differentiation.

For $\tanh$, apply the quotient rule and then use the fundamental identity:

$$
(\tanh x)'
= \frac{(\sinh x)'\cosh x - \sinh x\,(\cosh x)'}{\cosh^2 x}
= \frac{\cosh^2 x - \sinh^2 x}{\cosh^2 x}
= \frac{1}{\cosh^2 x}
= \operatorname{sech}^2 x.
$$

Applying the fundamental identity once more gives the alternative form $\operatorname{sech}^2 x = 1 - \tanh^2 x$, so

$$
(\tanh x)' = \operatorname{sech}^2 x = 1 - \tanh^2 x.
$$

The derivatives of the remaining three functions follow from the quotient and chain rules:

$$
(\operatorname{coth} x)' = -\operatorname{csch}^2 x, \qquad
(\operatorname{sech} x)' = -\operatorname{sech} x\tanh x, \qquad
(\operatorname{csch} x)' = -\operatorname{csch} x\operatorname{coth} x.
$$

## Properties of cosh and sinh

- $\cosh$ is **even**: $\cosh(-x) = \cosh x$. By the AM–GM inequality, $e^x + e^{-x} \geq 2\sqrt{e^x \cdot e^{-x}} = 2$, so $\cosh x \geq 1$ for all $x \in \mathbb{R}$, with equality only at $x = 0$. The graph of $y = \cosh x$ is a *catenary* — the shape assumed by a uniform flexible chain hanging under gravity.
- $\sinh$ is **odd**: $\sinh(-x) = -\sinh x$. It is strictly increasing on all of $\mathbb{R}$ (since $(\sinh x)' = \cosh x \geq 1 > 0$), with range $\mathbb{R}$.
- $\tanh$ is odd and strictly increasing, mapping $\mathbb{R}$ onto the open interval $(-1, 1)$. As $x \to \pm\infty$, $e^{-|x|} \to 0$ forces $\tanh x \to \pm 1$, so $y = \pm 1$ are horizontal asymptotes.

## Inverse hyperbolic functions

Because $\sinh$ is strictly increasing on $\mathbb{R}$, it has a global inverse. For $\cosh$, you must restrict to $[0, \infty)$, where it is strictly increasing. For $\tanh$ the natural domain is $\mathbb{R}$ with range $(-1, 1)$.

The remarkable feature is that all three inverses have **closed-form expressions** in terms of the [logarithm](../log/).

### Arsinh

Set $y = \sinh x = \dfrac{e^x - e^{-x}}{2}$ and solve for $x$. Multiplying both sides by $2e^x$:

$$
e^{2x} - 2y\,e^x - 1 = 0.
$$

This is a quadratic in $e^x$. The quadratic formula gives $e^x = y \pm \sqrt{y^2 + 1}$. Since $e^x > 0$ and $\sqrt{y^2+1} > |y|$, only the positive root is admissible. Taking logarithms:

$$
\operatorname{arsinh} x \coloneqq \ln\!\left(x + \sqrt{x^2 + 1}\right), \qquad x \in \mathbb{R}.
$$

### Arcosh

Set $y = \cosh x = \dfrac{e^x + e^{-x}}{2}$ with $x \geq 0$ and solve. Multiplying by $2e^x$:

$$
e^{2x} - 2y\,e^x + 1 = 0,
$$

so $e^x = y \pm \sqrt{y^2 - 1}$. This requires $y \geq 1$. For $x \geq 0$ the larger root corresponds to $x \geq 0$, so we choose the $+$ sign. Taking logarithms:

$$
\operatorname{arcosh} x \coloneqq \ln\!\left(x + \sqrt{x^2 - 1}\right), \qquad x \geq 1.
$$

### Artanh

Set $y = \tanh x = \dfrac{e^x - e^{-x}}{e^x + e^{-x}}$ and solve. Writing $u = e^{2x}$:

$$
y = \frac{u - 1}{u + 1}
\quad\Longrightarrow\quad
y(u + 1) = u - 1
\quad\Longrightarrow\quad
u = \frac{1 + y}{1 - y}.
$$

Since $u = e^{2x}$, taking logarithms gives $2x = \ln\!\dfrac{1+y}{1-y}$, so:

$$
\operatorname{artanh} x \coloneqq \frac{1}{2}\ln\frac{1 + x}{1 - x}, \qquad |x| < 1.
$$

The restriction $|x| < 1$ matches the range of $\tanh$ and keeps both $1 + x$ and $1 - x$ strictly positive inside the logarithm.

## Derivatives of inverse hyperbolic functions

You can find these derivatives either by differentiating the logarithmic expressions directly or by applying the inverse function theorem. Both routes are shown below.

### Derivative of arsinh

Differentiating $\operatorname{arsinh} x = \ln\!\left(x + \sqrt{x^2+1}\right)$:

$$
(\operatorname{arsinh} x)'
= \frac{1}{x + \sqrt{x^2+1}} \cdot \left(1 + \frac{x}{\sqrt{x^2+1}}\right)
= \frac{1}{x + \sqrt{x^2+1}} \cdot \frac{x + \sqrt{x^2+1}}{\sqrt{x^2+1}}
= \frac{1}{\sqrt{x^2+1}}.
$$

$$
\operatorname{arsinh}'(x) = \frac{1}{\sqrt{x^2 + 1}}, \qquad x \in \mathbb{R}.
$$

### Derivative of arcosh

Differentiating $\operatorname{arcosh} x = \ln\!\left(x + \sqrt{x^2-1}\right)$ for $x > 1$:

$$
(\operatorname{arcosh} x)'
= \frac{1}{x + \sqrt{x^2-1}} \cdot \left(1 + \frac{x}{\sqrt{x^2-1}}\right)
= \frac{1}{x + \sqrt{x^2-1}} \cdot \frac{x + \sqrt{x^2-1}}{\sqrt{x^2-1}}
= \frac{1}{\sqrt{x^2-1}}.
$$

$$
\operatorname{arcosh}'(x) = \frac{1}{\sqrt{x^2 - 1}}, \qquad x > 1.
$$

### Derivative of artanh

Rewrite $\operatorname{artanh} x = \dfrac{1}{2}\ln(1+x) - \dfrac{1}{2}\ln(1-x)$ and differentiate for $|x| < 1$:

$$
(\operatorname{artanh} x)'
= \frac{1}{2} \cdot \frac{1}{1+x} + \frac{1}{2} \cdot \frac{1}{1-x}
= \frac{1}{2} \cdot \frac{(1-x) + (1+x)}{(1+x)(1-x)}
= \frac{1}{1 - x^2}.
$$

$$
\operatorname{artanh}'(x) = \frac{1}{1 - x^2}, \qquad |x| < 1.
$$

Compare this with $\arctan'(x) = \dfrac{1}{1+x^2}$ from [Inverse Trigonometric Functions](../inv_trigonometric_functions/): the only difference is the sign in the denominator, a reflection of the $\cosh^2 - \sinh^2 = 1$ identity versus $\cos^2 + \sin^2 = 1$.

## Table of derivatives

Derivatives of the six hyperbolic functions, collected for reference:

| Function | Derivative |
|---|---|
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\operatorname{sech}^2 x$ |
| $\operatorname{coth} x$ | $-\operatorname{csch}^2 x$ |
| $\operatorname{sech} x$ | $-\operatorname{sech} x\tanh x$ |
| $\operatorname{csch} x$ | $-\operatorname{csch} x\operatorname{coth} x$ |

## Summary

- The **hyperbolic functions** are defined via the exponential: $\cosh x \coloneqq \dfrac{e^x+e^{-x}}{2}$, $\sinh x \coloneqq \dfrac{e^x-e^{-x}}{2}$, and $\tanh x \coloneqq \dfrac{\sinh x}{\cosh x}$.
- The **fundamental identity** $\cosh^2 x - \sinh^2 x = 1$ mirrors the Pythagorean identity and shows that $(\cosh t, \sinh t)$ lies on the unit hyperbola.
- **Derivatives**: $(\sinh x)' = \cosh x$, $(\cosh x)' = \sinh x$, $(\tanh x)' = \operatorname{sech}^2 x$.
- $\cosh$ is **even** and satisfies $\cosh x \geq 1$; $\sinh$ is **odd** and strictly increasing with range $\mathbb{R}$; $\tanh$ maps $\mathbb{R}$ onto $(-1, 1)$.
- The **inverse hyperbolic functions** have closed-form logarithmic expressions derived by solving for $x$ algebraically:
  - $\operatorname{arsinh} x = \ln\!\left(x + \sqrt{x^2+1}\right)$, defined on $\mathbb{R}$.
  - $\operatorname{arcosh} x = \ln\!\left(x + \sqrt{x^2-1}\right)$, defined on $[1, \infty)$.
  - $\operatorname{artanh} x = \dfrac{1}{2}\ln\dfrac{1+x}{1-x}$, defined on $(-1, 1)$.
- Their derivatives — $\dfrac{1}{\sqrt{x^2+1}}$, $\dfrac{1}{\sqrt{x^2-1}}$, $\dfrac{1}{1-x^2}$ — closely parallel those of the inverse trigonometric functions, differing only in the signs under the square root and in the denominator.
