---
title: Group
summary: "A group is a monoid where every element is reversible — every operation can be undone. This article defines groups, works through concrete examples, and introduces abelian groups."
prerequisites: 
  - elementry/math/semigroup_monoid
aliases: []
tags: ["Abstract Algebra", "Group Theory"]
updated: 2026-05-19
---

A [monoid](../../elementry/math/semigroup_monoid/) gives you an associative operation and a do-nothing identity. But it says nothing about undoing. If you add $5$ to a number, can you get back to where you started? If you apply a rotation, can you reverse it? A **group** is a monoid that guarantees every operation is reversible.

## The missing ingredient: inverses

In the monoid $(\mathbb{N}, +, 0)$, adding $5$ to $3$ gives $8$. But there is no natural number you can add to $8$ to get back to $3$ — subtraction takes you out of $\mathbb{N}$. Natural number addition is a monoid, not a group.

Expand the set to all integers $\mathbb{Z}$, and now every element has a partner that cancels it out: $3$ pairs with $-3$, and $3 + (-3) = 0$. That cancelling partner is called an **inverse**.

Formally, given a monoid $(G, \star, e)$, an element $a^{-1} \in G$ is the **inverse** of $a$ if:

$$
a \star a^{-1} = e \qquad \text{and} \qquad a^{-1} \star a = e \tag{1}
$$

Both sides must equal the identity. The inverse works whether it appears on the left or the right.

## Definition

> **Definition.** A **group** is a monoid $(G, \star, e)$ in which every element has an inverse. That is, for every $a \in G$ there exists $a^{-1} \in G$ satisfying equation (1).

Unpacking this, a group $(G, \star, e)$ satisfies exactly four axioms:

| Axiom | Condition |
|-------|-----------|
| Closure | $a \star b \in G$ for all $a, b \in G$ |
| Associativity | $(a \star b) \star c = a \star (b \star c)$ |
| Identity | $e \star a = a \star e = a$ |
| Inverses | for every $a$, there exists $a^{-1}$ with $a \star a^{-1} = a^{-1} \star a = e$ |

## Examples

**Integers under addition.** $(\mathbb{Z}, +, 0)$ is a group. The inverse of any integer $n$ is $-n$, since $n + (-n) = 0$.

**Rationals under multiplication.** The set $\mathbb{Q} \setminus \{0\}$ of all non-zero rationals under multiplication $(\mathbb{Q} \setminus \{0\},\, \times,\, 1)$ is a group. The inverse of $\frac{p}{q}$ is $\frac{q}{p}$, and multiplying them gives $1$.

**Non-example — natural numbers under addition.** $(\mathbb{N}, +, 0)$ is not a group. There is no natural number that inverts $3$: you would need $-3$, which is not in $\mathbb{N}$.

**Non-example — integers under multiplication.** $(\mathbb{Z}, \times, 1)$ is not a group. The integer $2$ has no integer inverse: $\frac{1}{2} \notin \mathbb{Z}$.

**Symmetries of a square.** Consider the eight rigid motions of a square that map it to itself (four rotations and four reflections). Composing any two such motions gives another, there is an identity motion (do nothing), and every motion can be undone. This is a group, called the **dihedral group** $D_4$.

## Abelian groups

In the groups above, the order of the elements matters: a rotation followed by a reflection may differ from that reflection followed by that rotation. But for $(\mathbb{Z}, +, 0)$, the order never matters: $a + b = b + a$ for all integers.

A group is **abelian** (or *commutative*) if $a \star b = b \star a$ for every pair $a, b \in G$.

$$
a \star b = b \star a \qquad \forall\, a, b \in G \tag{2}
$$

$(\mathbb{Z}, +, 0)$ and $(\mathbb{Q} \setminus \{0\}, \times, 1)$ are abelian. $D_4$ is not. Abelian groups are structurally simpler and appear throughout mathematics; the word honours the mathematician Niels Henrik Abel.

## Basic properties

Two elementary facts follow directly from the axioms.

**Inverses are unique.** Suppose both $b$ and $c$ are inverses of $a$. Then:

$$
b = b \star e = b \star (a \star c) = (b \star a) \star c = e \star c = c
$$

So $b = c$. Every element has exactly one inverse.

**Inverse of a product.** For any $a, b \in G$:

$$
(a \star b)^{-1} = b^{-1} \star a^{-1} \tag{3}
$$

You can verify this by checking that $(a \star b) \star (b^{-1} \star a^{-1}) = a \star (b \star b^{-1}) \star a^{-1} = a \star e \star a^{-1} = e$. Notice the reversal: the inverse of a product undoes the operations in the opposite order, just as putting on socks then shoes must be reversed as removing shoes then socks.

## Summary

- A **group** $(G, \star, e)$ is a monoid in which every element $a$ has an inverse $a^{-1}$ satisfying $a \star a^{-1} = a^{-1} \star a = e$.
- The four group axioms are: closure, associativity, identity, and inverses.
- Every element has exactly one inverse.
- The inverse of a product reverses the order: $(a \star b)^{-1} = b^{-1} \star a^{-1}$.
- A group is **abelian** if $a \star b = b \star a$ for all elements; $(\mathbb{Z}, +, 0)$ is a key example.
- Groups are the algebraic language of symmetry and reversibility — the concept appears throughout algebra, geometry, and physics.
