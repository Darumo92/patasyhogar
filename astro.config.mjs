import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://patasyhogar.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
