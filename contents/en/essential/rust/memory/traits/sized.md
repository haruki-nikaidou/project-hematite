---
title: "The `Sized` Trait and `?Sized`"
summary: "`Sized` is the marker trait every type with a compile-time-known size automatically implements — the precondition for a value to live on the stack or be passed by value. You'll see why every generic type parameter has an implicit `T: Sized` bound, when to relax it with `T: ?Sized`, and which Rust types are *not* `Sized` (slices `[T]`, `str`, trait objects `dyn Trait`)."
prerequisites:
  - essential/rust/types/size
  - essential/rust/traits/traits_intro
aliases: []
tags: ["Rust", "Memory"]
updated: 2026-05-28
---

Before Rust can place a value on the stack, pass it by value to a function, or store it inside another type, it needs to know how many bytes to reserve. `Sized` is the formal marker for "this type has a compile-time-known size." You don't implement it yourself — the compiler adds it automatically to every type with a fixed size.

## What `Sized` is

`Sized` is an auto-implemented **marker trait** with no methods:

```rust
// defined in the standard library — no methods, no fields
pub marker trait Sized {}
```

Every concrete type whose size is known at compile time automatically implements `Sized`. Types you saw in [The Size of a Type](../../types/size/) that are *not* `Sized` are called **dynamically sized types** (DSTs): `[T]`, `str`, and `dyn Trait`.

## The implicit `T: Sized` bound

Every generic type parameter carries a hidden `Sized` bound. These two signatures are identical:

```rust
fn identity<T>(x: T) -> T { x }
fn identity<T: Sized>(x: T) -> T { x } // what the compiler actually sees
```

The bound exists because `x` is passed by value: the compiler must know how many bytes to reserve on the stack. You can't call `identity` with a `[u8]` argument because `[u8]` has no compile-time size.

## Relaxing the bound with `?Sized`

`?Sized` is not a trait — it is a bound that *removes* the implicit `Sized` requirement. Write `T: ?Sized` to accept both sized and unsized types:

```rust
fn print_it<T: ?Sized + std::fmt::Debug>(x: &T) {
    println!("{:?}", x);
}

print_it(&42u32);        // sized: fine
print_it(&[1u8, 2, 3]);  // unsized slice: also fine
```

Because you cannot put an unsized `T` on the stack, functions that accept `T: ?Sized` must use `T` only behind a reference or pointer. That reference is a **fat pointer** — two pointer widths: one for the data address, one for metadata (length for slices, vtable pointer for trait objects).

## `?Sized` in the standard library

The standard library uses `?Sized` wherever a wrapper type should be able to hold a DST:

```rust
impl<T: ?Sized> Box<T> { ... }
impl<T: ?Sized> Rc<T>  { ... }
impl<T: ?Sized> Arc<T> { ... }
```

Without `?Sized`, `Box<dyn Trait>` and `Box<[u8]>` would be compile errors. By opting out of the `Sized` requirement on `T`, these types become generic over both sized and unsized pointees.

## `str` and `[T]`

The most common DSTs are `str` and `[T]`. You almost never hold them directly — only behind a reference or smart pointer:

```rust
let s: &str = "hello";       // fat pointer: ptr + length
let v: &[i32] = &[1, 2, 3];  // fat pointer: ptr + length
```

`String` and `Vec<T>` are `Sized` types that own a heap buffer and dereference to the unsized `str` and `[T]` respectively.

## Summary

- `Sized` is automatically implemented by every type whose size is known at compile time.
- Every generic parameter implicitly requires `T: Sized` so values can be held by value on the stack.
- `T: ?Sized` removes that requirement; the function must then use `T` only behind a reference or pointer.
- DSTs — `[T]`, `str`, `dyn Trait` — are not `Sized`; references to them are fat pointers.
- `Box<T>`, `Rc<T>`, and `Arc<T>` use `T: ?Sized` so they can wrap both sized and unsized types.
