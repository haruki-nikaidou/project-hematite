---
title: 線性方程組的解的結構
summary: "利用秩對 Ax = b 的解集進行分類：當 rank(A) ≠ rank([A|b]) 時無解，當兩個秩均等於未知數個數時有唯一解，否則解集為仿射子空間。本文將高斯-喬登消去法與秩-零化度定理串聯，給出完整圖像。"
prerequisites:
  - basis/math/linear_algebra/linear_equations
  - basis/math/linear_algebra/gauss_jordan_elimination
  - basis/math/linear_algebra/rank_nullity_theorem
  - basis/math/linear_algebra/dimension
aliases: []
tags:
  - 線性代數
updated: 2026-05-20
---

[高斯-喬登消去法](../gauss_jordan_elimination/)透過樞軸和自由行對 $Ax = b$ 的解進行分類。秩——一個單一的數值——以更緊湊的方式編碼了相同的資訊：比較 $\text{rank}(A)$ 與 $\text{rank}([A \mid b])$ 可以告訴你解是否存在，而比較 $\text{rank}(A)$ 與 $n$ 則能判斷解是否唯一。當解存在時，解集構成一個**仿射子空間（affine subspace）**——$\ker(A)$ 的一個平移——其維度由[秩-零化度定理](../rank_nullity_theorem/)精確確定。

## 擴增矩陣的秩

擴增矩陣 $[A \mid b]$ 與 $A$ 的橫列數相同，但多一個直行。對其進行列化簡時，$[A \mid b]$ 的 RREF 比 $A$ 的 RREF 最多多一個樞軸，且只有在那個額外的樞軸落在最後一行（新增的那行）時才如此。因此：

$$\text{rank}([A \mid b]) = \begin{cases} \text{rank}(A) & \text{若 } b \in \text{col}(A), \\ \text{rank}(A) + 1 & \text{若 } b \notin \text{col}(A). \end{cases}$$

條件 $b \in \text{col}(A)$ 恰好是 $Ax = b$ 有解的條件，這使上述觀察不再只是巧合。

## 相容性判準

**定理**：方程組 $Ax = b$ 相容（至少有一個解）當且唯當

$$\text{rank}(A) = \text{rank}([A \mid b]).$$

**證明**：對 $[A \mid b]$ 進行列化簡，得到 $[R \mid c]$。方程組不相容，當且唯當 $[R \mid c]$ 的某一橫列形如 $(0\; 0\; \cdots\; 0 \mid 1)$——即樞軸出現在最後一行。這樣的橫列為 $[A \mid b]$ 增加了一個不來自 $A$ 的樞軸，故 $\text{rank}([A \mid b]) = \text{rank}(A) + 1$。反之，若沒有這樣的橫列出現，$[A \mid b]$ 的 RREF 與 $A$ 的 RREF 具有完全相同的樞軸，故 $\text{rank}([A \mid b]) = \text{rank}(A)$，方程組相容。$\square$

## 唯一性判準

現假設方程組相容：$\text{rank}(A) = \text{rank}([A \mid b]) = r$。$A$ 的 RREF 有 $r$ 個樞軸行和 $n - r$ 個自由行。每個自由行產生一個自由變數，每個自由變數為解集貢獻一個自由度維度。因此：

- 若 $\text{rank}(A) = n$：沒有自由變數，解是**唯一**的。
- 若 $\text{rank}(A) < n$：有 $n - \text{rank}(A) > 0$ 個自由變數，有**無窮多**個解。

## 完整分類

| 條件 | 結果 |
|-----------|---------|
| $\text{rank}(A) < \text{rank}([A \mid b])$ | 無解 |
| $\text{rank}(A) = \text{rank}([A \mid b]) = n$ | 唯一解 |
| $\text{rank}(A) = \text{rank}([A \mid b]) < n$ | 無窮多個解 |

這三種情形是窮盡的。每個方程組恰好落入其中一種。

## 仿射子空間結構

當 $Ax = b$ 相容時，完整的解集具有清晰的幾何形式。

**定理**：設 $x_p$ 是 $Ax = b$ 的某個特殊解，則完整的解集為

$$\{x \in F^n : Ax = b\} = x_p + \ker(A) \coloneqq \{x_p + h : h \in \ker(A)\}.$$

