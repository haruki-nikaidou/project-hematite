---
title: Logarithms
summary: "Defines the natural logarithm as the inverse of the exponential function and derives its key properties — the product rule, power rule, and derivative — then extends the framework to logarithms and exponentials in any base."
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/e
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

The [Exponential Functions](../exp/) article showed you that $\exp : \mathbb{R} \to (0, \infty)$ is strictly increasing and surjective onto $(0, \infty)$. A strictly increasing function is automatically injective, so $\exp$ is a bijection — it has a unique inverse. That inverse is one of the most useful functions in all of analysis.

## The natural logarithm

**Definition.** The **natural logarithm** $\ln : (0, \infty) \to \mathbb{R}$ is the inverse of $\exp$. That is:

$$
\ln(\exp(x)) = x \qquad \text{for all } x \in \mathbb{R}, \tag{1}
$$

$$
\exp(\ln(y)) = y \qquad \text{for all } y > 0. \tag{2}
$$

Intuitively, $\ln(y)$ answers the question: "To what power must $e$ be raised to obtain $y$?" Because $\exp$ maps all of $\mathbb{R}$ bijectively onto $(0, \infty)$, this question always has a unique answer.

### Immediate values

From the definition and what you already know about $\exp$:

- $\ln(1) = 0$, because $\exp(0) = 1$.
- $\ln(e) = 1$, because $\exp(1) = e$.
- $\ln(e^n) = n$ for every $n \in \mathbb{Z}$, because $\exp(n) = e^n$.

These three anchor points are worth memorizing; they let you reason about $\ln$ quickly without a calculator.

## The product rule for logarithms

**Theorem (product rule).** For all $x, y > 0$:

$$
\ln(xy) = \ln x + \ln y. \tag{3}
$$

*Proof.* Let $a \coloneqq \ln x$ and $b \coloneqq \ln y$, so $\exp(a) = x$ and $\exp(b) = y$. The **functional equation** of the exponential — $\exp(a + b) = \exp(a)\exp(b)$ — gives:

$$
xy = \exp(a) \cdot \exp(b) = \exp(a + b).
$$

Applying $\ln$ to both sides and using identity $(1)$:

$$
\ln(xy) = \ln(\exp(a + b)) = a + b = \ln x + \ln y. \qquad \square
$$

Intuitively, $\ln$ converts multiplication into addition — precisely the property that made logarithm tables indispensable for arithmetic long before calculators.

Two immediate corollaries follow from $(3)$. Setting $y = 1/x$ gives $\ln(1/x) = -\ln x$. Setting $y = x$ gives $\ln(x^2) = 2\ln x$. In fact, a full power rule holds for all real exponents.

## The power rule for logarithms

**Theorem (power rule).** For all $x > 0$ and $r \in \mathbb{R}$:

$$
\ln(x^r) = r\ln x. \tag{4}
$$

*Proof sketch.* For $r = n \in \mathbb{N}$, apply the product rule $(3)$ repeatedly:

$$
\ln(x^n) = \ln(\underbrace{x \cdot x \cdots x}_{n\text{ times}})
= \underbrace{\ln x + \ln x + \cdots + \ln x}_{n\text{ times}} = n\ln x.
$$

For rational $r = p/q$ with $q \in \mathbb{N}^+$, note that $q \cdot \ln(x^{p/q}) = \ln((x^{p/q})^q) = \ln(x^p) = p\ln x$, so $\ln(x^{p/q}) = \tfrac{p}{q}\ln x$. For arbitrary real $r$, the equality extends by continuity of $\ln$. $\square$

The power rule $(4)$ turns exponentiation into multiplication, just as $(3)$ turned multiplication into addition.

## The derivative of $\ln$

**Theorem.** For all $x > 0$:

$$
\frac{d}{dx}\ln x = \frac{1}{x}. \tag{5}
$$

*Proof.* Let $y = \ln x$, so that $x = \exp(y)$. Differentiate both sides with respect to $x$ using the **inverse function theorem**:

$$
1 = \frac{d}{dx}\exp(y) = \exp(y) \cdot \frac{dy}{dx} = x \cdot \frac{dy}{dx}.
$$

Solving for $\frac{dy}{dx}$:

$$
\frac{dy}{dx} = \frac{1}{x}. \qquad \square
$$

This is a striking result: the slope of the graph of $\ln$ at the point $x$ is simply $1/x$, with no multiplicative constant or extra function.

## Monotonicity and behavior at the boundary

Because $(\ln x)' = 1/x > 0$ for all $x > 0$, the function $\ln$ is **strictly increasing** on its entire domain $(0, \infty)$.

The behavior at the two boundary points follows directly from the relationship with $\exp$:

