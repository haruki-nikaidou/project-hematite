---
title: Elementary Functions
summary: "Surveys the complete family of elementary functions — polynomials, rational and algebraic functions, exponentials, logarithms, trigonometric, inverse trigonometric, and hyperbolic functions — and defines precisely what it means for a function to be elementary through finite combinations of arithmetic operations and composition."
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/functions/log
  - basis/math/analysis/functions/trigonometric_functions
  - basis/math/analysis/functions/inv_trigonometric_functions
  - basis/math/analysis/functions/hyp
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

Through the preceding checkpoints you have met the main functions of classical analysis one by one: polynomials, the exponential, the logarithm, the trigonometric functions, and their inverses. Now that all the pieces are in hand, it is time to step back and ask: what exactly do these functions have in common? The answer is captured by the notion of an **elementary function** — a function that can be expressed in *closed form* using a finite combination of the ingredients above.

## The building blocks

The elementary functions rest on five families.

### Polynomials and rational functions

A **polynomial** $p(x) = a_n x^n + \cdots + a_0$ uses only addition and multiplication of the identity function $x$ with real constants. Polynomials are the simplest elementary functions; see [Polynomial Functions](../polynomial_functions/).

A **rational function** is a ratio $\tfrac{p(x)}{q(x)}$ of two polynomials (with $q \not\equiv 0$). Wherever $q(x) \neq 0$ it is perfectly well-defined, and it inherits all the algebraic structure of polynomials.

### Algebraic functions

A function $f$ is **algebraic** if it satisfies a polynomial equation in $f$ and $x$ with polynomial coefficients, i.e., there exist polynomials $p_0, \ldots, p_n$ (not all zero) such that

$$p_n(x)\,f(x)^n + p_{n-1}(x)\,f(x)^{n-1} + \cdots + p_0(x) = 0. \tag{1}$$

Every polynomial and every rational function is algebraic (take $n = 1$ in $(1)$). More genuinely, $n$-th roots such as $\sqrt{x}$, $\sqrt[3]{x-1}$, and nested radicals like $\sqrt{1 + \sqrt{x}}$ are algebraic — they satisfy equations of the form $f^n = g(x)$ for a rational function $g$.

A function that is *not* algebraic is called **transcendental**.

### Exponential and logarithmic functions

The **exponential function** $\exp(x) = e^x$ and the **natural logarithm** $\ln x$ are transcendental elementary functions, developed in [Exponential Functions](../exp/) and [Logarithms](../log/) respectively. General exponentials $b^x = \exp(x \ln b)$ and logarithms $\log_b x = \tfrac{\ln x}{\ln b}$ are included as well.

### Trigonometric and inverse trigonometric functions

The functions $\sin$, $\cos$, $\tan$, $\cot$, $\sec$, $\csc$ and their inverses $\arcsin$, $\arccos$, $\arctan$, $\text{arccot}$, $\text{arcsec}$, $\text{arccsc}$ are all transcendental elementary functions, introduced in [Trigonometric Functions](../trigonometric_functions/) and [Inverse Trigonometric Functions](../inv_trigonometric_functions/).

### Hyperbolic and inverse hyperbolic functions

The functions $\sinh$, $\cosh$, $\tanh$, $\text{coth}$, $\text{sech}$, $\text{csch}$ and their inverses $\text{arsinh}$, $\text{arcosh}$, $\text{artanh}$, $\ldots$ are elementary — they are defined directly in terms of exponentials and logarithms, as shown in [Hyperbolic Functions and Their Inverses](../hyp/).

## Combining building blocks: the definition

The five families above are the *atoms*. You build all elementary functions from them using three operations:

1. **Arithmetic:** given elementary $f$ and $g$, the functions $f + g$, $f - g$, $f \cdot g$, and $f/g$ (where $g \neq 0$) are elementary.
2. **Composition:** if $f$ and $g$ are elementary and the codomain of $g$ is contained in the domain of $f$, then $x \mapsto f(g(x))$ is elementary.

**Definition.** A **real elementary function** is any function that can be obtained from real constants and the identity function $x \mapsto x$ by applying finitely many arithmetic operations and compositions from the five families above.

In practice, an elementary function is one you can write as a *formula* using the standard function symbols $\exp$, $\ln$, $\sin$, $\cos$, $\ldots$ and the algebraic operations, possibly nested to any finite depth.

