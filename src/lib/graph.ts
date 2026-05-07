/**
 * DAG utilities for the checkpoint prerequisite graph.
 * All ids here are cpIds (without lang prefix).
 */

export interface GraphNode {
  id: string;
  title: string;
  level: string;
  prerequisites: string[];
  aliases: string[];
  tags: string[];
  summary?: string;
  updated?: string;
}

export type GraphMap = Map<string, GraphNode>;

/**
 * Kahn's algorithm topological sort.
 * Returns { order } on success or { cycle } containing a human-readable cycle path.
 */
export function topoSort(nodes: GraphMap): { order: string[] } | { cycle: string } {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, Set<string>>(); // prereq -> dependents

  for (const [id] of nodes) {
    if (!inDegree.has(id)) inDegree.set(id, 0);
    if (!adj.has(id)) adj.set(id, new Set());
  }

  for (const [id, node] of nodes) {
    for (const prereq of node.prerequisites) {
      if (!adj.has(prereq)) adj.set(prereq, new Set());
      adj.get(prereq)!.add(id);
      inDegree.set(id, (inDegree.get(id) ?? 0) + 1);
    }
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }

  const order: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    order.push(current);
    for (const dep of adj.get(current) ?? []) {
      const newDeg = (inDegree.get(dep) ?? 1) - 1;
      inDegree.set(dep, newDeg);
      if (newDeg === 0) queue.push(dep);
    }
  }

  if (order.length !== nodes.size) {
    const cycle = findCyclePath(nodes, inDegree);
    return { cycle };
  }

  return { order };
}

/** DFS to find and format a cycle path among nodes still with inDegree > 0. */
function findCyclePath(nodes: GraphMap, inDegree: Map<string, number>): string {
  const remaining = new Set<string>();
  for (const [id, deg] of inDegree) {
    if (deg > 0 && nodes.has(id)) remaining.add(id);
  }

  const visited = new Set<string>();
  const stack: string[] = [];

  function dfs(id: string): string[] | null {
    if (stack.includes(id)) {
      const cycleStart = stack.indexOf(id);
      return [...stack.slice(cycleStart), id];
    }
    if (visited.has(id)) return null;
    visited.add(id);
    stack.push(id);
    for (const prereq of nodes.get(id)?.prerequisites ?? []) {
      if (!remaining.has(prereq)) continue;
      const result = dfs(prereq);
      if (result) return result;
    }
    stack.pop();
    return null;
  }

  for (const id of remaining) {
    const cycle = dfs(id);
    if (cycle) return cycle.join(' -> ');
  }

  return [...remaining].join(', ') + ' (cycle)';
}

/** Build reverse adjacency map (cpId -> set of cpIds that depend on it). */
export function buildDependents(nodes: GraphMap): Map<string, string[]> {
  const dependents = new Map<string, string[]>();
  for (const [id] of nodes) dependents.set(id, []);
  for (const [id, node] of nodes) {
    for (const prereq of node.prerequisites) {
      if (!dependents.has(prereq)) dependents.set(prereq, []);
      dependents.get(prereq)!.push(id);
    }
  }
  return dependents;
}
