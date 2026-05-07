/**
 * Helpers that convert between content entry IDs, URL slugs, and file paths.
 *
 * Convention:
 *   - entry id  : "<lang>/<cpId>"  e.g. "en/basis/math/induction"
 *   - cpId      : "<firstSeg>/..."  e.g. "basis/math/induction"
 *   - URL path  : "/<lang>/cp/<cpId>/"
 *   - index URL : "/<lang>/index/<dirPrefix>/"
 */

export function cpUrl(lang: string, cpId: string): string {
  return `/${lang}/cp/${cpId}/`;
}

export function indexUrl(lang: string, dirPrefix: string): string {
  return `/${lang}/index/${dirPrefix}/`;
}

/** All directory prefixes for a cpId, from shallowest to deepest (excluding itself). */
export function ancestorPrefixes(cpId: string): string[] {
  const parts = cpId.split('/');
  const prefixes: string[] = [];
  for (let i = 1; i < parts.length; i++) {
    prefixes.push(parts.slice(0, i).join('/'));
  }
  return prefixes;
}

/** The direct parent directory prefix of a cpId (or the first segment). */
export function parentPrefix(cpId: string): string {
  const parts = cpId.split('/');
  return parts.slice(0, -1).join('/');
}

/** Extract lang + cpId from an Astro collection entry id. Returns null when malformed. */
export function splitEntryId(entryId: string): { lang: string; cpId: string } | null {
  const slash = entryId.indexOf('/');
  if (slash === -1) return null;
  return { lang: entryId.slice(0, slash), cpId: entryId.slice(slash + 1) };
}

/** Build entry id from lang + cpId */
export function toEntryId(lang: string, cpId: string): string {
  return `${lang}/${cpId}`;
}
