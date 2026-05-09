---
title: Peano Axioms
summary: "A beginner-friendly introduction to the five Peano axioms — the simple rules that define the natural numbers from the ground up."
prerequisites: []
aliases: []
tags: ["Axiom", "Numbers"]
updated: 2026-05-09
---

You have been counting since you were very small. But have you ever stopped to wonder: *what are numbers, really?* The **Peano axioms** are mathematicians' answer — five compact rules that conjure the entire set of counting numbers out of nothing but logic.

## What is an axiom?

Mathematics is built like a tower. At the very bottom you need a foundation — facts you accept as true *without* proof. These bedrock truths are called **axioms**.

Everything above them (formulas, theorems, all the rules you learned in school) is derived by reasoning carefully from those starting points. An axiom is not proven; it is *chosen*. Mathematicians pick axioms that feel obviously true and are powerful enough to let them prove everything else.

Think of axioms as the rules of a board game. Before any piece moves, every player at the table agrees to the same rules. The game itself — all the strategies, moves, and outcomes — follows from those rules. In the same way, all of arithmetic follows from the Peano axioms.

## What are the natural numbers?

The numbers $0, 1, 2, 3, \ldots$ are called the **natural numbers**. (Some older textbooks start at $1$; modern convention includes $0$, and that is what we will do here.)

The set of all natural numbers is written $\mathbb{N}$:

$$
\mathbb{N} = \{0,\, 1,\, 2,\, 3,\, 4,\, \ldots\}
$$

In 1889, the Italian mathematician **Giuseppe Peano** asked: what is the *minimum* you need to pin down exactly what these numbers are — no more, no less? His answer was five axioms.

## The "next" button: the successor function

The central idea in Peano's system is the **successor function**, written $S$. The successor of a number is simply the number right after it:

$$
S(0) = 1, \qquad S(1) = 2, \qquad S(2) = 3, \qquad \ldots
$$

Think of $S$ as a "next" button. Press it once starting from $0$ and you reach $1$. Press it again and you reach $2$. Because you can always press it one more time, the counting numbers never end.

Using $S$, every natural number greater than $0$ is $0$ with the button pressed some number of times:

$$
1 = S(0), \qquad
2 = S(S(0)), \qquad
3 = S(S(S(0))), \qquad \ldots
$$

With this picture in mind, the five axioms are easy to state and easy to understand.

## The five Peano axioms

### Axiom 1: zero exists

$$
0 \in \mathbb{N} \tag{P1}
$$

Zero is a natural number. Without a starting point the "next" button has nowhere to begin, so we declare $0$ exists. Everything else is built on top of this single seed.

### Axiom 2: every number has a successor

$$
\forall\, n \in \mathbb{N},\quad S(n) \in \mathbb{N} \tag{P2}
$$

If $n$ is a natural number, then $S(n)$ — the number right after it — is also a natural number. This guarantees there is no *last* number. No matter how far you count, you can always go one further.

### Axiom 3: zero is not a successor

$$
\forall\, n \in \mathbb{N},\quad S(n) \neq 0 \tag{P3}
$$

Zero has nothing before it. Every number other than $0$ is the successor of something, but $0$ itself is not the successor of anything.

Without this rule the numbers might "wrap around" like hours on a clock (where pressing "next" on $12$ brings you back to $1$). Axiom 3 rules that out: once you leave $0$ by pressing the "next" button, you never return to it.

### Axiom 4: different numbers have different successors

$$
\forall\, m, n \in \mathbb{N},\quad S(m) = S(n) \implies m = n \tag{P4}
$$

If two numbers share the same successor, they must be the same number. In other words, the "next" button never sends two *different* numbers to the same place — each number has its own unique successor.

Imagine an endless queue of people, each standing directly behind exactly one other person. Axiom 4 says no two people ever stand behind the *same* person. The queue never merges; it just stretches on forever.

### Axiom 5: the induction axiom

$$
\Bigl[P(0)\ \land\ \forall\, n \in \mathbb{N}\,\bigl(P(n) \implies P(S(n))\bigr)\Bigr]
\implies
\forall\, n \in \mathbb{N},\; P(n) \tag{P5}
$$

This is the most powerful — and the most surprising — of the five axioms.

In plain English: suppose some property $P$ holds for $0$, and whenever it holds for a number $n$ it also holds for the next number $S(n)$. Then $P$ holds for *every* natural number.

The classic image is **dominoes**. Picture an infinite row of standing dominoes:

- The first domino falls — that is $P(0)$.
- Each fallen domino knocks over the next one — that is $P(n) \implies P(S(n))$.
- Conclusion: every domino eventually falls — that is $\forall\, n,\; P(n)$.

Why is this axiom necessary? Without it, there could be "stray" numbers that live inside $\mathbb{N}$ but are never reached by starting at $0$ and pressing the "next" button. Axiom 5 closes the door on those impostors. It says $\mathbb{N}$ contains *exactly* the numbers you can reach by applying $S$ to $0$ finitely many times — nothing hidden, nothing extra.

## What you can build from five axioms

Starting from (P1)–(P5) alone, you can *define* addition and multiplication and then *prove* every arithmetic rule you have ever used:

**Addition** is defined in two steps:

$$
m + 0 \coloneqq m \tag{A1}
$$

$$
m + S(n) \coloneqq S(m + n) \tag{A2}
$$

Rule (A1) says adding zero changes nothing. Rule (A2) says adding the successor of $n$ is the same as taking the successor of $m + n$. That is all — addition is fully captured by two lines.

**Multiplication** is similarly recursive:

$$
m \times 0 \coloneqq 0 \tag{M1}
$$

$$
m \times S(n) \coloneqq (m \times n) + m \tag{M2}
$$

From these definitions, and the induction axiom, you can prove:

- $m + n = n + m$ (commutativity of addition)
- $(m + n) + k = m + (n + k)$ (associativity)
- $m \times (n + k) = m \times n + m \times k$ (distributivity)
- … and everything else you know about whole-number arithmetic.

All of it is a logical consequence of five simple rules.

## Summary

- An **axiom** is a starting assumption that is accepted without proof. All mathematical reasoning in a theory is built on top of its axioms.
- The **natural numbers** $\mathbb{N} = \{0, 1, 2, 3, \ldots\}$ can be defined using just five axioms, first published by Giuseppe Peano in 1889.
- The key tool is the **successor function** $S$: applying it once moves you to the next number.
- The five Peano axioms state:
  - **(P1)** $0$ is a natural number.
  - **(P2)** Every natural number has a successor, which is also a natural number.
  - **(P3)** $0$ is not the successor of any natural number — the sequence has a true beginning.
  - **(P4)** The successor function is injective: two different numbers always have different successors.
  - **(P5)** The induction axiom: any property that holds for $0$ and "spreads" from each number to its successor must hold for every natural number.
- From these five rules you can define addition and multiplication, then prove all of their familiar properties.
