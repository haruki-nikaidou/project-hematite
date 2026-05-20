---
title: Time Complexity
summary: "Time complexity counts how the running time of an algorithm scales with the size of its input. This checkpoint walks through how to count elementary operations, how to express the result with asymptotic notation, and how to read off the dominant cost from common control-flow patterns."
prerequisites:
  - basis/algorithm/notations
aliases: []
tags:
  - Algorithms
  - Complexity
updated: 2026-05-20
---

[Asymptotic Notations](/en/cp/basis/algorithm/notations/) gave you the language; time complexity is how you apply it to real code. This checkpoint shows you how to count the operations an algorithm performs, reduce that count to its dominant term, and read the result directly from common control-flow patterns — so you can classify any algorithm's cost without running it.

## What you are counting

**Time complexity** is a function $T(n)$ that maps the size of an input to the number of **elementary operations** the algorithm performs. An elementary operation is one that takes constant time: comparing two numbers, adding, writing to a memory address, following a reference. You count these as if each costs exactly one unit.

The definition of "input size" depends on the problem:

- For a list or array: $n$ is the number of elements.
- For a number: $n$ is the number of bits (or digits), not the value itself. Computing whether a 1000-digit number is even takes far less work than iterating up to its value.
- For a graph: you commonly use $n$ for the number of vertices and $m$ for the number of edges, and express complexity in terms of both.

## Worst case, best case, and average case

The same algorithm can behave very differently on different inputs of the same size. Consider searching an unsorted array of $n$ elements for a target value:

- **Best case**: the target is the first element — one comparison suffices.
- **Worst case**: the target is the last element, or absent — you check all $n$ elements.
- **Average case**: assuming the target appears uniformly at random, you check about $n/2$ elements on average.

Unless stated otherwise, **time complexity in this series means worst-case time complexity**. Worst-case analysis gives you a guarantee: the algorithm will never take longer than $T(n)$ steps, no matter what input of size $n$ you give it.

Best-case analysis is rarely useful — knowing things can go well does not protect you when they go badly. Average-case analysis is valuable but requires assumptions about the input distribution that are not always justified; it is introduced where it matters.

## Reading time complexity from code

The most important practical skill is translating control flow into a complexity expression. The patterns below cover the vast majority of cases you will encounter.

### Simple statements

A single statement that does a fixed amount of work — a comparison, an assignment, an arithmetic operation — contributes $O(1)$ to the total regardless of $n$.

```rust
let mid = lo + (hi - lo) / 2;  // O(1)
```

### A single loop

A loop that runs $n$ times, with $O(1)$ work per iteration, contributes $O(n)$ total.

```rust
fn sum(arr: &[i64]) -> i64 {
    let mut total = 0;
    for &x in arr {   // n iterations, O(1) work each
        total += x;
    }
    total
}
```

### Nested loops

Two loops where the inner loop runs up to $n$ times for each of the outer loop's $n$ iterations give $O(n) \times O(n) = O(n^2)$.

```rust
fn has_duplicate(arr: &[i64]) -> bool {
    for i in 0..arr.len() {             // n iterations
        for j in (i + 1)..arr.len() {  // up to n iterations
            if arr[i] == arr[j] {
                return true;
            }
        }
    }
    false
}
```

The inner loop runs $n-1, n-2, \ldots, 1, 0$ steps for outer iterations $i = 0, 1, \ldots, n-1$, for a total of $\frac{n(n-1)}{2}$ comparisons. That is $\Theta(n^2)$.

### Halving loops

When a loop variable is divided (or multiplied) by a constant each iteration instead of incremented by one, the loop runs $O(\log n)$ times.

```rust
fn floor_log2(mut n: u64) -> u64 {
    let mut count = 0;
    while n > 1 {
        n /= 2;       // n halves each iteration
        count += 1;
    }
    count
}
```

Starting from $n$ and halving until reaching $1$ takes $\lfloor \log_2 n \rfloor$ steps. The same argument applies to binary search: at each step the search space halves, so the number of steps is $O(\log n)$.

### Sequential blocks

When independent code blocks run one after another, add their complexities, then keep only the dominant term:

