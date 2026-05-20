---
title: Selection Sort
summary: "Selection sort sorts an array by repeatedly finding the minimum of the unsorted suffix and swapping it into place. This checkpoint develops the algorithm, proves it produces a sorted array, and analyses why it always performs Θ(n²) comparisons regardless of the input."
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

Every swap in a sorting algorithm is a write to memory. [Bubble sort](../bubble_sort/) can perform $\Theta(n^2)$ swaps in the worst case. Selection sort cuts that to at most $n - 1$ swaps — one per pass — regardless of the input. When writes are expensive (flash storage, for instance), that matters.

## The algorithm

Selection sort divides the array into a **sorted prefix** and an **unsorted suffix**. On each pass it scans the unsorted suffix for its minimum, then swaps that minimum into the first position of the unsorted suffix, growing the sorted prefix by one.

```zig
fn selectionSort(arr: []i64) void {
    var i: usize = 0;
    while (i < arr.len) : (i += 1) {
        // Find the index of the minimum in arr[i..]
        var min_idx = i;
        var j = i + 1;
        while (j < arr.len) : (j += 1) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        // Swap minimum into position i
        if (min_idx != i) {
            const tmp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = tmp;
        }
    }
}
```

The `if (min_idx != i)` guard avoids a no-op swap when the minimum is already at position `i`.

## Correctness via loop invariant

**Invariant**: at the start of iteration $i$, `arr[0..i]` contains the $i$ smallest elements of the original array in sorted order, and each is in its final position.

- *Before iteration 0*: `arr[0..0]` is empty — vacuously true.
- *Maintenance*: the inner loop finds `min_idx`, the index of the minimum value in `arr[i..]`. After the swap, `arr[i]` holds that minimum. Since `arr[0..i]` already contained the $i$ smallest elements, `arr[i]` is now the $(i+1)$-th smallest. The prefix `arr[0..i+1]` is sorted and each element is in its final position.
- *Termination*: $i$ increases by one each iteration. When $i = \text{arr.len} - 1$, only one element remains in the suffix, which is already in its correct position by the invariant on the prefix.

When the loop exits, `arr[0..arr.len]` is the entire array in sorted order.

## Why selection sort is not stable

**Stability** means that equal elements keep their original relative order. Selection sort is *not* stable: the minimum-finding swap can move an element past an equal neighbour.

Consider `[5, 5*, 2]` where `5*` is a second copy of `5` (shown with a star to track its identity).

1. Pass 0: minimum is `2` at index 2. Swap `arr[0]` and `arr[2]`: `[2, 5*, 5]`.

The original first `5` is now to the *right* of `5*`, reversing their order. This violates stability.

## Complexity

### Comparisons

The inner loop runs $n - 1$ times for $i = 0$, then $n - 2$ times for $i = 1$, down to $1$ time for $i = n - 2$:

$$
(n-1) + (n-2) + \cdots + 1 = \frac{n(n-1)}{2} = \Theta(n^2).
$$

This count is **the same for every input** — sorted, reverse-sorted, or random — because the algorithm always scans the full unsorted suffix. Selection sort has no best case.

### Swaps

At most $n - 1$ swaps (one per pass, skipped when the minimum is already in place). This is $O(n)$, far fewer than bubble sort's $\Theta(n^2)$ worst case.

### Space

$O(1)$ extra space — only index variables beyond the input array.

| Metric | Complexity |
|--------|-----------|
| Comparisons | $\Theta(n^2)$ always |
| Swaps | $O(n)$ |
| Extra space | $O(1)$ |
| Stable | No |

## When selection sort has an edge

- **Write-heavy media**: when each swap is expensive (SSD wear, remote write), $O(n)$ swaps can beat algorithms with $O(n^2)$ writes even if their comparison count is lower.
- **Tiny arrays**: at $n \le 5$, the overhead of more sophisticated algorithms is not worth it.

For any larger input, [insertion sort](../insertion_sort/) is a better in-place $O(n^2)$ choice, and [merge sort](../merge_sort/) or [quick sort](../quick_sort/) give $O(n \log n)$.

## Summary

- Selection sort finds the minimum of the unsorted suffix and swaps it to the front of that suffix, growing a sorted prefix.
- The loop invariant guarantees correctness: after $i$ passes, the $i$ smallest elements are in their final positions.
- Comparisons are always $\Theta(n^2)$ — the input order makes no difference.
- Swaps are at most $O(n)$, which is the algorithm's main practical advantage.
- Selection sort is **not stable**: swapping the minimum past equal elements can change their relative order.
