import { createHash } from 'node:crypto';

/**
 * Compute a stable, canonical SHA-256 hash over a JSON-serialisable value.
 * Keys are sorted, arrays are preserved in order.
 * Returns first 12 hex chars.
 */
export function canonicalHash(value: unknown): string {
  const json = canonicalStringify(value);
  return createHash('sha256').update(json, 'utf8').digest('hex').slice(0, 12);
}

function canonicalStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return '[' + value.map(canonicalStringify).join(',') + ']';
  }
  const sorted = Object.keys(value as Record<string, unknown>)
    .sort()
    .map((k) => JSON.stringify(k) + ':' + canonicalStringify((value as Record<string, unknown>)[k]));
  return '{' + sorted.join(',') + '}';
}
