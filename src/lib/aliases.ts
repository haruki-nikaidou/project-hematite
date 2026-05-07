import type { GraphMap } from './graph';

export interface AliasMap {
  /** alias cpId -> canonical cpId */
  [alias: string]: string;
}

export interface AliasValidationError {
  message: string;
}

/**
 * Build and validate the alias map for a given language's nodes.
 * Returns { aliasMap } on success or throws with a descriptive message.
 */
export function buildAliasMap(nodes: GraphMap): AliasMap {
  const aliasMap: AliasMap = {};
  const errors: string[] = [];

  // Collect all canonical ids
  const canonicalIds = new Set(nodes.keys());

  for (const [canonicalId, node] of nodes) {
    for (const alias of node.aliases) {
      if (alias === canonicalId) {
        errors.push(`  Alias "${alias}" is the same as its canonical id`);
        continue;
      }
      if (canonicalIds.has(alias)) {
        errors.push(`  Alias "${alias}" (on "${canonicalId}") collides with an existing checkpoint id`);
        continue;
      }
      if (aliasMap[alias] !== undefined) {
        errors.push(
          `  Alias "${alias}" (on "${canonicalId}") collides with alias already claimed by "${aliasMap[alias]}"`,
        );
        continue;
      }
      aliasMap[alias] = canonicalId;
    }
  }

  if (errors.length > 0) {
    throw new Error('Alias validation errors:\n' + errors.join('\n'));
  }

  return aliasMap;
}
