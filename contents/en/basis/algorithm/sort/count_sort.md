---
title: Counting Sort
summary: "Counting sort sorts integers from a known small range in O(n+k) time by counting occurrences instead of comparing elements. This checkpoint develops the algorithm, contrasts it with comparison-based sorts, and explains why its linear running time depends critically on the size of the key range k."
prerequisites:
  - basis/algorithm/time_complexity
  - basis/data_structure/array
  - basis/cs_with_zig/loop
  - basis/cs_with_zig/integer
  - basis/cs_with_zig/malloc
aliases: []
tags:
  - Algorithms
  - Sorting
updated: 2026-05-20
---

Every sort you have seen so far — [bubble](../bubble_sort/), [selection](../select_sort/), [insertion](../insertion_sort/), [merge](../merge_sort/) — works by comparing pairs of elements. It can be proved that any comparison-based sort requires at least $\Omega(n \log n)$ comparisons in the worst case. Counting sort sidesteps this bound entirely by not comparing elements at all.

## The comparison lower bound (in brief)

A comparison sort can be modelled as a binary decision tree: each internal node is a comparison, each leaf is a possible sorted order. For $n$ elements there are $n!$ possible orderings, so the tree must have at least $n!$ leaves. A binary tree with $n!$ leaves has height at least $\log_2(n!) = \Theta(n \log n)$. Hence any comparison sort uses $\Omega(n \log n)$ comparisons — always.

Counting sort avoids this bound by using the *values themselves as indices*, never comparing them.

## When counting sort applies

Counting sort requires two things:

1. **Integer keys** — or keys that can be mapped to integers.
2. **A known, small range** $[min, max]$ — the number of distinct key values, $k = max - min + 1$, must be small relative to $n$.

If $k = O(n)$, then counting sort runs in $O(n)$ time. If $k$ is large (say, sorting 32-bit integers with $k = 2^{32}$), the counts array itself would dwarf the input.

## The three phases

Counting sort works in three passes over the data.

### Phase 1: count

Allocate a `counts` array of length $k$ and initialise it to zero. Walk the input once, incrementing `counts[x - min]` for each element `x`.

### Phase 2: prefix sum

Transform `counts` in-place so that `counts[i]` holds the number of elements with key $\le min + i$. This tells you the last valid output position for each key.

### Phase 3: place

Walk the input array in *reverse* and write each element into the output at position `counts[x - min] - 1`, then decrement `counts[x - min]`. Reversing ensures stability.

## Zig implementation

```zig
const std = @import("std");

/// Sorts arr in-place. Every value in arr must be in [min_val, max_val].
fn countingSort(
    arr: []i64,
    min_val: i64,
    max_val: i64,
    allocator: std.mem.Allocator,
) !void {
    const range: usize = @intCast(max_val - min_val + 1);

    // Phase 1: count occurrences.
    const counts = try allocator.alloc(usize, range);
    defer allocator.free(counts);
    @memset(counts, 0);

    for (arr) |x| counts[@intCast(x - min_val)] += 1;

    // Phase 2: prefix sum — counts[i] becomes the number of elements ≤ min_val+i.
    for (1..range) |i| counts[i] += counts[i - 1];

    // Phase 3: place elements into the output in reverse order (preserves stability).
    const out = try allocator.alloc(i64, arr.len);
    defer allocator.free(out);

    var i = arr.len;
    while (i > 0) {
        i -= 1;
        const key: usize = @intCast(arr[i] - min_val);
        counts[key] -= 1;
        out[counts[key]] = arr[i];
    }

    @memcpy(arr, out);
}
```

### Running example

Sort `[4, 2, 2, 8, 3, 3, 1]` with `min_val = 1`, `max_val = 8`, so `range = 8`.

**After Phase 1** (`counts` indexed 0–7, representing keys 1–8):

```
key:    1  2  3  4  5  6  7  8
count:  1  2  2  1  0  0  0  1
```

**After Phase 2** (prefix sums):

```
key:    1  2  3  4  5  6  7  8
count:  1  3  5  6  6  6  6  7
```

`counts[3] = 6` means there are 6 elements with key ≤ 4, so the last `4` must go into output position 5 (0-indexed).

**Phase 3** (traverse input right-to-left):

- `arr[6] = 1`: `counts[0]` becomes 0, place at output[0].
- `arr[5] = 3`: `counts[2]` becomes 4, place at output[4].
- `arr[4] = 3`: `counts[2]` becomes 3, place at output[3].
- … and so on.

Final output: `[1, 2, 2, 3, 3, 4, 8]`. ✓

## Why reverse traversal ensures stability

Two elements with the same key arrive in the output in reverse input order if you traverse forwards — later duplicates land first. Traversing in reverse processes the *last* duplicate first, which decrements `counts[key]` to the *last* available slot for that key, and the *first* duplicate ends up in the *first* slot. Equal elements therefore appear in the output in the same order they appeared in the input: stable.

## Complexity

| Metric | Complexity |
|--------|-----------|
| Time | $O(n + k)$ |
| Extra space | $O(n + k)$ |
| Stable | Yes |
| Comparison-based | No |

The $O(k)$ terms come from initialising and scanning the `counts` array; the $O(n)$ terms come from the three linear passes over the input.

When $k = O(n)$, the total is $O(n)$ — linear. When $k \gg n$, the algorithm degrades: the `counts` array is mostly zeros and you spend most of your time initialising it.

## When not to use counting sort

- **Large key range**: sorting arbitrary 32-bit signed integers requires $k = 2^{32} \approx 4 \times 10^9$ entries — a 32 GB counts array. Not practical.
- **Non-integer keys**: floating-point or string keys cannot be used as direct indices. Use a comparison-based sort instead.
- **Unknown range**: if `min_val` and `max_val` are not known in advance, you need an extra pass to find them (still $O(n)$, but adds complexity).

## Summary

- Counting sort counts occurrences, computes prefix sums to find output positions, then places each element in its correct slot.
- It is **not comparison-based** and therefore beats the $\Omega(n \log n)$ lower bound.
- Time and space are both $O(n + k)$, where $k$ is the key range.
- It is **stable**: reverse traversal in Phase 3 ensures equal elements keep their original order.
- It is practical when $k = O(n)$; it is impractical when $k$ is large or keys are not integers.
- [Radix sort](../radix_sort/) uses counting sort as a stable subroutine to sort integer keys of any size digit by digit.
