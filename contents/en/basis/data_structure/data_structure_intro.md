---
title: Introduction to Data Structures
summary: "A data structure is a deliberate way of organizing data so that specific operations are efficient. This checkpoint explains why organization matters, introduces the vocabulary used throughout the series, and previews the structures you will study."
prerequisites:
  - elementry/computer_science/how_programs_work
aliases: []
tags:
  - Data Structures
  - Introduction
updated: 2026-05-16
---

[How Programs Work](/en/cp/elementry/computer_science/how_programs_work/) established that every program follows the same loop: take in information, process it, produce a result. The moment you take in *more than one piece* of information, you face a question the program itself cannot answer for you: **how should that information be stored?**

The answer matters more than it might seem.

## The problem with a pile

Imagine you are building a contacts app. You have a list of names and phone numbers, and users need to look up numbers by name. Simple enough.

Now imagine the app has ten million contacts. A user types a name and expects a result in under a second. If your program has to check every contact one by one from the top of the pile, it will examine — on average — five million entries before finding the right one. On a fast modern machine that might take several seconds. For a phone app, that is unusable.

The data is the same either way. What changes the outcome entirely is how you **organize** it.

A telephone directory is not a pile — it is sorted alphabetically, so you can open roughly the right section, then scan a short range. The structure of the directory transforms a five-million-step search into one that takes a few dozen steps. The information has not changed; the organization has.

**Data structures** are the formal equivalent of that organizational choice. A **data structure** is a way of arranging data in memory together with a defined set of operations for working with it. The arrangement determines which operations are fast and which are slow.

## Operations and efficiency

Every data structure supports some collection of **operations** — things you can ask it to do. The most common ones across all structures are:

- **Access** — retrieve the element at a specific position.
- **Search** — find whether a particular value exists (and where).
- **Insert** — add a new element.
- **Delete** — remove an existing element.

Not every structure supports all four equally well. An arrangement that makes access instant may make insertion slow. A structure that makes insertion cheap may make search expensive. Choosing a data structure means choosing which operations you want to be fast, and accepting the trade-offs that come with that choice.

## Measuring efficiency: a first look

When comparing how structures perform, you care less about exact timings (which vary between machines) and more about how the time **scales** as the data grows. The key question is: if the number of elements doubles, what happens to the time needed?

Two categories appear constantly:

- **Constant time** — the operation takes the same amount of work regardless of how many elements you have. Doubling the data changes nothing. This is the best possible behavior.
- **Linear time** — the operation's work grows in proportion to the number of elements. Ten times more data means ten times more work.

Later checkpoints will develop this idea precisely and introduce formal notation. For now, "constant" and "linear" are enough vocabulary to talk about trade-offs between structures.

## The structures you will study

The checkpoints that follow introduce five foundational structures. Here is a brief picture of each:

### Array

An **array** stores elements in a contiguous block of memory, one after another. Because of this layout, reaching any element by its position is constant-time — you do not have to scan from the beginning. Arrays are the simplest and most widely used structure, and many others are built on top of them.

The trade-off: inserting or deleting an element in the middle requires shifting everything around it, which is linear in the size of the array.

### Linked list

A **linked list** stores each element in a separate node. Each node holds its value and a reference to the next node in the sequence. The nodes can be scattered anywhere in memory — no contiguous block required.

Inserting or deleting an element in the middle is cheap: you only update a couple of references, regardless of list size. The trade-off: reaching the element at position $i$ requires following the chain from the beginning, one step at a time. There is no shortcut.

### Stack

A **stack** is a structure that enforces a specific discipline: elements can only be added and removed at one end, called the top. The last element added is always the first one removed — **last in, first out** (LIFO).

This constraint sounds limiting, but it maps naturally to a surprising number of real problems: reversing a sequence, tracking where you came from during navigation, and how your program manages function calls internally.

### Queue

A **queue** is the mirror of a stack. Elements are added at one end (the back) and removed from the other (the front) — **first in, first out** (FIFO). Like a line at a coffee shop: whoever arrived first is served first.

Queues are the natural model for anything that must be processed in the order it arrives: requests to a web server, frames in a video stream, tasks waiting to run.

### Hash map

A **hash map** (also called a *dictionary* or *associative array*) stores key-value pairs and lets you look up a value by its key in constant time — regardless of how many pairs there are. It achieves this by running the key through a mathematical function that determines exactly where in memory to store or find it, with no scanning at all.

The trade-off: the elements have no meaningful order, and certain operations that require sorted access are expensive.

## The central theme: there is no single best structure

After studying five data structures, a natural question arises: which one should you use? The answer is always: it depends on what you need to do.

| If you need... | Reach for... |
|----------------|-------------|
| Fast access by position | Array |
| Frequent insertion or deletion in the middle | Linked list |
| Track a history; reverse a sequence | Stack |
| Process items in arrival order | Queue |
| Fast lookup by a name or key | Hash map |

Real programs often use several structures at once. A web server might use a queue to hold incoming requests, a hash map to look up session data for each request, and an array inside each response to hold the items being returned.

Learning data structures is not about memorizing a catalog. It is about developing the judgment to look at a problem, identify which operations matter most, and reach for the right tool.

## Summary

- A **data structure** is a way of organizing data in memory together with a set of operations for working with it. The organization determines which operations are fast.
- The four fundamental operations are **access**, **search**, **insert**, and **delete**. Every structure makes trade-offs among them.
- **Constant-time** operations do the same amount of work no matter how large the data set. **Linear-time** operations grow proportionally with the data.
- The five structures covered in this series are: **array** (fast positional access), **linked list** (cheap mid-sequence changes), **stack** (LIFO discipline), **queue** (FIFO discipline), and **hash map** (fast key-based lookup).
- No single structure is best for everything. Choosing well means matching the structure's strengths to the operations your program actually performs most.
