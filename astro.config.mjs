import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeTaskListLabels from './src/plugins/rehype-task-list-labels.mjs';

export default defineConfig({
  site: 'https://patasyhogar.com',
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [rehypeTaskListLabels],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/aviso-legal/') &&
        !page.includes('/cookies/') &&
        !page.includes('/politica-privacidad/') &&
        !page.includes('/buscar/') &&
        !page.includes('/tags') &&
        !page.includes('/actualizaciones/'),
    }),
  ],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
