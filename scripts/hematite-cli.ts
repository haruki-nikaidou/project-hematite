/**
 * Hematite CLI — dev utility for inspecting the checkpoint DAG.
 *
 * Usage:
 *   pnpm cli dep <cpId> [--lang <locale>]
 *   pnpm cli check-i18n [path-prefix]
 *
 * Self-contained: inlines the minimal logic from src/lib so that
 * Node's --experimental-strip-types can run it without a bundler.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Inlined from src/lib/constants.ts
// ---------------------------------------------------------------------------

const LEVELS = ['elementry', 'basis', 'essential', 'advanced', 'cutting-edge'] as const;
const CATEGORIES = ['tricks', 'proof', 'homework', 'side-lines'] as const;
const FIRST_SEGMENTS = [...LEVELS, ...CATEGORIES] as const;
const LOCALES = ['en', 'ja'] as const;
const DEFAULT_LOCALE = 'en' as const;

type Locale = (typeof LOCALES)[number];
type FirstSegment = (typeof FIRST_SEGMENTS)[number];

// ---------------------------------------------------------------------------
// Inlined from src/lib/graph.ts
// ---------------------------------------------------------------------------

interface GraphNode {
  id: string;
  title: string;
  level: string;
  prerequisites: string[];
  aliases: string[];
  tags: string[];
  summary?: string;
  updated?: string;
}

type GraphMap = Map<string, GraphNode>;

function topoSort(nodes: GraphMap): { order: string[] } | { cycle: string } {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, Set<string>>();

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
    const remaining = new Set([...inDegree.entries()].filter(([, d]) => d > 0).map(([id]) => id));
    return { cycle: [...remaining].join(' -> ') + ' (cycle)' };
  }

  return { order };
}

// ---------------------------------------------------------------------------
// Inlined from src/lib/content-loader.ts
// ---------------------------------------------------------------------------

function* walkMd(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walkMd(full);
    } else if (entry.endsWith('.md')) {
      yield full;
    }
  }
}

function asStringArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter((x) => typeof x === 'string');
  return [];
}

function extractFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const block = match[1];
  const result: Record<string, unknown> = {};
  const lines = block.split('\n');
  let i = 0;
  while (i < lines.length) {
    const keyMatch = lines[i].match(/^(\w[\w-]*):\s*(.*)/);
    if (!keyMatch) { i++; continue; }
    const key = keyMatch[1];
    const rest = keyMatch[2].trim();
    if (rest === '') {
      const items: string[] = [];
      i++;
      while (i < lines.length && /^\s+-\s+(.+)/.test(lines[i])) {
        const m = lines[i].match(/^\s+-\s+(.*)/);
        if (m) items.push(m[1].replace(/^['"]|['"]$/g, '').trim());
        i++;
      }
      result[key] = items;
    } else if (rest.startsWith('[') && rest.endsWith(']')) {
      const inner = rest.slice(1, -1).trim();
      result[key] = inner
        ? inner.split(',').map((s) => s.replace(/^['"\s]+|['"\s]+$/g, '')).filter(Boolean)
        : [];
      i++;
    } else {
      result[key] = rest.replace(/^['"]|['"]$/g, '');
      i++;
    }
  }
  return result;
}

function loadAllCheckpoints(contentsDir: string): Map<Locale, GraphMap> {
  const result = new Map<Locale, GraphMap>();
  for (const locale of LOCALES) result.set(locale, new Map());

  for (const filePath of walkMd(contentsDir)) {
    const rel = relative(contentsDir, filePath).replace(/\\/g, '/');
    const withoutExt = rel.replace(/\.md$/, '');
    const slashIdx = withoutExt.indexOf('/');
    if (slashIdx === -1) continue;

    const lang = withoutExt.slice(0, slashIdx) as Locale;
    const cpId = withoutExt.slice(slashIdx + 1);

    if (!(LOCALES as readonly string[]).includes(lang)) continue;
    const firstSeg = cpId.split('/')[0] as FirstSegment;
    if (!(FIRST_SEGMENTS as readonly string[]).includes(firstSeg)) continue;

    const fm = extractFrontmatter(readFileSync(filePath, 'utf8'));

    result.get(lang)!.set(cpId, {
      id: cpId,
      title: typeof fm.title === 'string' ? fm.title : cpId,
      level: firstSeg,
      prerequisites: asStringArray(fm.prerequisites),
      aliases: asStringArray(fm.aliases),
      tags: asStringArray(fm.tags),
      summary: typeof fm.summary === 'string' ? fm.summary : undefined,
      updated: typeof fm.updated === 'string' ? fm.updated : undefined,
    });
  }

  return result;
}

// ---------------------------------------------------------------------------
// dep subcommand
// ---------------------------------------------------------------------------

function collectAllPrereqs(cpId: string, graph: GraphMap): Set<string> {
  const visited = new Set<string>();
  const queue = [...(graph.get(cpId)?.prerequisites ?? [])];
  while (queue.length) {
    const cur = queue.shift()!;
    if (visited.has(cur)) continue;
    visited.add(cur);
    for (const p of graph.get(cur)?.prerequisites ?? []) {
      if (!visited.has(p)) queue.push(p);
    }
  }
  return visited;
}

function cmdDep(args: string[]): void {
  let cpId: string | undefined;
  let lang = DEFAULT_LOCALE;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--lang' && args[i + 1]) {
      lang = args[++i];
    } else if (!args[i].startsWith('--')) {
      cpId = args[i];
    }
  }

  if (!cpId) {
    console.error('Usage: pnpm cli dep <cpId> [--lang <locale>]');
    process.exit(1);
  }

  const contentsDir = join(fileURLToPath(import.meta.url), '..', '..', 'contents');
  const allCheckpoints = loadAllCheckpoints(contentsDir);
  const graph = allCheckpoints.get(lang as Locale);

  if (!graph) {
    console.error(`Unknown locale: ${lang}`);
    process.exit(1);
  }

  if (!graph.has(cpId)) {
    console.error(`Checkpoint not found: ${cpId} (lang=${lang})`);
    process.exit(1);
  }

  const prereqSet = collectAllPrereqs(cpId, graph);

  if (prereqSet.size === 0) {
    console.log(`${cpId} has no prerequisites.`);
    return;
  }

  const sorted = topoSort(graph);
  const order: string[] =
    'order' in sorted
      ? sorted.order.filter((id) => prereqSet.has(id))
      : [...prereqSet];

  console.log(`Prerequisites of ${cpId} (lang=${lang}), ${order.length} total:\n`);
  for (const id of order) {
    const title = graph.get(id)?.title ?? id;
    console.log(`  ${id.padEnd(50)} ${title}`);
  }
}

// ---------------------------------------------------------------------------
// check-i18n subcommand
// ---------------------------------------------------------------------------

function cmdCheckI18n(args: string[]): void {
  const prefix = args.find((a) => !a.startsWith('--')) ?? '';

  const contentsDir = join(fileURLToPath(import.meta.url), '..', '..', 'contents');
  const allCheckpoints = loadAllCheckpoints(contentsDir);
  const enMap = allCheckpoints.get('en')!;
  const jaMap = allCheckpoints.get('ja')!;

  const candidates = prefix
    ? [...enMap.entries()].filter(([id]) => id === prefix || id.startsWith(prefix + '/'))
    : [...enMap.entries()];

  const missing = candidates.filter(([id]) => !jaMap.has(id));

  if (missing.length === 0) {
    const scope = prefix ? `under "${prefix}"` : 'in total';
    console.log(`All ${candidates.length} checkpoints ${scope} have Japanese translations.`);
    return;
  }

  const scope = prefix ? ` under "${prefix}"` : '';
  console.log(`Missing Japanese translations${scope}: ${missing.length} of ${candidates.length}\n`);
  for (const [id, node] of missing) {
    console.log(`  ${id.padEnd(50)} ${node.title}`);
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const [, , subcommand, ...rest] = process.argv;

switch (subcommand) {
  case 'dep':
    cmdDep(rest);
    break;
  case 'check-i18n':
    cmdCheckI18n(rest);
    break;
  default:
    console.error(
      [
        'Hematite CLI',
        '',
        'Subcommands:',
        '  dep <cpId> [--lang <locale>]   List all transitive prerequisites of a checkpoint',
        '  check-i18n [path-prefix]       Find checkpoints missing a Japanese translation',
      ].join('\n'),
    );
    process.exit(subcommand ? 1 : 0);
}
