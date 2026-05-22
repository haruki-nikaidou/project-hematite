---
title: Change of Variables in the Integral
summary: "If φ is a continuously differentiable function on [α, β] with φ([α, β]) ⊆ [a, b] and f is continuous on [a, b], then ∫_α^β f(φ(t)) φ'(t) dt = ∫_{φ(α)}^{φ(β)} f(x) dx. This checkpoint derives the substitution rule from the chain rule plus Newton–Leibniz, treats both the definite-integral form (with limits transformed) and the indefinite-integral form ∫ f(φ(t)) φ'(t) dt = ∫ f(x) dx, and walks through the standard substitution patterns — linear, trigonometric, and inverse."
prerequisites:
  - basis/math/calculus/riemann_integral/newton_leibniz_formula
  - basis/math/calculus/differential/chain_rule
aliases: []
tags:
  - Calculus
  - Integration
updated: 2026-05-22
---

Suppose you want to compute $\int_0^1 2x(x^2+1)^3\,dx$. Expanding $(x^2+1)^3$ and integrating term by term is possible but tedious. The key observation is that $2x$ is exactly the derivative of $x^2+1$, so the integrand has the form $f(\varphi(t))\,\varphi'(t)$ with $\varphi(t) = t^2 + 1$ and $f(x) = x^3$. The **change of variables** (or substitution) rule says you can replace the variable of integration to get $\int_1^2 x^3\,dx$, which is immediate. This checkpoint makes that manoeuvre precise and proves it.

## Formal statement

Let $\varphi: [\alpha, \beta] \to \mathbb{R}$ be continuously differentiable (i.e., $\varphi \in C^1[\alpha,\beta]$), with $\varphi([\alpha,\beta]) \subseteq [a,b]$. Let $f: [a,b] \to \mathbb{R}$ be continuous. Then

$$
\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx.
$$

Note that the limits on the right are $\varphi(\alpha)$ and $\varphi(\beta)$, not necessarily $a$ and $b$; and $\varphi$ need not be injective. The only requirements are that $\varphi$ maps $[\alpha, \beta]$ into $[a, b]$, that $\varphi$ is $C^1$, and that $f$ is continuous.

## Proof via the chain rule

Since $f$ is continuous on $[a, b]$, by the [Newton–Leibniz formula](../newton_leibniz_formula/) it has a primitive $F$ satisfying $F'(x) = f(x)$ for all $x \in [a, b]$.

Consider the composite function $H(t) \coloneqq F(\varphi(t))$. By the [chain rule](../../differential/chain_rule/),

$$
H'(t) = F'(\varphi(t))\,\varphi'(t) = f(\varphi(t))\,\varphi'(t).
$$

Since $\varphi$ is $C^1$ and $f$ is continuous, the product $f(\varphi(t))\,\varphi'(t)$ is continuous on $[\alpha, \beta]$, so $H$ is a primitive of $f(\varphi(t))\,\varphi'(t)$ on $[\alpha, \beta]$. Applying Newton–Leibniz to the left-hand side:

$$
\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = H(\beta) - H(\alpha) = F(\varphi(\beta)) - F(\varphi(\alpha)).
$$

Applying Newton–Leibniz to the right-hand side:

$$
\int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx = F(\varphi(\beta)) - F(\varphi(\alpha)).
$$

The two sides are equal. $\square$

The proof is strikingly short once you have Newton–Leibniz and the chain rule: the entire content of the substitution rule is just the chain rule applied to a composite involving a primitive.

## Indefinite form and the "substitute back" step

For indefinite integrals, the change-of-variables rule takes the form

$$
\int f(\varphi(t))\,\varphi'(t)\,dt = \int f(x)\,dx\bigg|_{x = \varphi(t)} = F(\varphi(t)) + C,
$$

where $F$ is a primitive of $f$. In practice, you perform the substitution $x = \varphi(t)$, $dx = \varphi'(t)\,dt$, evaluate $\int f(x)\,dx$ in the new variable to get $F(x) + C$, and then **substitute back** $x = \varphi(t)$ to express the answer in terms of $t$.

For definite integrals you do not need to substitute back, because the limits are transformed directly: $t = \alpha$ gives the lower limit $x = \varphi(\alpha)$, and $t = \beta$ gives the upper limit $x = \varphi(\beta)$.

## Substitution patterns

### Linear substitution

For integrals involving $ax + b$, set $x = \varphi(t) = at + b$, so $\varphi'(t) = a$ and $dx = a\,dt$. This gives

$$
\int f(ax + b)\,dx = \frac{1}{a}\int f(u)\,du\bigg|_{u = ax+b}.
$$

For example, $\int e^{2x+3}\,dx = \dfrac{1}{2}e^{2x+3} + C$.

### Trigonometric substitution

