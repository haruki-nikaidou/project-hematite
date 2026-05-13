---
title: Polynomial Functions
summary: "Defines polynomial functions over ℝ, develops their algebra as the ring ℝ[x], establishes the division algorithm with remainder and factor theorems, classifies roots by multiplicity, states the Fundamental Theorem of Algebra, and shows how every real polynomial factors into linear and irreducible quadratic pieces."
prerequisites:
  - basis/math/analysis/real_number_a
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

The simplest non-constant functions you can write down using real numbers are polynomials. They require nothing beyond repeated addition and multiplication — no division, no square roots, no infinite processes. This economy of means is deceptive: polynomial arithmetic underpins a large part of analysis, and mastering it carefully gives you both a warm-up in rigorous definitions and a toolkit you will reach for throughout mathematics.

## Definition and terminology

**Definition.** A **polynomial** over $\mathbb{R}$ of **degree** $n$ is a function $p \colon \mathbb{R} \to \mathbb{R}$ of the form

$$p(x) \;\coloneqq\; a_n x^n + a_{n-1}x^{n-1} + \cdots + a_1 x + a_0, \tag{1}$$

where $n \in \mathbb{Z}_{\geq 0}$, each $a_k \in \mathbb{R}$, and $a_n \neq 0$. The coefficient $a_n$ is the **leading coefficient**, $a_0$ is the **constant term**, and the individual summands $a_k x^k$ are the **terms**.

Polynomials of small degree have traditional names:

| Degree $n$ | Name | Example |
|:---:|:---|:---|
| $0$ | constant | $p(x) = 7$ |
| $1$ | linear | $p(x) = 3x - 2$ |
| $2$ | quadratic | $p(x) = x^2 - 5x + 6$ |
| $3$ | cubic | $p(x) = 2x^3 + x - 1$ |

The **zero polynomial** $p(x) = 0$ (all coefficients zero) is assigned no degree — or degree $-\infty$ in treatments where that convention keeps the product formula $\deg(p \cdot q) = \deg p + \deg q$ clean.

Intuitively, the degree captures the dominant behavior far from the origin: for large $|x|$, the function $p(x)$ grows roughly like $a_n x^n$, and its graph can cross or touch the $x$-axis at most $n$ times.

## Arithmetic on polynomials

### Addition and scalar multiplication

Given polynomials $p(x) = \sum_{k=0}^{m} a_k x^k$ and $q(x) = \sum_{k=0}^{n} b_k x^k$, their **sum** $p + q$ is the polynomial with coefficients $a_k + b_k$ (padding the shorter polynomial with zeros). When $\deg p \neq \deg q$, the degree of the sum is $\max(\deg p, \deg q)$; when they are equal, leading terms may cancel, so $\deg(p+q) \leq \deg p$.

Multiplying every coefficient of $p$ by a constant $c \in \mathbb{R}$ gives the **scalar multiple** $c \cdot p$, which has the same degree as $p$ whenever $c \neq 0$.

### Multiplication

Distributing every term of $p$ across every term of $q$ gives the **product**:

$$(p \cdot q)(x) \;=\; \sum_{k=0}^{m+n}\!\left(\sum_{\substack{i+j=k \\ 0 \leq i \leq m,\; 0 \leq j \leq n}} a_i b_j\right) x^k.$$

The highest-degree term is $a_m b_n x^{m+n}$. Since $a_m \neq 0$ and $b_n \neq 0$, this term is nonzero, so

$$\deg(p \cdot q) = \deg p + \deg q.$$

### The ring $\mathbb{R}[x]$

The collection of all polynomials over $\mathbb{R}$, equipped with the addition and multiplication above, is denoted $\mathbb{R}[x]$ and forms a **commutative ring with unity**: addition and multiplication are associative and commutative, multiplication distributes over addition, the zero polynomial is the additive identity, and the constant polynomial $1$ is the multiplicative identity. The analogy with the integers $\mathbb{Z}$ runs deep — just as in $\mathbb{Z}$, you can divide with remainder, and not every element has a multiplicative inverse inside the ring.

## Polynomial division

