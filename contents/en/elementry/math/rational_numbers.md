---
title: Rational Numbers
summary: "A beginner-friendly introduction to rational numbers — the fractions that fill the gaps between whole numbers — covering what they are, why division demands them, and how to combine them."
prerequisites:
  - elementry/math/peano_axioms
aliases: []
tags: ["Numbers"]
updated: 2026-05-09
---

You now know that the natural numbers $\mathbb{N} = \{0, 1, 2, 3, \ldots\}$ can be built from five simple axioms. They are great for counting — but counting is not everything.

Imagine you and two friends share a pizza equally. Each person gets one third of it. One third is not $0$, not $1$, not any natural number. To describe that slice, you need a new kind of number: a **rational number**.

## Why natural numbers fall short

The natural numbers behave beautifully under addition and multiplication. Add two natural numbers and you get another natural number. Multiply two natural numbers and you still land inside $\mathbb{N}$.

Division is different. Sometimes it works out:

$$
6 \div 2 = 3 \qquad \checkmark
$$

But often it does not:

$$
1 \div 3 = \; ?
$$

No natural number equals $1 \div 3$. The natural numbers have a hole wherever division leaves a remainder. Rational numbers are exactly the numbers you need to fill those holes — with one exception you will meet shortly.

## A stepping stone: integers

The natural numbers only go upward from $0$. Before defining rational numbers, it helps to know about **integers** — whole numbers that also include negatives:

$$
\mathbb{Z} = \{\ldots,\, -3,\, -2,\, -1,\, 0,\, 1,\, 2,\, 3,\, \ldots\}
$$

Every natural number is an integer ($\mathbb{N} \subset \mathbb{Z}$), but integers also reach below zero. The symbol $\mathbb{Z}$ comes from the German word *Zahlen*, meaning "numbers."

You do not need a deep treatment of integers right now — just know they exist and that they include negatives.

## What is a rational number?

A **rational number** is any number you can write as a fraction:

$$
\frac{p}{q} \tag{1}
$$

where $p$ and $q$ are integers and $q \neq 0$.

The top number $p$ is called the **numerator** and the bottom number $q$ is called the **denominator**. The word "rational" shares its root with the word *ratio* — a rational number is literally a ratio of two integers.

The set of all rational numbers is written $\mathbb{Q}$, from the French word *quotient* (the result of a division):

$$
\mathbb{Q} \coloneqq \left\{\, \frac{p}{q} \;\middle|\; p, q \in \mathbb{Z},\; q \neq 0 \,\right\}
$$

Here are a few examples:

| Fraction | As a decimal |
|----------|-------------|
| $\frac{1}{2}$ | $0.5$ |
| $\frac{3}{4}$ | $0.75$ |
| $\frac{1}{3}$ | $0.333\ldots$ |
| $\frac{-2}{5}$ | $-0.4$ |
| $\frac{7}{1}$ | $7$ |

Notice that last row: every integer $n$ is a rational number, because $n = \frac{n}{1}$. So $\mathbb{Z} \subset \mathbb{Q}$, and in turn $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q}$.

## Why the denominator cannot be zero

Division by zero is forbidden — not just inconvenient, but genuinely impossible. Here is why.

If $\frac{a}{b} = c$, that means $a = b \times c$. So asking "what is $\frac{1}{0}$?" really asks: "what number $c$ satisfies $1 = 0 \times c$?" Since $0 \times c = 0$ for *every* possible $c$, no value of $c$ ever works. There is no answer, so the question itself is meaningless. The condition $q \neq 0$ in definition (1) is what keeps mathematics from breaking.

## Many fractions, one number

You may have noticed that different fractions can look different but mean the same thing:

$$
\frac{1}{2} = \frac{2}{4} = \frac{3}{6} = \frac{50}{100}
$$

How do you tell when two fractions name the same rational number? Two fractions $\frac{p}{q}$ and $\frac{r}{s}$ represent the same rational number exactly when:

$$
p \times s = r \times q \tag{2}
$$

Check: does $\frac{1}{2} = \frac{3}{6}$? Is $1 \times 6 = 3 \times 2$? Both sides equal $6$, so yes. ✓

Think of a rational number not as a single fraction, but as an entire *family* of equivalent fractions. When you simplify $\frac{6}{9}$ to $\frac{2}{3}$, you are just switching to the simplest member of that family. Both fractions are different names for the exact same number.

