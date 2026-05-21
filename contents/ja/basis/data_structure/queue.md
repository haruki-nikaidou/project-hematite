---
title: キュー
summary: "キュー（queue）は先入れ先出し（FIFO）のデータ構造で、要素は後ろから追加され、前から取り出される。このチェックポイントでは、スタックとの違いを対比しながら、配列およびリスト実装を解説し、BFS やスケジューリングなど FIFO 順序が必要なアルゴリズムを概観する。"
prerequisites:
  - basis/data_structure/array
  - basis/data_structure/linked_list
aliases: []
tags:
  - Data Structures
  - FIFO
updated: 2026-05-20
---

印刷ジョブを送るとき、ウェブサイトを開くとき、バックグラウンドタスクを起動するとき、リクエストはそれより前に来たものの後ろに並ぶ **キュー**（queue）に追加される。キューはコンピュータサイエンスで最もシンプルかつ広く使われるデータ構造の一つであり、幅優先探索（BFS）からOSのスケジューリングまで、幅広いアルゴリズムを支えている。

## キューとは何か

**キュー**は要素のコレクションで、**先入れ先出し**（First-In, First-Out / FIFO）の原則に従う。最も長く待っている要素が常に次に処理される。レジの列をイメージするとわかりやすい。新しい客は後ろに並び、先頭の客が次に対応される。割り込みはない。

これは[スタック](../stack/)と直接対比される。スタックは後入れ先出し（LIFO）だ。違いは取り出す端にある。スタックは挿入した端から取り出すが、キューは*反対*の端から取り出す。

キューが持つ 2 つの基本操作：

- **enqueue**（または *push_back*）— 要素をキューの後ろに追加する。
- **dequeue**（または *pop_front*）— 先頭の要素を取り出して返す。

よく使われる補助操作：

- **peek**（または *front*）— 先頭要素を取り出さずに読む。

## キューの動作をステップで追う

空のキューから始める：

```
enqueue(1)  →  [1]
enqueue(2)  →  [1, 2]
enqueue(3)  →  [1, 2, 3]
dequeue()   →  1 を返す、キューは [2, 3]
dequeue()   →  2 を返す、キューは [3]
enqueue(4)  →  [3, 4]
dequeue()   →  3 を返す、キューは [4]
```

最初に追加した要素（`1`）が常に最初に取り出される。スタックで同じ操作をした場合、`pop()` は `3`、次に `2`、次に `1` を返す。

## 配列によるキューの実装

素直な方法 — `Vec` を使ってインデックス 0 から削除する — は動作するが、dequeue のたびに $O(n)$ かかる。残りの要素をすべて一つ前にずらす必要があるためだ。

標準的な解決策は **循環バッファ**（circular buffer）だ。配列をリング状に見立て、`head` と `tail` という 2 つのインデックスを保持し、配列の端に達したら折り返す。enqueue も dequeue もインデックスを一つ動かすだけなので $O(1)$ になる。

Rust の標準ライブラリは `VecDeque<T>`（循環バッファによる双方向キュー）としてこれを提供している。自分でリングロジックを実装する必要はほとんどない：

```rust
use std::collections::VecDeque;

let mut queue: VecDeque<i32> = VecDeque::new();

queue.push_back(1);
queue.push_back(2);
queue.push_back(3);

assert_eq!(queue.pop_front(), Some(1));
assert_eq!(queue.pop_front(), Some(2));
assert_eq!(queue.front(),     Some(&3)); // peek
```

`push_back` と `pop_front` はどちらも $O(1)$ 償却計算量（amortized）だ。バッファが満杯になると `VecDeque` は大きなバッファを確保して要素をコピーする — `Vec` と同じ償却成長戦略だ。

## 連結リストによるキューの実装

[連結リスト](../linked_list/)はキューに自然に合う。**head**（先頭）と **tail**（末尾）の 2 つのポインタを保持することで：

- **enqueue** は tail の後ろに新しいノードを追加し、tail ポインタを進める — $O(1)$。
- **dequeue** は head ノードを読み、head ポインタを次のノードに進め、古い head をドロップする — $O(1)$。

要素のシフトも循環演算も不要だ。以下は `Box<T>` を使ったヒープ確保ノードによる Rust の最小実装だ：

