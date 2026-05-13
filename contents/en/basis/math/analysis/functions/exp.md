---
title: Exponential Functions
summary: "Defines the exponential function exp(x) via its absolutely convergent power series ∑ xᵏ/k!, proves the functional equation exp(x+y) = exp(x)exp(y) using the Cauchy product, and establishes that exp is strictly positive, strictly increasing, its own derivative, and surjects onto (0, ∞); also defines general exponentials bˣ and shows why e is the uniquely natural base."
prerequisites:
  - basis/math/analysis/functions/polynomial_functions
  - basis/math/analysis/e
  - basis/math/analysis/limit
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

You already know what $a^n$ means when $n$ is a positive integer: multiply $a$ by itself $n$ times. You can extend this to negative integers ($a^{-n} = 1/a^n$) and to rational exponents ($a^{p/q} = \sqrt[q]{a^p}$). But what should $2^{\sqrt{2}}$ or $e^{\pi}$ mean? An irrational exponent cannot be "applied one multiplication at a time," so you need a genuinely different approach. The **exponential function** provides it: a single, explicitly convergent series that assigns a precise value to $a^x$ for every real $x$.

## From integer powers to all real exponents

For a fixed base $a > 0$, integer powers are unambiguous, and rational powers $a^{p/q} \coloneqq (\sqrt[q]{a})^p$ satisfy the familiar laws $a^{r+s} = a^r a^s$ and $(a^r)^s = a^{rs}$.

Extending to **irrational** $x$ is trickier. Because $\mathbb{Q}$ is dense in $\mathbb{R}$ (established in [Real Numbers](../../real_number_a/)), every irrational number is the limit of a sequence of rationals, so one could try to declare $a^x \coloneqq \lim_{n \to \infty} a^{r_n}$ for any rational sequence $r_n \to x$. This approach is coherent only after proving that the limit exists and is independent of the chosen rational sequence — which in turn requires continuity of $t \mapsto a^t$, a fact you have not yet established.

The power series definition below sidesteps this circularity entirely. It gives an explicit, self-contained formula valid for every $x \in \mathbb{R}$ from the outset.

## Power series definition

**Definition.** The **exponential function** $\exp \colon \mathbb{R} \to \mathbb{R}$ is defined by the power series

