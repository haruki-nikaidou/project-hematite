---
title: Bubble Sort
summary: "Bubble sort repeatedly walks the array, swapping adjacent out-of-order pairs until no swaps are needed. This checkpoint develops the algorithm, proves it is correct, and explains why its O(n²) worst case makes it a teaching example rather than a practical tool."
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

Bubble sort is the algorithm most programmers meet first — and the one they retire earliest. It is slow for large inputs, but its structure is simple enough to prove correct in a few lines, and it terminates in $O(n)$ time on already-sorted data, which is better than [selection sort](../select_sort/).

## The algorithm

Each **pass** through the array compares every adjacent pair and swaps the two if they are out of order. After one full pass, the largest element has "bubbled" to the last position. After two passes, the two largest elements are in place. After $n-1$ passes, the array is sorted.

```zig
fn bubbleSortNaive(arr: []i64) void {
    var pass: usize = 0;
    while (pass < arr.len) : (pass += 1) {
        var i: usize = 1;
        while (i < arr.len - pass) : (i += 1) {
            if (arr[i - 1] > arr[i]) {
                const tmp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = tmp;
            }
        }
    }
}
```

## Early-exit optimisation

If a complete pass produces no swaps, the array is already sorted and the algorithm can stop. Moreover, everything beyond the *last swap position* in a pass is already in its final place — so you can shrink the unsorted region to that position rather than always shrinking by exactly one.

```zig
fn bubbleSort(arr: []i64) void {
    var n = arr.len;
    while (n > 1) {
        var last_swap: usize = 0; // position of the last swap this pass
        var i: usize = 1;
        while (i < n) : (i += 1) {
            if (arr[i - 1] > arr[i]) {
                const tmp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = tmp;
                last_swap = i;
            }
        }
        n = last_swap; // everything at index ≥ last_swap is sorted
    }
}
```

When `last_swap` stays `0` throughout a pass (no swaps at all), `n` becomes `0` and the outer loop exits immediately. This is the early-exit condition.

## Correctness via loop invariant

**Invariant**: at the start of each pass, `arr[n..]` contains the $(\text{arr.len} - n)$ largest elements in sorted order and in their final positions.

- *Before the first pass*: `n = arr.len`, so `arr[n..]` is empty — vacuously true.
- *Maintenance*: the inner loop compares every adjacent pair in `arr[0..n]`. Each swap moves a larger value one step right. By the time `i` reaches `n-1`, the largest element in `arr[0..n]` has floated to position `n-1`. Setting `n = last_swap` (which is ≤ the old `n`) only shrinks the unsorted region; the invariant is re-established for the next pass.
- *Termination*: `n` strictly decreases each pass (it moves to `last_swap < n`, or to `0` when no swaps occur). Eventually `n ≤ 1`, which is trivially sorted.

When the loop exits, the invariant guarantees the entire array is sorted.

## Stability

Bubble sort is **stable**: when two elements compare equal, the condition `arr[i - 1] > arr[i]` is false, so they are never swapped. Equal elements stay in their original relative order.

## Complexity

| Case | Comparisons | Swaps |
|------|------------|-------|
| Best (sorted) | $O(n)$ | $0$ |
| Worst (reverse sorted) | $\Theta(n^2)$ | $\Theta(n^2)$ |
| Average | $\Theta(n^2)$ | $\Theta(n^2)$ |

The best case is $O(n)$ with the early-exit optimisation: a single pass sees no swaps and the loop terminates after $n-1$ comparisons.

The worst case is reverse-sorted input. Each element must bubble all the way across the array: element at position $k$ takes $k$ swaps, giving $\sum_{k=0}^{n-1} k = \frac{n(n-1)}{2} = \Theta(n^2)$ swaps and comparisons total.

Space complexity is $O(1)$ — only a single swap variable is needed beyond the input array.

## Why bubble sort is not used in practice

All three quadratic sorts in this series (bubble, selection, and insertion) share an $O(n^2)$ worst case. [Insertion sort](../insertion_sort/) is strictly better than bubble sort in practice: it performs fewer writes, its inner loop exits as soon as the correct position is found, and it has a smaller constant factor. Bubble sort's only advantage over [selection sort](../select_sort/) is that its early-exit gives a genuine $O(n)$ best case.

For any $n$ beyond a few hundred elements, use [merge sort](../merge_sort/) or [quick sort](../quick_sort/) instead.

## Summary

- Bubble sort compares adjacent pairs and swaps them if out of order, repeating until a full pass produces no swaps.
- After each pass, the largest unsorted element is in its final position.
- The early-exit optimisation shrinks the unsorted region to the last swap position, giving $O(n)$ time on sorted input.
- Worst-case and average-case time are $\Theta(n^2)$; space is $O(1)$.
- Bubble sort is **stable**: equal elements are never swapped.
- Prefer [insertion sort](../insertion_sort/) over bubble sort for practical use of a simple $O(n^2)$ algorithm.
