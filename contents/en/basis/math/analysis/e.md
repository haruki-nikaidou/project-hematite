---
title: e (Base of Natural Logarithm)
summary: "Introduces Euler's number e ≈ 2.71828, defined as the limit of compound growth, shown to equal an infinite series of reciprocal factorials, and proved irrational."
prerequisites: 
  - basis/math/analysis/real_number_a
  - basis/math/analysis/limit
aliases: []
tags: ["Number", "Constant"]
updated: 2026-05-13
---

Suppose your bank account grows at 100% interest per year, but instead of waiting until year-end, the bank compounds it twice a year at 50% each time. You end up with more money than the once-a-year version. Compound it four times, twelve times, daily, every millisecond — and the final balance keeps creeping upward. Does it grow without bound? It turns out it does not: the process converges to a specific real number, denoted **$e$**, that sits at the heart of every phenomenon in which change is proportional to the current amount.

## Compound growth and the limiting sequence

Start with $1$ and apply an interest rate of $\frac{1}{n}$ a total of $n$ times over one year. The balance after one year is:

$$
a_n \;\coloneqq\; \left(1 + \frac{1}{n}\right)^n.
$$

A few computed values make the convergence concrete:

| $n$ | $a_n$ |
|-----|-------|
| $1$ | $2.000\,000$ |
| $2$ | $2.250\,000$ |
| $10$ | $2.593\,742$ |
| $100$ | $2.704\,814$ |
| $10^4$ | $2.718\,146$ |
| $10^6$ | $2.718\,280$ |

The sequence is climbing toward something near $2.718$. To define $e$ rigorously you need to know the limit exists — that $(a_n)$ is convergent.

## The sequence converges

You will show $(a_n)$ is monotonically increasing and bounded above, which forces it to converge by the completeness of $\mathbb{R}$ established in [Real Numbers](../real_number_a/).

### Monotone increasing

Apply the AM–GM inequality to the $n+1$ positive numbers consisting of $n$ copies of $\left(1 + \tfrac{1}{n}\right)$ and one copy of $1$:

$$
\underbrace{\frac{n \cdot \left(1 + \frac{1}{n}\right) + 1}{n+1}}_{\text{arithmetic mean}} \;\geq\; \underbrace{\left[\left(1+\frac{1}{n}\right)^n \cdot 1\right]^{\frac{1}{n+1}}}_{\text{geometric mean}}.
$$

The left side simplifies to $\dfrac{n + 2}{n+1} = 1 + \dfrac{1}{n+1}$, so raising both sides to the $(n+1)$-th power gives:

$$
\left(1 + \frac{1}{n+1}\right)^{n+1} \;\geq\; \left(1 + \frac{1}{n}\right)^n,
$$

i.e.\ $a_{n+1} \geq a_n$. The sequence is monotonically increasing.

### Bounded above by $3$

Expand $a_n$ using the **binomial theorem**:

$$
\left(1 + \frac{1}{n}\right)^n
= \sum_{k=0}^{n} \binom{n}{k} \frac{1}{n^k}
= \sum_{k=0}^{n} \frac{1}{k!} \cdot \underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{\leq\, 1}. \tag{1}
$$

Because each factor $\frac{n - j}{n} \leq 1$, the product in $(1)$ is at most $1$ for every $k$, giving:

$$
a_n \;\leq\; \sum_{k=0}^{n} \frac{1}{k!} \;\leq\; 1 + 1 + \frac{1}{2} + \frac{1}{4} + \cdots + \frac{1}{2^{n-1}} \;<\; 3,
$$

where the last bound uses $k! \geq 2^{k-1}$ for $k \geq 1$, so each term $\frac{1}{k!}$ is at most $\frac{1}{2^{k-1}}$, and the resulting geometric series sums to $2$.

An increasing sequence that stays below $3$ must converge. This gives the right to write the next definition.

## Definition of $e$