$$
\exp(x) \coloneqq \sum_{k=0}^{\infty} \frac{x^k}{k!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots \tag{1}
$$

The partial sums of $(1)$ are polynomials in $x$ (as studied in [Polynomial Functions](../polynomial_functions/)), so $\exp$ is, in a precise sense, the limit of an infinite sequence of polynomials.

### Absolute convergence

Before using $(1)$, you must verify it converges for every real $x$. Apply the **ratio test**: the absolute ratio of consecutive terms is

$$
\left\lvert\frac{x^{k+1}/(k+1)!}{x^k/k!}\right\rvert = \frac{|x|}{k+1}
$$

For any fixed $x \in \mathbb{R}$, this ratio tends to $0$ as $k \to \infty$ (the denominator grows without bound). Since $0 < 1$, the ratio test guarantees **absolute convergence** for every $x \in \mathbb{R}$.

Absolute convergence is more than a technicality: it licenses you to rearrange and regroup terms of the series freely — a permission used directly in the next section.

## Agreement with $e$

The two simplest evaluations confirm that $\exp$ agrees with the constant $e$ introduced in [e](../../e/):

- **At $x = 0$:** $\;\exp(0) = \displaystyle\sum_{k=0}^{\infty} \frac{0^k}{k!} = 1$ (using the convention $0^0 \coloneqq 1$).
- **At $x = 1$:** $\;\exp(1) = \displaystyle\sum_{k=0}^{\infty} \frac{1}{k!} = \frac{1}{0!} + \frac{1}{1!} + \frac{1}{2!} + \cdots = e,$

where the last equality is exactly the series representation of $e$ established in [e](../../e/).

So $\exp$ maps $0 \mapsto 1$ and $1 \mapsto e$, and writing $e^x$ as an alternative notation for $\exp(x)$ is consistent with all integer powers of $e$.

## Functional equation

The most important algebraic property of $\exp$ is:

$$
\exp(x + y) = \exp(x)\exp(y) \quad \text{for all } x, y \in \mathbb{R}. \tag{2}
$$

*Proof.* Multiply the two absolutely convergent series using the **Cauchy product**:

$$
\exp(x)\,\exp(y) = \left(\sum_{j=0}^{\infty}\frac{x^j}{j!}\right)\!\left(\sum_{k=0}^{\infty}\frac{y^k}{k!}\right) = \sum_{n=0}^{\infty}\sum_{j=0}^{n}\frac{x^j}{j!}\cdot\frac{y^{n-j}}{(n-j)!}.
$$

Factor $\tfrac{1}{n!}$ from the inner sum and apply the **binomial theorem**:

$$
\sum_{j=0}^{n}\frac{x^j\,y^{n-j}}{j!\,(n-j)!} = \frac{1}{n!}\sum_{j=0}^{n}\binom{n}{j}x^j y^{n-j} = \frac{(x+y)^n}{n!}
$$

Therefore $\exp(x)\,\exp(y) = \displaystyle\sum_{n=0}^{\infty}\dfrac{(x+y)^n}{n!} = \exp(x+y)$.

Equation $(2)$ says $\exp$ converts addition into multiplication — precisely the behavior you expect from any exponential. Setting $y = 0$ recovers $\exp(x) \cdot 1 = \exp(x)$, and setting $y = -x$ gives a key consequence used next.

## Strict positivity

**Claim.** $\exp(x) > 0$ for all $x \in \mathbb{R}$.

*Proof.* Set $y = -x$ in $(2)$: $\exp(x)\,\exp(-x) = \exp(0) = 1$. So $\exp(x)$ and $\exp(-x)$ are positive reciprocals of each other — in particular, neither can be zero. Since $\exp(0) = 1 > 0$ and $\exp$ is continuous (it is given by a convergent power series), the intermediate value theorem forces it to remain positive everywhere.

## Derivative

**Theorem.** $\dfrac{d}{dx}\exp(x) = \exp(x)$.

*Proof.* Differentiate $(1)$ term by term — valid because the series converges absolutely on all of $\mathbb{R}$:

$$
\frac{d}{dx}\exp(x) = \sum_{k=1}^{\infty}\frac{k\,x^{k-1}}{k!} = \sum_{k=1}^{\infty}\frac{x^{k-1}}{(k-1)!} = \sum_{j=0}^{\infty}\frac{x^j}{j!} = \exp(x),
$$

where the re-index $j = k - 1$ was used in the last step.

The function $\exp$ is therefore its own derivative. This is its defining dynamic property: $\exp$ grows at a rate exactly proportional to its current value, with proportionality constant $1$.

## Strict monotonicity

Because $\exp(x) > 0$ for all $x$, the derivative $(\exp)'(x) = \exp(x)$ is always positive. A function with strictly positive derivative on all of $\mathbb{R}$ is **strictly increasing**: for $x_1 < x_2$, $\exp(x_1) < \exp(x_2)$.

## Range and limiting behavior

The range of $\exp$ is the open interval $(0, \infty)$.

- **As $x \to +\infty$:** The $k = 1$ term alone gives $\exp(x) \geq x$ for all $x \geq 0$, so $\exp(x) \to +\infty$.
- **As $x \to -\infty$:** From $\exp(x)\,\exp(-x) = 1$ you get $\exp(x) = 1/\exp(-x)$. Since $-x \to +\infty$, we have $\exp(-x) \to +\infty$, so $\exp(x) \to 0^+$.

Together, strict positivity and these limits show $\exp$ surjects onto $(0, \infty)$: for any $y > 0$, the intermediate value theorem applied to the continuous, strictly increasing $\exp$ guarantees a **unique** $x$ with $\exp(x) = y$. That unique $x$ is the **natural logarithm** $\ln y$, whose properties are developed in [Logarithms](../log/).

## General exponentials

With $\ln$ available, you can give a precise, uniform definition of exponentials to any positive base. For $b > 0$, $b \neq 1$, set

$$
b^x \;\coloneqq\; \exp(x \ln b). \tag{3}
$$

Using the functional equation $(2)$, the familiar exponent rules follow immediately: $b^{x+y} = \exp((x+y)\ln b) = \exp(x\ln b)\,\exp(y\ln b) = b^x b^y$, and similarly $(b^x)^y = b^{xy}$.

Definition $(3)$ also retroactively pins down irrational powers: $2^{\sqrt{2}} = \exp(\sqrt{2}\ln 2)$, a perfectly well-defined real number given by series $(1)$.

The construction of $\ln$ and the full theory of logarithmic functions are deferred to [Logarithms](../log/).

## Why $e$ is the natural base

Differentiating $(3)$ by the chain rule:

$$
\frac{d}{dx}b^x = \frac{d}{dx}\exp(x \ln b) = \ln b \cdot \exp(x \ln b) = \ln b \cdot b^x.
$$

The derivative of $b^x$ equals $b^x$ multiplied by the constant $\ln b$. The **only** base for which this constant equals $1$ is $b = e$, because $\ln e = 1$. For every other base $b \neq e$, differentiation introduces an unavoidable multiplicative factor $\ln b \neq 1$.

This is why $e$ is the **natural base**: it is the unique base for which the exponential function is its own derivative with no extra constant. Any formula involving $b^x$ for $b \neq e$ can always be rewritten as $\exp(x \ln b)$, making the role of $\ln b$ explicit and confirming that $e$ is the truly fundamental choice.

## Summary

- The **exponential function** is defined by $\exp(x) \coloneqq \displaystyle\sum_{k=0}^{\infty} \dfrac{x^k}{k!}$, which converges **absolutely** for all $x \in \mathbb{R}$ by the ratio test (ratio of consecutive terms is $|x|/(k+1) \to 0$).
- $\exp(0) = 1$ and $\exp(1) = e$, in agreement with the series definition of $e$.
- **Functional equation**: $\exp(x+y) = \exp(x)\exp(y)$ for all $x, y \in \mathbb{R}$, proved via the Cauchy product and the binomial theorem.
- $\exp(x) > 0$ for all $x$ (since $\exp(x)\exp(-x) = 1$ rules out any zero).
- $(\exp)'(x) = \exp(x)$: the function is **its own derivative**, hence **strictly increasing** everywhere.
- The **range** of $\exp$ is $(0, \infty)$; $\exp(x) \to +\infty$ as $x \to +\infty$ and $\exp(x) \to 0$ as $x \to -\infty$.
- **General exponentials** are defined by $b^x \coloneqq \exp(x \ln b)$ for $b > 0$, $b \neq 1$; their derivative is $(b^x)' = \ln b \cdot b^x$.
- The **natural base** $e$ is the unique base for which $(b^x)' = b^x$ holds with no extra constant.
