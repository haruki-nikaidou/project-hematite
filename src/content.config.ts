import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { FIRST_SEGMENTS, LOCALES } from './lib/constants';

const checkpointId = z
  .string()
  .refine(
    (id) => {
      const firstSeg = id.split('/')[0];
      return (FIRST_SEGMENTS as readonly string[]).includes(firstSeg);
    },
    (id) => ({
      message: `Prerequisite/alias "${id}" must start with one of: ${FIRST_SEGMENTS.join(', ')}`,
    }),
  );

const checkpointSchema = z.object({
  title: z.string(),
  summary: z.string().optional(),
  prerequisites: z.array(checkpointId).default([]),
  aliases: z.array(checkpointId).default([]),
  tags: z.array(z.string()).default([]),
  updated: z.coerce.date().optional(),
});

export const collections = {
  checkpoints: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './contents' }),
    schema: checkpointSchema,
  }),
};

export type CheckpointSchema = z.infer<typeof checkpointSchema>;

/** Split a collection entry id (e.g. "en/basis/math/induction") into lang + cpId */
export function splitEntryId(entryId: string): { lang: string; cpId: string } | null {
  const slash = entryId.indexOf('/');
  if (slash === -1) return null;
  const lang = entryId.slice(0, slash);
  const cpId = entryId.slice(slash + 1);
  if (!(LOCALES as readonly string[]).includes(lang)) return null;
  return { lang, cpId };
}
