---
title: Product Types — Structs and Tuples
summary: "Rust's product types: tuples and `struct`s bundle several values into one. You'll see named-field structs, tuple structs, unit structs, the field-access and destructuring syntax, and why a product type's value count is the *product* of its fields' value counts."
prerequisites:
  - essential/rust/types/adt
  - essential/rust/types/basic_types
aliases: []
tags: ["Rust", "ADT"]
updated: 2026-05-27
---

A **product type** bundles several values into one. In Rust, product types come in three forms: named-field structs, tuple structs, and tuples.

## Named-field structs

The most common product type is a named-field struct:

```rust
struct Point {
    x: f64,
    y: f64,
}
```

To create a value, list each field:

```rust
let p = Point { x: 3.0, y: 4.0 };
```

To read a field, use `.`:

```rust
let distance = (p.x * p.x + p.y * p.y).sqrt();
```

Structs are **nominally typed**: two structs with the same field types but different names are distinct types. A `Point` and a `Size { width: f64, height: f64 }` are not interchangeable, even though both hold two `f64` values.

## Struct update syntax

When creating a new struct that mostly copies an existing one, use `..`:

```rust
let p2 = Point { x: 1.0, ..p }; // p2.y is copied from p.y
```

Fields listed explicitly take their given values; `..base` fills in everything else from `base`.

## Tuple structs

A **tuple struct** names the type but accesses fields by position:

```rust
struct Color(u8, u8, u8);

let red = Color(255, 0, 0);
println!("{} {} {}", red.0, red.1, red.2);
```

Tuple structs are useful when naming the fields adds no clarity, but you still want the type to be distinct from other tuples of the same shape. `Color` and `Point3D(f64, f64, f64)` will not be confused for each other even though both have three components.

## Unit structs

A **unit struct** holds no data:

```rust
struct Marker;

let m = Marker;
```

Unit structs are zero-sized. They are used as type-level tokens — for carrying trait implementations or as phantom type parameters.

## Tuples

An anonymous product type is a **tuple**:

```rust
let pair: (i32, bool) = (42, true);
let (n, flag) = pair;  // destructuring
let n2 = pair.0;       // index access
```

Tuples are convenient for returning two or three values from a function without defining a named struct. For anything larger or more meaningful, prefer a named struct.

## Destructuring

All product types support **destructuring** in `let` bindings:

```rust
let Point { x, y } = p;
println!("{x}, {y}");
```

In function parameters:

```rust
fn translate(Point { x, y }: Point, dx: f64, dy: f64) -> Point {
    Point { x: x + dx, y: y + dy }
}
```

Destructuring is idiomatic when you need to work with several fields at once without writing `p.x`, `p.y`, … repeatedly.

## Why "product"?

The value count of a product type is the *product* of its fields' value counts. If `bool` has 2 values and `u8` has 256, then `(bool, u8)` has $2 \times 256 = 512$ possible values — one for each combination. This multiplicative relationship is where the name comes from.

## Adding behavior with `impl`

A struct acquires methods through an `impl` block:

```rust
impl Point {
    fn distance_from_origin(&self) -> f64 {
        (self.x * self.x + self.y * self.y).sqrt()
    }
}

let p = Point { x: 3.0, y: 4.0 };
println!("{}", p.distance_from_origin()); // 5
```

`&self` borrows the receiver without taking ownership. Methods are how behavior is attached to a specific type; traits generalize this to shared behavior across many types.
