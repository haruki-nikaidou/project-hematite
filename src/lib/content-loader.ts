/**
 * Raw filesystem walker used by the validator integration.
 * Reads frontmatter from all .md files under `contents/` without going through
 * Astro's content layer (which isn't available in config:setup hooks).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { FIRST_SEGMENTS, LOCALES, type Locale } from './constants';
import type { GraphNode, GraphMap } from './graph';

interface RawFrontmatter {
  title?: unknown;
  summary?: unknown;
  prerequisites?: unknown;
  aliases?: unknown;
  tags?: unknown;
  updated?: unknown;
}

/** Walk `dir` recursively, yield all .md file paths. */
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

/** Extract YAML frontmatter block from raw markdown text (no full YAML parse). */
function extractFrontmatter(raw: string): RawFrontmatter {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  // Minimal YAML subset: simple key: value, and YAML lists
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
      // Possible list
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
        ? inner
            .split(',')
            .map((s) => s.replace(/^['"\s]+|['"\s]+$/g, ''))
            .filter(Boolean)
        : [];
      i++;
    } else {
      result[key] = rest.replace(/^['"]|['"]$/g, '');
      i++;
    }
  }
  return result as RawFrontmatter;
}

function asStringArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter((x) => typeof x === 'string');
  return [];
}

/**
 * Load all checkpoints from the contents/ directory.
 * Returns a Map<lang, GraphMap>.
 */
export function loadAllCheckpoints(contentsDir: string): Map<Locale, GraphMap> {
  const result = new Map<Locale, GraphMap>();

  for (const locale of LOCALES) {
    result.set(locale, new Map());
  }

  for (const filePath of walkMd(contentsDir)) {
    const rel = relative(contentsDir, filePath).replace(/\\/g, '/');
    const withoutExt = rel.replace(/\.md$/, '');
    const slashIdx = withoutExt.indexOf('/');
    if (slashIdx === -1) continue;

    const lang = withoutExt.slice(0, slashIdx) as Locale;
    const cpId = withoutExt.slice(slashIdx + 1);

    if (!(LOCALES as readonly string[]).includes(lang)) continue;
    const firstSeg = cpId.split('/')[0];
    if (!(FIRST_SEGMENTS as readonly string[]).includes(firstSeg as never)) continue;

    const raw = readFileSync(filePath, 'utf8');
    const fm = extractFrontmatter(raw);

    const node: GraphNode = {
      id: cpId,
      title: typeof fm.title === 'string' ? fm.title : cpId,
      level: firstSeg,
      prerequisites: asStringArray(fm.prerequisites),
      aliases: asStringArray(fm.aliases),
      tags: asStringArray(fm.tags),
      summary: typeof fm.summary === 'string' ? fm.summary : undefined,
      updated: typeof fm.updated === 'string' ? fm.updated : undefined,
    };

    result.get(lang)!.set(cpId, node);
  }

  return result;
}