```rust
struct Node<T> {
    value: T,
    next: Option<Box<Node<T>>>,
}

pub struct LinkedQueue<T> {
    head: Option<Box<Node<T>>>,
    tail: *mut Node<T>,
    len: usize,
}

impl<T> LinkedQueue<T> {
    pub fn new() -> Self {
        LinkedQueue { head: None, tail: std::ptr::null_mut(), len: 0 }
    }

    pub fn enqueue(&mut self, value: T) {
        let mut node = Box::new(Node { value, next: None });
        let raw: *mut Node<T> = &mut *node;
        if self.tail.is_null() {
            self.head = Some(node);
        } else {
            unsafe { (*self.tail).next = Some(node); }
        }
        self.tail = raw;
        self.len += 1;
    }

    pub fn dequeue(&mut self) -> Option<T> {
        self.head.take().map(|node| {
            self.head = node.next;
            if self.head.is_none() {
                self.tail = std::ptr::null_mut();
            }
            self.len -= 1;
            node.value
        })
    }

    pub fn peek(&self) -> Option<&T> {
        self.head.as_deref().map(|n| &n.value)
    }

    pub fn is_empty(&self) -> bool {
        self.len == 0
    }
}
```

生の `tail` ポインタは、完全にセーフな Rust の連結リストコードで必要になる二重 `Option` の煩雑さを回避するためのものだ。実際のプロダクションでは、生ポインタを自分で管理するより `VecDeque` や `crossbeam-queue` のようなクレートを使う方がよい。

## 2 つの実装の比較

| 項目 | `VecDeque`（循環配列） | 連結リストキュー |
|---|---|---|
| enqueue | $O(1)$ 償却 | $O(1)$ |
| dequeue | $O(1)$ 償却 | $O(1)$ |
| 要素ごとのメモリ | 値のみ（密な配列） | 値＋ポインタ 2 個 |
| キャッシュ効率 | 優秀 — 連続したリング | 低い — ノードがメモリ上に散在 |
| 要素ごとのアロケーション | なし（バッファを再利用） | あり — ノード 1 個につき 1 回 |

実用的には、キャッシュ局所性の良さから `VecDeque` がほとんどのワークロードで高速だ。連結リストキューが有利なのは、要素が大きい（ポインタのオーバーヘッドが相対的に小さくなる）場合や、償却ではなく最悪計算量で $O(1)$ の保証が必要な場合だ。

## アルゴリズムにおけるキューの登場場面

**幅優先探索（BFS）。** グラフを層ごとに探索する場合 — 重み無しグラフの最短経路、木の幅優先走査 — 各ノードを処理し、未訪問の隣接ノードをキューに追加する。FIFO 順序によって、深さ $d$ のノードをすべて処理してから深さ $d+1$ のノードに進むことが保証される。

```
enqueue(start)
while queue is not empty:
    node = dequeue()
    for each neighbor of node:
        if not visited:
            mark visited
            enqueue(neighbor)
```

**タスクスケジューリング。** OSのプロセススケジューラ、Webサーバのリクエストハンドラ、印刷スプーラはいずれも未処理の仕事をキューで管理している。到着順に処理することで公平性が保たれる。

**プロデューサとコンシューマのバッファリング。** 高速なプロデューサが低速なコンシューマの処理能力を超えてデータを生成する場合（ネットワークからパケットを受信してパースする場合など）、キューはバーストを吸収してデータを取りこぼさない弾性バッファとして機能する。

## まとめ

- キューは **FIFO** 順序で要素を格納する。先にエンキューした要素が先にデキューされる。
- 2 つの基本操作は **enqueue**（後ろに追加）と **dequeue**（前から削除）で、循環バッファまたは連結リスト実装ではどちらも $O(1)$ だ。
- Rust では、ほとんどのユースケースで **`VecDeque<T>`** が最善の選択だ。$O(1)$ 償却操作と優秀なキャッシュ性能を提供する。
- **連結リストキュー**は head と tail ポインタを使って $O(1)$ を償却なしに達成するが、要素ごとにヒープアロケーションが発生しキャッシュ効率が低い。
- キューは **BFS**、**タスクスケジューリング**、**プロデューサ-コンシューマのバッファリング** — 到着順に処理すべきあらゆる場面で不可欠だ。
