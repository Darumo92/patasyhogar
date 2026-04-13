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

const quizOpcion = z.object({
  texto: z.string(),
  tags: z.record(z.union([z.string(), z.number()])),
});

const quizPregunta = z.object({
  id: z.string(),
  texto: z.string(),
  tipo: z.enum(['single']).default('single'),
  opciones: z.array(quizOpcion).min(2),
});

const quizProducto = z.object({
  nombre: z.string(),
  imagen: z.string().optional(),
  precio: z.string(),
  precioAmazon: z.string().optional(),
  precioZooplus: z.string().optional(),
  precioTiendanimal: z.string().optional(),
  enlaceAmazon: z.string().optional(),
  enlaceZooplus: z.string().optional(),
  enlaceTiendanimal: z.string().optional(),
  articuloSlug: z.string(),
  descripcionCorta: z.string(),
  filtros: z.record(z.array(z.string())),
  pesos: z.record(z.number()),
});

const quizzes = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    titulo: z.string(),
    descripcion: z.string(),
    animal: z.enum(ANIMALES),
    imagen: z.string().optional(),
    imagenAlt: z.string().optional(),
    preguntas: z.array(quizPregunta).min(1),
    productos: z.array(quizProducto).min(1),
    faqs: z.array(z.object({
      pregunta: z.string(),
      respuesta: z.string(),
    })).optional(),
  }),
});

export const collections = { articulos, quizzes };