**Euler's number** $e$ is the real number

$$
e \;\coloneqq\; \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n. \tag{2}
$$

## The series representation

Look again at inequality $(1)$. As $n \to \infty$, the ratio $\frac{n(n-1)\cdots(n-k+1)}{n^k}$ tends to $1$ for every fixed $k$ (it is a product of $k$ terms each approaching $1$). One can show that the bound $a_n \leq \sum_{k=0}^{n} \frac{1}{k!}$ together with the lower bound that follows from keeping only finitely many terms both squeeze toward the same value. The result is:

$$
e \;=\; \sum_{k=0}^{\infty} \frac{1}{k!} \;=\; \frac{1}{0!} + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \cdots \tag{3}
$$

where $0! \coloneqq 1$ by convention.

The denominators $k!$ grow faster than any fixed exponential, so the series converges extremely rapidly. Summing the first eight terms already gives:

$$
1 + 1 + \frac{1}{2} + \frac{1}{6} + \frac{1}{24} + \frac{1}{120} + \frac{1}{720} + \frac{1}{5040} \;\approx\; 2.71827,
$$

accurate to five decimal places. The series form $(3)$ is often the most convenient representation for theoretical work.

## Numerical value and irrationality

To twelve decimal places:

$$
e \approx 2.718\,281\,828\,459\ldots
$$

**$e$ is irrational.** The proof uses the series $(3)$. Suppose for contradiction that $e = \frac{p}{q}$ for positive integers $p, q$. Multiply both sides of $(3)$ by $q!$:

$$
q!\cdot e \;=\; \underbrace{\sum_{k=0}^{q} \frac{q!}{k!}}_{\text{integer}} + \underbrace{\sum_{k=q+1}^{\infty} \frac{q!}{k!}}_{\text{tail}}.
$$

Since $e = p/q$, the left side $q! \cdot e = (q-1)!\cdot p$ is an integer, and the first sum on the right is also an integer (each $\frac{q!}{k!}$ is a product of consecutive integers for $k \leq q$). Therefore the tail must also be an integer. But:

$$
\text{tail} = \frac{1}{q+1} + \frac{1}{(q+1)(q+2)} + \cdots \;<\; \frac{1}{q+1} \cdot \frac{1}{1 - \frac{1}{q+1}} = \frac{1}{q} \;\leq\; 1,
$$

and the tail is clearly positive. A positive quantity strictly less than $1$ cannot be an integer — contradiction. Therefore $e \notin \mathbb{Q}$.

In fact $e$ is **transcendental** (not a root of any polynomial with integer coefficients), but establishing this requires tools beyond the current prerequisites.

## Why $e$ is the natural base

You might wonder what makes $e$ special over, say, $2$ or $10$. The answer lies in calculus: among all bases $b > 0$, the function $x \mapsto b^x$ has the simplest derivative — with no extra multiplicative constant — precisely when $b = e$. Likewise, the logarithm with base $e$ (the *natural logarithm*) has derivative $\frac{1}{x}$ with no extra factor. Any other base introduces a correction proportional to a logarithm of that base.

You will explore these properties in detail in [Exponential Functions](../functions/exp/) and [Logarithms](../functions/log/).

## Summary

- **Euler's number** $e$ is defined by the limit $\displaystyle e \coloneqq \lim_{n\to\infty}\!\left(1 + \tfrac{1}{n}\right)^n$, which converges because the sequence is monotone increasing and bounded above by $3$.
- Equivalently, $\displaystyle e = \sum_{k=0}^{\infty} \frac{1}{k!}$, a rapidly converging series whose partial sums provide arbitrarily accurate approximations.
- $e \approx 2.71828$ to five decimal places.
- $e$ is **irrational**: assuming $e = p/q$ leads to a contradiction because the tail of the series is a positive number less than $1$.
- $e$ is the uniquely natural base for exponential and logarithmic functions — a fact made precise when those functions are defined analytically.
