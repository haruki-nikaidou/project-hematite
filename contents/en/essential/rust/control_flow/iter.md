---
title: Iterators
summary: "Behind every `for` loop is the `Iterator` trait — a single `fn next(&mut self) -> Option<Self::Item>` that produces values one at a time. You'll see how iterator *adapters* (`map`, `filter`, `take`, `chain`) compose lazily into pipelines, how *consumers* (`collect`, `sum`, `fold`, `for_each`) drive them, and why this style is both idiomatic and as fast as the equivalent hand-written loop."
prerequisites:
  - essential/rust/control_flow/for
  - essential/rust/traits/associated_type
aliases: []
tags: ["Rust", "Iterator"]
updated: 2026-05-27
---

Every [`for`](../for/) loop in Rust calls a single method under the hood: `next`. The **`Iterator`** trait captures this minimal interface, and almost everything in the standard library that produces a sequence of values implements it.

## The `Iterator` trait

The trait has one required method:

```rust
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
```

`next` returns `Some(item)` for each successive element, then `None` when the sequence is exhausted. The `type Item` is an [associated type](../../traits/associated_type/) that names what the iterator yields.

You rarely implement `Iterator` by hand, but seeing the signature demystifies how `for` works:

```rust
let mut iter = vec![10, 20, 30].into_iter();
assert_eq!(iter.next(), Some(10));
assert_eq!(iter.next(), Some(20));
assert_eq!(iter.next(), Some(30));
assert_eq!(iter.next(), None);
```

The `for` loop desugars to exactly this call sequence.

## Adapters — lazy transformations

An **adapter** wraps an existing iterator and returns a new one. Adapters are *lazy*: they do no work until the chain is driven by a consumer:

```rust
let v = vec![1, 2, 3, 4, 5];

// nothing executes yet — this just describes the pipeline
let pipeline = v.iter()
    .filter(|&&x| x % 2 == 0)
    .map(|&x| x * 10);
```

Common adapters:

| Adapter | Produces |
|---------|---------|
| `.map(f)` | elements transformed by `f` |
| `.filter(pred)` | elements where `pred` is `true` |
| `.take(n)` | at most the first `n` elements |
| `.skip(n)` | all elements after the first `n` |
| `.chain(other)` | elements of `self` followed by `other` |
| `.enumerate()` | `(index, element)` pairs |
| `.zip(other)` | `(self_item, other_item)` pairs |
| `.flat_map(f)` | elements of each sub-iterator returned by `f` |
| `.peekable()` | an iterator that can look at the next element without consuming it |

Because adapters are lazy, you can chain many of them with no intermediate heap allocation.

## Consumers — driving the pipeline

A **consumer** pulls elements out of the iterator and produces a final result:

```rust
let doubled_evens: Vec<i32> = (1..=10)
    .filter(|x| x % 2 == 0)
    .map(|x| x * 2)
    .collect();
// [4, 8, 12, 16, 20]
```

Common consumers:

| Consumer | Returns |
|----------|---------|
| `.collect::<C>()` | any collection `C: FromIterator` |
| `.sum::<T>()` | total of all elements |
| `.product::<T>()` | product of all elements |
| `.fold(init, f)` | single value built by applying `f` to each element |
| `.for_each(f)` | runs `f` on each element; returns `()` |
| `.count()` | number of elements |
| `.any(pred)` / `.all(pred)` | short-circuit boolean tests |
| `.find(pred)` | first matching element as `Option` |
| `.position(pred)` | index of the first match as `Option<usize>` |
| `.max()` / `.min()` | largest/smallest element as `Option` |

`fold` is the most general consumer — it subsumes `sum`, `product`, and even `collect`:

```rust
let product = (1..=5).fold(1u64, |acc, x| acc * x);
assert_eq!(product, 120);
```

## Zero-cost abstraction

The Rust compiler inlines and optimises iterator chains to the same machine code as an equivalent hand-written loop. Writing a pipeline is not a performance trade-off:

```rust
// pipeline
let sum: i32 = v.iter().filter(|&&x| x > 0).map(|&x| x * 2).sum();

// manual loop — same assembly under release optimisations
let mut sum = 0i32;
for &x in &v {
    if x > 0 { sum += x * 2; }
}
```

## Writing your own iterator

Any type that implements `next` gets all the adapter and consumer methods for free via default implementations in the trait:

```rust
struct Countdown(u32);

impl Iterator for Countdown {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.0 == 0 {
            None
        } else {
            self.0 -= 1;
            Some(self.0 + 1)
        }
    }
}

let v: Vec<u32> = Countdown(3).collect();
assert_eq!(v, [3, 2, 1]);
```

Implementing only `next` is enough to unlock `.map`, `.filter`, `.collect`, and everything else.