### The division algorithm

Just as any integer $a$ can be written as $a = d \cdot q + r$ with $0 \leq r < d$, every pair of polynomials admits a unique division with remainder.

**Theorem (Polynomial Division Algorithm).** For any $p, d \in \mathbb{R}[x]$ with $d \neq 0$, there exist **unique** polynomials $q$ (the **quotient**) and $r$ (the **remainder**) satisfying

$$p(x) = d(x)\,q(x) + r(x), \qquad \deg r < \deg d. \tag{2}$$

When $r = 0$ we say $d$ **divides** $p$, written $d \mid p$.

The proof is constructive: at each step, cancel the leading term of the current dividend using a suitable multiple of $d$, then repeat on the residual. The degree of the residual strictly decreases at every step, so the process terminates.

As a quick example, divide $p(x) = x^3 - 2x + 1$ by $d(x) = x - 1$:

1. $x^3 / x = x^2$. Subtract $x^2(x-1) = x^3 - x^2$, leaving $x^2 - 2x + 1$.
2. $x^2 / x = x$. Subtract $x(x-1) = x^2 - x$, leaving $-x + 1$.
3. $-x / x = -1$. Subtract $-1 \cdot (x-1) = -x+1$, leaving $0$.

Therefore $x^3 - 2x + 1 = (x-1)(x^2 + x - 1) + 0$, confirming $(x-1) \mid (x^3 - 2x + 1)$.

## Remainder and factor theorems

These two results connect the arithmetic of division to the evaluation of a polynomial at a point.

### Remainder theorem

**Theorem.** For any $p \in \mathbb{R}[x]$ and any $a \in \mathbb{R}$, the remainder when $p$ is divided by $(x - a)$ is the constant $p(a)$.

*Proof.* Apply the division algorithm with divisor $(x - a)$ (degree $1$). Since the remainder must have degree less than $1$, it is some constant $c$. Writing $p(x) = (x-a)\,q(x) + c$ and substituting $x = a$ gives $p(a) = 0 \cdot q(a) + c = c$.

The remainder theorem turns remainder-finding into function evaluation — no long division needed. For instance, the remainder when $p(x) = x^{10} - 3x + 2$ is divided by $(x - 1)$ is $p(1) = 1 - 3 + 2 = 0$.

### Factor theorem

**Theorem.** $(x - a) \mid p(x)$ if and only if $p(a) = 0$.

*Proof.* By the remainder theorem, $(x-a)$ divides $p$ exactly when the remainder $p(a)$ equals zero.

A value $a$ satisfying $p(a) = 0$ is a **root** (or **zero**) of $p$. The factor theorem makes root-finding and factoring two sides of the same coin: finding a root $a$ immediately yields a factor $(x-a)$.

## Roots and multiplicity

Once you know $a$ is a root, you can ask how strongly $(x-a)$ divides $p$.

**Definition.** A root $a$ of $p$ has **multiplicity** $m \geq 1$ if

$$(x - a)^m \mid p(x) \quad \text{but} \quad (x - a)^{m+1} \nmid p(x).$$

A root of multiplicity $1$ is a **simple root**; of multiplicity $2$, a **double root**; and so on. Multiplicity governs the local shape of the graph at $a$:

- **Odd multiplicity**: the graph crosses the $x$-axis at $a$ (transversally for $m=1$, with an inflection shape for $m \geq 3$).
- **Even multiplicity**: the graph touches the $x$-axis at $a$ without crossing (bounces back).

For example, $p(x) = (x-2)^3(x+1)$ has $x = 2$ as a triple root and $x = -1$ as a simple root. The graph crosses at $x = -1$ and has an inflection touch at $x = 2$.

## Fundamental theorem of algebra

The theorems above characterize individual known roots. The following tells you the total count.

**Theorem (Fundamental Theorem of Algebra).** Every non-constant polynomial with real (or complex) coefficients has at least one root in $\mathbb{C}$.

