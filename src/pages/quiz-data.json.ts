import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const articulos = await getCollection('articulos');

  const data = articulos.map(a => ({
    t: a.data.titulo,
    d: a.data.descripcion.slice(0, 83),
    c: a.data.categoria,
    a: a.data.animal,
    p: a.data.tipo || 'comparativa',
    i: a.data.imagen || '',
    u: a.data.tipo === 'informativo' ? `/cuidados/${a.slug}/` : `/${a.data.categoria}/${a.slug}/`,
  }));

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
