import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import yamlPlugin from '@rollup/plugin-yaml';
import rehypeTaskListLabels from './src/plugins/rehype-task-list-labels.mjs';
import { readdirSync, readFileSync } from 'fs';

// Build URL → lastmod date mapping from article frontmatter at config time
const dateMap = new Map();
const articlesDir = './src/content/articulos';
for (const file of readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))) {
  const raw = readFileSync(`${articlesDir}/${file}`, 'utf-8');
  const fm = raw.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] || '';
  const updated = fm.match(/^actualizadoEn:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
  const fecha = fm.match(/^fecha:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
  const tipo = fm.match(/^tipo:\s*(\w+)/m)?.[1] || 'comparativa';
  const categoria = fm.match(/^categoria:\s*(\w+)/m)?.[1];
  const slug = file.replace('.mdx', '');
  const date = updated || fecha;
  if (date && categoria) {
    const url = tipo === 'informativo'
      ? `https://patasyhogar.com/cuidados/${slug}/`
      : `https://patasyhogar.com/${categoria}/${slug}/`;
    dateMap.set(url, new Date(date));
  }
}

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
      serialize(item) {
        const lastmod = dateMap.get(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  output: 'static',
  vite: {
    plugins: [yamlPlugin()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
