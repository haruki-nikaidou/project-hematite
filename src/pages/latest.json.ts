import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES } from '../lib/constants';
import type { HematiteCache } from '../integrations/checkpoint-validator';

export const GET: APIRoute = () => {
  const cacheFile = join(process.cwd(), 'node_modules/.astro/hematite.json');
  const cache: HematiteCache = JSON.parse(readFileSync(cacheFile, 'utf8'));

  const langs: Record<string, { graph: { hash: string; url: string }; aliases: { hash: string; url: string } }> = {};

  for (const locale of LOCALES) {
    const { graphHash, aliasHash } = cache.langs[locale];
    langs[locale] = {
      graph: {
        hash: graphHash,
        url: `/graph-${locale}-${graphHash}.json`,
      },
      aliases: {
        hash: aliasHash,
        url: `/aliases-${locale}-${aliasHash}.json`,
      },
    };
  }

  const payload = {
    generated_at: cache.generatedAt,
    langs,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
