---
title: Radix Sort
summary: "Radix sort sorts integers digit by digit from least significant to most significant, using a stable subroutine such as counting sort at each pass, achieving O(nk) time where k is the number of digits. This checkpoint develops the algorithm, proves why stability of the inner sort is essential, and analyses when radix sort outperforms comparison-based O(n log n) algorithms."
prerequisites:
  - basis/algorithm/sort/count_sort
  - basis/data_structure/array
  - basis/cs_with_zig/loop
  - basis/cs_with_zig/malloc
aliases: []
tags:
  - Algorithms
  - Sorting
updated: 2026-05-20
---

[Counting sort](../count_sort/) breaks the $\Omega(n \log n)$ comparison barrier but only when the key range $k$ is small relative to $n$. What about sorting 64-bit integers, where $k = 2^{64}$ is enormous? Radix sort applies counting sort one *digit* at a time, keeping the range small ($b = 10$ or $256$) while handling arbitrarily large values.

## Least-significant-digit (LSD) radix sort

Radix sort comes in two flavours: **LSD** (least-significant digit first) and MSD (most-significant digit first). LSD is simpler and the one you should learn first.

The algorithm makes $d$ passes over the data, where $d$ is the number of digits in the largest value. On pass $p$ it sorts by the $p$-th digit (0 = ones place, 1 = tens place, …) using a **stable** subroutine. Because each pass is stable and you process digits from least to most significant, the final result is fully sorted.

## Why stability is essential

Suppose you are sorting `[802, 303, 14, 714, 18]` by digit.

After pass 0 (ones digit, stable):

```
802  303  14  714  18
 ↓    ↓   ↓   ↓    ↓
802  303  14  714   18   → sorted by ones: [802, 303, 14, 714, 18]
```

More carefully: ones digits are 2, 3, 4, 4, 8. A stable sort on the ones digit gives `[802, 303, 14, 714, 18]` (the two `4`s — from `14` and `714` — appear in their original order).

After pass 1 (tens digit, stable sort on `[802, 303, 14, 714, 18]`):

Tens digits: 0, 0, 1, 1, 1. A stable sort keeps equal-tens-digit elements in the order they arrived: `[802, 303, 14, 714, 18]` → `[802, 303, 14, 714, 18]`.

Wait — let me redo with a cleaner example. Sort `[170, 45, 75, 90, 2, 802, 24, 66]`.

| Pass | Digit | Result |
|------|-------|--------|
| 0 | ones | `[170, 90, 2, 802, 24, 45, 75, 66]` |
| 1 | tens | `[2, 802, 24, 45, 66, 170, 75, 90]` |
| 2 | hundreds | `[2, 24, 45, 66, 75, 90, 170, 802]` ✓ |

After pass 1, `2` and `802` appear before `24` because their tens digit is `0`, which is less than `2`. Stability from pass 0 means `2` (ones digit 2) precedes `802` (ones digit 2) within the tens-digit group — so when pass 2 sorts by hundreds digit, `2` and `802` are already in the right relative order.

If pass 1 were *unstable*, `2` and `802` could swap, corrupting the ones-digit order that pass 0 established.

## Zig implementation

```zig
const std = @import("std");

/// One pass of counting sort, sorting arr by the digit at position exp.
/// exp = 1 → ones, 10 → tens, 100 → hundreds, …
fn sortByDigit(arr: []u64, out: []u64, exp: u64) void {
    const base = 10;
    var counts = [_]usize{0} ** base;

    // Count occurrences of each digit.
    for (arr) |x| counts[(x / exp) % base] += 1;

    // Prefix sum.
    for (1..base) |i| counts[i] += counts[i - 1];

    // Place in stable order (reverse traversal).
    var i = arr.len;
    while (i > 0) {
        i -= 1;
        const digit = (arr[i] / exp) % base;
        counts[digit] -= 1;
        out[counts[digit]] = arr[i];
    }
}

/// Sorts arr in-place (all values must be non-negative).
fn radixSort(arr: []u64, allocator: std.mem.Allocator) !void {
    if (arr.len == 0) return;

    const out = try allocator.alloc(u64, arr.len);
    defer allocator.free(out);

    // Find the maximum value to know how many digit passes are needed.
    var max_val = arr[0];
    for (arr[1..]) |x| if (x > max_val) { max_val = x; };

    // Process digit by digit, least significant first.
    var exp: u64 = 1;
    while (exp <= max_val) : (exp *= 10) {
        sortByDigit(arr, out, exp);
        @memcpy(arr, out);
    }
}
```

`sortByDigit` is a self-contained counting sort restricted to base-10 digits (range 0–9), which makes the `counts` array a fixed size of 10 regardless of the values in the input.

## Choosing the base

Base 10 is readable but not fastest. In practice, **base 256** ($b = 256$) is common: one byte per digit, 4 passes for a 32-bit integer, 8 passes for a 64-bit integer. The `counts` array is then 256 entries — still very small — and the digit extraction becomes a single byte shift:

```zig
const digit = (x >> (8 * pass)) & 0xFF;
```

Larger bases mean fewer passes ($d$ decreases) but larger `counts` arrays ($b$ increases). The optimal base balances these two.

## Complexity analysis

Each pass of `sortByDigit` costs $O(n + b)$ where $b$ is the base. With $d$ passes:

$$
T(n) = O\!\left(d \cdot (n + b)\right).
$$

For fixed-width $w$-bit integers and base $b = 2^r$, the number of passes is $d = \lceil w / r \rceil$:

$$
T(n) = O\!\left(\frac{w}{r} \cdot \left(n + 2^r\right)\right).
$$

When $w$ and $b$ are constants relative to $n$ (e.g., 32-bit integers, base 256), this is $O(n)$.

## When radix sort wins

Compare with comparison-based sorts at $O(n \log n)$:

- Radix sort wins when $d \cdot b \ll n \log n$, i.e., when $d$ is small and $b$ is small relative to $n$.
- For 32-bit integers with $n \ge 10^6$, base-256 radix sort (4 passes, 256-entry counts array) often beats quicksort in practice.
- For 64-bit integers or variable-length keys (strings), $d$ grows and the advantage shrinks.

## Handling signed integers

The implementation above requires non-negative (`u64`) keys. To sort signed integers:

1. **Bias**: add $|min|$ to all values to shift them into $[0, max - min]$, sort, then subtract $|min|$ from the output.
2. **Separate negative and positive**: sort the two groups independently, then concatenate (negatives reversed, then positives).

## Summary

- LSD radix sort makes $d$ passes over the data, one per digit from least to most significant, using a stable subroutine (counting sort) each time.
- Stability of each pass is **essential**: it ensures the ordering established by earlier (lower) digits is preserved by later (higher) digit passes.
- Time complexity is $O(d \cdot (n + b))$, where $d$ is the number of digits and $b$ is the base.
- For fixed-width integers and a suitable base, this is $O(n)$ — linear.
- Radix sort beats comparison-based $O(n \log n)$ sorts when $d$ and $b$ are small relative to $n$.
- The implementation uses $O(n + b)$ extra space for the output buffer and the counts array.
