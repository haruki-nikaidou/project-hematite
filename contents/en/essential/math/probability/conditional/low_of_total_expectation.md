---
title: Law of Total Expectation
summary: "The law of total expectation states E[X] = E[E[X | Y]] — averaging the conditional expectation over the conditioning variable recovers the unconditional expectation. This checkpoint proves the identity in the discrete and absolutely continuous cases, presents the analogous law of total variance Var(X) = E[Var(X | Y)] + Var(E[X | Y]), and applies the technique to compute expectations by conditioning on an auxiliary variable that simplifies the problem."
prerequisites:
  - essential/math/probability/conditional/conditional_exp
aliases: []
tags:
  - Probability
  - Conditional Probability
  - Expectation
updated: 2026-05-22
---

The [law of total probability](../conditional_pr/) says $P(A) = \sum_i P(A \mid B_i) P(B_i)$. The **law of total expectation** is the exact analogue for expectations: averaging the conditional expectation over the conditioning variable recovers the unconditional expectation.

## Statement and proof

**Theorem (Law of total expectation).** For any integrable random variable $X$ and random variable $Y$:

$$
E[X] = E\!\left[E[X \mid Y]\right]. \tag{1}
$$

### Proof in the discrete case

Let $Y$ take values $y_1, y_2, \ldots$ with $P(Y = y_i) = p_i$. Since $E[X \mid Y]$ is the random variable that equals $E[X \mid Y = y_i]$ on the event $\{Y = y_i\}$:

$$
E\!\left[E[X \mid Y]\right] = \sum_i E[X \mid Y = y_i] \, p_i = \sum_i \sum_k x_k \, P(X = x_k \mid Y = y_i) \, p_i.
$$

Using $P(X = x_k \mid Y = y_i) \cdot p_i = P(X = x_k, Y = y_i)$:

$$
= \sum_k x_k \sum_i P(X = x_k, Y = y_i) = \sum_k x_k \, P(X = x_k) = E[X]. \qquad \square
$$

### Proof in the absolutely continuous case

If $(X, Y)$ has joint density $f_{X,Y}$ and marginals $f_X$, $f_Y$, then with $f_{X \mid Y}(x \mid y) = f_{X,Y}(x,y)/f_Y(y)$:

$$
E\!\left[E[X \mid Y]\right] = \int_{-\infty}^{+\infty} E[X \mid Y = y] \, f_Y(y) \, dy = \int_{-\infty}^{+\infty} \!\!\left(\int_{-\infty}^{+\infty} x \, f_{X \mid Y}(x \mid y) \, dx\right) f_Y(y) \, dy.
$$

Since $f_{X \mid Y}(x \mid y) f_Y(y) = f_{X,Y}(x,y)$, Fubini's theorem gives:

$$
= \int_{-\infty}^{+\infty} x \left(\int_{-\infty}^{+\infty} f_{X,Y}(x,y) \, dy\right) dx = \int_{-\infty}^{+\infty} x \, f_X(x) \, dx = E[X]. \qquad \square
$$

## Conditioning as a computational strategy

The strategic value of $(1)$ is in the choice of $Y$: pick a conditioning variable that makes $E[X \mid Y = y]$ easy to compute, then combine using the distribution of $Y$.

**Example.** Items are produced in batches. The batch size $N$ is geometric with parameter $p = 0.5$ (so $E[N] = 1/p = 2$). Given a batch of size $n$, each item is independently defective with probability $q = 0.1$. Let $D$ be the total number of defective items.

Conditioning on $N$: given $N = n$, $D \mid N = n$ is $\operatorname{Binomial}(n, q)$ with mean $nq$, so

$$
E[D \mid N] = Nq.
$$

By the law of total expectation:

$$
E[D] = E[E[D \mid N]] = E[Nq] = q \, E[N] = 0.1 \times 2 = 0.2.
$$

## Law of total variance

A companion identity decomposes the variance of $X$ into two interpretable parts:

$$
\operatorname{Var}(X) = E[\operatorname{Var}(X \mid Y)] + \operatorname{Var}(E[X \mid Y]). \tag{2}
$$

The first term $E[\operatorname{Var}(X \mid Y)]$ is the **within-group variance** — the average variability of $X$ within each level of $Y$. The second term $\operatorname{Var}(E[X \mid Y])$ is the **between-group variance** — how much the conditional mean $E[X \mid Y = y]$ itself varies across levels of $Y$.

*Proof.* Use $\operatorname{Var}(Z) = E[Z^2] - (E[Z])^2$ and apply the law of total expectation twice:

$$
E[X^2] = E\!\left[E[X^2 \mid Y]\right] = E\!\left[\operatorname{Var}(X \mid Y) + (E[X \mid Y])^2\right].
$$

Also $(E[X])^2 = (E[E[X \mid Y]])^2$. Subtracting:

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2 = E[\operatorname{Var}(X \mid Y)] + E[(E[X \mid Y])^2] - (E[E[X \mid Y]])^2 = E[\operatorname{Var}(X \mid Y)] + \operatorname{Var}(E[X \mid Y]).
$$

**Example (continued).** With $D$ and $N$ as above, $\operatorname{Var}(D \mid N = n) = nq(1-q)$, so $\operatorname{Var}(D \mid N) = Nq(1-q)$ and $E[D \mid N] = Nq$.

For geometric$(p)$ we have $\operatorname{Var}(N) = (1-p)/p^2 = 2$.

- Within-group: $E[\operatorname{Var}(D \mid N)] = E[Nq(1-q)] = q(1-q) E[N] = 0.1 \times 0.9 \times 2 = 0.18$.
- Between-group: $\operatorname{Var}(E[D \mid N]) = \operatorname{Var}(Nq) = q^2 \operatorname{Var}(N) = 0.01 \times 2 = 0.02$.

So $\operatorname{Var}(D) = 0.18 + 0.02 = 0.20$.

## Summary

- **Law of total expectation**: $E[X] = E[E[X \mid Y]]$ — averaging the conditional expectation over the conditioning variable recovers the unconditional expectation.
- **Strategic use**: choose $Y$ so that $E[X \mid Y = y]$ has a simple closed form, then combine using the distribution of $Y$.
- **Law of total variance**: $\operatorname{Var}(X) = E[\operatorname{Var}(X \mid Y)] + \operatorname{Var}(E[X \mid Y])$ — total variance splits into within-group variance and between-group variance.
