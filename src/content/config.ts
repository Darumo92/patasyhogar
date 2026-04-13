import { defineCollection, z } from 'astro:content';

const CATEGORIAS = ['alimentacion', 'higiene', 'paseo', 'juguetes', 'hogar'] as const;
const ANIMALES = ['perro', 'gato', 'ambos'] as const;
const TIPOS = ['comparativa', 'informativo'] as const;

const articulos = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    categoria: z.enum(CATEGORIAS),
    animal: z.enum(ANIMALES),
    tipo: z.enum(TIPOS).default('comparativa'),
    fecha: z.coerce.date(),
    imagen: z.string().optional(),
    imagenAlt: z.string().optional(),
    destacado: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    actualizadoEn: z.coerce.date().optional(),
    faqs: z.array(z.object({
      pregunta: z.string(),
      respuesta: z.string(),
    })).optional(),
  }),
});

const producto = z.object({
  id: z.string(),
  nombre: z.string(),
  marca: z.string().optional(),
  imagen: z.string().optional(),
  precio: z.string(),
  precioAmazon: z.string().optional().nullable(),
  precioZooplus: z.string().optional().nullable(),
  precioTiendanimal: z.string().optional().nullable(),
  enlaceAmazon: z.string().optional().nullable(),
  enlaceZooplus: z.string().optional().nullable(),
  enlaceTiendanimal: z.string().optional().nullable(),
  categoria: z.enum(CATEGORIAS),
  subcategoria: z.string(),
  animal: z.enum(ANIMALES),
  articuloSlug: z.string(),
  descripcionCorta: z.string(),
  filtros: z.record(z.array(z.string())).default({}),
  afinidad: z.record(z.number()).default({}),
});

const productos = defineCollection({
  type: 'data',
  schema: z.array(producto),
});

export const collections = { articulos, productos };
