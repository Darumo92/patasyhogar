# Pillar pages y clusters

## Pillar pages existentes

| Cluster | Pillar slug | URL | Estado |
|---|---|---|---|
| Alimentación perros | `guia-alimentacion-perros` | `/cuidados/guia-alimentacion-perros/` | publicado |
| Alimentación gatos | `guia-completa-alimentacion-gatos` | `/cuidados/guia-completa-alimentacion-gatos/` | publicado |
| Higiene perros | `guia-completa-higiene-grooming-perros` | `/cuidados/guia-completa-higiene-grooming-perros/` | human-review |
| Higiene gatos | `guia-completa-higiene-cuidado-gatos` | `/cuidados/guia-completa-higiene-cuidado-gatos/` | human-review |
| Paseo perros | `guia-completa-paseo-viaje-perros` | `/cuidados/guia-completa-paseo-viaje-perros/` | human-review |
| Juguetes | `guia-completa-juguetes-enriquecimiento-mascotas` | `/cuidados/guia-completa-juguetes-enriquecimiento-mascotas/` | human-review |
| Hogar mascotas | `guia-completa-hogar-seguro-mascotas` | `/cuidados/guia-completa-hogar-seguro-mascotas/` | human-review |
| Salud perros | `guia-completa-salud-bienestar-perros` | `/cuidados/guia-completa-salud-bienestar-perros/` | human-review |
| Salud gatos | `guia-completa-salud-bienestar-gatos` | `/cuidados/guia-completa-salud-bienestar-gatos/` | human-review |

## Al crear un artículo nuevo en un cluster con pillar

1. Añadir un internal link natural a la pillar page (intro o primera sección).
2. Variar el anchor text.
3. El algoritmo de related articles en `Article.astro` ya prioriza la pillar (+4 score).

## Al crear una nueva pillar page

1. Actualizar esta tabla y la equivalente en `CLAUDE.md`.
2. Actualizar `pillarSlugs` en `src/layouts/Article.astro` (línea ~38).
3. Añadir internal links desde todos los artículos del cluster.
4. La pillar debe enlazar a todos los artículos del cluster.
5. Actualizar `.seo-engine/data/topic-clusters.yaml` y `content-queue.yaml`.