This is stated here without proof; establishing it requires either complex analysis or topology, both beyond the current scope. Its power comes from iterating: given $p$ of degree $n \geq 1$, the theorem yields a root $z_1 \in \mathbb{C}$. The factor theorem gives $p(x) = (x-z_1)\,p_1(x)$ with $\deg p_1 = n-1$. Applying the theorem to $p_1$, and so on, you exhaust all $n$ factors. Therefore:

> A degree-$n$ polynomial ($n \geq 1$) has **exactly $n$ roots in $\mathbb{C}$**, counted with multiplicity.

## Factorization over $\mathbb{R}$

Over $\mathbb{R}$ you cannot always find $n$ real roots — for example, $x^2 + 1$ has none. However, complex roots of real polynomials always come in **conjugate pairs**: if $\alpha + \beta i$ (with $\beta \neq 0$) is a root of $p \in \mathbb{R}[x]$, then so is $\alpha - \beta i$. To see why, conjugate the equation $p(\alpha + \beta i) = 0$; since all coefficients are real, conjugation commutes with $p$, giving $p(\alpha - \beta i) = \overline{0} = 0$.

Multiplying the two linear factors for a conjugate pair:

$$(x - (\alpha + \beta i))(x - (\alpha - \beta i)) = x^2 - 2\alpha x + (\alpha^2 + \beta^2).$$

This is a real quadratic with discriminant $(2\alpha)^2 - 4(\alpha^2 + \beta^2) = -4\beta^2 < 0$, so it has no real roots and is **irreducible over $\mathbb{R}$**.

**Theorem (Real Factorization).** Every $p \in \mathbb{R}[x]$ of degree $n \geq 1$ factors uniquely as

$$p(x) = a_n \prod_{i=1}^{s}(x - r_i)^{m_i} \prod_{j=1}^{t}(x^2 + b_j x + c_j)^{e_j},$$

where each $r_i \in \mathbb{R}$ is a real root of multiplicity $m_i$, each $x^2 + b_j x + c_j$ is an irreducible real quadratic (with $b_j^2 - 4c_j < 0$) arising from a conjugate complex pair, and $\displaystyle\sum_i m_i + 2\sum_j e_j = n$.

This factorization is the key ingredient in partial fraction decomposition, which you will encounter when integrating rational functions.

## Beyond polynomials

Polynomials are closed under addition, subtraction, and multiplication, but not division: $1/x$ is not a polynomial. The natural extension is the class of **rational functions** $\tfrac{p(x)}{q(x)}$ (with $q \not\equiv 0$), which you can analyze with polynomial long division and the real factorization above. Beyond rational functions, you need genuinely new constructions — the exponential and logarithmic functions — that cannot be built from finitely many arithmetic operations; see [Exponential Functions](../exp/).

## Summary

- A **polynomial** of degree $n$ over $\mathbb{R}$ is $p(x) = a_n x^n + \cdots + a_0$ with $a_n \neq 0$; named cases: degree $0$ (constant), $1$ (linear), $2$ (quadratic), $3$ (cubic).
- The collection $\mathbb{R}[x]$ forms a **commutative ring**: sums have degree $\leq \max(\deg p, \deg q)$; products satisfy $\deg(p \cdot q) = \deg p + \deg q$.
- **Division algorithm**: for any nonzero $d$, there exist unique $q$ and $r$ with $p = d\,q + r$ and $\deg r < \deg d$.
- **Remainder theorem**: dividing $p$ by $(x - a)$ leaves remainder $p(a)$.
- **Factor theorem**: $(x - a) \mid p$ if and only if $p(a) = 0$.
- A root $a$ has **multiplicity** $m$ if $(x-a)^m \mid p$ but $(x-a)^{m+1} \nmid p$; the parity of $m$ determines whether the graph crosses or bounces at $a$.
- **Fundamental Theorem of Algebra**: every non-constant polynomial has at least one complex root; a degree-$n$ polynomial has exactly $n$ roots in $\mathbb{C}$ counted with multiplicity.
- Over $\mathbb{R}$, every polynomial factors into **linear** factors $(x - r_i)$ for real roots and **irreducible quadratic** factors $x^2 + b_j x + c_j$ (with $b_j^2 - 4c_j < 0$) for conjugate complex pairs.
