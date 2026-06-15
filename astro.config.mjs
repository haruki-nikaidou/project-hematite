// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import icon from 'astro-icon';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import checkpointValidator from './src/integrations/checkpoint-validator.ts';

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
  site: 'https://hematite.example.com',
  output: 'static',
  integrations: [
    svelte(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ja: 'ja', 'zh-tw': 'zh-tw' },
      },
    }),
    pagefind(),
    icon(),
    checkpointValidator(),
  ],
  i18n: {
    locales: ['en', 'ja', 'zh-tw'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    '/': '/en',
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: false }]],
    shikiConfig: {
      themes: {
        light: 'rose-pine-dawn',
        dark: 'rose-pine-moon',
      },
    },
  },
});
