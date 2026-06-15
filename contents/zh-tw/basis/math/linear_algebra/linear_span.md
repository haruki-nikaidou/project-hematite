---
title: 線性張成（Linear Span）
summary: "將向量集合的張成定義為其所有線性組合的集合，證明它永遠是包含該集合的最小子空間，並介紹張成集作為基底的基礎。"
prerequisites: 
  - basis/math/linear_algebra/linearly_dependent
  - basis/math/abstract_algebra/field
  - elementry/math/vector_space
aliases: []
tags: ["線性代數"]
updated: 2026-05-19
---

給定幾個向量，只用加法和純量乘法能從它們建立什麼？答案——所有可能輸出的集合——就是**張成（span）**。張成是線性代數的核心構造：每個子空間、每個基底、每個列空間和行空間，最終都被描述為某個集合的張成。

## 定義

設 $V$ 是體 $F$ 上的向量空間，$S \subseteq V$ 是任意子集。$S$ 的**張成**是 $S$ 的所有[線性組合](../linearly_dependent/)的集合：

$$\text{span}(S) \coloneqq \bigl\{ c_1 v_1 + \cdots + c_k v_k : k \ge 0,\ v_1, \ldots, v_k \in S,\ c_1, \ldots, c_k \in F \bigr\}. \tag{1}$$

兩個邊界情形：
- $\text{span}(\emptyset) = \{\mathbf{0}\}$（按慣例）：零個向量的和是空和，等於 $\mathbf{0}$。
- $\text{span}(\{v\}) = \{cv : c \in F\}$，即過原點沿 $v$ 方向的直線。

## 例子

**$\mathbb{R}^2$ 中的張成。** 設 $e_1 = (1, 0)$，$e_2 = (0, 1)$。
- $\text{span}(\{e_1\}) = \{(c, 0) : c \in \mathbb{R}\}$ — $x$ 軸。
- $\text{span}(\{e_1, e_2\}) = \{(c_1, c_2) : c_1, c_2 \in \mathbb{R}\} = \mathbb{R}^2$ — 整個平面。
- $\text{span}(\{(1,0), (2,0)\}) = \{(c,0) : c \in \mathbb{R}\}$ — 仍然只是 $x$ 軸，因為 $(2,0)$ 已是 $(1,0)$ 的倍數，沒有帶來任何新的東西。

**$\mathbb{R}^3$ 中的張成。** 設 $u = (1, 0, 0)$，$v = (0, 1, 0)$。
- $\text{span}(\{u, v\}) = \{(c_1, c_2, 0) : c_1, c_2 \in \mathbb{R}\}$ — $xy$ 平面。
- 加入 $w = (0, 0, 1)$：$\text{span}(\{u, v, w\}) = \mathbb{R}^3$。
- 改為加入 $(1, 1, 0)$：$\text{span}(\{u, v, (1,1,0)\}) = \text{span}(\{u,v\})$ — 仍然只是 $xy$ 平面，因為 $(1,1,0) = u + v$。

規律：一個冗餘向量（已是其他向量的線性組合）不會擴大張成。

## 張成永遠是子空間

**定理**：對任意 $S \subseteq V$，集合 $\text{span}(S)$ 是 $V$ 的子空間。

*證明。* $\text{span}(S)$ 非空（$\mathbf{0} \in \text{span}(S)$，通過空組合得到）。若 $x = c_1 v_1 + \cdots + c_k v_k$ 和 $y = d_1 w_1 + \cdots + d_l w_l$ 是 $\text{span}(S)$ 的兩個元素，$a, b \in F$，則

$$ax + by = ac_1 v_1 + \cdots + ac_k v_k + bd_1 w_1 + \cdots + bd_l w_l$$

仍然是 $S$ 中元素的線性組合，所以 $ax + by \in \text{span}(S)$。$\square$

此外，$\text{span}(S)$ 是 $V$ 中包含 $S$ 的**最小**子空間：任何包含 $S$ 的子空間 $W$ 必須在線性組合下封閉，所以它必須包含 $\text{span}(S)$ 的每個元素。用符號表示：

$$\text{span}(S) = \bigcap \{W \subseteq V : W \text{ 是子空間且 } S \subseteq W\}. \tag{2}$$

## 張成集

子集 $S \subseteq V$ **張成** $V$（或是 $V$ 的**張成集（spanning set）**），若 $\text{span}(S) = V$——即 $V$ 中的每個向量都可以表示為 $S$ 中向量的線性組合。

**例子**：$\{(1,0),(0,1)\}$ 張成 $\mathbb{R}^2$。$\{(1,0),(0,1),(1,1)\}$ 也是——但第三個向量是冗餘的。$\{(1,0)\}$ 單獨不能張成 $\mathbb{R}^2$。

張成集可以縮減：若 $S$ 中的任何向量是其他向量的線性組合，可以在不改變 $\text{span}(S)$ 的情況下將其移除。重複這個過程得到一個最小張成集——其中沒有冗餘向量——這恰好是[線性子空間](../linear_subspace/)所稱的**基底**。

## 為什麼張成是正確的概念

張成回答了可達性問題：哪些向量在給定集合的「觸及範圍」內？這個問題出現在線性代數的每個角落：
- 向量 $b$ 在 $A$ 的行空間中嗎？等價地，$b \in \text{span}(A \text{ 的各行})$ 嗎？
- 一組向量能覆蓋整個 $V$ 嗎？等價地，它能張成 $V$ 嗎？
- 包含給定集合的最小子空間是什麼？就是它的張成。

## 摘要

- $\text{span}(S)$ 是 $S$ 中元素的所有線性組合的集合；按慣例，$\text{span}(\emptyset) = \{\mathbf{0}\}$。
- $\text{span}(S)$ 永遠是 $V$ 的子空間，且是包含 $S$ 的最小子空間。
- 冗餘向量——已是其他向量的線性組合的向量——不改變張成。
- $S$ **張成** $V$ 若 $\text{span}(S) = V$。從張成集中移除所有冗餘向量得到基底。