When the integrand involves $\sqrt{a^2 - x^2}$, set $x = a\sin\theta$ (with $\theta \in [-\pi/2, \pi/2]$). Then

$$
\sqrt{a^2 - x^2} = \sqrt{a^2 - a^2\sin^2\theta} = a\cos\theta \quad (\text{since } \cos\theta \geq 0),
$$

and $dx = a\cos\theta\,d\theta$. The radical is eliminated entirely.

Similarly, for $\sqrt{a^2 + x^2}$ use $x = a\tan\theta$, and for $\sqrt{x^2 - a^2}$ use $x = a/\cos\theta = a\sec\theta$.

### Inverse substitution ($t$-substitution)

Sometimes it is more natural to let $x = \varphi(t)$ be an explicit function of a new variable $t$ — for example, to rationalize an expression or handle a rational integrand. As long as $\varphi$ is $C^1$ and the range condition is satisfied, the same formula applies with the roles of the two sides swapped: you compute the integral in $t$ and substitute back $t = \varphi^{-1}(x)$ if needed.

## Worked examples

### Example 1: $\int_0^1 2x(x^2+1)^3\,dx$

Set $u = x^2 + 1$, so $du = 2x\,dx$. When $x = 0$, $u = 1$; when $x = 1$, $u = 2$. The integral transforms to

$$
\int_0^1 2x(x^2+1)^3\,dx = \int_1^2 u^3\,du = \left[\frac{u^4}{4}\right]_1^2 = \frac{16}{4} - \frac{1}{4} = \frac{15}{4}.
$$

### Example 2: $\int_0^1 \sqrt{1 - x^2}\,dx$

This is the area of a quarter unit circle, which you know to be $\pi/4$. Let us confirm using trigonometric substitution. Set $x = \sin\theta$, so $dx = \cos\theta\,d\theta$ and $\sqrt{1-x^2} = \cos\theta$. When $x = 0$, $\theta = 0$; when $x = 1$, $\theta = \pi/2$. The integral becomes

$$
\int_0^{\pi/2} \cos\theta \cdot \cos\theta\,d\theta = \int_0^{\pi/2} \cos^2\theta\,d\theta.
$$

Using the double-angle identity $\cos^2\theta = \dfrac{1 + \cos 2\theta}{2}$:

$$
\int_0^{\pi/2} \frac{1 + \cos 2\theta}{2}\,d\theta
= \left[\frac{\theta}{2} + \frac{\sin 2\theta}{4}\right]_0^{\pi/2}
= \frac{\pi/2}{2} + \frac{\sin\pi}{4} - 0
= \frac{\pi}{4}.
$$

### Example 3: $\int \dfrac{dx}{1 + e^x}$

Set $u = e^x$, so $du = e^x\,dx = u\,dx$, giving $dx = \dfrac{du}{u}$. Substituting:

$$
\int \frac{dx}{1 + e^x} = \int \frac{1}{1 + u}\cdot\frac{du}{u} = \int \frac{du}{u(1+u)}.
$$

Partial fractions: $\dfrac{1}{u(1+u)} = \dfrac{1}{u} - \dfrac{1}{1+u}$. Integrating:

$$
\int \left(\frac{1}{u} - \frac{1}{1+u}\right)du = \ln u - \ln(1+u) + C = \ln\frac{u}{1+u} + C.
$$

Substituting back $u = e^x$:

$$
\int \frac{dx}{1+e^x} = \ln\frac{e^x}{1+e^x} + C = x - \ln(1 + e^x) + C.
$$

(The last equality uses $\ln(e^x) = x$.)

## Summary

- The **change-of-variables theorem**: if $\varphi \in C^1[\alpha,\beta]$ with $\varphi([\alpha,\beta]) \subseteq [a,b]$ and $f$ is continuous on $[a,b]$, then $\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx$.
- The proof uses the [chain rule](../../differential/chain_rule/) to differentiate $F(\varphi(t))$, then applies the [Newton–Leibniz formula](../newton_leibniz_formula/) to both sides.
- For **definite integrals**, transform the limits directly: $t = \alpha \mapsto x = \varphi(\alpha)$, $t = \beta \mapsto x = \varphi(\beta)$; no need to substitute back.
- For **indefinite integrals**, after evaluating $\int f(x)\,dx = F(x) + C$, substitute back $x = \varphi(t)$ to express the answer in terms of the original variable.
- **Linear substitution** $u = ax + b$ is the simplest case; it introduces a factor of $1/a$.
- **Trigonometric substitution** $x = a\sin\theta$ (or $a\tan\theta$, $a\sec\theta$) eliminates square roots of quadratic expressions.
- **Inverse substitution** (setting $x = \varphi(t)$ explicitly) can rationalize complex integrands, such as those involving $e^x$ via $u = e^x$.
