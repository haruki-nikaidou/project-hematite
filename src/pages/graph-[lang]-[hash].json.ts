import type { APIRoute, GetStaticPaths } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LOCALES } from '../lib/constants';
import { cpUrl } from '../lib/paths';
import type { HematiteCache } from '../integrations/checkpoint-validator';

function readCache(): HematiteCache {
  const cacheFile = join(process.cwd(), 'node_modules/.astro/hematite.json');
  return JSON.parse(readFileSync(cacheFile, 'utf8')) as HematiteCache;
}

export const getStaticPaths: GetStaticPaths = () => {
  const cache = readCache();
  return LOCALES.map((lang) => ({
    params: { lang, hash: cache.langs[lang].graphHash },
  }));
};

export const GET: APIRoute = ({ params }) => {
  const cache = readCache();
  const lang = params.lang as string;
  const langData = cache.langs[lang as keyof typeof cache.langs];
  if (!langData) {
    return new Response('Not found', { status: 404 });
  }

  const nodes = Object.values(langData.nodes)
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((n) => ({
      id: n.id,
      title: n.title,
      level: n.level,
      url: cpUrl(lang, n.id),
      prerequisites: [...n.prerequisites].sort(),
      aliases: [...n.aliases].sort(),
      tags: [...n.tags].sort(),
      summary: n.summary,
    }));

  const payload = {
    lang,
    hash: langData.graphHash,
    generated_at: cache.generatedAt,
    nodes,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
