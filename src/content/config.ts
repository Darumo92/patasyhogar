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

export const collections = { articulos };
