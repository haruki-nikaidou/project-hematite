---
title: Merge Sort
summary: "Merge sort divides an array in half, recursively sorts each half, and merges the two sorted halves back together, achieving O(n log n) time in all cases. This checkpoint develops the algorithm in Zig, proves correctness via loop invariants, and explains why the divide-and-conquer structure guarantees a better worst case than quadratic sorts."
prerequisites:
  - basis/algorithm/time_complexity
  - basis/data_structure/array
  - basis/cs_with_zig/recursive
  - basis/cs_with_zig/malloc
aliases: []
tags:
  - Algorithms
  - Sorting
updated: 2026-05-20
---

Every sort you have seen so far — [bubble](../bubble_sort/), [selection](../select_sort/) — costs $\Theta(n^2)$ in the worst case. For $n = 10^6$ elements that is roughly $10^{12}$ operations: impractical. Merge sort breaks the barrier. It costs $O(n \log n)$ in every case — best, worst, and average — by solving a smaller structural question: *merging two already-sorted arrays is cheap, so why not sort by merging?*

## The core idea: divide, conquer, merge

Merge sort is a **divide-and-conquer** algorithm. It works in three steps:

1. **Divide** — split the array at the midpoint into a left half and a right half.
2. **Conquer** — recursively sort each half.
3. **Merge** — combine the two sorted halves into one sorted array.

The base case is an array of zero or one element, which is already sorted by definition.

The power of the algorithm comes from step 3. Merging two sorted arrays of total length $n$ takes only $O(n)$ time: walk both arrays with two pointers and always copy the smaller front element into the output buffer.

## The merge subroutine

Before writing the recursive sorter, build the merge step in isolation. It takes two adjacent sorted slices `left` and `right` (both sub-slices of a shared backing array) and a temporary buffer, and writes the merged result back into the original positions.

```zig
fn merge(
    left: []i64,
    right: []i64,
    tmp: []i64,
) void {
    var i: usize = 0; // index into left
    var j: usize = 0; // index into right
    var k: usize = 0; // index into tmp

    // Copy the smaller front element until one side is exhausted.
    while (i < left.len and j < right.len) {
        if (left[i] <= right[j]) {
            tmp[k] = left[i];
            i += 1;
        } else {
            tmp[k] = right[j];
            j += 1;
        }
        k += 1;
    }

    // Drain whichever side still has elements.
    while (i < left.len) : (i += 1) {
        tmp[k] = left[i];
        k += 1;
    }
    while (j < right.len) : (j += 1) {
        tmp[k] = right[j];
        j += 1;
    }

    // Write the merged result back into the original memory.
    // left and right are adjacent, so this covers both.
    const full = left.len + right.len;
    for (0..full) |idx| {
        left.ptr[idx] = tmp[idx]; // left.ptr[idx] reaches into right when idx >= left.len
    }
}
```

**Loop invariant**: at the start of every iteration of the first `while`, `tmp[0..k]` holds the $k$ smallest elements from `left` and `right` in sorted order. When either pointer reaches the end of its slice, this invariant holds for all remaining elements on the other side — so draining that side preserves sorted order.

## The recursive sort

With `merge` in place, the recursive function is short:

```zig
fn mergeSort(arr: []i64, tmp: []i64) void {
    if (arr.len <= 1) return; // base case: already sorted

    const mid = arr.len / 2;
    mergeSort(arr[0..mid], tmp[0..mid]);
    mergeSort(arr[mid..], tmp[mid..]);
    merge(arr[0..mid], arr[mid..], tmp);
}
```

`tmp` is a buffer of the same length as `arr`, allocated once by the caller and threaded through every recursive call to avoid repeated allocation.

## Putting it together

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var data = [_]i64{ 38, 27, 43, 3, 9, 82, 10 };
    const tmp = try allocator.alloc(i64, data.len);
    defer allocator.free(tmp);

    mergeSort(&data, tmp);

    const stdout = std.io.getStdOut().writer();
    for (data, 0..) |x, i| {
        if (i > 0) try stdout.writeByte(' ');
        try stdout.print("{d}", .{x});
    }
    try stdout.writeByte('\n');
    // Output: 3 9 10 27 38 43 82
}
```

## Why it is correct

A formal correctness argument uses strong induction on $n = \texttt{arr.len}$:

- **Base case** ($n \le 1$): the function returns immediately; a single-element array is trivially sorted.
- **Inductive step**: assume `mergeSort` correctly sorts any array of length $< n$. Both halves have length $\lfloor n/2 \rfloor \le n - 1 < n$, so by the inductive hypothesis they are sorted after the recursive calls. The `merge` function (proved correct via its loop invariant above) then produces a sorted array of length $n$.

By induction, `mergeSort` sorts every array of any length.

## Time complexity analysis

Let $T(n)$ be the number of operations on an array of length $n$.

$$
T(n) = \begin{cases} O(1) & n \le 1 \\ 2\,T(n/2) + O(n) & n > 1 \end{cases}
$$

The $2\,T(n/2)$ term accounts for the two recursive calls; the $O(n)$ term accounts for `merge`. Unrolling this recurrence by drawing the recursion tree:

| Level | Sub-problems | Size each | Work per level |
|-------|-------------|-----------|---------------|
| 0 | 1 | $n$ | $O(n)$ |
| 1 | 2 | $n/2$ | $O(n)$ |
| 2 | 4 | $n/4$ | $O(n)$ |
| $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ |
| $\log_2 n$ | $n$ | $1$ | $O(n)$ |

There are $\log_2 n + 1$ levels, each costing $O(n)$, so:

$$
T(n) = O(n \log n).
$$

This bound is **tight** — merge sort always divides in half and always merges the full width, so best case, worst case, and average case are all $\Theta(n \log n)$.

## Space complexity

Merge sort uses $O(n)$ extra space for the temporary buffer. This makes it **not in-place** (unlike selection sort, which sorts in $O(1)$ extra space). For large arrays in memory-constrained environments this is worth noting.

## Comparison with simpler sorts

| Algorithm | Worst case | Best case | Extra space | Stable |
|-----------|-----------|-----------|-------------|--------|
| Bubble sort | $\Theta(n^2)$ | $\Theta(n)$ | $O(1)$ | Yes |
| Selection sort | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | No |
| Merge sort | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(n)$ | Yes |

**Stable** means equal elements appear in the same relative order in the output as in the input. Merge sort is stable because the `left[i] <= right[j]` condition breaks ties in favour of the left (earlier) element.

## Summary

- Merge sort **divides** the array at the midpoint, **recursively sorts** each half, and **merges** the results.
- The merge step runs in $O(n)$ and is the engine of the algorithm.
- The recurrence $T(n) = 2T(n/2) + O(n)$ resolves to $\Theta(n \log n)$ via the recursion tree.
- Time complexity is $\Theta(n \log n)$ in **all** cases — it has no bad inputs.
- The cost is $O(n)$ extra space for the temporary buffer; it is not in-place.
- Merge sort is **stable**: equal elements keep their original relative order.
