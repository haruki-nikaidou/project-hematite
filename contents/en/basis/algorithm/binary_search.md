---
title: Binary Search
summary: "Binary search locates a value in a sorted array in O(log n) time by repeatedly halving the search interval. This checkpoint develops the algorithm, walks through its invariant, and shows how subtle off-by-one mistakes in the boundary update destroy correctness."
prerequisites:
  - basis/algorithm/time_complexity
  - basis/data_structure/array
  - basis/cs_with_zig/loop
aliases: []
tags:
  - Algorithms
  - Search
updated: 2026-05-20
---

Scanning an array from left to right to find a value works, but for a sorted array of a billion elements it may require a billion comparisons. Binary search exploits the sorted order to do the same job in at most 30 comparisons — by throwing away half the remaining candidates at every step. Understanding it deeply also teaches you something more broadly useful: how to write a loop around a precise invariant so that correctness is obvious, not guessed.

## The idea: cut the search space in half

Suppose you have a sorted array and you want to know whether some `target` value is in it, and if so at which index. Pick the element in the middle. Three things can happen:

- It equals `target` — you are done.
- It is **less than** `target` — because the array is sorted, every element to the *left* of `mid` is also less than `target`. You can discard the left half entirely.
- It is **greater than** `target` — by the same argument, discard the right half.

Each comparison halves the number of candidates. Starting from $n$ elements, after $k$ steps at most $\lceil n / 2^k \rceil$ remain. The loop ends when either the target is found or the remaining interval is empty, which happens after at most $\lceil \log_2 n \rceil$ steps. That is where $O(\log n)$ comes from.

## The invariant

The trickiest part of binary search is not the idea — it is keeping the boundary updates consistent. The cleanest approach uses a **half-open interval** $[\mathtt{lo}, \mathtt{hi})$: every element that could still be the target lives at an index $i$ with $\mathtt{lo} \le i < \mathtt{hi}$.

This interval has three useful properties:

1. It starts as the whole array: `lo = 0`, `hi = arr.len`.
2. It is empty exactly when `lo == hi`, which is your loop termination condition.
3. Every update must preserve the invariant — after the update, the target (if present) must still be inside the new interval.

Here is what the updates look like. After computing `mid = lo + (hi - lo) / 2`:

- If `arr[mid] < target`: `mid` and everything to its left is too small. The new search space is $[\mathtt{mid}{+}1, \mathtt{hi})$, so set `lo = mid + 1`.
- If `arr[mid] > target`: `mid` and everything to its right is too large. The new space is $[\mathtt{lo}, \mathtt{mid})$, so set `hi = mid`.

In both cases the interval strictly shrinks (you will see why that matters in a moment), and the invariant is preserved.

## A traced example

Array: `[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]`, target: `23`.

| Step | `lo` | `hi` | `mid` | `arr[mid]` | Action |
|------|------|------|-------|-----------|--------|
| 1 | 0 | 10 | 5 | 23 | Found! |

Lucky — one step. Let's try target `16`:

| Step | `lo` | `hi` | `mid` | `arr[mid]` | Action |
|------|------|------|-------|-----------|--------|
| 1 | 0 | 10 | 5 | 23 | 23 > 16, set hi = 5 |
| 2 | 0 | 5 | 2 | 8 | 8 < 16, set lo = 3 |
| 3 | 3 | 5 | 4 | 16 | Found! |

And target `17` (absent):

| Step | `lo` | `hi` | `mid` | `arr[mid]` | Action |
|------|------|------|-------|-----------|--------|
| 1 | 0 | 10 | 5 | 23 | 23 > 17, set hi = 5 |
| 2 | 0 | 5 | 2 | 8 | 8 < 17, set lo = 3 |
| 3 | 3 | 5 | 4 | 16 | 16 < 17, set lo = 5 |
| 4 | 5 | 5 | — | — | lo == hi, not found |

## Implementation in Zig