$$
O(n^2) + O(n) = O(n^2).
$$

```rust
// Block 1: O(n)
let total: i64 = arr.iter().sum();

// Block 2: O(n^2) — this dominates
for i in 0..arr.len() {
    for j in (i + 1)..arr.len() {
        // process pair (i, j)
    }
}
```

The total is $O(n^2)$.

### Nested loops with non-uniform bounds

Not all nested loops are $O(n^2)$. When the inner bound depends on the outer variable, you must compute the sum explicitly.

```rust
for i in 0..n {
    for j in 0..i {  // inner runs i steps, not n steps
        // O(1) work
    }
}
```

Total iterations: $0 + 1 + 2 + \cdots + (n - 1) = \frac{n(n-1)}{2} = \Theta(n^2)$. Still quadratic here, but the pattern matters — other non-uniform bounds lead to different sums.

For example, a loop of the form `for j in 0..(2*i)` gives $\sum_{i=0}^{n-1} 2i = n(n-1) = \Theta(n^2)$, while `for j in 0..((i as f64).sqrt() as usize)` gives $\sum_{i=0}^{n-1} \sqrt{i} = \Theta(n^{3/2})$.

## The dominant-term rule

The most important simplification: **drop all but the fastest-growing term, and drop constant factors**.

If $T(n) = 5n^3 + 100n^2 + 10^6 \cdot n + 10^9$, then $T(n) = \Theta(n^3)$.

Why? For large $n$, $5n^3$ grows faster than all other terms combined. Once $n$ is large enough, $5n^3$ accounts for more than half of $T(n)$, and the rest become negligible.

More formally, for any two growth classes with $g(n) = o(f(n))$:

$$
f(n) + g(n) = \Theta(f(n)).
$$

The corollary: when analyzing code, you can identify the "innermost" or "dominant" loop, determine its cost, and that cost is the overall complexity. You do not need to track every constant.

## Worked example: binary search

Binary search finds a target value in a sorted array by repeatedly halving the search range.

```rust
fn binary_search(arr: &[i64], target: i64) -> Option<usize> {
    let mut lo = 0;
    let mut hi = arr.len();

    while lo < hi {                          // (1)
        let mid = lo + (hi - lo) / 2;       // O(1)
        match arr[mid].cmp(&target) {
            std::cmp::Ordering::Equal => return Some(mid),
            std::cmp::Ordering::Less => lo = mid + 1,
            std::cmp::Ordering::Greater => hi = mid,
        }
    }
    None
}
```

At each iteration of the `while` loop (1), the search range $[lo, hi)$ is halved. Starting from a range of size $n$, after $k$ iterations the range has size $\lceil n / 2^k \rceil$. The loop terminates when the range is empty, which happens after at most $\lceil \log_2 n \rceil + 1$ iterations. Each iteration does $O(1)$ work.

Total: $O(\log n)$.

Compare this with linear search, which is $O(n)$. For $n = 10^9$, linear search may perform up to $10^9$ comparisons; binary search performs at most $30$.

## A note on space complexity

Time complexity counts operations; **space complexity** counts memory usage as a function of $n$, using the same asymptotic notation. An algorithm that allocates an auxiliary array of size $n$ uses $O(n)$ extra space; one that uses only a fixed number of variables uses $O(1)$ extra space, which is also called *in-place*.

The two measures always appear together in algorithm analysis. A fast algorithm that requires $O(n^2)$ memory may be impractical even if its time complexity is acceptable.

## Summary

- **Time complexity** is the number of elementary operations as a function of input size $n$, expressed in asymptotic notation.
- By default, report **worst-case** time complexity — it is the strongest useful guarantee.
- Key patterns from code: a simple statement is $O(1)$; a single loop is $O(n)$; two nested loops over the full range are $O(n^2)$; a halving loop is $O(\log n)$; sequential independent blocks add, then keep the dominant term.
- For nested loops with non-uniform bounds, compute the sum explicitly rather than assuming $O(n^2)$.
- The **dominant-term rule**: drop all but the fastest-growing term, and drop constant factors.
- **Space complexity** uses the same notation to describe memory usage; in-place means $O(1)$ extra space.
