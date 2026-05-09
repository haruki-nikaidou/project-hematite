---
title: Semigroup & Monoid
summary: "A beginner-friendly introduction to semigroups and monoids — two of the simplest algebraic structures — and how they appear in everyday programming through string concatenation, natural number addition, and more."
prerequisites:
  - elementry/math/peano_axioms
aliases: []
tags: ["Group Theory", "Abstract Algebra"]
updated: 2026-05-09
---

You add numbers, join strings, and merge lists every day as a programmer. These feel like completely different operations — but they all secretly share the same mathematical shape. Once you know that shape by name, you'll start spotting it everywhere, and recognising it will help you reason about code more clearly.

## What is a binary operation?

A **binary operation** on a set $S$ is a rule that takes *two* elements of $S$ and produces *one* element, also in $S$.

More precisely, a binary operation is a function:

$$
\star : S \times S \to S
$$

The symbol $\star$ is just a placeholder — the actual operation might be $+$, $\times$, string concatenation, or anything else you can think of.

The crucial constraint is **closure**: the result of combining two elements of $S$ must land back *inside* $S$. If you add two natural numbers, you get another natural number — not a string, not a fraction, another natural number. The operation never escapes the set.

A few concrete examples:

- $+$ on $\mathbb{N}$: $3 + 5 = 8$, still in $\mathbb{N}$. ✓
- $\times$ on $\mathbb{N}$: $3 \times 5 = 15$, still in $\mathbb{N}$. ✓
- Concatenation on the set of all strings: `"hello"` $\mathbin{++}$ `" world"` $=$ `"hello world"`, still a string. ✓
- $\max$ on $\mathbb{N}$: $\max(3, 5) = 5$, still in $\mathbb{N}$. ✓

## The key property: associativity

Not all binary operations are created equal. The most important property a binary operation can have is **associativity**.

An operation $\star$ on $S$ is **associative** if, for every $a, b, c \in S$:

$$
(a \star b) \star c = a \star (b \star c) \tag{1}
$$

In plain English: when combining three things in a row, *where you place the parentheses doesn't matter*. You can group the first two elements first, or the last two first — the answer is always the same.

Let's check this for addition on $\mathbb{N}$:

$$
(2 + 3) + 4 = 5 + 4 = 9
$$

$$
2 + (3 + 4) = 2 + 7 = 9
$$

Same result either way. Addition is associative.

String concatenation is also associative. Let's verify:

$$
(\texttt{"ab"} \mathbin{++} \texttt{"cd"}) \mathbin{++} \texttt{"ef"}
= \texttt{"abcd"} \mathbin{++} \texttt{"ef"}
= \texttt{"abcdef"}
$$

$$
\texttt{"ab"} \mathbin{++} (\texttt{"cd"} \mathbin{++} \texttt{"ef"})
= \texttt{"ab"} \mathbin{++} \texttt{"cdef"}
= \texttt{"abcdef"}
$$

Same result. The grouping truly does not matter.

Now consider **subtraction** on the integers $\mathbb{Z}$. Is that associative?

$$
(10 - 3) - 2 = 7 - 2 = 5
$$

$$
10 - (3 - 2) = 10 - 1 = 9
$$

Different results — subtraction is *not* associative. Moving the parentheses changes the answer.

Associativity is powerful because it means you can safely **drop all the parentheses** in a long chain of operations. Instead of worrying about whether to write $(a \star b) \star c$ or $a \star (b \star c)$, you write $a \star b \star c$ with no ambiguity whatsoever.

## Semigroups

You now have everything you need to understand the first structure.

> **Definition.** A **semigroup** is a pair $(S, \star)$ where $S$ is a non-empty set and $\star$ is a binary operation on $S$ that is associative.

That is the entire definition — a set and an associative operation. Nothing else is required.

### Examples of semigroups

**Positive integers under addition.** Let $\mathbb{Z}^+ = \{1, 2, 3, \ldots\}$. Addition is a binary operation (the sum of two positive integers is a positive integer) and is associative. So $(\mathbb{Z}^+, +)$ is a semigroup.

**Natural numbers under multiplication.** The product of two natural numbers is a natural number, and multiplication is associative, so $(\mathbb{N}, \times)$ is a semigroup.

**Non-empty strings under concatenation.** Let $S^+$ be the set of all strings with at least one character. Concatenating two non-empty strings always gives a non-empty string, and concatenation is associative. So $(S^+, \mathbin{++})$ is a semigroup.

**Natural numbers under maximum.** $\max(a, b)$ is always a natural number when $a$ and $b$ are, and:

$$
\max(\max(a, b),\; c) = \max(a,\; \max(b, c))
$$

Both sides simply equal the largest value among $a$, $b$, and $c$. So $(\mathbb{N}, \max)$ is a semigroup.

### A non-example

$(\mathbb{Z}, -)$, the integers under subtraction, is **not** a semigroup: you just saw above that subtraction fails associativity.

## What's missing: the identity element

Semigroups are already useful, but there is something extra that some of them have and others don't.

Think about what happens when you add $0$ to any natural number:

$$
n + 0 = n \qquad \text{and} \qquad 0 + n = n
$$

Or when you concatenate the empty string `""` with any string:

