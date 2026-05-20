---
title: Bucket Sort
summary: "Bucket sort distributes elements into a fixed number of buckets based on a key function, sorts each bucket, then concatenates the results. This checkpoint develops the algorithm, explains how its expected O(n) running time depends on the input distribution, and contrasts it with counting sort."
prerequisites:
  - basis/algorithm/time_complexity
  - basis/algorithm/sort/count_sort
  - basis/data_structure/array
  - basis/cs_with_zig/malloc
aliases: []
tags:
  - Algorithms
  - Sorting
updated: 2026-05-20
---

[Counting sort](../count_sort/) achieves linear time by mapping each integer key directly to an index. Bucket sort generalises this idea: instead of one slot per key value, you allocate a small number of *buckets*, each covering a range of values, then sort the small buckets independently. When values are uniformly distributed across the range, each bucket gets $O(1)$ elements on average, and sorting all buckets together costs $O(n)$.

## The algorithm

Given $n$ floating-point values uniformly distributed in $[0, 1)$:

1. **Create** $k$ empty buckets, where bucket $i$ covers the interval $[\,i/k,\; (i+1)/k\,)$.
2. **Distribute** each element $x$ into bucket $\lfloor x \cdot k \rfloor$.
3. **Sort** each bucket with [insertion sort](../insertion_sort/) (buckets are small on average).
4. **Concatenate** the buckets in order.

```zig
const std = @import("std");

fn insertionSortF64(arr: []f64) void {
    var i: usize = 1;
    while (i < arr.len) : (i += 1) {
        const key = arr[i];
        var j = i;
        while (j > 0 and arr[j - 1] > key) : (j -= 1) {
            arr[j] = arr[j - 1];
        }
        arr[j] = key;
    }
}

/// Sorts arr in-place. All values must be in [0, 1).
fn bucketSort(arr: []f64, allocator: std.mem.Allocator) !void {
    const k = arr.len;
    if (k == 0) return;

    // Allocate k buckets, each an expandable list.
    const buckets = try allocator.alloc(std.ArrayList(f64), k);
    defer {
        for (buckets) |*b| b.deinit();
        allocator.free(buckets);
    }
    for (buckets) |*b| b.* = std.ArrayList(f64).init(allocator);

    // Distribute elements into buckets.
    for (arr) |x| {
        const idx: usize = @intFromFloat(x * @as(f64, @floatFromInt(k)));
        try buckets[@min(idx, k - 1)].append(x);
    }

    // Sort each bucket and write back.
    var pos: usize = 0;
    for (buckets) |*b| {
        insertionSortF64(b.items);
        for (b.items) |x| {
            arr[pos] = x;
            pos += 1;
        }
    }
}
```

The `@min(idx, k - 1)` guard handles the edge case where `x` is exactly `1.0` due to floating-point rounding; it clamps the index to the last valid bucket.

## Why $k = n$ buckets?

Setting $k = n$ gives each bucket an expected load of 1 element under a uniform distribution. The analysis below uses this choice, but any fixed $k$ works — smaller $k$ means fewer (larger) buckets, which is preferable when memory is tight.

## Average-case analysis

Assume the $n$ input values are drawn independently and uniformly from $[0, 1)$. Let $X_i$ be the number of elements in bucket $i$. The expected sorting cost is:

$$
E\!\left[\sum_{i=0}^{n-1} O(X_i^2)\right] = \sum_{i=0}^{n-1} O\!\left(E[X_i^2]\right).
$$

Each element falls in bucket $i$ with probability $1/n$, so $X_i$ follows a $\text{Binomial}(n, 1/n)$ distribution. For this distribution:

$$
E[X_i^2] = \operatorname{Var}(X_i) + (E[X_i])^2 = \frac{n-1}{n^2} + 1 \approx 2 - \frac{1}{n} = O(1).
$$

Summing over all $n$ buckets: total expected time is $O(n)$.

## Worst-case behaviour

The uniform distribution assumption is crucial. If all $n$ elements fall into the same bucket, that bucket takes $O(n^2)$ to sort with insertion sort, making the total $O(n^2)$. Bucket sort is only efficient when values are spread across the buckets.

## Extending to other key types

The $[0, 1)$ range is conventional but not mandatory. Any range $[lo, hi)$ works by normalising: $x \mapsto (x - lo) / (hi - lo)$. For integer keys, bucket sort with one element per key value degenerates to [counting sort](../count_sort/) — counting sort is the special case of bucket sort where every bucket holds at most one distinct value.

## Complexity summary

| Metric | Complexity |
|--------|-----------|
| Expected time | $O(n)$ (uniform input, $k = n$) |
| Worst-case time | $O(n^2)$ |
| Extra space | $O(n + k)$ |
| Stable | Yes (insertion sort within buckets preserves order) |

The extra space covers the bucket structures and the bucket contents. With $k = n$, this is $O(n)$.

## When to use bucket sort

- Input is **approximately uniformly distributed** over a known range.
- You can afford $O(n)$ extra memory.
- The key type supports a fast mapping to a bucket index (floating-point multiplication, integer division).

When the distribution is skewed, bucket sort degrades. Use [counting sort](../count_sort/) for integer keys with a small range, or [quick sort](../quick_sort/) / [merge sort](../merge_sort/) for general comparison-based needs.

## Summary

- Bucket sort distributes elements into $k$ buckets by key range, sorts each bucket, then concatenates.
- With $k = n$ buckets and uniformly distributed input, expected time is $O(n)$.
- Worst-case time is $O(n^2)$ when all elements cluster in one bucket.
- Space is $O(n + k)$; stability depends on the per-bucket sort algorithm (insertion sort is stable).
- Counting sort is the special case of bucket sort with one slot per distinct key value.
