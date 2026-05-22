---
title: Integration by Parts
summary: "Integrating the product rule (uv)' = u'v + uv' over [a, b] and applying Newton–Leibniz gives the integration-by-parts formula ∫_a^b u(x) v'(x) dx = [u(x) v(x)]_a^b − ∫_a^b u'(x) v(x) dx. This checkpoint derives the formula, presents the indefinite-integral form ∫ u dv = uv − ∫ v du, and works through canonical applications: ∫ x e^x dx, ∫ ln x dx, and the reduction formula for ∫ x^n e^x dx."
prerequisites:
  - basis/math/calculus/riemann_integral/newton_leibniz_formula
  - basis/math/calculus/differential/basic_roles_of_dif
aliases: []
tags:
  - Calculus
  - Integration
updated: 2026-05-22
---

Many integrals you encounter involve a product of two functions — for instance $x e^x$, $x \ln x$, or $x^2 \sin x$. Substitution does not help with these, because there is no chain-rule structure to exploit. **Integration by parts** is the corresponding technique for products: it turns the integral of one factor times the derivative of another into a boundary term plus a (hopefully simpler) integral. The formula is nothing more than the [product rule](../../differential/basic_roles_of_dif/) read backwards and integrated.

## Derivation from the product rule

Let $u$ and $v$ be differentiable functions on $[a, b]$ whose derivatives $u'$ and $v'$ are continuous. The product rule gives

$$
(u(x)\,v(x))' = u'(x)\,v(x) + u(x)\,v'(x).
$$

Rearrange to isolate the term $u(x)\,v'(x)$:

$$
u(x)\,v'(x) = (u(x)\,v(x))' - u'(x)\,v(x).
$$

Integrate both sides over $[a, b]$ and apply the [Newton–Leibniz formula](../newton_leibniz_formula/) to the right-hand side:

$$
\int_a^b u(x)\,v'(x)\,dx
= \bigl[u(x)\,v(x)\bigr]_a^b - \int_a^b u'(x)\,v(x)\,dx.
$$

This is the **integration-by-parts formula** for definite integrals.

## Indefinite form and differential notation

For indefinite integrals, drop the limits. Writing $du = u'(x)\,dx$ and $dv = v'(x)\,dx$, the formula becomes

$$
\int u\,dv = uv - \int v\,du.
$$

This **differential notation** is the most concise form and is the one you will use in practice. The strategy is to split the integrand into a part you call $u$ (to be differentiated) and a part you call $dv$ (to be integrated). After choosing the split, you compute $du = u'\,dx$ and find $v$ by integrating $dv$; then plug into the formula.

## Choosing $u$ and $dv$: the LIATE heuristic

The choice of which factor to call $u$ determines whether the resulting integral $\int v\,du$ is simpler or harder than what you started with. A useful informal guide is the **LIATE order**:

1. **L**ogarithms (e.g. $\ln x$, $\log_a x$)
2. **I**nverse trigonometric functions (e.g. $\arctan x$, $\arcsin x$)
3. **A**lgebraic functions (polynomials, powers)
4. **T**rigonometric functions (e.g. $\sin x$, $\cos x$)
5. **E**xponentials (e.g. $e^x$, $a^x$)

You should prefer to assign $u$ to whichever function appears *earlier* in this list, and $dv$ to whichever appears *later*. The rationale is that differentiating a logarithm or inverse trig function simplifies it dramatically (turning $\ln x$ into $1/x$), while integrating an exponential or trigonometric function does not increase complexity. This heuristic is not a theorem — you should always verify that the resulting integral is actually simpler — but it gives the right answer in the vast majority of standard cases.

## Worked examples

### Example 1: $\int x e^x\,dx$

By LIATE, $x$ (algebraic) comes before $e^x$ (exponential), so set

$$
u = x, \qquad dv = e^x\,dx.
$$

Then $du = dx$ and $v = e^x$. Applying $\int u\,dv = uv - \int v\,du$:

$$
\int x e^x\,dx = x e^x - \int e^x\,dx = x e^x - e^x + C = (x - 1)e^x + C.
$$

You can verify by differentiating: $\bigl((x-1)e^x\bigr)' = e^x + (x-1)e^x = x e^x$. $\checkmark$

### Example 2: $\int \ln x\,dx$

There is only one factor here, but you can still use integration by parts by writing $\ln x = \ln x \cdot 1$. Set

