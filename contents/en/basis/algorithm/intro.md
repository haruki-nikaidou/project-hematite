---
title: Introduction to Algorithms
summary: "An algorithm is a finite, unambiguous procedure that transforms input to output. This checkpoint sets out what makes a procedure an algorithm, why correctness and efficiency are the two questions you must always ask about one, and previews the families of algorithms that follow."
prerequisites:
  - basis/data_structure/data_structure_intro
aliases: []
tags:
  - Algorithms
  - Introduction
updated: 2026-05-20
---

[Introduction to Data Structures](/en/cp/basis/data_structure/data_structure_intro/) established that the way you organize data determines which operations are fast. But a data structure is passive — it holds data in a particular arrangement and waits. An **algorithm** is the active counterpart: a precise, step-by-step procedure that solves a problem by operating on data.

Algorithms are everywhere in software. The moment you search a list, sort a set of records, route a network packet, or compress a file, you are relying on an algorithm that someone carefully designed. Understanding what algorithms are, how to reason about them, and how to choose among them is the core skill this series develops.

## What makes something an algorithm?

Not every procedure counts as an algorithm. A recipe that says "add salt to taste" is not one — "to taste" is ambiguous. A loop that might run forever is not one either — it has no guarantee of terminating. An algorithm must satisfy four properties:

1. **Finiteness**: it terminates after a finite number of steps for every valid input.
2. **Definiteness**: every step is precisely specified — there is no ambiguity about what to do next.
3. **Input and output**: it accepts zero or more inputs and produces one or more outputs.
4. **Effectiveness**: each individual step is simple enough to be carried out literally, by a person or a machine following instructions.

Consider this description: "to find the largest number in a list, scan from left to right, keeping track of the largest value seen so far; return it at the end." Walk through the four properties:

- **Finiteness**: you reach the end of the list in exactly $n$ steps.
- **Definiteness**: "scan from left to right" and "keep track of the largest" are unambiguous.
- **Input and output**: the list is the input; the largest value is the output.
- **Effectiveness**: comparing two numbers and updating a variable are both basic operations.

This simple procedure is an algorithm. You will see it expressed more precisely shortly as *linear scan for the maximum*.

## Two questions you always ask

When you encounter any algorithm — whether you wrote it yourself or found it in a textbook — two questions immediately matter.

### Is it correct?

A correct algorithm produces the right output for **every** valid input. This sounds obvious, but correctness is surprisingly easy to get wrong. Off-by-one errors, missing edge cases (what if the list is empty? what if all elements are equal?), and flawed assumptions about inputs are among the most common sources of bugs in real systems.

The important habit is to ask: "does this algorithm handle every possible valid input correctly?" — and to actively test boundary cases. Proving correctness rigorously uses *loop invariants* and other formal techniques that are introduced in later checkpoints.

### How efficient is it?

Correctness is necessary but not sufficient. An algorithm that produces the right answer after a year of computation is not useful. **Efficiency** describes how an algorithm's resource usage — primarily time and memory — grows as the input size grows.

The crucial word is *grows*. You care less about raw time on any particular machine and more about: if the input doubles in size, does the work double? Quadruple? Stay the same? This scaling behavior is what determines whether an algorithm is practical at real scale or collapses the moment the data gets large.

The formal language for expressing efficiency is **asymptotic notation**, introduced in [Asymptotic Notations](/en/cp/basis/algorithm/notations/).

## Problems and instances

An algorithm solves a whole **problem**, not just one specific input. For example:

- **Problem**: given a list of numbers, return them in ascending order.
- **Instance**: given `[3, 1, 4, 1, 5, 9, 2, 6]`, return `[1, 1, 2, 3, 4, 5, 6, 9]`.

An algorithm for the problem will correctly handle any instance of it. This generality is what makes algorithms reusable across programs and contexts. It also means correctness must be shown for *all* valid inputs, not just a few examples.

## The families you will study

The algorithms covered in this series fall into a few broad families, each with a characteristic structure and set of trade-offs.

### Searching and sorting

**Searching** algorithms locate a value in a collection, or confirm its absence. Linear search inspects elements one by one; binary search exploits sorted order to halve the search space on each step, achieving far better performance for large inputs.

**Sorting** algorithms rearrange a collection into order. Sorted data enables efficient searching and many other operations, making sorting one of the most foundational problems in computer science. You will see algorithms ranging from simple but slow (insertion sort) to efficient and widely deployed (merge sort, quicksort).

### Divide and conquer

**Divide-and-conquer** algorithms break a large problem into smaller sub-problems of the same kind, solve each recursively, then combine the results. Merge sort is the canonical example: split the list in half, sort each half, then merge the two sorted halves into one sorted list.

### Greedy algorithms

A **greedy** algorithm builds a solution step by step, always making the locally best choice at each step without reconsidering past decisions. Greedy approaches are fast and simple, but they do not always produce the globally optimal solution — knowing when greedy works correctly is an important design skill.

### Dynamic programming

**Dynamic programming** breaks a problem into overlapping sub-problems, solves each sub-problem once, and stores the results to avoid redundant computation. It applies whenever a recursive approach would recompute the same sub-problems repeatedly, turning exponential-time brute force into polynomial-time solutions.

### Graph algorithms

Data often has natural **graph** structure — maps, networks, dependency graphs, state machines. Graph algorithms traverse, search, and compute properties of graphs. They appear in route planning, compiler optimization, social network analysis, and many other domains.

## Summary

- An **algorithm** is a finite, unambiguous, effective procedure that maps inputs to outputs — not every procedure qualifies.
- The four required properties are: **finiteness**, **definiteness**, having **input and output**, and **effectiveness**.
- The two fundamental questions to ask about any algorithm are: **is it correct?** (does it work for every valid input?) and **how efficient is it?** (how does resource usage scale with input size?).
- An algorithm solves a **problem** — a general specification — not just one particular instance.
- The main algorithm families are: searching and sorting, divide and conquer, greedy, dynamic programming, and graph algorithms. Each makes different trade-offs between simplicity, generality, and efficiency.
