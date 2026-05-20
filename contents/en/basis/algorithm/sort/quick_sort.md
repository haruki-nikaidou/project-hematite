---
title: Quick Sort
summary: "Quick sort picks a pivot element, partitions the array so that everything smaller is to its left and everything larger to its right, then recursively sorts each side, achieving O(n log n) expected time. This checkpoint develops the partition step, analyses average and worst-case complexity, and explains how pivot choice affects performance."
prerequisites:
  - basis/algorithm/time_complexity
  - basis/data_structure/array
  - basis/cs_with_zig/recursive
aliases: []
tags:
  - Algorithms
  - Sorting
updated: 2026-05-20
---

[Merge sort](../merge_sort/) guarantees $\Theta(n \log n)$ in all cases but needs $O(n)$ extra memory. Quick sort uses $O(1)$ extra space and its average case is also $O(n \log n)$ — with a smaller constant than merge sort. For random input, quick sort is typically the fastest comparison sort in practice, which is why it underpins the standard library sorter in C (`qsort`), C++ (`std::sort`), and many other languages.

## The core idea

Quick sort is a **divide-and-conquer** algorithm:

1. **Choose a pivot** — pick one element from the array.
2. **Partition** — rearrange the array in-place so that every element smaller than the pivot is to its left and every element larger is to its right. The pivot ends up in its final sorted position.
3. **Recurse** — sort the left sub-array and the right sub-array independently.

The magic is in step 2: partitioning takes $O(n)$ time and requires no extra memory.

## The Lomuto partition scheme

Several partition algorithms exist. **Lomuto partition** is simple to understand and implement. It uses the *last element* as the pivot and maintains two regions as it scans left to right:

- `arr[lo..i]` — elements ≤ pivot (the "small" region, grows rightward)
- `arr[i..j]` — elements > pivot (the "large" region)
- `arr[j]` — next element to classify

When the scan is complete, the pivot (still at `arr[arr.len - 1]`) is swapped into position `i`, where it belongs permanently.

```zig
/// Partitions arr in-place and returns the final index of the pivot.
fn partition(arr: []i64) usize {
    const pivot = arr[arr.len - 1];
    var i: usize = 0; // boundary: arr[0..i] contains elements ≤ pivot

    for (0..arr.len - 1) |j| {
        if (arr[j] <= pivot) {
            // Move arr[j] into the small region.
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i += 1;
        }
    }

    // Place the pivot at the boundary.
    const tmp = arr[i];
    arr[i] = arr[arr.len - 1];
    arr[arr.len - 1] = tmp;

    return i;
}

fn quickSort(arr: []i64) void {
    if (arr.len <= 1) return;
    const p = partition(arr);
    quickSort(arr[0..p]);
    if (p + 1 < arr.len) quickSort(arr[p + 1 ..]);
}
```

## Correctness

After `partition` returns index `p`:

- `arr[p]` equals the pivot and is in its final position.
- Every element in `arr[0..p]` is ≤ `arr[p]`.
- Every element in `arr[p+1..]` is ≥ `arr[p]`.

`quickSort` then sorts each side by the same argument, inductively. The base case (`arr.len ≤ 1`) is trivially sorted.

## Complexity

### Average case: $O(n \log n)$

In the best case the pivot always lands exactly in the middle, giving the recurrence $T(n) = 2T(n/2) + O(n)$ — the same as merge sort — which solves to $O(n \log n)$.

With a *random* pivot, the expected split is not perfectly even, but the expected number of comparisons is still $O(n \log n)$: roughly $2n \ln n$. The proof uses the fact that every pair $(i, j)$ is compared at most once, and the probability that elements $i$ and $j$ are ever compared is $\frac{2}{j - i + 1}$, so the expected total comparisons sum to $O(n \log n)$.

### Worst case: $O(n^2)$

When the pivot is always the smallest or largest element, one partition has size $n - 1$ and the other has size $0$:

$$
T(n) = T(n-1) + O(n) \implies T(n) = O(n^2).
$$

This happens on already-sorted (or reverse-sorted) input when the pivot is always the last element — a common real-world case.

### Space

Quick sort is **in-place** (no auxiliary array), but it uses $O(\log n)$ stack space on average for the recursive calls. In the worst case the recursion depth is $O(n)$, which can overflow the call stack for large inputs.

## Pivot choice

The pivot strategy determines whether you hit the worst case in practice:

| Strategy | Worst-case input | Notes |
|----------|-----------------|-------|
| Last element | Sorted or reverse-sorted input | Simplest to implement |
| Random element | Rare (any specific permutation) | Simple fix: swap a random element to last, then proceed |
| Median-of-three | Requires a specific construction | Picks pivot as the median of `arr[0]`, `arr[mid]`, `arr[arr.len-1]` |

**Randomised quick sort** — choose the pivot uniformly at random — gives expected $O(n \log n)$ time regardless of the input distribution. No specific input can be a worst case, because a different random pivot is chosen each run.

## Quick sort is not stable

The Lomuto partition swaps elements across the array without regard to their original relative order. Equal elements can end up in different positions. For example, sorting `[3, 1, 3*]` (two threes, second marked with a star) with last-element pivot:

- Pivot = `3*`. Scan: `3 ≤ 3*` (swap with itself, i=1), `1 ≤ 3*` (swap `arr[1]` and `arr[1]`, i=2). Place pivot: `[3, 1, 3*]` → final positions. Actually this particular case preserves order, but in general the swaps are not stability-preserving.

If stability matters, use [merge sort](../merge_sort/).

## Quick sort vs merge sort

| Property | Quick sort | Merge sort |
|----------|-----------|------------|
| Worst-case time | $O(n^2)$ | $\Theta(n \log n)$ |
| Average-case time | $O(n \log n)$ | $\Theta(n \log n)$ |
| Extra space | $O(\log n)$ (stack) | $O(n)$ |
| Stable | No | Yes |
| Cache behaviour | Excellent (in-place) | Poor (copies to buffer) |

Quick sort's better cache performance is why it tends to win on random input in benchmarks, despite the worse theoretical worst case.

## Summary

- Quick sort **partitions** the array around a pivot so the pivot lands in its final position, then **recursively sorts** each side.
- The Lomuto partition scans left-to-right and places elements ≤ pivot in a growing left region, then swaps the pivot into the boundary.
- Average-case time is $O(n \log n)$; worst-case is $O(n^2)$ (occurs on sorted input with a naive pivot).
- Choosing the pivot **randomly** avoids predictable worst cases.
- Space is $O(\log n)$ on average (call stack), $O(n)$ worst case; no auxiliary array is needed.
- Quick sort is **not stable**.
- It typically outperforms [merge sort](../merge_sort/) in practice due to better cache behaviour, at the cost of a weaker worst-case guarantee.
