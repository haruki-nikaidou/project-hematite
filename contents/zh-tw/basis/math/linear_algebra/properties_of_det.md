---
title: 行列式的性質
summary: "展開行列式的關鍵性質：沿任意列或行的拉普拉斯展開、列運算對行列式的影響、轉置等式、乘積性質、基於伴隨矩陣的逆矩陣公式，以及克拉瑪法則。"
prerequisites: 
  - basis/math/linear_algebra/determinant
aliases: []
tags: ["線性代數"]
updated: 2026-05-19
---

[行列式](../determinant/)以沿第一列展開的方式定義。這個定義在邏輯上是完整的，但計算代價高昂——樸素展開一個 $n \times n$ 矩陣需要 $n!$ 次乘法。本文展開使行列式可操作的各種性質：沿任意列或行展開、列運算與行列式的交互方式，以及等式 $\det(AB) = \det(A)\det(B)$。最後介紹兩個經典應用：基於伴隨矩陣的逆矩陣公式和克拉瑪法則。

## 沿任意列或行的拉普拉斯展開

[行列式](../determinant/)中的定義是沿第 1 列展開的。沿任意列或行都能得到相同的值。

**定理（拉普拉斯展開）**：對任意 $i \in \{1, \ldots, n\}$，

$$\det(A) = \sum_{j=1}^{n} (-1)^{i+j}\, a_{ij}\, \det(A_{ij}), \tag{1}$$

對任意 $j \in \{1, \ldots, n\}$，

$$\det(A) = \sum_{i=1}^{n} (-1)^{i+j}\, a_{ij}\, \det(A_{ij}). \tag{2}$$

此處 $A_{ij}$ 是刪去第 $i$ 列和第 $j$ 行後得到的 $(n-1) \times (n-1)$ 子矩陣，而 $C_{ij} \coloneqq (-1)^{i+j} \det(A_{ij})$ 是**$(i,j)$ 餘因子（cofactor）**。

實際操作時：選擇零元素最多的那一列或行展開——每個零項不貢獻任何計算，可大幅減少工作量。

### 計算範例

$$A = \begin{pmatrix} 0 & 1 & 0 \\ 2 & 3 & 4 \\ 5 & 6 & 7 \end{pmatrix}.$$

沿第 1 列展開，只有 $a_{12} = 1$ 這一項非零：

$$\det(A) = (-1)^{1+2} \cdot 1 \cdot \det\!\begin{pmatrix}2 & 4 \\ 5 & 7\end{pmatrix} = -1 \cdot (14 - 20) = 6.$$

## 轉置

$$\det(A^\top) = \det(A). \tag{3}$$

由於行列式在轉置下不變，任何關於列的命題對行都同樣成立。特別地，行展開（方程式 (2)）可以由對 $A^\top$ 施行的列展開（方程式 (1)）推出，且以下每條列運算規則都有完全對應的行類比。

## 列運算對行列式的影響

列運算——[高斯-喬登消去法](../gauss_jordan_elimination/)的基本操作——以簡潔的方式與行列式交互：

| 列運算 | 對 $\det(A)$ 的影響 |
|---|---|
| 交換兩列 | 將 $\det$ 乘以 $-1$ |
| 將第 $i$ 列乘以純量 $c \ne 0$ | 將 $\det$ 乘以 $c$ |
| 將一列的純量倍加到另一列 | $\det$ 不變 |

這三條規則使高斯消去法成為一種高效的行列式演算法。對 $A$ 施行高斯消去法（只使用列交換和列加法——不進行列縮放），追蹤交換次數 $s$。結果是一個上三角矩陣 $U$。由於三角矩陣的行列式是其對角線元素的乘積，

$$\det(A) = (-1)^{s}\, \prod_{i=1}^{n} u_{ii}. \tag{4}$$

這以 $O(n^3)$ 的計算量求得 $\det(A)$——與消去法本身的代價相同。

### 與可逆性的關聯

$A$ 可逆，當且唯當高斯消去法在 $U$ 的每條對角線上都產生非零元素，即 $\prod_i u_{ii} \ne 0$。由 (4)，這等價於 $\det(A) \ne 0$——與[行列式](../determinant/)中建立的判準一致。

## 乘積性

$$\det(AB) = \det(A)\,\det(B). \tag{5}$$

行列式是從 $n \times n$ 矩陣到體 $F$ 的**乘法同態（multiplicative homomorphism）**。由此立即可得幾個推論：