The simplest name is found by dividing both numerator and denominator by their **greatest common divisor (GCD)**. For $\frac{6}{9}$: $\gcd(6, 9) = 3$, so:

$$
\frac{6}{9} = \frac{6 \div 3}{9 \div 3} = \frac{2}{3}
$$

## Arithmetic with rational numbers

Once you have fractions, you need to know how to combine them.

### Adding and subtracting

To add two fractions, first rewrite them with the same denominator, then add the numerators:

$$
\frac{a}{b} + \frac{c}{d} = \frac{a \cdot d + b \cdot c}{b \cdot d}
$$

For example:

$$
\frac{1}{3} + \frac{1}{4} = \frac{1 \cdot 4 + 3 \cdot 1}{3 \cdot 4} = \frac{7}{12}
$$

Subtraction follows the same pattern, with a minus sign in the numerator:

$$
\frac{a}{b} - \frac{c}{d} = \frac{a \cdot d - b \cdot c}{b \cdot d}
$$

### Multiplying

Multiplication is the simplest operation — multiply numerators together, and denominators together:

$$
\frac{a}{b} \times \frac{c}{d} = \frac{a \cdot c}{b \cdot d}
$$

### Dividing

Dividing by a fraction is the same as multiplying by its **reciprocal**. The reciprocal of $\frac{c}{d}$ is $\frac{d}{c}$:

$$
\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{a \cdot d}{b \cdot c}
$$

The zero-division rule applies here too: if $c = 0$ then $\frac{c}{d} = 0$, and dividing by zero is still forbidden.

### Closed under all four operations

A set is **closed** under an operation if applying that operation to members of the set always produces another member. The natural numbers are not closed under subtraction ($1 - 3$ has no answer in $\mathbb{N}$) or division ($1 \div 3$ has no answer in $\mathbb{N}$).

The rational numbers fix both problems. As long as you never divide by zero, every result of $+$, $-$, $\times$, and $\div$ applied to rationals is again a rational. This is called a **field** — a structure where all four arithmetic operations work reliably. $\mathbb{Q}$ is the smallest field containing $\mathbb{N}$.

## Rational numbers on the number line

Picture the familiar number line, with integers sitting at evenly spaced landmarks. Rational numbers fill in the *gaps* between those landmarks.

Between $0$ and $1$ you find $\frac{1}{2}$. Between $0$ and $\frac{1}{2}$ you find $\frac{1}{4}$. Between any two rational numbers $r$ and $s$, no matter how close together, their average $\frac{r + s}{2}$ is also rational — and it sits strictly between them.

This property is called **density**: the rationals are *dense* on the number line. There is no "next" rational the way there is a "next" integer. Between any two rationals, infinitely many more rationals always fit.

You might then expect the rationals to cover the entire number line. Surprisingly, they do not. Numbers like $\sqrt{2}$ cannot be written as $\frac{p}{q}$ for any integers $p$ and $q$ — they are **irrational**. The real numbers $\mathbb{R}$ fill those remaining gaps, but that is a story for another checkpoint.

$$
\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}
$$

## Summary

- A **rational number** is any number expressible as $\frac{p}{q}$, where $p$ and $q$ are integers and $q \neq 0$.
- The set of rational numbers is denoted $\mathbb{Q}$; it contains all integers, which in turn contain all natural numbers.
- Division by zero is undefined and is excluded from the definition.
- Many fractions can represent the same rational number; $\frac{p}{q}$ and $\frac{r}{s}$ are equal exactly when $p \times s = r \times q$.
- The four arithmetic operations on fractions:
  - *Addition/subtraction*: $\dfrac{a}{b} \pm \dfrac{c}{d} = \dfrac{a d \pm b c}{b d}$
  - *Multiplication*: $\dfrac{a}{b} \times \dfrac{c}{d} = \dfrac{ac}{bd}$
  - *Division*: $\dfrac{a}{b} \div \dfrac{c}{d} = \dfrac{ad}{bc}$ (requires $c \neq 0$)
- The rationals are **closed** under all four operations (division by zero aside), making $\mathbb{Q}$ a **field**.
- The rationals are **dense**: between any two rationals there is always another rational.
- Despite their density, the rationals do not fill the number line — irrational numbers like $\sqrt{2}$ occupy the remaining gaps.

## What's next

The rational numbers handle all of everyday arithmetic, but they leave genuine holes in the number line. The next big idea is the **real numbers** $\mathbb{R}$, which fill those holes and make it possible to talk about limits, continuity, and calculus.