## A gallery of examples

The following are all elementary:

| Function | Type |
|---|---|
| $3x^4 - 2x + 7$ | polynomial |
| $\dfrac{x^2 - 1}{x^3 + x}$ | rational |
| $\sqrt{x^2 + 1}$ | algebraic (satisfies $f^2 = x^2+1$) |
| $e^{x^2}$ | transcendental — exponential of a polynomial |
| $\ln(\sin x)$ | transcendental — logarithm composed with sine |
| $\arctan(e^x)$ | transcendental — inverse trig composed with exponential |
| $\cosh(\sqrt{x})$ | transcendental — hyperbolic of an algebraic function |
| $x^x = e^{x \ln x}$ | transcendental — exponential composed with logarithm |
| $\sin^2 x + \cos^2 x$ | elementary (equals the constant $1$, but still elementary by form) |

Note that $x^x$ is elementary even though it is not a power function (fixed exponent) and not an exponential (fixed base): the formula $x^x = \exp(x \ln x)$ puts it firmly in the elementary class.

## Algebraic vs. transcendental functions

The table above makes the two broad classes concrete.

An **algebraic function** satisfies a polynomial equation $(1)$ over $\mathbb{R}(x)$. Over an algebraically closed field, the algebraic functions are precisely the roots of polynomials whose coefficients are rational functions. Any composition or arithmetic combination of algebraic functions is again algebraic.

A **transcendental function** is elementary but not algebraic. The exponential $e^x$, the logarithm $\ln x$, and all the trigonometric and hyperbolic functions are transcendental: no polynomial relation of the form $(1)$ holds for them. (Proving transcendence rigorously requires tools from Liouville's theorem or more advanced algebra, which fall outside the current prerequisites.)

## Differentiating elementary functions

Every elementary function is differentiable wherever it is defined, and its derivative is again elementary. This follows from the chain rule, product rule, quotient rule, and the known derivatives of each building block:

| Function | Derivative |
|---|---|
| $x^n$ | $n x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\arctan x$ | $1/(1+x^2)$ |
| $\sinh x$ | $\cosh x$ |
| $\text{arsinh}\, x$ | $1/\sqrt{x^2+1}$ |

Combining these with the chain and product rules, you can differentiate *any* elementary function by a finite, mechanical procedure. The derivative is always elementary.

## Non-elementary functions

Not every function encountered in analysis is elementary. Several important functions arise as solutions to integrals or differential equations that provably have no elementary closed form:

- The **error function** $\operatorname{erf}(x) = \dfrac{2}{\sqrt{\pi}}\displaystyle\int_0^x e^{-t^2}\,dt$ — the integral of a Gaussian. Its integrand $e^{-t^2}$ is elementary, but no elementary antiderivative exists.
- The **gamma function** $\Gamma(x) = \displaystyle\int_0^{\infty} t^{x-1}e^{-t}\,dt$ — a continuous extension of the factorial $n! = \Gamma(n+1)$.
- The **exponential integral** $\operatorname{Ei}(x) = \displaystyle\int_{-\infty}^x \dfrac{e^t}{t}\,dt$ and related logarithmic integrals.
- The **Bessel functions** $J_n(x)$, solutions to Bessel's differential equation, which arise in physics whenever there is cylindrical symmetry.

The precise criterion for when an integral has an elementary antiderivative is given by **Liouville's theorem** (differential algebra), which states conditions on the algebraic structure of the integrand. This belongs to the essential level.

## Summary

- An **elementary function** is built from real constants, the identity, and the five families — polynomials, algebraic functions, exponentials, logarithms, trigonometric and inverse trigonometric functions, and hyperbolic and inverse hyperbolic functions — through **finitely many** arithmetic operations and compositions.
- **Algebraic functions** satisfy a polynomial equation $(1)$ in $f$ and $x$; they include polynomials, rational functions, and $n$-th roots.
- **Transcendental elementary functions** — $e^x$, $\ln x$, $\sin x$, $\cos x$, and their relatives — are elementary but cannot satisfy any such polynomial equation.
- Every elementary function is **differentiable** wherever defined, and its derivative is again elementary.
- Important functions like $\operatorname{erf}(x)$, $\Gamma(x)$, and the Bessel functions are **not elementary**: they cannot be expressed as a finite formula built from the five families, as guaranteed by Liouville's theorem.