**證明**：
- （$\supseteq$）對任意 $h \in \ker(A)$：$A(x_p + h) = Ax_p + Ah = b + \mathbf{0} = b$，故 $x_p + h$ 是解。
- （$\subseteq$）對任意解 $x$：$A(x - x_p) = Ax - Ax_p = b - b = \mathbf{0}$，故 $x - x_p \in \ker(A)$，即 $x = x_p + (x - x_p) \in x_p + \ker(A)$。$\square$

集合 $x_p + \ker(A)$ 稱為 $F^n$ 的**仿射子空間（affine subspace）**——線性子空間 $\ker(A)$ 以特殊解 $x_p$ 平移所得。僅當 $x_p = \mathbf{0}$（即 $b = \mathbf{0}$）時，它才本身是線性子空間。

### 解集的維度

由秩-零化度定理，$\text{nullity}(A) = n - \text{rank}(A)$。由於 $x_p + \ker(A)$ 是 $\ker(A)$ 的平移，其維度與 $\ker(A)$ 相同：即 $n - \text{rank}(A)$。

| $\text{rank}(A)$ | $\text{nullity}(A)$ | 解集的形狀 |
|---|---|---|
| $n$ | $0$ | 單個點 |
| $n - 1$ | $1$ | 過 $x_p$ 的直線 |
| $n - k$ | $k$ | 過 $x_p$ 的 $k$ 維仿射平坦（affine flat） |

## 計算範例

求解 $Ax = b$，其中

$$A = \begin{pmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{pmatrix}, \qquad b = \begin{pmatrix} 3 \\ 6 \end{pmatrix}.$$

**步驟 1：檢驗相容性。** 對擴增矩陣進行列化簡：

$$\begin{pmatrix} 1 & 2 & -1 & 3 \\ 2 & 4 & -2 & 6 \end{pmatrix} \xrightarrow{R_2 \leftarrow R_2 - 2R_1} \begin{pmatrix} 1 & 2 & -1 & 3 \\ 0 & 0 & 0 & 0 \end{pmatrix}.$$

這是 RREF。唯一的樞軸在第 1 行，故 $\text{rank}(A) = 1$，$\text{rank}([A \mid b]) = 1$。兩者相同：方程組相容。

**步驟 2：計算自由變數個數。** $n = 3$，$\text{rank}(A) = 1$，故有 $3 - 1 = 2$ 個自由變數（$x_2$ 和 $x_3$）。解集是一個 2 維仿射子空間。

**步驟 3：求特殊解。** 令自由變數為零：$x_2 = 0$，$x_3 = 0$，則 $x_1 = 3$，得

$$x_p = \begin{pmatrix} 3 \\ 0 \\ 0 \end{pmatrix}.$$

**步驟 4：求 $\ker(A)$ 的基底。** 由 RREF 知 $x_1 = -2x_2 + x_3$。令 $x_2 = s$，$x_3 = t$：

$$\ker(A) = \text{span}\!\left\{ \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix},\; \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \right\}.$$

**步驟 5：寫出完整的解集。** 由仿射子空間定理：

$$x = \begin{pmatrix} 3 \\ 0 \\ 0 \end{pmatrix} + s\begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix} + t\begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \qquad s, t \in F.$$

這是 $F^3$ 中過 $x_p$ 的一個 2 維仿射平面。

**若改為 $b = (3, 7)^\top$ 會如何？** 施行 $R_2 \leftarrow R_2 - 2R_1$ 得 $(0, 0, 0 \mid 1)$——樞軸出現在最後一行。此時 $\text{rank}([A \mid b]) = 2 \ne 1 = \text{rank}(A)$，方程組無解。

## 摘要

- **相容性判準**：$Ax = b$ 相容當且唯當 $\text{rank}(A) = \text{rank}([A \mid b])$。
- **唯一性判準**：相容的方程組有唯一解，當且唯當 $\text{rank}(A) = n$。
- **三種情形**：$\text{rank}(A) < \text{rank}([A \mid b])$ 時無解；$\text{rank}(A) = n$ 時有唯一解；$\text{rank}(A) < n$（且相容）時有無窮多個解。
- **仿射子空間定理**：相容方程組的完整解集為 $x_p + \ker(A)$（$x_p$ 為任意特殊解）——即核的一個平移。
- **維度**：由秩-零化度定理，解集的維度為 $\text{nullity}(A) = n - \text{rank}(A)$。