$$
\lim_{x \to \infty} \ln x = +\infty, \qquad \lim_{x \to 0^+} \ln x = -\infty.
$$

The first limit holds because $\exp(t) \to +\infty$ as $t \to +\infty$, so its inverse must also grow without bound. The second holds because $\exp(t) \to 0$ as $t \to -\infty$. Together these confirm that $\ln$ is a bijection from $(0, \infty)$ onto all of $\mathbb{R}$, the mirror image of the fact that $\exp$ maps $\mathbb{R}$ bijectively onto $(0, \infty)$.

## Natural logarithm as an integral

There is a second way to arrive at $\ln$ that makes the derivative formula $(5)$ transparent from the outset. Define:

$$
L(x) \coloneqq \int_1^x \frac{1}{t}\,dt \qquad (x > 0). \tag{6}
$$

By the Fundamental Theorem of Calculus, $L'(x) = 1/x$ and $L(1) = 0$. One can verify that $L$ satisfies the same product rule as $\ln$ (changing variables in the integral), and since both are continuous functions that agree at $x = 1$ and have the same derivative, they are identical:

$$
\ln x = \int_1^x \frac{1}{t}\,dt.
$$

This integral representation is sometimes taken as the *definition* of $\ln$, with [Euler's number](../../e/) then recovered as the unique $e > 0$ satisfying $\int_1^e \frac{1}{t}\,dt = 1$.

## General exponentials via the logarithm

Now that $\ln$ is available, you can define $b^x$ for any base $b > 0$ and any *real* exponent $x \in \mathbb{R}$ — including irrationals.

**Definition.** For $b > 0$:

$$
b^x \;\coloneqq\; \exp(x \ln b). \tag{7}
$$

When $x$ is a rational number $p/q$, this agrees with the usual arithmetic meaning of $b^{p/q}$ (you can verify this using the power rule $(4)$). Definition $(7)$ extends it seamlessly to all real exponents.

**Derivative.** Differentiating $(7)$ by the chain rule:

$$
\frac{d}{dx}\,b^x = \exp(x \ln b) \cdot \ln b = (\ln b)\,b^x.
$$

The extra factor $\ln b$ is what distinguishes $b^x$ from $e^x$: when $b = e$, $\ln e = 1$ and the factor disappears, which is precisely why $e$ is the "natural" base.

## Logarithms to an arbitrary base

**Definition.** For $b > 0$ with $b \neq 1$, the **logarithm to base $b$** is:

$$
\log_b(x) \;\coloneqq\; \frac{\ln x}{\ln b} \qquad (x > 0). \tag{8}
$$

By this definition, $\log_b(x) = y$ if and only if $b^y = x$ (substitute $(7)$ to verify), which matches the familiar meaning from school algebra.

### Change-of-base formula

From definition $(8)$, for any two valid bases $a$ and $b$:

$$
\log_a(x) = \frac{\ln x}{\ln a}
= \frac{\ln x}{\ln b} \cdot \frac{\ln b}{\ln a}
= \log_b(x) \cdot \frac{1}{\log_b(a)}.
$$

Equivalently:

$$
\log_a(x) = \frac{\log_b(x)}{\log_b(a)}.
$$

In practice, scientific calculators provide $\log_{10}$ (common logarithm) and $\ln$; the **change-of-base formula** lets you reach any other base through either one.

## Summary

- The **natural logarithm** $\ln : (0, \infty) \to \mathbb{R}$ is the inverse of $\exp$: $\ln(\exp(x)) = x$ and $\exp(\ln y) = y$.
- Key values: $\ln 1 = 0$, $\ln e = 1$, $\ln(e^n) = n$ for all $n \in \mathbb{Z}$.
- **Product rule:** $\ln(xy) = \ln x + \ln y$, derived from the functional equation $\exp(a+b) = \exp(a)\exp(b)$.
- **Power rule:** $\ln(x^r) = r\ln x$ for all $r \in \mathbb{R}$ and $x > 0$.
- **Derivative:** $(\ln x)' = 1/x$, proved via the inverse function theorem.
- $\ln$ is strictly increasing on $(0, \infty)$; $\ln x \to +\infty$ as $x \to \infty$ and $\ln x \to -\infty$ as $x \to 0^+$.
- **Integral representation:** $\ln x = \int_1^x \frac{1}{t}\,dt$, an alternative definition that makes the derivative formula immediate.
- **General exponential:** $b^x \coloneqq \exp(x \ln b)$, with derivative $(\ln b)\,b^x$.
- **Logarithm base $b$:** $\log_b(x) \coloneqq \frac{\ln x}{\ln b}$; the **change-of-base formula** is $\log_a(x) = \frac{\log_b(x)}{\log_b(a)}$.