```zig
const std = @import("std");

// Returns the index of `target` in `arr`, or null if not present.
// `arr` must be sorted in ascending order.
fn binarySearch(arr: []const i32, target: i32) ?usize {
    var lo: usize = 0;
    var hi: usize = arr.len;

    while (lo < hi) {
        const mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return null;
}

pub fn main() void {
    const data = [_]i32{ 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 };

    if (binarySearch(&data, 23)) |idx| {
        std.debug.print("found 23 at index {}\n", .{idx}); // found 23 at index 5
    }

    if (binarySearch(&data, 17)) |_| {
        std.debug.print("found 17\n", .{});
    } else {
        std.debug.print("17 not found\n", .{}); // 17 not found
    }
}
```

A few details worth noting:

- `mid = lo + (hi - lo) / 2` rather than `(lo + hi) / 2`. The naive form overflows when `lo + hi` exceeds the maximum `usize` value — this form does not.
- The function returns `?usize`, Zig's optional type. The caller uses `if (result) |idx| { ... } else { ... }` to handle both outcomes.
- The array parameter is `[]const i32` — a slice that does not allow mutation.

## The off-by-one mistakes that break everything

Off-by-one errors in binary search are extremely common. Knowing what each one does helps you spot and fix them quickly.

### Using `lo <= hi` with a closed interval

Some implementations use a closed interval $[\mathtt{lo}, \mathtt{hi}]$ and write the loop as `while (lo <= hi)`. This is consistent *if and only if* you also change the boundary updates to `lo = mid + 1` and `hi = mid - 1`. Mixing the closed-interval loop with a half-open boundary update (forgetting `- 1`) causes an infinite loop: when the target is absent and `lo == hi`, computing `hi = mid` leaves `hi = lo`, and the interval never empties.

### Writing `hi = mid - 1` in the half-open style

In the half-open scheme, `hi` is an exclusive upper bound — an index that is *never* looked at. Setting `hi = mid - 1` when `arr[mid] > target` excludes `mid - 1` from the search space without justification. If the target is at index `mid - 1`, you will miss it.

### Writing `lo = mid` instead of `lo = mid + 1`

When `arr[mid] < target`, you know `mid` is not the answer. Setting `lo = mid` instead of `lo = mid + 1` keeps `mid` inside the interval. Worse, when `hi = lo + 1`, `mid` computes to `lo`, and the update `lo = mid = lo` never changes `lo` — the loop hangs forever.

The pattern to remember: **each update must exclude `mid` from the new interval**. The half-open scheme achieves this naturally: `lo = mid + 1` and `hi = mid` both leave `mid` outside $[\mathtt{lo}, \mathtt{hi})$.

## Why the loop always terminates

You might worry: does the interval always shrink? In the half-open scheme:

- `lo = mid + 1` increases `lo` by at least one (since `mid >= lo`).
- `hi = mid` decreases `hi` by at least one (since `mid < hi` when `lo < hi`).

So every iteration that does not return early strictly reduces `hi - lo`. Since `hi - lo` is a non-negative integer and decreases at every step, the loop must terminate.

## Summary

- **Binary search** finds a target in a sorted array in $O(\log n)$ time by halving the search interval at each step.
- Use the **half-open interval** $[\mathtt{lo}, \mathtt{hi})$: the invariant is that the target, if present, lies at an index in this range. The loop runs while `lo < hi`.
- Compute the midpoint as `lo + (hi - lo) / 2` to avoid integer overflow.
- The boundary updates `lo = mid + 1` and `hi = mid` both exclude `mid` from the new interval, which preserves the invariant and guarantees termination.
- Off-by-one errors arise from mixing incompatible interval styles, or from updates that leave `mid` inside the search space and create infinite loops.
- The $O(\log n)$ bound comes from the fact that the interval halves at each step: after $k$ steps at most $\lceil n/2^k \rceil$ candidates remain.