- $\det(I_n) = 1$，所以若 $A$ 可逆，則 $1 = \det(A)\det(A^{-1})$，得 $\det(A^{-1}) = 1/\det(A)$。
- 對任意非負整數 $k$，$\det(A^k) = \det(A)^k$。
- $\det(A_1 A_2 \cdots A_k) = \det(A_1)\det(A_2)\cdots\det(A_k)$。

注意 (5) **不**擴展到和：一般而言 $\det(A + B) \ne \det(A) + \det(B)$。

## 伴隨矩陣

$A$ 的**餘因子矩陣（cofactor matrix）**是 $n \times n$ 矩陣，其 $(i,j)$ 元素為餘因子 $C_{ij} = (-1)^{i+j}\det(A_{ij})$。

$A$ 的**伴隨矩陣（adjugate）**（又稱**古典伴隨（classical adjoint）**）是餘因子矩陣的轉置：

$$\operatorname{adj}(A)_{ij} \coloneqq C_{ji} = (-1)^{i+j}\det(A_{ji}). \tag{6}$$

**定理**：

$$A \cdot \operatorname{adj}(A) = \operatorname{adj}(A) \cdot A = \det(A)\, I_n. \tag{7}$$

證明思路：將 $A \cdot \operatorname{adj}(A)$ 的 $(i,k)$ 分量寫成 $\sum_j a_{ij} C_{kj}$：當 $i = k$ 時，這是沿第 $i$ 列對 $\det(A)$ 的餘因子展開；當 $i \ne k$ 時，它等於零，因為它計算的是一個有兩列相同的矩陣的行列式。

當 $\det(A) \ne 0$ 時，兩邊除以 $\det(A)$ 給出顯式的逆矩陣公式：

$$A^{-1} = \frac{1}{\det(A)}\operatorname{adj}(A). \tag{8}$$

對較大的 $n$，這是 $O(n^4)$ 的——比高斯消去法更慢。它最適合用手算 $2 \times 2$ 和 $3 \times 3$ 矩陣，或用於理論論證。

### 2×2 的情形

對 $A = \begin{pmatrix}a & b \\ c & d\end{pmatrix}$，$\det(A) = ad - bc \ne 0$ 時：

$$A^{-1} = \frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}.$$

交換對角線元素，取反非對角線元素，再除以行列式。

## 克拉瑪法則

設 $A$ 是可逆的 $n \times n$ 矩陣，$b \in F^n$，則 $Ax = b$ 的唯一解的各分量為

$$x_i = \frac{\det(A_i(b))}{\det(A)}, \qquad i = 1, \ldots, n, \tag{9}$$

其中 $A_i(b)$ 是將 $A$ 的第 $i$ 直行替換為 $b$ 所得的矩陣。

**原理**：由 $x = A^{-1}b = \frac{1}{\det(A)}\operatorname{adj}(A)\,b$，第 $i$ 個分量是 $\frac{1}{\det(A)}$ 乘以 $\operatorname{adj}(A)$ 第 $i$ 橫列與 $b$ 的點積。將此點積展開為沿 $A$（插入 $b$）第 $i$ 直行的餘因子展開，恰好得到 $\det(A_i(b))$。

與伴隨矩陣公式一樣，克拉瑪法則（Cramer's rule）是 $O(n^4)$ 的，對大型方程組不實用。它主要用於手算 $n \le 3$ 的情形，以及理論證明（例如說明整數線性方程組的解具有有理數——或整數——表示）。

## 摘要

- **拉普拉斯展開（Laplace expansion）**沿任意列或行均有效（方程式 (1) 和 (2)）；選擇零元素最多的一列或行以最小化計算量。
- **轉置**：$\det(A^\top) = \det(A)$，故每條列的結論都有完全對應的行類比。
- **列運算**以可預測的方式影響行列式：交換兩列取反號；將一列縮放 $c$ 倍，$\det$ 縮放 $c$ 倍；將一列的倍數加到另一列，$\det$ 不變。
- **高斯消去法**給出 $O(n^3)$ 的演算法：將 $A$ 化為上三角矩陣 $U$，則 $\det(A) = (-1)^{\text{交換次數}} \prod_i u_{ii}$。
- **乘積性**：$\det(AB) = \det(A)\det(B)$；特別地，$\det(A^{-1}) = 1/\det(A)$。
- **伴隨矩陣**：$A^{-1} = \frac{1}{\det(A)}\operatorname{adj}(A)$，顯式但 $O(n^4)$，主要適用於小矩陣或理論論證。
- **克拉瑪法則**：$x_i = \det(A_i(b))/\det(A)$，是 $Ax = b$ 的封閉解，適用於 $n \le 3$ 的手算或理論論證。
