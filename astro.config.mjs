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

const staticLastmod = new Map([
  ['https://patasyhogar.com/', new Date('2026-06-01')],
  ['https://patasyhogar.com/alimentacion/', new Date('2026-06-01')],
  ['https://patasyhogar.com/higiene/', new Date('2026-06-01')],
  ['https://patasyhogar.com/paseo/', new Date('2026-06-01')],
  ['https://patasyhogar.com/juguetes/', new Date('2026-06-01')],
  ['https://patasyhogar.com/hogar/', new Date('2026-06-01')],
  ['https://patasyhogar.com/perros/', new Date('2026-06-01')],
  ['https://patasyhogar.com/gatos/', new Date('2026-06-01')],
  ['https://patasyhogar.com/cuidados/', new Date('2026-06-01')],
  ['https://patasyhogar.com/articulos/', new Date('2026-06-01')],
  ['https://patasyhogar.com/elegir/', new Date('2026-06-01')],
  ['https://patasyhogar.com/calculadora-coste-mascotas/', new Date('2026-06-01')],
  ['https://patasyhogar.com/sobre-mi/', new Date('2026-06-01')],
  ['https://patasyhogar.com/contacto/', new Date('2026-06-01')],
]);

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
        const lastmod = dateMap.get(item.url) || staticLastmod.get(item.url);
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
