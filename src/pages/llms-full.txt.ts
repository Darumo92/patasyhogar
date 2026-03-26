import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

function stripMdx(body: string): string {
  return body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^import\s.+$/gm, '')
    .replace(/<[A-Z][^>]*[\s\S]*?\/>/gm, '')
    .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s{3,}/g, '\n\n')
    .trim();
}

export const GET: APIRoute = async () => {
  const articulos = await getCollection('articulos');

  const sorted = articulos.sort(
    (a, b) => b.data.fecha.getTime() - a.data.fecha.getTime()
  );

  const lines: string[] = [
    '# Patas y Hogar — Contenido completo',
    '',
    '> Guías de compra y comparativas de productos para perros y gatos en España.',
    '> Autor: Daniel Ruiz — patasyhogar.com',
    '',
    `> Total de artículos: ${sorted.length}`,
    `> Última actualización: ${sorted[0]?.data.fecha.toISOString().split('T')[0]}`,
    '',
    '---',
    '',
  ];

  for (const a of sorted) {
    const tipo = a.data.tipo ?? 'comparativa';
    const esInformativo = tipo === 'informativo';
    const url = esInformativo
      ? `https://patasyhogar.com/cuidados/${a.slug}/`
      : `https://patasyhogar.com/${a.data.categoria}/${a.slug}/`;

    const animalLabel =
      a.data.animal === 'perro'
        ? 'Perros'
        : a.data.animal === 'gato'
          ? 'Gatos'
          : 'Perros y gatos';

    lines.push(`## ${a.data.titulo}`);
    lines.push('');
    lines.push(`- URL: ${url}`);
    lines.push(`- Tipo: ${tipo}`);
    lines.push(`- Animal: ${animalLabel}`);
    lines.push(`- Categoría: ${a.data.categoria}`);
    lines.push(`- Fecha: ${a.data.fecha.toISOString().split('T')[0]}`);
    if (a.data.actualizadoEn) {
      lines.push(`- Actualizado: ${a.data.actualizadoEn.toISOString().split('T')[0]}`);
    }
    if (a.data.tags && a.data.tags.length > 0) {
      lines.push(`- Tags: ${a.data.tags.join(', ')}`);
    }
    lines.push('');
    lines.push(`**${a.data.descripcion}**`);
    lines.push('');
    lines.push(stripMdx(a.body));
    lines.push('');

    if (a.data.faqs && a.data.faqs.length > 0) {
      lines.push('### Preguntas frecuentes');
      lines.push('');
      for (const faq of a.data.faqs) {
        lines.push(`**${faq.pregunta}**`);
        lines.push(faq.respuesta);
        lines.push('');
      }
    }

    lines.push('---');
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
