---
title: Mathematical Induction
summary: A proof technique for statements about natural numbers — establish a base, then an inductive step.
prerequisites:
  - elementry/computer_science/function
aliases: []
tags: [math, proof, logic]
updated: 2026-05-03
---

## The Principle

**Mathematical induction** proves that a statement \(P(n)\) holds for all natural numbers \(n \geq n_0\) by showing:

1. **Base case**: \(P(n_0)\) is true.
2. **Inductive step**: If \(P(k)\) is true for some \(k \geq n_0\), then \(P(k+1)\) is also true.

From these two facts it follows that \(P(n)\) is true for all \(n \geq n_0\).

## Example: Sum of Natural Numbers

**Claim**: For all \(n \geq 1\),

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

**Base case** (\(n = 1\)): \(\sum_{i=1}^{1} i = 1 = \frac{1 \cdot 2}{2} = 1\). ✓

**Inductive step**: Assume the formula holds for some \(k \geq 1\):

$$\sum_{i=1}^{k} i = \frac{k(k+1)}{2}$$

Then:

$$\sum_{i=1}^{k+1} i = \frac{k(k+1)}{2} + (k+1) = \frac{k(k+1) + 2(k+1)}{2} = \frac{(k+1)(k+2)}{2}$$

This is exactly the formula with \(k+1\) in place of \(k\). ✓

By induction, the formula holds for all \(n \geq 1\). ∎

## Strong Induction

Sometimes the inductive step needs to assume \(P(j)\) for *all* \(j \leq k\), not just \(j = k\). This is **strong induction** (or complete induction). It is logically equivalent to ordinary induction.

**Claim**: Every integer \(n \geq 2\) has a prime factorisation.

*Proof sketch*: If \(n\) is prime, done. Otherwise \(n = a \cdot b\) with \(2 \leq a, b < n\). By strong induction hypothesis both \(a\) and \(b\) have prime factorisations, so \(n\) does too. ∎

## Connection to Recursion

Induction and [recursion](../computer_science/recursive) are two sides of the same coin. A recursive function is correct when:
- It handles the base case correctly.
- The recursive call produces the right answer for a strictly smaller input (inductive step).

Proving recursive algorithms correct is therefore an exercise in mathematical induction.

## Further Reading

- Structural induction (for trees, lists, and other inductively defined types).
- Well-founded induction (generalisation to any well-founded relation).
