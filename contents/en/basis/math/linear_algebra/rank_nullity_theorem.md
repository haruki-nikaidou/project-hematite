---
title: Rank-Nullity Theorem
summary: "Proves the rank-nullity theorem — that the dimension of a linear map's domain equals its rank plus its nullity — and draws out the consequences for square matrices and invertibility."
prerequisites: 
  - basis/math/linear_algebra/kernel
  - basis/math/linear_algebra/image
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

The rank-nullity theorem is a conservation law for dimensions. When a linear map acts on a vector space, no dimensions disappear without a trace: they either survive in the image or get absorbed into the kernel. The theorem makes this precise and immediately explains why injectivity and surjectivity coincide for square linear maps.

## Statement

**Rank-nullity theorem**: Let $V$ be a finite-dimensional vector space over a field $F$, and let $T: V \to W$ be a linear map. Then

$$
\dim (V) = \operatorname{rank} (T) + \operatorname{nullity} (T). \tag{1}
$$

In words: the dimension of the domain equals the dimension of the image plus the dimension of the kernel.

## Proof

Let $k = \text{nullity}(T) = \dim(\ker(T))$, and choose a basis $\{u_1, \ldots, u_k\}$ of $\ker(T)$.

**Step 1: Extend to a basis of $V$.** Since $\ker(T)$ is a subspace of the finite-dimensional space $V$, we can extend $\{u_1, \ldots, u_k\}$ to a full basis of $V$. Call the extra vectors $v_1, \ldots, v_r$, so

$$\mathcal{B} = \{u_1, \ldots, u_k, v_1, \ldots, v_r\}$$

is a basis of $V$. Then $\dim(V) = k + r$.

**Step 2: $\{T(v_1), \ldots, T(v_r)\}$ spans $\text{im}(T)$.** Take any $w \in \text{im}(T)$; write $w = T(x)$ for some $x \in V$. Expand $x$ in the basis $\mathcal{B}$:

$$x = \sum_{i=1}^k c_i\, u_i + \sum_{j=1}^r d_j\, v_j.$$

Apply $T$ and use linearity. Since each $u_i \in \ker(T)$, we get $T(u_i) = \mathbf{0}$:

$$w = T(x) = \sum_{i=1}^k c_i\, T(u_i) + \sum_{j=1}^r d_j\, T(v_j) = \sum_{j=1}^r d_j\, T(v_j).$$

So $w$ is a linear combination of $T(v_1), \ldots, T(v_r)$, confirming they span $\text{im}(T)$.

**Step 3: $\{T(v_1), \ldots, T(v_r)\}$ is linearly independent.** Suppose $\sum_{j=1}^r d_j\, T(v_j) = \mathbf{0}$. By linearity, $T\!\left(\sum_{j=1}^r d_j\, v_j\right) = \mathbf{0}$, so $\sum_{j} d_j\, v_j \in \ker(T)$. Therefore this vector is a linear combination of the basis of $\ker(T)$:

$$\sum_{j=1}^r d_j\, v_j = \sum_{i=1}^k e_i\, u_i$$

for some scalars $e_i$. Rearranging: $\sum_{j} d_j\, v_j - \sum_{i} e_i\, u_i = \mathbf{0}$. Since $\mathcal{B}$ is a basis of $V$, all coefficients are zero — in particular $d_1 = \cdots = d_r = 0$.

**Step 4: Conclude.** $\{T(v_1), \ldots, T(v_r)\}$ is a basis of $\text{im}(T)$, so $\text{rank}(T) = r$. Therefore:

$$\dim(V) = k + r = \text{nullity}(T) + \text{rank}(T). \qquad \square$$

## Interpretation

Informally, $V$ splits into two parts: the $k$-dimensional kernel (which $T$ crushes entirely to zero) and an $r$-dimensional complement (which $T$ maps isomorphically onto $\text{im}(T)$). The total dimension is preserved: $k + r = \dim(V)$. No dimensions are created or destroyed — they are simply rerouted.

## Consequences for square matrices

Now suppose $T: F^n \to F^n$ is a linear map with matrix $A \in M_{n,n}(F)$ (a **square** matrix). Applying (1):

$$n = \text{rank}(T) + \text{nullity}(T).$$

The domain and codomain have the same dimension $n$, and the dimensions of the kernel and image must sum to exactly $n$. This rigid budget creates the following equivalence:

**Theorem**: For $T: F^n \to F^n$ (equivalently, for an $n \times n$ matrix $A$), the following statements are all equivalent:

1. $T$ is **injective** ($\ker(T) = \{\mathbf{0}\}$, i.e., $\text{nullity}(T) = 0$).
2. $T$ is **surjective** ($\text{im}(T) = F^n$, i.e., $\text{rank}(T) = n$).
3. $T$ is **bijective** (and hence has an inverse $T^{-1}$).
4. $\text{rank}(A) = n$ (all $n$ columns — equivalently, all $n$ rows — of $A$ are linearly independent).

The reason: if nullity is $0$, then rank must be $n$ (from (1)), so $T$ is both injective and surjective. There is no room for the rank to be $n$ without the nullity being $0$, and vice versa — the two quantities share a fixed budget of $n$.

This is a purely dimension-counting phenomenon: in infinite dimensions, injectivity and surjectivity can fail independently. In finite dimensions, they are inseparable for square maps.

## A concrete example

Let $A$ be a $4 \times 6$ matrix with $\text{rank}(A) = 3$. The domain is $F^6$, so $\dim = 6$. By (1):

$$\text{nullity}(A) = 6 - \text{rank}(A) = 6 - 3 = 3.$$

The kernel is three-dimensional: there are three linearly independent vectors in $F^6$ that $A$ maps to zero. The image is three-dimensional inside $F^4$ — $A$ cannot be surjective (since $3 < 4$).

## Summary

- **Rank-nullity theorem**: $\dim(V) = \text{rank}(T) + \text{nullity}(T)$ for any linear map $T: V \to W$ with $V$ finite-dimensional.
- **Proof idea**: extend a basis of $\ker(T)$ to a basis of $V$; the extra vectors map to a basis of $\text{im}(T)$.
- **Interpretation**: the domain splits between the kernel (dimensions collapsed to zero) and a complement (dimensions mapped isomorphically to the image).
- **For square maps** $T: F^n \to F^n$: injectivity, surjectivity, and bijectivity (invertibility) are all equivalent — they run out of the same $n$-dimensional budget simultaneously.
