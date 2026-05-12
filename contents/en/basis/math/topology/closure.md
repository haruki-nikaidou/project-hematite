---
title: Closure (Topology)
summary: "Defines the closure of a set in a topological space as the smallest closed set containing it, establishes its equivalent characterisations via derived sets and intersections of closed sets, and works through its key properties."
prerequisites: 
  - basis/math/topology/derived_set
  - basis/math/topology/interior
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

If you start with an open interval like $(0, 1)$ and ask "what is the smallest closed set that contains it?", the answer is immediately $[0, 1]$ — you just need to throw in the two missing endpoints. The **closure** generalises this "seal it up" operation to any subset of any topological space. Unlike the metric-space intuition of "add the limit points," the topological definition requires no distances: it works purely with open sets.

## Three equivalent definitions

Let $(X, \tau)$ be a [topological space](../topology_space/) and $A \subseteq X$. The closure of $A$, written $\overline{A}$ (or $\operatorname{cl}(A)$), can be defined in three equivalent ways.

### Definition 1: Smallest closed set containing $A$

$$
\overline{A} \coloneqq \bigcap \{ C \subseteq X : C \text{ is closed and } A \subseteq C \}. \tag{1}
$$

This is the intersection of *all* closed sets that contain $A$. An arbitrary intersection of closed sets is closed (recall: closed sets are closed under all intersections, including infinite ones). The collection of closed supersets of $A$ is non-empty since $X$ itself is always closed. So $\overline{A}$ is a well-defined closed set, and it is the smallest one containing $A$ (since every closed superset of $A$ appears in the intersection).

### Definition 2: Union with the derived set

$$
\overline{A} = A \cup A', \tag{2}
$$

where $A'$ is the [derived set](../derived_set/) of $A$ (the set of all [accumulation points](../accumulation_point/) of $A$). You adjoin to $A$ precisely those points "approached" by $A$ from outside. This was established in the derived set checkpoint: $A \cup A'$ is closed, $A \subseteq A \cup A'$, and any closed superset of $A$ must contain $A'$ too.

### Definition 3: Neighbourhood characterisation

A point $x \in X$ belongs to $\overline{A}$ if and only if every open set $U$ containing $x$ satisfies

$$
U \cap A \neq \varnothing. \tag{3}
$$

Compare this with accumulation points: the difference is that here we allow $x$ itself to be in $A$ (the intersection need not witness a *different* point of $A$). In other words, $x \in \overline{A}$ iff $x \in A$ or $x$ is an accumulation point of $A$ — which is exactly $A \cup A'$.

All three definitions yield the same set. You can use whichever is most convenient for a given argument.

## Examples

### Standard topology on $\mathbb{R}$

- $\overline{(0, 1)} = [0, 1]$. The smallest closed set containing $(0,1)$ is the closed interval; equivalently, $0$ and $1$ are accumulation points of $(0,1)$, and no other points of $\mathbb{R}$ are.
- $\overline{\mathbb{Q}} = \mathbb{R}$. Every real number is an accumulation point of $\mathbb{Q}$ (rationals are dense in $\mathbb{R}$).
- $\overline{\{1/n : n \geq 1\}} = \{1/n : n \geq 1\} \cup \{0\}$. The only accumulation point is $0$.
- $\overline{\mathbb{Z}} = \mathbb{Z}$. Every integer is isolated (no accumulation points), so the set is already closed.
- $\overline{\varnothing} = \varnothing$ and $\overline{X} = X$ always.

### Discrete topology

Every subset of $X$ is open, so every subset is also closed (complements of open sets are closed). Thus $\overline{A} = A$ for every $A$. The closure adds nothing — there are no accumulation points to adjoin.

### Indiscrete topology

Only $\varnothing$ and $X$ are closed. For any non-empty proper subset $A \subsetneq X$, the only closed set containing $A$ is $X$ itself, so $\overline{A} = X$.

## Properties of closure

Let $(X, \tau)$ be a topological space and $A, B \subseteq X$.

- **$\overline{A}$ is closed** and $A \subseteq \overline{A}$. (By definition $(1)$.)
- **$A$ is closed if and only if $A = \overline{A}$.** If $A$ is closed it appears in the intersection $(1)$, giving $\overline{A} \subseteq A$; since $A \subseteq \overline{A}$ always, equality follows.
- **Idempotent:** $\overline{\overline{A}} = \overline{A}$. Since $\overline{A}$ is already closed, its closure is itself.
- **Monotone:** if $A \subseteq B$ then $\overline{A} \subseteq \overline{B}$.
- **Union:** $\overline{A \cup B} = \overline{A} \cup \overline{B}$. A point is near $A \cup B$ iff it is near $A$ or near $B$.
- **Intersection (one direction only):** $\overline{A \cap B} \subseteq \overline{A} \cap \overline{B}$. Equality fails in general: in $\mathbb{R}$, $\overline{(0,1) \cap (1,2)} = \overline{\varnothing} = \varnothing$ but $\overline{(0,1)} \cap \overline{(1,2)} = [0,1] \cap [1,2] = \{1\}$.

## Duality with the interior

Closure and [interior](../interior/) are dual to each other via complementation. For any $A \subseteq X$:

$$
\overline{A} = X \setminus \operatorname{int}(X \setminus A), \tag{4}
$$

$$
\operatorname{int}(A) = X \setminus \overline{X \setminus A}. \tag{5}
$$

You can read $(4)$ as: the closure of $A$ is everything that is *not* in the interior of the complement. Points on the "edge" of $A$ belong to neither the interior of $A$ nor the interior of $X \setminus A$, so they end up in the closure but not the interior — which is precisely the [boundary](../boundary/).

These dual formulas mean that every theorem about closures translates into a theorem about interiors (and vice versa) by taking complements. This symmetry runs throughout topology.

## Density

A set $A$ is called **dense** in $X$ when $\overline{A} = X$: every point of $X$ is either in $A$ or is approached by $A$. The rationals $\mathbb{Q}$ are dense in $\mathbb{R}$.

More generally, $A$ is dense in $B$ when $B \subseteq \overline{A}$. Density is a central concept in analysis and topology: knowing that a "nice" set (like $\mathbb{Q}$ or the polynomials) is dense in a bigger space lets you approximate arbitrary elements by nice ones.

## Summary

- The **closure** $\overline{A}$ is the smallest closed set containing $A$, obtained by intersecting all closed supersets of $A$.
- Equivalently, $\overline{A} = A \cup A'$: adjoin the derived set to include all accumulation points.
- Equivalently by point characterisation: $x \in \overline{A}$ iff every open neighbourhood of $x$ meets $A$.
- $A$ is closed iff $A = \overline{A}$; the closure is idempotent, monotone, and distributes over finite unions.
- Closure and interior are **dual**: $\overline{A} = X \setminus \operatorname{int}(X \setminus A)$.
- A set is **dense** in $X$ when its closure is all of $X$.
- The difference between the closure and the interior — $\overline{A} \setminus \operatorname{int}(A)$ — is the **[boundary](../boundary/)** of $A$.
