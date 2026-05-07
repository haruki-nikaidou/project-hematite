/**
 * Custom Astro integration that:
 * 1. Walks contents/ and parses all checkpoint frontmatter.
 * 2. Validates prerequisites (must exist in same lang) and aliases (no collisions).
 * 3. Runs topological sort to detect prerequisite cycles.
 * 4. Computes canonical hashes for graph and aliases per language.
 * 5. Writes a cache file to node_modules/.astro/hematite.json.
 * 6. Injects alias redirects into Astro's config.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { AstroIntegration } from 'astro';
import { loadAllCheckpoints } from '../lib/content-loader';
import { topoSort } from '../lib/graph';
import { buildAliasMap } from '../lib/aliases';
import { canonicalHash } from '../lib/hash';
import { LOCALES, type Locale } from '../lib/constants';
import { cpUrl } from '../lib/paths';
import type { GraphNode, GraphMap } from '../lib/graph';
import type { AliasMap } from '../lib/aliases';

export interface HematiteCache {
  generatedAt: string;
  langs: Record<
    Locale,
    {
      nodes: Record<string, GraphNode>;
      graphHash: string;
      aliasMap: AliasMap;
      aliasHash: string;
    }
  >;
}

function buildCache(contentsDir: string): HematiteCache {
  const allCheckpoints = loadAllCheckpoints(contentsDir);
  const langData: HematiteCache['langs'] = {} as HematiteCache['langs'];

  for (const locale of LOCALES) {
    const nodes: GraphMap = allCheckpoints.get(locale) ?? new Map();

    // Validate: every prerequisite must exist as a node in the same language
    const prereqErrors: string[] = [];
    for (const [id, node] of nodes) {
      for (const prereq of node.prerequisites) {
        if (!nodes.has(prereq)) {
          prereqErrors.push(`  [${locale}] "${id}" requires "${prereq}" which does not exist`);
        }
      }
    }
    if (prereqErrors.length > 0) {
      throw new Error('Missing prerequisite checkpoints:\n' + prereqErrors.join('\n'));
    }

    // DAG check
    const sortResult = topoSort(nodes);
    if ('cycle' in sortResult) {
      throw new Error(`Cycle detected in '${locale}' prerequisites:\n  ${sortResult.cycle}`);
    }

    // Alias validation
    const aliasMap = buildAliasMap(nodes);

    // Hashes
    const graphPayload = [...nodes.values()]
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((n) => ({
        id: n.id,
        title: n.title,
        level: n.level,
        url: cpUrl(locale, n.id),
        prerequisites: [...n.prerequisites].sort(),
        aliases: [...n.aliases].sort(),
        tags: [...n.tags].sort(),
        summary: n.summary,
      }));
    const graphHash = canonicalHash(graphPayload);
    const aliasHash = canonicalHash(aliasMap);

    langData[locale] = {
      nodes: Object.fromEntries(nodes),
      graphHash,
      aliasMap,
      aliasHash,
    };
  }

  return {
    generatedAt: new Date().toISOString(),
    langs: langData,
  };
}

export default function checkpointValidator(): AstroIntegration {
  let contentsDir = '';
  let cacheFile = '';

  return {
    name: 'checkpoint-validator',
    hooks: {
      'astro:config:setup': ({ config, updateConfig, logger }) => {
        contentsDir = resolve(config.root.pathname.replace(/^\/([A-Za-z]:)/, '$1'), 'contents');
        cacheFile = resolve(
          config.root.pathname.replace(/^\/([A-Za-z]:)/, '$1'),
          'node_modules/.astro/hematite.json',
        );

        logger.info('Validating checkpoints…');

        let cache: HematiteCache;
        try {
          cache = buildCache(contentsDir);
        } catch (err) {
          throw err;
        }

        // Write cache
        mkdirSync(join(cacheFile, '..'), { recursive: true });
        writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
        logger.info('Checkpoint cache written.');

        // Inject alias redirects
        const redirects: Record<string, string> = {};
        for (const locale of LOCALES) {
          const { aliasMap } = cache.langs[locale];
          for (const [alias, canonical] of Object.entries(aliasMap)) {
            redirects[`/${locale}/cp/${alias}/`] = cpUrl(locale, canonical);
          }
        }

        if (Object.keys(redirects).length > 0) {
          updateConfig({ redirects });
          logger.info(`Injected ${Object.keys(redirects).length} alias redirects.`);
        }
      },

      'astro:build:start': ({ logger }) => {
        logger.info('Build start — checkpoint validation already passed in config:setup.');
      },
    },
  };
}

/** Read the cache written by the integration. Throws if not found. */
export function readCache(root: string): HematiteCache {
  const { readFileSync } = require('node:fs');
  const cacheFile = join(root, 'node_modules/.astro/hematite.json');
  const raw = readFileSync(cacheFile, 'utf8');
  return JSON.parse(raw) as HematiteCache;
}
