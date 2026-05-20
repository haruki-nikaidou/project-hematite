---
title: Hash Map
summary: "A hash map stores key-value pairs and retrieves any value by its key in O(1) average time. You will learn to use Zig's standard-library hash maps as a black box: how to create them, insert and look up entries, and decide when a hash map is the right tool."
prerequisites:
  - basis/data_structure/array
  - basis/cs_with_zig/memory_layout
aliases: []
tags:
  - Data Structures
updated: 2026-05-20
---

Suppose you are tracking word frequencies in a document. You have thousands of distinct words and you want to answer "how many times did 'graph' appear?" instantly. An [array](/en/cp/basis/data_structure/array/) can not do this efficiently — looking up a word in an array requires scanning every entry, which takes $O(n)$ time. What you need is a structure that maps each word directly to its count and answers any lookup in constant time. That structure is a **hash map**.

## What a hash map is

A **hash map** (also called a *hash table*, *dictionary*, or *map*) stores a collection of **key-value pairs**. Each key is unique within the map, and the map associates every key with exactly one value.

```text
key          value
─────────────────
"apple"   →  3
"banana"  →  7
"cherry"  →  1
```

The three operations you will use most are:

- **Put**: store the value `v` under the key `k`. If `k` already exists, the old value is replaced.
- **Get**: given a key `k`, retrieve its associated value — or learn that `k` is absent.
- **Remove**: delete the key-value pair for `k`.

All three run in **O(1) average time**, regardless of how many pairs the map already contains. That is the defining promise of a hash map.

How does it achieve this? The internal mechanism — called *hashing* — is left for a later checkpoint. For now, treat the hash map as a magic box: hand it a key and it instantly returns the value, with no scanning and no pointer-chasing. You only need to know the contract: unique keys, $O(1)$ average for put/get/remove, $O(n)$ space.

## Hash maps in Zig

Zig's standard library provides two hash map types for the most common key kinds:

- `std.AutoHashMap(K, V)` — for keys that are plain data types: integers, booleans, enums, and simple structs. Zig generates a hashing function for you.
- `std.StringHashMap(V)` — for keys that are `[]const u8` strings.

Both expose the same interface; only the key type differs.

### Creating a hash map

Like heap-allocated arrays, hash maps live on the heap. You supply an allocator when you create one and call `deinit()` when you are done — the same pattern you saw in [Memory Layout](/en/cp/basis/cs_with_zig/memory_layout/):

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var map = std.AutoHashMap(i32, []const u8).init(allocator);
    defer map.deinit();  // always pair with init
}
```

`std.AutoHashMap(i32, []const u8)` is a map from `i32` keys to `[]const u8` (string) values. The two type parameters are `(KeyType, ValueType)`.

### Inserting and updating entries

`put(key, value)` inserts a new pair or overwrites the existing value if the key is already present:

```zig
try map.put(1, "one");
try map.put(2, "two");
try map.put(3, "three");
try map.put(2, "TWO");  // key 2 now maps to "TWO"
```

`put` allocates memory internally and can fail with an out-of-memory error, so `try` is required.

### Looking up a value

`get(key)` returns `?V` — an optional value. It is `null` when the key is not in the map:

```zig
const result = map.get(2);
if (result) |value| {
    std.debug.print("found: {s}\n", .{value}); // found: TWO
} else {
    std.debug.print("not found\n", .{});
}

// key 99 was never inserted
std.debug.print("{?s}\n", .{map.get(99)}); // null
```

### Checking membership without fetching the value

`contains(key)` returns a `bool` without returning the value itself:

```zig
std.debug.print("{}\n", .{map.contains(1)});  // true
std.debug.print("{}\n", .{map.contains(99)}); // false
```

### Removing an entry

`remove(key)` deletes the pair and returns `true` if the key existed, `false` if it was not found:

```zig
const was_present = map.remove(3);
std.debug.print("{}\n", .{was_present});       // true
std.debug.print("{}\n", .{map.contains(3)});   // false
```

### Counting entries

`count()` returns the number of key-value pairs currently stored:

```zig
std.debug.print("{}\n", .{map.count()}); // 2  (keys 1 and 2 remain)
```

## Inserting or updating in one step

Counting words requires a pattern that shows up constantly: if the key already exists, increment its value; otherwise insert it with an initial value. Doing this with `get` followed by `put` would require two lookups. `getOrPut(key)` does it in one:

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var counts = std.StringHashMap(u32).init(allocator);
    defer counts.deinit();

    const words = [_][]const u8{
        "the", "cat", "sat", "on", "the", "mat", "the",
    };

    for (words) |word| {
        const entry = try counts.getOrPut(word);
        if (entry.found_existing) {
            entry.value_ptr.* += 1;  // key was already there — increment
        } else {
            entry.value_ptr.* = 1;   // first occurrence — initialize
        }
    }

    std.debug.print("the: {}\n", .{counts.get("the").?}); // the: 3
    std.debug.print("cat: {}\n", .{counts.get("cat").?}); // cat: 1
    std.debug.print("sat: {}\n", .{counts.get("sat").?}); // sat: 1
}
```

`getOrPut` returns a struct with two fields:

- `found_existing: bool` — `true` if the key was already in the map.
- `value_ptr: *V` — a pointer directly into the map's internal storage where the value lives.

Writing through `value_ptr` updates the map in place without a second lookup.

## Iterating over a hash map

`iterator()` produces every key-value pair. The order is **unspecified** — do not assume it matches insertion order or any sorted order:

```zig
var it = counts.iterator();
while (it.next()) |entry| {
    std.debug.print("{s}: {}\n", .{ entry.key_ptr.*, entry.value_ptr.* });
}
// output order may vary: e.g. "on: 1", "the: 3", "cat: 1", ...
```

Each call to `it.next()` returns `?Entry`. The loop stops when `it.next()` returns `null`.

## When to use a hash map

A hash map is the right choice when:

- You need to look up values by a meaningful key — a name, an ID, a word — rather than by a numeric position.
- The set of keys is not known at compile time, or the keys are not consecutive integers starting from zero.
- You need $O(1)$ average insertions, lookups, and deletions.

An [array](/en/cp/basis/data_structure/array/) is still preferable when your keys *are* dense integers starting from zero. Array indexing avoids all hash map overhead and is more cache-friendly. Use a hash map when the keys are arbitrary; use an array when the keys are dense indices.

## Summary

- A **hash map** stores **key-value pairs** and provides $O(1)$ average time for put, get, and remove — regardless of how many entries are stored.
- In Zig, use `std.AutoHashMap(K, V)` for integer, boolean, enum, or struct keys, and `std.StringHashMap(V)` for string keys.
- Create with `.init(allocator)` and always pair with `defer map.deinit()` to release heap memory.
- `put(key, value)` inserts or overwrites; `get(key)` returns `?V` (null if absent); `remove(key)` deletes and reports whether the key existed.
- `getOrPut(key)` finds or inserts in a single lookup — the efficient pattern for counting and accumulation.
- `count()` returns the number of pairs; `iterator()` walks all pairs in an unspecified order.
- Prefer an array when keys are dense non-negative integers; prefer a hash map for arbitrary keys.