$$
u = \ln x, \qquad dv = dx.
$$

Then $du = \dfrac{1}{x}\,dx$ and $v = x$. Applying the formula:

$$
\int \ln x\,dx = x \ln x - \int x \cdot \frac{1}{x}\,dx = x \ln x - \int 1\,dx = x \ln x - x + C.
$$

This is the key trick for integrals involving logarithms: assign $u = \ln x$ so that differentiation eliminates the logarithm entirely.

### Example 3: $\int x^2 e^x\,dx$ — repeated application

When the algebraic factor has degree greater than $1$, you apply integration by parts repeatedly. Set $u = x^2$, $dv = e^x\,dx$, so $du = 2x\,dx$ and $v = e^x$:

$$
\int x^2 e^x\,dx = x^2 e^x - 2\int x e^x\,dx.
$$

The remaining integral $\int x e^x\,dx$ is exactly Example 1, so

$$
\int x^2 e^x\,dx = x^2 e^x - 2(x - 1)e^x + C = (x^2 - 2x + 2)e^x + C.
$$

### Example 4: $\int e^x \sin x\,dx$ — the self-referential trick

Neither $e^x$ nor $\sin x$ becomes simpler when differentiated or integrated, so repeated application of parts seems to cycle forever. This circularity is actually the solution. Set

$$
u = e^x, \qquad dv = \sin x\,dx,
$$

so $du = e^x\,dx$ and $v = -\cos x$:

$$
\int e^x \sin x\,dx = -e^x \cos x + \int e^x \cos x\,dx. \tag{1}
$$

Apply parts again to $\int e^x \cos x\,dx$, with $u = e^x$ and $dv = \cos x\,dx$, so $v = \sin x$:

$$
\int e^x \cos x\,dx = e^x \sin x - \int e^x \sin x\,dx. \tag{2}
$$

Substituting (2) into (1):

$$
\int e^x \sin x\,dx = -e^x \cos x + e^x \sin x - \int e^x \sin x\,dx.
$$

The original integral appears on both sides. Denote it $I$ and solve:

$$
2I = e^x(\sin x - \cos x), \qquad \therefore\quad I = \frac{e^x(\sin x - \cos x)}{2} + C.
$$

The key rule is to make the *same choice* of which factor is $u$ at each step; switching choices at the second step would undo the first.

## Reduction formula for $I_n = \int x^n e^x\,dx$

The repeated-application pattern in Example 3 generalizes to an arbitrary power $n \geq 1$. Set $u = x^n$ and $dv = e^x\,dx$:

$$
\int x^n e^x\,dx = x^n e^x - n \int x^{n-1} e^x\,dx.
$$

Writing $I_n = \int x^n e^x\,dx$, this is the **reduction formula**

$$
I_n = x^n e^x - n\, I_{n-1}.
$$

Together with the base case $I_0 = \int e^x\,dx = e^x + C$, this recurrence computes $I_n$ for any non-negative integer $n$. Applying it for $n = 1, 2$:

$$
I_1 = x e^x - I_0 = (x - 1)e^x + C,
$$

$$
I_2 = x^2 e^x - 2 I_1 = x^2 e^x - 2(x-1)e^x + C = (x^2 - 2x + 2)e^x + C,
$$

which matches the direct calculation in Example 3.

## Summary

- **Integration by parts** is the product rule integrated: $\int u\,dv = uv - \int v\,du$, or in definite form $\int_a^b u\,v'\,dx = \bigl[uv\bigr]_a^b - \int_a^b u'\,v\,dx$.
- The formula is derived by rearranging the product rule $(uv)' = u'v + uv'$ and applying the [Newton–Leibniz formula](../newton_leibniz_formula/).
- The **LIATE heuristic** (Logarithms, Inverse trig, Algebraic, Trigonometric, Exponential) guides the choice of $u$: prefer whichever factor appears earlier in this list.
- **Logarithms** and **inverse trig functions** are always chosen as $u$ so that differentiation eliminates them.
- When the algebraic factor has degree $n$, repeated application yields a **reduction formula** $I_n = x^n e^x - n\,I_{n-1}$.
- When two non-simplifying factors are present (e.g. $e^x$ and $\sin x$), applying parts twice with a consistent choice of $u$ produces an equation in the original integral that you can solve algebraically.