$$
s \mathbin{++} \texttt{""} = s \qquad \text{and} \qquad \texttt{""} \mathbin{++} s = s
$$

The number $0$ and the string `""` each play a special role: they don't *do* anything. Combining them with any element just gives that element back unchanged. This special element is called an **identity element**.

Formally, $e \in S$ is an **identity element** for $(S, \star)$ if, for every $a \in S$:

$$
e \star a = a \qquad \text{and} \qquad a \star e = a \tag{2}
$$

Both conditions must hold. The identity must be neutral whether it appears on the left or on the right.

### When does a semigroup have an identity?

Not every semigroup does. Take $(\mathbb{Z}^+, +)$ — positive integers under addition. For an identity element $e$ to exist, you would need some positive integer $e$ such that $n + e = n$ for every $n \in \mathbb{Z}^+$. That means $e = 0$, but $0$ is not a positive integer. So $(\mathbb{Z}^+, +)$ has no identity element.

Likewise, $(S^+, \mathbin{++})$ — non-empty strings under concatenation — has no identity: the empty string `""` would work perfectly, but it isn't in the set $S^+$ of *non-empty* strings.

Whether or not an identity exists often comes down to whether you've been careful to include the "empty" or "zero" case in your set.

## Monoids

A semigroup that has an identity element earns a new name.

> **Definition.** A **monoid** is a triple $(S, \star, e)$ where $(S, \star)$ is a semigroup and $e \in S$ is an identity element for $\star$.

Every monoid is a semigroup, but not every semigroup is a monoid. The extra ingredient is exactly the identity element.

### Examples of monoids

| Set $S$ | Operation $\star$ | Identity $e$ |
|---|---|---|
| $\mathbb{N}$ | $+$ | $0$ |
| $\mathbb{N}$ | $\times$ | $1$ |
| All strings | concatenation | `""` |
| All lists | concatenation | `[]` |
| $\mathbb{N}$ | $\max$ | $0$ |

The last row might surprise you. Is $0$ really an identity for $\max$ on $\mathbb{N}$?

$$
\max(0, n) = n \qquad \text{and} \qquad \max(n, 0) = n
$$

Yes — because $0$ is the smallest natural number, taking the max of $0$ with any $n$ always returns $n$. So $(\mathbb{N}, \max, 0)$ is indeed a monoid.

### The identity is unique

A monoid has *exactly one* identity element — you can never have two different ones. Here's why: suppose both $e$ and $f$ are identity elements for the same operation. Then:

$$
e = e \star f = f
$$

The first equality holds because $f$ is an identity (it changes nothing on the right). The second equality holds because $e$ is an identity (it changes nothing on the left). So $e$ and $f$ must be the same element.

This is reassuring: once you find *an* identity, you know it's *the* identity.

## A case study: natural number addition from Peano axioms

If you've read the [Peano Axioms](../peano_axioms/) checkpoint, you'll remember that addition on $\mathbb{N}$ is defined recursively using just two rules:

$$
m + 0 \coloneqq m \tag{A1}
$$

$$
m + S(n) \coloneqq S(m + n) \tag{A2}
$$

where $S(n)$ means "the successor of $n$", i.e. the number right after $n$.

From these two rules alone, you can *prove* that $(\mathbb{N}, +, 0)$ is a monoid — you don't need to take it on faith.

**Identity (right side).** Rule (A1) directly states $m + 0 = m$, so $0$ is a right identity. ✓

**Identity (left side).** The claim $0 + m = m$ requires a short induction on $m$:
- *Base case* ($m = 0$): $0 + 0 = 0$ by (A1). ✓
- *Inductive step*: assume $0 + m = m$. Then $0 + S(m) = S(0 + m) = S(m)$ by (A2) and the assumption. ✓

So $0$ is also a left identity, confirming it is the identity element. ✓

**Associativity.** The proof that $(a + b) + c = a + (b + c)$ is a similar induction on $c$, using (A1) and (A2) at each step. The details are a good exercise in proof by induction.

The upshot: the monoid $(\mathbb{N}, +, 0)$ is not just a pattern you observe in examples — it is a *theorem* that follows from Peano's definitions. The structure is baked into the axioms themselves.

## Summary

- A **binary operation** $\star$ on a set $S$ maps any two elements of $S$ to another element of $S$ — this is called *closure*.
- An operation is **associative** if $(a \star b) \star c = a \star (b \star c)$ always holds. Associativity lets you remove parentheses from long chains without changing the result.
- A **semigroup** $(S, \star)$ is a set equipped with an associative binary operation. Examples: $(\mathbb{Z}^+, +)$, $(\mathbb{N}, \times)$, and non-empty strings under concatenation.
- An **identity element** $e$ satisfies $e \star a = a \star e = a$ for every $a \in S$. When an identity exists, it is *unique*.
- A **monoid** $(S, \star, e)$ is a semigroup that also has an identity element. Examples: $(\mathbb{N}, +, 0)$, $(\mathbb{N}, \times, 1)$, all strings under concatenation with identity `""`.
- Not every semigroup is a monoid: $(\mathbb{Z}^+, +)$ and non-empty strings under concatenation are semigroups without an identity.
- From the Peano axioms, you can *prove* that $(\mathbb{N}, +, 0)$ is a monoid — the structure is a logical consequence of the definitions of $0$, $S$, and $+$.
