import display from './display.json';
import type { Locale } from './constants';

export function segmentLabel(segment: string, lang: Locale): string {
  const entry = (display as Record<string, Record<string, string>>)[segment];
  return entry?.[lang] ?? entry?.['en'] ?? segment.replace(/[_-]/g, ' ');
}
