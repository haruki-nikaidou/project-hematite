---
title: Linear
summary: "A short introduction to what it means for a mathematical operation to be linear, covering the two defining rules and the idea of a linear combination."
prerequisites: []
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-08
---

If you double an input and the output doubles too, you're onto something powerful. **Linearity** is one of the simplest structural properties in mathematics, and it shows up everywhere — from physics to computer graphics to machine learning.

## The two rules

A function $f$ is **linear** if it satisfies two rules for all valid inputs $x$, $y$ and any real number $c$:

**Rule 1 — Additivity.** Applying $f$ to a sum is the same as summing the outputs:

$$
f(x + y) = f(x) + f(y) \tag{1}
$$

**Rule 2 — Homogeneity.** Scaling the input scales the output by the same factor:

$$
f(cx) = c \cdot f(x) \tag{2}
$$

Rules (1) and (2) are usually written as a single condition:

$$
f(ax + by) = a \cdot f(x) + b \cdot f(y) \tag{3}
$$

Equation (3) says that $f$ **preserves structure**: it doesn't matter whether you combine inputs before or after applying $f$.

## An example: does squaring qualify?

Let $f(x) = 5x$. Check both rules:

- Additivity: $f(x + y) = 5(x + y) = 5x + 5y = f(x) + f(y)$ ✓  
- Homogeneity: $f(cx) = 5(cx) = c \cdot 5x = c \cdot f(x)$ ✓  

Now try $g(x) = x^2$:

- Additivity: $g(x + y) = (x + y)^2 = x^2 + 2xy + y^2$, which is *not* equal to $x^2 + y^2 = g(x) + g(y)$ whenever $xy \neq 0$. ✗  

So multiplying by a constant is linear; squaring is not.

Note that a straight-line function like $h(x) = 3x + 2$ *looks* linear on a graph, but it fails Rule 1 because $h(0) = 2 \neq 0$. A function with that shape is called **affine**, not linear.

## Linear combinations

Equation (3) extends naturally when you have more than two terms. A **linear combination** of a collection of objects $v_1, v_2, \ldots, v_k$ is any expression of the form:

$$
c_1 v_1 + c_2 v_2 + \cdots + c_k v_k
$$

where $c_1, \ldots, c_k$ are real numbers called **coefficients**. Linear maps preserve linear combinations exactly:

$$
f(c_1 v_1 + \cdots + c_k v_k) = c_1 f(v_1) + \cdots + c_k f(v_k)
$$

This means you can break any input into simpler pieces, apply $f$ to each piece, and then reassemble — a trick that makes linear problems far easier to solve than non-linear ones.

## Summary

- A function is **linear** when it satisfies *additivity* $(1)$ and *homogeneity* $(2)$.
- Together these mean $f(ax + by) = a \cdot f(x) + b \cdot f(y)$ — linearity preserves structure.
- A straight line that misses the origin is *affine*, not linear.
- A **linear combination** is a sum of scaled objects; linear functions preserve linear combinations.

## What's next

Linear combinations are the building block of [Finite-dimensional Vector Spaces](../vector_space/), where you'll see how these ideas organise into a rich algebraic structure.
