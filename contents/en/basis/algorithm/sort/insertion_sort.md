---
title: Insertion Sort
summary: "Insertion sort builds a sorted prefix one element at a time by shifting each new element left until it reaches its correct position. This checkpoint develops the algorithm, proves correctness via a loop invariant, and explains its O(n²) worst case alongside its O(n) best case on nearly-sorted input."
prerequisites:
  - basis/algorithm/time_complexity
  - basis/data_structure/array
  - basis/cs_with_zig/loop
aliases: []
tags:
  - Algorithms
  - Sorting
updated: 2026-05-20
---

Think of sorting a hand of playing cards. You pick cards one at a time from the table and slide each new card left through your hand until it sits behind the next smaller card. That is insertion sort: simple, $O(n)$ on nearly-sorted input, and fast enough that real-world hybrid sorts like Timsort use it for small subarrays.

## The algorithm

Insertion sort maintains a **sorted prefix** `arr[0..i]`. At each step it takes the element at position `i` (call it `key`) and shifts every larger element in the sorted prefix one step to the right, then drops `key` into the gap.

```zig
fn insertionSort(arr: []i64) void {
    var i: usize = 1;
    while (i < arr.len) : (i += 1) {
        const key = arr[i];
        var j = i;
        // Shift elements larger than key one position to the right.
        while (j > 0 and arr[j - 1] > key) : (j -= 1) {
            arr[j] = arr[j - 1];
        }
        arr[j] = key;
    }
}
```

The inner `while` loop exits as soon as it finds an element that is ≤ `key`, or when it reaches the start of the array. `arr[j] = key` then places `key` in the correct position.

## Correctness via loop invariant

**Invariant**: at the start of iteration $i$, `arr[0..i]` is sorted.

- *Before iteration 1* ($i = 1$): `arr[0..1]` is a single element — trivially sorted.
- *Maintenance*: the inner loop finds the correct insertion position $j$ by shifting all elements in `arr[0..i]` that are greater than `key` one step right. After `arr[j] = key`, the prefix `arr[0..i+1]` is sorted, re-establishing the invariant for $i+1$.
- *Termination*: $i$ increases each iteration and reaches `arr.len`, at which point the invariant states that `arr[0..arr.len]` — the full array — is sorted.

## Stability

Insertion sort is **stable**: the inner loop shifts only elements that are *strictly greater than* `key`. Elements equal to `key` stop the shift, so `key` is inserted immediately after them, preserving their original relative order.

## Complexity

### The worst case: reverse-sorted input

When the array is sorted in reverse order, every new element must travel all the way to position 0. Iteration $i$ performs $i$ shifts:

$$
1 + 2 + \cdots + (n-1) = \frac{n(n-1)}{2} = \Theta(n^2).
$$

### The best case: already-sorted input

When the array is already sorted, every `key` satisfies `arr[j - 1] <= key` immediately — the inner loop does zero iterations. Total work: $n - 1$ comparisons, $O(n)$.

### The general case: inversions

An **inversion** is a pair of indices $(i, j)$ with $i < j$ and `arr[i] > arr[j]`. Each shift in the inner loop resolves exactly one inversion. Insertion sort therefore performs exactly as many shifts as there are inversions in the input.

- Sorted input: 0 inversions → $O(n)$ shifts.
- Nearly-sorted input (at most $k$ inversions per element): $O(kn)$ shifts.
- Reverse-sorted: $\binom{n}{2}$ inversions → $\Theta(n^2)$ shifts.

This inversion-based view explains why insertion sort is the right choice when input is nearly sorted.

| Case | Comparisons | Shifts |
|------|------------|--------|
| Best (sorted) | $O(n)$ | $0$ |
| Worst (reverse sorted) | $\Theta(n^2)$ | $\Theta(n^2)$ |
| Average | $\Theta(n^2)$ | $\Theta(n^2)$ |

Space complexity is $O(1)$: only `key` and `j` are needed beyond the array.

## Why insertion sort is practical

Despite its $O(n^2)$ worst case, insertion sort beats [merge sort](../merge_sort/) and [quick sort](../quick_sort/) for small arrays. It has:

- **No recursion overhead** — no call stack frames beyond the outer loop.
- **No auxiliary memory** — [merge sort](../merge_sort/) needs $O(n)$ extra space.
- **Excellent cache behaviour** — the inner loop reads and writes consecutive memory addresses.

The standard library sort in many languages (Go, Java, Python's Timsort) switches from $O(n \log n)$ algorithms to insertion sort when a sub-array shrinks below roughly 10–32 elements.

## Summary

- Insertion sort maintains a sorted prefix by inserting each new element into its correct position via rightward shifts.
- It is **stable**: equal elements are never reordered.
- Best-case time is $O(n)$ (already-sorted input); worst-case is $\Theta(n^2)$ (reverse-sorted).
- The number of shifts equals the number of **inversions** in the input, making it $O(kn)$ for nearly-sorted data with at most $k$ inversions per element.
- Space is $O(1)$; there is no recursion.
- Used as the small-array sub-routine inside practical hybrid sorts such as Timsort.
